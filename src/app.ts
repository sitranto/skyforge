import express from "express"
import router from "./router/router.js"
import fileUpload from "express-fileupload"

const app = express()
const PORT = process.env.PORT || 3001;

app.use(fileUpload({}));
app.use(express.json())
app.use("/api", router)

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})