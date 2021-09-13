import RefreshToken, { RefreshTokenDocument } from '@entities/RefreshToken'
import dayjs from 'dayjs'

export class RefreshAccessToken {
  static async generate (userId: string): Promise<RefreshTokenDocument> {
    const expiresIn = dayjs().add(6, 'month').unix()

    const refreshToken = await RefreshToken.create({
      expiresIn,
      userId
    })

    await refreshToken.save()

    return refreshToken
  }
}
