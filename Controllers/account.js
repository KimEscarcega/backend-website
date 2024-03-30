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

    console.log("Received car data:", req.body); // Log received data

    if (!make || !model || !color || !plate) {
        return res.json({ status: "error", error: "Please enter ALL information" });
    } else {
        database.query(`SELECT plate FROM vehicle WHERE plate = ?`, [plate], async (err, result) => {
            if (err) {
                console.error("Database error:", err); // Log database error
                return res.status(500).json({ status: "error", error: "Database error" });
            }

            console.log("Query result:", result); // Log query result

            if (result.length > 0) {
                console.log("Car with plate", plate, "already exists."); // Log car already exists
            }

            // Construct SQL query for insertion
            const sql = `INSERT INTO vehicle (make, model, color, plate) VALUES (?, ?, ?, ?)`;
            console.log("SQL query:", sql); // Log SQL query

            database.query(sql, [make, model, color, plate], (error, results) => {
                if (error) {
                    console.error("Insertion error:", error); // Log insertion error
                    return res.status(500).json({ status: "error", error: "Database error" });
                } else {
                    console.log("Car added successfully."); // Log successful insertion
                    return res.json({ status: "success", success: "Car added successfully" });
                }
            });
        });
    }
};


exports.deleteCar = (req, res) => {
    // Retrieve plate of the car to delete from the request body
    const { plate } = req.body;

    if (!plate) {
        return res.json({ status: "error", error: "Please provide the plate of the car to delete" });
    } else {
        database.query(`DELETE FROM vehicle WHERE plate = ?`, [plate], (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ status: "error", error: "Database error" });
            } else {
                return res.json({ status: "success", success: "Car deleted successfully" });
            }
        });
    }
};

exports.getAllCars = (req, res) => {
    // Fetch all cars from the database
    database.query('SELECT * FROM vehicle', (err, results) => {
        if (err) {
            console.error('Error fetching cars from database:', err);
            return res.status(500).json({ error: 'Error fetching cars from database' });
        }
        console.log('Cars fetched from database');
        return res.status(200).json({ vehicle: results });
    });
};