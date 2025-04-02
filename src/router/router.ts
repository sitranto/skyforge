import { Router } from 'express'
import cloudRouter from "./cloudRouter.js"
import fileRouter from "./fileRouter.js"

const router = Router()

router.use('/clouds', cloudRouter)
router.use('/clouds', fileRouter)

export default router