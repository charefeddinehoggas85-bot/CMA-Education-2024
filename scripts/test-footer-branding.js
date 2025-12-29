#!/usr/bin/env node

/**
 * Test script pour vérifier que le Footer ne contient plus de références CMA
 */

const fs = require('fs')
const path = require('path')

console.log('🔍 Test du Footer - Vérification du rebranding...\n')

// Lire le contenu du Footer
const footerPath = path.join(__dirname, '..', 'src/components/layout/Footer.tsx')
const footerContent = fs.readFileSync(footerPath, 'utf8')

// Tests à effectuer
const tests = [
  {
    name: '❌ Aucune référence "CMA Education"',
    pattern: /CMA Education/g,
    shouldFind: false
  },
  {
    name: '❌ Aucune référence "CMA" seule',
    pattern: /\bCMA\b/g,
    shouldFind: false
  },
  {
    name: '✅ "Construction Management Academy" présent',
    pattern: /Construction Management Academy/g,
    shouldFind: true
  },
  {
    name: '✅ Nouveau domaine email présent',
    pattern: /construction-management-academy\.fr/g,
    shouldFind: true
  },
  {
    name: '❌ Ancien domaine email supprimé',
    pattern: /cma-education\.com/g,
    shouldFind: false
  }
]

let allTestsPassed = true

console.log('📄 Tests du Footer:')
tests.forEach(test => {
  const matches = footerContent.match(test.pattern)
  const hasMatches = matches && matches.length > 0
  
  if (test.shouldFind && hasMatches) {
    console.log(`  ✅ ${test.name} (${matches.length} occurrence(s))`)
  } else if (!test.shouldFind && !hasMatches) {
    console.log(`  ✅ ${test.name}`)
  } else if (test.shouldFind && !hasMatches) {
    console.log(`  ❌ ${test.name} - MANQUANT`)
    allTestsPassed = false
  } else if (!test.shouldFind && hasMatches) {
    console.log(`  ❌ ${test.name} - TROUVÉ: ${matches.slice(0, 3).join(', ')}`)
    allTestsPassed = false
  }
})

// Test spécifique pour le bouton CTA
if (footerContent.includes('Rejoignez Construction Management Academy')) {
  console.log('  ✅ Bouton CTA mis à jour')
} else if (footerContent.includes('Rejoignez CMA')) {
  console.log('  ❌ Bouton CTA contient encore "CMA"')
  allTestsPassed = false
} else {
  console.log('  ✅ Bouton CTA mis à jour (autre formulation)')
}

console.log('\n📊 Résultat:')
if (allTestsPassed) {
  console.log('🎉 Tous les tests passent ! Le Footer est correctement mis à jour.')
  console.log('✨ Le problème "CMA en bas de la page contact" devrait être résolu.')
} else {
  console.log('⚠️  Certains tests échouent. Vérifiez les erreurs ci-dessus.')
}

console.log('\n✨ Test terminé !')