const database = require("../routes/db-config");
const express = require('express');


exports.report = (req, res)=>{

  
  const d = req.body.reportDate;
  const st = req.body.reportConfirmedStartTime;
  const et = req.body.reportConfirmedEndTime;
  const ot = req.body.reportOccupiedTime;
  const s = req.body.reportSpot;
  const l = req.body.reportLicense;
  const uID = req.session.userId;

  console.log(uID);

   
  console.log("Received report data:", req.body); //views data input in console log
  
 

  if (!uID || !d || !st || !et || !ot || !s || !l){

    return res.json({ status: "error", error: "Please enter ALL information" });    //returns error to user if all information is not provided
    
  }


        // inserts info to the database
         database.query("insert into report (uID, rdate, rconfirmedStartTime, rconfirmedEndTime, roccupiedTime, rspot, rlicense) values (?, ?, ?, ?, ?, ?, ?)", [uID, d, st, et, ot, s, l],

        (error, results) => {
          if (error) {
              console.error(error);
              return res.status(500).json({ status: "error", error: "invalid submission please try again" });
          } else {
              return res.redirect("/main");   //successfully inserted in database and redirects to main page
          }
      });
   
    

   


  }

 
 