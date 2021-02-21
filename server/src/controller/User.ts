import { getRepository } from 'typeorm'
import { User } from '../entities/User'
import { Request, Response } from 'express'

class UserController {
  static async create(req: Request, res: Response) {
    const userRepo = getRepository(User)

    const {name, username, password, email} = req.body
    try {
      const user = userRepo.create({
        name: name!,
        username: username!,
        email: email!,
        password: password!,
      })

      await userRepo.save(user)
      res.json({ message: "User created!" })
    } catch (error) {
      res.json({ error })
    }
  }

  static async getUser(_req: Request, res: Response) {
    const userRepo = getRepository(User)
    try {
      const users = await userRepo.find({ select: ["name", "username", "email"] })
      res.json({users})
    } catch (error) {
      res.json({ error })
    }
  }
}

export default UserController