#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Déploiement CMA Website sur Vercel...\n');

// Vérifier que le build fonctionne
console.log('📦 Build du projet...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build réussi\n');
} catch (error) {
  console.error('❌ Erreur lors du build');
  process.exit(1);
}

// Instructions pour le déploiement
console.log('📋 Votre projet Vercel:');
console.log('🔗 Dashboard: https://vercel.com/cmas-projects-f5059614');
console.log('\n📋 Pour déployer:');
console.log('1. Commitez vos changements: git add . && git commit -m "update"');
console.log('2. Pushez sur GitHub: git push origin main');
console.log('3. Vercel déploiera automatiquement!');
console.log('\n✨ Votre site sera mis à jour automatiquement!');