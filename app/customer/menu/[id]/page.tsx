"use client";

import { useState, useMemo, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { mockRestaurants } from "@/lib/mock-data";
import { MenuItemCard } from "@/components/menu-item-card";
import { Button } from "@/components/ui/button";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import type { CartItem, MenuItem } from "@/lib/types";

export default function MenuPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const restaurantId = params.id as string;

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const restaurant = useMemo(
    () => mockRestaurants.find((r) => r.id === restaurantId),
    [restaurantId]
  );

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

  if (!user || !restaurant) {
    return null;
  }

  const handleAddToCart = (menuItem: MenuItem, quantity: number) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) => item.menuItem.id === menuItem.id
      );
      if (existingItem) {
        return prev.map((item) =>
          item.menuItem.id === menuItem.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: Math.random().toString(),
          menuItem: {
            id: menuItem.id,
            name: menuItem.name,
            price: menuItem.price,
            imageUrl: menuItem.imageUrl,
          },
          quantity,
          restaurantId,
        },
      ];
    });
  };

  const categories = [...new Set(restaurant.menu.map((item) => item.category))];
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.back()}>
              <ArrowLeft size={20} />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{restaurant.name}</h1>
              <p className="text-sm text-muted-foreground">
                {restaurant.cuisine}
              </p>
            </div>
          </div>
          <Button
            onClick={() => {
              localStorage.setItem("currentCart", JSON.stringify(cartItems));
              router.push("/customer/cart");
            }}
            disabled={cartCount === 0}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <ShoppingCart size={20} />
            <span className="ml-2">{cartCount} Items</span>
            <span className="ml-2">₹{cartTotal}</span>
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <img
            src={restaurant.imageUrl || "/placeholder.svg"}
            alt={restaurant.name}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>

        {/* Menu by Category */}
        {categories.map((category) => (
          <div key={category} className="mb-10">
            <h2 className="text-xl font-bold mb-4 text-primary">{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {restaurant.menu
                .filter((item) => item.category === category)
                .map((item) => (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    onAddToCart={handleAddToCart}
                  />
                ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
