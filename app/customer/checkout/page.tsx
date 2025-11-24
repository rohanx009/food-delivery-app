"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function CheckoutPage() {
  const router = useRouter()
  const [step, setStep] = useState<"address" | "payment" | "confirmation">("address")
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    zipCode: "",
    phone: "",
    paymentMethod: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.street && formData.city && formData.zipCode && formData.phone) {
      setStep("payment")
    }
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.paymentMethod === "cash" || (formData.cardNumber && formData.expiryDate && formData.cvv)) {
      setStep("confirmation")
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <Link href="/dashboard/customer" className="text-primary hover:underline">
            ← Back to Browse
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Steps Indicator */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {["address", "payment", "confirmation"].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step === s
                    ? "bg-primary text-primary-foreground"
                    : ["address", "payment", "confirmation"].indexOf(step) > i
                      ? "bg-green-500 text-white"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {i + 1}
              </div>
              {i < 2 && (
                <div
                  className={`h-1 w-12 ${
                    ["address", "payment", "confirmation"].indexOf(step) > i ? "bg-green-500" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Address Step */}
        {step === "address" && (
          <div className="bg-card rounded-lg border border-border p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6">Delivery Address</h2>
            <form onSubmit={handleAddressSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Street Address</label>
                <Input
                  type="text"
                  name="street"
                  placeholder="123 Main Street"
                  value={formData.street}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">City</label>
                <Input
                  type="text"
                  name="city"
                  placeholder="New York"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Zip Code</label>
                <Input
                  type="text"
                  name="zipCode"
                  placeholder="10001"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Phone Number</label>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Continue to Payment
              </Button>
            </form>
          </div>
        )}

        {/* Payment Step */}
        {step === "payment" && (
          <div className="bg-card rounded-lg border border-border p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6">Payment Method</h2>
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div className="space-y-3 mb-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === "card"}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="text-foreground font-medium">Credit/Debit Card</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === "cash"}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="text-foreground font-medium">Cash on Delivery</span>
                </label>
              </div>

              {formData.paymentMethod === "card" && (
                <div className="space-y-4 border-t border-border pt-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Card Number</label>
                    <Input
                      type="text"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">Expiry Date</label>
                      <Input
                        type="text"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">CVV</label>
                      <Input
                        type="text"
                        name="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => setStep("address")} className="flex-1">
                  Back
                </Button>
                <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
                  Review Order
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Confirmation Step */}
        {step === "confirmation" && (
          <div className="bg-card rounded-lg border border-border p-8 max-w-md mx-auto text-center">
            <div className="text-5xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Order Placed!</h2>
            <p className="text-muted-foreground mb-6">
              Your order has been confirmed and is being prepared. You'll receive real-time updates.
            </p>
            <div className="bg-secondary p-4 rounded-lg mb-6">
              <p className="text-sm text-muted-foreground">Order ID</p>
              <p className="text-lg font-bold text-foreground">#FH123456</p>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground mb-6">
              <p>Estimated Delivery: 35-45 minutes</p>
              <p>Tracking number has been sent to your email</p>
            </div>
            <Link href="/dashboard/customer">
              <Button className="w-full bg-primary hover:bg-primary/90">Continue Shopping</Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
