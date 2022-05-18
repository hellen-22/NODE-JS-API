const express = require("express");
const router = express.Router();
const logOutController = require("./../controllers/logoutController")

router.post("/", logOutController.logOut);

module.exports = router;