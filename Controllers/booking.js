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



        if (!date || !startTime || !endTime || !uID){
            res.redirect("/booking");

        }else{
            res.redirect ("/parkinglot");

            
        

      } 
};



// getting a parking lot 

exports.lot = (req,res) =>{
    const lot = req.body.spot;

    req.session.lotnumber= lot;

    if (!lot){
        console.log("user was not able to select parkinglot Number ");
    }


    console.log("user selected Parking spot: ", lot);

    res.redirect('/confirm');
    
};



exports.confirmation = (req, res) =>{

    uID= req.session.userId;
    lot = req.session.lotnumber;
    date= req.session.appdate;
    startTime=req.session.startTime;
    endTime=req.session.endTime;
    price=req.session.price;

    console.log(uID);



    
// select * from user_lot 
// WHERE lID = ? AND date = ? 
// AND ((timein <= ? AND timeout >= ?) OR (timein >= ? AND timeout <= ?) OR (timein <= ? AND timeout >= ?))




    database.query(`INSERT INTO user_lot (uID, lID, date, timein, timeout, price) VALUES (?, ?, ?, ?, ?,?)`, [uID,lot, date, startTime, endTime,price],
                    (error, results) => {
                        if (error) {
                            res.redirect("/notavailable");
                        } else {



                            res.redirect("/confirmation");
                        }
                    }
                );

}


