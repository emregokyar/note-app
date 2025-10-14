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
      <div className="box"></div>
      <Footer />
    </>
  );
}

export default About;
