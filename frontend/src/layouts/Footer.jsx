import React, { useEffect } from "react";
import { useUser } from "../context/UserContext";

function Footer(props) {
  const userInfo = useUser();

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
        <div className="d-flex justify-content-center">
          <h2>{userInfo.username}'s Notes</h2>
        </div>
      </div>
    </>
  );
}

export default Footer;
