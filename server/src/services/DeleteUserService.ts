import User from '@entities/User'
import RefreshToken from '@entities/RefreshToken'

interface IDeleteUser {
  userId: string
}

export class DeleteUserService {
  async execute ({ userId }: IDeleteUser): Promise<void> {
    await RefreshToken.deleteOne({ userId })
    await User.deleteOne({ _id: userId })
  }
}
