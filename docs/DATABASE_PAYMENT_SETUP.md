# Database & Payment Setup Summary

## ✅ What's Been Done

### 1. Database Models Created ✓

Your app now has complete MongoDB models for:

- **Users** (`lib/models/User.ts`) - Customer profiles, restaurant admins, delivery partners
- **Orders** (`lib/models/Order.ts`) - Order tracking with payment information
- **Restaurants** (`lib/models/Restaurant.ts`) - Restaurant data
- **Table Bookings** (`lib/models/TableBooking.ts`) - Reservation system

### 2. API Routes Created ✓

- **`/api/users`** - Create and fetch users with secure password hashing
- **`/api/orders`** - Create and retrieve orders
- **`/api/restaurants`** - Restaurant management
- **`/api/bookings`** - Table booking management

### 3. Payment Fields Added ✓

The Order model now includes:

- `paymentMethod` - card, upi, wallet, or cash
- `paymentStatus` - pending, completed, failed, or refunded
- `paymentId` - Stripe/Razorpay payment ID
- `transactionId` - Transaction reference
- `paidAt` - Payment timestamp

---

## 🚀 Next Steps to Get Everything Working

### Step 1: Set Up MongoDB Database (5 minutes)

Follow the detailed guide: **[docs/MONGODB_SETUP.md](./MONGODB_SETUP.md)**

**Quick version:**

1. Create free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a free M0 cluster
3. Create database user and password
4. Whitelist your IP (or use `0.0.0.0/0` for development)
5. Get connection string
6. Create `.env.local` file in project root:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/food-delivery-app?retryWrites=true&w=majority
   ```
7. Restart your dev server

### Step 2: Test Database Connection

```bash
# Restart your development server
pnpm dev
```

Look for this message in the console:

```
✅ MongoDB connected successfully
```

### Step 3: Seed the Database (Optional)

```bash
pnpm seed
```

This creates sample data:

- Test users (customer, restaurant admin, delivery partner)
- Sample restaurants with menus
- Demo orders

### Step 4: Set Up Payment Gateway (Optional)

Follow the detailed guide: **[docs/PAYMENT_INTEGRATION.md](./PAYMENT_INTEGRATION.md)**

**For Stripe (Recommended):**

1. Create account at [Stripe](https://dashboard.stripe.com/register)
2. Get test API keys
3. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   ```
4. Install Stripe SDK:
   ```bash
   pnpm add stripe @stripe/stripe-js
   ```

**For Razorpay (India):**

1. Create account at [Razorpay](https://dashboard.razorpay.com/signup)
2. Get test API keys
3. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_...
   RAZORPAY_KEY_SECRET=...
   ```
4. Install Razorpay SDK:
   ```bash
   pnpm add razorpay
   ```

---

## 📋 Complete .env.local Template

Create `.env.local` in your project root with:

```env
# MongoDB Database
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/food-delivery-app?retryWrites=true&w=majority

# Authentication (for future use)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Stripe Payment (Optional)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here

# OR Razorpay Payment (Optional)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_here
RAZORPAY_KEY_SECRET=your_secret_here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

---

## 🧪 Testing the Setup

### Test User Creation

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "phone": "+1234567890",
    "role": "customer"
  }'
```

### Test Order Creation

```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": "user123",
    "restaurantId": "rest123",
    "items": [...],
    "totalAmount": 500,
    "deliveryAddress": "123 Main St",
    "paymentMethod": "card",
    "paymentStatus": "pending"
  }'
```

---

## 🔐 Security Checklist

- [ ] `.env.local` file created (not committed to Git)
- [ ] Strong database password used
- [ ] IP whitelist configured (or 0.0.0.0/0 for dev only)
- [ ] Test API keys used (not production keys)
- [ ] HTTPS enabled in production
- [ ] Environment variables added to Vercel for deployment

---

## 🚀 Deploy to Production

### Update Vercel Environment Variables

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings → Environment Variables**
4. Add all variables from `.env.local`:
   - `MONGODB_URI`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (if using Stripe)
   - `STRIPE_SECRET_KEY` (if using Stripe)
5. Select environments: Production, Preview, Development
6. Click **Save**
7. Redeploy your app

### Switch to Production Keys

For production:

- Use **live** MongoDB cluster (or keep M0 free tier)
- Use **live** Stripe/Razorpay keys (after account verification)
- Update `NEXTAUTH_URL` to your production domain

---

## 📊 Monitor Your Database

### MongoDB Atlas Dashboard

- View collections: [Browse Collections](https://cloud.mongodb.com)
- Monitor performance
- Set up alerts
- View logs

### Stripe Dashboard

- View payments: [Stripe Dashboard](https://dashboard.stripe.com)
- Track transactions
- Handle refunds
- View analytics

---

## 🛠️ Troubleshooting

### Database Not Connecting?

1. Check `.env.local` exists and has correct `MONGODB_URI`
2. Verify password has no special characters (or URL encode them)
3. Check IP is whitelisted in MongoDB Atlas
4. Restart development server

### Payment Not Working?

1. Verify API keys are correct
2. Check you're in test mode
3. Use test card numbers (see PAYMENT_INTEGRATION.md)
4. Check browser console for errors

### Orders Not Saving?

1. Ensure MongoDB is connected
2. Check all required fields are provided
3. View MongoDB logs in Atlas dashboard
4. Check server console for errors

---

## 📚 Documentation

- **[MONGODB_SETUP.md](./MONGODB_SETUP.md)** - Complete MongoDB setup guide
- **[PAYMENT_INTEGRATION.md](./PAYMENT_INTEGRATION.md)** - Payment gateway integration
- **[API.md](./API.md)** - API documentation
- **[ARCHITECTURE.md](../ARCHITECTURE.md)** - System architecture

---

## ✅ Setup Complete Checklist

### Database Setup

- [ ] MongoDB Atlas account created
- [ ] Free cluster created and running
- [ ] Database user created
- [ ] IP address whitelisted
- [ ] Connection string added to `.env.local`
- [ ] Database connection successful
- [ ] Sample data seeded

### Payment Setup (Optional)

- [ ] Stripe/Razorpay account created
- [ ] Test API keys obtained
- [ ] Keys added to `.env.local`
- [ ] SDK installed
- [ ] Test payment successful

### Deployment

- [ ] Environment variables added to Vercel
- [ ] Production deployment successful
- [ ] Database accessible from production
- [ ] Payment working in production (if enabled)

---

## 🎉 You're All Set!

Your food delivery app now has:

- ✅ **Database** - MongoDB Atlas for storing users, orders, restaurants
- ✅ **API Routes** - RESTful APIs for all operations
- ✅ **Payment Ready** - Models support payment tracking
- ✅ **Production Ready** - Can be deployed with real payment gateway

**Next Steps:**

1. Set up MongoDB (5 minutes)
2. Test the app with real database
3. (Optional) Add payment gateway
4. Deploy to production

Need help? Check the detailed guides or open an issue!
