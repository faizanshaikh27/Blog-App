const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Please enter a title']
    },
    author: {
        type: String,
        required: [true, 'Please enter an author']
    },
    price: {
        type: Number,
        required: [true, 'Please enter a price']
    },
    images: [{
        type: String,
        required: [true, 'Please upload at least one image']
    }]
}, {
    timestamps: true
})


module.exports = mongoose.model('Book', BookSchema)