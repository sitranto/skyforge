import fileService from "../service/fileService.js"

class FileController {
    public async getAllFiles(req: any, res: any) {
        res.send({
            files: await fileService.getAllFiles(req.params.name)
        })
    }

    public async uploadFile(req: any, res: any) {
        const { files } = req
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send("No files were uploaded.");
        }
        await fileService.uploadFile(req.params.name, files.file)
        res.send("Successfully uploaded file")
    }
}

export default new FileController()