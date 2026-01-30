# 🚀 Deployment Guide: CognitionFutures Platform

## 📦 What's Built
A production-ready Next.js 14 platform with:
- Kanban board with drag & drop
- Team collaboration
- Project management for Research, Curriculum, Business, Tech
- Real-time updates (Supabase ready)
- Mobile responsive design

## 🔧 Step 1: Push to GitHub

Run these commands in your terminal:

```bash
# Navigate to the project
cd /home/jay/clawd/cognitionfutures-live

# Initialize git (if not already done)
git init
git branch -m main

# Add all files
git add .

# Commit
git commit -m "Initial commit: CognitionFutures platform"

# Add your GitHub repository
git remote add origin https://github.com/jjayroux-lang/cognitionfutures.git

# Push to GitHub (you'll need to authenticate)
git push -u origin main
```

## 🌐 Step 2: Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com)**
2. **Log in with GitHub**
3. **Click "New Project"**
4. **Import your repository:** `jjayroux-lang/cognitionfutures`
5. **Configure:**
   - Framework Preset: **Next.js**
   - Root Directory: `cognitionfutures-live`
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
6. **Click "Deploy"**

Vercel will automatically:
- Build your Next.js app
- Deploy to a unique URL (like `cognitionfutures.vercel.app`)
- Set up SSL certificate
- Enable CDN caching

## 🗄️ Step 3: Set Up Supabase (Optional but Recommended)

1. **Go to [supabase.com](https://supabase.com)**
2. **Log in with GitHub**
3. **Create new project**
4. **Get your API keys:**
   - Project URL
   - `anon` public key
5. **Add to Vercel Environment Variables:**
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🎯 Step 4: First-Time Setup Commands

After deployment, run these in your local terminal:

```bash
# Install dependencies
cd /home/jay/clawd/cognitionfutures-live
npm install

# Run development server
npm run dev

# Open in browser
# http://localhost:3000
```

## 📱 Live Features

### ✅ Ready Now:
- Kanban board with drag & drop
- 4 project boards (Research, Curriculum, Business, Tech)
- Team management with roles
- Task tracking with todos, notes, documents
- Mobile responsive design
- Real-time ready (with Supabase)

### 🔄 Coming Soon (Easy to Add):
- User authentication
- Real-time collaboration
- File uploads
- Calendar integration
- Email notifications

## 💰 Cost: $0/month
- **Vercel:** Free tier (unlimited deployments)
- **Supabase:** Free tier (500MB database, 1GB storage)
- **GitHub:** Free for public repos

## 🔗 Useful Links

- **Live URL:** `https://cognitionfutures.vercel.app` (after deployment)
- **GitHub:** `https://github.com/jjayroux-lang/cognitionfutures`
- **Vercel Dashboard:** `https://vercel.com/dashboard`
- **Supabase Dashboard:** `https://supabase.com/dashboard`

## 🆘 Need Help?

### Common Issues:
1. **Build fails on Vercel:** Check Node.js version (needs 18+)
2. **Git push fails:** Use SSH or GitHub token
3. **Supabase connection:** Verify environment variables

### Quick Fixes:
```bash
# Update Node.js
nvm install 18
nvm use 18

# Generate GitHub token (if needed)
# Settings → Developer settings → Personal access tokens → Tokens (classic)
```

## 🎉 Success Checklist

- [ ] Code pushed to GitHub
- [ ] Deployed to Vercel
- [ ] Site loads at `cognitionfutures.vercel.app`
- [ ] Kanban board works
- [ ] Can add/edit cards
- [ ] Mobile responsive works

---

**Built with ❤️ by Dao for CognitionFutures**  
*Ready for investors, team collaboration, and scaling to millions of users!*