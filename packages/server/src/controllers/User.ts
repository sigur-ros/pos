import { getRepository } from 'typeorm'
import { User } from '../entities/User'
import { Request, Response } from 'express'

class UserController {
  static async create(req: Request, res: Response) {
    const userRepo = getRepository(User)

    const { name, username, password, email } = req.body

    try {
      const user = userRepo.create({
        name,
        username,
        email,
        password
      })

      await userRepo.save(user)

      res.json({ message: 'User created!', user })
    } catch (error) {
      // TODO(kevanantha): use middleware for error handling
      res.json({ error }).status(404)
    }
  }

  static async getUser(_req: Request, res: Response) {
    const userRepo = getRepository(User)
    try {
      const users = await userRepo.find({ select: ['name', 'username', 'email'] })
      res.json({ users })
    } catch (error) {
      res.json({ error })
    }
  }
}

export default UserController
