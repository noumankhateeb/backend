const express = require('express')
const authenticate = require('../middleware/userMiddleware')

//controller functions
const { signupUser, loginUser, editUserProfile } = require('../controllers/userController');

const router = express.Router()

//signup route
router.post('/signup', signupUser)

//login route
router.post('/login', loginUser)

//login route
router.put('/edit',authenticate, editUserProfile)

module.exports = router