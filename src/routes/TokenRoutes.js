const express = require('express');
const TokenSign = require('../middlewares/TokenSign');

const TokenRoutes = express.Router();

// Rota de login para gerar token
TokenRoutes.post('/v1/user/token', TokenSign.sign)

module.exports = TokenRoutes;