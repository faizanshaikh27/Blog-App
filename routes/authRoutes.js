const express = require('express')
const router = express.Router()

const {assignRole} = require('../controller/roleController')
const requireRole = require('../middleware/roleMiddleware')

router.post('/assign-role', requireRole('admin'), assignRole)

router.get('/admin', requireRole('admin'), (req, res) => res.send('Welcome, Admin!'));
router.get('/user', requireRole('user'), (req, res) => res.send('Welcome, User!'));

module.exports = router