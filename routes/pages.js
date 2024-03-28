const express = require("express"); 
const router = express.Router();
const bodyParser = require('body-parser');
const session = require("express-session");


router.use(bodyParser.urlencoded({ extended: false }));



//controllers

const authController = require("../Controllers/auth");
const signupController = require('../Controllers/signup.js');
const loginController = require('../Controllers/login.js');
const loggedController = require("../Controllers/Loggedin.js");
const accountController = require("../Controllers/account.js");
const feedbackController = require("../Controllers/feedback.js");


//secret key ??(youtube)
const crypto = require('crypto');
const secretKey = crypto.randomBytes(64).toString('hex');

router.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false
}));
//




router.get("/", (req,res)=>{
    res.render("index");
   
});



router.get("/login", (req,res)=>{
    res.render("login", { message: null });
});

router.get("/signup", (req,res)=>{
    res.render("signup");
});


router.get("/main", (req,res) =>{ 
    const firstname = req.session.firstname;  
    res.render("main", {firstname : firstname});
});


router.get("/forgotpassword", (req,res)=>{
    res.render("forgotpassword");
});





//users information
router.get("/account", (req,res)=>{
    const firstname = req.session.firstname;
    const email=req.session.email;
    const phone=req.session.phone;
    const uID=req.session.userId
    res.render("account", {firstname: firstname,email:email,phone:phone,uID:uID});

});

//reservations

router.get("/booking", (req,res)=>{
    res.render("booking");
});

router.get("/parkinglot", (req,res)=>{
    res.render("parkinglot");

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




router.get("/feedback", (req,res)=>{
   res.render("feedback");
});




router.get("/moreinfo", (req,res)=>{
    res.render("moreinfo");
});









router.post("/feedback", feedbackController.feedback);

router.post("/feedback", (req, res) =>{
    res.redirect('/main');
});


//information submited to create an account 
router.post("/signup", signupController.signup);


//infromation that is checked 
router.post("/login", loginController.login);

router.post('/login', (req, res) => {
    res.redirect('/main');
});

router.post('/addCar', accountController.addCar);





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






















module.exports = router;
