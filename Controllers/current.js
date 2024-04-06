
const express = require('express');
const router = express.Router();
const database = require("../routes/db-config");

exports.current = (req, res) => {
    uID= req.session.userId;
    console.log(uID);
    console.log("getting current booking");

    database.query('SELECT * FROM User_lot WHERE uID = ? ORDER BY date DESC LIMIT 1', [uID], (err, results) => {
        if (err) {
            throw err;
            
        }
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

            //There is no current booking displayed 
         return res.render("current", { uID: uID, CurrentBooking: null });
        }
    });
};


      