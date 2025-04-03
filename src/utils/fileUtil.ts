import fs from "fs";
import FileStructure from "./fileStructure.js";

class FileUtil {
    public getConfigData = (filePath: string) => {
        return JSON.parse(fs.readFileSync(filePath, "utf-8"))
    }

    public rewriteConfig = (filePath: string, data: any) => {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8")
    }

    public createDirectory = (path:string, name: string) => {
        fs.mkdirSync(path + "/" + name)
    }

    public readFiles = (filePath: string) => {
        return this.convertToDto(fs.readdirSync(filePath), filePath)
    }

    public writeFile = (filePath: string, data: any) => {
        return fs.writeFileSync(filePath + `/${data.name}`, data.data, "utf-8")
    }

    public deleteFile = (path: string, name: string) => {
        return fs.rmSync(path + "/" + name)
    }

    private convertToDto(files: string[], mainPath: string) {
        const fileStructure: FileStructure = {};

        function traverse(nowPath: string, files: string[]) {
            let pathName = nowPath.substring(mainPath.length)
            if (pathName.length == 0) {
                pathName = "/"
            }
            fileStructure[pathName] = [];

            for (const file of files) {
                const fullPath = nowPath + "/" + file
                if (!fs.existsSync(fullPath)) {
                    continue;
                }
                const stats = fs.statSync(fullPath);
                let filePath
                if (pathName == "/") {
                    filePath = pathName + file
                } else {
                    filePath = pathName + "/" + file
                }
                const dto: any = {
                    path: filePath,
                    name: file,
                    type: stats.isDirectory() ? 'folder' : 'file'
                };
                fileStructure[pathName].push(dto);

                if (stats.isDirectory()) {
                    const subFiles = fs.readdirSync(fullPath)
                    traverse(fullPath, subFiles)
                }
            }
        }

        traverse(mainPath, files);
        return fileStructure;
    }
}

export default new FileUtil()