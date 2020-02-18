require('dotenv').config()
let express = require("express")
let app = express()
let routeAPI = require("./routes/api")
let bodyParser = require("body-parser");

const port = process.env.APP_PORT

app.use(bodyParser.urlencoded({ extended: true }))
app.use("/api", routeAPI)

app.listen(port, () => console.log(`Server started on port ${port}`))