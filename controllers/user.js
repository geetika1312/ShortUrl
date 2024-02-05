const { v4: uuidv4 } = require("uuid"); //uuidv4 function from the "uuid" library for generating unique identifiers.
const User = require("../models/user"); //it represents the user schema and model.
const { setUser } = require("../service/auth"); //related to user authentication.

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body; //It extracts name, email, and password from the request body.
  await User.create({ //create a new user in the database with the provided information.
    name,
    email,
    password,
  });
  return res.redirect("/"); //After creating the user, it redirects the user to the root ("/") URL.
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body; // It extracts email and password from the request body.
  const user = await User.findOne({ email, password }); //to find a user with the given email and password.

  if (!user) //If no user is found, it renders the "login" view with an error message.
    return res.render("login", {
      error: "Invalid Username or Password",
    });

  //const sessionId = uuidv4();
  //setUser(sessionId, user);
  const token = setUser(user); //If a user is found, it calls the setUser function 
  //res.cookie("uid", token); //sets it as a cookie named "uid".
  res.cookie("token", token); 
  return res.redirect("/");

  //return res.json({ token });
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};