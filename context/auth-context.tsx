"use client";

import type React from "react";

import { createContext, useContext, useState, useEffect } from "react";
import { type User, UserRole, type AuthContextType } from "@/lib/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check stored session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error loading user:", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // Mock authentication for demo without database
      await new Promise((resolve) => setTimeout(resolve, 500));

      const mockUser: User = {
        id: Math.random().toString(),
        name: email.split("@")[0],
        email,
        phone: "+91 98765 43210",
        role,
        address:
          role === UserRole.CUSTOMER ? "123 Main St, Bangalore" : undefined,
        profileImage: "/user-avatar.jpg",
        createdAt: new Date(),
      };

      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ) => {
    setIsLoading(true);
    try {
      // Mock signup for demo without database
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newUser: User = {
        id: Math.random().toString(),
        name,
        email,
        phone: "+91 98765 43210",
        role,
        address:
          role === UserRole.CUSTOMER ? "123 Main St, Bangalore" : undefined,
        profileImage: "/user-avatar.jpg",
        createdAt: new Date(),
      };

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = async (updates: Partial<User>) => {
    if (!user) return;

    try {
      // Mock update for demo without database
      await new Promise((resolve) => setTimeout(resolve, 300));

      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Update profile error:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, signup, logout, updateUserProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
