require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const PORT = process.env.PORT || 3001; // Use PORT value from .env file or default to 3001
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

// app.post("/submit-form", (req, res) => {
//   const data = req.body;
//   console.log(data);
//   console.log(data);
// });

app.post("/submit-form", (req, res) => {
  // Handle POST requests to /submit-form
  // Send a response or perform necessary actions
  res.json({ message: "Success" });
  const data = req.body;
  console.log(data);
});

//Post when the front or client is sending data to server
// Get when the front or client is getting data from server

app.get("/api", (req, res) => {
  res.json([
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
  ]); // Return some dummy data}]});
});

//POST FOR SENDING DATA
//REQUEST FOR GETTING DATA

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
