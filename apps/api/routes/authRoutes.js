const express = require('express')

const { getSeller } = require('../middlewares/seller/Auth')
const { getInvestor } = require('../middlewares/investor/Auth')
const { authorization, roleAuthorization, getEmployee } = require('../middlewares/Auth')

const { addEmployee, loginEmployee, logout } = require('../controllers/AuthController')
const { registerNewInvestor, loginInvestorRequest, loginInvestor } = require('../controllers/investor/AuthController')
const { loginSeller, addNewSellerRequest } = require('../controllers/seller/AuthController')
const router = express.Router()

router.post('/signup/investor', getInvestor, registerNewInvestor)
router.post('/signup/seller', getSeller, addNewSellerRequest)
router.post('/add/employee', authorization, roleAuthorization(["ADMIN"]), addEmployee)

router.put('/login/investor/request', getInvestor, loginInvestorRequest)
router.post('/login/investor/check', getInvestor, loginInvestor)
router.post('/login/seller', getSeller, loginSeller)
router.post('/login/company', getEmployee, loginEmployee)


router.get('/logout', authorization, logout)

module.exports = router