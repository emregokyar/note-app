import React from "react";
import Footer from "../layouts/Footer";

function About() {
  return (
    <>
      <ul className="nav nav-pills justify-content-center py-3">
        <li className="nav-item">
          <a href="/" className="nav-link" style={{ color: "#8b615b" }}>
            Logout
          </a>
        </li>
      </ul>
      <div className="box">
        {" "}
        <div className="container my-5">
          <h2 className="mb-3 text-center">About This Project</h2>

          <p
            className="text-muted text-center mx-auto"
            style={{ maxWidth: "750px" }}
          >
            This is a full-stack note-taking web application that seamlessly
            connects a <strong>React</strong> frontend with a{" "}
            <strong>Node.js / Express</strong> backend.
          </p>

          <p
            className="text-muted text-center mx-auto"
            style={{ maxWidth: "750px" }}
          >
            The frontend is built with React and uses Context API for global
            state management, providing features such as note creation, editing,
            and deletion through interactive modals. It communicates with the
            backend using RESTful API calls.
          </p>

          <p
            className="text-muted text-center mx-auto"
            style={{ maxWidth: "750px" }}
          >
            The backend handles authentication (including Google Login via
            Passport.js), secure data storage, and all note-related operations
            using a connected database. Together, they form a clean, responsive,
            and modern note management system.
          </p>
        </div>
        <p className="text-center">
          <a
            href="https://github.com/emregokyar/note-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Source on GitHub!
          </a>
        </p>
      </div>
      <Footer />
    </>
  );
}

export default About;
