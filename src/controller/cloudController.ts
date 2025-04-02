import CloudService from "../service/cloudService.js"

export default class CloudController {
    private static readonly cloudService = new CloudService()

    // Получение списка всех облаков
    public getAllClouds = async (req: any, res: any) => {
        const clouds = await CloudController.cloudService.getAllClouds()
        res.send(clouds)
    }

    // Получение одного облака
    public getOneCloud = async (req: any, res: any) => {
        const cloud = await CloudController.cloudService.getOneCloud(req.params.name)
        res.send(cloud)
    }

    // Создание нового облака
    public setNewCloud = async (req: any, res: any) => {
        const { body } = req
        const newCloud = await CloudController.cloudService.setNewCloud(
            body.name,
            body.path
        )
        res.send(newCloud)
    }

    // Удаление облака
    public deleteCloud = async (req: any, res: any) => {
        res.send(await CloudController.cloudService.deleteCloud(req.params.name))
    }
}