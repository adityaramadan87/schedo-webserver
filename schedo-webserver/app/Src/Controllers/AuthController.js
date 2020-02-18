const Auth = require("../../Providers/Auth")

const AuthController = {
    index: function (req, res) {
        res.send("hello world")
    },
 
    login: async function (req, res) {
        const credential = {
            username : req.body.username,
            password : req.body.password,
            idphone : req.body.idphone,
        }

        res.send(await Auth.attempt(credential))

    },

    reg: async function (req, res) {
        const credential = {
            fullname : req.body.fullname,
            username : req.body.username,
            password : req.body.password,
            idphone : req.body.password,
        }

        res.send(await Auth.register(credential))
    }

}

module.exports = AuthController