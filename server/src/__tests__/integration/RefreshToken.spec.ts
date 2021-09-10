import MockMongo from '../../database/mockDatabase/mockMongoDB'
import request from 'supertest'
import { app } from '../../app'

describe('Refresh Token', () => {
  beforeAll(async () => {
    await MockMongo.connect()
  })

  afterAll(async () => {
    await MockMongo.disconnect()
  })

  it('Should refresh the token', async () => {
    const user = await request(app).post('/sign-up').send({
      name: 'user',
      email: 'user@gmail.com',
      password: 'secret'
    })

    const response = await request(app).post('/refresh-token').send({
      refreshTokenId: user.body.refreshToken._id
    })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
  })

  it('Should not refresh the token with an invalid RefreshTokenId', async () => {
    const response = await request(app).post('/refresh-token').send({
      refreshTokenId: '5362h122nm1f563q15'
    })

    expect(response.status).toBe(400)
  })
})
