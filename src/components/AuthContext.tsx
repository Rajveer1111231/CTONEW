"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import useLocalStorage from "@/hooks/use-local-storage";

interface AuthContextType {
  isLoggedIn: boolean;
  userEmail: string | null; // Add userEmail to context
  login: (email: string) => void; // Update login to accept email
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage<boolean>("sitemanager-isLoggedIn", false);
  const [userEmail, setUserEmail] = useLocalStorage<string | null>("sitemanager-userEmail", null); // Store user email

  const login = (email: string) => {
    setIsLoggedIn(true);
    setUserEmail(email); // Save the email
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserEmail(null); // Clear the email on logout
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};