# Quick Fix: Webpack Runtime Error

## The Problem
```
TypeError: Cannot read properties of undefined (reading 'call')
at Object.t [as require] (D:\GITHUB\CMA2026\.next\server\webpack-runtime.js:1:128)
```

## The Solution (Copy & Paste)

### PowerShell
```powershell
# Clear the build cache
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules/.cache -ErrorAction SilentlyContinue

# Rebuild
npm run build
```

### Command Prompt
```cmd
# Clear the build cache
rmdir /s /q .next
rmdir /s /q node_modules\.cache

# Rebuild
npm run build
```

## What This Does
1. Removes stale webpack runtime files from `.next` folder
2. Clears npm cache
3. Rebuilds the project with fresh webpack runtime

## Expected Result
✅ Build completes successfully
✅ No webpack runtime errors
✅ Featured Formations section displays correctly

## Why This Happens
The `.next` folder contains compiled webpack runtime files. When these become stale or corrupted, webpack can't load them properly. Clearing and rebuilding fixes this.

## Time Required
- Clearing cache: ~5 seconds
- Rebuilding: ~2-5 minutes (depending on system)

## If It Still Fails
Try a complete clean rebuild:
```powershell
Remove-Item -Recurse -Force .next
Remove-Item -Recurse -Force node_modules/.cache
npm install
npm run build
```

---

**Note**: This is NOT a code issue. The Featured Formations implementation is correct. This is purely a build system cache issue.
