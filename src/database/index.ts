import mongoose from 'mongoose'
import mongoConfig from '@config/mongo'

const {
  username,
  password,
  database
} = mongoConfig

if (`${process.env.NODE_ENV}` !== 'test') {
  mongoose.connect(`mongodb+srv://${username}:${password}@node-jwt-auth.6dja1.mongodb.net/${database}?retryWrites=true&w=majority`)
    .then(() => console.log('Database connected'))
    .catch((err) => console.log(`Database error ${err}`))
}

export { mongoose }
