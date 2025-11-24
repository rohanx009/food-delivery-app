"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth-context";
import { UserRole } from "@/lib/types";

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, signup } = useAuth();
  const initialRole =
    (searchParams.get("role") as "customer" | "restaurant" | "delivery") ||
    "customer";

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [role, setRole] = useState<"customer" | "restaurant" | "delivery">(
    initialRole
  );
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Map role to UserRole enum
      const userRole =
        role === "customer"
          ? UserRole.CUSTOMER
          : role === "restaurant"
          ? UserRole.RESTAURANT_ADMIN
          : UserRole.DELIVERY_PARTNER;

      if (mode === "login") {
        if (!formData.email || !formData.password) {
          setError("Please fill in all fields");
          setLoading(false);
          return;
        }

        // Use auth context to login
        await login(formData.email, formData.password, userRole);

        // Redirect based on role
        if (role === "customer") {
          router.push("/customer/browse");
        } else {
          router.push(`/dashboard/${role}`);
        }
      } else {
        if (
          !formData.name ||
          !formData.email ||
          !formData.password ||
          !formData.phone
        ) {
          setError("Please fill in all fields");
          setLoading(false);
          return;
        }

        // Use auth context to signup
        await signup(
          formData.name,
          formData.email,
          formData.password,
          userRole
        );

        // After signup, redirect to appropriate dashboard
        if (role === "customer") {
          router.push("/customer/browse");
        } else {
          router.push(`/dashboard/${role}`);
        }
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred. Please try again."
      );
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
            F
          </div>
          <span className="text-2xl font-bold text-foreground">FoodHub</span>
        </Link>

        {/* Role Selection */}
        <div className="mb-8">
          <p className="text-sm text-muted-foreground mb-4">I am a:</p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: "customer", label: "Customer" },
              { value: "restaurant", label: "Restaurant" },
              { value: "delivery", label: "Delivery Partner" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setRole(option.value as typeof role);
                  setFormData({ email: "", password: "", name: "", phone: "" });
                }}
                className={`px-4 py-2 rounded-lg border transition text-sm font-medium ${
                  role === option.value
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-secondary text-foreground border-border hover:border-primary"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Auth Card */}
        <div className="bg-card rounded-lg border border-border p-8 shadow-sm">
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => {
                setMode("login");
                setError("");
              }}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
                mode === "login"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-muted"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setMode("signup");
                setError("");
              }}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
                mode === "signup"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-muted"
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
              </>
            )}

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Email Address
              </label>
              <Input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Password
              </label>
              <Input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>

            {error && (
              <div className="text-destructive text-sm bg-destructive/10 p-3 rounded-lg">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2"
            >
              {loading
                ? "Loading..."
                : mode === "login"
                ? "Login"
                : "Create Account"}
            </Button>
          </form>

          <p className="text-sm text-muted-foreground text-center mt-6">
            {mode === "login"
              ? "Don't have an account? "
              : "Already have an account? "}
            <button
              onClick={() => {
                setMode(mode === "login" ? "signup" : "login");
                setError("");
              }}
              className="text-primary hover:underline font-medium"
            >
              {mode === "login" ? "Sign up" : "Login"}
            </button>
          </p>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-8">
          Demo Credentials: email@example.com / password123
        </p>
      </div>
    </main>
  );
}
