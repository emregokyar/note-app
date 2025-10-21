import React from "react";
import "../styles/styles.css";

function SocialContainer(props) {
  return (
    <div onClick={props.onClick} className="social-container">
      <a className="social">
        <i className="fab fa-google-plus-g" />
      </a>
    </div>
  );
}

export default SocialContainer;
