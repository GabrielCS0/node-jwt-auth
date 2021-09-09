import RefreshToken from '@entities/RefreshToken'
import User from '@entities/User'
import { Token } from '../providers/Token'

interface IRefreshToken {
  refreshTokenId: string
}

export class RefreshTokenService {
  async execute ({ refreshTokenId }: IRefreshToken): Promise<string> {
    const refreshToken = await RefreshToken.findOne({
      _id: refreshTokenId
    })

    if (!refreshToken) throw new Error('Refresh token invalid')

    const user = await User.findOne({
      _id: refreshToken.userId
    })

    const token = Token.generateToken(user.email, String(user._id))

    return token
  }
}
