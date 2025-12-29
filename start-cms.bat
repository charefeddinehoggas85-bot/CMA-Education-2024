@echo off
echo 🚀 Installation et configuration du CMS CMA Education

REM Installation des dépendances
echo 📦 Installation des dépendances...
cd cms-cma
call npm install

REM Démarrage en mode développement
echo 🎯 Démarrage du CMS en mode développement...
echo 📍 URL d'administration : http://localhost:1337/admin
echo 📍 API : http://localhost:1337/api
echo.
echo ⚠️  Créez votre compte administrateur lors du premier accès
echo.

call npm run develop