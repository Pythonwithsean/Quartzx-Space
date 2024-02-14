require("dotenv").config(); // Load environment variables from .env file
const cors = require("cors");
const express = require("express");
const NotesModel = require("../models/notes.models.js");

const io = require("socket.io")(3001, {
  cors: {
    origins: "*",
    methods: ["GET", "POST"],
  },
});

const router = express.Router();
router.use(express.json());
router.use(cors());

//Create a note
router.post("/Create-Notes", async (req, res) => {
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
    res.statusCode(200);
  } catch (err) {
    res.json({
      error: err.message || "An error occurred while saving the note.",
    });
  }
});

//Get notes for client
router.post("/get-notes", async (req, res) => {
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

//Saving Notes Content to Database

router.delete("/delete-notes", async (req, res) => {
  const { title, user } = req.body;
  await NotesModel.findOne({
    title: title,
    user: user,
  })
    .then((note) => NotesModel.deleteOne(note))
    .then(res.sendStatus(200));
});

module.exports = { NoteRouter: router };
