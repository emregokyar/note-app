import "../styles/styles.css";
import React from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

function Index() {
  const [type, setType] = React.useState("login");
  const handleClick = (text) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass =
    "box " + (type === "signUp" ? "right-panel-active" : "");

  return (
    <>
      <div className="app">
        <div className={containerClass} id="container">
          <LoginForm />
          <SignUpForm />
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Hello, There!</h1>
                <p> Create account to start with or login your account.</p>
                <button
                  className="ghost"
                  onClick={() => {
                    handleClick("login");
                  }}
                >
                  SIGN IN
                </button>
              </div>

              <div className="overlay-panel overlay-right">
                <h1>Welcome Back!</h1>
                <p>
                  {" "}
                  Enter details to login your account or sing up a new account.
                </p>
                <button
                  className="ghost"
                  onClick={() => {
                    handleClick("signUp");
                  }}
                >
                  SIGN UP
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
