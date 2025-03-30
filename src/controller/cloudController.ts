import cloudService from "../service/cloudService.js";

class CloudController {
    public getAllClouds = async (req: any, res: any) => {
        const clouds = await cloudService.getAllClouds()
        res.send(clouds)
    }

    public getOneCloud = async (req: any, res: any) => {
        const cloud = await cloudService.getOneCloud(req.params.name)
        res.send(cloud)
    }

    public setNewCloud = async (req: any, res: any) => {
        const { body } = req
        const newCloud = await cloudService.setNewCloud(
            body.name,
            body.path
        )
        res.send(newCloud)
    }

    public deleteCloud = async (req: any, res: any) => {
        res.send(await cloudService.deleteCloud(req.params.name))
    }
}

export default new CloudController()