const UserModel = require('../models/UserModel')

class AuthController {

    async login(email, password) {
        const dados = await UserModel.findAll({
            where: {
                email: email,
                password: password
            }
        });

        if (dados.length) {
            return dados[0];
        }

        return null        

        }
    }


module.exports = new AuthController();