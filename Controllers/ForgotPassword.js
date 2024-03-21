const database = require("../routes/db-config");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const q = "SELECT * FROM user WHERE uEmail = ?";
const w = "DELETE FROM password_resets WHERE uEmail = ?";
const e = "INSERT INTO password_resets (uEmail, token, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 15 MINUTE))";
const r = "UPDATE users SET password = ? WHERE email = ?"; 
const t = "SELECT * FROM password_reset WHERE email = ? AND token = ? AND expires_at > NOW()";

const handleForgotPassword = async (req, res) => {
  const email = req.body.email;
  console.log('Email:', email);

  database.query(q, [email], async (error, results) => {
    if (error) {
      console.error('Database query error:', error);
      res.status(500).send('error occurred');
    } else if (results.length > 0) {
      const resetToken = crypto.randomBytes(20).toString('hex');
      const hash = await bcrypt.hash(resetToken, 10);

      const deleteExistingTokens = w;
      database.query(deleteExistingTokens, [email], (error, results) => {
        if (error) console.log(error);
      });

      const insertToken = e;
      console.log('Hashed token:', hash);
      database.query(insertToken, [email, hash], (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).send('error occurred with token generation');
        } else {
          const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', //for gmail
            port: 465,
            secure: true,
            auth: {
              user: process.env.EMAIL,
              pass: process.env.EMAIL_PASSWORD
            }
          });

          // This will be the content that will be in the email 
          const mailOptions = { 
              from: process.env.EMAIL,
              to: email,
              subject: 'Password Reset',
              html: `<p>Hello ${email}, It has come to our attention that you would like to reset your password. </p><p>Please follow the link provided <a href="http://localhost:8080/Public/ResetPassword.html?token=${resetToken}&email=${email}">here</a> to reset your password now.</p>`
            };
            

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Error sending email:", error);
              res.status(500).send('Error sending email: ' + error.message);
            } else {
              console.log('Email sent: ' + info.response);
              res.status(200).send('Reset password link sent to your email address.');
            }
          });
        }
      });
    } else {
      res.status(401).send('Email not found');
    }
  });
};

exports.ResetPassword = async (req, res) => {
  const { email, newPassword, token } = req.body;
  
  try {
      //create the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Verify the reset token
      database.query( t, [email, token], (error, results) => {
          if (error) {
              console.error("Token verification error:", error);
              return res.status(500).send("reset token did not work.");
          }

          if (results.length === 0) {
              return res.status(400).send("Expired reset token.");
          }

          // Update the user's password in the database
          const updateQuery = r;
          database.query(updateQuery, [hashedPassword, email], (updateError, updateResults) => {
              if (updateError) {
                  console.error("Password update error:", updateError);
                  return res.status(500).send("error occurred while updating your password.");
              }
              res.status(200).send("The Password you provided has been updated successfully.");
          });
      });
  } catch (error) {
      console.error("Reset error:", error);
      res.status(500).send("error occurred while resetting the password.");
  }
};


