const database = require("../routes/db-config");
const bcrypt = require("bcryptjs");
const express = require('express');
const router = express.Router();

exports.feedback = (req, res) => {
    
    const feedbackDate = request.body.feedbackDate;
    const reviewtxt = request.body.reviewtxt;

   if (!feedbackDate || !reviewtxt) {
       return res.json({ status: "error", error: "Please enter both today's date and your review" });

        
    } else {
        database.query(
        `INSERT INTO user (fdate, text) VALUES (?, ?)`,
        [feedbackDate, reviewtxt],
        (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ status: "error", error: " You have already entered a review" });
            } else {
                return res.json({ status: "success", success: "Successful" });
            }
        }    )};
}






