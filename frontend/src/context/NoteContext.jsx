import {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../services/noteService.js";

import { createContext, useState, useContext, useEffect } from "react";

const NoteContext = createContext();
const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  //Retrieving all the notes right away
  useEffect(() => {
    getAllNotes().then(setNotes).catch(console.error);
  }, []);

  const add = (note) => {
    const newNote = createNote(note);
    setNotes([...notes, newNote]);
  };

  const update = (note, id) => {
    const updatedNote = updateNote(note, id);
    setNotes(notes.map((note) => (note.id === id ? updatedNote : note)));
  };

  const deleteOne = (id) => {
    deleteNote(id);
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <NoteContext.Provider value={{ notes, add, update, deleteOne }}>
      {children}
    </NoteContext.Provider>
  );
};

const useNoteContext = () => useContext(NoteContext);
export { NoteProvider, useNoteContext };
