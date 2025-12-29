#!/usr/bin/env node

/**
 * Script de déploiement automatique pour CMA Education
 * Déploie le frontend Next.js sur Vercel
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Déploiement CMA Education - Frontend');
console.log('=====================================\n');

// Vérifications préliminaires
function checkPrerequisites() {
  console.log('📋 Vérification des prérequis...');
  
  // Vérifier que le build fonctionne
  try {
    console.log('   ✓ Test du build...');
    execSync('npm run build', { stdio: 'pipe' });
    console.log('   ✅ Build réussi');
  } catch (error) {
    console.error('   ❌ Erreur de build:', error.message);
    process.exit(1);
  }
  
  // Vérifier les variables d'environnement
  const envFile = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envFile)) {
    console.log('   ✅ Fichier .env.local trouvé');
  } else {
    console.log('   ⚠️  Fichier .env.local non trouvé (optionnel)');
  }
  
  console.log('');
}

// Déploiement sur Vercel
function deployToVercel() {
  console.log('🌐 Déploiement sur Vercel...');
  
  try {
    // Vérifier si Vercel CLI est installé
    try {
      execSync('vercel --version', { stdio: 'pipe' });
    } catch {
      console.log('   📦 Installation de Vercel CLI...');
      execSync('npm install -g vercel', { stdio: 'inherit' });
    }
    
    console.log('   🚀 Déploiement en cours...');
    
    // Déploiement en production
    const result = execSync('vercel --prod --yes', { 
      stdio: 'pipe',
      encoding: 'utf8'
    });
    
    // Extraire l'URL de déploiement
    const lines = result.split('\n');
    const deploymentUrl = lines.find(line => line.includes('https://'));
    
    if (deploymentUrl) {
      console.log('   ✅ Déploiement réussi !');
      console.log(`   🌍 URL: ${deploymentUrl.trim()}`);
    } else {
      console.log('   ✅ Déploiement réussi !');
      console.log('   🌍 Vérifiez votre dashboard Vercel pour l\'URL');
    }
    
  } catch (error) {
    console.error('   ❌ Erreur de déploiement:', error.message);
    console.log('\n💡 Solutions possibles:');
    console.log('   1. Connectez-vous à Vercel: vercel login');
    console.log('   2. Vérifiez vos permissions sur le projet');
    console.log('   3. Déployez manuellement via le dashboard Vercel');
    process.exit(1);
  }
}

// Instructions post-déploiement
function showPostDeploymentInstructions() {
  console.log('\n📋 Étapes suivantes:');
  console.log('==================');
  console.log('');
  console.log('1. 🎯 Configurer Strapi (Panel Admin):');
  console.log('   - Choisir un hébergeur (Heroku, Railway, DigitalOcean)');
  console.log('   - Déployer le dossier cms-cma/');
  console.log('   - Configurer la base de données PostgreSQL');
  console.log('');
  console.log('2. 🔗 Connecter Frontend et Strapi:');
  console.log('   - Mettre à jour NEXT_PUBLIC_STRAPI_URL dans Vercel');
  console.log('   - Configurer CORS dans Strapi pour autoriser votre domaine');
  console.log('   - Tester les APIs');
  console.log('');
  console.log('3. 📧 Configuration Email:');
  console.log('   - Configurer EMAIL_USER et EMAIL_PASSWORD dans Vercel');
  console.log('   - Tester le système de brochures');
  console.log('');
  console.log('4. 🖼️  Upload des médias:');
  console.log('   - Configurer Cloudinary ou autre service de stockage');
  console.log('   - Uploader les images via le panel admin Strapi');
  console.log('');
  console.log('📚 Guides disponibles:');
  console.log('   - GUIDE_DEPLOYMENT_COMPLET.md');
  console.log('   - DEPLOYMENT.md');
  console.log('');
}

// Exécution principale
async function main() {
  try {
    checkPrerequisites();
    deployToVercel();
    showPostDeploymentInstructions();
    
    console.log('🎉 Déploiement terminé avec succès !');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
}

main();