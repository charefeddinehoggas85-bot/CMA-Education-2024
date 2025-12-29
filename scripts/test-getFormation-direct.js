#!/usr/bin/env node

/**
 * Test direct de la fonction getFormation
 */

const { getFormation } = require('../src/lib/strapi.ts')

async function testGetFormation() {
  console.log('🧪 Test de getFormation...\n')
  
  try {
    console.log('📡 Appel getFormation("conducteur-travaux-tp-alternance")...')
    const formation = await getFormation('conducteur-travaux-tp-alternance')
    
    if (formation) {
      console.log('✅ Formation récupérée via getFormation:')
      console.log(`   ID: ${formation.id}`)
      console.log(`   Titre: ${formation.title}`)
      console.log(`   Slug: ${formation.slug}`)
      console.log(`   RNCP: ${formation.rncp}`)
      console.log(`   ShortDesc: ${formation.shortDesc?.substring(0, 50)}...`)
      console.log(`   Objectifs: ${formation.objectifs ? 'Présents' : 'Absents'}`)
      console.log(`   Type objectifs: ${typeof formation.objectifs}`)
      
      if (formation.objectifs) {
        console.log(`   Objectifs détail:`, formation.objectifs)
      }
    } else {
      console.log('❌ getFormation a retourné null/undefined')
    }
    
  } catch (error) {
    console.error('❌ Erreur getFormation:', error.message)
    console.error('Stack:', error.stack)
  }
}

testGetFormation().catch(console.error)