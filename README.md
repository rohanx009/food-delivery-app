# Food Delivery App

A modern food delivery platform built with Next.js 16, React 19, and Tailwind CSS.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/rohangowda290-4005s-projects/v0-food-delivery-app)
[![CI/CD](https://github.com/rohanx009/food-delivery-app/actions/workflows/ci.yml/badge.svg)](https://github.com/rohanx009/food-delivery-app/actions)

## 🚀 Features

- **Multi-role dashboards**: Customer, Restaurant, and Delivery Partner interfaces
- **Restaurant browsing**: Browse and search restaurants
- **Menu management**: View detailed menus and add items to cart
- **Order management**: Complete checkout and booking system
- **Authentication**: Secure login system with role-based access
- **Responsive design**: Fully responsive UI with Tailwind CSS
- **Dark mode**: Theme support with next-themes

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Components**: Radix UI, shadcn/ui
- **Icons**: Lucide React
- **Form Handling**: React Hook Form + Zod
- **Package Manager**: pnpm

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/rohanx009/food-delivery-app.git

# Navigate to project directory
cd food-delivery-app

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Next.js and deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rohanx009/food-delivery-app)

### Manual Deployment

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## 🔧 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 📁 Project Structure

```
food-delivery-app/
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── customer/          # Customer-facing pages
│   └── dashboard/         # Role-based dashboards
├── components/            # Reusable React components
│   └── ui/               # shadcn/ui components
├── context/              # React context providers
├── lib/                  # Utility functions and types
└── public/               # Static assets
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🔗 Links

- **Live Demo**: [https://vercel.com/rohangowda290-4005s-projects/v0-food-delivery-app](https://vercel.com/rohangowda290-4005s-projects/v0-food-delivery-app)
- **GitHub Repository**: [https://github.com/rohanx009/food-delivery-app](https://github.com/rohanx009/food-delivery-app)
