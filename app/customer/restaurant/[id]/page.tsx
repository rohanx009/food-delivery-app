"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  vegetarian: boolean
}

const RESTAURANT_DATA: { [key: string]: { name: string; image: string; deliveryTime: string; rating: number } } = {
  "1": { name: "Spice Villa", image: "/indian-restaurant-food.jpg", deliveryTime: "30-40 min", rating: 4.5 },
  "2": { name: "Burger Barn", image: "/burger-restaurant.jpg", deliveryTime: "25-35 min", rating: 4.3 },
  "3": { name: "Sushi Paradise", image: "/sushi-restaurant.jpg", deliveryTime: "35-45 min", rating: 4.7 },
  "4": { name: "Pizza Palace", image: "/pizza-restaurant.png", deliveryTime: "28-38 min", rating: 4.4 },
  "5": { name: "Taco Fiesta", image: "/mexican-food-restaurant.jpg", deliveryTime: "30-40 min", rating: 4.2 },
  "6": { name: "Thai Express", image: "/thai-restaurant.jpg", deliveryTime: "32-42 min", rating: 4.6 },
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: "1",
    name: "Butter Chicken",
    description: "Tender chicken in a creamy tomato sauce",
    price: 14.99,
    category: "Mains",
    image: "/butter-chicken.png",
    vegetarian: false,
  },
  {
    id: "2",
    name: "Paneer Tikka",
    description: "Cottage cheese marinated and grilled",
    price: 12.99,
    category: "Starters",
    image: "/paneer-tikka.png",
    vegetarian: true,
  },
  {
    id: "3",
    name: "Biryani",
    description: "Fragrant rice with spiced meat",
    price: 13.99,
    category: "Mains",
    image: "/flavorful-biryani.png",
    vegetarian: false,
  },
  {
    id: "4",
    name: "Garlic Naan",
    description: "Traditional Indian bread with garlic",
    price: 3.99,
    category: "Breads",
    image: "/garlic-naan.png",
    vegetarian: true,
  },
  {
    id: "5",
    name: "Samosa",
    description: "Crispy potato and pea pastry",
    price: 5.99,
    category: "Starters",
    image: "/crispy-golden-samosas.png",
    vegetarian: true,
  },
  {
    id: "6",
    name: "Gulab Jamun",
    description: "Sweet milk solids in sugar syrup",
    price: 4.99,
    category: "Desserts",
    image: "/gulab-jamun.png",
    vegetarian: true,
  },
]

interface CartItem extends MenuItem {
  quantity: number
}

export default function RestaurantPage() {
  const params = useParams()
  const router = useRouter()
  const restaurantId = params.id as string
  const restaurantInfo = RESTAURANT_DATA[restaurantId] || RESTAURANT_DATA["1"]

  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = Array.from(new Set(MENU_ITEMS.map((item) => item.category)))
  const filteredItems = selectedCategory ? MENU_ITEMS.filter((item) => item.category === selectedCategory) : MENU_ITEMS

  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id)
    if (existingItem) {
      setCart(
        cart.map((cartItem) => (cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)),
      )
    } else {
      setCart([...cart, { ...item, quantity: 1 }])
    }
  }

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter((item) => item.id !== itemId))
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(itemId)
    } else {
      setCart(cart.map((item) => (item.id === itemId ? { ...item, quantity } : item)))
    }
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const deliveryFee = 2.99
  const total = subtotal + tax + deliveryFee

  const handleCheckout = () => {
    if (cart.length > 0) {
      router.push("/customer/checkout")
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard/customer" className="flex items-center gap-2 hover:opacity-80">
            <span className="text-lg font-bold text-foreground">← Back</span>
          </Link>
          <span className="text-xl font-bold text-foreground">{restaurantInfo.name}</span>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Cart Items: {cart.length}</p>
          </div>
        </div>
      </header>

      {/* Restaurant Hero */}
      <section className="max-w-6xl mx-auto px-6 py-6">
        <div className="rounded-lg overflow-hidden mb-8">
          <img
            src={restaurantInfo.image || "/placeholder.svg"}
            alt={restaurantInfo.name}
            className="w-full h-64 object-cover"
          />
        </div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{restaurantInfo.name}</h1>
            <div className="flex items-center gap-4">
              <span className="text-primary font-semibold">★ {restaurantInfo.rating}</span>
              <span className="text-muted-foreground">{restaurantInfo.deliveryTime}</span>
              <span className="text-muted-foreground">$2.99 delivery</span>
            </div>
          </div>
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
                <div key={item.id} className="bg-card rounded-lg border border-border p-4 hover:shadow-md transition">
                  <div className="flex gap-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-foreground">{item.name}</h3>
                          {item.vegetarian && (
                            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded inline-block mt-1">
                              🥬 Vegetarian
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-primary">${item.price.toFixed(2)}</span>
                        <Button size="sm" onClick={() => addToCart(item)} className="bg-primary hover:bg-primary/90">
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
              <h2 className="text-xl font-bold text-foreground mb-4">Order Summary</h2>

              {cart.length > 0 ? (
                <>
                  <div className="space-y-3 mb-6 max-h-64 overflow-y-auto border-b border-border pb-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{item.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-1 border border-border rounded hover:bg-muted"
                            >
                              −
                            </button>
                            <span className="text-sm text-foreground min-w-fit">{item.quantity}x</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 border border-border rounded hover:bg-muted"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <p className="text-sm font-semibold text-foreground ml-2">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Tax (10%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Delivery Fee</span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-border pt-2 flex justify-between font-bold text-foreground">
                      <span>Total</span>
                      <span className="text-primary text-lg">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button onClick={handleCheckout} className="w-full bg-primary hover:bg-primary/90">
                    Proceed to Checkout
                  </Button>
                </>
              ) : (
                <p className="text-center text-muted-foreground py-8">Your cart is empty</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
