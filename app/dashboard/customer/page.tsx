"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Restaurant {
  id: string
  name: string
  cuisine: string
  rating: number
  delivery_time: string
  delivery_fee: number
  image: string
  is_open: boolean
}

const RESTAURANTS: Restaurant[] = [
  {
    id: "1",
    name: "Spice Villa",
    cuisine: "Indian",
    rating: 4.5,
    delivery_time: "30-40 min",
    delivery_fee: 2.99,
    image: "/indian-restaurant-food.jpg",
    is_open: true,
  },
  {
    id: "2",
    name: "Burger Barn",
    cuisine: "American",
    rating: 4.3,
    delivery_time: "25-35 min",
    delivery_fee: 1.99,
    image: "/burger-restaurant.jpg",
    is_open: true,
  },
  {
    id: "3",
    name: "Sushi Paradise",
    cuisine: "Japanese",
    rating: 4.7,
    delivery_time: "35-45 min",
    delivery_fee: 3.99,
    image: "/sushi-restaurant.jpg",
    is_open: true,
  },
  {
    id: "4",
    name: "Pizza Palace",
    cuisine: "Italian",
    rating: 4.4,
    delivery_time: "28-38 min",
    delivery_fee: 2.49,
    image: "/pizza-restaurant.png",
    is_open: true,
  },
  {
    id: "5",
    name: "Taco Fiesta",
    cuisine: "Mexican",
    rating: 4.2,
    delivery_time: "30-40 min",
    delivery_fee: 2.99,
    image: "/mexican-food-restaurant.jpg",
    is_open: true,
  },
  {
    id: "6",
    name: "Thai Express",
    cuisine: "Thai",
    rating: 4.6,
    delivery_time: "32-42 min",
    delivery_fee: 2.99,
    image: "/thai-restaurant.jpg",
    is_open: false,
  },
]

export default function CustomerDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<"rating" | "delivery_time" | "delivery_fee">("rating")

  const cuisines = Array.from(new Set(RESTAURANTS.map((r) => r.cuisine)))

  const filteredRestaurants = RESTAURANTS.filter((restaurant) => {
    const matchesSearch =
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCuisine = !selectedCuisine || restaurant.cuisine === selectedCuisine
    return matchesSearch && matchesCuisine
  }).sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating
    if (sortBy === "delivery_time") {
      const timeA = Number.parseInt(a.delivery_time.split("-")[0])
      const timeB = Number.parseInt(b.delivery_time.split("-")[0])
      return timeA - timeB
    }
    if (sortBy === "delivery_fee") return a.delivery_fee - b.delivery_fee
    return 0
  })

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
              F
            </div>
            <span className="text-xl font-bold text-foreground">FoodHub</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost">Home</Button>
            </Link>
            <Button variant="outline">Orders</Button>
            <Button variant="outline">Profile</Button>
            <Button variant="ghost" className="text-destructive">
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Search Section */}
        <div className="mb-12">
          <div className="mb-6">
            <Input
              type="text"
              placeholder="Search restaurants, cuisines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 text-lg"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCuisine(null)}
                className={`px-4 py-2 rounded-full border transition ${
                  selectedCuisine === null
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border hover:border-primary"
                }`}
              >
                All
              </button>
              {cuisines.map((cuisine) => (
                <button
                  key={cuisine}
                  onClick={() => setSelectedCuisine(cuisine)}
                  className={`px-4 py-2 rounded-full border transition ${
                    selectedCuisine === cuisine
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border hover:border-primary"
                  }`}
                >
                  {cuisine}
                </button>
              ))}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="rating">Sort by Rating</option>
              <option value="delivery_time">Sort by Delivery Time</option>
              <option value="delivery_fee">Sort by Delivery Fee</option>
            </select>
          </div>
        </div>

        {/* Restaurants Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant) => (
              <Link key={restaurant.id} href={`/customer/restaurant/${restaurant.id}`}>
                <div className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition cursor-pointer group h-full">
                  <div className="relative overflow-hidden">
                    <img
                      src={restaurant.image || "/placeholder.svg"}
                      alt={restaurant.name}
                      className="w-full h-40 object-cover group-hover:scale-105 transition"
                    />
                    {!restaurant.is_open && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-semibold">Closed</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-foreground mb-1">{restaurant.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{restaurant.cuisine}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <span className="text-primary">★</span>
                        <span className="font-medium text-foreground">{restaurant.rating}</span>
                      </div>
                      <span className="text-muted-foreground">{restaurant.delivery_time}</span>
                      <span className="text-muted-foreground">${restaurant.delivery_fee.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">No restaurants found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
