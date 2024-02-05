const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      default: "NORMAL",
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } //automatically adds createdAt and updatedAt fields to the documents, tracking when they were created and last updated.
);

const User = mongoose.model("user", userSchema);

module.exports = User; //the code exports the User model, allowing other modules to import and use it for performing CRUD (Create, Read, Update, Delete) operations on the "user" collection in the MongoDB database.