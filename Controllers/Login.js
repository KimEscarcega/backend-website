const jwt = require("jsonwebtoken");
const database = require("../routes/db-config");
const bcrypt = require("bcryptjs");

const Login = async (req, res) => {
    const { Email, Password } = req.body;
    
    
    if (!Email || !Password) {
        return res.json({ status: "Error", error: "Please enter Email and Password" });
    } 

    database.query("SELECT * FROM user WHERE uemail = ? AND uPassword = ?;", [Email, Password],  function(err, results) {
        if (err) throw err;

        if (results.length > 0) {
            console.log("User ${uID} has Logged In");
            return res.json({ status: "success", success: "User has Logged In" });

            
           
        } else{
            return res.json({ status: "error", error: "Incorrect Email/Password" });

        }
       

        

     
            
        
    });

};

module.exports = Login;