const express = require('express');
const router = express.Router();
const {createBook} = require('../controller/bookController')
const validateToken = require('../middleware/validateToken');
const {upload} = require('../services/fileUploadService');

router.use(validateToken)

router.post('/createBook', upload.array('images', 5), createBook)

module.exports = router