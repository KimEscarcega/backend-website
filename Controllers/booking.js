const { redirect } = require("statuses");
const database = require("../routes/db-config");
const express = require('express');
const router = express.Router(); 


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.bookingform = (req, res) => {
    
        const date = req.body.date;
        const startTime = req.body.startTime;
        const endTime = req.body.endTime;
        const uID = req.session.userId;



          // Calculate the total price
    const startDate = new Date(`${date}T${startTime}`);
    const endDate = new Date(`${date}T${endTime}`);

    // this will calculate in milliseconds
    const durationMs = endDate - startDate;
    const durationMinutes = durationMs / (1000 * 60);

    // price of 15 mins for 0.45 cents
    const pricePer15Minutes = 0.45;
    const price = (durationMinutes / 15) * pricePer15Minutes;

    //sessions
    req.session.appdate = date;
    req.session.startTime = startTime;
    req.session.endTime = endTime;
    req.session.price = price;

    if(!uID || !date || !startTime || !endTime){
        console.log("error");
    }else{
        res.redirect('/parkinglot');
    }
    

};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.checkbooking = (req, res) => {
    const date = req.session.appdate;
    const startTime = req.session.startTime;
    const endTime = req.session.endTime;


    database.query('SELECT * from user_lot WHERE date = ? AND ((timein <= ? AND timeout >= ?) OR (timein >= ? AND timeout <= ?))', [ date, startTime, endTime, startTime, endTime], (error, results) => {
        if (error) {
            console.error(error);
        } 
        if (results.length>0){
            console.log(results);
            
            
            const booked = results.map(user => user.lID);  // Extracting booked lot numbers

            res.render("parkinglot", { booked: booked });
        }else{

            const booked = results.map(user => user.lID);
            res.render("parkinglot", { booked: booked });
        }
    });
};


/////////////////////////////////////////////////////////////////////////////////////////////////////


// getting a parking lot 

exports.lot = (req,res) =>{

    const lot = req.body.spot;

    console.log("user selected Parking spot: ", lot);

    req.session.lotnumber= lot;
    res.redirect('/confirm');
    
};



/////////////////////////////////////////////////////////////////////////////////////////////////////

exports.confirmation = (req, res) => {
    const uID = req.session.userId;
    const lot = req.session.lotnumber;
    const date = req.session.appdate;
    const startTime = req.session.startTime;
    const endTime = req.session.endTime;
    const price = req.session.price;

    //check its between the times 
    database.query( 'SELECT * from user_lot WHERE lID = ? AND date = ? AND ((timein <= ? AND timeout >= ?) OR (timein >= ? AND timeout <= ?))', [lot, date, startTime, endTime, startTime, endTime], (error, results) => {
            if (error) {
               throw error;

            } else {
                if (results.length> 0) {
                    // Spot is already booked
                    res.redirect("/notavailable");
                } else {
                    // proceed with booking since its available 
                    database.query( `INSERT INTO user_lot (uID, lID, date, timein, timeout, price) VALUES (?, ?, ?, ?, ?, ?)`,[uID, lot, date, startTime, endTime, price],(error, results) => {
                         if (error) {
                           res.redirect("/notavailable");
                        } else {
                             res.redirect("/confirmation");
                            }
                        }
                    );
                }
            }
        }
    );
};



