#!/bin/bash

echo "🚀 Démarrage de Strapi CMA Education"
echo "===================================="

# Vérifier si node_modules existe
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
fi

# Vérifier si .env existe
if [ ! -f ".env" ]; then
    echo "⚠️ Fichier .env manquant"
    echo "Copier .env.example vers .env et configurer les variables"
    exit 1
fi

# Démarrer Strapi
echo "🎯 Démarrage de Strapi..."
npm run develop
