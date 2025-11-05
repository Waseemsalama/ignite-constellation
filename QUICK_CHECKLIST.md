# Quick Setup Checklist

## ✅ You've Done:
- [x] Google OAuth credentials (`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`)

## ⚠️ Critical - Must Do Next:

### 1. Generate NEXTAUTH_SECRET
Run this in PowerShell:
```powershell
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

Or use an online generator and add to `.env.local`:
```
NEXTAUTH_SECRET=your_generated_secret_here
NEXTAUTH_URL=http://localhost:3000
```

### 2. Set Up Database (DATABASE_URL)
You need a PostgreSQL database. Options:

**Option A: Supabase (Recommended)**
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings → Database
4. Copy the connection string (Connection string → URI)
5. Add to `.env.local`:
   ```
   DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   ```

**Option B: Local PostgreSQL**
```
DATABASE_URL=postgresql://postgres:password@localhost:5432/ignite_constellation
```

### 3. Verify Google OAuth Redirect URI
In Google Cloud Console, make sure you have:
- **Authorized redirect URIs**: `http://localhost:3000/api/auth/callback/google`
- **Authorized JavaScript origins**: `http://localhost:3000`

## 🚀 Then Run:
```bash
# 1. Push database schema
npm run prisma:push

# 2. (Optional) Seed sample data
npm run seed

# 3. Start dev server
npm run dev
```

## 📝 Your .env.local should have at minimum:
```bash
# Critical
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your_secret_here
NEXTAUTH_URL=http://localhost:3000

# Already done
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## 🧪 Test It:
1. Visit `http://localhost:3000`
2. Click "Login" or go to `/login`
3. Click "Continue with Google"
4. Should redirect to Google, then back to your app

