const { render } = require("ejs");
const database = require("../routes/db-config");
const express = require('express');
const router = express.Router(); 


exports.booking = (req, res) => {
    res.render("booking");
};


exports.bookingform = (req, res) => {
    
        const date = req.body.date;
        const startTime = req.body.startTime;
        const endTime = req.body.endTime;
        const uID = req.body.uID;


        req.session.appdate= date;
        req.session.startTime=startTime;
        req.session.endTime=endTime;

        
      
        console.log(date);
        console.log(uID);
        console.log(startTime);


        if (!date || !startTime || !endTime || !uID){
            res.render("/booking");

        }else{
            res.redirect ("/parkinglot");

            
        

      } 
};

exports.lot = (req,res) =>{
    const lot = req.body.spot;

    req.session.lotnumber= lot;


    console.log("user selected Parking spot: ", lot);
    res.redirect('/confirm');
    
};

exports.confim=(req,res) =>{
    
}

//code for the pricing 
exports.confirmation = (req, res) => {

    const { lotnumber, appdate, startTime, endTime } = req.session;
    const uID = req.body.uID;
 
    req.session.appdate= date;
    req.session.startTime=startTime;
    req.session.endTime=endTime;
    req.session.lotnumnber= lot;
    req.session.totalPrice= Price;
    
    
    //calculate start and endtime as a string
    const startDate = new Date(`${appdate}T${startTime}`);
    const endDate = new Date(`${appdate}T${endTime}`);

    // this will calculate in milisec
    const durationMs = endDate - startDate;

    // from milli to minutes
    const durationMinutes = durationMs / (1000 * 60);

    // price is 15 mins for 0.45 cents
    const pricePer15Minutes = 0.45;
    const price = (durationMinutes / 15) * pricePer15Minutes;

    console.log("Received data for confirmation:");
    console.log("Lot Num:", lotnumber);
    console.log("App Date:", appdate);
    console.log("Start Time:", startTime);
    console.log("End Time:", endTime);
    console.log("Duration (minutes):", durationMinutes);
    console.log("Price:", price);

    // Pass data to the template
    res.render("confirmation", { 
        bookingrequest: {
            lotnumber: lotnumber,
            appdate: appdate,
            startTime: startTime,
            endTime: endTime,
            totalPrice: price.toFixed(2) 
        }
    });
};

 


