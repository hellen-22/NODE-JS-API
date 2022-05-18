const express = require("express");
const app = express();
const router = express.Router();
const logInController = require("./../controllers/loginController");

router.post("/",logInController.logIn);


module.exports = router;