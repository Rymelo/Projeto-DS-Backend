const express = require('express');
const TokenVerify = require('../middlewares/TokenVerify');
const CategoryRoutes = require('./CategoryRoutes');
const ProductRoutes = require('./ProductRoutes');

const PrivateRoutes = express.Router();


PrivateRoutes.use(TokenVerify.verify);

PrivateRoutes.use(CategoryRoutes);
PrivateRoutes.use(ProductRoutes);

module.exports = PrivateRoutes;
