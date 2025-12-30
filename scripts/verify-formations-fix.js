#!/usr/bin/env node

/**
 * VÉRIFICATION POST-CORRECTION - PAGES FORMATIONS
 * 
 * Ce script vérifie que la correction des catégories a bien fonctionné
 * et que les formations s'affichent maintenant correctement.
 */

const https = require('https')

// Configuration
const STRAPI_URL = 'https://cma-education-strapi-production.up.railway.app'
const FRONTEND_URL = 'https://cma-education-2024.vercel.app'

// Couleurs pour les logs
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

// Helper pour faire des requêtes HTTP
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http
    
    client.get(url, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data)
          resolve({ status: res.statusCode, data: parsed })
        } catch (e) {
          resolve({ status: res.statusCode, data: data, raw: true })
        }
      })
    }).on('error', (err) => {
      reject(err)
    })
  })
}

async function verifyFormationsWithCategories() {
  log('🔍 VÉRIFICATION POST-CORRECTION', 'bold')
  log('=' .repeat(50), 'bold')
  
  try {
    const response = await makeRequest(`${STRAPI_URL}/api/formations?populate=category`)
    
    if (response.status !== 200) {
      log(`❌ Erreur ${response.status}`, 'red')
      return false
    }
    
    const formations = response.data.data || []
    let formationsWithCategory = 0
    let categoriesCount = {
      alternance: 0,
      reconversion: 0,
      vae: 0,
      entreprise: 0
    }
    
    log(`📊 Analyse de ${formations.length} formations:`, 'blue')
    log('', 'reset')
    
    formations.forEach((formation, index) => {
      const attrs = formation.attributes
      const hasCategory = attrs.category?.data !== null
      const categorySlug = attrs.category?.data?.attributes?.slug
      
      if (hasCategory) {
        formationsWithCategory++
        if (categoriesCount.hasOwnProperty(categorySlug)) {
          categoriesCount[categorySlug]++
        }
      }
      
      const status = hasCategory ? '✅' : '❌'
      const categoryInfo = hasCategory ? `(${categorySlug})` : '(AUCUNE)'
      
      log(`${status} ${attrs.title}`, hasCategory ? 'green' : 'red')
      log(`   └─ Catégorie: ${categoryInfo}`, 'yellow')
    })
    
    log('', 'reset')
    log('📈 RÉSUMÉ:', 'bold')
    log(`   Formations avec catégorie: ${formationsWithCategory}/${formations.length}`, formationsWithCategory === formations.length ? 'green' : 'red')
    log('', 'reset')
    log('📋 RÉPARTITION PAR CATÉGORIE:', 'bold')
    Object.entries(categoriesCount).forEach(([category, count]) => {
      log(`   ${category}: ${count} formations`, count > 0 ? 'green' : 'yellow')
    })
    
    const isFixed = formationsWithCategory === formations.length
    
    if (isFixed) {
      log('', 'reset')
      log('🎉 CORRECTION RÉUSSIE !', 'green')
      log('Toutes les formations ont maintenant une catégorie assignée.', 'green')
    } else {
      log('', 'reset')
      log('⚠️ CORRECTION INCOMPLÈTE', 'yellow')
      log(`${formations.length - formationsWithCategory} formations n'ont toujours pas de catégorie.`, 'yellow')
    }
    
    return isFixed
  } catch (error) {
    log(`❌ Erreur: ${error.message}`, 'red')
    return false
  }
}

