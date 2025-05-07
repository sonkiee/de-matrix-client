"use client";

import { api } from "@/services/axiosInstance";
import { AuthContextType, User } from "@/types";
import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthContextProviderProps {
  children: React.ReactNode;
}
export const AuthProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();

  const signIn = async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { user, token } = response.data.data;
      localStorage.setItem("token", token);
      setUser(user);
      router.push("/store");
    } catch (error) {
      // Handle authentication error
      console.log("Failed to sign in:", error);
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    console.log("Signing up with:", { name, email, password });
    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      console.log("Successfully signed up:", response.data);
      router.push("/store");

      // Simulate authentication
      // setUser({
      //   name,
      //   email,
      //   password,
      //   role: "user",
      //   address: "123 Main St, Anytown, USA",
      // });
    } catch (error) {
      // Handle sign-up error
      console.log("Failed to sign up:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, signIn, signUp }}>
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
