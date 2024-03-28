const database = require("../routes/db-config");
const bcrypt = require("bcryptjs");
const express = require('express');
const router = express.Router();


exports.addCar = (req, res) => {
    const { make, model, color, plate } = req.body;
    const uID = req.user.id; // Assuming you have user authentication middleware

    if (!uID || !make || !model || !color || !plate) {
        return res.status(400).json({ status: "error", error: "Please enter all information" });
    }

    database.query(`SELECT uID FROM vehicle WHERE plate = ?`, [plate], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ status: "error", error: "Database error" });
        }

        if (result.length > 0) {
            return res.status(400).json({ status: "error", error: "Plate already exists" });
        }

        database.query(
            `INSERT INTO vehicle (uID, make, model, color, plate) VALUES (?, ?, ?, ?, ?)`,
            [uID, make, model, color, plate],
            (error, results) => {
                if (error) {
                    console.error(error);
                    return res.status(500).json({ status: "error", error: "Database error" });
                }
                return res.status(200).json({ status: "success", success: "Car added successfully" });
            }
        );
    });
};