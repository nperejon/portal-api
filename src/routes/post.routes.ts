import PostController from '@controllers/Post.controller';
import { checkToken } from '@middlewares/checkToken.middleware';
import { Router } from 'express'

const postRouter = Router();
const postController = new PostController();

postRouter.get('/', postController.find)
postRouter.post('/', checkToken, postController.create)

export default postRouter