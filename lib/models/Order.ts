import mongoose, { Schema, model, models } from "mongoose";

export interface ICartItem {
  id: string;
  menuItem: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
  };
  quantity: number;
  restaurantId: string;
}

export interface IOrder {
  _id?: string;
  customerId: string;
  restaurantId: string;
  items: ICartItem[];
  totalAmount: number;
  status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "out_for_delivery"
    | "delivered"
    | "cancelled";
  deliveryAddress: string;
  estimatedDelivery?: Date;
  // Payment fields
  paymentMethod: "card" | "upi" | "wallet" | "cash";
  paymentStatus: "pending" | "completed" | "failed" | "refunded";
  paymentId?: string; // Stripe/Razorpay payment ID
  transactionId?: string; // Transaction reference
  paidAt?: Date; // Payment completion timestamp
  createdAt: Date;
  updatedAt: Date;
}

const CartItemSchema = new Schema<ICartItem>(
  {
    id: { type: String, required: true },
    menuItem: {
      id: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      imageUrl: { type: String, required: true },
    },
    quantity: { type: Number, required: true, min: 1 },
    restaurantId: { type: String, required: true },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
  {
    customerId: {
      type: String,
      required: [true, "Customer ID is required"],
      index: true,
    },
    restaurantId: {
      type: String,
      required: [true, "Restaurant ID is required"],
      index: true,
    },
    items: {
      type: [CartItemSchema],
      required: [true, "Order items are required"],
      validate: {
        validator: (items: ICartItem[]) => items.length > 0,
        message: "Order must have at least one item",
      },
    },
    totalAmount: {
      type: Number,
      required: [true, "Total amount is required"],
      min: 0,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "preparing",
        "out_for_delivery",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },
    deliveryAddress: {
      type: String,
      required: [true, "Delivery address is required"],
    },
    estimatedDelivery: {
      type: Date,
    },
    // Payment fields
    paymentMethod: {
      type: String,
      enum: ["card", "upi", "wallet", "cash"],
      required: [true, "Payment method is required"],
      default: "cash",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    paymentId: {
      type: String,
    },
    transactionId: {
      type: String,
    },
    paidAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster queries
OrderSchema.index({ customerId: 1, createdAt: -1 });
OrderSchema.index({ restaurantId: 1, status: 1 });

const Order = models.Order || model<IOrder>("Order", OrderSchema);

export default Order;
