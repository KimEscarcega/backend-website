//const express = require('express');
const database = require("../routes/db-config");
//const bcrypt = require("bcryptjs");



  
 

exports.feedback = (req, res)=>{
  

  const r = req.body.reviewtxt;
  const d = req.body.feedbackDate;
   

    database.query("insert into feedback (fdate, text) values (?, ?)", [d,r]);
        
    
    
    
}; 


    


   

        
  




