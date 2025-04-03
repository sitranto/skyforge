import express from "express"
import cors from "cors"
import router from "./router/router.js"
import fileUpload from "express-fileupload"
import fileUtil from "./utils/fileUtil.js"
import { exec } from "child_process"

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(fileUpload({}))
app.use(express.json())
app.use("/api", router)

const start = async () => {
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`)
    })

    for (const cloud of fileUtil.getConfigData("../config.json").clouds) {
        exec(`cd ${cloud.path}\nhttp-server ./ -p ${cloud.port} --cors`)
    }
}

await start()

