import { Request, Response } from 'express'
import argon2 from 'argon2'
import { User } from '../entities/User'
import { DI } from '..'

declare module 'express-session' {
  export interface SessionData {
    userId: string
  }
}

class UserController {
  static async create(req: Request, res: Response): Promise<void> {
    const { username, email, password } = req.body
    const hashedPassword = await argon2.hash(password)

    const user = DI.em.create(User, {
      username,
      email,
      password: hashedPassword
    })

    try {
      await DI.em.persistAndFlush(user)

      req.session.userId = user.id.toString()

      res
        .json({
          user: {
            username,
            email
          },
          message: 'User created'
        })
        .status(201)
    } catch (err) {
      res.json({ error: err })
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body

    console.log(req.body)

    try {
      if (!req.session.userId) {
        const user = await DI.em.findOneOrFail(User, { username })

        if (user) {
          const isValidPassword = await argon2.verify(user.password, password)

          if (isValidPassword) {
            req.session.userId = user.id.toString()

            res.json({ message: 'success login' }).status(200)
          } else {
            res.json({ error: 'invalid username or password' }).status(404)
          }
        } else {
          res.json({ message: 'user not found' }).status(404)
        }
      } else {
        res.json({ message: 'you are already login' }).status(200)
      }
    } catch (err) {
      res.json({ error: err })
    }
  }

  static async getUser(req: Request, res: Response) {
    console.log('session:', req.session)
    const { username } = req.params

    try {
      const user = await DI.em.findOneOrFail(User, { username })

      if (user) {
        res.json({
          user: {
            username: user.username,
            email: user.email
          }
        })
      } else {
        res.json({ error: 'error' }).status(404)
      }
    } catch (err) {
      res.json({ error: err }).status(404)
    }
  }
}

export default UserController
