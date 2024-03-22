const express = require("express"); 
const database = require("../routes/db-config.js");
const router = express.Router();
const bodyParser = require('body-parser');
const Controller = require("../Controllers/auth.js")



//take the forms 
router.use(bodyParser.urlencoded({ extended: false }));

 
//const users= [];





router.get("/", (req,res)=>{
    res.render("index");
});



router.get("/login",  (req,res)=>{
    res.render("login");
});



router.get("/main", (req,res) =>{
    res.render("main", {firstname :'Kim'})
})


router.get("/forgotpassword", (req,res)=>{
    res.render("forgotpassword");
});



router.get("/signup", (req,res)=>{
    res.render("signup");
});

router.get("/account", (req,res)=>{
    res.render("account");
});

router.get("/booking", (req,res)=>{
    res.render("booking");
});

router.get("/report", (req,res)=>{
    res.render("report");
});

router.get("/feedback", (req,res)=>{
    res.render("feedback");
});

router.get("/moreinfo", (req,res)=>{
    res.render("moreinfo");
});









//information submited to create an account 
router.post("/signup", Controller, (req,res)=>{
    const { firstname, lastname, email, password, phone } = req.body;
    
})
//infromation that is checked 
router.post("/login", Controller, (req, res) =>{
    const { email, password } = req.body;

   

});



















module.exports = router;
