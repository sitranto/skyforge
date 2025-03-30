import fs from "fs";

class FileUtil {
    public getConfigData = (filePath: string) => {
        return JSON.parse(fs.readFileSync(filePath, "utf-8"))
    }

    public rewriteConfig = (filePath: string, data: any) => {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8")
    }

    public readFiles = (filePath: string) => {
        return fs.readdirSync(filePath)
    }

    public writeFile = (filePath: string, data: any) => {
        return fs.writeFileSync(filePath + `/${data.name}`, data.data, "utf-8")
    }
}

export default new FileUtil()