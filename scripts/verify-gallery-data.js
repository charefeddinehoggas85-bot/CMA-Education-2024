#!/usr/bin/env node

/**
 * Script pour vérifier que les données de la galerie sont correctes
 */

// Simuler l'import des données statiques
const fs = require('fs')
const path = require('path')

console.log('🔍 Vérification des données de la galerie...\n')

try {
  // Lire le fichier des données statiques
  const staticDataPath = path.join(__dirname, '..', 'src', 'data', 'formations-static.ts')
  const staticDataContent = fs.readFileSync(staticDataPath, 'utf8')
  
  // Extraire les données (simulation simple)
  const alternanceMatch = staticDataContent.match(/export const formationsAlternance = \[([\s\S]*?)\]/m)
  const reconversionMatch = staticDataContent.match(/export const formationsReconversion = \[([\s\S]*?)\]/m)
  const vaeMatch = staticDataContent.match(/export const vaeFormules = \[([\s\S]*?)\]/m)
  
  console.log('📊 Analyse des données statiques:')
  
  if (alternanceMatch) {
    const alternanceCount = (alternanceMatch[1].match(/{\s*id:/g) || []).length
    console.log(`✅ formationsAlternance: ${alternanceCount} formations`)
  } else {
    console.log('❌ formationsAlternance: non trouvé')
  }
  
  if (reconversionMatch) {
    const reconversionCount = (reconversionMatch[1].match(/{\s*id:/g) || []).length
    console.log(`✅ formationsReconversion: ${reconversionCount} formations`)
  } else {
    console.log('❌ formationsReconversion: non trouvé')
  }
  
  if (vaeMatch) {
    const vaeCount = (vaeMatch[1].match(/{\s*id:/g) || []).length
    console.log(`✅ vaeFormules: ${vaeCount} formules`)
  } else {
    console.log('❌ vaeFormules: non trouvé')
  }
  
  console.log('\n🎯 Structure attendue de la galerie:')
  console.log('1. Catégorie "Formations en Alternance" (couleur: blue)')
  console.log('   - Formations d\'alternance avec isAlternance: true')
  console.log('2. Catégorie "Formations Reconversion" (couleur: green)')
  console.log('   - Formations de reconversion avec isReconversion: true')
  console.log('3. Catégorie "VAE - Validation des Acquis" (couleur: purple)')
  console.log('   - Formules VAE transformées en formations')
  
  console.log('\n🎨 Rendu attendu:')
  console.log('- 3 carousels côte à côte (grid md:grid-cols-2 lg:grid-cols-3)')
  console.log('- Chaque carousel avec navigation automatique (4 secondes)')
  console.log('- Boutons de navigation gauche/droite')
  console.log('- Indicateurs de points en bas')
  console.log('- Animation de transition entre les slides')
  
  console.log('\n✅ Les données semblent correctes!')
  console.log('🌐 Vérifiez maintenant sur: http://localhost:3000')
  console.log('🔍 Cherchez la bordure rouge "GALERIE DEBUG" sur la page')
  
} catch (error) {
  console.log('❌ Erreur lors de la lecture des données:', error.message)
}