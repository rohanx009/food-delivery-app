// Simple localStorage-based database for client-side data persistence
// In production, this should be replaced with a real database (Prisma, MongoDB, etc.)

import type { User, Restaurant } from "./types";

const DB_KEYS = {
  USERS: "foodhub_users",
  RESTAURANTS: "foodhub_restaurants",
  ORDERS: "foodhub_orders",
  BOOKINGS: "foodhub_bookings",
};

// Generic database operations
class LocalDB {
  private isClient = typeof window !== "undefined";

  // Get data from localStorage
  private get<T>(key: string): T[] {
    if (!this.isClient) return [];
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error(`Error reading from localStorage (${key}):`, error);
      return [];
    }
  }

  // Set data to localStorage
  private set<T>(key: string, data: T[]): void {
    if (!this.isClient) return;
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error writing to localStorage (${key}):`, error);
    }
  }

  // Users
  getUsers(): User[] {
    return this.get<User>(DB_KEYS.USERS);
  }

  getUserById(id: string): User | undefined {
    return this.getUsers().find((u) => u.id === id);
  }

  getUserByEmail(email: string): User | undefined {
    return this.getUsers().find((u) => u.email === email);
  }

  createUser(user: User): User {
    const users = this.getUsers();
    users.push(user);
    this.set(DB_KEYS.USERS, users);
    return user;
  }

  updateUser(id: string, updates: Partial<User>): User | undefined {
    const users = this.getUsers();
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) return undefined;

    users[index] = { ...users[index], ...updates };
    this.set(DB_KEYS.USERS, users);
    return users[index];
  }

  deleteUser(id: string): boolean {
    const users = this.getUsers();
    const filtered = users.filter((u) => u.id !== id);
    if (filtered.length === users.length) return false;
    this.set(DB_KEYS.USERS, filtered);
    return true;
  }

  // Restaurants
  getRestaurants(): Restaurant[] {
    return this.get<Restaurant>(DB_KEYS.RESTAURANTS);
  }

  getRestaurantById(id: string): Restaurant | undefined {
    return this.getRestaurants().find((r) => r.id === id);
  }

  createRestaurant(restaurant: Restaurant): Restaurant {
    const restaurants = this.getRestaurants();
    restaurants.push(restaurant);
    this.set(DB_KEYS.RESTAURANTS, restaurants);
    return restaurant;
  }

  updateRestaurant(
    id: string,
    updates: Partial<Restaurant>
  ): Restaurant | undefined {
    const restaurants = this.getRestaurants();
    const index = restaurants.findIndex((r) => r.id === id);
    if (index === -1) return undefined;

    restaurants[index] = { ...restaurants[index], ...updates };
    this.set(DB_KEYS.RESTAURANTS, restaurants);
    return restaurants[index];
  }

  deleteRestaurant(id: string): boolean {
    const restaurants = this.getRestaurants();
    const filtered = restaurants.filter((r) => r.id !== id);
    if (filtered.length === restaurants.length) return false;
    this.set(DB_KEYS.RESTAURANTS, filtered);
    return true;
  }

  // Orders
  getOrders(): any[] {
    return this.get<any>(DB_KEYS.ORDERS);
  }

  createOrder(order: any): any {
    const orders = this.getOrders();
    orders.push(order);
    this.set(DB_KEYS.ORDERS, orders);
    return order;
  }

  getOrdersByUserId(userId: string): any[] {
    return this.getOrders().filter((o) => o.customerId === userId);
  }

  // Bookings
  getBookings(): any[] {
    return this.get<any>(DB_KEYS.BOOKINGS);
  }

  createBooking(booking: any): any {
    const bookings = this.getBookings();
    bookings.push(booking);
    this.set(DB_KEYS.BOOKINGS, bookings);
    return booking;
  }

  getBookingsByUserId(userId: string): any[] {
    return this.getBookings().filter((b) => b.customerId === userId);
  }

  // Initialize database with mock data
  initializeDatabase(mockRestaurants: Restaurant[]): void {
    // Only initialize if empty
    if (this.getRestaurants().length === 0) {
      this.set(DB_KEYS.RESTAURANTS, mockRestaurants);
    }
  }

  // Clear all data (for testing/development)
  clearAll(): void {
    if (!this.isClient) return;
    Object.values(DB_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  }
}

// Export singleton instance
export const db = new LocalDB();
