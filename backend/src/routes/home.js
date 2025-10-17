import express from "express";
import {
  allNotes,
  createNewNote,
  deleteNoteById,
  updateNoteById,
} from "../controllers/homeController.js";
import verifyToken from "../middleware/jwtAuth.js";

const router = express.Router();
router.get("/notes", verifyToken, allNotes);
router.post("/newNote", verifyToken, createNewNote);
router.delete("/delete/:noteId", verifyToken, deleteNoteById);
router.patch("/update/:noteId", verifyToken, updateNoteById);

export default router;
