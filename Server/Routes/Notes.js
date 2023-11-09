require("dotenv").config(); // Load environment variables from .env file
const cors = require("cors");
const express = require("express");
const NotesModel = require("../models/notes.models.js");
const e = require("cors");
const router = express.Router();
router.use(cors());

router.post("/send-notes", async (req, res) => {
  const notes = req.body;

  try {
    // Check if title and content exist
    if (!notes.title || !notes.content) {
      return res.json({
        message: "Title and content are required for saving notes.",
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
      content: notes.content,
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

router.get("/get-notes", async (req, res) => {
  const notes = await NotesModel.find();

  res.json({
    notes: notes,
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
