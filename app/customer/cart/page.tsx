"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import type { CartItem } from "@/lib/types";
import { mockRestaurants } from "@/lib/mock-data";
import { ArrowLeft, Trash2 } from "lucide-react";

export default function CartPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [deliveryAddress, setDeliveryAddress] = useState(
    "123 Main Street, Apt 4B"
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const cart = localStorage.getItem("currentCart");
    if (cart) {
      setCartItems(JSON.parse(cart));
    }
  }, []);

  // Persist cart changes to localStorage
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("currentCart", JSON.stringify(cartItems));
    } else {
      localStorage.removeItem("currentCart");
    }
  }, [cartItems]);

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

  const restaurant = mockRestaurants.find(
    (r) => r.id === cartItems[0]?.restaurantId
  );

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0
  );
  const deliveryFee = restaurant?.deliveryFee || 0;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + tax;

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.menuItem.id !== itemId));
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      handleRemoveItem(itemId);
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.menuItem.id === itemId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold mb-2">Order Placed!</h1>
          <p className="text-muted-foreground mb-6">
            Your order has been confirmed and is being prepared.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Estimated delivery: 35-40 minutes
          </p>
          <Button
            onClick={() => router.push("/customer/browse")}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Continue Shopping
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-2xl font-bold">Your Cart</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="p-6 mb-6">
              <h2 className="text-lg font-bold mb-4">{restaurant?.name}</h2>
              {cartItems.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  Your cart is empty
                </p>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.menuItem.id}
                      className="flex items-center justify-between p-4 bg-secondary rounded"
                    >
                      <div className="flex-1">
                        <p className="font-semibold">{item.menuItem.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ₹{item.menuItem.price} x {item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-bold">
                          ₹{item.menuItem.price * item.quantity}
                        </p>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleQuantityChange(
                                item.menuItem.id,
                                item.quantity - 1
                              )
                            }
                          >
                            −
                          </Button>
                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleQuantityChange(
                                item.menuItem.id,
                                item.quantity + 1
                              )
                            }
                          >
                            +
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.menuItem.id)}
                        >
                          <Trash2 size={18} className="text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Delivery Address */}
            <Card className="p-6">
              <h3 className="font-bold mb-4">Delivery Address</h3>
              <Input
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Enter delivery address"
                className="w-full"
              />
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6 sticky top-24">
              <h3 className="font-bold mb-4 text-lg">Order Summary</h3>
              <div className="space-y-3 mb-4 pb-4 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>₹{tax}</span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="font-bold">Total</span>
                <span className="text-2xl font-bold text-primary">
                  ₹{total}
                </span>
              </div>

              <Button
                onClick={handlePlaceOrder}
                disabled={cartItems.length === 0 || isProcessing}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mb-3"
              >
                {isProcessing ? "Processing..." : "Place Order"}
              </Button>

              {/* Payment Info */}
              <Card className="p-4 bg-secondary">
                <p className="text-xs font-medium mb-2">Payment Method</p>
                <p className="text-sm mb-3">Debit/Credit Card</p>
                <div className="space-y-2 text-xs">
                  <p>Card Number: •••• •••• •••• 1234</p>
                  <p>Expiry: 12/25</p>
                </div>
              </Card>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
