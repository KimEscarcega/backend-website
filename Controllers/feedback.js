
const database = require("../routes/db-config");

  

exports.feedback = (req, res)=>{
  
  const d = req.body.feedbackDate;
  const r = req.body.reviewtxt;
  const uID = req.session.userId;

  console.log(uID);


  console.log("Received report data:", req.body); //views data input in console log

  if(!uID || !d || !r){

    return res.json({ status: "error", error: "Please enter ALL information" });   //if the user doesnt enter all info

  }else{

    database.query("insert into feedback (uID, fdate, text) values (?, ?, ?)", [uID, d, r],  //inserting into database
  
    (error, results) => {
      if (error) {
          console.error(error);
          return res.status(500).json({ status: "error", error: "invalid submission please try again" });
      } else {
          return res.redirect("/main");   //redirects user to main after they successfully submit and info enters the database correctly
      }
  });

  }
    
}; 


    
