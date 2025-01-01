const express = require('express');
const connectDB = require('./config/connectDB');
require('dotenv').config()
const app = express();
const PORT = process.env.PORT;

connectDB()
app.use(express.json());
app.use('/api/users', require('./routes/userRoutes.js'))
app.use('/api/roles', require('./routes/authRoutes.js'))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


