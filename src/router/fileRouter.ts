import { Router } from 'express'
import FileController from "../controller/fileController.js"

const fileRouter = Router()
const fileController = new FileController()

fileRouter.get('/:name/files', fileController.getAllFiles)

fileRouter.post('/:name/files', fileController.uploadFile)

fileRouter.post('/:name/files/folder', fileController.createFolder)

fileRouter.delete('/:name/files/:file', fileController.deleteFile)

export default fileRouter