#!/usr/bin/env node

/**
 * Script pour tester le rendu de la galerie des formations
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

console.log('🔍 Test du rendu de la galerie des formations...\n')

// 1. Vérifier que les composants existent
const componentsToCheck = [
  'src/components/sections/FormationsGallery.tsx',
  'src/components/ui/FormationsCarousel.tsx',
  'src/components/sections/FormationsSection.tsx',
  'src/data/formations-static.ts'
]

console.log('📁 Vérification des fichiers composants:')
componentsToCheck.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`)
  } else {
    console.log(`❌ ${file} - MANQUANT`)
  }
})

// 2. Vérifier que FormationsGallery est importée dans FormationsSection
console.log('\n🔗 Vérification de l\'intégration:')
try {
  const formationsSectionContent = fs.readFileSync('src/components/sections/FormationsSection.tsx', 'utf8')
  
  if (formationsSectionContent.includes('FormationsGallery')) {
    console.log('✅ FormationsGallery est importée dans FormationsSection')
  } else {
    console.log('❌ FormationsGallery n\'est PAS importée dans FormationsSection')
  }
  
  if (formationsSectionContent.includes('<FormationsGallery')) {
    console.log('✅ FormationsGallery est utilisée dans le JSX')
  } else {
    console.log('❌ FormationsGallery n\'est PAS utilisée dans le JSX')
  }
} catch (error) {
  console.log('❌ Erreur lors de la lecture de FormationsSection:', error.message)
}

// 3. Vérifier que LazyFormationsSection charge bien FormationsSection
console.log('\n🔄 Vérification du lazy loading:')
try {
  const lazyContent = fs.readFileSync('src/components/sections/LazyFormationsSection.tsx', 'utf8')
  
  if (lazyContent.includes('./FormationsSection')) {
    console.log('✅ LazyFormationsSection importe FormationsSection')
  } else {
    console.log('❌ LazyFormationsSection n\'importe PAS FormationsSection')
  }
} catch (error) {
  console.log('❌ Erreur lors de la lecture de LazyFormationsSection:', error.message)
}

// 4. Vérifier que la page d'accueil utilise LazyFormationsSection
console.log('\n🏠 Vérification de la page d\'accueil:')
try {
  const homeContent = fs.readFileSync('src/app/page.tsx', 'utf8')
  
  if (homeContent.includes('LazyFormationsSection')) {
    console.log('✅ La page d\'accueil utilise LazyFormationsSection')
  } else {
    console.log('❌ La page d\'accueil n\'utilise PAS LazyFormationsSection')
  }
} catch (error) {
  console.log('❌ Erreur lors de la lecture de page.tsx:', error.message)
}

// 5. Vérifier les données statiques
console.log('\n📊 Vérification des données statiques:')
try {
  const staticDataContent = fs.readFileSync('src/data/formations-static.ts', 'utf8')
  
  if (staticDataContent.includes('formationsAlternance')) {
    console.log('✅ formationsAlternance est définie')
  } else {
    console.log('❌ formationsAlternance n\'est PAS définie')
  }
  
  if (staticDataContent.includes('formationsReconversion')) {
    console.log('✅ formationsReconversion est définie')
  } else {
    console.log('❌ formationsReconversion n\'est PAS définie')
  }
  
  if (staticDataContent.includes('vaeFormules')) {
    console.log('✅ vaeFormules est définie')
  } else {
    console.log('❌ vaeFormules n\'est PAS définie')
  }
} catch (error) {
  console.log('❌ Erreur lors de la lecture des données statiques:', error.message)
}

// 6. Tester la compilation TypeScript
console.log('\n🔧 Test de compilation TypeScript:')
try {
  execSync('npx tsc --noEmit --skipLibCheck', { stdio: 'pipe' })
  console.log('✅ Compilation TypeScript réussie')
} catch (error) {
  console.log('❌ Erreurs de compilation TypeScript:')
  console.log(error.stdout?.toString() || error.message)
}

console.log('\n📋 Résumé du diagnostic:')
console.log('- Vérifiez que tous les composants sont présents')
console.log('- Vérifiez que FormationsGallery est bien intégrée dans FormationsSection')
console.log('- Vérifiez que les données statiques sont correctement définies')
console.log('- Si tout semble correct, le problème peut venir du rendu côté client')

console.log('\n🚀 Pour tester le rendu, lancez: npm run dev')
console.log('📱 Puis ouvrez: http://localhost:3000')
console.log('🔍 Ouvrez les DevTools et regardez la console pour les erreurs')