import { AuthenticationController } from '@controllers/AuthenticationController'
import { Router } from 'express'
import { UserController } from './controllers/UserController'

const routes = Router()

const userController = new UserController()
const authenticationController = new AuthenticationController()

routes.post('/sign-up', userController.create)
routes.post('/sign-in', authenticationController.execute)

export { routes }
