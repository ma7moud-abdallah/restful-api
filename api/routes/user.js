const express = require('express')
const router = express.Router()

const auth = require('../middeleware/auth')
const Controller = require('../controller/user')

// Add New User
router.post('/signup',Controller.userSignup)

// User Login
router.post('/login', Controller.userLogin)

//Delete User
router.delete('/:userid',auth,Controller.deleteUser)

module.exports = router