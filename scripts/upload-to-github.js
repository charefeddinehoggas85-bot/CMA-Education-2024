#!/usr/bin/env node

/**
 * Script pour uploader le projet CMA Education sur GitHub
 * Repository: https://github.com/charefeddinehoggas85-bot/CMA2026.git
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('📤 Upload CMA Education vers GitHub');
console.log('==================================\n');

const GITHUB_REPO = 'https://github.com/charefeddinehoggas85-bot/CMA2026.git';
const GITHUB_TOKEN = 'VOTRE_TOKEN_GITHUB_ICI'; // Remplacez par votre token

// Vérifications préliminaires
function checkPrerequisites() {
  console.log('📋 Vérification des prérequis...');
  
  // Vérifier que Git est installé
  try {
    execSync('git --version', { stdio: 'pipe' });
    console.log('   ✅ Git installé');
  } catch (error) {
    console.error('   ❌ Git non installé. Installez Git d\'abord.');
    process.exit(1);
  }
  
  // Vérifier que le build fonctionne
  try {
    console.log('   🔧 Test du build...');
    execSync('npm run build', { stdio: 'pipe' });
    console.log('   ✅ Build réussi');
  } catch (error) {
    console.error('   ❌ Erreur de build. Corrigez les erreurs d\'abord.');
    process.exit(1);
  }
  
  console.log('');
}

// Nettoyer le projet avant upload
function cleanProject() {
  console.log('🧹 Nettoyage du projet...');
  
  try {
    // Supprimer les fichiers de build
    if (fs.existsSync('.next')) {
      console.log('   🗑️  Suppression du dossier .next');
      execSync('rmdir /s /q .next', { stdio: 'pipe' });
    }
    
    // Supprimer les logs
    const logFiles = [
      'build-output.log',
      'lighthouse-report.html',
      'npm-debug.log',
      'yarn-error.log'
    ];
    
    logFiles.forEach(file => {
      if (fs.existsSync(file)) {
        console.log(`   🗑️  Suppression de ${file}`);
        fs.unlinkSync(file);
      }
    });
    
    console.log('   ✅ Projet nettoyé');
  } catch (error) {
    console.log('   ⚠️  Erreur de nettoyage (non critique):', error.message);
  }
  
  console.log('');
}

// Créer un README principal
function createMainReadme() {
  console.log('📝 Création du README principal...');
  
  const readmeContent = `# 🏗️ CMA Education - Site Web Officiel

## 🎯 À Propos
Site web moderne pour CMA Education, spécialisé dans les formations BTP avec Next.js et Strapi CMS.

## 🚀 Démarrage Rapide

### Frontend (Next.js)
\`\`\`bash
npm install
npm run dev
\`\`\`

### CMS Strapi
\`\`\`bash
cd cms-cma
npm install
npm run develop
\`\`\`

## 📋 Fonctionnalités
- ✅ Site web responsive moderne
- ✅ CMS Strapi pour la gestion de contenu
- ✅ Système de brochures par email
- ✅ Blog intégré
- ✅ Galerie de formations
- ✅ Panel d'administration complet

## 🛠️ Technologies
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **CMS**: Strapi 4.25
- **Base de données**: PostgreSQL (production), SQLite (dev)
- **Déploiement**: Vercel (frontend), Heroku/Railway (Strapi)

## 📚 Documentation
- [Guide de Déploiement Complet](GUIDE_DEPLOYMENT_COMPLET.md)
- [Démarrage Rapide](DEMARRAGE_RAPIDE_DEPLOYMENT.md)
- [Configuration Strapi](GUIDE_VISUEL_CONFIGURATION_STRAPI.md)

## 🚀 Déploiement

### Déploiement automatique
\`\`\`bash
npm run deploy
\`\`\`

### Déploiement manuel
1. **Frontend sur Vercel**
   \`\`\`bash
   npm run build
   npm run deploy:frontend
   \`\`\`

2. **Strapi sur Heroku/Railway**
   \`\`\`bash
   npm run deploy:strapi
   \`\`\`

## 📧 Contact
- Email: contact.academy@cma-education.com
- Site: [CMA Education](https://cma-education.vercel.app)

## 📄 Licence
Projet privé - CMA Education © 2024
`;

  fs.writeFileSync('README.md', readmeContent);
  console.log('   ✅ README.md créé');
  console.log('');
}

// Initialiser Git et uploader
function uploadToGitHub() {
  console.log('📤 Upload vers GitHub...');
  
  try {
    // Vérifier si Git est déjà initialisé
    if (!fs.existsSync('.git')) {
      console.log('   🔧 Initialisation de Git...');
      execSync('git init', { stdio: 'pipe' });
    }
    
    // Configurer l'utilisateur Git (si nécessaire)
    try {
      execSync('git config user.name', { stdio: 'pipe' });
    } catch {
      console.log('   👤 Configuration utilisateur Git...');
      execSync('git config user.name "CMA Education"', { stdio: 'pipe' });
      execSync('git config user.email "contact.academy@cma-education.com"', { stdio: 'pipe' });
    }
    
    // Ajouter le remote origin (si pas déjà fait)
    try {
      execSync('git remote get-url origin', { stdio: 'pipe' });
      console.log('   ✅ Remote origin déjà configuré');
    } catch {
      console.log('   🔗 Ajout du remote origin...');
      execSync(`git remote add origin ${GITHUB_REPO}`, { stdio: 'pipe' });
    }
    
    // Ajouter tous les fichiers
    console.log('   📁 Ajout des fichiers...');
    execSync('git add .', { stdio: 'pipe' });
    
    // Commit
    const commitMessage = `🚀 Upload complet CMA Education - ${new Date().toISOString().split('T')[0]}`;
    console.log('   💾 Commit des changements...');
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'pipe' });
    
    // Push vers GitHub
    console.log('   ⬆️  Push vers GitHub...');
    
    // Utiliser le token pour l'authentification
    const repoWithToken = GITHUB_REPO.replace('https://', `https://${GITHUB_TOKEN}@`);
    
    // Vérifier la branche actuelle
    let currentBranch;
    try {
      currentBranch = execSync('git branch --show-current', { stdio: 'pipe', encoding: 'utf8' }).trim();
    } catch {
      currentBranch = 'master'; // Fallback
    }
    
    console.log(`   📍 Branche actuelle: ${currentBranch}`);
    
    try {
      // Push sur la branche actuelle
      execSync(`git push -u ${repoWithToken} ${currentBranch}`, { stdio: 'pipe' });
    } catch (error) {
      // Si ça échoue, essayer de forcer
      console.log('   🔄 Tentative de push forcé...');
      execSync(`git push -f ${repoWithToken} ${currentBranch}`, { stdio: 'pipe' });
    }
    
    console.log('   ✅ Upload réussi !');
    console.log(`   🌍 Repository: ${GITHUB_REPO}`);
    
  } catch (error) {
    console.error('   ❌ Erreur d\'upload:', error.message);
    console.log('\n💡 Solutions possibles:');
    console.log('   1. Vérifiez votre connexion internet');
    console.log('   2. Vérifiez les permissions du repository');
    console.log('   3. Vérifiez le token GitHub');
    process.exit(1);
  }
}

// Instructions post-upload
function showPostUploadInstructions() {
  console.log('\n🎉 Upload terminé avec succès !');
  console.log('===============================\n');
  
  console.log('📋 Étapes suivantes:');
  console.log('1. 🌐 Vérifier le repository sur GitHub');
  console.log(`   ${GITHUB_REPO}`);
  console.log('');
  console.log('2. 🚀 Déployer le frontend sur Vercel:');
  console.log('   - Aller sur vercel.com');
  console.log('   - Connecter le repository GitHub');
  console.log('   - Déployer automatiquement');
  console.log('');
  console.log('3. 🎯 Déployer Strapi:');
  console.log('   - Choisir Heroku, Railway ou DigitalOcean');
  console.log('   - Connecter le repository');
  console.log('   - Configurer les variables d\'environnement');
  console.log('');
  console.log('📚 Documentation disponible:');
  console.log('   - README.md');
  console.log('   - GUIDE_DEPLOYMENT_COMPLET.md');
  console.log('   - DEMARRAGE_RAPIDE_DEPLOYMENT.md');
  console.log('');
}

// Exécution principale
async function main() {
  try {
    checkPrerequisites();
    cleanProject();
    createMainReadme();
    uploadToGitHub();
    showPostUploadInstructions();
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
}

main();