const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'] 
    },
    password:{
        type:String,
        required:true,
        min:8
    }

,},{
    timestamps:true
})
const UserModel = new mongoose.model('user',UserSchema)
module.exports = UserModel