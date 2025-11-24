import mongoose, { Schema, model, models } from "mongoose";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "customer" | "restaurant_admin" | "delivery_partner";
  address?: string;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },
    role: {
      type: String,
      enum: ["customer", "restaurant_admin", "delivery_partner"],
      default: "customer",
    },
    address: {
      type: String,
      trim: true,
    },
    profileImage: {
      type: String,
      default: "/user-avatar.jpg",
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
UserSchema.index({ email: 1 });

const User = models.User || model<IUser>("User", UserSchema);

export default User;
