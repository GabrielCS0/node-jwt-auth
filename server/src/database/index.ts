import mongoose from 'mongoose'
import mongoConfig from '@config/mongo'

const {
  username,
  password,
  host,
  port,
  database
} = mongoConfig

if (`${process.env.NODE_ENV}` !== 'test') {
  mongoose.connect(`mongodb://${username}:${password}@${host}:${port}/${database}`)
}

export { mongoose }
