const express = require('express');
const ProductController = require('../controllers/ProductController');


const ProductRoutes = express.Router();

// CRUD
ProductRoutes.get('/v1/product/search', ProductController.listar);

ProductRoutes.get('/v1/product/:id', ProductController.consultarPorId);

ProductRoutes.post('/v1/product', ProductController.criar);

ProductRoutes.put('/v1/product/:id', ProductController.atualizar);

ProductRoutes.delete('/v1/product/:id', ProductController.deletar);

module.exports = ProductRoutes;