require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const PORT = process.env.PORT || 3001; // Use PORT value from .env file or default to 3001
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const pwd = encodeURIComponent(process.env.MONGO_PASSWORD);
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://pythonwithsean:${pwd}@quartzx.ehghmhv.mongodb.net/?retryWrites=true&w=majority`;

//Create a schema for the user model you want to store in MongoDB
// /For example, if you want to store user data, create a schema for users.

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
});

const user = mongoose.model("user", userSchema);

//Create a new user and save it to the database

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected…");
  })
  .catch((err) => console.log(err));

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.use(cors());
app.use(bodyParser.json());

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

app.post("/submit-form", async (req, res) => {
  // Handle POST requests to /submit-form
  // Send a response or perform necessary actions

  try {
    const data = req.body;
    console.log(data);
    const newUser = new user(data);
    await newUser.save();
    res.json({ message: "User created successfully" });
    console.log("User created successfully");
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: error.message });
  }
});

//Define a run function for the ddatabase
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

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
