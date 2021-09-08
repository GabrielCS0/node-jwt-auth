import { AuthenticationService } from '@services/AuthenticationService'
import { Request, Response } from 'express'

export class AuthenticationController {
  async execute (req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body

    const authenticationService = new AuthenticationService()

    try {
      const token = await authenticationService.execute({
        email,
        password
      })

      return res.json({ token })
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }
}
