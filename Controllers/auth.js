const express= require("express");
const router =express.Router();
const database = require("../routes/db-config");
const crypto = require("crypto");
const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");



// SQL queries used for password reset
const q = "SELECT * FROM user WHERE uEmail = ?";
const w = "DELETE FROM password_resets WHERE uEmail = ?";
const e = "INSERT INTO password_resets (uEmail, token, expires_at) VALUES (?, ?, DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 30 MINUTE))";
const t = "SELECT * FROM password_resets WHERE uEmail = ? AND token = ? AND expires_at > CURRENT_TIMESTAMP";
const r = "UPDATE user SET uPassword = ? WHERE uEmail = ?";


// Forgotten password handler
   exports.HandleforgottenPassword = asyncHandler(async (req, res) => {
    
    //get email from user table
    const email = req.body.email;
    console.log('uEmail:', email);
  
    //query to check if email is in the user table
    database.query(q , [email], async (error, results) => {
      if (error) {
        console.error('Database query error:', error);
        res.status(500).send('error occurred');
      } else if (results.length > 0) {
        const resetToken = crypto.randomBytes(20).toString('hex');

        //take of the bcypt and just set the reset to resetToken
        const hash = resetToken;
  
        //take off the token thats in the database 
        const deleteTokens = w;
        database.query(deleteTokens, [email], (error, results) => {
          if (error) console.log(error);
        });
  
        //insert new token where email tken and timestamp matches
        const insertToken = e;
        console.log('Token:', resetToken);
        database.query(insertToken, [email, hash], (error, results) => {
          if (error) {
            console.log(error);
            res.status(500).send('An error occurred with token generation');
          } else {
            const resetPasswordUrl = `http://localhost:8080/resetPassword/${resetToken}/${email}`;
            const transporter = nodemailer.createTransport({
              host: 'smtp.gmail.com', //for gmail
              port: 465,
              secure: true,
              auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
              }
            });
            //body of the gmail
          
          const mailOptions = { 
            from: process.env.EMAIL,
            to: email,
            subject: 'Password Reset',
            html: `<p>Hello ${email}, It has come to our attention that you would like to reset your password. </p><p>Please follow the link provided <a href="http://localhost:8080/resetPassword/${resetToken}/${email}">here</a> to reset your password now.</p>`
          };
              
              //Here the email will be sent if its in the database.
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) { 
                console.error("Error sending email:", error);
                res.status(500).send('Error sending email: ' + error.message);
              } 
              //if email is found
              else { 
                console.log('Email sent: ' + info.response);
                res.status(200).send('The password reset was sent to your email.');
              }
            });
          }
        });
      } 
      //print if email is not found
      else { 
        res.status(401).send('The Email you provided was not found');
      }
    });
  });




// Reset password handler
exports.HandleResetPassword = asyncHandler(async (req, res) => {
  const { email, token } = req.params; //url parameters
  const { newPassword, confirmPassword } = req.body; //data received from form

  // Check if newPassword and confirmPassword are the same
  if (newPassword !== confirmPassword) {
      return res.render('reset_password', {
          title: 'Reset Password',
          errors: 'The passwords did not match!',
          email: email, // Pass email back to the template for rendering
          token: token  // Pass token back to the template for rendering
      });
  }
  //check to see if email and token set throught the console
console.log(email);
console.log(token);

  if ( !email || !newPassword || !token) {
      return res.status(500).json({ error: ' email, newPassword, and token needed.' });
  }
  //this will give u a rundown of all that was provided 
  //console.log(results);

  // Verify the reset token in the database
   database.query(t, [email, token], (error, results) => {
      if (error) {
          console.error('Error verifying reset token:', error);
          return res.status(400).json({ error: 'error cannot verify reset token.' });
      }
      // Update the user's password in database
      database.query(r, [newPassword, email], (updateError, updateResults) => {
        if (updateError) {
            console.error('Error updating password:', updateError);
            return res.status(300).json({ error: 'Error occurred while updating the password.' });
        }
          // Delete token from database if its in there 
          database.query(w, [email], (deleteError, deleteResults) => {
              if (deleteError) {
                  console.error('Error deleting reset token:', deleteError);
                  
              }
              res.status(200).json({ message: 'The Password you provided has been reset successfully.' });
          });
      });
  });
});


