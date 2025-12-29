#!/usr/bin/env node

/**
 * Script pour préparer le projet pour l'upload GitHub
 * Optimise la taille et organise les fichiers
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🧹 Préparation pour upload GitHub');
console.log('=================================\n');

// Nettoyer les fichiers volumineux
function cleanLargeFiles() {
  console.log('🗑️  Nettoyage des fichiers volumineux...');
  
  const filesToRemove = [
    '.next',
    'node_modules',
    'cms-cma/node_modules',
    'cms-cma/build',
    'cms-cma/.tmp',
    'build-output.log',
    'lighthouse-report.html',
    'tsconfig.tsbuildinfo'
  ];
  
  filesToRemove.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`   🗑️  Suppression: ${file}`);
      try {
        if (fs.statSync(file).isDirectory()) {
          execSync(`rmdir /s /q "${file}"`, { stdio: 'pipe' });
        } else {
          fs.unlinkSync(file);
        }
      } catch (error) {
        console.log(`   ⚠️  Impossible de supprimer ${file}`);
      }
    }
  });
  
  console.log('   ✅ Nettoyage terminé\n');
}

// Créer un package.json optimisé
function optimizePackageJson() {
  console.log('📦 Optimisation du package.json...');
  
  const packagePath = 'package.json';
  const package = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  // Ajouter des scripts utiles
  package.scripts = {
    ...package.scripts,
    "postinstall": "echo '✅ Installation terminée'",
    "prebuild": "echo '🔧 Préparation du build...'",
    "predev": "echo '🚀 Démarrage en mode développement...'"
  };
  
  // Ajouter des métadonnées
  package.repository = {
    "type": "git",
    "url": "https://github.com/charefeddinehoggas85-bot/CMA2026.git"
  };
  
  package.homepage = "https://cma-education.vercel.app";
  package.author = "CMA Education";
  package.description = "Site web moderne pour CMA Education - Formations BTP";
  
  fs.writeFileSync(packagePath, JSON.stringify(package, null, 2));
  console.log('   ✅ package.json optimisé\n');
}

// Créer un fichier de statistiques
function createProjectStats() {
  console.log('📊 Création des statistiques du projet...');
  
  const stats = {
    "projet": "CMA Education",
    "version": "1.0.0",
    "dateCreation": new Date().toISOString().split('T')[0],
    "technologies": {
      "frontend": "Next.js 14 + TypeScript",
      "cms": "Strapi 4.25",
      "styling": "Tailwind CSS",
      "database": "PostgreSQL (prod) / SQLite (dev)"
    },
    "fonctionnalites": [
      "Site web responsive",
      "CMS Strapi intégré",
      "Système de brochures par email",
      "Blog avec articles",
      "Galerie de formations",
      "Panel d'administration"
    ],
    "deploiement": {
      "frontend": "Vercel",
      "cms": "Heroku/Railway",
      "domaine": "cma-education.vercel.app"
    },
    "structure": {
      "src/": "Code source frontend",
      "cms-cma/": "CMS Strapi",
      "scripts/": "Scripts d'automatisation",
      "public/": "Assets statiques"
    }
  };
  
  fs.writeFileSync('PROJECT_STATS.json', JSON.stringify(stats, null, 2));
  console.log('   ✅ Statistiques créées\n');
}

// Vérifier la structure du projet
function verifyProjectStructure() {
  console.log('🔍 Vérification de la structure...');
  
  const requiredFiles = [
    'package.json',
    'next.config.js',
    'tailwind.config.ts',
    'tsconfig.json',
    'README.md',
    'src/app/page.tsx',
    'cms-cma/package.json'
  ];
  
  const requiredDirs = [
    'src',
    'src/app',
    'src/components',
    'src/lib',
    'cms-cma',
    'scripts',
    'public'
  ];
  
  let allGood = true;
  
  requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`   ✅ ${file}`);
    } else {
      console.log(`   ❌ ${file} manquant`);
      allGood = false;
    }
  });
  
  requiredDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      console.log(`   ✅ ${dir}/`);
    } else {
      console.log(`   ❌ ${dir}/ manquant`);
      allGood = false;
    }
  });
  
  if (allGood) {
    console.log('   🎉 Structure du projet validée\n');
  } else {
    console.log('   ⚠️  Certains fichiers sont manquants\n');
  }
  
  return allGood;
}

// Créer un guide de démarrage rapide
function createQuickStart() {
  console.log('📝 Création du guide de démarrage...');
  
  const quickStart = `# 🚀 Démarrage Rapide - CMA Education

## Installation
\`\`\`bash
npm install
\`\`\`

## Développement
\`\`\`bash
# Frontend
npm run dev

# CMS Strapi (nouveau terminal)
cd cms-cma
npm install
npm run develop
\`\`\`

## URLs de développement
- Frontend: http://localhost:3000
- Admin Strapi: http://localhost:1337/admin

## Déploiement
\`\`\`bash
npm run deploy
\`\`\`

## Documentation
- [Guide complet](GUIDE_DEPLOYMENT_COMPLET.md)
- [Upload GitHub](UPLOAD_GITHUB_MANUEL.md)
`;

  fs.writeFileSync('QUICK_START.md', quickStart);
  console.log('   ✅ Guide de démarrage créé\n');
}

// Afficher les instructions finales
function showFinalInstructions() {
  console.log('🎉 Préparation terminée !');
  console.log('========================\n');
  
  console.log('📋 Étapes suivantes pour l\'upload:');
  console.log('');
  console.log('1. 🖥️  Utiliser GitHub Desktop (Recommandé):');
  console.log('   - Télécharger GitHub Desktop');
  console.log('   - Cloner votre repository');
  console.log('   - Copier tous les fichiers');
  console.log('   - Commit et Push');
  console.log('');
  console.log('2. 🌐 Ou créer un nouveau repository:');
  console.log('   - Aller sur github.com');
  console.log('   - New repository');
  console.log('   - Upload via interface web');
  console.log('');
  console.log('3. 🚀 Déployer sur Vercel:');
  console.log('   - Connecter le repository GitHub');
  console.log('   - Déploiement automatique');
  console.log('');
  console.log('📚 Documentation disponible:');
  console.log('   - README.md');
  console.log('   - QUICK_START.md');
  console.log('   - UPLOAD_GITHUB_MANUEL.md');
  console.log('   - PROJECT_STATS.json');
  console.log('');
}

// Exécution principale
function main() {
  try {
    cleanLargeFiles();
    optimizePackageJson();
    createProjectStats();
    const structureOk = verifyProjectStructure();
    createQuickStart();
    showFinalInstructions();
    
    if (structureOk) {
      console.log('✅ Projet prêt pour l\'upload !');
    } else {
      console.log('⚠️  Vérifiez les fichiers manquants avant l\'upload');
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

main();