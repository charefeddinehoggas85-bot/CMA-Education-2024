@echo off
echo 🚀 Démarrage de Strapi CMA Education
echo ====================================

if not exist node_modules (
    echo 📦 Installation des dépendances...
    npm install
)

if not exist .env (
    echo ⚠️ Fichier .env manquant
    echo Copier .env.example vers .env et configurer les variables
    pause
    exit /b 1
)

echo 🎯 Démarrage de Strapi...
npm run develop
pause
