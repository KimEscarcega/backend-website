const express = require("express");
const path = require('path');
const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config({path: './.env'})

const app = express();
const database = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,

});

const publicDirectory = path.join(__dirname, "./views");
app.use(express.static(publicDirectory));

app.use(express.urlencoded({ extended:false}));
app.use(express.json());


app.set('view engine', 'hbs');

database.connect((err,res)=>{
    if (err){
        console.log(err)
    }
    console.log("connected to Mysql")
    
})

app.use('/', require('./routes/pages'));

app.use('/auth', require('./routes/auth'));

app.listen(8080, ()=>{
    console.log("Sever started on post 8080")
})