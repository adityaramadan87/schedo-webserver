let express = require("express")
let app = express()

let AuthController = require("./../app/Src/Controllers/AuthController")
let UserController = require("./../app/Src/Controllers/UserController")
let Auth = require("./../app/Providers/Auth")

app.get("/auth", AuthController.index)
app.post("/auth/login", AuthController.login)
app.post("/auth/register", AuthController.reg)

app.get("/get/user", UserController.getUsers)

module.exports = app