async function testFrontendDisplay() {
  log('\n🌐 TEST AFFICHAGE FRONTEND', 'blue')
  log('=' .repeat(40), 'blue')
  
  try {
    const response = await makeRequest(`${FRONTEND_URL}/formations`)
    
    if (response.status === 200 && response.raw) {
      const content = response.data.toString()
      
      // Vérifier la présence de formations
      const hasFormationContent = content.includes('formation') || content.includes('Formation')
      const hasAlternanceSection = content.includes('alternance') || content.includes('Alternance')
      const hasReconversionSection = content.includes('reconversion') || content.includes('Reconversion')
      
      log(`✅ Page /formations accessible`, 'green')
      log(`   Contenu formations: ${hasFormationContent ? '✅' : '❌'}`, hasFormationContent ? 'green' : 'red')
      log(`   Section alternance: ${hasAlternanceSection ? '✅' : '❌'}`, hasAlternanceSection ? 'green' : 'red')
      log(`   Section reconversion: ${hasReconversionSection ? '✅' : '❌'}`, hasReconversionSection ? 'green' : 'red')
      
      return hasFormationContent && hasAlternanceSection && hasReconversionSection
    } else {
      log(`❌ Erreur ${response.status}`, 'red')
      return false
    }
  } catch (error) {
    log(`❌ Erreur: ${error.message}`, 'red')
    return false
  }
}

async function testSpecificFormationPages() {
  log('\n🎯 TEST PAGES FORMATIONS SPÉCIFIQUES', 'blue')
  log('=' .repeat(45), 'blue')
  
  const testPages = [
    '/formations/charge-affaires-batiment',
    '/formations/conducteur-travaux-batiment',
    '/formations/charge-affaires-reconversion'
  ]
  
  let successCount = 0
  
  for (const page of testPages) {
    try {
      const response = await makeRequest(`${FRONTEND_URL}${page}`)
      
      if (response.status === 200) {
        log(`✅ ${page}`, 'green')
        successCount++
      } else {
        log(`❌ ${page} - Erreur ${response.status}`, 'red')
      }
    } catch (error) {
      log(`❌ ${page} - ${error.message}`, 'red')
    }
  }
  
  log(`\n📊 Pages testées: ${successCount}/${testPages.length}`, successCount === testPages.length ? 'green' : 'yellow')
  return successCount === testPages.length
}

async function runVerification() {
  log('🚀 VÉRIFICATION COMPLÈTE - CORRECTION FORMATIONS', 'bold')
  log('=' .repeat(60), 'bold')
  
  const results = {
    categoriesAssigned: false,
    frontendDisplay: false,
    specificPages: false
  }
  
  // Test 1: Vérifier que les formations ont des catégories
  results.categoriesAssigned = await verifyFormationsWithCategories()
  
  // Test 2: Vérifier l'affichage frontend
  results.frontendDisplay = await testFrontendDisplay()
  
  // Test 3: Vérifier les pages spécifiques
  results.specificPages = await testSpecificFormationPages()
  
  // Résumé final
  log('\n📋 RÉSUMÉ FINAL', 'bold')
  log('=' .repeat(30), 'bold')
  
  const tests = [
    { name: 'Catégories assignées', status: results.categoriesAssigned },
    { name: 'Affichage frontend', status: results.frontendDisplay },
    { name: 'Pages spécifiques', status: results.specificPages }
  ]
  
  tests.forEach(test => {
    log(`${test.status ? '✅' : '❌'} ${test.name}`, test.status ? 'green' : 'red')
  })
  
  const allGood = Object.values(results).every(result => result === true)
  
  if (allGood) {
    log('\n🎉 TOUTES LES VÉRIFICATIONS PASSÉES !', 'green')
    log('Les pages de formations s\'affichent maintenant correctement.', 'green')
    log('\n🔗 Liens à tester:', 'blue')
    log(`   • Page formations: ${FRONTEND_URL}/formations`, 'yellow')
    log(`   • Formation exemple: ${FRONTEND_URL}/formations/charge-affaires-batiment`, 'yellow')
  } else {
    log('\n⚠️ CERTAINES VÉRIFICATIONS ONT ÉCHOUÉ', 'yellow')
    log('Vérifiez les étapes de correction dans Strapi Admin.', 'yellow')
  }
  
  log('\n✨ Vérification terminée !', 'blue')
}

// Exécution
runVerification().catch(console.error)