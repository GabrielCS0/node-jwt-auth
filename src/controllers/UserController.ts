import { UserService } from '@services/UserService'
import { Request, Response } from 'express'

export class UserController {
  async create (req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body

    const userService = new UserService()

    try {
      const { user, token, refreshToken } = await userService.create({
        name,
        email,
        password
      })

      return res.status(201).json({ user, token, refreshToken })
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }
}
