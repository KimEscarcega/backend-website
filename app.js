const express = require("express");//create objects express 
const session = require("express-session");
const app = express();
const router = require("./routes/pages");
const bodyParser = require('body-parser');



app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());



app.use("/", router);









app.set("view engine", "ejs");



app.use(express.static('Public'));



app.listen(8080, ()=>{
    console.log("Sever started on post 8080")
})

