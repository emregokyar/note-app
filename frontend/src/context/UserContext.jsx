import { createContext, useState, useContext, useEffect } from "react";
import getUserInfo from "../services/userService.js";

const UserContext = createContext();
const UserPorvider = ({ children }) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserInfo();
        console.log(user);

        setUsername(user.user.email);
      } catch (error) {
        console.log("Something went wrong while retrieving user info");
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ username }}>{children}</UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);
export { UserPorvider, useUser };
