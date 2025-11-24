"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { MenuItem } from "@/lib/types"
import { Plus, Minus } from "lucide-react"
import { useState } from "react"

interface MenuItemCardProps {
  item: MenuItem
  onAddToCart: (item: MenuItem, quantity: number) => void
}

export function MenuItemCard({ item, onAddToCart }: MenuItemCardProps) {
  const [quantity, setQuantity] = useState(0)

  const handleAdd = () => {
    setQuantity((q) => q + 1)
  }

  const handleRemove = () => {
    setQuantity((q) => Math.max(0, q - 1))
  }

  const handleAddToCart = () => {
    if (quantity > 0) {
      onAddToCart(item, quantity)
      setQuantity(0)
    }
  }

  return (
    <Card className="overflow-hidden">
      <div className="relative h-32 w-full bg-muted">
        <img src={item.imageUrl || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-sm mb-1">{item.name}</h3>
        <p className="text-xs text-muted-foreground mb-2">{item.description}</p>
        <p className="text-lg font-bold text-primary mb-3">₹{item.price}</p>

        {quantity === 0 ? (
          <Button
            onClick={handleAdd}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm"
            size="sm"
          >
            Add to Cart
          </Button>
        ) : (
          <div className="flex items-center justify-between bg-primary/10 rounded">
            <Button variant="ghost" size="sm" onClick={handleRemove} className="h-8 w-8 p-0">
              <Minus size={16} />
            </Button>
            <span className="font-semibold text-sm">{quantity}</span>
            <Button variant="ghost" size="sm" onClick={handleAdd} className="h-8 w-8 p-0">
              <Plus size={16} />
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}
