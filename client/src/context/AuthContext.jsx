import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("auth");
    if (stored) {
      const { user, token } = JSON.parse(stored);
      setUser(user);
      setToken(token);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await fetch("https://hoomo-shop.onrender.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("auth", JSON.stringify({ user: data.user, token: data.token }));
      return { success: true };
    } else {
      return { success: false, error: data.error };
    }
  };

  const register = async (name, email, password) => {
    const res = await fetch("https://hoomo-shop.onrender.com/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("auth", JSON.stringify({ user: data.user, token: data.token }));
      return { success: true };
    } else {
      return { success: false, error: data.error };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 