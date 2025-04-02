import { Router } from 'express'
import cloudRouter from "./cloudRouter.js"
import fileRouter from "./fileRouter.js"
import authRouter from "./authRouter.js";

const router = Router()

router.use('/clouds', cloudRouter)
router.use('/clouds', fileRouter)
router.use('/auth', authRouter)

export default router