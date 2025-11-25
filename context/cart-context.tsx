"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { MenuItem } from "@/lib/types";

export interface CartItem extends MenuItem {
  quantity: number;
  restaurantId: string;
  restaurantName: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (
    item: MenuItem,
    restaurantId: string,
    restaurantName: string
  ) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("foodDeliveryCart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
    setIsInitialized(true);
  }, []);

  // Helper to save cart
  const saveCart = (newCart: CartItem[]) => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem("foodDeliveryCart", JSON.stringify(newCart));
      console.log("Cart saved to localStorage:", newCart);
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  };

  const addToCart = (
    item: MenuItem,
    restaurantId: string,
    restaurantName: string
  ) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      let newCart;

      if (existingItem) {
        // Increment quantity if item already in cart
        newCart = prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // Add new item to cart
        newCart = [
          ...prevCart,
          { ...item, quantity: 1, restaurantId, restaurantName },
        ];
      }
      saveCart(newCart);
      return newCart;
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item.id !== itemId);
      saveCart(newCart);
      return newCart;
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(itemId);
    } else {
      setCart((prevCart) => {
        const newCart = prevCart.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        );
        saveCart(newCart);
        return newCart;
      });
    }
  };

  const clearCart = () => {
    const newCart: CartItem[] = [];
    setCart(newCart);
    saveCart(newCart);
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
