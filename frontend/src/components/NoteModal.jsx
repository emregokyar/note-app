import React, { useEffect, useState } from "react";
import { useNoteContext } from "../context/NoteContext";

function NoteModel(props) {
  const noteContext = useNoteContext();

  const [inputs, setInput] = useState({
    title: props.heading || "",
    content: props.content || "",
  });

  useEffect(() => {
    setInput({
      title: props.heading || "",
      content: props.content || "",
    });
  }, [props.heading, props.content]);

  function handleChange(event) {
    const value = event.target.value;
    setInput({
      ...inputs,
      [event.target.name]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const { title, content } = inputs;
    try {
      if (props.noteId) {
        await noteContext.update(inputs, props.noteId);
        props.passedAction(props.noteId, inputs.title, inputs.content);
      } else {
        await noteContext.add(inputs);
        setInput({ title: "", content: "" });
      }

      const modalElement = document.getElementById(props.id);
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal.hide();
    } catch (error) {
      console.log("Something went wrong while fetching note info.");
    }
  }

  function cancelClick() {
    setInput({ title: "", content: "" });
  }

  return (
    <>
      <div
        className="modal fade"
        id={props.id}
        tabIndex="-1"
        aria-labelledby="modalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header ">
              <h1 className="modal-title fs-5 " id="modalLabel">
                {props.name}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <form action="/newNote" onSubmit={handleSubmit} method="post">
              <div className="modal-body">
                <label htmlFor="heading">Heading</label>
                <input
                  className="rounded-3"
                  type="text"
                  name="title"
                  id="heading"
                  value={inputs.title}
                  onChange={handleChange}
                />
                <label htmlFor="content">Content</label>
                <input
                  className="rounded-3"
                  type="text"
                  name="content"
                  id="content"
                  value={inputs.content}
                  onChange={handleChange}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  style={{ backgroundColor: "white", color: "#8b615b" }}
                  id="closeButton"
                  onClick={cancelClick}
                >
                  Close
                </button>
                <button type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default NoteModel;
