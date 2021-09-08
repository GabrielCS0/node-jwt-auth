import User from '@entities/User'
import { Token } from '../utils/Token'
import { HashPassword } from '../utils/HashPassword'

interface IAuthenticate {
  email: string
  password: string
}

export class AuthenticationService {
  async execute ({ email, password }: IAuthenticate): Promise<string> {
    const user = await User.findOne({ email }).select('+password')

    if (!user) throw new Error('Incorrect email')

    const matchPassword = await HashPassword.compareHash(
      password,
      user.password
    )

    if (!matchPassword) throw new Error('Incorrect Password')

    const token = Token.generateToken(
      user.email,
      String(user._id)
    )

    return token
  }
}
