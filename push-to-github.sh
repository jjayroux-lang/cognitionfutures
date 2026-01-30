#!/bin/bash

# Push CognitionFutures platform to GitHub
# Run this script in your terminal

echo "🚀 Pushing CognitionFutures platform to GitHub..."

# Navigate to project
cd /home/jay/clawd/cognitionfutures-live

# Remove existing remote if any
git remote remove origin 2>/dev/null

# Add your GitHub repository
git remote add origin https://github.com/jjayroux-lang/cognitionfutures.git

# Rename branch to main
git branch -M main

# Push to GitHub (will ask for credentials)
echo ""
echo "📤 Pushing to GitHub..."
echo "When prompted for credentials:"
echo "1. Username: Your GitHub username"
echo "2. Password: Use a GitHub Personal Access Token (not your password)"
echo ""
echo "To get a token:"
echo "1. Go to GitHub → Settings → Developer settings"
echo "2. Personal access tokens → Tokens (classic)"
echo "3. Generate new token with 'repo' scope"
echo ""
git push -u origin main

echo ""
echo "✅ Done! Now deploy to Vercel:"
echo "1. Go to https://vercel.com"
echo "2. Log in with GitHub"
echo "3. Import repository: jjayroux-lang/cognitionfutures"
echo "4. Deploy!"
echo ""
echo "🌐 Your site will be live at: https://cognitionfutures.vercel.app"