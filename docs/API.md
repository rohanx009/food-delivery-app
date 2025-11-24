# API Documentation

## Overview

This document describes the data structures, types, and mock API used in the Food Delivery App. Currently, the app uses client-side mock data for demonstration purposes.

## Base URL

\`\`\`
Local Development: http://localhost:3000
Production: https://your-deployment-url.vercel.app
\`\`\`

## Authentication

### Login

**Endpoint:** `POST /api/auth/login` (To be implemented)

**Current Implementation:** Client-side mock authentication via `AuthContext`

**Request Body:**
\`\`\`typescript
{
  email: string
  password: string
  role: "customer" | "restaurant_admin" | "delivery_partner"
}
\`\`\`

**Response:**
\`\`\`typescript
{
  success: boolean
  user: User
  token?: string  // For future backend integration
}
\`\`\`

### Signup

**Endpoint:** `POST /api/auth/signup` (To be implemented)

**Request Body:**
\`\`\`typescript
{
  name: string
  email: string
  password: string
  phone: string
  role: "customer" | "restaurant_admin" | "delivery_partner"
}
\`\`\`

### Logout

**Endpoint:** `POST /api/auth/logout` (To be implemented)

**Current Implementation:** Client-side state clearing

---

## Data Models

### User

\`\`\`typescript
enum UserRole {
  CUSTOMER = "customer",
  RESTAURANT_ADMIN = "restaurant_admin",
  DELIVERY_PARTNER = "delivery_partner",
}

interface User {
  id: string
  name: string
  email: string
  phone: string
  role: UserRole
  address?: string
  profileImage?: string
  createdAt: Date
}
\`\`\`

**Example:**
\`\`\`json
{
  "id": "user-123",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "role": "customer",
  "address": "123 Main St, City",
  "createdAt": "2025-11-24T10:00:00Z"
}
\`\`\`

### Restaurant

\`\`\`typescript
interface Restaurant {
  id: string
  name: string
  cuisine: string
  rating: number
  deliveryTime: string
  deliveryFee: number
  location: string
  description: string
  imageUrl: string
  menu: MenuItem[]
}
\`\`\`

**Example:**
\`\`\`json
{
  "id": "1",
  "name": "Spice Villa",
  "cuisine": "Indian",
  "rating": 4.6,
  "deliveryTime": "30-40 mins",
  "deliveryFee": 40,
  "location": "Downtown",
  "description": "Authentic Indian cuisine with traditional recipes",
  "imageUrl": "/indian-restaurant-exterior.jpg",
  "menu": []
}
\`\`\`

### MenuItem

\`\`\`typescript
interface MenuItem {
  id: string
  name: string
  category: "Starters" | "Mains" | "Desserts" | "Beverages"
  price: number
  description: string
  imageUrl: string
  restaurantId?: string
}
\`\`\`

**Example:**
\`\`\`json
{
  "id": "1-1",
  "name": "Samosa",
  "category": "Starters",
  "price": 80,
  "description": "Crispy triangular pastry with potato filling",
  "imageUrl": "/crispy-golden-samosas.png"
}
\`\`\`

### CartItem

\`\`\`typescript
interface CartItem {
  id: string
  menuItem: {
    id: string
    name: string
    price: number
    imageUrl: string
  }
  quantity: number
  restaurantId: string
}
\`\`\`

**Example:**
\`\`\`json
{
  "id": "cart-item-1",
  "menuItem": {
    "id": "1-1",
    "name": "Samosa",
    "price": 80,
    "imageUrl": "/crispy-golden-samosas.png"
  },
  "quantity": 2,
  "restaurantId": "1"
}
\`\`\`

### Order

\`\`\`typescript
type OrderStatus = 
  | "pending" 
  | "confirmed" 
  | "preparing" 
  | "out_for_delivery" 
  | "delivered" 
  | "cancelled"

interface Order {
  id: string
  customerId: string
  restaurantId: string
  items: CartItem[]
  totalAmount: number
  status: OrderStatus
  deliveryAddress: string
  createdAt: Date
  estimatedDelivery?: Date
}
\`\`\`

**Example:**
\`\`\`json
{
  "id": "order-123",
  "customerId": "user-123",
  "restaurantId": "1",
  "items": [],
  "totalAmount": 450,
  "status": "confirmed",
  "deliveryAddress": "123 Main St, City",
  "createdAt": "2025-11-24T10:00:00Z",
  "estimatedDelivery": "2025-11-24T11:00:00Z"
}
\`\`\`

### TableBooking

\`\`\`typescript
type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled"

interface TableBooking {
  id: string
  customerId: string
  restaurantId: string
  date: Date
  time: string
  partySize: number
  specialRequests?: string
  status: BookingStatus
  createdAt: Date
}
\`\`\`

**Example:**
\`\`\`json
{
  "id": "booking-123",
  "customerId": "user-123",
  "restaurantId": "1",
  "date": "2025-11-25",
  "time": "19:00",
  "partySize": 4,
  "specialRequests": "Window seat preferred",
  "status": "confirmed",
  "createdAt": "2025-11-24T10:00:00Z"
}
\`\`\`

---

## API Endpoints (Future Implementation)

### Restaurants

#### Get All Restaurants

\`\`\`
GET /api/restaurants
\`\`\`

**Query Parameters:**
- `cuisine` (optional): Filter by cuisine type
- `location` (optional): Filter by location
- `rating` (optional): Minimum rating filter

**Response:**
\`\`\`typescript
{
  success: boolean
  data: Restaurant[]
  count: number
}
\`\`\`

#### Get Restaurant by ID

\`\`\`
GET /api/restaurants/:id
\`\`\`

**Response:**
\`\`\`typescript
{
  success: boolean
  data: Restaurant
}
\`\`\`

#### Search Restaurants

\`\`\`
GET /api/restaurants/search?q=pizza
\`\`\`

**Query Parameters:**
- `q`: Search query

**Response:**
\`\`\`typescript
{
  success: boolean
  data: Restaurant[]
  count: number
}
\`\`\`

### Menu

#### Get Restaurant Menu

\`\`\`
GET /api/restaurants/:id/menu
\`\`\`

**Response:**
\`\`\`typescript
{
  success: boolean
  data: MenuItem[]
}
\`\`\`

#### Get Menu Item Details

\`\`\`
GET /api/menu/:itemId
\`\`\`

**Response:**
\`\`\`typescript
{
  success: boolean
  data: MenuItem
}
\`\`\`

### Orders

#### Create Order

\`\`\`
POST /api/orders
\`\`\`

**Request Body:**
\`\`\`typescript
{
  restaurantId: string
  items: Array<{
    menuItemId: string
    quantity: number
  }>
  deliveryAddress: string
}
\`\`\`

**Response:**
\`\`\`typescript
{
  success: boolean
  data: Order
  message: string
}
\`\`\`

#### Get User Orders

\`\`\`
GET /api/orders/user/:userId
\`\`\`

**Query Parameters:**
- `status` (optional): Filter by order status
- `limit` (optional): Number of results
- `offset` (optional): Pagination offset

**Response:**
\`\`\`typescript
{
  success: boolean
  data: Order[]
  count: number
}
\`\`\`

#### Get Order Details

\`\`\`
GET /api/orders/:orderId
\`\`\`

**Response:**
\`\`\`typescript
{
  success: boolean
  data: Order
}
\`\`\`

#### Update Order Status

\`\`\`
PATCH /api/orders/:orderId/status
\`\`\`

**Request Body:**
\`\`\`typescript
{
  status: OrderStatus
}
\`\`\`

**Response:**
\`\`\`typescript
{
  success: boolean
  data: Order
  message: string
}
\`\`\`

### Bookings

#### Create Booking

\`\`\`
POST /api/bookings
\`\`\`

**Request Body:**
\`\`\`typescript
{
  restaurantId: string
  date: string  // ISO date format
  time: string  // HH:mm format
  partySize: number
  specialRequests?: string
}
\`\`\`

**Response:**
\`\`\`typescript
{
  success: boolean
  data: TableBooking
  message: string
}
\`\`\`

#### Get User Bookings

\`\`\`
GET /api/bookings/user/:userId
\`\`\`

**Response:**
\`\`\`typescript
{
  success: boolean
  data: TableBooking[]
}
\`\`\`

#### Cancel Booking

\`\`\`
DELETE /api/bookings/:bookingId
\`\`\`

**Response:**
\`\`\`typescript
{
  success: boolean
  message: string
}
\`\`\`

---

## Mock Data

Currently, the app uses mock data defined in `lib/mock-data.ts`:

### Available Restaurants

1. **Spice Villa** (Indian)
   - 5 menu items (Samosa, Paneer Tikka, Butter Chicken, Biryani, Gulab Jamun)
   
2. **Burger Hub** (American)
   - 5 menu items (Cheese Fries, Chicken Wings, Classic Burger, BBQ Bacon Burger, Chocolate Shake)
   
3. **Sushi Zen** (Japanese)
   - 5 menu items (Edamame, Gyoza, California Roll, Dragon Roll, Mochi Ice Cream)
   
4. **Tandoor Palace** (Indian)
   - 5 menu items (Onion Bhaji, Chicken Tikka, Tandoori Chicken, Dal Makhani, Kheer)

### Accessing Mock Data

\`\`\`typescript
import { mockRestaurants, type Restaurant, type MenuItem } from '@/lib/mock-data'

// Get all restaurants
const restaurants = mockRestaurants

// Get specific restaurant
const restaurant = mockRestaurants.find(r => r.id === '1')

// Get menu items
const menuItems = restaurant?.menu
\`\`\`

---

## Error Handling

All API endpoints should return consistent error responses:

\`\`\`typescript
{
  success: false
  error: {
    code: string
    message: string
    details?: any
  }
}
\`\`\`

**Common Error Codes:**
- `AUTH_REQUIRED`: Authentication required
- `INVALID_CREDENTIALS`: Invalid login credentials
- `NOT_FOUND`: Resource not found
- `VALIDATION_ERROR`: Input validation failed
- `SERVER_ERROR`: Internal server error

---

## Future Enhancements

### Planned Features

1. **Payment Integration**
   - Stripe/PayPal integration
   - Multiple payment methods
   - Payment history

2. **Real-time Tracking**
   - WebSocket for order updates
   - Live delivery tracking
   - Push notifications

3. **Advanced Search**
   - Filters (price, rating, delivery time)
   - Sorting options
   - Autocomplete suggestions

4. **Reviews & Ratings**
   - User reviews
   - Photo uploads
   - Rating system

5. **Loyalty Program**
   - Points system
   - Rewards
   - Referral program

---

For questions or contributions, see [CONTRIBUTING.md](../CONTRIBUTING.md)
