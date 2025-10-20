import React from "react";

function Footer(props) {
  return (
    <>
      <div className="container" bis_skin_checked="1">
        <footer className="py-3 my-4">
          <ul className="nav justify-content-center border-bottom pb-3 mb-3">
            <li className="nav-item">
              <a href="/home" className="nav-link px-2 text-body-secondary">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="/about" className="nav-link px-2 text-body-secondary">
                About
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </>
  );
}

export default Footer;
