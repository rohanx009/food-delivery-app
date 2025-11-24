"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { type User, UserRole, type AuthContextType } from "@/lib/types"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Simulate checking stored session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, role: UserRole) => {
    // Mock authentication - in production, this would call your backend API
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      const mockUser: User = {
        id: "1",
        name: email.split("@")[0],
        email,
        phone: "+1234567890",
        role,
        address: role === UserRole.CUSTOMER ? "123 Main St" : undefined,
        profileImage: "/user-avatar.jpg",
        createdAt: new Date(),
      }

      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      const newUser: User = {
        id: Math.random().toString(),
        name,
        email,
        phone: "+1234567890",
        role,
        address: role === UserRole.CUSTOMER ? "123 Main St" : undefined,
        profileImage: "/user-avatar.jpg",
        createdAt: new Date(),
      }

      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
