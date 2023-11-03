const mongoose = require("mongoose");

const notesScheme = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: String,

  date: {
    type: Date,
    default: Date.now,
  },

  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Note = mongoose.model("Note", notesScheme);
