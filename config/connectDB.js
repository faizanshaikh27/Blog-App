const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Connected to Database')
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

module.exports = connectDB