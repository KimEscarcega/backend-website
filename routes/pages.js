const express = require("express"); 
const router = express.Router();
const bodyParser = require('body-parser');
const session = require("express-session");

router.use(bodyParser.urlencoded({ extended: false }));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//controllers
const signupController = require('../Controllers/signup.js');
const loginController = require('../Controllers/login.js');
const accountController = require("../Controllers/account.js");

const bookingController = require("../Controllers/booking.js");
const currentController = require("../Controllers/current.js");
const futureController = require("../Controllers/future.js");
const pastController = require("../Controllers/past.js");

const authController = require("../Controllers/auth.js");
const reportController = require("../Controllers/report.js");
const feedbackController = require("../Controllers/feedback.js");



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const crypto = require('crypto');
const secretKey = crypto.randomBytes(64).toString('hex');

router.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false
}));



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get("/", (req,res)=>{
    res.render("index");
   
});

router.get("/login", (req,res)=>{
    res.render("login", { message: null });
});


router.post("/login", loginController.login);  //infromation that is checked 


router.get("/signup", (req,res)=>{
    res.render("signup");
});


router.post("/signup", signupController.signup);  //information submited to create an account 



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get("/main", (req,res) =>{ 
    const fullname = {
        firstname:req.session.firstname,
        lastname:req.session.lastname,
    }

    res.render("main", {fullname});
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//users information
router.get("/account", (req,res)=>{
    
    const userInfo = {

       firstname:req.session.firstname,
       lastname:req.session.lastname,
        email: req.session.email,
        phone: req.session.phone,
        uID: req.session.userId,

    }
    res.render("account", {userInfo});

});


//car info
router.post('/addCar', accountController.addCar);
router.delete('/deleteCar', accountController.deleteCar);
router.get('/getAllCars', accountController.getAllCars);

//cardinfo
router.post('/addCard', accountController.addCard);
router.delete('/deleteCard', accountController.deleteCard);
router.get('/getAllCards', accountController.getAllCards);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



router.get("/booking", (req,res)=>{
    res.render("booking");
    
});

router.get("/parkinglot", bookingController.checkbooking);

router.get("/confirm", (req,res)=>{

    const bookingrequest ={
        lotnumber: req.session.lotnumber,
        appdate:req.session.appdate,
        startTime:req.session.startTime,
        endTime:req.session.endTime,
        price:req.session.price,
    
    }
    res.render("confirm",{bookingrequest});

});

router.get("/confirmation", (req,res) =>{
    const bookingconfirmation ={
        lotnumber: req.session.lotnumber,
        appdate:req.session.appdate,
        startTime:req.session.startTime,
        endTime:req.session.endTime,
        price:req.session.price,
        
    }

    res.render("confirmation", {bookingconfirmation});
    
});


router.get("/notavailable", (req,res) =>{
    res.render("notavailable");
    
});

router.get("/Nopayment", (req,res) =>{
    res.render("Nopayment");
    
});



router.post('/booking', bookingController.bookingform);
router.post('/parkinglot', bookingController.lot);
router.post('/confirm', bookingController.confirmation);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Booking Tab//

router.get("/future", futureController.future);
router.get("/past", pastController.past);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//report

router.get("/report", (req,res)=>{
    
 res.render("report", {message:null});
});

//feedback
router.get("/feedback", (req,res)=>{
   res.render("feedback", {message:null});
});

router.get("/moreinfo", (req,res)=>{
    res.render("moreinfo");
});

router.post("/feedback", feedbackController.feedback);
router.post("/report", reportController.report);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//routes for forgot and reset password
router.get("/forgotPassword", (req, res) => {
    res.render("forgotten_password", {
        title: 'Forgotten Password'
    });
});

router.get("/resetPassword/:token/:email", (req, res) => {
    const token = req.params.token;
    const email = req.params.email;
    console.log(req);
    res.render("reset_password", {
        title: 'Reset Password',
        errors: undefined,
        email: email, // Pass email back to the template for rendering
        token: token
    });
});



//post methods for the forgot and reset
//routes for forgot and reset password
router.get("/forgotPassword", (req, res) => {
    res.render("forgotten_password", {
        title: 'Forgotten Password'
    });
});

router.get("/resetPassword/:token/:email", (req, res) => {
    const token = req.params.token;
    const email = req.params.email;
    console.log(req);
    res.render("reset_password", {
        title: 'Reset Password',
        errors: undefined,
        email: email, // Pass email back to the template for rendering
        token: token
    });
});



router.get("/resetPassword", (req, res) => {
    res.render("reset_password", {
        title: 'Reset Password',
        errors: undefined,
        email: undefined, // Pass email back to the template for rendering
        token: undefined
    });
});

router.post("/resetPassword", authController.HandleResetPassword);


//post methods for the forgot and reset
router.post("/forgotPassword", authController.HandleforgottenPassword);
router.post("/resetPassword/:token/:email", authController.HandleResetPassword);


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






