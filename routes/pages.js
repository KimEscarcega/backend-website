const express = require("express");
const router = express.Router();
const authController = require("../Controllers/auth");

router.get("/", (req, res) => {
    res.render("home", {
        title: 'Initial Page'
    });
});

router.get("/signup", (req, res) => {
    res.render("signup_form", {
        title: 'Sign Up'
    });
});

router.get("/login", (req, res) => {
    res.render("login_form", {
        title: 'Login'
    });
});

router.get("/forgotPassword", (req, res) => {
    res.render("forgotten_password", {
        title: 'Forgotten Password'
    });
});

router.post("/forgotPassword", authController.HandleforgottenPassword);

router.get("/resetPassword", (req, res) => {
    res.render("reset_password", {
        title: 'Reset Password',
        errors: undefined,
        email: undefined, // Pass email back to the template for rendering
        token: undefined
    });
});

router.post("/resetPassword", authController.HandleResetPassword);

module.exports = router;
