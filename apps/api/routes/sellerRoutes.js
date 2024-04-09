const express = require('express')
const { authorization, roleAuthorization, getEmployee } = require('../middlewares/Auth')
const { getSellers } = require('../controllers/seller/SellerController')
const { handleSellerRequest } = require('../controllers/seller/AuthController')
const router = express.Router()

router.post('/get', authorization, roleAuthorization(["ADMIN"]), getSellers)
router.put('/approveSeller', authorization, roleAuthorization(["ADMIN"]), handleSellerRequest)

module.exports = router