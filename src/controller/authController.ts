import AuthService from "../service/authService.js"

export default class AuthController {
    private static readonly authService = new AuthService()

    public login = async (req: any, res: any)=> {
        const {body} = req
        const response = await AuthController.authService.login(body.username, body.password)
        res.status(response.status).send(response.message)
    }
}