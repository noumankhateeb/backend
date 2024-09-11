const User = require('../models/userModel')

//signup user
const signupUser = async (req, res) => {
    res.json({ mssg: 'signup user' })
}

//login user
const loginUser = async (req, res) => {
    res.json({ mssg: 'login user' })
}

module.exports = { signupUser, loginUser }