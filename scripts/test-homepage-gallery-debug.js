#!/usr/bin/env node

/**
 * Script pour tester la galerie sur la page d'accueil avec debug
 */

const { execSync } = require('child_process')

console.log('🔍 Test de la galerie sur la page d\'accueil...\n')

// 1. Vérifier si le serveur de développement est en cours d'exécution
console.log('🌐 Test de connexion au serveur de développement...')
try {
  const response = execSync('curl -s -o /dev/null -w "%{http_code}" http://localhost:3000', { 
    encoding: 'utf8',
    timeout: 5000 
  }).trim()
  
  if (response === '200') {
    console.log('✅ Serveur de développement accessible sur http://localhost:3000')
  } else {
    console.log(`❌ Serveur répond avec le code: ${response}`)
    console.log('💡 Lancez: npm run dev')
    process.exit(1)
  }
} catch (error) {
  console.log('❌ Serveur de développement non accessible')
  console.log('💡 Lancez: npm run dev')
  process.exit(1)
}

// 2. Instructions pour tester manuellement
console.log('\n📋 Instructions pour tester la galerie:')
console.log('1. Ouvrez http://localhost:3000 dans votre navigateur')
console.log('2. Ouvrez les DevTools (F12)')
console.log('3. Allez dans l\'onglet Console')
console.log('4. Recherchez les messages de debug:')
console.log('   - 🎯 FormationsGallery component mounted')
console.log('   - 🔄 Tentative de chargement depuis Strapi...')
console.log('   - ✅ Données statiques chargées')
console.log('   - 🎠 FormationsCarousel rendu')
console.log('5. Faites défiler jusqu\'à la section "Nos Formations BTP d\'Excellence"')
console.log('6. Vérifiez que la galerie apparaît après le texte descriptif')

console.log('\n🔍 Éléments à vérifier:')
console.log('- La galerie doit apparaître avec 3 catégories (Alternance, Reconversion, VAE)')
console.log('- Chaque catégorie doit avoir un carousel avec des formations')
console.log('- Les carousels doivent s\'animer automatiquement toutes les 4 secondes')
console.log('- Les boutons de navigation doivent fonctionner')
console.log('- Cliquer sur une formation doit naviguer vers sa page')

console.log('\n🐛 Si la galerie n\'apparaît pas:')
console.log('1. Vérifiez les erreurs JavaScript dans la console')
console.log('2. Vérifiez que les messages de debug apparaissent')
console.log('3. Vérifiez que les données statiques sont chargées')
console.log('4. Inspectez l\'élément pour voir si le HTML est généré')

console.log('\n🚀 Prêt pour le test!')
console.log('📱 Ouvrez: http://localhost:3000')