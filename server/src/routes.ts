import { Router } from 'express'
import { AuthenticationController } from '@controllers/AuthenticationController'
import { DeleteUserController } from '@controllers/DeleteUserController'
import { UserController } from '@controllers/UserController'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'
import { RefreshTokenController } from '@controllers/RefreshTokenController'

const routes = Router()

const userController = new UserController()
const authenticationController = new AuthenticationController()
const deleteUserController = new DeleteUserController()
const refreshTokenController = new RefreshTokenController()

routes.post('/sign-up', userController.create)
routes.post('/sign-in', authenticationController.execute)
routes.delete('/delete', ensureAuthenticated, deleteUserController.execute)
routes.post('/refresh-token', refreshTokenController.execute)

export { routes }
