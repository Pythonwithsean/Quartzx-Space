const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/users.model.js");
const cors = require("cors");

const router = express.Router();
router.use(cors());

router.post("/register", async (req, res) => {
  // req is used to get data from whoever made a request to this endpoint /register
  // res is used to send data back to whoever made a request to this endpoint /register

  // Accessing the email and password from the request body sent to this endpoint
  const { username, password } = req.body;
  console.log(username);
  // Checking if the user email already exists in the database
  const existingUser = await userModel.findOne({ username: username });
  if (existingUser) {
    // User already exists
    console.log("User already exists");
    return res.status(700).json({ message: "User already exists" });
  } else {
    const newUser = new userModel({
      username: username,
      password: password, // You should hash and salt the password for security
      // Other user properties here
    });
    await newUser.save();
    console.log("User created successfully");
    return res.status(201).json({ message: "User created successfully" });
  }
});

router.post("/login", async (req, res) => {
  // Handle POST requests to /login
  // Send a response or perform necessary actions
  console.log("Login request received");
  try {
    const data = req.body;
    console.log(data);
    const newUser = new userModel(data); // Assuming userModel is a valid model
    await newUser.save();
    res.json({ message: "User created successfully" });
    console.log("User created successfully");
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: error.message });
  }
});

// Define a route for user login, similar to /register

module.exports = { userRouter: router };
