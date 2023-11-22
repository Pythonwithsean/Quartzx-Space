require("dotenv").config(); // Load environment variables from .env file
const cors = require("cors");
const express = require("express");
const NotesModel = require("../models/notes.models.js");
const e = require("cors");
const router = express.Router();
router.use(cors());
const io = require("socket.io")(5000 || 3001, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

router.post("/send-notes", async (req, res) => {
  const notes = req.body;
  console.log(notes);

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

router.post("/:id/update-notes", async (req, res) => {
  const body = await req.body;
  const { title } = body;
  console.log(body.content);

  const existingNote = await NotesModel.findOne({ title: title });

  if (existingNote) {
    await NotesModel.updateOne({ title: title }, { content: body.content });
  }

  res.json({
    message: "Notes updated successfully",
  });
});

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

router.delete("/delete-notes", async (req, res) => {
  const { title } = req.body;
  await NotesModel.deleteOne({ title: title });
  res.json({
    message: "Notes deleted successfully",
  });
});

module.exports = { NoteRouter: router };
