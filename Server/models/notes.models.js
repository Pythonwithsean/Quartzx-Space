const mongoose = require("mongoose");

const notesScheme = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  content: Object,
});

const NoteModel = mongoose.model("Note", notesScheme);

module.exports = NoteModel;
