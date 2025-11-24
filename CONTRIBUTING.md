# Contributing to Food Delivery App

First off, thank you for considering contributing to Food Delivery App! It's people like you that make this project better.

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps to reproduce the problem**
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed and what behavior you expected**
* **Include screenshots if possible**
* **Include your environment details** (OS, Node version, browser, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a detailed description of the suggested enhancement**
* **Provide specific examples to demonstrate the steps**
* **Describe the current behavior and expected behavior**
* **Explain why this enhancement would be useful**

### Pull Requests

1. Fork the repository
2. Create a new branch from `main`:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Make your changes following the coding standards
4. Commit your changes:
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. Push to the branch:
   ```bash
   git push origin feature/amazing-feature
   ```
6. Open a Pull Request

## 💻 Development Process

### Setup Development Environment

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/food-delivery-app.git
cd food-delivery-app

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Code Style

* We use TypeScript for type safety
* Follow the existing code style
* Run `pnpm lint` before committing
* Write meaningful commit messages
* Keep functions small and focused
* Add comments for complex logic

### Commit Message Guidelines

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

* `feat:` - A new feature
* `fix:` - A bug fix
* `docs:` - Documentation only changes
* `style:` - Changes that don't affect code meaning (white-space, formatting)
* `refactor:` - Code change that neither fixes a bug nor adds a feature
* `perf:` - Code change that improves performance
* `test:` - Adding missing tests
* `chore:` - Changes to build process or auxiliary tools

Example:
```
feat: add search functionality to restaurant list
fix: resolve cart item duplication issue
docs: update API documentation
```

### Testing

* Test your changes thoroughly
* Ensure the app builds without errors: `pnpm build`
* Test on different screen sizes (mobile, tablet, desktop)
* Test in different browsers if possible

## 📁 Project Structure

```
food-delivery-app/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── customer/          # Customer-facing pages
│   └── dashboard/         # Role-based dashboards
├── components/            # Reusable React components
│   └── ui/               # shadcn/ui components
├── context/              # React Context providers
├── lib/                  # Utilities, types, and mock data
├── public/               # Static assets
└── docs/                 # Project documentation
```

## 🎨 Component Guidelines

### Creating New Components

1. Place reusable components in `components/`
2. Place UI primitives in `components/ui/`
3. Use TypeScript for all components
4. Export component types alongside components
5. Add prop validation with TypeScript interfaces

Example:
```typescript
interface ComponentProps {
  title: string
  onClick?: () => void
}

export function Component({ title, onClick }: ComponentProps) {
  // Component logic
}
```

## 🔍 Code Review Process

1. All submissions require review
2. Reviewers will check for:
   * Code quality and style
   * Test coverage
   * Documentation
   * Performance implications
   * Security concerns
3. Address review comments promptly
4. Keep PRs focused and reasonably sized

## 📝 Documentation

* Update README.md if adding new features
* Add JSDoc comments for complex functions
* Update API documentation in `docs/API.md`
* Include examples in documentation

## 🚀 Release Process

Releases are handled by maintainers:

1. Version bumping follows [Semantic Versioning](https://semver.org/)
2. Changelog is automatically generated
3. Release notes highlight major changes
4. Deployment happens automatically via Vercel

## ❓ Questions?

Feel free to open an issue with your question or reach out to the maintainers.

## 📜 Code of Conduct

Please note that this project is released with a [Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

---

Thank you for contributing! 🎉
