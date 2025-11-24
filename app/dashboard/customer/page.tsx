"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockRestaurants } from "@/lib/mock-data";

export default function CustomerDashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<
    "rating" | "deliveryTime" | "deliveryFee"
  >("rating");
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      setShouldRedirect(true);
    }
  }, [user, isLoading]);

  useEffect(() => {
    if (shouldRedirect) {
      router.push("/auth");
    }
  }, [shouldRedirect, router]);

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

  const cuisines = Array.from(new Set(mockRestaurants.map((r) => r.cuisine)));

  const filteredRestaurants = mockRestaurants
    .filter((restaurant) => {
      const matchesSearch =
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCuisine =
        !selectedCuisine || restaurant.cuisine === selectedCuisine;
      return matchesSearch && matchesCuisine;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "deliveryTime") {
        const timeA = Number.parseInt(a.deliveryTime.split("-")[0]);
        const timeB = Number.parseInt(b.deliveryTime.split("-")[0]);
        return timeA - timeB;
      }
      if (sortBy === "deliveryFee") return a.deliveryFee - b.deliveryFee;
      return 0;
    });

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
            <Link href="/customer/orders">
              <Button variant="outline">Orders</Button>
            </Link>
            <Link href="/customer/bookings">
              <Button variant="outline">Bookings</Button>
            </Link>
            <Link href="/customer/profile">
              <Button variant="outline">Profile</Button>
            </Link>
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
              <option value="deliveryTime">Sort by Delivery Time</option>
              <option value="deliveryFee">Sort by Delivery Fee</option>
            </select>
          </div>
        </div>

        {/* Restaurants Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant) => (
              <Link
                key={restaurant.id}
                href={`/customer/restaurant/${restaurant.id}`}
              >
                <div className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition cursor-pointer group h-full">
                  <div className="relative overflow-hidden">
                    <img
                      src={restaurant.imageUrl || "/placeholder.svg"}
                      alt={restaurant.name}
                      className="w-full h-40 object-cover group-hover:scale-105 transition"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {restaurant.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {restaurant.cuisine}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <span className="text-primary">★</span>
                        <span className="font-medium text-foreground">
                          {restaurant.rating}
                        </span>
                      </div>
                      <span className="text-muted-foreground">
                        {restaurant.deliveryTime}
                      </span>
                      <span className="text-muted-foreground">
                        ₹{restaurant.deliveryFee}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">
                No restaurants found matching your search.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
