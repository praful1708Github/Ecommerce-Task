const express = require('express');
const CartModel = require('../Models/Cart')
const ProdctModel = require('../Models/Product')

const AddCart = async (req, res) => {
    const { userId, productId, quantity ,} = req.body;
    if (!Number.isInteger(quantity) || quantity <= 0) {
        return res.status(400).json({ error: "Invalid quantity. Must be a positive integer." });
    }

    if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
    }

    try {
        const product = await ProdctModel.findById(productId);
        if(!product){
            return res.status(404).json({ error: 'Product not found' });
        }      
        const productPrice = product.price; 
        const itemTotalPrice = productPrice * quantity;
        let cart = await CartModel.findOne({ userId });

        
        if (!cart) {
            cart = new CartModel({
                userId,  
                items: [],
            });
        }

        
        const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (productIndex > -1) {
            
            cart.items[productIndex].quantity += quantity;
        } else {
           
            cart.items.push({ productId, quantity , totalPrice: itemTotalPrice,});
        }

     
        await cart.save();

        res.status(200).json({ cart });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ error: 'Failed to add product to cart' });
    }
};


const GetCart = async (req, res) => {
    try {
        const cart = await CartModel.findOne({ userId: req.params.userId }).populate('items.productId');
        if (!cart) return res.status(404).json({ message: 'cart not found..!' });
        res.status(200).json(cart)

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve cart' });
    }

}
const RemoveFromCart = async (req, res) => {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
        return res.status(400).json({ error: 'userId and productId are required' });
    }

    try {
        
        const cart = await CartModel.findOne({ userId });
        
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found for this user' });
        }

    
        const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (productIndex === -1) {
            return res.status(404).json({ error: 'Product not found in cart' });
        }

     
        cart.items.splice(productIndex, 1);

        
        await cart.save();

     
        res.status(200).json({ message: 'Product removed from cart', cart });
    } catch (error) {
        console.error('Error removing product from cart:', error);
        res.status(500).json({ error: 'Failed to remove product from cart' });
    }
}

module.exports = { AddCart, GetCart , RemoveFromCart}