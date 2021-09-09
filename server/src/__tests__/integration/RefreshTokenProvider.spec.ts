import MockMongo from '../../database/mockDatabase/mockMongoDB'
import request from 'supertest'
import { RefreshAccessToken } from '../../providers/RefreshAccessToken'
import { app } from '../../app'
import RefreshToken from '@entities/RefreshToken'

describe('Refresh Token Provider', () => {
  beforeAll(async () => {
    await MockMongo.connect()
  })

  afterAll(async () => {
    await MockMongo.disconnect()
  })

  it('Should generate a new Refresh Token', async () => {
    const user = await request(app).post('/sign-up').send({
      name: 'User',
      email: 'user@email.com',
      password: 'secret'
    })

    await RefreshToken.deleteOne({ userId: user.body.user._id })

    const refreshToken = await RefreshAccessToken.generate(user.body.user._id)

    expect(refreshToken).toHaveProperty('_id')
    expect(refreshToken).toHaveProperty('userId')
  })
})
