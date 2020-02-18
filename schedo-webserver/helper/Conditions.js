const User = require("../app/Models/UserModel")

const Conditions = {
    
    isAvailableOnDB: async function (username) {
        let user = await User.query().findOne({ username: username })

        if (user == null) {
            return false
        }

        return true

    }
}

module.exports = Conditions