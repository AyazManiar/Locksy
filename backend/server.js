import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import compression from "compression"; // Text Compression
import passwordRoutes from "./routes/passwords.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(compression()); // Enable Gzip compression for responses
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/password", passwordRoutes);

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Basic route
app.get("/", (req, res) => {
  res.send("Password Manager Backend");
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});