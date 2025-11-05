# Troubleshooting "localhost refused to connect"

## Common Issues & Solutions

### 1. Check Terminal Output
When you run `npm run dev`, check the terminal for error messages. Common errors:

- **Missing NEXTAUTH_SECRET**: "Error: Please define a `secret` in production"
- **Database connection**: "Can't reach database server"
- **Port already in use**: "Port 3000 is already in use"

### 2. Verify Environment Variables
Make sure your `.env` file (and `.env.local`) has:
```bash
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your_secret_here
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_id
GOOGLE_CLIENT_SECRET=your_secret
```

### 3. NextAuth Version Issue
The code uses NextAuth v4 syntax. If you have v5 installed, downgrade:
```bash
npm install next-auth@^4.24.7
```

### 4. Clear Next.js Cache
If the server was running before, try clearing the cache:
```bash
# Windows PowerShell:
Remove-Item -Recurse -Force .next

# Then restart:
npm run dev
```

### 5. Check if Port is in Use
If port 3000 is busy, Next.js might try a different port. Check:
- Terminal output for "ready on http://localhost:XXXX"
- Or try: `npm run dev -- -p 3001`

### 6. Database Connection
Make sure your database is accessible:
```bash
# Test connection
npm run prisma:studio
```

### 7. Missing Dependencies
If you see "Module not found" errors:
```bash
npm install
```

## Quick Fix Steps

1. **Stop the dev server** (Ctrl+C if it's running)
2. **Clear cache**: `Remove-Item -Recurse -Force .next` (Windows)
3. **Reinstall**: `npm install`
4. **Check .env**: Make sure NEXTAUTH_SECRET is set
5. **Restart**: `npm run dev`

## What to Look For

When `npm run dev` runs successfully, you should see:
```
✓ Ready in X seconds
○ Compiling / ...
○ Compiled successfully
✓ Ready on http://localhost:3000
```

If you see errors instead, share them and we'll fix them!

