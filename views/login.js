
const database = require("../routes/db-config");
const express = require('express');
const router = express.Router();

exports.loginPage = (req, res) => {
    res.render("login");
};

exports.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

 
    //return what the messages are


    //if there is no email or password inserted 
    if (!email || !password) {
        return res.render("login", { message: "Please enter Email and Password" });
    } 




    // email and password are inserted
    database.query("SELECT * FROM user WHERE uemail = ? AND uPassword = ?;", [email, password], function(err, results) {
        if (err) {
            return res.render("login", { message: "Database error" });
        }

        // user is found 
        if (results.length > 0) {

            const firstname = results[0].firstN; // get first name 

            const id = results[0].uID;//get the user ID 


            console.log(firstname);
            console.log(id);

            //session variables
            req.session.userId = id;
            req.session.firstname = firstname;

            // Redirect to the main page
            return res.redirect("/main");

            
        } else { // if the information is wrong 
            return res.render("login", { message: "Incorrect Email/Password" });
        }
    });
};