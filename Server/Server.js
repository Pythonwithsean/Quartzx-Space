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
const io = require("socket.io")(5001 || 3001, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
const { NoteRouter } = require("./Routes/Notes.js");

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
app.use("/notes", NoteRouter);

//Broadcast Changes too all clients
io.on("connection", (socket) => {
  console.log("Connected to socket");
  socket.on("send-changes", (delta) => {
    socket.broadcast.emit("receive-changes", delta);
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
