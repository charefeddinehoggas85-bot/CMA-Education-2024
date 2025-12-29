#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🚀 Déploiement CMA Education sur Vercel...\n');

try {
  // Vérifier si Vercel CLI est installé
  try {
    execSync('vercel --version', { stdio: 'ignore' });
  } catch (error) {
    console.log('📦 Installation de Vercel CLI...');
    execSync('npm install -g vercel', { stdio: 'inherit' });
  }

  // Build du projet
  console.log('🔨 Build du projet...');
  execSync('npm run build', { stdio: 'inherit' });

  // Déploiement
  console.log('🌐 Déploiement sur Vercel...');
  execSync('vercel --prod', { stdio: 'inherit' });

  console.log('\n✅ Déploiement terminé avec succès !');
  console.log('🌍 Votre site est maintenant en ligne sur Vercel');

} catch (error) {
  console.error('\n❌ Erreur lors du déploiement:', error.message);
  process.exit(1);
}