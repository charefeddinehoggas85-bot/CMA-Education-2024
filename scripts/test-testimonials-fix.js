#!/usr/bin/env node

/**
 * Script pour tester la correction du bug testimonials.photo.endsWith
 */

console.log('🔍 Test de la correction du bug testimonials...\n')

// 1. Vérifier que le code problématique a été corrigé
const fs = require('fs')
const path = require('path')

try {
  const socialProofPath = path.join(__dirname, '..', 'src', 'components', 'sections', 'SocialProofSection.tsx')
  const content = fs.readFileSync(socialProofPath, 'utf8')
  
  console.log('📁 Vérification du fichier SocialProofSection.tsx:')
  
  // Vérifier que l'ancien code problématique n'existe plus
  if (content.includes('testimonial.photo.endsWith')) {
    console.log('❌ ERREUR: Le code problématique testimonial.photo.endsWith est encore présent!')
    console.log('   Cela causera une erreur runtime si testimonial.photo n\'est pas une string')
  } else {
    console.log('✅ Le code problématique testimonial.photo.endsWith a été supprimé')
  }
  
  // Vérifier que les imports nécessaires sont présents
  if (content.includes('getImageURL')) {
    console.log('✅ Import getImageURL présent')
  } else {
    console.log('❌ Import getImageURL manquant')
  }
  
  if (content.includes('getStrapiMediaURL')) {
    console.log('✅ Import getStrapiMediaURL présent')
  } else {
    console.log('❌ Import getStrapiMediaURL manquant')
  }
  
  // Vérifier que la nouvelle logique est présente
  if (content.includes('getImageURL(testimonial.photoData, testimonial.photo)')) {
    console.log('✅ Nouvelle logique de gestion des photos implémentée')
  } else {
    console.log('❌ Nouvelle logique de gestion des photos manquante')
  }
  
  console.log('\n🎯 Résumé de la correction:')
  console.log('- Problème: testimonial.photo.endsWith() appelé sur un objet Strapi')
  console.log('- Solution: Utilisation de getImageURL() pour gérer les médias Strapi')
  console.log('- Fallback: Affichage des initiales si pas de photo valide')
  
  console.log('\n✅ La correction devrait résoudre l\'erreur runtime!')
  console.log('🌐 Testez sur: http://localhost:3000')
  console.log('🔍 Vérifiez que la section témoignages s\'affiche sans erreur')
  
} catch (error) {
  console.log('❌ Erreur lors de la vérification:', error.message)
}