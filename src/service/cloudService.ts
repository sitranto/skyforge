import fileUtil from "../utils/fileUtil.js"
import Response from "../model/response.js";

export default class CloudService {
    private static readonly _filePath: string = "../config.json"

    public getAllClouds = async () => {
        try {
            return new Response(200, await fileUtil.getConfigData(CloudService._filePath).clouds)
        } catch (error) {
            throw error
        }
    }

    public getOneCloud = async (name: string) => {
        try {
            const data = await fileUtil.getConfigData(CloudService._filePath).clouds
            for (const item of data) {
                if (item.name == name) {
                    return new Response(200, item)
                }
            }
            return new Response(404, `Cloud ${name} not found`)
        } catch (err) {
            throw err
        }
    }

    public setNewCloud = async (name: string, path: string) => {
        try {
            const isCloudAlreadyExists = await this.getOneCloud(name)
            if (isCloudAlreadyExists.status == 404) {
                const data = await fileUtil.getConfigData(CloudService._filePath)
                await data.clouds.push({
                    "name": name,
                    "path": path
                })
                fileUtil.rewriteConfig(CloudService._filePath, data)
                return new Response(200, `Successfully created new cloud ${name}`)
            }
            return new Response(403, `Cloud with name ${name} already exists`)
        } catch (err) {
            throw err
        }
    }

    public deleteCloud = async (name: string) => {
        try {
            const data = await fileUtil.getConfigData(CloudService._filePath)
            for (const [i, item] of data.clouds.entries()) {
                if (item.name == name) {
                    data.clouds.splice(i, 1)
                    fileUtil.rewriteConfig(CloudService._filePath, data)
                    return new Response(200, `Successfully deleted cloud ${name}`)
                }
            }
            return new Response(404, `Cloud with name ${name} not found`)
        } catch (err) {
            throw err
        }
    }
}