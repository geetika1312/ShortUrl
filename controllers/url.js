//This code defines two functions related to handling short URLs and their analytics:
const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" }); //It first checks if the request body contains a valid URL (body.url). If not, it returns a 400 (Bad Request) response with an error message.
  const shortID = shortid(); //It generates a short ID using the shortid library.

  await URL.create({ //It uses the URL.create method to create a new document in the MongoDB database using the "url" model.
    shortId: shortID,
    redirectURL: body.url, // original URL (body.url)
    visitHistory: [], //empty array for visit history,
    createdBy: req.user._id, //creator.
  });

  return res.render("home", { //it renders the "home" view with the generated short ID.
    id: shortID,
  });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId; //It extracts the short ID from the request parameters 
  const result = await URL.findOne({ shortId }); // find a document in the MongoDB database with the specified short ID.
  return res.json({ //It then returns a JSON response containing the total number of clicks and the visit history
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};