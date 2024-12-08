const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const Product = require('../Models/Product');
const Dbcon = require('../Util/Dbcon')
Dbcon()
    .then(async () => {
    console.log('Connected to MongoDB');
    await Product.deleteMany({});

    const products = [
        {title:'I-Phone',desc:'I phone 16 with all latest features',price:82000,stock:20,category:'Electronics', image_url:'https://m.media-amazon.com/images/I/61-r9zOKBCL._AC_UY327_FMwebp_QL65_.jpg'},
        {title:'Headphone',desc:'Best TrueWireless HeadPhones',price: 799,stock:42,category:'Electronics', image_url:'https://static-assets-web.flixcart.com/www/linchpin/batman-returns/images/fk-default-image-75ff340b.png?q=90'},
        {title:'Electic Cycle',desc:'Truly Electric Cycle',price:6000, stock:10,category:'Electronics', image_url:'https://static-assets-web.flixcart.com/www/linchpin/batman-returns/images/fk-default-image-75ff340b.png?q=90'},
        {title:'Printer',desc:'Multifunction color Printer',price:3000,stock:32,category:'Electronics', image_url:'https://rukminim2.flixcart.com/image/612/612/k4a7c7k0/printer/y/j/z/canon-e3370-original-imafn2wyyxjjvzd6.jpeg?q=70'},
        {title:'Monitor',desc:'Best HD Monitor',price:35000,stock:8,category:'Electronics', image_url:'https://rukminim2.flixcart.com/image/312/312/l4x2rgw0/monitor/n/y/y/q24i-20-full-hd-23-8-66eegac3in-lenovo-original-imagfpgxzsk8ef26.jpeg?q=70'},
        {title:'Deodorant',desc:'For long lasting fragnance',price:2500,stock:30,category:'Perfumes', image_url:'https://rukminim2.flixcart.com/image/612/612/xif0q/deodorant/j/5/u/-original-imah4f7huqmdcdnz.jpeg?q=70'},
        {title:'Camera',desc:'For best Quality DSLR photos',price:4500,stock:19,category:'Electronics', image_url:'https://rukminim2.flixcart.com/image/312/312/xif0q/instant-camera/a/g/i/mini-12-instax-16791388-fujifilm-original-imagzkbphbwcqgyt.jpeg?q=70'},
        {title:'Shoes',desc:'For comfort and fashion!',price:2500,stock:80,category:'Footware', image_url:'https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/9/8/d/7-nexon-03-7-asian-white-mint-orange-original-imah3abmcge6htke.jpeg?q=70'},
        {title:'Watch',desc:'Elegant Analog Watch for men!',price:600,stock:35,category:'Fashion', image_url:'https://rukminim2.flixcart.com/image/612/612/xif0q/watch/m/x/3/1-rd-9102-fnb-men-original-imah4jwfzkfuwfhj.jpeg?q=70'},
        {title:'Shirt',desc:'Men Regular Fit full-sleeve Shirts!',price:1000,stock:55,category:'Fashion', image_url:'https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/d/v/p/xxl-st110-vebnor-original-imah6xbzetxmnpgh.jpeg?q=70'},
        {title:'Laptop',desc:'Apple Macbook Pro',price:92000,stock:5,category:'Electronics', image_url:'https://rukminim2.flixcart.com/image/312/312/xif0q/computer/2/v/v/-original-imagfdeqter4sj2j.jpeg?q=70'},
        
    ];  
    await Product.insertMany(products)
    console.log("product inserted successfully")
})
.catch(err => console.error('Error seeding products', err))