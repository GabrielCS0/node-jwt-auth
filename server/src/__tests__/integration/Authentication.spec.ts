import MockMongo from '../../database/mockDatabase/mockMongoDB'
import request from 'supertest'
import { app } from '../../app'

describe('Authentication', () => {
  beforeAll(async () => {
    await MockMongo.connect()
  })

  afterAll(async () => {
    await MockMongo.disconnect()
  })

  it('Should be able to authenticate', async () => {
    await request(app).post('/sign-up').send({
      name: 'user',
      email: 'user@gmail.com',
      password: 'secret'
    })

    const response = await request(app).post('/sign-in').send({
      email: 'user@gmail.com',
      password: 'secret'
    })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
  })

  it('Should not be able to authenticate with a wrong password', async () => {
    const response = await request(app).post('/sign-in').send({
      email: 'user@gmail.com',
      password: 'secret123'
    })

    expect(response.status).toBe(400)
  })

  it('Should not be able to authenticate with an invalid email', async () => {
    const response = await request(app).post('/sign-in').send({
      email: 'user123@gmail.com',
      password: 'secret'
    })

    expect(response.status).toBe(400)
  })
})
