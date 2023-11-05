require("dotenv").config(); // Load environment variables from .env file
const cors = require("cors");
const express = require("express");
const NotesModel = require("../models/notes.models.js");
const router = express.Router();
router.use(cors());

router.post("/send-notes", async (req, res) => {
  const notes = await req.body;
  console.log(newNote);
});

module.exports = { NoteRouter: router };
