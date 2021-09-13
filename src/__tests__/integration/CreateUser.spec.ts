import MockMongo from '../../database/mockDatabase/mockMongoDB'
import request from 'supertest'
import { app } from '../../app'

describe('Create User', () => {
  beforeAll(async () => {
    await MockMongo.connect()
  })

  afterAll(async () => {
    await MockMongo.disconnect()
  })

  it('Should create a new user', async () => {
    const response = await request(app).post('/sign-up').send({
      name: 'user',
      email: 'user@gmail.com',
      password: 'secret'
    })

    expect(response.status).toBe(201)
    expect(response.body.user).toHaveProperty('_id')
    expect(response.body.user.password).toBe(undefined)
    expect(response.body).toHaveProperty('token')
    expect(response.body).toHaveProperty('refreshToken')
  })

  it('Should not create a new user with the same email', async () => {
    const response = await request(app).post('/sign-up').send({
      name: 'user',
      email: 'user@gmail.com',
      password: 'secret'
    })

    expect(response.status).toBe(400)
  })
})
