const jwt = require('jsonwebtoken');
const UserModel = require('../Models/User')

const verifytoken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided' })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next()
    } catch (error) {
        console.log('token verification failed', error);
        return res.status(403).json({ message: 'Invalid or Expired Token...!!' })

    }
}
const Profile = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found...!!' })
        }
        res.status(200).json(user)

    }
    catch (error) {
        console.error('Error fetching user:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }

}
module.exports = {verifytoken, Profile}