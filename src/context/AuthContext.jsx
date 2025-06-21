"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUser({ email: decoded.email });
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    setUser({ email: decoded.email });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const authInfo = {
    user,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      <Toaster />
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
}; 