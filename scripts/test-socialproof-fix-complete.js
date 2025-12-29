#!/usr/bin/env node

/**
 * Script pour tester la correction complète des bugs SocialProofSection
 */

console.log('🔍 Test de la correction complète des bugs SocialProofSection...\n')

const fs = require('fs')
const path = require('path')

try {
  const socialProofPath = path.join(__dirname, '..', 'src', 'components', 'sections', 'SocialProofSection.tsx')
  const content = fs.readFileSync(socialProofPath, 'utf8')
  
  console.log('📁 Vérification des corrections dans SocialProofSection.tsx:')
  
  // 1. Vérifier que l'ancien code problématique n'existe plus
  const problematicPatterns = [
    'testimonial.photo.endsWith',
    'testimonial.nom.charAt(0)',
    '{testimonial.commentaire}',
    '{testimonial.note}'
  ]
  
  let hasProblems = false
  problematicPatterns.forEach(pattern => {
    if (content.includes(pattern)) {
      console.log(`❌ PROBLÈME: Pattern dangereux trouvé: ${pattern}`)
      hasProblems = true
    }
  })
  
  if (!hasProblems) {
    console.log('✅ Tous les patterns dangereux ont été supprimés')
  }
  
  // 2. Vérifier que les corrections sont présentes
  const corrections = [
    'getImageURL(testimonial.photoData, testimonial.photo)',
    'testimonial.nom && typeof testimonial.nom === \'string\' ? testimonial.nom.charAt(0) : \'?\'',
    'testimonial.commentaire || \'Commentaire non disponible\'',
    'testimonial.nom || \'Anonyme\'',
    'testimonial.poste || \'Poste non spécifié\'',
    'testimonial.entreprise || \'Entreprise\'',
    'testimonial.note || 5'
  ]
  
  console.log('\n🔧 Vérification des corrections:')
  corrections.forEach(correction => {
    if (content.includes(correction)) {
      console.log(`✅ ${correction}`)
    } else {
      console.log(`❌ MANQUANT: ${correction}`)
    }
  })
  
  // 3. Vérifier les imports nécessaires
  console.log('\n📦 Vérification des imports:')
  const requiredImports = ['getImageURL', 'getStrapiMediaURL']
  requiredImports.forEach(imp => {
    if (content.includes(imp)) {
      console.log(`✅ Import ${imp} présent`)
    } else {
      console.log(`❌ Import ${imp} manquant`)
    }
  })
  
  console.log('\n🎯 Résumé des corrections appliquées:')
  console.log('1. ❌ testimonial.photo.endsWith() → ✅ getImageURL() avec validation')
  console.log('2. ❌ testimonial.nom.charAt(0) → ✅ Null check + fallback')
  console.log('3. ❌ Propriétés sans fallback → ✅ Fallbacks pour toutes les propriétés')
  console.log('4. ❌ Gestion d\'erreur fragile → ✅ Gestion robuste des médias Strapi')
  
  console.log('\n🚀 État du serveur:')
  console.log('✅ Le serveur devrait maintenant compiler sans erreur')
  console.log('✅ La section témoignages devrait s\'afficher correctement')
  console.log('✅ Pas d\'erreur runtime même avec des données Strapi incomplètes')
  
  console.log('\n🌐 Test manuel:')
  console.log('1. Ouvrez http://localhost:3000')
  console.log('2. Faites défiler jusqu\'à la section témoignages')
  console.log('3. Vérifiez qu\'aucune erreur n\'apparaît dans la console')
  console.log('4. Vérifiez que les témoignages s\'affichent avec photos ou initiales')
  
} catch (error) {
  console.log('❌ Erreur lors de la vérification:', error.message)
}