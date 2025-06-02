import express from "express";
const router = express.Router();
import Password from "../models/Password.js";

// GET all passwords
router.get("/", async (req, res) => {
  try {
    const passwords = await Password.find();
    res.json(passwords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create a new password
router.post("/", async (req, res) => {
  const { site, userName, password } = req.body;
  const newPassword = new Password({
    site,
    userName,
    password,
  });
  try {
    await newPassword.save();
    res.status(201).json(newPassword);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update a password
router.put("/:id", async (req, res) => {
  const { site, userName, password } = req.body;
  try {
    const updatedPassword = await Password.findByIdAndUpdate(
      req.params.id,
      { site, userName, password },
      { new: true }
    );
    if (!updatedPassword) {
      return res.status(404).json({ message: "Password not found" });
    }
    res.status(200).json(updatedPassword);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a password
router.delete("/:id", async (req, res) => {
  try {
    const deletedPassword = await Password.findByIdAndDelete(req.params.id);
    if (!deletedPassword) {
      return res.status(404).json({ message: "Password not found" });
    }
    res.status(200).json({ message: "Password deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;