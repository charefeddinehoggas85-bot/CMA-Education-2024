#!/bin/bash

echo "🚀 Installation et configuration du CMS CMA Education"

# Installation des dépendances
echo "📦 Installation des dépendances..."
cd cms-cma
npm install

# Génération des types
echo "🔧 Génération des types Strapi..."
npm run strapi generate

# Démarrage en mode développement
echo "🎯 Démarrage du CMS en mode développement..."
echo "📍 URL d'administration : http://localhost:1337/admin"
echo "📍 API : http://localhost:1337/api"

npm run develop