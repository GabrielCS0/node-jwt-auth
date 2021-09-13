import RefreshToken from '@entities/RefreshToken'

interface ILogoutService {
  userId: string
}

export class LogoutService {
  async execute ({ userId }: ILogoutService): Promise<void> {
    await RefreshToken.deleteOne({
      userId
    })
  }
}
