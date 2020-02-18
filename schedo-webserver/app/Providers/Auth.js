require('dotenv').config()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../Models/UserModel")
const Conditions = require("../../helper/Conditions")


module.exports = {
    user: async (req) => {
        //get api key
        let apiKey = req.headers.authorization, decoded;

        //check if api key is set to headers
        if (!apiKey) {
            return {
                message: "No api key has been set",
                error: true
            }
        }

        apiKey = apiKey.split(' ')[1]

        try {
            decoded = await jwt.verify(apiKey, process.env.JWT_SECRET);
        } catch (e) {
            return false
        }

        //get user info by id
        const user = await User.query().findById(decoded.id)

        //delete user password
        delete user["password"]
        
        return user

    },

    attempt: async (credential) => {
        let user = await User.query()
        .findOne({ username: credential.username })

        if (user instanceof User == false) {
            return {
                message: "Cant find that user",
                error: true
            }
        }

        const isPasswordMatch =  await bcrypt.compare(credential.password, user.password)

        if (!isPasswordMatch) {
            return {
                message: "Wrong password",
                error: true
            }
        }

        //generate new token user
        const apiKey = await jwt.sign({ id: user.id, username: user.username}, process.env.JWT_SECRET)

        user = user.toJSON() //convert user to json
        user.apiKey = apiKey //add api key to userData

        //remove id and password
        delete user["id"]
        delete user["password"]

        return user
    },

    register: async (credential) => {

        //required field for register
        // const { fullname, username, password, idphone } = req.body

        

        //encrypt password
        const hashPassword = await bcrypt.hash(credential.password, 14)

        //insert new user
        const user = await User.query().insert({
            avatar: "",
            fullname: credential.fullname ,
            username: credential.username ,
            idphone: credential.idphone,
            password: hashPassword
        })

        let available = await User.query()
        .findOne({ username: user.username })

        if (credential.fullname == null) {
            return {
                message: "fullname required",
                error: true
            }
        }

        
        if (credential.username == null) {
            return {
                message: "username required",
                error: true
            }
        }

        if (credential.password == null) {
            return {
                message: "password required",
                error: true
            }
        }

        if (credential.idphone == null) {
            return {
                message: "id phone required",
                error: true
            }
        }

    
        if (available instanceof User != false) {
            return {
                message: "Username already exists",
                error: true
            }
        }

        return {
            message: "success!",
            error: false
        }
    }
}