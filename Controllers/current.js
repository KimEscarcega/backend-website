const database = require("../routes/db-config");
const express = require('express');
const router = express.Router();


exports.current = (req, res) => {

    database.query('SELECT * FROM user_lot ORDER BY uID DESC LIMIT 1', (error, results) => {
        if (error) {
            console.error("Error retrieving current data:", error);
            return res.status(500).send("Error retrieving current data");
        }

        if (results.length > 0) {
            
                const ID = results[0].uID;
                const lot = results[0].lno;
                const date =  results[0].date;
                const startTime = results[0].timeIn;
                const endTime = results[0].timeOut;
                const price = results[0].price;

                console.log(lot);
                console.log(date);
                console.log(startTime);
                console.log(endTime);
                console.log(price);

                req.session.lno = lot;
                req.session.date = date;
                req.session.timeIn = startTime;
                req.session.timeIn = endTime;
                req.session.price = price;

                
            }

            else { // if the information is wrong 
                res.status(404).send("No data found in user_lot table");            }
        } 
        );
    };