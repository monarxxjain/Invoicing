const express = require('express')
const { addDeal, investDeal, verifyDeal, breakDeal, getSellerDeals, saveDraft } = require('../controllers/seller/DealController')
const { authorization, roleAuthorization } = require('../middlewares/Auth')
const { getAllInvestedDeals } = require('../controllers/investor/DealController')
const { getInvestor } = require('../middlewares/investor/Auth')
const { extractInvestorFromToken } = require('../middlewares/investor/Deal')
const { getAllDeals, updateDealStatus } = require('../controllers/DealController')
const router = express.Router()

router.post('/getDeals', authorization, roleAuthorization(["INVESTOR", "ADMIN"]) , getAllDeals)
router.get('/getInvestedDeals', authorization, roleAuthorization(["INVESTOR", "ADMIN"]) , extractInvestorFromToken, getAllInvestedDeals)
router.post('/investDeal', authorization, roleAuthorization(["INVESTOR"]), getInvestor, investDeal)
router.put('/reqBreak', authorization, roleAuthorization(["INVESTOR"]), getInvestor, breakDeal)


router.post('/getSellerDeals',authorization, roleAuthorization(["SELLER", "ADMIN"]) , getSellerDeals)
router.post('/postDeal', authorization, roleAuthorization(["SELLER"]), addDeal)
router.post('/saveDraft', authorization, roleAuthorization(["SELLER"]), saveDraft)

// router.post('/verifyDeal', authorization, roleAuthorization(["ADMIN"]), verifyDeal);
router.put('/updateDealStatus', authorization, roleAuthorization(["ADMIN"]), updateDealStatus)
router.put('/sellerDealDecision', authorization, roleAuthorization(["SELLER"]), updateDealStatus)
router.delete('/breakDeal', authorization, roleAuthorization(["ADMIN"]), getInvestor, breakDeal);



module.exports = router