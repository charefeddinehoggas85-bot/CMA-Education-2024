#!/usr/bin/env node

/**
 * Debug de la page formation
 */

const axios = require('axios')

async function debugFormationPage() {
  console.log('🔍 Debug de la page formation...\n')
  
  // 1. Tester Strapi directement
  try {
    console.log('1️⃣ Test Strapi direct...')
    const response = await axios.get('http://localhost:1337/api/formations?filters[slug][$eq]=conducteur-travaux-tp-alternance&populate=*')
    const formation = response.data.data[0]
    
    if (formation) {
      console.log('✅ Formation trouvée dans Strapi:')
      console.log(`   ID: ${formation.id}`)
      console.log(`   Titre: ${formation.attributes.title}`)
      console.log(`   Slug: ${formation.attributes.slug}`)
      console.log(`   ShortDesc: ${formation.attributes.shortDesc?.substring(0, 50)}...`)
      console.log(`   Objectifs: ${formation.attributes.objectifs ? 'Présents' : 'Absents'}`)
    } else {
      console.log('❌ Formation non trouvée dans Strapi')
    }
  } catch (error) {
    console.log('❌ Erreur Strapi:', error.message)
  }
  
  // 2. Tester la page avec plus de détails
  try {
    console.log('\n2️⃣ Test page frontend détaillé...')
    const response = await axios.get('http://localhost:3001/formations/conducteur-travaux-tp-alternance', {
      timeout: 30000
    })
    
    console.log(`✅ Status: ${response.status}`)
    console.log(`✅ Content-Length: ${response.data.length}`)
    
    // Chercher des indices dans le contenu
    const content = response.data
    const checks = {
      'Titre formation': content.includes('Conducteur de Travaux, Travaux Publics'),
      'RNCP': content.includes('RNCP38549'),
      'BAC+2': content.includes('BAC+2'),
      'Erreur JS': content.includes('Error') || content.includes('undefined'),
      'Formation non trouvée': content.includes('Formation non trouvée'),
      'Chargement': content.includes('Chargement'),
      'PageLayout': content.includes('PageLayout') || content.includes('max-w-7xl'),
      'Navigation': content.includes('Formations') && content.includes('Nos formateurs')
    }
    
    console.log('\n📋 Analyse du contenu:')
    Object.entries(checks).forEach(([check, found]) => {
      console.log(`   ${check}: ${found ? '✅' : '❌'}`)
    })
    
    // Extraire des parties du contenu pour debug
    if (content.includes('Formation non trouvée')) {
      console.log('\n⚠️ Message "Formation non trouvée" détecté')
    }
    
    if (content.includes('Chargement')) {
      console.log('\n⚠️ Page en état de chargement')
    }
    
    // Chercher le titre dans le HTML
    const titleMatch = content.match(/<title[^>]*>([^<]+)<\/title>/)
    if (titleMatch) {
      console.log(`\n📄 Titre de la page: "${titleMatch[1]}"`)
    }
    
    // Chercher les h1
    const h1Matches = content.match(/<h1[^>]*>([^<]+)<\/h1>/g)
    if (h1Matches) {
      console.log('\n📋 Titres H1 trouvés:')
      h1Matches.forEach((h1, index) => {
        const text = h1.replace(/<[^>]*>/g, '')
        console.log(`   ${index + 1}. "${text}"`)
      })
    }
    
  } catch (error) {
    console.log('❌ Erreur page:', error.message)
  }
}

debugFormationPage().catch(console.error)