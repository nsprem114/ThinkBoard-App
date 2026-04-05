import mongoose from "mongoose";
import Note from "../model/Note.js";

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.log(`Error in getAllNotes Controller`, error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createNote = async (req, res) => {
  const { title, description } = req.body;

  try {
    const note = await Note.create({ title, description });
    res.status(201).json(note);
  } catch (error) {
    console.log(`Error in createNote Controller`, error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(note);
  } catch (error) {
    console.log(`Error in getNote Controller`, error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!mongoose.Types.ObjectId.isValid) {
    return res.status(400).json({ message: "Invalid Note ID" });
  }
  try {
    const note = await Note.findByIdAndUpdate(
      id,
      { title, description },
      { new: true },
    );
    res.status(200).json(note);
  } catch (error) {
    console.log(`Error in updateNote Controller`, error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Note ID" });
  }

  try {
    const note = await Note.findByIdAndDelete(id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.log(`Error in deleteNote Controller`, error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
