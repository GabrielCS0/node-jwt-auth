import { HashPassword } from '../utils/HashPassword'
import User from '../entities/User'
import { Token } from '../utils/Token'

interface ICreateUser {
  name: string
  email: string
  password: string
}

export class UserService {
  async create ({ name, email, password }: ICreateUser) {
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

    const token = Token.generateToken(email, String(user._id))

    return { user, token }
  }
}
