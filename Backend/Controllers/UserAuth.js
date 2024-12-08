
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const UserModel = require('../Models/User');

const Register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        const ExistingUSer = await UserModel.findOne({ email });
        if (ExistingUSer) {
            return res.status(400).json({ message: 'Email already exists in the Database' })
        }
        if (password.length < 8) {
            return res.status(400).json({ message: 'Password should be atleast 8 charactres long' })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const Newuser = new UserModel({
            fullName,
            email,
            password: hashedPassword
        })
        await Newuser.save();
        return res.status(200).json({ message: 'User Registration is Successful' })


    }
    catch (err) {
        console.log('error in register', err);
        return res.status(500).json({ message: 'Error in Registring User' })
    }


}
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const ExistingUSer = await UserModel.findOne({ email });
        if (!ExistingUSer) {
            return res.status(401).json({ message: 'User does not Exists' })
        }
        const Comparepassword = await bcrypt.compare(password, ExistingUSer.password);
        if (!Comparepassword) {
            return res.status(401).json({ message: 'Password did not Match!!!!!' })
        }
        const token = jwt.sign({
            id:ExistingUSer._id,
            email:ExistingUSer.email
        },
    process.env.JWT_SECRET,{
        expiresIn:'2h'
    })
        return res.status(200).json({ message: 'Login Successful',token , user: {
            id: ExistingUSer._id,
            email: ExistingUSer.email,
            fullName: ExistingUSer.fullName
        }})

    }
    catch (err) {
        console.log('err in login', err)
        return res.status(500).json({ message: 'Internal Server Error' })
    }

}

module.exports = {
    Register,
    Login
}