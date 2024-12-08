const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    image_url:{
        type:String,
        required:false
    },
    price:{
        type:Number,
        required:true

    },
    category:{
        type:String,
        required:true

    },
    stock:{
        type: Number, 
        required: false
    },
    

},{
    timestamps:true
},)
const ProductModel = mongoose.model('product',ProductSchema);
module.exports = ProductModel