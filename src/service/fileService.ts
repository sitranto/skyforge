import fileUtil from "../utils/fileUtil.js"

export default class FileService {
    private static readonly _filePath: string = "../config.json"

    public getAllFiles = async (name: string) => {
        const filePath = await this.getFilePath(name)
        if (filePath === "Nothing found") {
            return "Nothing found"
        }
        return fileUtil.readFiles(filePath)
    }

    public uploadFile = async (name: string, file: any) => {
        const filePath = await this.getFilePath(name)
        if (filePath === "Nothing found") {
            return "Nothing found"
        }
        return fileUtil.writeFile(filePath, file)
    }

    private getFilePath = async (name: string) => {
        const data = await fileUtil.getConfigData(FileService._filePath).clouds
        for (const item of data) {
            if (item.name == name) {
                return item.path
            }
        }
        return "Nothing found"
    }
}