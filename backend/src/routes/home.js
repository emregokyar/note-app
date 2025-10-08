import express from "express";
import { allNotes } from "../controllers/homeController.js";

const router = express.Router();
router.get("/notes", allNotes);

export default router;
