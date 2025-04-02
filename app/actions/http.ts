import axios from "axios"

class Http {
    public getAllClouds = async () => {
        return await axios.get("http://localhost:3001/api/clouds").then((res) => {
            return res.data
        });
    }

    public getCloudData = async (name: string) => {
        return await axios.get(`http://localhost:3001/api/clouds/${name}/files`).then((res) => {
            console.log(res.data.files)
            return res.data.files
        })
    }
}

export default new Http()