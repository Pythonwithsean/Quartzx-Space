import dotenv from "dotenv";
import express from "express";
import helloHandler from "./handlers/HelloHandler";
import Cors from "cors";
import Logger from "./lib/logger";
import RegisterHandler from "./handlers/RegisterHandler";

dotenv.config();
if (!process.env.MY_PORT) {
  Logger.logError("Port is not defined in .env file")
}

const app = express();
const cors = Cors({
  origin: "*",
  methods: ["GET", "POST"],
  credentials: true,
})

app.use(cors);
app.use(express.json());
app.get("/api/hello", helloHandler);
app.post("/api/register", RegisterHandler);
app.listen(process.env.MY_PORT, () => Logger.logSuccess(`Server started on port ${process.env.MY_PORT}`));
