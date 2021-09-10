import MockMongo from '../../database/mockDatabase/mockMongoDB'
import request from 'supertest'
import { app } from '../../app'
import RefreshToken from '@entities/RefreshToken'

describe('Logout', () => {
  beforeAll(async () => {
    await MockMongo.connect()
  })

  afterAll(async () => {
    await MockMongo.disconnect()
  })

  it('Should logout', async () => {
    const user = await request(app).post('/sign-up').send({
      name: 'user',
      email: 'user@gmail.com',
      password: 'secret'
    })

    const response = await request(app).delete('/logout')
      .set('Authorization', `Bearer ${user.body.token}`)

    const refreshToken = await RefreshToken.findOne({
      _id: user.body.refreshToken._id
    })

    expect(response.status).toBe(200)
    expect(refreshToken).toBe(null)
  })
})
