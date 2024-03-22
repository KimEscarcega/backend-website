const express = require("express");//create objects express 
const app = express();
const bodyParser = require('body-parser');
const router = require("./routes/pages");
const Controller = require("./Controllers/auth.js")


app.use(bodyParser.json());

app.use("/", router);
app.use("/", Controller );

app.set("view engine", "ejs");



app.use(express.static('Public'));
app.listen(8080, ()=>{
    console.log("Sever started on post 8080")
})
