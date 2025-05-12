import dotenv from "dotenv";
import express from "express";
import helloHandler from "./handlers/HelloHandler";
import Cors from "cors";

dotenv.config();

const app = express();
const cors = Cors({
  origin: "*",
  methods: ["GET", "POST"],
  credentials: true,
})
app.use(cors)
app.use(express.json());
app.get("/api/hello", helloHandler)
app.listen(
  3001,

  () => {
    console.log(`Server is running on port ${process.env.MY_PORT || 3001}`);
  }
)
