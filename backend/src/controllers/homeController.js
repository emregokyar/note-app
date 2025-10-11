import {
  getAllNotes,
  createNote,
  deleteNote,
  updateNote,
  updateNoteContent,
  updateNoteTitle,
} from "../models/noteModel.js";
import bodyParser from "body-parser";

const allNotes = async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const result = await getAllNotes(req.user.email);
      res.status(200).json({ notes: result });
    } catch (err) {
      console.log(err);
      res.status(404);
    }
  } else {
    res.status(404);
  }
};

const createNewNote = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user?.id;

  if (req.isAuthenticated()) {
    try {
      const result = await createNote(userId, title, content);
      if (result !== null) {
        res.status(200).json({
          note: result,
        });
      } else {
        res.status(404);
      }
    } catch (error) {
      console.error(error);
      res.status(404);
    }
  } else {
    res.status(404);
  }
};

const deleteNoteById = async (req, res) => {
  const noteId = req.params.noteId;

  if (req.isAuthenticated()) {
    try {
      const result = await deleteNote(noteId);
      if (result) {
        res.status(200).json({
          success: true,
        });
      } else {
        res.status(404);
      }
    } catch (error) {
      console.error(error);
      res.status(404);
    }
  } else {
    res.status(404);
  }
};

const updateNoteById = async (req, res) => {
  const { title, content } = req.body;
  const noteId = req.params.noteId;
  if (req.isAuthenticated()) {
    try {
      if (title && content) {
        const result = await updateNote(noteId, content, title);
        res.status(200).json({
          success: true,
          result: result,
        });
      } else if (content) {
        const result = await updateNoteContent(noteId, content);
        res.status(200).json({
          success: true,
          result: result,
        });
      } else if (title) {
        const result = await updateNoteTitle(noteId, title);
        res.status(200).json({
          success: true,
          result: result,
        });
      } else {
        res.status(404);
      }
    } catch (error) {
      console.error(error);
      res.status(404);
    }
  } else {
    res.status(404);
  }
};

export { allNotes, createNewNote, deleteNoteById, updateNoteById };
