const { render } = require("ejs");
const database = require("../routes/db-config");
const express = require('express');
const router = express.Router(); 


exports.parkinglot = (req, res) => {
    res.render("parkinglot");
};

exports.spot = (req,res) =>{


};