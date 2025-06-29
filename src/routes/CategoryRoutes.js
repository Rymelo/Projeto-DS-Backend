const express = require('express');
const CategoryController = require('../controllers/CategoryController');


const CategoryRoutes = express.Router();

// CRUD
CategoryRoutes.get('/v1/category/search', CategoryController.listar);

CategoryRoutes.get('/v1/category/:id', CategoryController.consultarPorId);

CategoryRoutes.post('/v1/category', CategoryController.criar);

CategoryRoutes.put('/v1/category/:id', CategoryController.atualizar);

CategoryRoutes.delete('/v1/category/:id', CategoryController.deletar);

module.exports = CategoryRoutes;