# Ignite Constellation - Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory with your actual credentials:

```bash
# Database (Supabase Postgres direct URL)
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@YOUR_HOST:5432/postgres

# Supabase (for client JS + service role server-side)
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE

# NextAuth core
NEXTAUTH_SECRET=YOUR_RANDOM_SECRET  # Generate with: openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000

# OAuth Providers
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
TIKTOK_CLIENT_KEY=YOUR_TIKTOK_CLIENT_KEY
TIKTOK_CLIENT_SECRET=YOUR_TIKTOK_CLIENT_SECRET

# Stripe
STRIPE_SECRET_KEY=sk_test_123
STRIPE_WEBHOOK_SECRET=whsec_123

# Mapbox
MAPBOX_ACCESS_TOKEN=pk.eyJ1IjoiYOUR_MAPBOX_TOKEN
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1IjoiYOUR_MAPBOX_TOKEN

# App
SITE_URL=http://localhost:3000
```

**Generate NEXTAUTH_SECRET:**
```bash
# On Mac/Linux:
openssl rand -base64 32

# On Windows (PowerShell):
-ItemType File -Force | Out-Null; Get-Content NEXTAUTH_SECRET.txt
```

### 3. Set Up Database

```bash
# Push Prisma schema to database
npm run prisma:push

# (Optional) Seed with sample data
npm run seed

# (Optional) Open Prisma Studio to view data
npm run prisma:studio
```

### 4. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your site!

## What to Test First

1. **Homepage** - `/` - Should show Hero section
2. **Login** - `/login` - Test Google/TikTok OAuth (if configured)
3. **Constellation** - `/constellation` - 3D star visualization
4. **Points** - `/points` - Points dashboard

## Important Notes

### NextAuth Version
- The scaffold specified NextAuth v5, but the code uses v4 syntax
- If you encounter auth issues, you may need to:
  - Either downgrade to NextAuth v4: `npm install next-auth@^4.24.7`
  - Or update `lib/auth.ts` to use NextAuth v5 API (different syntax)

### Required Services Setup

1. **Supabase/Database**
   - Create a Supabase project
   - Get your PostgreSQL connection string
   - Copy to `DATABASE_URL`

2. **Google OAuth**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

3. **TikTok OAuth** (Optional)
   - Requires TikTok Developer account approval
   - May not work in all regions

4. **Stripe** (For payments)
   - Create Stripe account
   - Get test API keys from dashboard
   - Set up webhook endpoint: `http://localhost:3000/api/stripe-webhook`
   - For production, use Stripe CLI for local webhook testing

5. **Mapbox** (For maps)
   - Sign up at [Mapbox](https://www.mapbox.com/)
   - Get your access token

## Next Development Steps

1. **Connect Stripe Products**
   - Update `/app/(main)/points/page.tsx` with real Stripe price IDs
   - Test checkout flow end-to-end

2. **Enhance 3D Constellation**
   - Update `components/StarSky.tsx` to render actual stars from database
   - Add interactive features (click stars to view capsules)

3. **Complete Star Creation Flow**
   - Wire up `/app/(main)/ignite/page.tsx` to create stars
   - Connect Stripe checkout to star creation
   - Complete `/app/(main)/success/page.tsx` to save capsules

4. **Add Real-time Features**
   - Consider Supabase Realtime for live updates
   - Broadcast new stars to all users

5. **Production Deployment**
   - Deploy to Vercel (recommended for Next.js)
   - Set up production environment variables
   - Configure Stripe webhooks for production
   - Set up Vercel Cron for `/api/citystats/recalc` if needed

## Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Check if Supabase allows connections from your IP
- Ensure database is running

### Authentication Errors
- Check `NEXTAUTH_SECRET` is set
- Verify OAuth client IDs/secrets are correct
- Check redirect URIs match exactly

### Build Errors
- Run `npm install` again
- Clear `.next` folder: `rm -rf .next` (Mac/Linux) or `Remove-Item -Recurse -Force .next` (Windows)
- Check TypeScript errors: `npm run lint`

