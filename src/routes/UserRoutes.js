const express = require('express');
const UserController = require('../controllers/UserController');
const TokenVerify = require('../middlewares/TokenVerify');


const UserRoutes = express.Router();

// CRUD
UserRoutes.get('/v1/user', UserController.listar);

UserRoutes.get('/v1/user/:id', UserController.consultarPorId);

UserRoutes.post('/v1/user', UserController.criar);

UserRoutes.put('/v1/user/:id', TokenVerify.verify, UserController.atualizar);

UserRoutes.delete('/v1/user/:id', TokenVerify.verify, UserController.deletar);

module.exports = UserRoutes;