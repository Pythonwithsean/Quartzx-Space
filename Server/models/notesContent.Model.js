const mongoose = require("mongoose");

const contentScheme = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
});

const ContentModel = mongoose.model("Content", contentScheme);
module.exports = ContentModel;
