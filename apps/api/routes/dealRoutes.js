const express = require('express')
const { addDeal, investDeal, verifyDeal } = require('../controllers/seller/DealController')
const { authorization, roleAuthorization } = require('../middlewares/Auth')
const { getAllDeals, getAllInvestedDeals } = require('../controllers/investor/DealController')
const { getInvestor } = require('../middlewares/investor/Auth')
const { extractInvestorFromToken } = require('../middlewares/investor/Deal')
const router = express.Router()

router.get('/getDeals', authorization, roleAuthorization(["INVESTOR", "ADMIN"]) , getAllDeals)
router.get('/getInvestedDeals', authorization, roleAuthorization(["INVESTOR", "ADMIN"]) , extractInvestorFromToken, getAllInvestedDeals)
router.post('/postDeal', authorization, roleAuthorization(["SELLER"]), addDeal)
router.put('/investDeal', authorization, roleAuthorization(["INVESTOR"]), getInvestor, investDeal)
router.post('/verifyDeal', authorization, roleAuthorization(["ADMIN"]), verifyDeal);


module.exports = router