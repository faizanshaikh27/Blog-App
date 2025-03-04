const Book = require('../model/Book')

const createBook = async(req, res) => {
    try {
        const {title, author, price} = req.body
        if (!title || !author || !price) {
            return res.status(400).json({ message: 'Please fill in all fields' })
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'Please upload a file' })
        }

        const mapImages = req.files.map((file) => file.path)
        const createdBook = await Book.create({
            title,
            author,
            price,
            user_id: req.user.id,
            images: mapImages
        })
        res.status(200).json({sucess: true, message: createdBook})
    } catch (error) {
        console.log(error)
    }
}

module.exports = {createBook}