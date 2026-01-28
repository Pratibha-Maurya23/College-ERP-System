import { createContext, useContext, useState } from "react";

const FacultyContext = createContext(null);

export const FacultyProvider = ({ children }) => {
  const [faculty, setFaculty] = useState(() => {
    const session = localStorage.getItem("facultySession");
    return session ? JSON.parse(session).faculty : null;
  });

  return (
    <FacultyContext.Provider value={{ faculty, setFaculty }}>
      {children}
    </FacultyContext.Provider>
  );
};

export const useFaculty = () => useContext(FacultyContext);
