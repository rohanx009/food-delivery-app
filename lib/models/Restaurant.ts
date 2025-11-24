import mongoose, { Schema, model, models } from "mongoose";

export interface IMenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
}

export interface IRestaurant {
  _id?: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  location: string;
  address: string;
  phone: string;
  description: string;
  imageUrl: string;
  menu: IMenuItem[];
  createdAt: Date;
  updatedAt: Date;
}

const MenuItemSchema = new Schema<IMenuItem>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  { _id: false }
);

const RestaurantSchema = new Schema<IRestaurant>(
  {
    name: {
      type: String,
      required: [true, "Restaurant name is required"],
      trim: true,
    },
    cuisine: {
      type: String,
      required: [true, "Cuisine type is required"],
      trim: true,
    },
    rating: {
      type: Number,
      default: 4.0,
      min: 0,
      max: 5,
    },
    deliveryTime: {
      type: String,
      required: [true, "Delivery time is required"],
    },
    deliveryFee: {
      type: Number,
      required: [true, "Delivery fee is required"],
      min: 0,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
    },
    menu: [MenuItemSchema],
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
RestaurantSchema.index({ name: 1, cuisine: 1 });

const Restaurant =
  models.Restaurant || model<IRestaurant>("Restaurant", RestaurantSchema);

export default Restaurant;
