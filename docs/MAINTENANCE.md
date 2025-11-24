# Maintenance Guide

This document provides guidance for keeping the Food Delivery App up-to-date and preventing common issues.

## 🔄 Regular Maintenance Tasks

### Monthly Updates (Recommended)

\`\`\`bash
# Check for outdated packages
pnpm outdated

# Update all packages to latest versions
pnpm update --latest

# Test the build
pnpm build

# Run the app locally
pnpm dev

# Commit updates
git add -A
git commit -m "chore: update dependencies to latest versions"
git push
\`\`\`

### Before Every Deployment

\`\`\`bash
# 1. Ensure dependencies are installed
pnpm install

# 2. Run linting
pnpm lint

# 3. Test production build
pnpm build

# 4. Check for TypeScript errors
npx tsc --noEmit
\`\`\`

## 🛡️ Preventing Common Issues

### 1. TypeScript Version Issues

**Problem:** "Minimum recommended TypeScript version" warning

**Solution:**

- Always keep TypeScript at v5.1.0 or higher
- Update in `package.json`: `"typescript": "^5.6.3"`
- Run `pnpm install` to apply changes

### 2. Dependency Conflicts

**Problem:** Package version conflicts or peer dependency warnings

**Solution:**

- Use `.npmrc` configuration (already set up)
- Run `pnpm install --force` if needed
- Check `pnpm-lock.yaml` is committed

### 3. Build Errors

**Problem:** Build fails with module errors

**Solution:**

\`\`\`bash
# Clean cache and reinstall
rm -rf .next node_modules
pnpm install
pnpm build
\`\`\`

### 4. Development Server Issues

**Problem:** Server won't start or port conflicts

**Solution:**

\`\`\`bash
# Kill existing process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port:
pnpm dev -- -p 3001
\`\`\`

## 📦 Package Management Best Practices

### Version Control Strategy

**Current Setup:**

- Major versions: Caret (`^`) - allows minor and patch updates
- Example: `"next": "^16.0.3"` allows 16.x.x but not 17.x.x

**When to Update:**

- **Patch updates** (16.0.3 → 16.0.4): Safe, apply immediately
- **Minor updates** (16.0.x → 16.1.x): Generally safe, test before deploying
- **Major updates** (16.x.x → 17.x.x): Breaking changes, review changelog

### Checking for Updates

\`\`\`bash
# List all outdated packages
pnpm outdated

# Update specific package
pnpm update <package-name> --latest

# Update all to latest (what we just did)
pnpm update --latest
\`\`\`

## 🔍 Health Check Commands

\`\`\`bash
# Check Node.js version (should be v20+)
node --version

# Check pnpm version (should be v8+)
pnpm --version

# Verify TypeScript version
npx tsc --version

# Check for security vulnerabilities
pnpm audit

# Fix security issues
pnpm audit --fix
\`\`\`

## 🚨 Troubleshooting

### Issue: "Cannot find module" errors

\`\`\`bash
# Clear all and reinstall
rm -rf node_modules .next
pnpm install
\`\`\`

### Issue: TypeScript errors in editor

\`\`\`bash
# Restart TypeScript server in VS Code
# Ctrl+Shift+P → "TypeScript: Restart TS Server"

# Or manually check
npx tsc --noEmit
\`\`\`

### Issue: Styling not working

\`\`\`bash
# Rebuild Tailwind
pnpm build

# Clear Next.js cache
rm -rf .next
pnpm dev
\`\`\`

### Issue: Git line ending warnings (LF/CRLF)

\`\`\`bash
# Configure Git for your OS
# Windows:
git config --global core.autocrlf true

# Mac/Linux:
git config --global core.autocrlf input
\`\`\`

## 📅 Update Schedule

| Frequency     | Task                             | Priority |
| ------------- | -------------------------------- | -------- |
| Weekly        | Check for security updates       | High     |
| Monthly       | Update dependencies              | Medium   |
| Quarterly     | Review and update major versions | Low      |
| Before Deploy | Run full test suite              | Critical |

## 🔐 Security Updates

\`\`\`bash
# Check for security vulnerabilities
pnpm audit

# Review issues
pnpm audit --json

# Fix automatically (if possible)
pnpm audit --fix

# Force update vulnerable packages
pnpm update <package-name> --latest
\`\`\`

## 📝 Changelog Maintenance

When updating dependencies, document changes:

\`\`\`markdown
## [1.x.x] - YYYY-MM-DD

### Updated Dependencies

- next: 16.0.3 → 16.0.4
- typescript: 5.0.2 → 5.6.3
- All Radix UI packages to latest versions
\`\`\`

## 🎯 Quality Checklist

Before pushing updates:

- [ ] `pnpm install` runs without errors
- [ ] `pnpm lint` passes
- [ ] `pnpm build` succeeds
- [ ] Local development server starts (`pnpm dev`)
- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] All pages load correctly
- [ ] Git changes are committed with clear message
- [ ] Changes pushed to GitHub
- [ ] CI/CD pipeline passes (check GitHub Actions)

## 🔄 Automated Maintenance (Future)

Consider setting up:

- **Dependabot** - Automatic dependency updates via GitHub
- **Renovate** - Smart dependency updates
- **Snyk** - Security vulnerability scanning

### Enable Dependabot

Create `.github/dependabot.yml`:

\`\`\`yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
\`\`\`

## 📞 Getting Help

If you encounter persistent issues:

1. Check the [GitHub Issues](https://github.com/rohanx009/food-delivery-app/issues)
2. Review Next.js [documentation](https://nextjs.org/docs)
3. Check package-specific documentation
4. Search for similar issues on Stack Overflow

## 🎉 Current Status

**Last Updated:** November 24, 2025

**Current Versions:**

- Next.js: 16.0.4
- React: 19.2.0
- TypeScript: 5.6.3
- Node.js: 20+
- pnpm: 10.23.0

**Status:** ✅ All dependencies up-to-date and optimized

---

Keep this document updated as the project evolves!
