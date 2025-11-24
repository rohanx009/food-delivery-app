# 🍔 Food Delivery App

> A comprehensive, multi-role food delivery platform built with modern web technologies

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/rohangowda290-4005s-projects/food-delivery-app)
[![CI/CD](https://github.com/rohanx009/food-delivery-app/actions/workflows/ci.yml/badge.svg)](https://github.com/rohanx009/food-delivery-app/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16.0-black.svg)](https://nextjs.org/)

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

### Detailed Setup

For comprehensive setup instructions including troubleshooting, IDE configuration, and development workflow, see [docs/SETUP.md](docs/SETUP.md).

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

## 🛠️ Development Tools

This project was built using the following tools and technologies:

### Core Development
- **VS Code** - Primary code editor with extensions for React, TypeScript, and Tailwind
- **Node.js** (v20+) - JavaScript runtime environment
- **pnpm** - Fast, disk space efficient package manager
- **Git** - Version control system

### Frontend Technologies
- **Next.js 16** - React framework with App Router
- **React 19** - JavaScript library for building user interfaces
- **TypeScript** - Static type checking for JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - Re-usable component library built on Radix UI

### UI Components & Icons
- **Radix UI** - Unstyled, accessible component primitives
- **Lucide React** - Beautiful & consistent icon set
- **next-themes** - Theme management for dark/light mode

### Form & Validation
- **React Hook Form** - Performant form management
- **Zod** - TypeScript-first schema validation

### Development Tools
- **ESLint** - Code quality and style checking
- **PostCSS** - CSS processing and transformation
- **Autoprefixer** - Adding vendor prefixes to CSS

### Deployment & CI/CD
- **Vercel** - Deployment and hosting platform
- **GitHub Actions** - Automated CI/CD pipeline
- **GitHub** - Source code management and collaboration

### Design & Planning
- **Component-driven architecture** - Building reusable UI components
- **Mobile-first design** - Responsive design approach
- **Accessibility standards** - Following WCAG guidelines

## 📖 Documentation

Comprehensive documentation is available in the `docs/` directory:

- **[Setup Guide](docs/SETUP.md)** - Detailed installation and configuration instructions
- **[Architecture](ARCHITECTURE.md)** - System design and technical architecture
- **[API Documentation](docs/API.md)** - Data models and API endpoints
- **[Features](docs/FEATURES.md)** - Complete feature documentation
- **[Contributing](CONTRIBUTING.md)** - Contribution guidelines
- **[Code of Conduct](CODE_OF_CONDUCT.md)** - Community guidelines

## 🧪 Testing

### Demo Accounts

Test the app with these demo credentials:

**Customer Account:**
- Email: `customer@example.com`
- Password: Any password
- Access: Browse, order, book tables

**Restaurant Admin:**
- Email: `restaurant@example.com`
- Password: Any password
- Access: Manage orders, menu, bookings

**Delivery Partner:**
- Email: `delivery@example.com`
- Password: Any password
- Access: View and manage deliveries

## 🗺️ Roadmap

### Current Status (v1.0)
- ✅ Multi-role authentication
- ✅ Restaurant browsing and search
- ✅ Shopping cart and checkout
- ✅ Table booking system
- ✅ Role-based dashboards
- ✅ Responsive design
- ✅ Dark/Light theme support

### Coming Soon (v1.1)
- 🔄 Real authentication with JWT
- 🔄 Payment integration (Stripe)
- 🔄 Real-time order tracking
- 🔄 Push notifications
- 🔄 Review and rating system

### Future Plans (v2.0)
- 📅 AI-powered recommendations
- 📅 Advanced analytics
- 📅 Multi-language support
- 📅 Native mobile apps
- 📅 Loyalty program
- 📅 Social features

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Contribution Steps

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Rohan M L**
- GitHub: [@rohanx009](https://github.com/rohanx009)
- Email: rohan.genai10@gmail.com

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes (to be created).

## 🔗 Links

- **Live Demo**: [https://food-delivery-app-rohan.vercel.app](https://food-delivery-app-rohan.vercel.app)
- **GitHub Repository**: [https://github.com/rohanx009/food-delivery-app](https://github.com/rohanx009/food-delivery-app)
- **Issues**: [Report a bug or request a feature](https://github.com/rohanx009/food-delivery-app/issues)
- **Discussions**: [Join the conversation](https://github.com/rohanx009/food-delivery-app/discussions)

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/rohanx009">Rohan M L</a></sub>
</div>
