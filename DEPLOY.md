# Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rohanx009/food-delivery-app)

## One-Click Deployment

Click the button above to deploy this project to Vercel automatically!

## Manual Deployment

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New Project"
4. Import `rohanx009/food-delivery-app`
5. Click "Deploy"

Your site will be live in 2-3 minutes!

## After Deployment

Your app will be available at: `https://food-delivery-app-[random].vercel.app`

### Features:

- ✅ Automatic deployments on git push
- ✅ Free SSL certificate
- ✅ Global CDN
- ✅ Serverless functions for API routes
- ✅ No configuration needed

## Environment Variables

### For Local Development (SQLite)

No environment variables are needed! The app uses a local SQLite database by default.

### For Production (PostgreSQL)

If you want to deploy to production with a persistent database (recommended):

1. Go to Project Settings → Environment Variables
2. Add: `DATABASE_URL` with your PostgreSQL connection string (e.g., from Neon, Supabase, or Vercel Postgres)
3. Redeploy

## Troubleshooting

If deployment fails, check:

- Build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Verify Node.js version compatibility
