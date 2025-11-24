# MongoDB Database Implementation - Complete Guide

## Overview

The Food Delivery App now uses **MongoDB** with **Mongoose ODM** for persistent data storage instead of localStorage. This provides a production-ready database solution with proper data modeling, validation, and scalability.

## What Changed

### Before (localStorage)

- ❌ Data stored only in browser
- ❌ Lost on browser clear/different device
- ❌ No server-side validation
- ❌ Not scalable
- ❌ No real authentication

### After (MongoDB)

- ✅ Persistent cloud/server storage
- ✅ Access from any device
- ✅ Server-side validation with Mongoose schemas
- ✅ Scalable and production-ready
- ✅ Secure password hashing with bcrypt
- ✅ RESTful API architecture

## Architecture

\`\`\`
┌─────────────────┐
│  Next.js App    │
│  (Frontend)     │
└────────┬────────┘
         │
         │ HTTP Requests
         ▼
┌─────────────────┐
│   API Routes    │
│  (/api/...)     │
└────────┬────────┘
         │
         │ Mongoose ODM
         ▼
┌─────────────────┐
│   MongoDB       │
│   Database      │
└─────────────────┘
\`\`\`

## File Structure

\`\`\`
food-delivery-app/
├── lib/
│   ├── mongodb.ts              # Database connection
│   └── models/
│       ├── User.ts             # User model & schema
│       ├── Restaurant.ts       # Restaurant model & schema
│       ├── Order.ts            # Order model & schema
│       └── TableBooking.ts     # Booking model & schema
├── app/
│   └── api/
│       ├── auth/
│       │   ├── login/route.ts  # POST /api/auth/login
│       │   └── signup/route.ts # POST /api/auth/signup
│       ├── users/
│       │   └── [id]/route.ts   # GET/PUT /api/users/:id
│       ├── restaurants/
│       │   ├── route.ts        # GET/POST /api/restaurants
│       │   └── [id]/route.ts   # GET /api/restaurants/:id
│       ├── orders/
│       │   └── route.ts        # GET/POST /api/orders
│       ├── bookings/
│       │   └── route.ts        # GET/POST /api/bookings
│       └── seed/
│           └── route.ts        # POST /api/seed
├── context/
│   └── auth-context.tsx        # Updated to use API
├── .env.local                  # MongoDB connection string
├── .env.example                # Environment template
└── docs/
    └── DATABASE_SETUP.md       # Detailed setup guide
\`\`\`

## Database Models

### 1. User Model (`lib/models/User.ts`)

**Schema:**

\`\`\`typescript
{
  name: String (required),
  email: String (required, unique, lowercase),
  password: String (required, hashed),
  phone: String (required),
  role: Enum ['customer', 'restaurant_admin', 'delivery_partner'],
  address: String (optional),
  profileImage: String (default: '/user-avatar.jpg'),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
\`\`\`

**Indexes:** `email`

**Features:**

- Password hashing with bcrypt (10 rounds)
- Email uniqueness enforcement
- Role-based access control
- Timestamps for audit trail

### 2. Restaurant Model (`lib/models/Restaurant.ts`)

**Schema:**

\`\`\`typescript
{
  name: String (required),
  cuisine: String (required),
  rating: Number (0-5, default: 4.0),
  deliveryTime: String (required),
  deliveryFee: Number (required, min: 0),
  location: String (required),
  address: String (required),
  phone: String (required),
  description: String (required),
  imageUrl: String (required),
  menu: Array<MenuItem> [{
    id: String,
    name: String,
    category: String,
    price: Number,
    description: String,
    imageUrl: String
  }],
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
\`\`\`

**Indexes:** `name`, `cuisine`

**Features:**

- Embedded menu items for fast queries
- Rating validation (0-5 range)
- Full restaurant information
- Optimized for search and filtering

### 3. Order Model (`lib/models/Order.ts`)

**Schema:**

\`\`\`typescript
{
  customerId: String (required, indexed),
  restaurantId: String (required, indexed),
  items: Array<CartItem> [{
    id: String,
    menuItem: {
      id: String,
      name: String,
      price: Number,
      imageUrl: String
    },
    quantity: Number (min: 1),
    restaurantId: String
  }],
  totalAmount: Number (required, min: 0),
  status: Enum ['pending', 'confirmed', 'preparing',
                'out_for_delivery', 'delivered', 'cancelled'],
  deliveryAddress: String (required),
  estimatedDelivery: Date (optional),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
\`\`\`

**Indexes:** `customerId + createdAt`, `restaurantId + status`

**Features:**

- Order status tracking
- Embedded cart items
- Customer and restaurant relationships
- Delivery time estimation

### 4. TableBooking Model (`lib/models/TableBooking.ts`)

**Schema:**

\`\`\`typescript
{
  customerId: String (required, indexed),
  restaurantId: String (required, indexed),
  date: Date (required),
  time: String (required),
  partySize: Number (required, 1-20),
  specialRequests: String (optional),
  status: Enum ['pending', 'confirmed', 'completed', 'cancelled'],
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
\`\`\`

**Indexes:** `customerId + date`, `restaurantId + date + status`

**Features:**

- Table reservation management
- Party size validation (1-20 guests)
- Special requests support
- Booking status tracking

## API Endpoints

### Authentication

#### POST `/api/auth/signup`

Create new user account.

**Request:**

\`\`\`json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "phone": "+91 98765 43210",
  "role": "customer",
  "address": "123 Main St, Bangalore"
}
\`\`\`

**Response (201):**

\`\`\`json
{
  "message": "User created successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91 98765 43210",
    "role": "customer",
    "address": "123 Main St, Bangalore",
    "profileImage": "/user-avatar.jpg",
    "createdAt": "2025-11-25T10:00:00.000Z"
  }
}
\`\`\`

#### POST `/api/auth/login`

Authenticate user.

**Request:**

\`\`\`json
{
  "email": "john@example.com",
  "password": "securepassword",
  "role": "customer"
}
\`\`\`

**Response (200):**

\`\`\`json
{
  "message": "Login successful",
  "user": {
    /* same as signup response */
  }
}
\`\`\`

### Users

#### GET `/api/users/[id]`

Get user by ID.

**Response (200):**

\`\`\`json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com"
  /* ... other fields ... */
}
\`\`\`

#### PUT `/api/users/[id]`

Update user profile.

**Request:**

\`\`\`json
{
  "name": "John Updated",
  "phone": "+91 99999 99999",
  "address": "456 New St, Mumbai"
}
\`\`\`

**Response (200):**

\`\`\`json
{
  "message": "User updated successfully",
  "user": {
    /* updated user data */
  }
}
\`\`\`

### Restaurants

#### GET `/api/restaurants`

Get all restaurants (sorted by rating).

**Response (200):**

\`\`\`json
[
  {
    "id": "507f1f77bcf86cd799439012",
    "name": "Spice Garden",
    "cuisine": "Indian",
    "rating": 4.5,
    "deliveryTime": "30-40 min",
    "deliveryFee": 40,
    "location": "Koramangala, Bangalore",
    "menu": [
      /* menu items */
    ]
    /* ... other fields ... */
  }
]
\`\`\`

#### GET `/api/restaurants/[id]`

Get restaurant by ID.

#### POST `/api/restaurants`

Create new restaurant (admin only).

### Orders

#### GET `/api/orders?customerId=[id]`

Get orders for a customer.

#### GET `/api/orders?restaurantId=[id]`

Get orders for a restaurant.

#### POST `/api/orders`

Create new order.

**Request:**

\`\`\`json
{
  "customerId": "507f1f77bcf86cd799439011",
  "restaurantId": "507f1f77bcf86cd799439012",
  "items": [
    {
      "id": "item-1",
      "menuItem": {
        "id": "1",
        "name": "Butter Chicken",
        "price": 350,
        "imageUrl": "/butter-chicken.jpg"
      },
      "quantity": 2,
      "restaurantId": "507f1f77bcf86cd799439012"
    }
  ],
  "totalAmount": 740,
  "status": "pending",
  "deliveryAddress": "123 Main St, Bangalore"
}
\`\`\`

### Bookings

#### GET `/api/bookings?customerId=[id]`

Get bookings for a customer.

#### GET `/api/bookings?restaurantId=[id]`

Get bookings for a restaurant.

#### POST `/api/bookings`

Create new booking.

**Request:**

\`\`\`json
{
  "customerId": "507f1f77bcf86cd799439011",
  "restaurantId": "507f1f77bcf86cd799439012",
  "date": "2025-11-30T00:00:00.000Z",
  "time": "19:00",
  "partySize": 4,
  "specialRequests": "Window seat preferred",
  "status": "pending"
}
\`\`\`

### Database Management

#### POST `/api/seed`

Seed database with mock restaurant data.

**Response (200):**

\`\`\`json
{
  "message": "Database seeded successfully",
  "count": 4,
  "restaurants": [
    { "id": "...", "name": "Spice Garden" },
    { "id": "...", "name": "Pizza Palace" },
    { "id": "...", "name": "Burger Junction" },
    { "id": "...", "name": "Sushi Express" }
  ]
}
\`\`\`

## Setup Instructions

### Quick Setup (MongoDB Atlas - Recommended)

1. **Install dependencies:**

   \`\`\`bash
   pnpm install
   \`\`\`

2. **Run setup script:**

   \`\`\`bash
   pnpm setup:db
   \`\`\`

   Follow the interactive prompts to configure MongoDB Atlas.

3. **Start development server:**

   \`\`\`bash
   pnpm dev
   \`\`\`

4. **Seed the database:**

   \`\`\`bash
   pnpm seed
   \`\`\`

   Or manually:

   \`\`\`bash
   Invoke-WebRequest -Uri http://localhost:3000/api/seed -Method POST
   \`\`\`

5. **Open the app:**
   \`\`\`
   http://localhost:3000
   \`\`\`

### Manual Setup

1. **Sign up for MongoDB Atlas:**

   - Visit: https://www.mongodb.com/cloud/atlas/register
   - Create free account (M0 Sandbox - 512MB storage)

2. **Create cluster and user:**

   - Follow wizard to create a free cluster
   - Create database user with password
   - Whitelist IP: 0.0.0.0/0 (all IPs)

3. **Get connection string:**

   - Click "Connect" → "Connect your application"
   - Copy connection string
   - Format: `mongodb+srv://<username>:<password>@cluster.mongodb.net/food-delivery-app?retryWrites=true&w=majority`

