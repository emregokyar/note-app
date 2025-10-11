import express from "express";
import {
  allNotes,
  createNewNote,
  deleteNoteById,
  updateNoteById,
} from "../controllers/homeController.js";

const router = express.Router();
router.get("/notes", allNotes);
router.post("/newNote", createNewNote);
router.delete("/delete/:noteId", deleteNoteById);
router.patch("/update/:noteId", updateNoteById);

export default router;
