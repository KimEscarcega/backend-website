const express = require('express');
const router = express.Router();
const database = require("../routes/db-config");

exports.current = (req, res) => {
    uID= req.session.userId;
    console.log(uID);
    console.log("getting current booking");

    database.query('select * from User_lot WHERE uID = ? order by date DESC LIMIT 1', [uID], (err, results) => {
        if (err) {
            throw err;
            
        }

        // Check if booking data exists
        if (results.length > 0) {

            const CurrentBooking = {
                        lot: results[0].lID,
                        date: results[0].date,
                        startTime: results[0].timein,
                        endTime: results[0].timeout,
                        price:results[0].price,
                     };


            return res.render("current", { uID: uID, CurrentBooking: CurrentBooking});
        } else {
         return res.render("current", { uID: uID, CurrentBooking: null });
        }
    });
};


      
