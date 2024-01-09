const mongoose = require("mongoose");

const notesScheme = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  version: {
    required: true,
    type: Number,
    default: 1,
  },
});

const NoteModel = mongoose.model("Note", notesScheme);

module.exports = NoteModel;
