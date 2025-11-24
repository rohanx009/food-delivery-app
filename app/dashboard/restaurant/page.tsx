"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Order {
  id: string
  customerName: string
  items: number
  total: string
  status: "pending" | "preparing" | "ready" | "out_for_delivery" | "delivered"
  orderTime: string
}

interface MenuItem {
  id: string
  name: string
  category: string
  price: number
  available: boolean
}

export default function RestaurantDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "menu" | "analytics">("overview")
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD001",
      customerName: "John Smith",
      items: 3,
      total: "$45.99",
      status: "preparing",
      orderTime: "2:15 PM",
    },
    {
      id: "ORD002",
      customerName: "Sarah Johnson",
      items: 2,
      total: "$32.50",
      status: "ready",
      orderTime: "2:05 PM",
    },
    {
      id: "ORD003",
      customerName: "Mike Brown",
      items: 4,
      total: "$58.75",
      status: "pending",
      orderTime: "1:55 PM",
    },
    {
      id: "ORD004",
      customerName: "Emma Davis",
      items: 2,
      total: "$28.99",
      status: "out_for_delivery",
      orderTime: "1:30 PM",
    },
    {
      id: "ORD005",
      customerName: "Alex Wilson",
      items: 5,
      total: "$67.50",
      status: "delivered",
      orderTime: "1:00 PM",
    },
  ])

  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: "1", name: "Butter Chicken", category: "Mains", price: 14.99, available: true },
    { id: "2", name: "Paneer Tikka", category: "Starters", price: 12.99, available: true },
    { id: "3", name: "Biryani", category: "Mains", price: 13.99, available: false },
    { id: "4", name: "Garlic Naan", category: "Breads", price: 3.99, available: true },
    { id: "5", name: "Samosa", category: "Starters", price: 5.99, available: true },
    { id: "6", name: "Gulab Jamun", category: "Desserts", price: 4.99, available: true },
  ])

  const stats = [
    { label: "Today's Orders", value: "24", change: "+12% from yesterday" },
    { label: "Total Revenue", value: "$1,250", change: "+18% from yesterday" },
    { label: "Pending Orders", value: orders.filter((o) => o.status === "pending").length, change: "Act now" },
    { label: "Average Rating", value: "4.5★", change: "Based on 120 reviews" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-red-100 text-red-800"
      case "preparing":
        return "bg-yellow-100 text-yellow-800"
      case "ready":
        return "bg-blue-100 text-blue-800"
      case "out_for_delivery":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)),
    )
  }

  const toggleMenuItemAvailability = (itemId: string) => {
    setMenuItems((prevItems) =>
      prevItems.map((item) => (item.id === itemId ? { ...item, available: !item.available } : item)),
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
              F
            </div>
            <span className="text-xl font-bold text-foreground">FoodHub Restaurant Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost">Settings</Button>
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Spice Villa Restaurant</h1>
          <p className="text-muted-foreground">Manage your restaurant operations efficiently</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border overflow-x-auto">
          {["overview", "orders", "menu", "analytics"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as typeof activeTab)}
              className={`px-4 py-3 font-medium border-b-2 transition capitalize ${
                activeTab === tab
                  ? "text-primary border-primary"
                  : "text-muted-foreground border-transparent hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="bg-card p-6 rounded-lg border border-border">
                  <p className="text-muted-foreground text-sm mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground mb-2">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Operating Hours */}
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Operating Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">Current Status</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Open</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Today's Hours</span>
                    <span className="text-foreground">10:00 AM - 10:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Delivery Available</span>
                    <span className="text-foreground">Yes</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button className="w-full justify-start bg-primary text-primary-foreground hover:bg-primary/90">
                    Mark All Orders Ready
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Update Operating Hours
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Manage Discounts
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="p-6 border-b border-border flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Active Orders</h2>
              <span className="text-muted-foreground text-sm">{orders.length} Total</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Order ID</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Customer</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Items</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Amount</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Time</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-border hover:bg-muted/50 transition">
                      <td className="px-6 py-4 text-sm font-medium text-foreground">{order.id}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{order.customerName}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{order.items} items</td>
                      <td className="px-6 py-4 text-sm font-semibold text-foreground">{order.total}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{order.orderTime}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status.replace("_", " ").toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {order.status !== "delivered" && order.status !== "out_for_delivery" && (
                            <button
                              onClick={() => {
                                const nextStatus = {
                                  pending: "preparing",
                                  preparing: "ready",
                                  ready: "out_for_delivery",
                                } as const
                                updateOrderStatus(order.id, nextStatus[order.status] || order.status)
                              }}
                              className="px-3 py-1 bg-primary text-primary-foreground rounded text-xs hover:bg-primary/90"
                            >
                              Next
                            </button>
                          )}
                          <button className="px-3 py-1 border border-border rounded text-xs hover:bg-muted">
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Menu Tab */}
        {activeTab === "menu" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Menu Management</h2>
              <Button className="bg-primary hover:bg-primary/90">Add New Item</Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {menuItems.map((item) => (
                <div key={item.id} className="bg-card p-6 rounded-lg border border-border">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-foreground">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                    </div>
                    <span className="text-lg font-bold text-primary">${item.price.toFixed(2)}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleMenuItemAvailability(item.id)}
                      className={`flex-1 px-3 py-2 rounded text-sm font-medium transition ${
                        item.available
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-red-100 text-red-800 hover:bg-red-200"
                      }`}
                    >
                      {item.available ? "Available" : "Out of Stock"}
                    </button>
                    <button className="px-3 py-2 border border-border rounded text-sm hover:bg-muted">Edit</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">Analytics & Reports</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* This Week */}
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-4">This Week's Performance</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Orders</span>
                    <span className="text-lg font-bold text-foreground">156</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Revenue</span>
                    <span className="text-lg font-bold text-primary">$4,250</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Avg Order Value</span>
                    <span className="text-lg font-bold text-foreground">$27.24</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Customer Satisfaction</span>
                    <span className="text-lg font-bold text-green-600">98%</span>
                  </div>
                </div>
              </div>

              {/* Top Items */}
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-4">Top Selling Items</h3>
                <div className="space-y-3">
                  {[
                    { name: "Butter Chicken", count: 45 },
                    { name: "Biryani", count: 38 },
                    { name: "Paneer Tikka", count: 32 },
                    { name: "Garlic Naan", count: 28 },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-muted-foreground">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${(item.count / 45) * 100}%` }} />
                        </div>
                        <span className="text-sm font-medium text-foreground w-8">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Revenue Chart */}
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="font-semibold text-foreground mb-4">Revenue Trend</h3>
              <div className="space-y-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                  <div key={day} className="flex items-center gap-4">
                    <span className="w-12 text-sm font-medium text-muted-foreground">{day}</span>
                    <div className="flex-1 h-8 bg-muted rounded-lg overflow-hidden">
                      <div className="h-full bg-primary transition" style={{ width: `${40 + Math.random() * 60}%` }} />
                    </div>
                    <span className="w-16 text-right text-sm font-medium text-foreground">
                      ${800 + Math.floor(Math.random() * 600)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
