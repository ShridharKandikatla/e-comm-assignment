// contexts/AuthContext.js
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogin = (response) => {
    const { credential } = response;
    const payload = JSON.parse(atob(credential.split(".")[1])); // Decode JWT payload
    const userData = {
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
    };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    if (window.google) {
      window.google.accounts.id.revoke(user.email, () => {
        console.log("Logged out");
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
