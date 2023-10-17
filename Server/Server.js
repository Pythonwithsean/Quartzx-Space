require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const PORT = process.env.PORT || 3001; // Use PORT value from .env file or default to 3001
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://pythonwithsean:Sophia%2320212@quartzx.ehghmhv.mongodb.net/?retryWrites=true&w=majority";

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

app.use(cors());
app.use(bodyParser.json());

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

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
