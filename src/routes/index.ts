import { Router } from 'express'

//Routers
import userRouter from './user.routes'
import authRouter from './auth.routes'
import avatarRouter from './avatar.routes'
import postRouter from './post.routes'

const routes = Router()

routes.use('/users',  userRouter)
routes.use('/auth', authRouter)
routes.use('/avatar', avatarRouter)
routes.use('/post', postRouter)

export default routes;