import fileUtil from "../utils/fileUtil.js"
import Response from "../model/response.js"

export default class FileService {
    private static readonly _filePath: string = "../config.json"

    public getAllFiles = async (name: string) => {
        try {
            const filePath = await this.getFilePath(name)
            if (filePath === "Nothing found") {
                return new Response(404, "Nothing found")
            }
            return new Response(200, fileUtil.readFiles(filePath))
        } catch (err) {
            throw err
        }
    }

    public uploadFile = async (name: string, file: any) => {
        try {
            const filePath = await this.getFilePath(name)
            if (filePath === "Nothing found") {
                return new Response(404, "Nothing found")
            }
            fileUtil.writeFile(filePath, file)
            return new Response(200, `Successfully uploaded ${name}.`)
        } catch (err) {
            throw err
        }
    }

    private getFilePath = async (name: string) => {
        try {
            const data = await fileUtil.getConfigData(FileService._filePath).clouds
            for (const item of data) {
                if (item.name == name) {
                    return item.path
                }
            }
            return "Nothing found"
        } catch (err) {
            throw err
        }
    }
}