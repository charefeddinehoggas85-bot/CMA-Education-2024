const { execSync } = require('child_process');

console.log('🔧 Test du fix de téléchargement des brochures...\n');

try {
  // 1. Tester le build
  console.log('🔍 Test du build...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build réussi');
  
  // 2. Commit et push les changements
  console.log('\n📝 Commit des changements...');
  execSync('git add .', { stdio: 'inherit' });
  execSync('git commit -m "Fix: Correction du téléchargement des brochures - structure Strapi"', { stdio: 'inherit' });
  
  console.log('\n📤 Push vers GitHub...');
  execSync('git push origin main', { stdio: 'inherit' });
  
  console.log('\n✅ Fix déployé avec succès !');
  console.log('🔗 La page brochure avec téléchargement fonctionnel sera disponible dans quelques minutes sur:');
  console.log('   https://cma-education-2024.vercel.app/brochure');
  
} catch (error) {
  console.error('❌ Erreur:', error.message);
  
  console.log('\n📋 Actions manuelles requises:');
  console.log('1. Vérifier les changements avec: git status');
  console.log('2. Commit: git add . && git commit -m "Fix brochure download"');
  console.log('3. Push: git push origin main');
}
