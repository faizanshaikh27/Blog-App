const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter a username']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password']
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
    },
    fullName: {
        type: String,
        required: [true, 'Please enter a full name']
    },
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role'
        }
    ]
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema);