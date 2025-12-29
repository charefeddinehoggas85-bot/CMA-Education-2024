#!/usr/bin/env node

const { spawn } = require('child_process');

console.log('═══════════════════════════════════════════════════════════');
console.log('🚀 Configuration Complète du Blog avec Anciens Articles');
console.log('═══════════════════════════════════════════════════════════\n');

const scripts = [
  {
    name: 'Création des Content Types',
    script: 'scripts/setup-blog-strapi.js',
    description: 'Crée les content types Catégorie Blog et Article Blog'
  },
  {
    name: 'Import des Anciens Articles',
    script: 'scripts/import-old-blog-articles.js',
    description: 'Importe les 9 anciens articles du blog'
  },
  {
    name: 'Configuration des Permissions',
    script: 'scripts/configure-blog-permissions.js',
    description: 'Configure l\'accès public aux articles'
  },
  {
    name: 'Téléchargement des Images',
    script: 'scripts/upload-blog-images-strapi.js',
    description: 'Télécharge les images des articles'
  }
];

let currentIndex = 0;

function runNextScript() {
  if (currentIndex >= scripts.length) {
    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('✅ Configuration Complète Terminée!');
    console.log('═══════════════════════════════════════════════════════════\n');
    console.log('📋 Prochaines étapes:');
    console.log('1. Accédez à http://localhost:3000/blog');
    console.log('2. Vérifiez que les 9 articles s\'affichent');
    console.log('3. Testez la recherche et les filtres');
    console.log('4. Cliquez sur un article pour voir la page détail\n');
    console.log('🎉 Votre blog est maintenant prêt!\n');
    process.exit(0);
  }

  const script = scripts[currentIndex];
  console.log(`\n${'─'.repeat(60)}`);
  console.log(`📝 Étape ${currentIndex + 1}/${scripts.length}: ${script.name}`);
  console.log(`${script.description}`);
  console.log(`${'─'.repeat(60)}\n`);

  const child = spawn('node', [script.script], {
    stdio: 'inherit',
    shell: true
  });

  child.on('close', (code) => {
    if (code === 0) {
      console.log(`\n✅ ${script.name} terminé avec succès\n`);
      currentIndex++;
      setTimeout(runNextScript, 1000);
    } else {
      console.error(`\n❌ ${script.name} a échoué avec le code ${code}\n`);
      process.exit(1);
    }
  });

  child.on('error', (error) => {
    console.error(`\n❌ Erreur lors de l'exécution de ${script.name}:`, error.message);
    process.exit(1);
  });
}

runNextScript();
