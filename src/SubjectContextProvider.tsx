import React, { createContext, useState, ReactNode } from "react";

// Define the shape of a Subject
export interface Subject {
  _id: string;
  name: string;
}

// Define the shape of the context
interface SubjectContextType {
  subjects: Subject[];
  setSubjects: React.Dispatch<React.SetStateAction<Subject[]>>;
}

// Create the context with default null value
export const SubjectContext = createContext<SubjectContextType | null>(null);

// Define props for the provider
interface SubjectContextProviderProps {
  children: ReactNode;
}

const SubjectContextProvider: React.FC<SubjectContextProviderProps> = ({ children }) => {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  return (
    <SubjectContext.Provider value={{ subjects, setSubjects }}>
      {children}
    </SubjectContext.Provider>
  );
};

export default SubjectContextProvider;
