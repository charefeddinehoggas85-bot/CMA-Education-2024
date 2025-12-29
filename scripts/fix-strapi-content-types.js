/**
 * Script pour diagnostiquer et corriger les Content Types Strapi manquants
 */

const fs = require('fs');
const path = require('path');

const CMS_PATH = path.join(__dirname, '..', 'cms-cma');

console.log('🔧 Diagnostic et correction des Content Types Strapi\n');
console.log('=' .repeat(60));

// Vérifier les dossiers API existants
const apiPath = path.join(CMS_PATH, 'src', 'api');
const apis = fs.readdirSync(apiPath);

console.log('\n📁 APIs trouvées dans src/api:');
apis.forEach(api => {
  const schemaPath = path.join(apiPath, api, 'content-types', api, 'schema.json');
  const exists = fs.existsSync(schemaPath);
  console.log(`   ${exists ? '✅' : '❌'} ${api} ${exists ? '' : '(schema.json manquant)'}`);
});

// Vérifier les dossiers à nettoyer
console.log('\n🗑️  Dossiers de cache à nettoyer:');
const cacheDirs = [
  path.join(CMS_PATH, '.cache'),
  path.join(CMS_PATH, 'dist'),
  path.join(CMS_PATH, '.strapi', 'client'),
];

cacheDirs.forEach(dir => {
  const exists = fs.existsSync(dir);
  console.log(`   ${exists ? '📂' : '⬜'} ${path.relative(CMS_PATH, dir)} ${exists ? '(existe)' : '(n\'existe pas)'}`);
});

console.log('\n' + '=' .repeat(60));
console.log('\n📋 INSTRUCTIONS POUR CORRIGER LE PROBLÈME:\n');

console.log('1. Arrêtez Strapi (Ctrl+C dans le terminal Strapi)\n');

console.log('2. Nettoyez le cache en exécutant ces commandes:');
console.log('   cd cms-cma');
console.log('   rmdir /s /q .cache 2>nul');
console.log('   rmdir /s /q dist 2>nul');
console.log('   rmdir /s /q .strapi\\client 2>nul\n');

console.log('3. Reconstruisez Strapi:');
console.log('   npm run build\n');

console.log('4. Redémarrez Strapi:');
console.log('   npm run develop\n');

console.log('5. Configurez les permissions:');
console.log('   - Allez dans Settings → Roles → Public');
console.log('   - Trouvez "Modalite" et cochez "find" et "findOne"');
console.log('   - Trouvez "Site-settings" et cochez "find"');
console.log('   - Cliquez sur "Save"\n');

console.log('6. Testez les APIs:');
console.log('   node scripts/check-strapi-apis.js\n');

console.log('=' .repeat(60));
console.log('\n💡 ALTERNATIVE: Script de nettoyage automatique\n');
console.log('   Exécutez: node scripts/clean-strapi-cache.js');
