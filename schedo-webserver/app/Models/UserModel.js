const { Model } = require("objection")
const knex = require("../../database/connDB")

Model.knex(knex)

class UserModel extends Model {
    static get tableName() {
        return "users"
    }
}

module.exports = UserModel