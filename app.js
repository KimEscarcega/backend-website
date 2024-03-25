const express = require("express");//create objects express 
const app = express();
const session = require("express-session");
const bodyParser = require('body-parser');
const router = require("./routes/pages");



app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());



app.use("/", router);



app.set("view engine", "ejs");



app.use(express.static('Public'));


app.listen(8080, ()=>{
    console.log("Sever started on post 8080")
})
