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

router.post("/:id/update-notes", async (req, res) => {
  try {
    const { title, content } = req.body;

    const existingNote = await ContentModel.findOne({ title: title });

    if (existingNote) {
      await ContentModel.updateOne({ title: title }, { content: content });
    } else {
      // If the note doesn't exist, create a new one
      await ContentModel.create({ title: title, content: content });
    }

    res.json({
      message: "Notes updated successfully",
    });
  } catch (error) {
    console.error("Error updating notes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
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

router.get("/:id/get-notes-content", async (req, res) => {
  const title = req.params.id;

  notesModel = await NotesModel.findOne({ title: title });
  res.json({
    content: notesModel,
    message: "Notes retrieved successfully",
  });
});

router.delete("/delete-notes", async (req, res) => {
  const { title } = req.body;
  await NotesModel.deleteOne({ title: title });
  res.json({
    message: "Notes deleted successfully",
  });
});

module.exports = { NoteRouter: router };
