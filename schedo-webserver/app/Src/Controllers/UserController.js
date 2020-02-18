const Auth = require("../../Providers/Auth")
let UserModel = require("../../Models/UserModel")

const UserController = {
    getUsers: async function(req, res) {
        const users = await UserModel.query().orderBy("id", "desc")

        const authUser = Auth.user(req)

        res.json({
            "response_code" : 0,
            "response_message" : "Success!",
            "data" : users
        })
    }
}

module.exports = UserController