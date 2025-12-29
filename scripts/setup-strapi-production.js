#!/usr/bin/env node

/**
 * Guide interactif pour déployer Strapi en production
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🎯 Configuration Strapi Production');
console.log('==================================\n');

// Vérifier la structure Strapi
function checkStrapiStructure() {
  console.log('📋 Vérification de la structure Strapi...');
  
  const strapiPath = path.join(process.cwd(), 'cms-cma');
  if (!fs.existsSync(strapiPath)) {
    console.error('❌ Dossier cms-cma non trouvé');
    process.exit(1);
  }
  
  const packagePath = path.join(strapiPath, 'package.json');
  if (!fs.existsSync(packagePath)) {
    console.error('❌ package.json Strapi non trouvé');
    process.exit(1);
  }
  
  console.log('✅ Structure Strapi validée\n');
}

// Préparer Strapi pour la production
function prepareStrapiForProduction() {
  console.log('🔧 Préparation de Strapi pour la production...');
  
  try {
    // Aller dans le dossier Strapi
    process.chdir('cms-cma');
    
    // Installer les dépendances
    console.log('   📦 Installation des dépendances...');
    execSync('npm install', { stdio: 'inherit' });
    
    // Build Strapi
    console.log('   🏗️  Build de Strapi...');
    execSync('npm run build', { stdio: 'inherit' });
    
    console.log('   ✅ Strapi prêt pour la production\n');
    
    // Retourner au dossier racine
    process.chdir('..');
    
  } catch (error) {
    console.error('❌ Erreur lors de la préparation:', error.message);
    process.exit(1);
  }
}

// Créer les fichiers de configuration pour différents hébergeurs
function createDeploymentConfigs() {
  console.log('📄 Création des fichiers de configuration...');
  
  // Configuration Heroku
  const herokuConfig = {
    name: "cms-cma-production",
    build: {
      docker: {
        web: "Dockerfile"
      }
    },
    addons: [
      "heroku-postgresql:mini"
    ]
  };
  
  // Dockerfile pour Heroku
  const dockerfile = `FROM node:18-alpine

WORKDIR /app

# Copier les fichiers de configuration
COPY cms-cma/package*.json ./
RUN npm ci --only=production

# Copier le code source
COPY cms-cma/ ./

# Build Strapi
RUN npm run build

EXPOSE 1337

CMD ["npm", "start"]`;

  // Railway configuration
  const railwayConfig = {
    build: {
      builder: "NIXPACKS"
    },
    deploy: {
      startCommand: "cd cms-cma && npm start",
      restartPolicyType: "ON_FAILURE",
      restartPolicyMaxRetries: 10
    }
  };

  // Créer les fichiers
  fs.writeFileSync('heroku.yml', JSON.stringify(herokuConfig, null, 2));
  fs.writeFileSync('Dockerfile', dockerfile);
  fs.writeFileSync('railway.json', JSON.stringify(railwayConfig, null, 2));
  
  console.log('   ✅ Fichiers de configuration créés\n');
}

// Instructions de déploiement
function showDeploymentInstructions() {
  console.log('🚀 Instructions de déploiement Strapi');
  console.log('====================================\n');
  
  console.log('🔥 OPTION 1: Heroku (Recommandé)');
  console.log('--------------------------------');
  console.log('1. Créer un compte sur heroku.com');
  console.log('2. Installer Heroku CLI');
  console.log('3. Exécuter les commandes:');
  console.log('   heroku login');
  console.log('   heroku create cms-cma-production');
  console.log('   heroku addons:create heroku-postgresql:mini');
  console.log('   git subtree push --prefix cms-cma heroku main');
  console.log('');
  
  console.log('🚄 OPTION 2: Railway');
  console.log('-------------------');
  console.log('1. Créer un compte sur railway.app');
  console.log('2. Connecter votre repository GitHub');
  console.log('3. Sélectionner le dossier cms-cma');
  console.log('4. Railway détecte automatiquement Strapi');
  console.log('');
  
  console.log('🌊 OPTION 3: DigitalOcean App Platform');
  console.log('-------------------------------------');
  console.log('1. Créer un compte sur digitalocean.com');
  console.log('2. Aller dans App Platform');
  console.log('3. Connecter votre repository');
  console.log('4. Configurer le build path: cms-cma/');
  console.log('');
  
  console.log('⚙️  Variables d\'environnement à configurer:');
  console.log('------------------------------------------');
  console.log('DATABASE_URL=postgresql://...');
  console.log('APP_KEYS=your-app-keys');
  console.log('API_TOKEN_SALT=your-api-token-salt');
  console.log('ADMIN_JWT_SECRET=your-admin-jwt-secret');
  console.log('TRANSFER_TOKEN_SALT=your-transfer-token-salt');
  console.log('JWT_SECRET=your-jwt-secret');
  console.log('');
}

// Configuration post-déploiement
function showPostDeploymentConfig() {
  console.log('🔧 Configuration post-déploiement');
  console.log('=================================\n');
  
  console.log('1. 🎯 Accéder au panel admin:');
  console.log('   https://votre-strapi-url.com/admin');
  console.log('   Créer votre compte administrateur');
  console.log('');
  
  console.log('2. 🔐 Configurer les permissions:');
  console.log('   Settings > Users & Permissions Plugin > Roles');
  console.log('   Autoriser "Public" pour les APIs nécessaires');
  console.log('');
  
  console.log('3. 🌐 Configurer CORS:');
  console.log('   Settings > Advanced Settings');
  console.log('   Ajouter votre domaine frontend dans CORS');
  console.log('');
  
  console.log('4. 📊 Importer les données:');
  console.log('   Utiliser les scripts d\'import dans scripts/');
  console.log('   Ou importer manuellement via le panel admin');
  console.log('');
  
  console.log('5. 🔗 Connecter au frontend:');
  console.log('   Mettre à jour NEXT_PUBLIC_STRAPI_URL dans Vercel');
  console.log('   Configurer STRAPI_API_TOKEN');
  console.log('');
}

// Exécution principale
function main() {
  try {
    checkStrapiStructure();
    prepareStrapiForProduction();
    createDeploymentConfigs();
    showDeploymentInstructions();
    showPostDeploymentConfig();
    
    console.log('🎉 Configuration Strapi terminée !');
    console.log('📚 Consultez GUIDE_DEPLOYMENT_COMPLET.md pour plus de détails');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
}

main();