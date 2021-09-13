import { HashPassword } from '../providers/HashPassword'
import User, { UserDocument } from '@entities/User'
import { Token } from '../providers/Token'
import { RefreshAccessToken } from '../providers/RefreshAccessToken'
import RefreshToken, { RefreshTokenDocument } from '@entities/RefreshToken'

interface ICreateUser {
  name: string
  email: string
  password: string
}

interface IPromise {
  user: UserDocument,
  token: string
  refreshToken: RefreshTokenDocument
}

export class UserService {
  async create ({ name, email, password }: ICreateUser): Promise<IPromise> {
    const userAlreadyExists = await User.findOne({ email })

    if (userAlreadyExists) throw new Error('User already exists!')

    const hashedPassword = await HashPassword.generateHash(password)

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    })

    await user.save()

    user.password = undefined

    const userId = String(user._id)

    const token = Token.generateToken(email, userId)

    await RefreshToken.deleteMany({
      userId
    })

    const refreshToken = await RefreshAccessToken.generate(userId)

    return { user, token, refreshToken }
  }
}
