const User = require('../model/User');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const registerUser = async (req, res) => {
    try {
        const { username, email, password, fullName } = req.body;
        if (!username || !email || !password || !fullName) {
            return res.status(400).json({ msg: 'Please enter all fields' });
        }
    
        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            return res.status(400).json({ msg: 'Email already exists' });
        }
    
        const hashPassword = await bcrypt.hash(password, 10);
    
        const user = await User.create({
            username,
            email,
            password: hashPassword,
            fullName
        })
        res.status(200).json({message: 'User created successfully', data: { _id: user._id , email: user.email } });
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ msg: 'Server error' })
    }
}


const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: 'Please enter all fields' });
        }
        const user = await User.findOne({email: email})
        if (user && (bcrypt.compare(password, user.password))) {
            const token = jwt.sign({
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id
                }
            }, process.env.ACCESS_TOKEN_SECRET)
            res.status(200).json({message: 'Login successful', data: token});
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ msg: 'Server error' })
    }
}


const logoutUser = async(req, res) => {
    res.clearCookie('token', {httpOnly: true})
    res.status(200).json({message: 'Logged out successfully'})
}

module.exports = { registerUser, loginUser, logoutUser }