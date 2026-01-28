import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setToken(token);
    setRole(role);
  };

  const logout = () => {
    const role = localStorage.getItem("role");
    localStorage.clear();
    setToken(null);
    setRole(null);
    return role;
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
