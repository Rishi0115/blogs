"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { login, logout, register, getMe } from "@/services/auth";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginUser: (email: string, password: string) => Promise<void>;
  registerUser: (email: string, username: string, password: string) => Promise<void>;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMe()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  async function loginUser(email: string, password: string) {
    const data = await login(email, password);
    setUser(data.user);
  }

  async function registerUser(email: string, username: string, password: string) {
    const data = await register(email, username, password);
    setUser(data.user);
  }

  function logoutUser() {
    logout();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, registerUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
