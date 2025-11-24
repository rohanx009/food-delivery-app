"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { mockRestaurants } from "@/lib/mock-data"
import { ArrowLeft, Calendar, Clock, Users } from "lucide-react"

export default function BookingsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [selectedRestaurant, setSelectedRestaurant] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [partySize, setPartySize] = useState("2")
  const [specialRequests, setSpecialRequests] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [bookingConfirmed, setBookingConfirmed] = useState(false)

  if (!user) {
    router.push("/")
    return null
  }

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setBookingConfirmed(true)
  }

  if (bookingConfirmed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <div className="text-5xl mb-4">✓</div>
          <h1 className="text-2xl font-bold mb-2">Table Booked!</h1>
          <p className="text-muted-foreground mb-6">Your reservation has been confirmed.</p>
          <div className="space-y-2 text-sm mb-6 bg-secondary p-4 rounded">
            <p>
              <strong>Date:</strong> {date}
            </p>
            <p>
              <strong>Time:</strong> {time}
            </p>
            <p>
              <strong>Party Size:</strong> {partySize} people
            </p>
          </div>
          <Button
            onClick={() => router.push("/customer/browse")}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Back Home
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-2xl font-bold">Book a Table</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <Card className="p-8">
          <form onSubmit={handleBooking} className="space-y-6">
            {/* Restaurant Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Select Restaurant</label>
              <select
                value={selectedRestaurant}
                onChange={(e) => setSelectedRestaurant(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="">Choose a restaurant...</option>
                {mockRestaurants.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Calendar size={16} />
                Date
              </label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>

            {/* Time Selection */}
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Clock size={16} />
                Time
              </label>
              <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
            </div>

            {/* Party Size */}
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Users size={16} />
                Party Size
              </label>
              <select
                value={partySize}
                onChange={(e) => setPartySize(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={String(i + 1)}>
                    {i + 1} people
                  </option>
                ))}
              </select>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-sm font-medium mb-2">Special Requests (Optional)</label>
              <textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="Any special requests for the restaurant?"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                rows={4}
              />
            </div>

            <Button
              type="submit"
              disabled={!selectedRestaurant || !date || !time || isProcessing}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isProcessing ? "Booking..." : "Confirm Booking"}
            </Button>
          </form>
        </Card>
      </main>
    </div>
  )
}
