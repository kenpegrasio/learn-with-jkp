import React, { createContext, useState } from "react";

export const SubjectContext = createContext(null);

function SubjectContextProvider({ children }) {
  const [subjects, setSubjects] = useState({});

  return (
    <SubjectContext.Provider value={{subjects, setSubjects}}>
      {children}
    </SubjectContext.Provider>
  );
}

export default SubjectContextProvider;
