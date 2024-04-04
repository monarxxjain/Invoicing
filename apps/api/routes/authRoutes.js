const express = require('express')

const { getSeller } = require('../middlewares/seller/Auth')
const { getInvestor } = require('../middlewares/investor/Auth')
const { authorization, roleAuthorization, getEmployee } = require('../middlewares/Auth')

const { addEmployee, loginEmployee } = require('../controllers/AuthController')
const { registerNewInvestor } = require('../controllers/investor/AuthController')
const { approveSellerRequest, loginSeller, addNewSellerRequest } = require('../controllers/seller/AuthController')
const router = express.Router()

router.post('/signup/investor', getInvestor, registerNewInvestor)
router.post('/signup/seller', getSeller, addNewSellerRequest)
router.post('/add/employee', authorization, roleAuthorization(["ADMIN"]), addEmployee)

router.post('/login/seller', getSeller, loginSeller)
router.post('/login/company', getEmployee, loginEmployee)

router.put('/approveSeller', authorization, roleAuthorization(["ADMIN"]), approveSellerRequest)

module.exports = router