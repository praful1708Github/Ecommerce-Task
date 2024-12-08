const express = require('express');
const {Register,Login} = require('../Controllers/UserAuth');
const {verifytoken,Profile} = require('../Controllers/VerifyToken')
const Userrouter = express.Router();

Userrouter.post('/register', Register);
Userrouter.post('/login',Login);
Userrouter.get('/profile', verifytoken,Profile)


module.exports = Userrouter;