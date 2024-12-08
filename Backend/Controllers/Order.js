const mongoose = require('mongoose');
const OrderModel = require('../Models/Order');
const CartModel = require('../Models/Cart');
const ProductModel = require('../Models/Product'); 
const { ObjectId } = mongoose.Types; 

const PlaceOrder = async (req, res) => {
    const { userId, shippingAddress } = req.body;

    try {
       
        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Invalid userId' });
        }
        if (!shippingAddress || shippingAddress.trim() === "") {
            return res.status(400).json({ error: 'Shipping address is required' });
        }

        const cart = await CartModel.findOne({ userId: new ObjectId(userId) }).populate('items.productId');

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ error: 'Cart is empty or user not found' });
        }

      
        for (let item of cart.items) {
            const product = item.productId;
            if (product.stock < item.quantity) {
                return res.status(400).json({ error: `Not enough stock for ${product.title}` });
            }
          
            product.stock -= item.quantity;
            await product.save();
        }

     
        const newOrder = await OrderModel.create({
            userId: new ObjectId(userId),
            products: cart.items.map(item => ({
                productId: item.productId._id,
                quantity: item.quantity,
                price: item.productId.price,
            })),
            totalPrice: cart.items.reduce((acc, item) => acc + (item.quantity * item.productId.price), 0),
            shippingAddress,
        });

      
        cart.items = [];
        await cart.save();

       
        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ error: 'Failed to place order' });
    }
};




module.exports = PlaceOrder;
