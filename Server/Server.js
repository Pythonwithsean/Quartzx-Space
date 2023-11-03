require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const PORT = process.env.PORT || 3001; // Use PORT value from .env file or default to 3001
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const pwd = encodeURIComponent(process.env.MONGO_PASSWORD);
const uri = `mongodb+srv://pythonwithsean:${pwd}@quartzx.ehghmhv.mongodb.net/?retryWrites=true&w=majority`;
const { userRouter } = require("./Routes/User.js");
const http = require("http");
const WebSocket = require("ws");

//Connnecting database to server
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected…");
  })
  .catch((err) => console.log(err));

app.use(cors());
app.use(bodyParser.json());
app.use("/auth", userRouter);

//Creating Server
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

//Post when the front or client is sending data to server
// Get when the front or client is getting data from server

//POST FOR SENDING DATA
//REQUEST FOR GETTING DATA

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
