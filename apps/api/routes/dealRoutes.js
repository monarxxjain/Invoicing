const express = require('express')
const { addDeal, investDeal } = require('../controllers/seller/DealController')
const { authorization, roleAuthorization } = require('../middlewares/Auth')
const prisma = require('../db')

const router = express.Router()

router.post('/postDeal', authorization, roleAuthorization(["SELLER"]), addDeal)
router.put('/investDeal', authorization, roleAuthorization(["INVESTOR"]), investDeal)


module.exports = router