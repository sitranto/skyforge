import CloudService from "../service/cloudService.js"

export default class CloudController {
    private static readonly cloudService = new CloudService()

    // Получение списка всех облаков
    public getAllClouds = async (req: any, res: any) => {
        const clouds = await CloudController.cloudService.getAllClouds()
        res.status(clouds.status).send(clouds.message)
    }

    // Получение одного облака
    public getOneCloud = async (req: any, res: any) => {
        const cloud = await CloudController.cloudService.getOneCloud(req.params.name)
        res.status(cloud.status).send(cloud.message)
    }

    // Создание нового облака
    public setNewCloud = async (req: any, res: any) => {
        const {body} = req
        const newCloud = await CloudController.cloudService.setNewCloud(
            body.name,
            body.path
        )
        res.status(newCloud.status).send(newCloud.message)
    }

    // Удаление облака
    public deleteCloud = async (req: any, res: any) => {
        const response = await CloudController.cloudService.deleteCloud(req.params.name)
        res.status(response.status).send(response.message)
    }
}