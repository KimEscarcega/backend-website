const database = require("../routes/db-config");
const bcrypt = require("bcryptjs");
const express = require('express');
const router = express.Router();




exports.signup = (req, res) => {
    
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;

    if (!firstname || !lastname || !email || !password || !phone) {
        return res.json({ status: "error", error: "Please enter ALL information" });

        
    } else {
        database.query(`SELECT uEmail FROM user WHERE uEmail = ?`, [email], async (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ status: "error", error: "Database error" });
            }

            if (result.length > 0) {
                
             return res.json({ status: "error", error: "Email already exists" });
                
            } else {


                database.query(
                    `INSERT INTO user (firstN, lastN, uEmail, uPassword, uPhone) VALUES (?, ?, ?, ?, ?)`,
                    [firstname, lastname, email, password, phone],
                    (error, results) => {
                        if (error) {
                            console.error(error);
                            return res.status(500).json({ status: "error", error: " Phone Number unvalid or Already exist" });
                        } else {
                            return res.json({ status: "success", success: "Successful" });
                        }
                    }
                );
            }
        });
    }
};




//module.exports = signup;

