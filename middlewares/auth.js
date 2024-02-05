/*
const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  //const userUid = req.cookies?.uid; //This middleware checks if the user is logged in by retrieving the "uid" cookie from the request.
  const userUid = req.headers['authorization'];

  // If there is no authorization header, redirect to the login page
  if (!userUid) return res.redirect("/login"); //If the "uid" cookie is not present, the user is redirected to the "/login" page.
  const token = userUid.split("Bearer ")[1]; //"Bearer [23u1232ukdh]" Extract the token from the authorization header
  const user = getUser(token);// Get user information using the token
  //const user = getUser(userUid); //It then attempts to get the user information using the getUser function (presumably from "../service/auth").

  if (!user) return res.redirect("/login"); //If the user information is not found, the user is redirected to the "/login" page again.

  req.user = user; //If the user is logged in, their information is stored in the req.user property
  next(); //the middleware calls the next() function to proceed to the next middleware or route handler
}

async function checkAuth(req, res, next) { //does not enforce a strict redirection if the user is not logged in.
  //const userUid = req.cookies?.uid;
  const userUid = req.headers['authorization'];// If there is no authorization header, move to the next middleware or route handler

  const token = userUid.split("Bearer ")[1];
  const user = getUser(token);

  //const user = getUser(userUid);

  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
};

*/


// Cleaning the above code

const { getUser } = require("../service/auth");

//This middleware is responsible for checking whether a user is authenticated or not.
function checkForAuthentication(req, res, next){
  // Step 1: Retrieve the authentication token from the "token" cookie
  const tokenCookie = req.cookies?.token;
  req.user = null;

  // Step 2: If there is no token, proceed to the next middleware or route
  if(!tokenCookie) return next();

  // Step 3: If there is a token, retrieve user information using getUser function
  const token = tokenCookie;
  const user = getUser(token);

  // Step 4: Attach user information to the request object
  req.user = user;

  // Step 5: Proceed to the next middleware or route
  return next();
}

// Step 7: Define restrictTo middleware with a default roles array
function restrictTo(roles = []) {
  // Step 8: Return a middleware function with req, res, and next parameters
  return function(req, res, next){
    // Step 9: If there is no user information, redirect to the "/login" route
    if(!req.user) return res.redirect("/login");
      // Step 10: If user's role is not included in the provided roles array, send "Unauthorized" response
      if(!roles.includes(req.user.role)) return res.end("UnAuthorized");
      // Step 11: Proceed to the next middleware or route
      return next();
  };
}

module.exports = {
  checkForAuthentication,    // Step 6: Export checkForAuthentication middleware
  restrictTo,   // Step 12: Export restrictTo middleware
}