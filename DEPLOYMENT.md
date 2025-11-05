# Deploy to Live Server - Complete Guide

## 🚀 Recommended: Vercel (Easiest for Next.js)

Vercel is the recommended platform for Next.js apps - it's free, easy, and optimized for Next.js.

### Step 1: Prepare Your Code

1. **Make sure your code is in Git** (GitHub, GitLab, or Bitbucket)
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/ignite-constellation.git
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

#### Option A: Via Vercel Website (Easiest)

1. **Sign up/Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub, GitLab, or Bitbucket

2. **Import Your Project**
   - Click "Add New Project"
   - Select your repository
   - Click "Import"

3. **Configure Build Settings**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

4. **Add Environment Variables**
   Click "Environment Variables" and add all your `.env` variables:
   
   **Required:**
   ```
   DATABASE_URL=postgresql://postgres:password@host:5432/postgres
   NEXTAUTH_SECRET=your_secret_here
   NEXTAUTH_URL=https://your-domain.vercel.app
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```
   
   **Optional:**
   ```
   STRIPE_SECRET_KEY=sk_live_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   MAPBOX_ACCESS_TOKEN=pk.eyJ1...
   NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1...
   SITE_URL=https://your-domain.vercel.app
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (2-5 minutes)
   - Your site will be live at `https://your-project.vercel.app`

#### Option B: Via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   Follow the prompts to configure your project.

4. **Add Environment Variables**
   ```bash
   vercel env add DATABASE_URL
   vercel env add NEXTAUTH_SECRET
   vercel env add NEXTAUTH_URL
   # ... add all other variables
   ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Step 3: Update Google OAuth Redirect URIs

**IMPORTANT:** Update your Google OAuth settings:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Edit your OAuth 2.0 Client
4. Add to **Authorized redirect URIs**:
   ```
   https://your-domain.vercel.app/api/auth/callback/google
   ```
5. Add to **Authorized JavaScript origins**:
   ```
   https://your-domain.vercel.app
   ```

### Step 4: Set Up Database (Prisma)

Vercel will automatically run `npm install` and `npm run build`, but you need to ensure Prisma generates the client.

**Option 1: Add postinstall script** (Recommended)
Add this to your `package.json`:
```json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

**Option 2: Run Prisma manually after deployment**
If needed, you can run Prisma commands via Vercel's CLI or dashboard.

### Step 5: Test Your Deployment

1. Visit your live URL: `https://your-project.vercel.app`
2. Test signup/login
3. Test Google OAuth
4. Check database connections

---

## 🔄 Alternative Platforms

### Railway
1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Add environment variables
4. Deploy

### Netlify
1. Go to [netlify.com](https://netlify.com)
2. Add new site → Import from Git
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Add environment variables

### Render
1. Go to [render.com](https://render.com)
2. New → Web Service
3. Connect GitHub repo
4. Build command: `npm run build`
5. Start command: `npm start`
6. Add environment variables

---

## 📋 Pre-Deployment Checklist

- [ ] Code is in Git repository
- [ ] All environment variables documented
- [ ] Google OAuth redirect URIs updated
- [ ] Database is accessible from production (not just localhost)
- [ ] Test build locally: `npm run build`
- [ ] Test production build: `npm start`
- [ ] Update `NEXTAUTH_URL` to production domain
- [ ] Update `SITE_URL` to production domain
- [ ] Stripe webhooks configured (if using payments)
- [ ] Mapbox token configured (if using maps)

---

## 🐛 Troubleshooting Deployment

### Build Fails
- Check Vercel build logs for errors
- Ensure all dependencies are in `package.json`
- Run `npm run build` locally to test

### Database Connection Issues
- Verify `DATABASE_URL` is set correctly
- Check if Supabase allows connections from Vercel IPs
- Some databases require IP whitelisting

### Authentication Not Working
- Verify `NEXTAUTH_URL` matches your production domain
- Check Google OAuth redirect URIs match exactly
- Ensure `NEXTAUTH_SECRET` is set

### Environment Variables Not Loading
- Make sure variables are added in Vercel dashboard
- Redeploy after adding variables
- Check variable names match exactly (case-sensitive)

---

## 🔐 Security Checklist

- [ ] Use production Stripe keys (not test keys)
- [ ] Use strong `NEXTAUTH_SECRET` (different from dev)
- [ ] Database connection string is secure
- [ ] OAuth secrets are kept private
- [ ] No sensitive data in code/git

---

## 📝 After Deployment

1. **Set up custom domain** (optional)
   - In Vercel dashboard → Settings → Domains
   - Add your custom domain

2. **Monitor your app**
   - Check Vercel dashboard for analytics
   - Set up error monitoring (optional)

3. **Set up Stripe webhooks** (if using payments)
   - In Stripe dashboard → Webhooks
   - Add endpoint: `https://your-domain.vercel.app/api/stripe-webhook`
   - Copy webhook secret to Vercel env vars

4. **Set up cron jobs** (if needed)
   - For `/api/citystats/recalc`, use Vercel Cron
   - Or use external cron service

---

## 🎉 You're Live!

Your site should now be accessible at your Vercel URL. Share it with the world! 🌟

