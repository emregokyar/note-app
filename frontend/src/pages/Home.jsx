import React from "react";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Note from "../layouts/Note";
import NoteHeading from "../components/NoteHeading";

function Home() {
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
