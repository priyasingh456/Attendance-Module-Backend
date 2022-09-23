const express = require("express")
const router = express.Router()
const {registerUser, loginUser, resetPassword, checkEmail} = require('../controller/userController')

router.route('/').post(registerUser)
router.route('/login').post(loginUser)
router.route('/resetpassword').post(resetPassword)
router.route('/checkemail').post(checkEmail);

module.exports = router