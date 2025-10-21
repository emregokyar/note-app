import {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../services/noteService.js";

import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./authContext.jsx";

const NoteContext = createContext();
const NoteProvider = ({ children }) => {
  const authentication = useAuth();
  const [notes, setNotes] = useState([]);

  //Retrieving all the notes when user load the page
  useEffect(() => {
    getAllNotes()
      .then((data) => {
        setNotes(Array.isArray(data) ? data : data.notes || []);
      })
      .catch(console.error);

    // Checking home route if there is a token authenticate the user
    const params = new URLSearchParams(window.location.search);
    const token = params.get("accessToken");
    if (token) {
      authentication.googleCallback();
    }
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
