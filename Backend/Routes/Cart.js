const express = require('express');
const { AddCart, GetCart,RemoveFromCart } = require('../Controllers/Cart');
const CartProduct = express.Router();
CartProduct.post('/addcart', AddCart)
CartProduct.get('/getcart/:userId', GetCart)
CartProduct.post('/remove-cart',RemoveFromCart)


module.exports = CartProduct;