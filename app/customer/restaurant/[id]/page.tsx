"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { mockRestaurants } from "@/lib/mock-data";
import type { MenuItem } from "@/lib/types";
import Link from "next/link";
import { MapPin, Phone, Clock, Star, ArrowLeft } from "lucide-react";

export default function RestaurantPage() {
  const { user, isLoading } = useAuth();
  const { cart, addToCart, updateQuantity, getCartTotal, getCartCount } =
    useCart();
  const params = useParams();
  const router = useRouter();
  const restaurantId = params.id as string;

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

  const restaurant =
    mockRestaurants.find((r) => r.id === restaurantId) || mockRestaurants[0];

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(
    new Set(restaurant.menu.map((item) => item.category))
  );
  const filteredItems = selectedCategory
    ? restaurant.menu.filter((item) => item.category === selectedCategory)
    : restaurant.menu;

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item, restaurant.id, restaurant.name);
  };

  const subtotal = getCartTotal();
  const tax = subtotal * 0.1;
  const deliveryFee = restaurant.deliveryFee;
  const total = subtotal + tax + deliveryFee;

  const handleCheckout = () => {
    if (cart.length > 0) {
      router.push("/customer/checkout");
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            <span className="font-semibold">Back</span>
          </Button>
          <span className="text-xl font-bold text-foreground">
            {restaurant.name}
          </span>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">
              Cart: {getCartCount()} items
            </p>
          </div>
        </div>
      </header>

      {/* Restaurant Hero */}
      <section className="max-w-6xl mx-auto px-6 py-6">
        <div className="rounded-lg overflow-hidden mb-6">
          <img
            src={restaurant.imageUrl || "/placeholder.svg"}
            alt={restaurant.name}
            className="w-full h-64 object-cover"
          />
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {restaurant.name}
          </h1>
          <p className="text-muted-foreground mb-4">{restaurant.description}</p>

          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center gap-1 text-primary font-semibold">
              <Star size={18} className="fill-current" />
              <span>{restaurant.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock size={18} />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <span className="text-muted-foreground">
              ₹{restaurant.deliveryFee} delivery
            </span>
          </div>

          {/* Restaurant Contact Info */}
          <Card className="p-4 bg-secondary/50">
            <h3 className="font-semibold mb-3">Restaurant Information</h3>
            <div className="space-y-2 text-sm">
              {restaurant.address && (
                <div className="flex items-start gap-2">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
                  <span>{restaurant.address}</span>
                </div>
              )}
              {restaurant.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={16} className="shrink-0 text-primary" />
                  <a
                    href={`tel:${restaurant.phone}`}
                    className="hover:underline"
                  >
                    {restaurant.phone}
                  </a>
                </div>
              )}
            </div>
          </Card>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 pb-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Menu Section */}
          <div className="lg:col-span-2">
            {/* Categories */}
            <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full border whitespace-nowrap transition ${
                  selectedCategory === null
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border hover:border-primary"
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full border whitespace-nowrap transition ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border hover:border-primary"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Menu Items */}
            <div className="grid md:grid-cols-2 gap-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-card rounded-lg border border-border p-4 hover:shadow-md transition"
                >
                  <div className="flex gap-4">
                    <img
                      src={item.imageUrl || "/placeholder.svg"}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg shrink-0"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-primary">
                          ₹{item.price}
                        </span>
                        <Button
                          size="sm"
                          onClick={() => handleAddToCart(item)}
                          className="bg-primary hover:bg-primary/90"
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="lg:sticky lg:top-20 h-fit">
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                Order Summary
              </h2>

              {cart.length > 0 ? (
                <>
                  <div className="space-y-3 mb-6 max-h-64 overflow-y-auto border-b border-border pb-4">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">
                            {item.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="px-2 py-1 border border-border rounded hover:bg-muted"
                            >
                              −
                            </button>
                            <span className="text-sm text-foreground min-w-fit">
                              {item.quantity}x
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="px-2 py-1 border border-border rounded hover:bg-muted"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <p className="text-sm font-semibold text-foreground ml-2">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Tax (10%)</span>
                      <span>₹{tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Delivery Fee</span>
                      <span>₹{deliveryFee}</span>
                    </div>
                    <div className="border-t border-border pt-2 flex justify-between font-bold text-foreground">
                      <span>Total</span>
                      <span className="text-primary text-lg">
                        ₹{total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    Proceed to Checkout
                  </Button>
                </>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  Your cart is empty
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
