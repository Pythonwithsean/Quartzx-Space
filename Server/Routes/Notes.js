require("dotenv").config(); // Load environment variables from .env file
const cors = require("cors");
const express = require("express");

const router = express.Router();
router.use(cors());

module.exports = { NoteRouter: router };
