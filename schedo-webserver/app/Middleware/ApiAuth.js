require('dotenv').config()
const User = require("../Models/User")
const jwt = require("jsonwebtoken")

const ApiAuth = async (req, res, next) => {
    let apiKey = req.headers.authorization;
    if (!apiKey) {
        return res.json({
            response_code: 1,
            response_message: "No API key has been set",
            data: {},
            error: true
        })
    }

    apiKey = apiKey.split(' ')[1]
    let verify = {}

    try {
        verify = await jwt.verify(apiKey, process.env.JWT_SECRET)
    } catch (e) {
        return res.json({
            response_code: 1,
            response_message: "API key not valid",
            data: {},
            error: true
        })
    }

    const user =  await User.query().findById(verify.id)
    if (user instanceof User == false) {
        return json({
            response_code: 1,
            response_message: "User not found",
            data: {},
            error: true
        })
    }

    return next()

}

module.exports = ApiAuth;