#!/usr/bin/env node

/**
 * Test de la fonction findStaticFormation
 */

const fs = require('fs')
const path = require('path')

// Simuler la fonction findStaticFormation
function testFindStaticFormation() {
  console.log('🧪 Test de findStaticFormation...\n')
  
  try {
    // Lire les données statiques
    const formationsPath = path.join(__dirname, '../src/data/formations-static.ts')
    const content = fs.readFileSync(formationsPath, 'utf8')
    
    // Extraire formationsAlternance
    const alternanceMatch = content.match(/export const formationsAlternance = (\[[\s\S]*?\n\])/m)
    
    if (alternanceMatch) {
      const dataStr = alternanceMatch[1]
      const formationsAlternance = eval(dataStr)
      
      console.log('📋 Formations alternance chargées:', formationsAlternance.length)
      
      // Test de recherche
      const slug = 'conducteur-travaux-tp-alternance'
      console.log(`🔍 Recherche du slug: "${slug}"`)
      
      console.log('\n📋 Tous les slugs disponibles:')
      formationsAlternance.forEach((f, index) => {
        console.log(`   ${index + 1}. "${f.slug}" (ID: ${f.id})`)
      })
      
      const found = formationsAlternance.find(f => f.slug === slug)
      
      if (found) {
        console.log('\n✅ Formation trouvée:')
        console.log(`   ID: ${found.id}`)
        console.log(`   Titre: ${found.title}`)
        console.log(`   Slug: ${found.slug}`)
        console.log(`   Objectifs: ${found.objectives?.length || 0} éléments`)
        console.log(`   Débouchés: ${found.opportunities?.length || 0} éléments`)
        
        // Simuler la conversion
        const converted = {
          id: found.id,
          title: found.title,
          slug: found.slug,
          level: found.level,
          rncp: found.rncp,
          shortDesc: found.shortDescription,
          fullDesc: found.shortDescription,
          duree: found.duration,
          rythme: found.rhythm,
          modalite: found.mode,
          cout: found.price,
          financement: found.price,
          objectifs: found.objectives,
          debouches: found.opportunities,
          prerequis: [],
          isActive: true,
          image: found.image
        }
        
        console.log('\n✅ Conversion réussie:')
        console.log(`   Objectifs convertis: ${converted.objectifs?.length || 0} éléments`)
        console.log(`   Débouchés convertis: ${converted.debouches?.length || 0} éléments`)
        
        return true
      } else {
        console.log('\n❌ Formation NON trouvée')
        return false
      }
    } else {
      console.log('❌ Impossible de parser les données')
      return false
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message)
    return false
  }
}

const success = testFindStaticFormation()
console.log(`\n🏁 Test ${success ? 'RÉUSSI' : 'ÉCHOUÉ'}`)
process.exit(success ? 0 : 1)