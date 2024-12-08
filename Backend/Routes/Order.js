const express = require('express');
const OrderRouter = express.Router();
const PlaceOrder = require('../Controllers/Order')

OrderRouter.post('/place-order', PlaceOrder )

module.exports = OrderRouter