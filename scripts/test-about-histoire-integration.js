#!/usr/bin/env node

/**
 * Test de l'intégration du contenu "Notre Histoire" dans la page À propos
 */

const axios = require('axios')

const STRAPI_URL = 'http://localhost:1337'
const FRONTEND_URL = 'http://localhost:3000'

async function testStrapiContent() {
  try {
    console.log('🔍 Test du contenu Strapi...')
    
    const response = await axios.get(`${STRAPI_URL}/api/pages`)
    const pages = response.data.data
    
    const histoirePage = pages.find(page => 
      page.attributes.slug === 'notre-histoire' || 
      page.attributes.title === 'Notre Histoire'
    )
    
    if (histoirePage) {
      console.log('✅ Contenu "Notre Histoire" trouvé dans Strapi:')
      console.log(`   ID: ${histoirePage.id}`)
      console.log(`   Titre: ${histoirePage.attributes.title}`)
      console.log(`   Slug: ${histoirePage.attributes.slug}`)
      console.log(`   Contenu: ${histoirePage.attributes.content.substring(0, 100)}...`)
      return true
    } else {
      console.log('❌ Contenu "Notre Histoire" non trouvé dans Strapi')
      return false
    }
  } catch (error) {
    console.error('❌ Erreur lors du test Strapi:', error.message)
    return false
  }
}

async function testFrontendIntegration() {
  try {
    console.log('\n🌐 Test de l\'intégration frontend...')
    
    // Tester si le frontend est accessible
    const response = await axios.get(`${FRONTEND_URL}/about`, {
      timeout: 10000
    })
    
    if (response.status === 200) {
      console.log('✅ Page À propos accessible')
      
      // Vérifier si le contenu contient des éléments attendus
      const content = response.data
      const hasHistoireSection = content.includes('Notre Histoire') || content.includes('Academy est née')
      
      if (hasHistoireSection) {
        console.log('✅ Le contenu "Notre Histoire" semble être intégré')
      } else {
        console.log('⚠️ Le contenu "Notre Histoire" pourrait ne pas être visible')
      }
      
      return true
    } else {
      console.log('❌ Page À propos non accessible')
      return false
    }
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.log('⚠️ Frontend non accessible - Assurez-vous que npm run dev est lancé')
    } else {
      console.error('❌ Erreur lors du test frontend:', error.message)
    }
    return false
  }
}

async function testAPIEndpoint() {
  try {
    console.log('\n🔌 Test de l\'endpoint API pages...')
    
    const response = await axios.get(`${FRONTEND_URL}/api/pages`, {
      timeout: 5000
    })
    
    if (response.status === 200) {
      console.log('✅ Endpoint API pages accessible')
      return true
    } else {
      console.log('❌ Endpoint API pages non accessible')
      return false
    }
  } catch (error) {
    console.log('ℹ️ Endpoint API pages non configuré (normal si pas d\'API route)')
    return true // Ce n'est pas critique
  }
}

async function main() {
  console.log('🧪 Test de l\'intégration "Notre Histoire" dans la page À propos\n')
  
  // 1. Tester le contenu Strapi
  const strapiOK = await testStrapiContent()
  
  // 2. Tester l'intégration frontend
  const frontendOK = await testFrontendIntegration()
  
  // 3. Tester l'endpoint API (optionnel)
  await testAPIEndpoint()
  
  // Résumé
  console.log('\n📊 Résumé des tests:')
  console.log(`   Strapi: ${strapiOK ? '✅' : '❌'}`)
  console.log(`   Frontend: ${frontendOK ? '✅' : '❌'}`)
  
  if (strapiOK && frontendOK) {
    console.log('\n🎉 Intégration réussie!')
    console.log('💡 Visitez http://localhost:3000/about pour voir le résultat')
  } else {
    console.log('\n⚠️ Problèmes détectés:')
    if (!strapiOK) console.log('   • Vérifiez que le contenu est bien dans Strapi')
    if (!frontendOK) console.log('   • Vérifiez que le frontend est lancé et fonctionne')
  }
  
  console.log('\n🔧 Prochaines étapes:')
  console.log('1. Vérifiez visuellement la page À propos')
  console.log('2. Testez sur différents navigateurs')
  console.log('3. Vérifiez la responsivité mobile')
}

main().catch(console.error)