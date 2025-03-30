import axios from "axios"

class Http {
    public getAllClouds = async () => {
        return await axios.get("http://localhost:3001/api/clouds").then((res) => {
            return res.data
        });
    }
}

export default new Http()