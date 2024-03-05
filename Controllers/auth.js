const mysql = require("mysql2");
const database = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE

});




exports.Signup = (req,res)=>{
    console.log(req.body);
    const {FirstName, LastName, Email, Password, Phone} = req.body;

    database.query(`insert into user (firstN , lastN, uEmail, uPassword, uPhone ) values (?, ?, ?, ?, ?)`, [FirstName , LastName, Email, Password, Phone], (err, results) => {
        if (err){
            console.log(err);
        } else {
            res.send("Form submitted");
        }

    })
    
}

exports.Login= (req,res)=>{
    console.log(req.body);
    const {Email, Password} = req.body;

    database.query(`SELECT * FROM user WHERE uEmail = ? AND uPassword = ?`, [Email, Password], (err, results) => {
        if (err){
            console.log(err);
        } 

        if (results.length === 1) {
            res.send("Login successful"); 
        } else {
            res.status(401).send("Wrong Email or Password");
        }

    });
    
}

exports.ForgotPassword= (Email)=>{
    database.query('SELECT * FROM user WHERE uEmail = ? ', [Email] , (err, results) => {
        if (err) {
            console.log(err);
        }

        // Check if a user with the given email exists
        if (results.length > 0) {
            // If a user with the given email exists, log the first result
            //console.log(results[0]);
            res.send("Email Sent")
        } else {
            // If no user with the given email exists, handle it appropriately
            res.send("No user found with the provided email");
        }
    });

    
}










