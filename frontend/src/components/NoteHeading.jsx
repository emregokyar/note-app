import React from "react";

function NoteHeading(props) {
  return (
    <>
      <li
        className="border-bottom "
        style={{
          listStyleType: "none",
          background: "linear-gradient(to bottom, transparent, #323232ff)",
          color: "white",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        <div className="my-3 ">
          <h3 className="mx-3">{props.heading}</h3>
        </div>
      </li>
    </>
  );
}

export default NoteHeading;
