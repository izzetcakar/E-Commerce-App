import axios from "axios";
import { createContext, useLayoutEffect, useState } from "react";

const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);

  const login = async (inputs) => {
    const res = await axios.post("/user/login", inputs);
    setUser(res.data);
  };

  const logout = async (inputs) => {
    await axios.post("/user/logout");
    setUser(null);
  };

  const getUser = async () => {
    try {
      const { data } = await axios.get("/user/profile");
      setUser((prev) => data);
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    getUser();
  }, []);

  const values = {
    user,
    login,
    logout,
    search,
    setSearch,
    getUser,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
export default AuthContext;
