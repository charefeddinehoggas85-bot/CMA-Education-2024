@echo off
echo ========================================
echo Nettoyage du cache Strapi
echo ========================================

cd /d "%~dp0\..\cms-cma"

echo.
echo Suppression de .cache...
if exist ".cache" rmdir /s /q ".cache"

echo Suppression de dist...
if exist "dist" rmdir /s /q "dist"

echo Suppression de .strapi\client...
if exist ".strapi\client" rmdir /s /q ".strapi\client"

echo.
echo ========================================
echo Cache nettoye!
echo ========================================
echo.
echo Maintenant executez:
echo   cd cms-cma
echo   npm run build
echo   npm run develop
echo.
pause
