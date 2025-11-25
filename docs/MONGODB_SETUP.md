# MongoDB Atlas Setup Guide

This guide will help you set up a **FREE** MongoDB Atlas cloud database for your food delivery app.

## 🚀 Quick Setup (5 minutes)

### Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up with:
   - Google account (recommended - fastest)
   - Or email/password

### Step 2: Create a Free Cluster

1. After signing in, click **"Build a Database"**
2. Choose **"M0 FREE"** tier (0 cost, 512MB storage)
3. Select a cloud provider and region:
   - **Provider**: AWS, Google Cloud, or Azure
   - **Region**: Choose closest to you (e.g., Mumbai for India)
4. **Cluster Name**: `Cluster0` (default is fine)
5. Click **"Create Cluster"** (takes 1-3 minutes)

### Step 3: Create Database User

1. You'll see a **"Security Quickstart"** screen
2. **Authentication Method**: Username and Password
3. Create credentials:
   - **Username**: `fooddeliveryapp` (or your choice)
   - **Password**: Click "Autogenerate Secure Password" or create your own
   - ⚠️ **IMPORTANT**: Copy and save this password securely!
4. Click **"Create User"**

### Step 4: Configure Network Access

1. On the same screen, under **"Where would you like to connect from?"**
2. Choose **"My Local Environment"**
3. Click **"Add My Current IP Address"**
4. For development, you can also add `0.0.0.0/0` (allows access from anywhere)
   - ⚠️ **Note**: For production, restrict to specific IPs
5. Click **"Finish and Close"**

### Step 5: Get Connection String

1. Click **"Connect"** on your cluster
2. Choose **"Connect your application"**
3. Select:
   - **Driver**: Node.js
   - **Version**: 5.5 or later
4. Copy the connection string (looks like):
   ```
   mongodb+srv://fooddeliveryapp:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. **Replace** `<password>` with your actual password from Step 3
6. **Add** database name: `/food-delivery-app` before the `?`

   Final format:

   ```
   mongodb+srv://fooddeliveryapp:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/food-delivery-app?retryWrites=true&w=majority
   ```

### Step 6: Add to Your Project

1. In your project root, create a file named `.env.local`
2. Add this line (with your actual connection string):
   ```env
   MONGODB_URI=mongodb+srv://fooddeliveryapp:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/food-delivery-app?retryWrites=true&w=majority
   ```
3. Save the file

### Step 7: Test the Connection

1. Restart your development server:

   ```bash
   # Stop the current server (Ctrl+C)
   pnpm dev
   ```

2. You should see in the console:

   ```
   ✅ MongoDB connected successfully
   ```

3. If you see errors, check:
   - Password is correct (no special characters need URL encoding)
   - IP address is whitelisted
   - Connection string format is correct

## 🎯 Seed the Database

Once connected, seed your database with sample data:

```bash
pnpm seed
```

This will create:

- Sample restaurants
- Sample menu items
- Test users
- Demo orders

## 📊 View Your Data

1. Go to [MongoDB Atlas Dashboard](https://cloud.mongodb.com)
2. Click **"Browse Collections"** on your cluster
3. You'll see your databases and collections:
   - `users` - Customer, restaurant, and delivery partner accounts
   - `orders` - Order history
   - `restaurants` - Restaurant data
   - `tablebookings` - Table reservations

## 🔐 Security Best Practices

### For Development:

- ✅ Use `.env.local` (already in `.gitignore`)
- ✅ Never commit credentials to Git
- ✅ Use strong passwords

### For Production (Vercel):

1. Go to your Vercel project settings
2. Navigate to **"Environment Variables"**
3. Add:
   - **Key**: `MONGODB_URI`
   - **Value**: Your connection string
   - **Environment**: Production, Preview, Development
4. Redeploy your app

## 🛠️ Troubleshooting

### Error: "MongoServerError: bad auth"

- **Cause**: Wrong password or username
- **Fix**: Double-check credentials, regenerate password if needed

### Error: "MongooseServerSelectionError"

- **Cause**: IP not whitelisted or network issue
- **Fix**: Add your IP address in Network Access settings

### Error: "MONGODB_URI is not defined"

- **Cause**: `.env.local` file not created or not loaded
- **Fix**:
  1. Create `.env.local` in project root
  2. Restart dev server
  3. Check file is not in `.gitignore`

### Connection Timeout

- **Cause**: Firewall or network blocking connection
- **Fix**:
  1. Check firewall settings
  2. Try different network
  3. Add `0.0.0.0/0` to Network Access (development only)

## 📈 Free Tier Limits

MongoDB Atlas M0 (Free) includes:

- ✅ 512 MB storage
- ✅ Shared RAM
- ✅ Shared vCPU
- ✅ No credit card required
- ✅ Perfect for development and small projects

**Estimated capacity**:

- ~10,000 users
- ~50,000 orders
- ~500 restaurants

## 🚀 Upgrade Options

When you need more:

1. Go to cluster settings
2. Click **"Upgrade"**
3. Choose M10 or higher ($0.08/hour)

## 📚 Additional Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [MongoDB University](https://university.mongodb.com/) - Free courses

---

## ✅ Setup Checklist

- [ ] MongoDB Atlas account created
- [ ] Free M0 cluster created
- [ ] Database user created with password saved
- [ ] IP address whitelisted (0.0.0.0/0 for dev)
- [ ] Connection string copied
- [ ] `.env.local` file created with MONGODB_URI
- [ ] Development server restarted
- [ ] Connection successful (see ✅ in console)
- [ ] Database seeded with sample data
- [ ] Can view data in Atlas dashboard

---

**Need Help?** Check the troubleshooting section or open an issue on GitHub!
