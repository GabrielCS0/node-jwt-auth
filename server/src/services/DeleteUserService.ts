import User from '@entities/User'

interface IDeleteUser {
  userId: string
}

export class DeleteUserService {
  async execute ({ userId }: IDeleteUser): Promise<void> {
    await User.deleteOne({ _id: userId })
  }
}
