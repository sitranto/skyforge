import fileUtil from "../utils/fileUtil.js"
import Response from "../model/response.js";

export default class AuthService {
    public login = async(name: string, pass: string) => {
        try {
            const authData = {[name]: pass}
            const configData = await fileUtil.getConfigData("../config.json")
            for (const [i, user] of configData.users.entries()) {
                if (JSON.stringify(user) === JSON.stringify(authData)) {
                    return new Response(200, "Successfully authenticated")
                }
            }
            return new Response(403, `Authentication failed: ${name}`)
        } catch (err) {
            throw err
        }
    }
}