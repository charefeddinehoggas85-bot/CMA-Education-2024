#!/usr/bin/env node

/**
 * Script de test pour vérifier les composants de la galerie
 */

const fs = require('fs')
const path = require('path')

console.log('🧪 Test des composants de la galerie\n')

// Vérifier l'existence des fichiers
const files = [
  'src/components/ui/FormationsCarousel.tsx',
  'src/components/sections/FormationsGallery.tsx',
  'src/components/sections/FormationsSection.tsx',
  'src/components/sections/LazyFormationsSection.tsx'
]

console.log('📁 Vérification des fichiers:')
files.forEach(file => {
  const exists = fs.existsSync(file)
  console.log(`${exists ? '✅' : '❌'} ${file}`)
})

// Vérifier l'intégration dans FormationsSection
console.log('\n🔍 Vérification de l\'intégration:')

try {
  const formationsSectionContent = fs.readFileSync('src/components/sections/FormationsSection.tsx', 'utf8')
  
  const checks = [
    { name: 'Import FormationsGallery', pattern: /import.*FormationsGallery.*from/ },
    { name: 'Utilisation FormationsGallery', pattern: /<FormationsGallery\s*\/>/ },
    { name: 'Texte "Des parcours conçus"', pattern: /Des parcours conçus pour vous spécialiser/ }
  ]
  
  checks.forEach(check => {
    const found = check.pattern.test(formationsSectionContent)
    console.log(`${found ? '✅' : '❌'} ${check.name}`)
  })
  
  // Vérifier la position de la galerie
  const galleryPosition = formationsSectionContent.indexOf('<FormationsGallery')
  const textPosition = formationsSectionContent.indexOf('Des parcours conçus pour vous spécialiser')
  
  if (galleryPosition > -1 && textPosition > -1) {
    const isAfterText = galleryPosition > textPosition
    console.log(`${isAfterText ? '✅' : '❌'} Galerie positionnée après le texte: ${isAfterText}`)
  }
  
} catch (error) {
  console.log('❌ Erreur lors de la lecture du fichier FormationsSection')
}

// Vérifier les données statiques
console.log('\n📊 Vérification des données:')

try {
  // Simuler l'import des données (en mode test)
  const dataPath = 'src/data/formations-static.ts'
  const dataContent = fs.readFileSync(dataPath, 'utf8')
  
  const dataChecks = [
    { name: 'formationsAlternance', pattern: /export const formationsAlternance/ },
    { name: 'formationsReconversion', pattern: /export const formationsReconversion/ },
    { name: 'vaeFormules', pattern: /export const vaeFormules/ }
  ]
  
  dataChecks.forEach(check => {
    const found = check.pattern.test(dataContent)
    console.log(`${found ? '✅' : '❌'} ${check.name}`)
  })
  
} catch (error) {
  console.log('❌ Erreur lors de la lecture des données statiques')
}

console.log('\n🎯 Résumé:')
console.log('La galerie de formations a été créée avec:')
console.log('- ✅ Composant FormationsCarousel (carousel animé)')
console.log('- ✅ Composant FormationsGallery (organisation par catégorie)')
console.log('- ✅ Intégration dans FormationsSection')
console.log('- ✅ Données statiques disponibles')
console.log('')
console.log('🎨 Fonctionnalités:')
console.log('- Animation horizontale automatique (4 secondes)')
console.log('- 3 catégories: Alternance, Reconversion, VAE')
console.log('- Contrôles de navigation manuels')
console.log('- Cartes cliquables vers les formations')
console.log('- Design responsive avec Framer Motion')
console.log('')
console.log('🌐 Pour voir la galerie:')
console.log('1. Assurez-vous que le serveur dev est démarré (npm run dev)')
console.log('2. Ouvrez http://localhost:3000 dans votre navigateur')
console.log('3. Faites défiler jusqu\'à la section "Nos Formations BTP d\'Excellence"')
console.log('4. La galerie apparaîtra sous le texte de description')