import axios from "axios"

class Http {
    public getAllClouds = async () => {
        return await axios.get("http://localhost:3001/api/clouds").then((res) => {
            return res.data
        });
    }

    public getCloudData = async (name: string) => {
        return await axios.get(`http://localhost:3001/api/clouds/${name}/files`).then((res) => {
            return res.data.files
        })
    }

    public uploadFile = async (name: string, file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        return await axios.post(
            `http://localhost:3001/api/clouds/${name}/files`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            },
            )
    }

    public deleteFile = async (name: string, file: string) => {
        return await axios.delete(`http://localhost:3001/api/clouds/${name}/files/${file}`).then((res) => {
            return res.data
        })
    }
}

export default new Http()