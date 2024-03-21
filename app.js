const express = require("express");//create objects express 
const database = require("./routes/db-config");
const cookieParser = require("cookie-parser");
const app = express();
const cookie = require("cookie-parser");
const path = require('path');


// app 
app.use("/js", express.static(__dirname + "/Public/js"))
app.use("/css", express.static(__dirname + "/Public/css"))
app.use(express.static(path.join(__dirname, 'Public')));

app.set("view engine", "ejs");
app.set("views", "./views");



app.use(cookie());
app.use(express.json());









database.connect((err,res)=>{
    if (err) throw err;
    console.log("connected to Mysql")
    
})


// routes
app.use("/", require("./routes/pages"));
app.use("/api", require("./Controllers/auth"));


app.listen(8080, ()=>{
    console.log("Sever started on post 8080")
})
