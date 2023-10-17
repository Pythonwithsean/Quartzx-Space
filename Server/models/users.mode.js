import mongoose from "mongoose";

const userScheme = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
});

const userModel = mongoose.model("user", userScheme);
