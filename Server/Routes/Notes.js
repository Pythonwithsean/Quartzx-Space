require("dotenv").config(); // Load environment variables from .env file
const cors = require("cors");
const express = require("express");
const NotesModel = require("../models/notes.models.js");
const router = express.Router();
router.use(cors());

router.post("/send-notes", async (req, res) => {
  const notes = await req.body;
  console.log(notes);
  if (NotesModel.findOne({ title: notes.title }) || notes.title === "") {
    return res.status(400).json({ message: "Invalid notes" });
  } else if (NotesModel.findOne({ title: notes.title }) === null) {
    return res.status(400).json({ message: "Notes already exists" });
  }
  const newNotes = new NotesModel(notes);
  await newNotes.save();
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
