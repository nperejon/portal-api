import AuthController from '@controllers/Auth.controller';
import { Router } from 'express'

const authRouter = Router();
const authController = new AuthController();

authRouter.post('/login', authController.login)
authRouter.post('/change-password')

export default authRouter