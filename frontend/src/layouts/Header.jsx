import React from "react";
import NoteModel from "../components/NoteModal";

function Header(props) {
  return (
    <>
      <div className="container col-12" bisSkinChecked="1">
        <header className="d-flex justify-content-center py-3">
          <ul className="nav nav-pills">
            <li className="nav-item">
              <a
                data-bs-toggle="modal"
                data-bs-target="#noteModel"
                type="button"
                className="nav-link active btn btn-dark rounded-4"
                ariaCurrent="page"
                style={{
                  border: "1px solid #8b615b",
                  backgroundColor: "#8b615b",
                }}
              >
                New Note
              </a>
            </li>

            <li className="nav-item">
              <a href="/" className="nav-link" style={{ color: "#8b615b" }}>
                Logout
              </a>
            </li>
          </ul>

          <NoteModel id="noteModel" name="NEW NOTE" />
        </header>
      </div>
    </>
  );
}

export default Header;
