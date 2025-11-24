"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface DeliveryOrder {
  id: string
  restaurant: string
  customerName: string
  destination: string
  distance: string
  amount: string
  status: "available" | "accepted" | "picked_up" | "delivered"
  acceptedTime?: string
  orderTime: string
}

export default function DeliveryDashboard() {
  const [activeTab, setActiveTab] = useState<"available" | "active" | "completed" | "earnings">("available")
  const [orders, setOrders] = useState<DeliveryOrder[]>([
    {
      id: "DEL001",
      restaurant: "Spice Villa",
      customerName: "John Smith",
      destination: "123 Main St",
      distance: "2.3 km",
      amount: "$45.99",
      status: "available",
      orderTime: "2:15 PM",
    },
    {
      id: "DEL002",
      restaurant: "Burger Barn",
      customerName: "Sarah Johnson",
      destination: "456 Oak Ave",
      distance: "1.8 km",
      amount: "$32.50",
      status: "available",
      orderTime: "2:10 PM",
    },
    {
      id: "DEL003",
      restaurant: "Sushi Paradise",
      customerName: "Mike Brown",
      destination: "789 Elm St",
      distance: "3.2 km",
      amount: "$58.75",
      status: "accepted",
      acceptedTime: "1:50 PM",
      orderTime: "1:45 PM",
    },
    {
      id: "DEL004",
      restaurant: "Pizza Palace",
      customerName: "Emma Davis",
      destination: "321 Maple Dr",
      distance: "1.5 km",
      amount: "$28.99",
      status: "picked_up",
      acceptedTime: "1:20 PM",
      orderTime: "1:10 PM",
    },
    {
      id: "DEL005",
      restaurant: "Taco Fiesta",
      customerName: "Alex Wilson",
      destination: "654 Pine Rd",
      distance: "2.8 km",
      amount: "$42.50",
      status: "delivered",
      acceptedTime: "12:30 PM",
      orderTime: "12:15 PM",
    },
  ])

  const stats = [
    { label: "Today's Deliveries", value: "12", change: "+2 from yesterday" },
    { label: "Earnings Today", value: "$145.50", change: "+$12.50 from yesterday" },
    { label: "Active Orders", value: "2", change: "Keep going!" },
    { label: "Average Rating", value: "4.8★", change: "Based on 45 deliveries" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-blue-100 text-blue-800"
      case "accepted":
        return "bg-yellow-100 text-yellow-800"
      case "picked_up":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const acceptOrder = (orderId: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? { ...order, status: "accepted" as const, acceptedTime: new Date().toLocaleTimeString() }
          : order,
      ),
    )
  }

  const updateOrderStatus = (orderId: string, newStatus: DeliveryOrder["status"]) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)),
    )
  }

  const availableOrders = orders.filter((o) => o.status === "available")
  const activeOrders = orders.filter((o) => o.status === "accepted" || o.status === "picked_up")
  const completedOrders = orders.filter((o) => o.status === "delivered")

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
              F
            </div>
            <span className="text-xl font-bold text-foreground">FoodHub Delivery Partner</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost">Support</Button>
            <Button variant="ghost">24/7 Help</Button>
            <Link href="/">
              <Button variant="ghost" className="text-destructive">
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Delivery Dashboard</h1>
          <p className="text-muted-foreground">Manage your deliveries and earnings</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="bg-card p-6 rounded-lg border border-border">
              <p className="text-muted-foreground text-sm mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-foreground mb-2">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border overflow-x-auto">
          {[
            { id: "available", label: `Available (${availableOrders.length})` },
            { id: "active", label: `Active (${activeOrders.length})` },
            { id: "completed", label: `Completed (${completedOrders.length})` },
            { id: "earnings", label: "Earnings" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-3 font-medium border-b-2 transition whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-primary border-primary"
                  : "text-muted-foreground border-transparent hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Available Orders */}
        {activeTab === "available" && (
          <div className="space-y-4">
            {availableOrders.length > 0 ? (
              availableOrders.map((order) => (
                <div key={order.id} className="bg-card p-6 rounded-lg border border-border hover:shadow-md transition">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-foreground mb-1">{order.restaurant}</h3>
                      <p className="text-sm text-muted-foreground">Order {order.id}</p>
                    </div>
                    <span className="text-2xl font-bold text-primary">{order.amount}</span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Pickup</p>
                      <p className="text-sm font-medium text-foreground">{order.restaurant}</p>
                      <p className="text-xs text-muted-foreground mt-2">Ordered at {order.orderTime}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Delivery To</p>
                      <p className="text-sm font-medium text-foreground">{order.destination}</p>
                      <p className="text-xs text-muted-foreground mt-2">{order.customerName}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-foreground">Distance: {order.distance}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status.replace("_", " ").toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={() => acceptOrder(order.id)}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                  >
                    Accept Delivery
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-card rounded-lg border border-border">
                <p className="text-muted-foreground">No available orders at the moment</p>
              </div>
            )}
          </div>
        )}

        {/* Active Orders */}
        {activeTab === "active" && (
          <div className="space-y-4">
            {activeOrders.length > 0 ? (
              activeOrders.map((order) => (
                <div key={order.id} className="bg-card p-6 rounded-lg border border-border">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-foreground mb-1">{order.restaurant}</h3>
                      <p className="text-sm text-muted-foreground">Order {order.id}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status.replace("_", " ").toUpperCase()}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">From</p>
                      <p className="text-sm font-medium text-foreground">{order.restaurant}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">To</p>
                      <p className="text-sm font-medium text-foreground">{order.destination}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Distance</p>
                      <p className="text-sm font-medium text-foreground">{order.distance}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {order.status === "accepted" && (
                      <Button
                        onClick={() => updateOrderStatus(order.id, "picked_up")}
                        className="flex-1 bg-primary hover:bg-primary/90"
                      >
                        Mark as Picked Up
                      </Button>
                    )}
                    {order.status === "picked_up" && (
                      <Button
                        onClick={() => updateOrderStatus(order.id, "delivered")}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        Mark as Delivered
                      </Button>
                    )}
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Call Customer
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-card rounded-lg border border-border">
                <p className="text-muted-foreground">No active orders</p>
              </div>
            )}
          </div>
        )}

        {/* Completed Orders */}
        {activeTab === "completed" && (
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            {completedOrders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Order ID</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Restaurant</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Distance</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Amount</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Time</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {completedOrders.map((order) => (
                      <tr key={order.id} className="border-b border-border hover:bg-muted/50">
                        <td className="px-6 py-4 text-sm font-medium text-foreground">{order.id}</td>
                        <td className="px-6 py-4 text-sm text-foreground">{order.restaurant}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{order.distance}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-primary">{order.amount}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">~15 mins</td>
                        <td className="px-6 py-4 text-sm">
                          <span className="text-primary font-medium">★ {(4.5 + Math.random()).toFixed(1)}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No completed orders</p>
              </div>
            )}
          </div>
        )}

        {/* Earnings Tab */}
        {activeTab === "earnings" && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Today */}
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-4">Today</h3>
                <p className="text-4xl font-bold text-primary mb-2">$145.50</p>
                <p className="text-sm text-muted-foreground">12 deliveries completed</p>
              </div>

              {/* This Week */}
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-4">This Week</h3>
                <p className="text-4xl font-bold text-green-600 mb-2">$987.25</p>
                <p className="text-sm text-muted-foreground">78 deliveries completed</p>
              </div>

              {/* This Month */}
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-4">This Month</h3>
                <p className="text-4xl font-bold text-blue-600 mb-2">$3,245.75</p>
                <p className="text-sm text-muted-foreground">285 deliveries completed</p>
              </div>
            </div>

            {/* Earnings Breakdown */}
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="font-semibold text-foreground mb-4">Weekly Breakdown</h3>
              <div className="space-y-3">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                  <div key={day} className="flex items-center gap-4">
                    <span className="w-12 text-sm font-medium text-muted-foreground">{day}</span>
                    <div className="flex-1 h-8 bg-muted rounded-lg overflow-hidden">
                      <div className="h-full bg-primary transition" style={{ width: `${30 + Math.random() * 70}%` }} />
                    </div>
                    <span className="w-24 text-right text-sm font-medium text-foreground">
                      ${100 + Math.floor(Math.random() * 300)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="font-semibold text-foreground mb-4">Payment Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Account Balance</span>
                  <span className="text-lg font-bold text-foreground">$145.50</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Last Payout</span>
                  <span className="text-foreground">Dec 8, 2024 - $250.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Next Payout</span>
                  <span className="text-foreground">Dec 15, 2024</span>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 mt-4">Request Payout</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
