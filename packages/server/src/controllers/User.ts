import { Request, Response } from 'express'
import argon2 from 'argon2'
import { User } from '../entities/User'
import { DI } from '..'

class UserController {
  static async create(req: Request, res: Response) {
    const { username, email, password } = req.body
    const hashedPassword = await argon2.hash(password)

    const user = DI.em.create(User, {
      username,
      email,
      password: hashedPassword
    })

    try {
      await DI.em.persistAndFlush(user)
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

  static async getUser(req: Request, res: Response) {
    const { username } = req.params

    try {
      const user = await DI.em.findOne(User, { username })
      res.json({
        user: {
          username: user?.username,
          email: user?.email
        }
      })
    } catch (err) {
      res.json({ error: err })
    }
  }
}

export default UserController
