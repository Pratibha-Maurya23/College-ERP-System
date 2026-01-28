import { createContext, useContext, useState } from "react";

const StudentContext = createContext(null);

export const StudentProvider = ({ children }) => {
  const [student, setStudent] = useState(() => {
    const session = localStorage.getItem("studentSession");
    return session ? JSON.parse(session).student : null;
  });

  return (
    <StudentContext.Provider value={{ student, setStudent }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => useContext(StudentContext);
