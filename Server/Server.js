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
const { NoteRouter } = require("./Routes/Notes.js");
const http = require("http");
const server = http.createServer(app);
const NotesModel = require("./models/notes.models.js");

const io = require("socket.io")(server, {
  cors: {
    origins: "*",
    methods: ["GET", "POST"],
  },
});
//New
io.on("connection", (socket) => {
  console.log("Connected to socket");

  socket.on("get-document", async (id, title, user) => {
    const document = await NotesModel.findOne({ title: title, user: user });

    if (document) {
      socket.emit("load-document", document.content);
    }

    socket.join(id);

    socket.on("save-document", async (data) => {
      await NotesModel.findOneAndUpdate(
        { title: title },
        { $set: { content: data } }
      );
    });
    socket.on("send-changes", async (delta, oldDelta) => {
      socket.broadcast.to(id).emit("receive-changes", delta, oldDelta, title);
    });
  });
});

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

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
