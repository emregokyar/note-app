import React, { useEffect } from "react";
import "../styles/styles.css";
import SocialContainer from "./SocialContainer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function SignUpForm() {
  const [state, setState] = React.useState({
    email: "",
    password: "",
  });

  const authentication = useAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = state;
    try {
      const data = await authentication.registerAccount(state);

      if (data) {
        navigate("/home");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log("Error creating accont: " + error);
    }

    setState({
      email: "",
      password: "",
    });
  };

  const googleLogin = () => {
    window.location.href = `http://localhost:3000/auth/google`;
  };

  return (
    <form
      action="/register"
      className="form-container sign-up-container"
      method="post"
      onSubmit={handleSubmit}
    >
      <h1>Create account</h1>
      <SocialContainer onClick={googleLogin} />
      <span>or use email for registration</span>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={state.email}
        onChange={handleChange}
      />

      <input
        type="password"
        placeholder="Password"
        value={state.password}
        name="password"
        onChange={handleChange}
      />

      <button type="submit">SIGN UP</button>
    </form>
  );
}

export default SignUpForm;
