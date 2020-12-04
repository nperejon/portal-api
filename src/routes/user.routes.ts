import { Router } from 'express'
import UserController from '@controllers/User.controller'
import { checkToken } from '@middlewares/checkToken.middleware'
import { checkPermission } from '@middlewares/checkPermission.middleware'
import PostController from '@controllers/Post.controller'

const userRouter = Router()
const userController = new UserController()
const postController = new PostController()

userRouter.get('/', userController.list)
userRouter.get('/:id', userController.findOne)
userRouter.get('/:id/posts', postController.findByUser)

userRouter.post('/',  checkToken, checkPermission, userController.create)
userRouter.put('/:id', checkToken, checkPermission, userController.edit)
userRouter.delete('/:id', checkToken, checkPermission, userController.delete)


export default userRouter