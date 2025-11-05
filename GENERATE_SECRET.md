# How to Generate NEXTAUTH_SECRET

## Windows PowerShell (Corrected)

Run this command in PowerShell:

```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
```

Or use this simpler method:

```powershell
[System.Web.Security.Membership]::GeneratePassword(32, 0)
```

**If that doesn't work, use this (most reliable):**

```powershell
$bytes = New-Object byte[] 32
[System.Security.Cryptography.RNGCryptoServiceProvider]::Create().GetBytes($bytes)
[Convert]::ToBase64String($bytes)
```

## Simplest Method (Recommended)

Just use this online generator:
1. Go to: https://generate-secret.vercel.app/32
2. Click "Generate Secret"
3. Copy the secret
4. Add to your `.env` file

## Or Use Node.js (if installed)

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## After Generating

1. Add it to your `.env` file:
   ```
   NEXTAUTH_SECRET=your_generated_secret_here
   NEXTAUTH_URL=http://localhost:3000
   ```

2. Also add it to `.env.local` (for Next.js runtime):
   ```
   NEXTAUTH_SECRET=your_generated_secret_here
   NEXTAUTH_URL=http://localhost:3000
   ```

3. Restart your dev server after adding it
