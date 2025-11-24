export enum UserRole {
  CUSTOMER = "customer",
  RESTAURANT_ADMIN = "restaurant_admin",
  DELIVERY_PARTNER = "delivery_partner",
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  address?: string;
  profileImage?: string;
  createdAt: Date;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ) => Promise<void>;
  logout: () => void;
  updateUserProfile: (updates: Partial<User>) => Promise<void>;
}

export interface CartItem {
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

export interface Order {
  id: string;
  customerId: string;
  restaurantId: string;
  items: CartItem[];
  totalAmount: number;
  status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "out_for_delivery"
    | "delivered"
    | "cancelled";
  deliveryAddress: string;
  createdAt: Date;
  estimatedDelivery?: Date;
}

export interface TableBooking {
  id: string;
  customerId: string;
  restaurantId: string;
  date: Date;
  time: string;
  partySize: number;
  specialRequests?: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: Date;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  location: string;
  address?: string;
  phone?: string;
  description: string;
  imageUrl: string;
  menu: MenuItem[];
}
