//This code defines an Express Router for handling routes related to displaying user-specific information and rendering signup/login views. 
const express = require("express");
const { restrictTo } = require("../middlewares/auth");
const URL = require("../models/url");

const router = express.Router();

router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {  //This route is accessible only to users with the role "ADMIN" (as enforced by the restrictTo middleware).
  const allurls = await URL.find({  }); //Retrieves all URLs from the database using URL.find({}).
  return res.render("home", {  //Renders the "home" view, passing the retrieved URLs as a variable.
    urls: allurls,
  });
});

//Defining Routes and Associated Handler Functions:
router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => { //This route (GET /) is associated with an asynchronous handler function.This route is accessible to users with the roles "NORMAL" and "ADMIN" (as enforced by the restrictTo middleware).
  //if (!req.user) return res.redirect("/login");  //It checks if a user is logged in (req.user). If not, it redirects to the "/login" page.
  const allurls = await URL.find({ createdBy: req.user._id }); //It uses URL.find to retrieve all URLs in the database that were created by the current user (req.user._id).
  return res.render("home", { //It renders the "home" view, passing the retrieved URLs as a variable.
    urls: allurls,
  });
});

router.get("/signup", (req, res) => { //This route (GET /signup) is associated with a handler function. It renders the "signup" view.
  return res.render("signup");
});

router.get("/login", (req, res) => { //This route (GET /login) is associated with a handler function. It renders the "login" view
  return res.render("login");
});

module.exports = router;