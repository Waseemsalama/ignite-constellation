# Step-by-Step: Push Code to GitHub

## Option 1: Create New Repository on GitHub (Recommended)

### Step 1: Create GitHub Repository

1. **Go to GitHub**
   - Visit [github.com](https://github.com)
   - Sign in (or create account if needed)

2. **Create New Repository**
   - Click the **"+" icon** in the top right
   - Select **"New repository"**

3. **Repository Settings**
   - **Repository name**: `ignite-constellation` (or your choice)
   - **Description**: (optional) "Ignite Constellation - Social Star Platform"
   - **Visibility**: Choose **Public** or **Private**
   - **DO NOT** check "Initialize this repository with a README"
   - **DO NOT** add .gitignore or license (we already have these)
   - Click **"Create repository"**

4. **Copy the Repository URL**
   - GitHub will show you a page with setup instructions
   - Copy the HTTPS URL (looks like: `https://github.com/yourusername/ignite-constellation.git`)
   - Keep this URL handy!

### Step 2: Initialize Git in Your Project

Open your terminal in the project folder (`C:\Users\Wes.Salama\ic`) and run:

```bash
# Initialize git repository
git init

# Check what files will be added
git status
```

### Step 3: Create .gitignore (if not exists)

Make sure sensitive files aren't committed. Create or check `.gitignore`:

```bash
# .gitignore should include:
.env
.env.local
.env*.local
node_modules/
.next/
.vercel/
*.log
```

### Step 4: Add All Files

```bash
# Add all files to git
git add .

# Check what was added
git status
```

### Step 5: Make First Commit

```bash
# Commit your files
git commit -m "Initial commit - Ignite Constellation app"
```

### Step 6: Connect to GitHub

```bash
# Add GitHub as remote (replace with YOUR repository URL)
git remote add origin https://github.com/yourusername/ignite-constellation.git

# Verify it was added
git remote -v
```

### Step 7: Push to GitHub

```bash
# Push to GitHub (first time)
git branch -M main
git push -u origin main
```

**If prompted for credentials:**
- Username: Your GitHub username
- Password: Use a **Personal Access Token** (not your GitHub password)

### Step 8: Verify on GitHub

1. Go to your GitHub repository page
2. Refresh the page
3. You should see all your files!

---

## Option 2: Using GitHub Desktop (Easier GUI Method)

### Step 1: Install GitHub Desktop

1. Download from [desktop.github.com](https://desktop.github.com)
2. Install and sign in with your GitHub account

### Step 2: Add Repository

1. Open GitHub Desktop
2. Click **"File"** → **"Add Local Repository"**
3. Browse to your project folder: `C:\Users\Wes.Salama\ic`
4. Click **"Add repository"**

### Step 3: Commit and Push

1. You'll see all your files in the left panel
2. Type a commit message: "Initial commit - Ignite Constellation app"
3. Click **"Commit to main"**
4. Click **"Publish repository"** (top right)
5. Choose repository name and visibility
6. Click **"Publish repository"**

---

## 🔧 Troubleshooting

### "Repository not found" Error
- Check that you copied the correct repository URL
- Make sure the repository exists on GitHub
- Verify you have access to the repository

### "Authentication failed" Error
- Use Personal Access Token instead of password
- Create token: GitHub → Settings → Developer settings → Personal access tokens → Generate new token
- Give it "repo" permissions

### "Branch 'main' does not exist"
```bash
git branch -M main
git push -u origin main
```

### "Failed to push some refs"
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

---

## ✅ Success Checklist

- [ ] Repository created on GitHub
- [ ] Git initialized in project folder
- [ ] Files added and committed
- [ ] Remote origin added
- [ ] Code pushed to GitHub
- [ ] Files visible on GitHub website

---

## 🎯 Next Steps

Once your code is on GitHub:
1. ✅ Code is backed up
2. ✅ Ready to deploy to Vercel
3. ✅ Can share with team/collaborators

**Next:** Deploy to Vercel (see DEPLOYMENT.md)

