const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const cors = require('cors')
app.use(express.json());
app.use(cors("*"))
const PORT = process.env.PORT;
const Dbcon = require('./Util/Dbcon')
const Userrouter = require('./Routes/Auth')
const Productrouter = require('./Routes/Product')
const Cartrouter = require('./Routes/Cart')
const Orderrouter = require('./Routes/Order')
Dbcon();
app.use('/auth/api', Userrouter)
app.use('/auth/api', Productrouter)
app.use('/auth/api', Cartrouter)
app.use('/auth/api', Orderrouter)

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})