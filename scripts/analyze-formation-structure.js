#!/usr/bin/env node

/**
 * Script pour analyser la structure des formations existantes
 */

const axios = require('axios')

const STRAPI_URL = 'http://localhost:1337'

async function analyzeFormationStructure() {
  try {
    console.log('🔍 Analyse de la structure des formations existantes...\n')
    
    const response = await axios.get(`${STRAPI_URL}/api/formations`)
    const formations = response.data.data
    
    if (formations.length > 0) {
      const firstFormation = formations[0]
      console.log('📋 Structure de la première formation:')
      console.log(`   ID: ${firstFormation.id}`)
      console.log(`   Titre: ${firstFormation.attributes.title}`)
      console.log('\n📄 Champs disponibles:')
      
      const attributes = firstFormation.attributes
      Object.keys(attributes).forEach(key => {
        const value = attributes[key]
        const type = typeof value
        const hasValue = value !== null && value !== undefined && value !== ''
        
        console.log(`   • ${key}: ${type} ${hasValue ? '✅' : '❌'} ${hasValue && type === 'string' ? `(${value.length} chars)` : ''}`)
        
        if (key === 'shortDesc' || key === 'description') {
          console.log(`     Contenu: "${value?.substring(0, 100)}${value?.length > 100 ? '...' : ''}"`)
        }
      })
      
      console.log('\n🔍 Champs requis détectés:')
      const requiredFields = []
      Object.keys(attributes).forEach(key => {
        const value = attributes[key]
        if (value !== null && value !== undefined && value !== '') {
          requiredFields.push(key)
        }
      })
      
      console.log('   Champs avec valeurs:', requiredFields.join(', '))
      
      // Analyser plusieurs formations pour voir les patterns
      if (formations.length > 1) {
        console.log('\n📊 Analyse de toutes les formations:')
        formations.forEach((formation, index) => {
          console.log(`   ${index + 1}. ${formation.attributes.title}`)
          console.log(`      Slug: ${formation.attributes.slug}`)
          console.log(`      ShortDesc: ${formation.attributes.shortDesc ? '✅' : '❌'}`)
          console.log(`      Description: ${formation.attributes.description ? '✅' : '❌'}`)
          console.log('')
        })
      }
      
    } else {
      console.log('❌ Aucune formation trouvée')
    }
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'analyse:', error.message)
  }
}

async function main() {
  await analyzeFormationStructure()
}

main().catch(console.error)