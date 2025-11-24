import mongoose, { Schema, model, models } from "mongoose";

export interface ITableBooking {
  _id?: string;
  customerId: string;
  restaurantId: string;
  date: Date;
  time: string;
  partySize: number;
  specialRequests?: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const TableBookingSchema = new Schema<ITableBooking>(
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
    date: {
      type: Date,
      required: [true, "Booking date is required"],
    },
    time: {
      type: String,
      required: [true, "Booking time is required"],
    },
    partySize: {
      type: Number,
      required: [true, "Party size is required"],
      min: [1, "Party size must be at least 1"],
      max: [20, "Party size cannot exceed 20"],
    },
    specialRequests: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster queries
TableBookingSchema.index({ customerId: 1, date: -1 });
TableBookingSchema.index({ restaurantId: 1, date: 1, status: 1 });

const TableBooking =
  models.TableBooking ||
  model<ITableBooking>("TableBooking", TableBookingSchema);

export default TableBooking;
