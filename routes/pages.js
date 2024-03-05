const express = require('express');

const router = express.Router();


router.get('/', (req,res) =>{
    res.render('Main');

});



router.get('/Signup', (req,res) =>{
    res.render('Signup');

});

router.get('/Login', (req,res) =>{
    res.render('Login');

});


router.get('/ForgotPassword', (req,res) =>{
   res.render('ForgotPassword');

});

module.exports = router;
