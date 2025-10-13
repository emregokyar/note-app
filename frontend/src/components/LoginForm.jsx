import React from "react";
import SocialContainer from "./SocialContainer";

function LoginForm(props) {
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
    alert("Logging in with " + username + " password: " + password);
    setState({
      username: "",
      password: "",
    });
  };

  return (
    <form
      className="form-container sign-in-container"
      action="/login"
      method="post"
      onSubmit={handleSubmit}
    >
      <h1>Sign in</h1>
      <SocialContainer />
      <span>or use your account</span>
      <input
        type="email"
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
