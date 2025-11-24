# Database Setup Guide

This project uses **MongoDB** with **Mongoose** for data persistence. You have two options:

## Option 1: MongoDB Atlas (Recommended - Free Cloud Database)

### Steps:

1. **Sign up for MongoDB Atlas** (Free Forever Tier)

   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Create a free account

2. **Create a Free Cluster**

   - Click "Build a Database"
   - Select "FREE" tier (M0 Sandbox)
   - Choose your preferred cloud provider and region
   - Click "Create Cluster"

3. **Create Database User**

   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose authentication method: Password
   - Create username and password (save these!)
   - Set user privileges to "Read and write to any database"
   - Click "Add User"

4. **Whitelist IP Address**

   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**

   - Go to "Database" in the left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

6. **Update .env.local**

   \`\`\`env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/food-delivery-app?retryWrites=true&w=majority
   \`\`\`

   - Replace `<username>` with your database username
   - Replace `<password>` with your database password
   - Add `/food-delivery-app` before the `?` to specify the database name

7. **Seed the Database**
   - Start the development server: `pnpm dev`
   - In another terminal or browser, call the seed endpoint:
   \`\`\`bash
   curl -X POST http://localhost:3000/api/seed
   \`\`\`
   - Or visit: http://localhost:3000/api/seed in your browser (note: GET won't work, use POST)
   - You can also use Postman or any API client

## Option 2: Local MongoDB Installation

### For Windows:

1. **Download MongoDB Community Server**

   - Go to: https://www.mongodb.com/try/download/community
   - Download the Windows MSI installer
   - Run the installer and follow the setup wizard
   - Choose "Complete" installation
   - Install MongoDB as a Windows Service

2. **Start MongoDB**

   - MongoDB should start automatically as a service
   - Or run: `net start MongoDB` in Command Prompt (as Administrator)

3. **Verify Installation**

   \`\`\`powershell
   mongosh
   \`\`\`

   - This should open the MongoDB shell

4. **Update .env.local**

   \`\`\`env
   MONGODB_URI=mongodb://localhost:27017/food-delivery-app
   \`\`\`

5. **Seed the Database**
   \`\`\`bash
   pnpm dev
   # In another terminal:
   curl -X POST http://localhost:3000/api/seed
   \`\`\`

### For macOS:

1. **Install MongoDB using Homebrew**

   \`\`\`bash
   brew tap mongodb/brew
   brew install mongodb-community
   \`\`\`

2. **Start MongoDB**

   \`\`\`bash
   brew services start mongodb-community
   \`\`\`

3. **Update .env.local** (same as Windows above)

4. **Seed the Database** (same as above)

### For Linux (Ubuntu/Debian):

1. **Import MongoDB public key**

   \`\`\`bash
   curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg --dearmor -o /usr/share/keyrings/mongodb-server-7.0.gpg
   \`\`\`

2. **Create list file**

   \`\`\`bash
   echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
   \`\`\`

3. **Install MongoDB**

   \`\`\`bash
   sudo apt-get update
   sudo apt-get install -y mongodb-org
   \`\`\`

4. **Start MongoDB**

   \`\`\`bash
   sudo systemctl start mongod
   sudo systemctl enable mongod
   \`\`\`

5. **Update .env.local** and **Seed** (same as above)

## Database Models

The application uses the following MongoDB collections:

### Users Collection

- Stores user accounts (customers, restaurant admins, delivery partners)
- Fields: name, email, password (hashed), phone, role, address, profileImage
- Indexed on: email

### Restaurants Collection

- Stores restaurant information and menus
- Fields: name, cuisine, rating, deliveryTime, deliveryFee, location, address, phone, description, imageUrl, menu[]
- Indexed on: name, cuisine

### Orders Collection

- Stores customer orders
- Fields: customerId, restaurantId, items[], totalAmount, status, deliveryAddress, estimatedDelivery
- Indexed on: customerId, restaurantId, createdAt, status

### TableBookings Collection

- Stores table reservations
- Fields: customerId, restaurantId, date, time, partySize, specialRequests, status
- Indexed on: customerId, restaurantId, date, status

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Login user

### Users

- `GET /api/users/[id]` - Get user by ID
- `PUT /api/users/[id]` - Update user profile

### Restaurants

- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/[id]` - Get restaurant by ID
- `POST /api/restaurants` - Create new restaurant (admin only)

### Orders

- `GET /api/orders?customerId=[id]` - Get orders by customer
- `GET /api/orders?restaurantId=[id]` - Get orders by restaurant
- `POST /api/orders` - Create new order

### Bookings

- `GET /api/bookings?customerId=[id]` - Get bookings by customer
- `GET /api/bookings?restaurantId=[id]` - Get bookings by restaurant
- `POST /api/bookings` - Create new booking

### Database Management

- `POST /api/seed` - Seed database with mock restaurant data

## Troubleshooting

### Connection Errors

**Error: "MongooseServerSelectionError: connect ECONNREFUSED"**

- MongoDB service is not running
- Start MongoDB service (see installation steps above)

**Error: "Authentication failed"**

- Incorrect username/password in connection string
- Verify credentials in MongoDB Atlas dashboard

**Error: "IP not whitelisted"**

- Your IP is not allowed to connect
- Add your IP in Network Access settings (MongoDB Atlas)

### Database Issues

**Collections are empty**

- Run the seed endpoint: `POST /api/seed`
- Check the response for success message

**Data not persisting**

- Check MONGODB_URI environment variable
- Verify .env.local file exists and is loaded
- Restart development server after changing .env.local

## Monitoring

### MongoDB Atlas

- Dashboard: https://cloud.mongodb.com
- View metrics, performance, and database contents

### MongoDB Compass (GUI Tool)

- Download: https://www.mongodb.com/products/compass
- Connect using your MONGODB_URI
- Browse collections, run queries, and manage data

### Command Line (mongosh)

\`\`\`bash
# Connect to local MongoDB
mongosh

# Connect to Atlas
mongosh "mongodb+srv://cluster0.xxxxx.mongodb.net/food-delivery-app" --username <username>

# Show databases
show dbs

# Use database
use food-delivery-app

# Show collections
show collections

# Query examples
db.users.find()
db.restaurants.find()
db.orders.find({ customerId: "xxxxx" })
\`\`\`

## Best Practices

1. **Never commit .env.local** - Already in .gitignore
2. **Use environment variables** - Don't hardcode credentials
3. **Regular backups** - MongoDB Atlas has automatic backups
4. **Monitor usage** - Stay within free tier limits (512 MB storage)
5. **Secure passwords** - Use strong database user passwords
6. **Index optimization** - Models already have optimized indexes
7. **Data validation** - Mongoose schemas handle validation

## Migration from localStorage

The app now uses MongoDB instead of localStorage. When users log in:

- New accounts are created in MongoDB
- Profile updates save to MongoDB
- Orders and bookings persist in MongoDB
- Session still uses localStorage for authentication token

## Production Deployment

### Vercel

1. Add MONGODB_URI to environment variables in Vercel dashboard
2. Deploy the app
3. Call the /api/seed endpoint once to populate restaurants

### Other Platforms

1. Set MONGODB_URI environment variable
2. Ensure MongoDB Atlas IP whitelist includes your host's IPs
3. Deploy and seed database

## Support

- MongoDB Atlas Docs: https://docs.atlas.mongodb.com
- Mongoose Docs: https://mongoosejs.com/docs
- MongoDB University: https://university.mongodb.com (Free courses)
