import 'dotenv/config'
import { sign } from 'jsonwebtoken'
import auth from '../config/auth'

export class Token {
  static generateToken (userEmail: string, userId: string): string {
    const { secret, expiresIn } = auth.jwt

    const token = sign({
      email: userEmail
    }, secret, {
      subject: userId,
      expiresIn
    })

    return token
  }
}
