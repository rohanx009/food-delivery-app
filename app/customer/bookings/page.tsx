"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { mockRestaurants } from "@/lib/mock-data";
import { ArrowLeft, Calendar, Clock, Users, MapPin, Phone } from "lucide-react";

// Mock past bookings
const MOCK_BOOKINGS = [
  {
    id: "BK001",
    restaurantId: "1",
    restaurantName: "Spice Villa",
    date: "2025-11-15",
    time: "19:30",
    partySize: 4,
    status: "completed",
  },
  {
    id: "BK002",
    restaurantId: "2",
    restaurantName: "Burger Hub",
    date: "2025-11-22",
    time: "13:00",
    partySize: 2,
    status: "upcoming",
  },
];

// Time slot options
const TIME_SLOTS = {
  lunch: ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30"],
  dinner: ["19:00", "19:30", "20:00", "20:30", "21:00", "21:30"],
};

export default function BookingsPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [view, setView] = useState<"new" | "past">("new");
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [mealType, setMealType] = useState<"lunch" | "dinner">("dinner");
  const [partySize, setPartySize] = useState("2");
  const [specialRequests, setSpecialRequests] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    // Only redirect after loading is complete and we're certain there's no user
    if (!isLoading) {
      if (!user) {
        setShouldRedirect(true);
      }
    }
  }, [user, isLoading]);

  useEffect(() => {
    if (shouldRedirect) {
      router.push("/auth");
    }
  }, [shouldRedirect, router]);

  const selectedRestaurantData = mockRestaurants.find(
    (r) => r.id === selectedRestaurant
  );

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setBookingConfirmed(true);
  };

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (bookingConfirmed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <div className="text-5xl mb-4">✓</div>
          <h1 className="text-2xl font-bold mb-2">Table Booked!</h1>
          <p className="text-muted-foreground mb-6">
            Your reservation has been confirmed.
          </p>
          <div className="space-y-2 text-sm mb-6 bg-secondary p-4 rounded">
            <p>
              <strong>Restaurant:</strong> {selectedRestaurantData?.name}
            </p>
            <p>
              <strong>Date:</strong> {date}
            </p>
            <p>
              <strong>Time:</strong> {timeSlot}
            </p>
            <p>
              <strong>Party Size:</strong> {partySize} people
            </p>
            {selectedRestaurantData?.address && (
              <p className="flex items-center gap-1 justify-center">
                <MapPin size={14} />
                {selectedRestaurantData.address}
              </p>
            )}
            {selectedRestaurantData?.phone && (
              <p className="flex items-center gap-1 justify-center">
                <Phone size={14} />
                {selectedRestaurantData.phone}
              </p>
            )}
          </div>
          <Button
            onClick={() => router.push("/customer/browse")}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Back Home
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-2xl font-bold">Table Bookings</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* View Toggle */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={view === "new" ? "default" : "outline"}
            onClick={() => setView("new")}
          >
            New Booking
          </Button>
          <Button
            variant={view === "past" ? "default" : "outline"}
            onClick={() => setView("past")}
          >
            My Bookings
          </Button>
        </div>

        {view === "new" ? (
          <Card className="p-8">
            <form onSubmit={handleBooking} className="space-y-6">
              {/* Restaurant Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Select Restaurant
                </label>
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
                {selectedRestaurantData && (
                  <div className="mt-2 text-sm text-muted-foreground space-y-1">
                    {selectedRestaurantData.address && (
                      <p className="flex items-center gap-1">
                        <MapPin size={14} />
                        {selectedRestaurantData.address}
                      </p>
                    )}
                    {selectedRestaurantData.phone && (
                      <p className="flex items-center gap-1">
                        <Phone size={14} />
                        {selectedRestaurantData.phone}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Calendar size={16} />
                  Date
                </label>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              {/* Meal Type Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Meal Time
                </label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={mealType === "lunch" ? "default" : "outline"}
                    onClick={() => {
                      setMealType("lunch");
                      setTimeSlot("");
                    }}
                    className="flex-1"
                  >
                    Lunch (12:00 - 15:00)
                  </Button>
                  <Button
                    type="button"
                    variant={mealType === "dinner" ? "default" : "outline"}
                    onClick={() => {
                      setMealType("dinner");
                      setTimeSlot("");
                    }}
                    className="flex-1"
                  >
                    Dinner (19:00 - 22:00)
                  </Button>
                </div>
              </div>

              {/* Time Slot Selection */}
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Clock size={16} />
                  Available Time Slots
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {TIME_SLOTS[mealType].map((slot) => (
                    <Button
                      key={slot}
                      type="button"
                      variant={timeSlot === slot ? "default" : "outline"}
                      onClick={() => setTimeSlot(slot)}
                      className="w-full"
                    >
                      {slot}
                    </Button>
                  ))}
                </div>
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
                <label className="block text-sm font-medium mb-2">
                  Special Requests (Optional)
                </label>
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
                disabled={
                  !selectedRestaurant || !date || !timeSlot || isProcessing
                }
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isProcessing ? "Booking..." : "Confirm Booking"}
              </Button>
            </form>
          </Card>
        ) : (
          <div className="space-y-4">
            {MOCK_BOOKINGS.length > 0 ? (
              MOCK_BOOKINGS.map((booking) => {
                const restaurant = mockRestaurants.find(
                  (r) => r.id === booking.restaurantId
                );
                return (
                  <Card key={booking.id} className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold">
                          {booking.restaurantName}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Booking #{booking.id}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {booking.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm mb-4">
                      <p className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span>
                          {new Date(booking.date).toLocaleDateString("en-IN", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock size={14} />
                        <span>{booking.time}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Users size={14} />
                        <span>{booking.partySize} people</span>
                      </p>
                      {restaurant?.address && (
                        <p className="flex items-center gap-2">
                          <MapPin size={14} />
                          <span>{restaurant.address}</span>
                        </p>
                      )}
                      {restaurant?.phone && (
                        <p className="flex items-center gap-2">
                          <Phone size={14} />
                          <span>{restaurant.phone}</span>
                        </p>
                      )}
                    </div>

                    {booking.status === "upcoming" && (
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">
                          Modify Booking
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 text-red-600 hover:text-red-700"
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </Card>
                );
              })
            ) : (
              <div className="text-center py-12">
                <Calendar
                  size={48}
                  className="mx-auto text-muted-foreground mb-4"
                />
                <p className="text-lg text-muted-foreground">No bookings yet</p>
                <Button className="mt-4" onClick={() => setView("new")}>
                  Make a Booking
                </Button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
