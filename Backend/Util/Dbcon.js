const mongoose = require('mongoose');
const Dbcon = async() =>{
    try{
        mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to the Database`, process.env.MONGO_URL)

    }
    catch(err){
        console.error(`Error in connecting to DataBase`,err)
        process.exit(1);

    }
}

module.exports = Dbcon