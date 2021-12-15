import React, { createContext, useState, useEffect } from "react";

export const UsersContext = createContext();

export const UsersContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [currUser, setCurrUser] = useState(null);
  useEffect(() => {
    const sessionStValue = sessionStorage.getItem("username");
    setUser(sessionStValue);
    const sessionStValueTwo = sessionStorage.getItem("email");
    setEmail(sessionStValueTwo);
  }, []);

  return (
    <UsersContext.Provider
      value={{ user, setUser, setCurrUser, currUser, email }}
    >
      {children}
    </UsersContext.Provider>
  );
};
