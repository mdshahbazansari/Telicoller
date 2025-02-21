import { Router } from 'express'
import { Login, Signup } from './userController'
import { Session } from '../utils/session'
const userRouter = Router()

userRouter.post('/signup', Signup)
userRouter.post('/login', Login)
userRouter.get('/session', Session)

export default userRouter
