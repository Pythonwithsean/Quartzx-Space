require("dotenv").config(); // Load environment variables from .env file
const app = express();
const PORT = process.env.PORT || 3001; // Use PORT value from .env file or default to 3001

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
