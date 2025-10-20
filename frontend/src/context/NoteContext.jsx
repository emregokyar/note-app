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

  //Retrieving all the notes when user load the page
  useEffect(() => {
    getAllNotes()
      .then((data) => {
        setNotes(Array.isArray(data) ? data : data.notes || []);
      })
      .catch(console.error);
  }, []);

  const add = async (note) => {
    const newNote = await createNote(note);
    setNotes([...notes, newNote.note]);
  };
  const update = async (note, id) => {
    const updatedNote = await updateNote(note, id);
    console.log(updatedNote);

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

export const useNoteContext = () => useContext(NoteContext);
export default NoteProvider;
