import React, { createContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id?: string;
  name?: string;
  email?: string;
  picture?: string;
  google_id?: string;
  accesstype?: "Administrator" | "User" | string;
  point?: number;
}


interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

interface Props {
  children: ReactNode;
}

const UserContextProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user:", e);
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
