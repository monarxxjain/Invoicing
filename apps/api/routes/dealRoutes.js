const express = require('express')
const { addDeal, investDeal, verifyDeal } = require('../controllers/seller/DealController')
const { authorization, roleAuthorization } = require('../middlewares/Auth')
const { getAllDeals } = require('../controllers/investor/DealController')
const { getInvestor } = require('../middlewares/investor/Auth')
const router = express.Router()

router.get('/getDeals', authorization, roleAuthorization(["INVESTOR", "ADMIN"]) ,getAllDeals)
router.post('/postDeal', authorization, roleAuthorization(["SELLER"]), addDeal)
router.put('/investDeal', authorization, roleAuthorization(["INVESTOR"]), getInvestor, investDeal)
router.post('/verifyDeal', authorization, roleAuthorization(["ADMIN"]), verifyDeal);


module.exports = router