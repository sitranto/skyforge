import { Router } from 'express'
import CloudController from "../controller/cloudController.js"

const cloudRouter = Router()
const cloudController = new CloudController()

cloudRouter.get('/', cloudController.getAllClouds)

cloudRouter.get('/:name', cloudController.getOneCloud)

cloudRouter.post('/', cloudController.setNewCloud)

cloudRouter.delete('/:name', cloudController.deleteCloud)

export default cloudRouter