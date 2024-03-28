const express = require('express')
const { registerNewUser } = require('../controllers/AuthController')
const { getUser } = require('../middlewares/Auth')
const router = express.Router()

router.post('/signup', getUser, registerNewUser)

module.exports = router