import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

function UserContextProvider({ children }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    console.log("Stored User", storedUser)
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
