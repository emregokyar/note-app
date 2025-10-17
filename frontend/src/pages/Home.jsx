import React from "react";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Note from "../layouts/Note";
import NoteHeading from "../components/NoteHeading";

import { useNoteContext } from "../context/NoteContext";

function Home() {
  const { notes } = useNoteContext();

  return (
    <>
      <Header />
      <div className="box d-flex">
        <div className="col-6">
          <Note />
        </div>
        <div
          className="col-6"
          style={{
            background: "linear-gradient(to right, #8b615b, #7297b9)",
          }}
        >
          <ul className="list-none m-0 p-0">
            {notes.map((note) => {
              <NoteHeading key={note.id} heading={note.heading} />;
            })}
            <NoteHeading heading="Note Heading 1" />
            <NoteHeading heading="Note Heading 2" />
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
