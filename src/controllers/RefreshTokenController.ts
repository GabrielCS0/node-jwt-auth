import { Request, Response } from 'express'
import { RefreshTokenService } from '@services/RefreshTokenService'

export class RefreshTokenController {
  async execute (req: Request, res: Response): Promise<Response> {
    const { refreshTokenId } = req.body

    const refreshTokenService = new RefreshTokenService()

    try {
      const token = await refreshTokenService.execute({
        refreshTokenId
      })

      return res.json({ token })
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }
}
