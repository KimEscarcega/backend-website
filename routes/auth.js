const express = require('express');
const authController = require('../Controllers/auth')
const router = express.Router();


router.post('/Signup', authController.Signup)



router.post('/Login', authController.Login)


router.post('/ForgotPassword', authController.ForgotPassword)




module.exports = router;
