const express = require("express");
const router = express.Router("router");
const signUpController = require("../controllers/signupController");

router.post("/", signUpController.SignUp)

module.exports = router;