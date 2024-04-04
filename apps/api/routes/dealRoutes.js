const express = require('express')
const { addDeal } = require('../controllers/seller/DealController')
const { authorization, roleAuthorization } = require('../middlewares/Auth')
const prisma = require('../db')

const router = express.Router()

router.post('/postDeal', addDeal)


module.exports = router