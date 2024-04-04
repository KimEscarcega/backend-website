const express = require('express');
const router = express.Router();
const database = require("../routes/db-config");

exports.past = (req, res) => {
    const uID = req.session.userId;
    console.log(uID);
    console.log("getting past bookings");

    database.query('SELECT * FROM User_lot WHERE uID = ? AND date < NOW() ORDER BY date DESC', [uID], (err, results) => {
        if (err) {
            throw err;
        }
        if (results.length > 0) {
            const pastBooking = results.map(past => ({
                lot: past.lNo,
                date: past.date,
                startTime: past.timein,
                endTime: past.timeout,
                price: past.price
            }));

            return res.render("past", { uID: uID, pastBooking: pastBooking });
        } else {
            return res.render("past", { uID: uID, pastBooking: [] }); // Sending an empty array if there are no future bookings
        }
    });
};
