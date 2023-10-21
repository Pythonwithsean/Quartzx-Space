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
  const { username, password } = req.body;
  // Accessing the email and password from the request body sent to this endpoint
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

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
      password: hashedPassword, // You should hash and salt the password for security
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
  const { username, password } = req.body;

  // Check if the user exists
  const existingUser = await userModel.findOne({ username: username });

  if (!existingUser) {
    return res.status(400).json({ message: "User does not exist" });
  }

  // Check if the password is correct
  const passwordCorrect = await bcrypt.compare(password, existingUser.password);

  if (!passwordCorrect) {
    return res.status(400).json({ message: "Invalid password" });
  }

  // Password is correct, proceed with the login
  res.json({ message: "Login successful" });
  console.log("Login successful");
});

// Define a route for user login, similar to /register

module.exports = { userRouter: router };
