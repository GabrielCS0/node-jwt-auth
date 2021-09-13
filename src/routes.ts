import { Router } from 'express'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'
import { AuthenticationController } from '@controllers/AuthenticationController'
import { DeleteUserController } from '@controllers/DeleteUserController'
import { UserController } from '@controllers/UserController'
import { RefreshTokenController } from '@controllers/RefreshTokenController'
import { LogoutController } from '@controllers/LogoutController'

const routes = Router()

const userController = new UserController()
const authenticationController = new AuthenticationController()
const deleteUserController = new DeleteUserController()
const refreshTokenController = new RefreshTokenController()
const logoutController = new LogoutController()

routes.post('/sign-up', userController.create)
routes.post('/sign-in', authenticationController.execute)
routes.delete('/delete', ensureAuthenticated, deleteUserController.execute)
routes.post('/refresh-token', refreshTokenController.execute)
routes.delete('/logout', ensureAuthenticated, logoutController.execute)

export { routes }
