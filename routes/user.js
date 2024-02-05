const express = require("express");
const { handleUserSignup, handleUserLogin } = require("../controllers/user"); //This line imports two controller functions,

const router = express.Router(); //creates an instance of an Express Router using express.Router()

router.post("/", handleUserSignup);
router.post("/login", handleUserLogin);

module.exports = router;