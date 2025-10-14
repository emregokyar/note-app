import React from "react";
import "../styles/styles.css";
import SocialContainer from "./SocialContainer";

function SignUpForm(props) {
  const [state, setState] = React.useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = state;
    alert("Signin up with email and password: " + username, password);
    setState({
      username: "",
      password: "",
    });
  };

  return (
    <form
      action="/"
      className="form-container sign-up-container"
      method="post"
      onSubmit={handleSubmit}
    >
      <h1>Create account</h1>
      <SocialContainer />
      <span>or use email for registration</span>
      <input
        type="email"
        name="username"
        placeholder="Email"
        value={state.username}
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
