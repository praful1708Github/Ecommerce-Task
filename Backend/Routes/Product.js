const express = require('express');
const { GetProducts } = require('../Controllers/Product');
const ProductRouter = express.Router();
ProductRouter.get('/getproducts',GetProducts)

module.exports = ProductRouter