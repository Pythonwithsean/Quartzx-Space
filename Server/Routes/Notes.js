require("dotenv").config(); // Load environment variables from .env file
const cors = require("cors");
const express = require("express");
const http = require("http"); // Import http module for creating the server
const socketIo = require("socket.io");
const NotesModel = require("../models/notes.models.js");

const app = express();
const server = http.createServer(app); // Create a server instance using Express app
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

// Define routes
app.post("/Create-Notes", async (req, res) => {
  const { title, user } = req.body;

  try {
    // Check if title and content exist
    if (!title) {
      return res.json({
        message: "Title is required.",
      });
    }

    // Check if a note with the same title already exists
    const existingNote = await NotesModel.findOne({ title: title });

    if (existingNote) {
      return res.json({
        message: "Note with the same title already exists.",
      });
    }

    console.log("New Notes Created");

    // Save the new note
    const newNote = new NotesModel({
      title: title,
      user: user,
    });

    await newNote.save();

    res.json({
      message: "Note saved successfully.",
    });
    res.status(200).end();
  } catch (err) {
    res.status(500).json({
      error: err.message || "An error occurred while saving the note.",
    });
  }
});

app.post("/get-notes", async (req, res) => {
  const { user } = req.body;

  try {
    const notes = await NotesModel.find({ user: user });

    if (notes.length === 0) return;

    // Extract titles from the array of notes
    const titles = notes.map((note) => note.title);

    res.json({
      notes: titles,
      message: "Notes retrieved successfully",
    });
  } catch (error) {
    console.error("Error retrieving notes:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

app.delete("/delete-notes", async (req, res) => {
  const { title, user } = req.body;
  await NotesModel.findOne({
    title: title,
    user: user,
  })
    .then((note) => NotesModel.deleteOne(note))
    .then(() => res.sendStatus(200))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Socket.io connection handling
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

const PORT = process.env.PORT || 5000; // Use the port from environment variables or default to 5000

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server }; // Export the app and server for testing purposes
