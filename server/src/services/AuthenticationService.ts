import User from '@entities/User'
import { Token } from '../providers/Token'
import { HashPassword } from '../providers/HashPassword'
import { RefreshAccessToken } from '../providers/RefreshAccessToken'
import RefreshToken, { RefreshTokenDocument } from '@entities/RefreshToken'

interface IAuthenticate {
  email: string
  password: string
}

interface IPromise {
  token: string,
  refreshToken: RefreshTokenDocument
}

export class AuthenticationService {
  async execute ({ email, password }: IAuthenticate): Promise<IPromise> {
    const user = await User.findOne({ email }).select('+password')

    if (!user) throw new Error('Incorrect email')

    const matchPassword = await HashPassword.compareHash(
      password,
      user.password
    )

    if (!matchPassword) throw new Error('Incorrect Password')

    const userId = String(user._id)

    const token = Token.generateToken(
      user.email,
      userId
    )

    await RefreshToken.deleteMany({
      userId
    })

    const refreshToken = await RefreshAccessToken.generate(userId)

    return { token, refreshToken }
  }
}
