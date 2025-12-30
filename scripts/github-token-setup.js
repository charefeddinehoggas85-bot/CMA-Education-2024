#!/usr/bin/env node

/**
 * Guide pour configurer un token d'accès personnel GitHub
 */

console.log(`
🔐 Configuration Token d'Accès Personnel GitHub

📋 Étapes pour créer un token:

1️⃣ Aller sur GitHub.com
   - Se connecter à votre compte
   - Cliquer sur votre avatar (en haut à droite)
   - Settings

2️⃣ Créer le token
   - Dans le menu de gauche: "Developer settings"
   - "Personal access tokens" → "Tokens (classic)"
   - "Generate new token" → "Generate new token (classic)"

3️⃣ Configuration du token
   - Note: "CMA Education Deploy"
   - Expiration: 90 days (ou plus)
   - Scopes à cocher:
     ✅ repo (Full control of private repositories)
     ✅ workflow (Update GitHub Action workflows)

4️⃣ Générer et copier
   - Cliquer "Generate token"
   - ⚠️ COPIER LE TOKEN IMMÉDIATEMENT (il ne sera plus visible)

5️⃣ Configurer Git localement
   Exécuter ces commandes:

   git config --global user.name "Votre Nom"
   git config --global user.email "votre-email@example.com"
   
   # Puis pour pousser:
   git remote set-url origin https://VOTRE-TOKEN@github.com/charefeddinehoggas85-bot/CMA-Education-2024.git
   git push origin main

📋 Alternative plus simple: GitHub Desktop
   - Télécharger GitHub Desktop
   - Se connecter avec votre compte
   - Cloner le repository
   - Copier vos fichiers
   - Commit et push via l'interface

🎯 Recommandation: Utilisez GitHub Desktop pour plus de simplicité !
`)

module.exports = {}