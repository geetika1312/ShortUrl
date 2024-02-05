//Importing Express and URL Controller Functions:
const express = require("express");
const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
} = require("../controllers/url");

const router = express.Router();

//Defining Routes and Associated Controller Functions:
router.post("/", handleGenerateNewShortURL);

router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;