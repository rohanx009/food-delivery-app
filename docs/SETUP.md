# Setup Guide

This guide will help you set up the Food Delivery App on your local machine for development and testing.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20 or higher) - [Download](https://nodejs.org/)
- **pnpm** (v8 or higher) - [Installation Guide](https://pnpm.io/installation)
- **Git** - [Download](https://git-scm.com/downloads)
- A code editor (VS Code recommended)

### Verify Installation

```bash
node --version    # Should be v20.x.x or higher
pnpm --version    # Should be 8.x.x or higher
git --version     # Should be 2.x.x or higher
```

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
# Using HTTPS
git clone https://github.com/rohanx009/food-delivery-app.git

# Or using SSH
git clone git@github.com:rohanx009/food-delivery-app.git

# Navigate to project directory
cd food-delivery-app
```

### 2. Install Dependencies

```bash
pnpm install
```

This will install all required dependencies defined in `package.json`.

### 3. Environment Setup

The app currently uses mock data and doesn't require environment variables. However, for future features:

```bash
# Copy the example environment file
cp .env.example .env.local

# Edit .env.local with your values (when needed)
```

### 4. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The app will automatically reload when you make changes.

---

## 📁 Project Structure Overview

```
food-delivery-app/
├── app/                    # Next.js App Router pages
├── components/            # Reusable React components
├── context/              # React Context providers
├── lib/                  # Utilities and mock data
├── public/               # Static assets
├── docs/                 # Documentation
├── .github/              # GitHub Actions workflows
└── Configuration files
```

---

## 🛠️ Available Scripts

```bash
# Development
pnpm dev          # Start development server (localhost:3000)

# Building
pnpm build        # Create production build
pnpm start        # Start production server

# Code Quality
pnpm lint         # Run ESLint to check code quality

# Cleaning (if needed)
rm -rf .next      # Remove build cache
rm -rf node_modules && pnpm install  # Reinstall dependencies
```

---

## 🎨 Development Workflow

### Making Changes

1. **Create a new branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** in the code

3. **Test your changes:**
   ```bash
   pnpm dev        # Run locally
   pnpm lint       # Check for errors
   pnpm build      # Ensure it builds
   ```

4. **Commit your changes:**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push to GitHub:**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** on GitHub

---

## 🔧 IDE Setup (VS Code)

### Recommended Extensions

Install these VS Code extensions for the best development experience:

1. **ESLint** - Microsoft
2. **Prettier** - Prettier
3. **Tailwind CSS IntelliSense** - Tailwind Labs
4. **TypeScript Vue Plugin (Volar)** - Vue
5. **Error Lens** - Alexander
6. **Auto Rename Tag** - Jun Han
7. **Path Intellisense** - Christian Kohler

### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

---

## 🎭 Testing the App

### User Roles

The app supports three user roles. Test each one:

#### 1. Customer
- **Email:** customer@example.com
- **Password:** Any password
- **Role:** Customer

**What to test:**
- Browse restaurants
- View restaurant details
- Add items to cart
- Checkout process
- Table booking

#### 2. Restaurant Admin
- **Email:** restaurant@example.com
- **Password:** Any password
- **Role:** Restaurant Admin

**What to test:**
- View restaurant dashboard
- Manage orders
- Update order status

#### 3. Delivery Partner
- **Email:** delivery@example.com
- **Password:** Any password
- **Role:** Delivery Partner

**What to test:**
- View delivery dashboard
- See available orders
- Track deliveries

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Port 3000 Already in Use

```bash
# Kill the process using port 3000
# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -ti:3000 | xargs kill -9

# Or use a different port:
pnpm dev -- -p 3001
```

#### 2. Module Not Found Errors

```bash
# Clear cache and reinstall
rm -rf node_modules .next
pnpm install
```

#### 3. Build Errors

```bash
# Check for TypeScript errors
npx tsc --noEmit

# Clear Next.js cache
rm -rf .next
pnpm build
```

#### 4. pnpm Not Found

```bash
# Install pnpm globally
npm install -g pnpm

# Or use npx
npx pnpm install
```

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel auto-detects Next.js settings
5. Click "Deploy"

Your app will be live in minutes!

### Environment Variables on Vercel

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add variables from `.env.example`
4. Redeploy the application

---

## 🔐 Security Best Practices

### Before Deployment

- [ ] Never commit `.env.local` or any file with secrets
- [ ] Review all environment variables
- [ ] Use strong, randomly generated secrets
- [ ] Enable HTTPS in production
- [ ] Set up CORS properly
- [ ] Implement rate limiting

### Generate Secure Secrets

```bash
# Generate a random secret key
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## 📚 Learning Resources

### Next.js
- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

### React
- [React Documentation](https://react.dev/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

### Tailwind CSS
- [Tailwind Documentation](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com/)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)

---

## 🤝 Getting Help

### Documentation
- [README.md](../README.md) - Project overview
- [ARCHITECTURE.md](../ARCHITECTURE.md) - System architecture
- [API.md](docs/API.md) - API documentation
- [FEATURES.md](docs/FEATURES.md) - Feature documentation

### Support Channels
- [GitHub Issues](https://github.com/rohanx009/food-delivery-app/issues)
- [GitHub Discussions](https://github.com/rohanx009/food-delivery-app/discussions)

### Contributing
- [CONTRIBUTING.md](../CONTRIBUTING.md) - Contribution guidelines
- [CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md) - Code of conduct

---

## ✅ Setup Checklist

- [ ] Node.js and pnpm installed
- [ ] Repository cloned
- [ ] Dependencies installed (`pnpm install`)
- [ ] Development server running (`pnpm dev`)
- [ ] VS Code extensions installed
- [ ] Can access app at http://localhost:3000
- [ ] Tested all three user roles
- [ ] Linting passes (`pnpm lint`)
- [ ] Production build succeeds (`pnpm build`)

---

🎉 **Congratulations!** You're all set up and ready to develop!

For more information, check out the [full documentation](../README.md).
