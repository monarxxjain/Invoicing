const express = require('express')
const { addDeal, investDeal } = require('../controllers/seller/DealController')
const { authorization, roleAuthorization } = require('../middlewares/Auth')
const { getAllDeals } = require('../controllers/investor/DealController')

const router = express.Router()

router.get('/getDeals', authorization, roleAuthorization(["INVESTOR", "ADMIN"]) ,getAllDeals)
router.post('/postDeal', addDeal)
router.put('/investDeal', investDeal)


module.exports = router