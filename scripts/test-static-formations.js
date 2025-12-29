#!/usr/bin/env node

/**
 * Test des formations statiques
 */

// Import des formations statiques
const fs = require('fs')
const path = require('path')

// Lire le fichier TypeScript et l'évaluer
const formationsPath = path.join(__dirname, '../src/data/formations-static.ts')
const content = fs.readFileSync(formationsPath, 'utf8')

// Extraire les données (méthode simple)
const alternanceMatch = content.match(/export const formationsAlternance = (\[[\s\S]*?\n\])/m)

if (alternanceMatch) {
  try {
    // Remplacer les exports et évaluer
    const dataStr = alternanceMatch[1]
    const formationsAlternance = eval(dataStr)
    
    console.log('📋 Formations alternance trouvées:')
    formationsAlternance.forEach(f => {
      console.log(`   ${f.id}: ${f.slug} - "${f.title}"`)
    })
    
    console.log('\n🔍 Recherche de "conducteur-travaux-tp-alternance":')
    const found = formationsAlternance.find(f => f.slug === 'conducteur-travaux-tp-alternance')
    
    if (found) {
      console.log('✅ Formation trouvée dans les données statiques:')
      console.log(`   ID: ${found.id}`)
      console.log(`   Titre: ${found.title}`)
      console.log(`   Slug: ${found.slug}`)
      console.log(`   RNCP: ${found.rncp}`)
    } else {
      console.log('❌ Formation NON trouvée dans les données statiques')
      console.log('📋 Slugs disponibles:')
      formationsAlternance.forEach(f => console.log(`   - ${f.slug}`))
    }
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'évaluation:', error.message)
  }
} else {
  console.log('❌ Impossible de trouver les données formationsAlternance')
}