# How to Install Git on Windows

## Option 1: Download Git Installer (Recommended)

### Step 1: Download Git
1. Go to [git-scm.com/download/win](https://git-scm.com/download/win)
2. The download will start automatically
3. Wait for the download to complete

### Step 2: Install Git
1. **Run the installer** (Git-x.x.x-64-bit.exe)
2. Click **"Next"** through the setup wizard
3. **Important settings:**
   - **Editor**: Choose your preferred editor (VS Code, Notepad++, etc.) or leave default
   - **Default branch name**: Leave as "main" (recommended)
   - **PATH environment**: Select **"Git from the command line and also from 3rd-party software"** (recommended)
   - **Line ending conversions**: Select **"Checkout Windows-style, commit Unix-style line endings"** (default)
   - **Terminal emulator**: Leave default (Use Windows' default console window)
4. Click **"Install"**
5. Wait for installation to complete
6. Click **"Finish"**

### Step 3: Verify Installation
1. **Close and reopen** your PowerShell/Command Prompt
2. Run:
   ```bash
   git --version
   ```
3. You should see something like: `git version 2.43.0`

✅ **Git is now installed!**

---

## Option 2: Install via Winget (Windows Package Manager)

If you have Windows 10/11 with winget:

```powershell
winget install --id Git.Git -e --source winget
```

Then close and reopen PowerShell.

---

## Option 3: Install via Chocolatey

If you have Chocolatey installed:

```powershell
choco install git
```

---

## After Installation

1. **Close and reopen** your terminal/PowerShell
2. **Configure Git** (optional but recommended):
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

3. **Verify it works:**
   ```bash
   git --version
   ```

---

## Next Steps

Once Git is installed:
1. ✅ Close and reopen your terminal
2. ✅ Go back to `GIT_SETUP.md` guide
3. ✅ Continue with Step 3: Initialize Git

---

## Troubleshooting

### "Git is not recognized" after installation
- **Close and reopen** your terminal/PowerShell
- Make sure you selected "Git from the command line" during installation
- Restart your computer if needed

### Still not working?
- Check if Git is in your PATH:
  - Search "Environment Variables" in Windows
  - Check if `C:\Program Files\Git\cmd` is in PATH
  - If not, add it manually

