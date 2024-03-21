const express = require("express");
const Loggedin = require("../Controllers/Loggedin")

const router = express.Router();


router.get("/", (req,res) =>{
    res.render("index");

});



router.get("/Signup", (req,res) =>{
    res.sendFile("Signup.html", {root: "./Public/"});

});

router.get("/Login", (req,res) =>{
    res.sendFile("Login.html", {root: "./Public/"});

});


router.get("/ForgotPassword", (req,res) =>{
   res.sendFile('ForgotPassword');

});




module.exports = router;
