"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { mockRestaurants } from "@/lib/mock-data";
import { RestaurantCard } from "@/components/restaurant-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { ShoppingCart, LogOut } from "lucide-react";

export default function BrowsePage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
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
      router.push("/");
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

  const filteredRestaurants = mockRestaurants.filter((restaurant) => {
    const matchesSearch =
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCuisine =
      !selectedCuisine || restaurant.cuisine === selectedCuisine;
    return matchesSearch && matchesCuisine;
  });

  const cuisines = [...new Set(mockRestaurants.map((r) => r.cuisine))];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">FoodHub</h1>
            <p className="text-xs text-muted-foreground">
              Welcome, {user.name}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.push("/customer/orders")}
            >
              Orders
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/customer/bookings")}
            >
              Bookings
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/customer/profile")}
            >
              Profile
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/customer/cart")}
            >
              <ShoppingCart size={20} />
            </Button>
            <Button variant="outline" onClick={logout}>
              <LogOut size={20} />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Search restaurants
            </label>
            <Input
              placeholder="Search by name or cuisine..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Filter by cuisine
            </label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCuisine === null ? "default" : "outline"}
                onClick={() => setSelectedCuisine(null)}
                size="sm"
              >
                All
              </Button>
              {cuisines.map((cuisine) => (
                <Button
                  key={cuisine}
                  variant={selectedCuisine === cuisine ? "default" : "outline"}
                  onClick={() => setSelectedCuisine(cuisine)}
                  size="sm"
                >
                  {cuisine}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Restaurants Grid */}
        <div>
          <h2 className="text-xl font-bold mb-6">Restaurants near you</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
          {filteredRestaurants.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No restaurants found matching your search.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
