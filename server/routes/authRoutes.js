const express = require('express')
const { registerNewUser, loginUser, getAllUsers } = require('../controllers/AuthController')
const { getUser, authorization } = require('../middlewares/Auth')
const router = express.Router()

router.post('/signup', getUser, registerNewUser)

router.post('/login', getUser, loginUser)

router.get('/users', authorization, getAllUsers)

module.exports = router