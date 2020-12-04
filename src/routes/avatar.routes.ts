import { Router } from 'express'
import UploadsController from '@controllers/Avatar.controller'
import { checkToken } from '@middlewares/checkToken.middleware'
import uploadImage from '@middlewares/uploadImage.middleware'

const avatarController = new UploadsController()

const avatarRouter = Router()

avatarRouter.get('/:id', avatarController.getAvatar)
avatarRouter.post('/', checkToken, uploadImage, avatarController.uploadAvatar)

export default avatarRouter