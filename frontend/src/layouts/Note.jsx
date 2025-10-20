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
          <h1 className="mt-5 mb-3 mx-2">{props.title}</h1>
          <p>{props.content}</p>
        </div>
        {props.id ? (
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
              noteId={props.id}
              heading={props.title}
              content={props.content}
            />

            <button
              className="mx-2"
              style={{ backgroundColor: "white", color: "#8b615b" }}
              onClick={props.delete}
            >
              DELETE
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}

export default Note;
