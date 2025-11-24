# Architecture Documentation

## 🏗️ System Architecture

### Overview

Food Delivery App is built using a modern, component-based architecture leveraging Next.js 16's App Router for server-side rendering and optimal performance.

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                     Client Layer                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Customer   │  │  Restaurant  │  │   Delivery   │ │
│  │  Dashboard   │  │   Dashboard  │  │   Dashboard  │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                  Presentation Layer                      │
│  ┌────────────────────────────────────────────────────┐│
│  │          React Components (TypeScript)             ││
│  │  • Reusable UI Components (shadcn/ui)             ││
│  │  • Page Components                                 ││
│  │  • Layout Components                               ││
│  └────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                    State Management                      │
│  ┌────────────────────────────────────────────────────┐│
│  │          React Context API                         ││
│  │  • AuthContext (User authentication & session)     ││
│  │  • ThemeProvider (Dark/Light mode)                 ││
│  └────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                     Data Layer                          │
│  ┌────────────────────────────────────────────────────┐│
│  │          Mock Data & Types                         ││
│  │  • Restaurant data                                 ││
│  │  • Menu items                                      ││
│  │  • User profiles                                   ││
│  │  • Orders & bookings                               ││
│  └────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
\`\`\`

## 📂 Directory Structure

\`\`\`
food-delivery-app/
│
├── app/                          # Next.js 16 App Router
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Landing page
│   ├── globals.css              # Global styles
│   │
│   ├── auth/                    # Authentication flow
│   │   ├── page.tsx            # Login/Signup page
│   │   └── loading.tsx         # Loading state
│   │
│   ├── customer/                # Customer-facing pages
│   │   ├── browse/             # Restaurant browsing
│   │   ├── restaurant/[id]/    # Restaurant details
│   │   ├── menu/[id]/          # Menu item details
│   │   ├── cart/               # Shopping cart
│   │   ├── checkout/           # Checkout process
│   │   └── bookings/           # Table bookings
│   │
│   └── dashboard/               # Role-based dashboards
│       ├── customer/           # Customer dashboard
│       ├── restaurant/         # Restaurant admin
│       └── delivery/           # Delivery partner
│
├── components/                   # React components
│   ├── ui/                     # shadcn/ui primitives
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── input.tsx
│   │
│   ├── theme-provider.tsx      # Theme context wrapper
│   ├── restaurant-card.tsx     # Restaurant display
│   ├── menu-item-card.tsx      # Menu item display
│   └── login-form.tsx          # Authentication form
│
├── context/                      # React Context providers
│   └── auth-context.tsx        # Authentication state
│
├── lib/                          # Utilities & core logic
│   ├── types.ts                # TypeScript type definitions
│   ├── mock-data.ts            # Sample data for demo
│   └── utils.ts                # Helper functions
│
├── public/                       # Static assets
│   └── images/                 # Image files
│
└── docs/                         # Documentation
    ├── API.md                  # API documentation
    ├── FEATURES.md             # Feature documentation
    └── screenshots/            # App screenshots
\`\`\`

## 🔄 Data Flow

### Authentication Flow

\`\`\`
User Input (Login Form)
    │
    ▼
AuthContext.login()
    │
    ├── Validate credentials
    │
    ├── Set user state
    │
    └── Redirect to role-based dashboard
        │
        ├── Customer → /dashboard/customer
        ├── Restaurant → /dashboard/restaurant
        └── Delivery → /dashboard/delivery
\`\`\`

### Order Placement Flow

\`\`\`
Browse Restaurants
    │
    ▼
Select Restaurant
    │
    ▼
View Menu
    │
    ▼
Add Items to Cart (Local State)
    │
    ▼
Proceed to Checkout
    │
    ▼
Enter Delivery Details
    │
    ▼
Confirm Order
    │
    ▼
Order Created (Mock API)
    │
    ▼
Redirect to Dashboard
\`\`\`

## 🎨 Component Architecture

### Component Hierarchy

\`\`\`
App (Root Layout)
│
├── ThemeProvider
│   └── AuthProvider
│       │
│       ├── Public Routes
│       │   ├── Landing Page
│       │   └── Auth Page
│       │
│       └── Protected Routes
│           │
│           ├── Customer Routes
│           │   ├── Browse
│           │   ├── Restaurant Detail
│           │   ├── Menu Item Detail
│           │   ├── Cart
│           │   ├── Checkout
│           │   └── Bookings
│           │
│           └── Dashboard Routes
│               ├── Customer Dashboard
│               ├── Restaurant Dashboard
│               └── Delivery Dashboard
\`\`\`

### Reusable Components

1. **RestaurantCard**
   - Display restaurant info (name, cuisine, rating)
   - Used in browse and search pages
   - Clickable to navigate to details

2. **MenuItemCard**
   - Display menu item with price
   - Add to cart functionality
   - Category-based organization

3. **LoginForm**
   - Email/password input
   - Role selection
   - Form validation with React Hook Form

## 🔐 Authentication System

### Current Implementation

- **Type**: Mock Authentication (Client-side only)
- **Storage**: React Context + Local state
- **Roles**: Customer, Restaurant Admin, Delivery Partner

### Auth Context API

\`\`\`typescript
interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string, role: UserRole) => Promise<void>
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<void>
  logout: () => void
}
\`\`\`

### Future Backend Integration

For production, replace with:
- JWT-based authentication
- Secure HTTP-only cookies
- OAuth providers (Google, Facebook)
- Backend API integration
- Session management
- Role-based access control (RBAC)

## 📊 Data Models

### Core Entities

1. **User**
   \`\`\`typescript
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

2. **Restaurant**
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

3. **Order**
   \`\`\`typescript
   interface Order {
     id: string
     customerId: string
     restaurantId: string
     items: CartItem[]
     totalAmount: number
     status: OrderStatus
     deliveryAddress: string
     createdAt: Date
   }
   \`\`\`

## 🎯 Design Patterns

### 1. **Composition Pattern**
   - Small, reusable components
   - Props-based customization
   - Separation of concerns

### 2. **Provider Pattern**
   - Context API for global state
   - Theme management
   - Authentication state

### 3. **Container/Presentational Pattern**
   - Pages handle data fetching
   - Components handle presentation
   - Clear separation of logic and UI

### 4. **Compound Components**
   - Card components (Card, CardHeader, CardContent)
   - Form components
   - Layout components

## 🚀 Performance Optimizations

### Current Optimizations

1. **Next.js App Router**
   - Server-side rendering
   - Automatic code splitting
   - Built-in image optimization

2. **React Best Practices**
   - Minimal re-renders
   - Proper key usage in lists
   - Lazy loading where applicable

3. **CSS Optimization**
   - Tailwind CSS for minimal bundle size
   - CSS-in-JS with Tailwind Merge
   - Tree-shaking unused styles

### Future Optimizations

- Implement React Server Components
- Add caching strategies
- Optimize images with Next/Image
- Implement virtual scrolling for long lists
- Add service workers for offline support

## 🔮 Future Architecture Enhancements

### Backend Integration

\`\`\`
┌─────────────────┐
│   Next.js App   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐      ┌──────────────┐
│   API Routes    │◄────►│   Database   │
│   (Next.js)     │      │   (MongoDB)  │
└────────┬────────┘      └──────────────┘
         │
         ▼
┌─────────────────┐
│  External APIs  │
│  (Payment, Map) │
└─────────────────┘
\`\`\`

### Microservices Architecture (Long-term)

- **User Service**: Authentication & profiles
- **Restaurant Service**: Restaurant & menu management
- **Order Service**: Order processing & tracking
- **Delivery Service**: Delivery assignment & tracking
- **Payment Service**: Payment processing
- **Notification Service**: Email/SMS notifications

## 📱 Responsive Design Strategy

- **Mobile First**: Design starts from mobile viewport
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Flexible Layouts**: CSS Grid & Flexbox
- **Touch Optimization**: Larger tap targets, swipe gestures

## 🧪 Testing Strategy

### Planned Testing Approach

1. **Unit Tests**: Jest + React Testing Library
2. **Integration Tests**: Testing component interactions
3. **E2E Tests**: Playwright/Cypress
4. **Visual Regression**: Chromatic/Percy

## 📈 Scalability Considerations

- Modular architecture for easy feature addition
- Type-safe codebase with TypeScript
- Component library for consistency
- API-ready structure for backend integration
- Database-agnostic data layer

---

This architecture is designed to be **flexible**, **maintainable**, and **scalable** for future growth.
