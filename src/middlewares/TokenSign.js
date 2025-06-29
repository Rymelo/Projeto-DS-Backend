const jwt = require('jsonwebtoken');
require('dotenv').config();
const AuthController = require('../controllers/AuthController');

class TokenSign {

    async sign(request, response) {
        const { email, password } = request.body;
        const dados = await AuthController.login(email, password);

        if (dados) {

            const dadostoken = {
                id: dados.id,
                email: dados.email
            }

            const token = jwt.sign(dadostoken, process.env.APP_KEY_TOKEN, { expiresIn: '24h' });

            return response.status(200).json({
                token: token
            })
        }

        return response.status(400).json({ message: "Usuário ou senha inválidos." })
    }
}
module.exports = new TokenSign();