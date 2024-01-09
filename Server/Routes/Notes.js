require("dotenv").config(); // Load environment variables from .env file
const cors = require("cors");
const express = require("express");
const NotesModel = require("../models/notes.models.js");

const io = require("socket.io")(5003 || 3001, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const router = express.Router();
router.use(cors());

//Create a note
router.post("/Create-Notes", async (req, res) => {
  const notes = req.body;
  try {
    // Check if title and content exist
    if (!notes.title) {
      return res.json({
        message: "Title is required.",
      });
    }

    // Check if a note with the same title already exists
    const existingNote = await NotesModel.findOne({ title: notes.title });

    if (existingNote) {
      return res.json({
        message: "Note with the same title already exists.",
      });
    }

    // Save the new note
    const newNote = new NotesModel({
      title: notes.title,
    });

    await newNote.save();

    res.json({
      message: "Note saved successfully.",
    });
  } catch (err) {
    res.json({
      error: err.message || "An error occurred while saving the note.",
    });
  }
});

//Get notes for client
router.get("/get-notes", async (req, res) => {
  try {
    const notes = await NotesModel.find({});

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

io.on("connection", (socket) => {
  console.log("Connected to socket");
  socket.on("send-changes", (delta, oldDelta, title, id) => {
    console.log(id);
    console.log(title);
    console.log(oldDelta);
    socket.broadcast.emit("receive-changes", delta);
  });
});

//Saving Notes Content to Database

router.delete("/delete-notes", async (req, res) => {
  const { title } = req.body;
  await NotesModel.deleteOne({ title: title });
  res.json({
    message: "Notes deleted successfully",
  });
});

module.exports = { NoteRouter: router };
