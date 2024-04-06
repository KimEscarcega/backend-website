const express = require('express');
const router = express.Router();
const database = require("../routes/db-config");

exports.future = (req, res) => {
    const uID = req.session.userId;
    console.log(uID);
    console.log("getting future bookings");

    database.query('SELECT * FROM User_lot WHERE uID = ? AND date > NOW() ORDER BY date ASC', [uID], (err, results) => {
        if (err) {
            throw err;
        }
        if (results.length > 0) {
            const futureBooking = results.map(future => ({
                lot: future.lNo,
                date: future.date,
                startTime: future.timein,
                endTime: future.timeout,
                price: future.price
            }));

            return res.render("future", { uID: uID, futureBooking: futureBooking });
        } else {
            return res.render("future", { uID: uID, futureBooking: [] }); // Sending an empty array if there are no future bookings
        }
    });
};