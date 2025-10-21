import { createContext, useContext, useState } from "react";
import { localLogin, register, logout } from "../services/authService";

// Creating auth context which is can be useable
const AuthContext = createContext();

// Creating provider that is avalible from children
const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("accessToken") || null
  );
  const loginLocally = async ({ username, password }) => {
    const data = await localLogin({ username, password });

    if (data.success) {
      setToken(data.token);
      localStorage.setItem("accessToken", data.token);
      return true;
    }
    return false;
  };

  const registerAccount = async ({ email, password }) => {
    const data = await register({ email, password });
    if (data.success) {
      setToken(data.token);
      localStorage.setItem("accessToken", data.token);
      return true;
    }
    return false;
  };

  const logoutFrontEnd = async () => {
    const data = await logout();
    if (data.success) {
      setToken(null);
      localStorage.removeItem("accessToken");
    }
  };

  // Checking if there is a token
  function googleCallback() {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("accessToken");

    if (token) {
      setToken(token);
      localStorage.setItem("accessToken", token);
    }
  }

  // Making all those avalible for all child components
  return (
    <AuthContext.Provider
      value={{
        googleCallback,
        token,
        loginLocally,
        logoutFrontEnd,
        registerAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Making auth context avaliable easy context
const useAuth = () => useContext(AuthContext);

export default AuthProvider;
export { useAuth };
