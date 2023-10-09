const express = require('express')
const app = express()
const cors=require("cors")
require('dotenv').config()
const PORT = process.env.PORT
const dbConnect=require("./Config/db")
const file_router = require('./Routes/fileRoutes')
dbConnect()
app.use(express.json())
app.use(cors())

app.use("/api/",file_router)

app.listen(PORT)
