import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNote,
  updateNote,
} from "../controller/noteController.js";
import { asyncHandler } from "../utils/asyncHandler.js";
// import { protect } from "../middleware/authMiddleware.js"; // optional

const router = express.Router();

router.get("/", asyncHandler(getAllNotes));
router.post("/", asyncHandler(createNote)); // add protect middleware if needed
router.get("/:id", asyncHandler(getNote));
router.put("/:id", asyncHandler(updateNote));
router.delete("/:id", asyncHandler(deleteNote)); // add protect middleware if needed

export default router;
