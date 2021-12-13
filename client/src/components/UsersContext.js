import React, { createContext, useState, useEffect } from "react";

export const UsersContext = createContext();

export const UsersContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const sessionStValue = sessionStorage.getItem("username");
    setUser(sessionStValue);
  }, []);

  console.log(user);
  return (
    <UsersContext.Provider value={{ user, setUser }}>
      {children}
    </UsersContext.Provider>
  );
};
