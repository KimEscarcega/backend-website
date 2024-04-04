const database = require("../routes/db-config");
const bcrypt = require("bcryptjs");
const express = require('express');
const router = express.Router();


exports.addCar = (req, res) => {
    // Retrieve car data from the request body
    const make = req.body.make;
    const model = req.body.model;
    const color = req.body.color;
    const plate = req.body.plate;
    const uID = req.body.uID; // Retrieve user's ID from the request body

    console.log("Received car data:", req.body); // Log received data

    if (!make || !model || !color || !plate|| !uID) {
        return res.json({ status: "error", error: "Please enter ALL information" });
    } else {
            // Construct SQL query for insertion
            const sql = `INSERT INTO vehicle (uID, make, model, color, plate) VALUES (?, ?, ?, ?, ?)`;
            database.query(sql, [uID,make, model, color, plate], (error, results) => {
                if (error) {
                    console.error("Insertion error:", error); // Log insertion error
                    return res.status(500).json({ status: "error", error: "Database error" });
                } else {
                    console.log("Car added successfully."); // Log successful insertion
                    return res.json({ status: "success", success: "Car added successfully" });
                }
            });
    }
};


exports.deleteCar = (req, res) => {
    // Retrieve plate of the car to delete from the request body
    const { plate } = req.body;
        database.query(`DELETE FROM vehicle WHERE plate = ?`, [plate], (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ status: "error", error: "Database error" });
            } else {
                return res.json({ status: "success", success: "Car deleted successfully" });
            }
        });
};

exports.getAllCars = (req, res) => {
    // Fetch all cars from the database
    const uID = req.session.userId;

    database.query(`SELECT * FROM vehicle WHERE uID = ?`, [uID], (error, results) => {
        if (error) {
            console.error('Error fetching cars from database:', error);
            return res.json({ error: 'Error fetching cars from database' });
        }
        console.log('Cars fetched from database');
        return res.json({ vehicle: results });
    });
};






//card controllers
exports.addCard = (req, res) => {
    // Retrieve card data from the request body
    const cardNo = req.body.cardNo;
    const cardExDate = req.body.cardExDate;
    const cardCVV = req.body.cardCVV;
    const zipCode = req.body.zipCode;
    const uID = req.body.uID; // Retrieve user's ID from the request body
   
    console.log("Received card", req.body); // Log received data

    if (!cardNo || !cardExDate || !cardCVV || !zipCode || !uID) {
        return res.json({ status: "error", error: "Please enter ALL information" });
    } else {
            // Construct SQL query for insertion
            const sqls = `INSERT INTO payment (uID, cardNo, cardExDate, cardCVV, zipCode) VALUES (?, ?, ?, ?, ?)`;
            database.query(sqls, [uID, cardNo, cardExDate, cardCVV, zipCode], (error, results) => {
                if (error) {
                    console.error("Insertion error:", error); // Log insertion error
                    return res.status(500).json({ status: "error", error: "Database error" });
                } else {
                  res.redirect("account");
                    console.log("Card added successfully."); // Log successful insertion
                }
            });
    }
};


exports.deleteCard = (req, res) => {
    // Retrieve plate of the card to delete from the request body
    const { cardNo } = req.body;
        database.query(`DELETE FROM payment WHERE cardNo = ?`, [cardNo], (error, results) => {
            if (error) {
                console.error(error);
                return res.json({ status: "error", error: "Database error" });
            } else {
                return res.json({ status: "success", success: "Card was deleted" });
            }
        });
};

exports.getAllCards = (req, res) => {
    // Fetch all cards from the database
    const uID=req.session.userId;
    database.query('SELECT * FROM payment WHERE uID = ?',[uID], (error, results) => {
        if (error) {
            console.error('Error fetching cards from database:', error);
            return res.json({ error: 'Error fetching cards from database' });
        }
        console.log('Cards fetched from database');
        return res.json({ payment: results });
    });
};
