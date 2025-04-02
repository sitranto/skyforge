import FileService from "../service/fileService.js"

export default class FileController {
    private static readonly fileService = new FileService()

    // Получение структуры всех файлов
    public async getAllFiles(req: any, res: any) {
        res.send({
            files: await FileController.fileService.getAllFiles(req.params.name)
        })
    }

    // Загрузка файла в облако
    public async uploadFile(req: any, res: any) {
        const { files } = req
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send("No files were uploaded.")
        }
        await FileController.fileService.uploadFile(req.params.name, files.file)
        res.send("Successfully uploaded file")
    }
}