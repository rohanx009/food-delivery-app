"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Package, Clock, MapPin, Phone } from "lucide-react";
import { mockRestaurants } from "@/lib/mock-data";

interface Order {
  id: string;
  restaurantId: string;
  restaurantName: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  totalAmount: number;
  status: string;
  deliveryAddress: string;
  createdAt: Date;
}

// Mock orders data - Set to empty array to show "no orders" state
const MOCK_ORDERS: Order[] = [];

export default function OrdersPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "active" | "completed"
  >("all");
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

  const filteredOrders = MOCK_ORDERS.filter((order) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "active")
      return order.status !== "delivered" && order.status !== "cancelled";
    if (selectedFilter === "completed") return order.status === "delivered";
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "preparing":
        return "bg-yellow-100 text-yellow-800";
      case "out_for_delivery":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleReorder = (order: Order) => {
    router.push(`/customer/restaurant/${order.restaurantId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-2xl font-bold">My Orders</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={selectedFilter === "all" ? "default" : "outline"}
            onClick={() => setSelectedFilter("all")}
          >
            All Orders
          </Button>
          <Button
            variant={selectedFilter === "active" ? "default" : "outline"}
            onClick={() => setSelectedFilter("active")}
          >
            Active
          </Button>
          <Button
            variant={selectedFilter === "completed" ? "default" : "outline"}
            onClick={() => setSelectedFilter("completed")}
          >
            Completed
          </Button>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <Card key={order.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold">
                      {order.restaurantName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Order #{order.id}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status.replace("_", " ").toUpperCase()}
                  </span>
                </div>

                {/* Items */}
                <div className="mb-4 space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                      <span className="text-muted-foreground">
                        ₹{item.price}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Order Details */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 pb-4 border-b border-border">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>
                      {new Date(order.createdAt).toLocaleDateString("en-IN")}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span>{order.deliveryAddress}</span>
                  </div>
                </div>

                {/* Total and Actions */}
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Amount
                    </p>
                    <p className="text-xl font-bold text-primary">
                      ₹{order.totalAmount}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {order.status === "delivered" && (
                      <Button
                        variant="outline"
                        onClick={() => handleReorder(order)}
                      >
                        Reorder
                      </Button>
                    )}
                    <Button variant="outline" onClick={() => {}}>
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <Package
                size={48}
                className="mx-auto text-muted-foreground mb-4"
              />
              <p className="text-lg text-muted-foreground">No orders found</p>
              <Button
                className="mt-4"
                onClick={() => router.push("/customer/browse")}
              >
                Start Ordering
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
