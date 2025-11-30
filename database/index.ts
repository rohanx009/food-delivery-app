// Barrel exports for convenient imports
export { default as prisma } from "./client";

// Export types from Prisma
export type {
  User,
  Restaurant,
  MenuItem,
  Order,
  OrderItem,
  TableBooking,
} from "@prisma/client";
