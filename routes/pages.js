const express = require("express");
const router = express.Router();
const authController = require("../Controllers/auth");
const session = require("express-session");



router.use(bodyParser.urlencoded({ extended: false }));


//secret key ??(youtube)
const crypto = require('crypto');
const secretKey = crypto.randomBytes(64).toString('hex');

router.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false
}));
//

//controllers
//const Controller = require("../Controllers/auth.js");
const signupController = require('../Controllers/signup.js');
const loginController = require('../Controllers/login.js');
//const loggedController = require("../Controllers/Loggedin.js");


router.get("/", (req, res) => {
    res.render("home", {
        title: 'Initial Page'
    });
});

router.get("/signup", (req, res) => {
    res.render("signup_form", {
        title: 'Sign Up'
    });
});

router.get("/login", (req, res) => {
    res.render("login_form", {
        title: 'Login'
    });
});

router.get("/forgotPassword", (req, res) => {
    res.render("forgotten_password", {
        title: 'Forgotten Password'
    });
});


router.get("/main", (req,res) =>{ 
    const firstname = req.session.firstname;  
    res.render("main", {firstname : firstname});
});


//users information
router.get("/account", (req,res)=>{
    res.render("account");
});

//reservations

router.get("/booking", (req,res)=>{
    res.render("booking");
});

router.get("/current", (req,res)=>{
    res.render("current");
});

router.get("/future", (req,res)=>{
    res.render("future");
});

router.get("/past", (req,res)=>{
    res.render("past");
});


//report

router.get("/report", (req,res)=>{
    res.render("report");
});



//other
router.get("/feedback", (req,res)=>{
    res.render("feedback");
});

router.get("/moreinfo", (req,res)=>{
    res.render("moreinfo");
});




//information submited to create an account 
router.post("/signup", signupController.signup);


//infromation that is checked 
router.post("/login", loginController.login);

router.post('/login', (req, res) => {
    res.redirect('/main');
});

















router.post("/forgotPassword", authController.HandleforgottenPassword);

router.get("/resetPassword", (req, res) => {
    res.render("reset_password", {
        title: 'Reset Password',
        errors: undefined,
        email: undefined, // Pass email back to the template for rendering
        token: undefined
    });
});

router.post("/resetPassword", authController.HandleResetPassword);

module.exports = router;
