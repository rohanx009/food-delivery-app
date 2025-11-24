# MongoDB Atlas Setup Script
# This script helps you set up MongoDB Atlas for the Food Delivery App

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  MongoDB Atlas Setup Helper" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env.local exists
if (Test-Path ".env.local") {
    Write-Host "✓ Found .env.local file" -ForegroundColor Green
    
    $envContent = Get-Content ".env.local" -Raw
    if ($envContent -match "MONGODB_URI=mongodb") {
        Write-Host "✓ MONGODB_URI is already configured" -ForegroundColor Green
        
        $currentUri = ($envContent -split "`n" | Where-Object { $_ -match "^MONGODB_URI=" }) -replace "^MONGODB_URI=", ""
        Write-Host "  Current: $currentUri" -ForegroundColor Gray
        Write-Host ""
        
        $change = Read-Host "Do you want to change it? (y/N)"
        if ($change -ne "y" -and $change -ne "Y") {
            Write-Host ""
            Write-Host "Keeping existing configuration." -ForegroundColor Yellow
            Write-Host ""
            Write-Host "Next steps:" -ForegroundColor Cyan
            Write-Host "1. Start the development server: pnpm dev" -ForegroundColor White
            Write-Host "2. Seed the database: Invoke-WebRequest -Uri http://localhost:3000/api/seed -Method POST" -ForegroundColor White
            Write-Host ""
            exit
        }
    }
} else {
    Write-Host "! .env.local not found. Creating from .env.example..." -ForegroundColor Yellow
    if (Test-Path ".env.example") {
        Copy-Item ".env.example" ".env.local"
        Write-Host "✓ Created .env.local" -ForegroundColor Green
    } else {
        Write-Host "✗ .env.example not found!" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "MongoDB Connection Options:" -ForegroundColor Cyan
Write-Host "1. MongoDB Atlas (Free Cloud - Recommended)" -ForegroundColor White
Write-Host "2. Local MongoDB Installation" -ForegroundColor White
Write-Host ""

$choice = Read-Host "Choose option (1 or 2)"

if ($choice -eq "1") {
    Write-Host ""
    Write-Host "MongoDB Atlas Setup:" -ForegroundColor Cyan
    Write-Host "1. Go to: https://www.mongodb.com/cloud/atlas/register" -ForegroundColor White
    Write-Host "2. Create a free account and cluster" -ForegroundColor White
    Write-Host "3. Create a database user with password" -ForegroundColor White
    Write-Host "4. Whitelist your IP (allow from anywhere: 0.0.0.0/0)" -ForegroundColor White
    Write-Host "5. Get your connection string" -ForegroundColor White
    Write-Host ""
    Write-Host "Your connection string should look like:" -ForegroundColor Yellow
    Write-Host "mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/food-delivery-app?retryWrites=true&w=majority" -ForegroundColor Gray
    Write-Host ""
    
    $uri = Read-Host "Paste your MongoDB Atlas connection string"
    
    if ($uri -match "mongodb\+srv://") {
        # Update .env.local
        $envContent = Get-Content ".env.local" -Raw
        $envContent = $envContent -replace "MONGODB_URI=.*", "MONGODB_URI=$uri"
        Set-Content ".env.local" $envContent
        
        Write-Host ""
        Write-Host "✓ Successfully configured MongoDB Atlas!" -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "✗ Invalid connection string format" -ForegroundColor Red
        exit 1
    }
    
} elseif ($choice -eq "2") {
    Write-Host ""
    Write-Host "Local MongoDB Setup:" -ForegroundColor Cyan
    
    # Check if MongoDB is installed
    try {
        $mongoVersion = & mongosh --version 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ MongoDB is installed" -ForegroundColor Green
        }
    } catch {
        Write-Host "! MongoDB not detected" -ForegroundColor Yellow
        Write-Host "  Download from: https://www.mongodb.com/try/download/community" -ForegroundColor White
        Write-Host ""
        $install = Read-Host "Press Enter after installing MongoDB, or 'q' to quit"
        if ($install -eq "q") { exit }
    }
    
    Write-Host ""
    Write-Host "Using local MongoDB connection..." -ForegroundColor White
    
    $uri = "mongodb://localhost:27017/food-delivery-app"
    
    # Update .env.local
    $envContent = Get-Content ".env.local" -Raw
    $envContent = $envContent -replace "MONGODB_URI=.*", "MONGODB_URI=$uri"
    Set-Content ".env.local" $envContent
    
    Write-Host "✓ Configured local MongoDB connection" -ForegroundColor Green
    
} else {
    Write-Host ""
    Write-Host "✗ Invalid option" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  Setup Complete!" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Start the development server:" -ForegroundColor White
Write-Host "   pnpm dev" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Seed the database with restaurant data:" -ForegroundColor White
Write-Host "   Invoke-WebRequest -Uri http://localhost:3000/api/seed -Method POST" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Open the app:" -ForegroundColor White
Write-Host "   http://localhost:3000" -ForegroundColor Gray
Write-Host ""
Write-Host "For detailed instructions, see: docs/DATABASE_SETUP.md" -ForegroundColor Yellow
Write-Host ""
