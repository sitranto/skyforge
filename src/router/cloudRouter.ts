import { Router } from 'express'
import cloudController from "../controller/cloudController.js"

const cloudRouter = Router()

cloudRouter.get('/', cloudController.getAllClouds)

cloudRouter.get('/:name', cloudController.getOneCloud)

cloudRouter.post('/', cloudController.setNewCloud)

cloudRouter.delete('/:name', cloudController.deleteCloud)

export default cloudRouter