const mongoose = require("mongoose");

const notesScheme = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const NoteModel = mongoose.model("Note", notesScheme);

module.exports = NoteModel;
