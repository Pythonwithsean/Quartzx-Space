const mongoose = require("mongoose");

//Create a schema for the user model you want to store in MongoDB
// /For example, if you want to store user data, create a schema for users.

const userScheme = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 3 },
});

//Creating the model/Actual database for the users

const userModel = mongoose.model("user", userScheme);

module.exports = userModel;
