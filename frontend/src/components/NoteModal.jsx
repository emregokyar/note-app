import React from "react";

function NoteModel(props) {
  return (
    <>
      <div
        className="modal fade"
        id={props.id}
        tabindex="-1"
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

            <form action="/" method="post">
              <div className="modal-body">
                <label htmlFor="heading">Heading</label>
                <input
                  className="rounded-3"
                  type="text"
                  name="heading"
                  id="heading"
                  value={props.heading}
                />
                <label htmlFor="content">Content</label>
                <input
                  className="rounded-3"
                  type="text"
                  name="content"
                  id="content"
                  value={props.content}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  style={{ backgroundColor: "white", color: "#8b615b" }}
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
