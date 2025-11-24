"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/auth-context"
import { UserRole } from "@/lib/types"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.CUSTOMER)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await login(email, password, selectedRole)

      // Route based on role
      if (selectedRole === UserRole.CUSTOMER) {
        router.push("/customer/browse")
      } else if (selectedRole === UserRole.RESTAURANT_ADMIN) {
        router.push("/restaurant/dashboard")
      } else {
        router.push("/delivery/dashboard")
      }
    } catch (error) {
      console.error("Login failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md p-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-primary mb-2">FoodHub</h1>
        <p className="text-muted-foreground">Food Delivery & Table Booking</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        {/* Role Selection */}
        <div>
          <label className="block text-sm font-medium mb-3">Login as</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { role: UserRole.CUSTOMER, label: "Customer" },
              { role: UserRole.RESTAURANT_ADMIN, label: "Restaurant" },
              { role: UserRole.DELIVERY_PARTNER, label: "Delivery" },
            ].map(({ role, label }) => (
              <button
                key={role}
                type="button"
                onClick={() => setSelectedRole(role)}
                className={`py-2 px-3 rounded text-sm font-medium transition-all ${
                  selectedRole === role
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-muted"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <Input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <p className="text-xs font-medium mb-2">Demo Credentials:</p>
          <p className="text-xs text-muted-foreground">Email: demo@foodhub.com</p>
          <p className="text-xs text-muted-foreground">Password: demo123</p>
        </div>
      </form>
    </Card>
  )
}
