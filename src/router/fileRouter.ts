import { Router } from 'express'
import fileController from "../controller/fileController.js";

const fileRouter = Router()

fileRouter.get('/:name/files', fileController.getAllFiles)

fileRouter.post('/:name/files', fileController.uploadFile)

export default fileRouter