4. **Configure environment:**

   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

   Edit `.env.local` and add your MongoDB URI:

   \`\`\`env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/food-delivery-app?retryWrites=true&w=majority
   \`\`\`

5. **Run the app:**
   \`\`\`bash
   pnpm dev
   pnpm seed
   \`\`\`

## Testing the Integration

### 1. Test User Registration

\`\`\`bash
Invoke-WebRequest -Uri http://localhost:3000/api/auth/signup `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body '{"name":"Test User","email":"test@example.com","password":"password123","phone":"+91 98765 43210","role":"customer"}'
\`\`\`

### 2. Test User Login

\`\`\`bash
Invoke-WebRequest -Uri http://localhost:3000/api/auth/login `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body '{"email":"test@example.com","password":"password123","role":"customer"}'
\`\`\`

### 3. Test Restaurant Retrieval

\`\`\`bash
Invoke-WebRequest -Uri http://localhost:3000/api/restaurants
\`\`\`

### 4. Test Using the App

1. Visit http://localhost:3000
2. Click "Get Started"
3. Sign up as a customer
4. Browse restaurants
5. Update profile
6. Check MongoDB Atlas dashboard to see data

## Migration Notes

### For Existing Users

- Old localStorage data is not automatically migrated
- Users will need to create new accounts
- Previous orders/bookings are not preserved

### Data Persistence

- **User sessions:** Still use localStorage for auth token
- **User data:** Stored in MongoDB `users` collection
- **Orders:** Stored in MongoDB `orders` collection
- **Bookings:** Stored in MongoDB `bookings` collection
- **Restaurants:** Stored in MongoDB `restaurants` collection

## Security Features

### Password Security

- Passwords hashed with bcrypt (10 salt rounds)
- Never stored in plain text
- Never returned in API responses

### API Security

- Email uniqueness enforced at database level
- Role validation on login
- Input validation with Mongoose schemas
- Error messages don't expose sensitive info

### Environment Variables

- Connection string in `.env.local` (not committed)
- `.gitignore` prevents accidental commits
- Separate configs for dev/prod

## Monitoring & Debugging

### MongoDB Atlas Dashboard

- View real-time metrics
- Browse collections
- Run queries
- Monitor performance
- Set up alerts

### Local Development

Use MongoDB Compass (GUI tool):

\`\`\`bash
# Download from: https://www.mongodb.com/products/compass
# Connect using your MONGODB_URI
\`\`\`

### Command Line (mongosh)

\`\`\`bash
# Connect to Atlas
mongosh "mongodb+srv://cluster.mongodb.net/food-delivery-app" --username <username>

# Show collections
show collections

# Query users
db.users.find().pretty()

# Query restaurants
db.restaurants.find({ cuisine: "Indian" }).pretty()

# Count documents
db.orders.countDocuments()
\`\`\`

## Troubleshooting

### Common Issues

**1. Connection Error: "MongooseServerSelectionError"**

- ✅ Check MONGODB_URI is correct
- ✅ Verify network connection
- ✅ Check IP is whitelisted in Atlas
- ✅ Restart development server

**2. Authentication Failed**

- ✅ Verify username/password in connection string
- ✅ URL-encode special characters in password
- ✅ Check database user exists in Atlas

**3. Data Not Persisting**

- ✅ Check .env.local exists
- ✅ Verify MONGODB_URI format
- ✅ Check API responses for errors
- ✅ Seed database if restaurants are missing

**4. API Errors (500)**

- ✅ Check browser console for errors
- ✅ Check terminal/server logs
- ✅ Verify Mongoose models are correct
- ✅ Test MongoDB connection

### Debug Mode

Add to `.env.local`:

\`\`\`env
DEBUG=mongoose:*
\`\`\`

## Performance Optimization

### Indexes

All models have optimized indexes:

- Users: `email`
- Restaurants: `name`, `cuisine`
- Orders: `customerId + createdAt`, `restaurantId + status`
- Bookings: `customerId + date`, `restaurantId + date + status`

### Caching

MongoDB connection is cached globally to prevent multiple connections.

### Query Optimization

- Use `.select()` to limit returned fields
- Sort on indexed fields
- Use `.lean()` for read-only queries

## Production Deployment

### Vercel

1. Add `MONGODB_URI` to environment variables
2. Deploy the app
3. Call `/api/seed` once to populate data

### Environment Variables

Required in production:

\`\`\`env
MONGODB_URI=mongodb+srv://...
NODE_ENV=production
\`\`\`

### Scaling

- MongoDB Atlas auto-scales
- Free tier: 512MB storage, shared CPU
- Can upgrade to dedicated clusters as needed

## Cost Estimation

### MongoDB Atlas Free Tier (M0)

- ✅ 512MB storage
- ✅ Shared RAM
- ✅ No credit card required
- ✅ Forever free
- ✅ Good for ~1000 active users

### Upgrade Path

- M10: $0.08/hour (~$57/month) - 2GB RAM
- M20: $0.20/hour (~$145/month) - 4GB RAM
- M30+: Custom pricing for enterprise

## Next Steps

1. ✅ MongoDB integration complete
2. ⏳ Add JWT-based session management
3. ⏳ Implement order status updates
4. ⏳ Add email notifications
5. ⏳ Implement search functionality
6. ⏳ Add admin dashboard
7. ⏳ Implement real-time order tracking

## Resources

- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)
- [Mongoose Docs](https://mongoosejs.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [MongoDB University](https://university.mongodb.com) - Free courses
- [Database Setup Guide](./DATABASE_SETUP.md) - Detailed instructions

## Support

For issues or questions:

1. Check [DATABASE_SETUP.md](./DATABASE_SETUP.md)
2. Review error messages in browser console
3. Check server logs in terminal
4. Verify MongoDB Atlas dashboard
5. Open an issue on GitHub

---

**Database Migration Complete! 🎉**

Your Food Delivery App now has a production-ready database with proper authentication, data validation, and scalability.
