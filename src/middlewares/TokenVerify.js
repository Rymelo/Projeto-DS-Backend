const jwt = require('jsonwebtoken');
require('dotenv').config()

class TokenVerify {

    verify(request, response, next) {
        const theader = request.headers['authorization'];

        if (!theader) {
            return response.status(401).json({ message: 'O Token não foi fornecido' })
        }

        const token = theader.split(' ')[1]; // Separa o bearer

        if (!token) {
            return response.status(400).json({ message: 'O Token está malformado. Use o formato Bearer <token>' })
        }

        try {
            
            const verified = jwt.verify(token, process.env.APP_KEY_TOKEN);
            request.userID = verified.id;
            next();

        } catch (e) {
            
            return response.status(401).json({ message: 'O Token está inválido ou expirado', error: e })

        }
    }
}

module.exports = new TokenVerify();