const express = require('express');
const router = express.Router();

const {registerUser, loginUser, logoutUser, getuserDetails,updateuserDetails} = require('../controller/userController'); 

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/logout', logoutUser);
router.get('/:id/getuserdetails', getuserDetails);
router.put('/:id/updateuserdetails', updateuserDetails);

module.exports = router