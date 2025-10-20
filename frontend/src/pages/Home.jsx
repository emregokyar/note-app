import React, { useState } from "react";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Note from "../layouts/Note";
import NoteHeading from "../components/NoteHeading";

import { useNoteContext } from "../context/NoteContext";

function Home() {
  const context = useNoteContext();
  const notes = context.notes;

  const [selectedNote, setSelectedNote] = useState({
    id: 0,
    title: "",
    content: "",
  });

  async function handleClick(noteId) {
    const picked = notes.find((element) => element.id === noteId);

    setSelectedNote({
      id: picked.id,
      title: picked.title,
      content: picked.note,
    });
  }

  async function deleteNote() {
    await context.deleteOne(selectedNote.id);

    setSelectedNote({
      id: 0,
      title: "",
      content: "",
    });
  }

  return (
    <>
      <Header />
      <div className="box d-flex">
        <div className="col-6">
          <Note
            id={selectedNote.id}
            title={selectedNote.title}
            content={selectedNote.content}
            delete={deleteNote}
          />
        </div>
        <div
          className="col-6"
          style={{
            background: "linear-gradient(to right, #8b615b, #7297b9)",
          }}
        >
          <ul className="list-none m-0 p-0">
            {notes.map((note) => (
              <NoteHeading
                key={note.id}
                id={note.id}
                heading={note.title}
                onClick={() => handleClick(note.id)}
              />
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
