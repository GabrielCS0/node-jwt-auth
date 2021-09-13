import MockMongo from '../../database/mockDatabase/mockMongoDB'
import request from 'supertest'
import { app } from '../../app'
import User from '@entities/User'
import RefreshToken from '@entities/RefreshToken'

describe('Delete User', () => {
  beforeAll(async () => {
    await MockMongo.connect()
  })

  afterAll(async () => {
    await MockMongo.disconnect()
  })

  it('Should delete a user', async () => {
    const signInResponse = await request(app).post('/sign-up').send({
      name: 'user',
      email: 'user@gmail.com',
      password: 'secret'
    })

    const response = await request(app).delete('/delete')
      .set('Authorization', `Bearer ${signInResponse.body.token}`)

    const user = await User.findOne({ email: signInResponse.body.user.email })
    const refreshToken = await RefreshToken.findOne({ userId: signInResponse.body.user._id })

    expect(response.status).toBe(200)
    expect(user).toBe(null)
    expect(refreshToken).toBe(null)
  })

  it('Should not delete a user without a token', async () => {
    await request(app).post('/sign-up').send({
      name: 'user',
      email: 'user@gmail.com',
      password: 'secret'
    })

    const response = await request(app).delete('/delete')

    expect(response.status).toBe(401)
  })

  it('Should not delete a user with a invalid token', async () => {
    const response = await request(app).delete('/delete')
      .set('Authorization', 'ey4367yrhed982fgdsa')

    const response2 = await request(app).delete('/delete')
      .set('Authorization', 'Bearer')

    expect(response.status).toBe(401)
    expect(response2.status).toBe(401)
  })

  it('Should not delete a user with a malformatted token', async () => {
    const response = await request(app).delete('/delete')
      .set('Authorization', 'Barer ey4367yrfasf82fgdsa')

    expect(response.status).toBe(401)
  })

  it('Should not delete a user with a fake token', async () => {
    const response = await request(app).delete('/delete')
      .set('Authorization', 'Bearer eyj3b54bh234b124nuv56n4')

    expect(response.status).toBe(401)
  })
})
