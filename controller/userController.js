const User = require('../model/User');
const jwt = require('jsonwebtoken')
const hashPassword = require('../services/passwordHash')
const comparePassword = require('../services/comparePassword')
const mailService = require('../services/mailService')

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

        const hashedPassword = await hashPassword(password)

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            fullName
        })

        const subject = 'This is an Email Service'
        const text = `Hi ${fullName},\n\nThank you for registering with us. We're excited to have you on board!\n\nBest regards,\nYour Company Team`

        await mailService.sendEmail(email, subject, text) 


        res.status(200).json({ message: 'User created successfully', data: { _id: user._id, email: user.email } });
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ msg: 'Server error' })
    }
}


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: 'Please enter all fields' });
        }
        const user = await User.findOne({ email: email })

        if (user) {
            const isMatch = await comparePassword(password, user.password)
            if (isMatch) {
                const token = jwt.sign({
                    user: {
                        username: user.username,
                        email: user.email,
                        id: user.id
                    }
                }, process.env.ACCESS_TOKEN_SECRET)
                res.status(200).json({ message: 'Login successful', data: token, user: { id: user.id, username: user.username, email: user.email } });
            }
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ msg: 'Server error' })
    }
}


const logoutUser = async (req, res) => {
    res.clearCookie('token', { httpOnly: true })
    res.status(200).json({ message: 'Logged out successfully' })
}


const getuserDetails = async(req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password')
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
            res.status(200).json({ message: 'User details fetched successfully', data: user })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ msg: 'Server error' })
    }
}

const updateuserDetails = async(req, res) => {
    try {
        const id = req.params.id
        const updateUser = await User.findByIdAndUpdate(id, {$set: req.body}, {new: true}).select('-password')
        res.status(200).json({ message: 'User updated successfully', data: updateUser})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ msg: 'Server error'})
    }
}

module.exports = { registerUser, loginUser, logoutUser, getuserDetails, updateuserDetails }