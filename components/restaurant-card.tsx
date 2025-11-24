"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Restaurant } from "@/lib/types"
import { Star, Clock, DollarSign } from "lucide-react"
import Link from "next/link"

interface RestaurantCardProps {
  restaurant: Restaurant
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Link href={`/customer/menu/${restaurant.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        <div className="relative h-48 w-full bg-muted">
          <img
            src={restaurant.imageUrl || "/placeholder.svg"}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full flex items-center gap-1">
            <Star size={16} className="fill-current" />
            <span className="text-sm font-semibold">{restaurant.rating}</span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-bold text-lg mb-1">{restaurant.name}</h3>
          <p className="text-sm text-muted-foreground mb-3">{restaurant.cuisine}</p>

          <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign size={14} />
              <span>₹{restaurant.deliveryFee} delivery</span>
            </div>
          </div>

          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">View Menu</Button>
        </div>
      </Card>
    </Link>
  )
}
