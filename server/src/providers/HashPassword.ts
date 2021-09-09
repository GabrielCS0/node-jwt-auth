import { compare, hash } from 'bcryptjs'

export class HashPassword {
  static async generateHash (password: string): Promise<string> {
    return await hash(password, 8)
  }

  static async compareHash (password: string, hashedPassword: string): Promise<boolean> {
    return await compare(password, hashedPassword)
  }
}
