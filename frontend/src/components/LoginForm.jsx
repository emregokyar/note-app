import React from "react";
import SocialContainer from "./SocialContainer";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [state, setState] = React.useState({
    username: "",
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
    const { username, password } = state;
    try {
      const data = await authentication.loginLocally(state);
      if (data) {
        navigate("/home");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log("Error fetching data: " + error);
    }

    setState({
      username: "",
      password: "",
    });
  };

  const googleLogin = () => {
    window.location.href = `http://localhost:3000/auth/google`;
  };

  return (
    <form
      className="form-container sign-in-container"
      action="/login"
      method="post"
      onSubmit={handleSubmit}
    >
      <h1>Sign in</h1>
      <SocialContainer onClick={googleLogin} />
      <span>or use your account</span>
      <input
        type="text"
        placeholder="Email"
        value={state.username}
        name="username"
        onChange={handleChange}
      />

      <input
        type="password"
        placeholder="Password"
        value={state.password}
        name="password"
        onChange={handleChange}
      />

      <button type="submit">SIGN IN</button>
    </form>
  );
}

export default LoginForm;
