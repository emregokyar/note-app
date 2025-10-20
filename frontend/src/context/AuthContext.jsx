import { createContext, useContext, useState } from "react";
import {
  localLogin,
  googleLoginReq,
  googleLoginRes,
  register,
  logout,
} from "../services/authService";

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

  const logoutFrontEnd = async () => {
    const data = await logout();
    if (data.success) {
      setToken(null);
      localStorage.removeItem("accessToken");
    }
  };

  // Making all those avalible for all child components
  return (
    <AuthContext.Provider value={{ token, loginLocally, logoutFrontEnd }}>
      {children}
    </AuthContext.Provider>
  );
};

// Making auth context avaliable easy context
const useAuth = () => useContext(AuthContext);

export default AuthProvider;
export { useAuth };
