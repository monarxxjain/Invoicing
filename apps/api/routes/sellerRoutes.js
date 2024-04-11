const express = require('express')
const { authorization, roleAuthorization, getEmployee } = require('../middlewares/Auth')
const { getSellers, deleteSeller } = require('../controllers/seller/SellerController')
const { handleSellerRequest } = require('../controllers/seller/AuthController')
const { getSeller } = require('../middlewares/seller/Auth')
const { hasActiveDeal } = require('../middlewares/seller/Deal')
const router = express.Router()

router.post('/get', authorization, roleAuthorization(["ADMIN"]), getSellers)
router.put('/approveSeller', authorization, roleAuthorization(["ADMIN"]), handleSellerRequest)
router.post('/delete', authorization, roleAuthorization(["ADMIN"]), getSeller, hasActiveDeal, deleteSeller)

module.exports = router