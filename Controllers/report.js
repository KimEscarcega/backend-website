const database = require("../routes/db-config");
const express = require('express');


exports.report = (req, res)=>{

  //const id = req.body.uID;
  const d = req.body.reportDate;
  const st = req.body.reportConfirmedStartTime;
  const et = req.body.reportConfirmedEndTime;
  const ot = req.body.reportOccupiedTime;
  const s = req.body.reportSpot;
  const l = req.body.reportLicense;

   
  console.log("Received report data:", req.body); //views data input in console log
 

  if (!d || !st || !et || !ot || !s || !l){

    return res.json({ status: "error", error: "Please enter ALL information" });    //returns error to user if all information is not provided
    
  }
      //database.query("select * from user where uID=?", [id], (err,results) => {
        //console.log(id);
      

      //if (results.length > 0) {


        //const id = results[0].uID;//get the user ID 

       // console.log(id);


        //session variables

       // req.session.userId = id;

        // inserts info to the database
         database.query("insert into report (rdate, rconfirmedStartTime, rconfirmedEndTime, roccupiedTime, rspot, rlicense) values (?, ?, ?, ?, ?, ?)", [ d, st, et, ot, s, l],

        (error, results) => {
          if (error) {
              console.error(error);
              return res.status(500).json({ status: "error", error: "invalid submission please try again" });
          } else {
              return res.redirect("/main");   //successfully inserted in database and redirects to main page
          }
      });
   // })
    

    //  })


  }

 
 