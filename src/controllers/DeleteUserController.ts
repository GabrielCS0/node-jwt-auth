import { DeleteUserService } from '@services/DeleteUserService'
import { Request, Response } from 'express'

export class DeleteUserController {
  async execute (req: Request, res: Response): Promise<Response> {
    const userId = req.userId

    const deleteUserService = new DeleteUserService()

    try {
      await deleteUserService.execute({ userId })
      return res.send()
    } catch (err) {
      return res.status(400).json({ error: 'Error deleting project' })
    }
  }
}
