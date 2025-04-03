import axios from "axios"

class Http {
    public createCloud = async (name: string, path: string)=> {
        return await axios.post("http://localhost:3001/api/clouds", { name: name, path: path }).then((res) => {
            return res.data
        })
    }

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
                headers: { 'Content-Type': 'multipart/form-data', 'enctype': 'multipart/form-data', 'charset': 'UTF-8' },
            },
            )
    }

    public deleteFile = async (name: string, file: string) => {
        return await axios.delete(`http://localhost:3001/api/clouds/${name}/files/${file}`).then((res) => {
            return res.data
        })
    }

    public login = async (name: string, password: string)=> {
        return await axios.post(`http://localhost:3001/api/auth/login`, {username: name, password: password}).then((res) => {
            return res.data
        })
    }

    public createFolder = async (name: string, folderPath: string, folderName: string) => {
        return await axios.post(`http://localhost:3001/api/clouds/${name}/files/folder`, {path: folderPath, folderName: folderName}).then((res) => {
            return res.data
        })
    }
}

export default new Http()