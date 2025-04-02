import FileService from "../service/fileService.js"

export default class FileController {
    private static readonly fileService = new FileService()

    // Получение структуры всех файлов
    public async getAllFiles(req: any, res: any) {
        const response = await FileController.fileService.getAllFiles(req.params.name)
        res.status(response.status).send({
            files: response.message
        })
    }

    // Загрузка файла в облако
    public async uploadFile(req: any, res: any) {
        const { files } = req
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send("No files were uploaded.") //todo переделать под Response
        }
        await FileController.fileService.uploadFile(req.params.name, files.file)
        res.status(200).send("Successfully uploaded file")
    }
}