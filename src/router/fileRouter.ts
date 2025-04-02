import { Router } from 'express'
import FileController from "../controller/fileController.js"

const fileRouter = Router()
const fileController = new FileController()

fileRouter.get('/:name/files', fileController.getAllFiles)

fileRouter.post('/:name/files', fileController.uploadFile)

export default fileRouter