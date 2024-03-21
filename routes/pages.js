const express = require("express");
const router = express.Router();
const authController = require("../Controllers/auth");

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/Signup", (req, res) => {
    res.sendFile("Signup.html", { root: "./Public/" });
});

router.get("/Login", (req, res) => {
    res.sendFile("Login.html", { root: "./Public/" });
});

router.get("/ForgotPassword.html", (req, res) => {
    res.sendFile('ForgotPassword.html', { root: "./Public/" });
});

router.post("/ForgotPassword", authController.HandleforgottenPassword);

router.get("/ResetPassword", (req, res) => {
    res.sendFile('ResetPassword.html', { root: "./Public/" });
});

 // router.post("/ResetPassword", authController.HandleResetPassword);

module.exports = router;
