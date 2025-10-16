import React from "react";
import NoteModel from "../components/NoteModal";

function Note(props) {
  return (
    <>
      <div
        className="d-flex flex-column justify-content-between"
        style={{ height: "52vh" }}
      >
        <div className="container d-flex flex-column justify-content-center text-center">
          <h1 className="mt-5 mb-3 mx-2">Note Heading</h1>
          <p>
            This is the paragraph that talks about the note and other stuff This
            This is the paragraph that talks about the note and other stuff This
          </p>
        </div>
        <div className="container d-flex justify-content-center">
          <button
            data-bs-toggle="modal"
            data-bs-target="#edit"
            className="mx-2"
          >
            EDIT
          </button>
          <NoteModel
            id="edit"
            name="EDIT"
            heading="Note Heading"
            content="Note content"
          />
          <button
            className="mx-2"
            style={{ backgroundColor: "white", color: "#8b615b" }}
          >
            DELETE
          </button>
        </div>
      </div>
    </>
  );
}

export default Note;
