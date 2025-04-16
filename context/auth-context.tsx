"use client";

import { AuthContextType, User } from "@/types";
import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthContextProviderProps {
  children: React.ReactNode;
}
export const AuthProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>({
    name: "John Doe",
    email: "johndoe@example.com",
    password: "password123",
    role: "user",
    address: "123 Main St, Anytown, USA",
  });

  const signIn = (email: string, password: string) => {
    // Simulate authentication
    setUser({
      name: "John Doe",
      email,
      password,
      role: "user",
      address: "123 Main St, Anytown, USA",
    });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};
