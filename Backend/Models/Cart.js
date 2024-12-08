const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    items:[
        {
            productId: { type: mongoose.Schema.Types.ObjectId , ref:'product', required:true},
            quantity: {
                type: Number,
               required:true,
               min: 1
            },
            totalPrice: {
                type: Number,
                required: true,
            },
           

        }
    ]
})
const CartModel = mongoose.model('Cart',cartSchema)
module.exports = CartModel