import { Router } from 'express'
import AuthController from "../controller/authController.js";

const authRouter = Router()
const authController = new AuthController()

authRouter.post('/login', authController.login)

export default authRouter