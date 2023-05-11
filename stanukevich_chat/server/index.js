require("dotenv").config()
const express = require("express")
const sequelize = require("./database")
const models = require("./models/models")
const cors = require("cors")
const router = require("./routes/index")
const errorHandler = require("./middleware/ErrorHandlingMiddleware")


const PORT = process.env.PORT

const app = express()
app.use(cors("*"))
app.use(express.json())
app.use("/api", router)


// Обработка ошибок, последний Middleware
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({ alter: true })
        app.listen(PORT, () => {console.log("SERVER STARTED ON PORT = " + PORT)})
    } catch (error) {
        console.log(error)
    }
}

start()