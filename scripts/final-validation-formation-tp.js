#!/usr/bin/env node

/**
 * Validation finale de la formation Conducteur de Travaux TP
 */

const axios = require('axios')

const STRAPI_URL = 'http://localhost:1337'
const FRONTEND_URL = 'http://localhost:3001'
const FORMATION_SLUG = 'conducteur-travaux-tp-alternance'

async function validateFormationComplete() {
  console.log('🎯 Validation finale de la formation "Conducteur de Travaux, Travaux Publics"\n')
  
  let allGood = true
  
  // 1. Vérifier Strapi
  try {
    console.log('1️⃣ Vérification Strapi...')
    const response = await axios.get(`${STRAPI_URL}/api/formations?filters[slug][$eq]=${FORMATION_SLUG}&populate=*`)
    const formation = response.data.data[0]
    
    if (formation) {
      console.log('✅ Formation trouvée dans Strapi')
      console.log(`   Titre: ${formation.attributes.title}`)
      console.log(`   RNCP: ${formation.attributes.rncp}`)
      console.log(`   Catégorie: ${formation.attributes.category?.data?.attributes?.name}`)
      
      // Vérifier les champs essentiels
      const requiredFields = ['shortDesc', 'fullDesc', 'objectifs', 'debouches', 'prerequis']
      const missingFields = requiredFields.filter(field => !formation.attributes[field])
      
      if (missingFields.length === 0) {
        console.log('✅ Tous les champs requis sont présents')
      } else {
        console.log('❌ Champs manquants:', missingFields.join(', '))
        allGood = false
      }
    } else {
      console.log('❌ Formation non trouvée dans Strapi')
      allGood = false
    }
  } catch (error) {
    console.log('❌ Erreur Strapi:', error.message)
    allGood = false
  }
  
  // 2. Vérifier le dropdown
  try {
    console.log('\n2️⃣ Vérification dropdown...')
    const formationsResponse = await axios.get(`${STRAPI_URL}/api/formations?populate=category`)
    const formations = formationsResponse.data.data
    
    const alternanceFormations = formations.filter(f => 
      f.attributes.category?.data?.attributes?.slug === 'alternance'
    )
    
    const hasNewFormation = alternanceFormations.some(f => f.attributes.slug === FORMATION_SLUG)
    
    if (hasNewFormation) {
      console.log('✅ Formation présente dans le dropdown alternance')
      console.log(`   Total formations alternance: ${alternanceFormations.length}`)
    } else {
      console.log('❌ Formation absente du dropdown')
      allGood = false
    }
  } catch (error) {
    console.log('❌ Erreur dropdown:', error.message)
    allGood = false
  }
  
  // 3. Vérifier la page frontend
  try {
    console.log('\n3️⃣ Vérification page frontend...')
    const response = await axios.get(`${FRONTEND_URL}/formations/${FORMATION_SLUG}`, {
      timeout: 15000
    })
    
    if (response.status === 200) {
      console.log('✅ Page accessible (status 200)')
      
      const content = response.data
      const checks = {
        'Titre présent': content.includes('Conducteur de Travaux, Travaux Publics'),
        'RNCP présent': content.includes('RNCP38549'),
        'Niveau présent': content.includes('BAC+2'),
        'Durée présente': content.includes('1 an'),
        'Pas d\'erreur JS': !content.includes('Error') && !content.includes('undefined')
      }
      
      Object.entries(checks).forEach(([check, passed]) => {
        console.log(`   ${check}: ${passed ? '✅' : '❌'}`)
        if (!passed) allGood = false
      })
    } else {
      console.log('❌ Page non accessible (status:', response.status, ')')
      allGood = false
    }
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.log('⚠️ Frontend non accessible - Serveur de dev arrêté ?')
    } else {
      console.log('❌ Erreur frontend:', error.message)
    }
    allGood = false
  }
  
  // 4. Résumé final
  console.log('\n🏁 RÉSUMÉ FINAL')
  console.log('=' .repeat(50))
  
  if (allGood) {
    console.log('🎉 SUCCÈS COMPLET !')
    console.log('✅ La formation "Conducteur de Travaux, Travaux Publics" est parfaitement intégrée')
    console.log('\n📋 Ce qui fonctionne:')
    console.log('   • Formation créée dans Strapi avec tous les champs')
    console.log('   • Catégorisée correctement en "Alternance"')
    console.log('   • Visible dans le dropdown formations')
    console.log('   • Page dédiée accessible et fonctionnelle')
    console.log('   • Contenu modifiable via l\'admin Strapi')
    
    console.log('\n🔗 Liens utiles:')
    console.log(`   • Page formation: ${FRONTEND_URL}/formations/${FORMATION_SLUG}`)
    console.log(`   • Admin Strapi: ${STRAPI_URL}/admin/content-manager/collectionType/api::formation.formation`)
    console.log(`   • Dropdown test: ${FRONTEND_URL} (menu Formations > Alternance)`)
    
    console.log('\n💡 Prochaines étapes suggérées:')
    console.log('   1. Ajouter une image spécifique pour cette formation')
    console.log('   2. Enrichir le contenu via l\'admin Strapi')
    console.log('   3. Tester la brochure et les liens de candidature')
    console.log('   4. Vérifier le SEO et les métadonnées')
  } else {
    console.log('⚠️ PROBLÈMES DÉTECTÉS')
    console.log('🔧 Vérifiez les points en erreur ci-dessus')
    console.log('\n💡 Actions recommandées:')
    console.log('   1. Vérifiez que Strapi fonctionne (http://localhost:1337)')
    console.log('   2. Vérifiez que le frontend fonctionne (http://localhost:3001)')
    console.log('   3. Consultez les logs du serveur de développement')
    console.log('   4. Vérifiez la configuration des content types')
  }
  
  return allGood
}

// Exécuter la validation
validateFormationComplete()
  .then(success => {
    process.exit(success ? 0 : 1)
  })
  .catch(error => {
    console.error('💥 Erreur fatale:', error.message)
    process.exit(1)
  })