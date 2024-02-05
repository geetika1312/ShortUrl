const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: {  // A required string field representing the unique identifier for the shortened URL.
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: { //  A required string field representing the original URL that the short URL redirects to.
      type: String,
      required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }], //visitHistory: An array of objects, each containing a timestamp
                                                    // (a number) representing the visit history of the shortened URL.
                                                  //{ timestamps: true }, which automatically adds createdAt and 
                              //updatedAt fields to the documents, tracking when they were created and last updated.
    createdBy: { // A reference to the "users" collection using the mongoose.Schema.Types.ObjectId type.
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const URL = mongoose.model("url", urlSchema); //Mongoose will automatically pluralize this name when interacting 
                                              //with the database.
module.exports = URL;