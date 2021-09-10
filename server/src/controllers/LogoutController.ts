import { LogoutService } from '@services/LogoutService'
import { Request, Response } from 'express'

export class LogoutController {
  async execute (req: Request, res: Response): Promise<Response> {
    const userId = req.userId

    const logoutService = new LogoutService()

    try {
      await logoutService.execute({ userId })
      return res.send()
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }
}
