import fileUtil from "../utils/fileUtil.js";

class CloudService {
    private static readonly _filePath: string = "../config.json"

    public getAllClouds = async () => {
        return await fileUtil.getConfigData(CloudService._filePath).clouds
    }

    public getOneCloud = async (name: string) => {
        const data = await fileUtil.getConfigData(CloudService._filePath).clouds
        for (const item of data) {
            if (item.name == name) {
                return item
            }
        }
        return "Nothing found"
    }

    public setNewCloud = async (name: string, path: string) => {
        if (await this.getOneCloud(name) == "Nothing found") {
            const data = await fileUtil.getConfigData(CloudService._filePath)
            await data.clouds.push({
                "name": name,
                "path": path
            })
            fileUtil.rewriteConfig(CloudService._filePath, data)
            return `Successfully created new cloud ${name}`
        }
        return `Error creating cloud.\nCloud with name "${name}" already exists.`
    }

    public deleteCloud = async (name: string) => {
        const data = await fileUtil.getConfigData(CloudService._filePath)
        for (const [i, item] of data.clouds.entries()) {
            if (item.name == name) {
                data.clouds.splice(i, 1)
                fileUtil.rewriteConfig(CloudService._filePath, data)
                return `Successfully deleted cloud ${name}`
            }
        }
        return "Nothing found"
    }
}

export default new CloudService();