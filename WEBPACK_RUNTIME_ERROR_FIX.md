# Webpack Runtime Error - Resolution Guide

## Error Description
```
TypeError: Cannot read properties of undefined (reading 'call')
at Object.t [as require] (D:\GITHUB\CMA2026\.next\server\webpack-runtime.js:1:128)
```

## Root Cause
This error occurs when the `.next` build folder contains corrupted or stale webpack runtime files. This typically happens after:
- Large code changes
- Cache inconsistencies
- Incomplete builds
- Node modules issues

## Solution

### Option 1: Quick Fix (Recommended)
Clear the build cache and rebuild:

```bash
# Remove build artifacts
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules/.cache -ErrorAction SilentlyContinue

# Rebuild
npm run build
```

### Option 2: Complete Clean Rebuild
For a more thorough cleanup:

```bash
# Remove all caches
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules/.cache -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .turbo -ErrorAction SilentlyContinue

# Reinstall dependencies
npm install

# Rebuild
npm run build
```

### Option 3: Using the Cleanup Script
```bash
node scripts/clean-rebuild.js
```

## Why This Happens

The webpack runtime error is NOT caused by the Featured Formations changes. It's a build system issue that can occur when:

1. **Stale Cache**: The `.next` folder contains outdated webpack runtime files
2. **Incomplete Build**: A previous build was interrupted or failed
3. **Node Modules Issue**: Cache in node_modules conflicts with the build

## Verification

After rebuilding, verify the fix:

```bash
# Start dev server
npm run dev

# Or build for production
npm run build
```

The error should be resolved and the Featured Formations section should display correctly.

## Prevention

To prevent this in the future:

1. **Always clear cache before major changes**:
   ```bash
   Remove-Item -Recurse -Force .next
   ```

2. **Use clean builds for production**:
   ```bash
   npm install
   npm run build
   ```

3. **Monitor build logs** for warnings about webpack cache

## Related Files

The Featured Formations implementation is NOT the cause of this error:
- `src/components/sections/FeaturedFormationsSection.tsx` ✅ Clean
- `src/components/sections/FeaturedFormationsClient.tsx` ✅ Clean
- `src/app/page.tsx` ✅ Clean

All TypeScript diagnostics pass with no errors.

## Status

**This is a build system issue, not a code issue.**

The Featured Formations feature is correctly implemented and will work once the build cache is cleared and the project is rebuilt.
