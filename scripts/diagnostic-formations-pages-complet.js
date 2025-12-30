#!/usr/bin/env node

/**
 * DIAGNOSTIC COMPLET - PAGES FORMATIONS NON AFFICHÉES
 * 
 * Ce script diagnostique pourquoi les pages de formations ne s'affichent pas
 * en testant tous les points critiques identifiés.
 */

const https = require('https')
const http = require('http')

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

async function testStrapiAPI() {
  log('\n🔍 TEST 1: CONNEXION STRAPI API', 'blue')
  log('=' .repeat(50), 'blue')
  
  try {
    // Test de base
    const healthCheck = await makeRequest(`${STRAPI_URL}/api/formations?pagination[limit]=1`)
    
    if (healthCheck.status === 200) {
      log('✅ Strapi API accessible', 'green')
      log(`   Formations trouvées: ${healthCheck.data.data?.length || 0}`, 'green')
      log(`   Total: ${healthCheck.data.meta?.pagination?.total || 'N/A'}`, 'green')
    } else if (healthCheck.status === 403) {
      log('❌ ERREUR 403 FORBIDDEN - Problème de permissions !', 'red')
      log('   → Les permissions Public ne sont pas configurées', 'red')
      return false
    } else {
      log(`❌ Erreur HTTP ${healthCheck.status}`, 'red')
      return false
    }
    
    return true
  } catch (error) {
    log(`❌ Erreur de connexion: ${error.message}`, 'red')
    return false
  }
}

async function testFormationsData() {
  log('\n📊 TEST 2: DONNÉES FORMATIONS', 'blue')
  log('=' .repeat(50), 'blue')
  
  try {
    // Test formations avec populate
    const formations = await makeRequest(`${STRAPI_URL}/api/formations?populate=*`)
    
    if (formations.status !== 200) {
      log(`❌ Erreur ${formations.status} lors de la récupération des formations`, 'red')
      return false
    }
    
    const formationsData = formations.data.data || []
    log(`✅ ${formationsData.length} formations récupérées`, 'green')
    
    // Analyse des formations
    let formationsWithCategory = 0
    let formationsWithImage = 0
    let formationsPublished = 0
    
    formationsData.forEach((formation, index) => {
      const attrs = formation.attributes
      const isPublished = attrs.publishedAt !== null
      const hasCategory = attrs.category?.data !== null
      const hasImage = attrs.image?.data !== null
      
      if (isPublished) formationsPublished++
      if (hasCategory) formationsWithCategory++
      if (hasImage) formationsWithImage++
      
      log(`   Formation ${index + 1}: "${attrs.title}"`, 'yellow')
      log(`     - Slug: ${attrs.slug}`, 'yellow')
      log(`     - Publié: ${isPublished ? '✅' : '❌'}`, isPublished ? 'green' : 'red')
      log(`     - Catégorie: ${hasCategory ? '✅' : '❌'} ${hasCategory ? `(${attrs.category.data.attributes.slug})` : ''}`, hasCategory ? 'green' : 'red')
      log(`     - Image: ${hasImage ? '✅' : '❌'}`, hasImage ? 'green' : 'red')
    })
    
    log(`\n📈 RÉSUMÉ:`, 'bold')
    log(`   Formations publiées: ${formationsPublished}/${formationsData.length}`, formationsPublished === formationsData.length ? 'green' : 'yellow')
    log(`   Avec catégorie: ${formationsWithCategory}/${formationsData.length}`, formationsWithCategory === formationsData.length ? 'green' : 'yellow')
    log(`   Avec image: ${formationsWithImage}/${formationsData.length}`, formationsWithImage === formationsData.length ? 'green' : 'yellow')
    
    return formationsData.length > 0
  } catch (error) {
    log(`❌ Erreur: ${error.message}`, 'red')
    return false
  }
}

async function testCategories() {
  log('\n🏷️ TEST 3: CATÉGORIES FORMATIONS', 'blue')
  log('=' .repeat(50), 'blue')
  
  try {
    const categories = await makeRequest(`${STRAPI_URL}/api/formation-categories?populate=*`)
    
    if (categories.status !== 200) {
      log(`❌ Erreur ${categories.status} lors de la récupération des catégories`, 'red')
      return false
    }
    
    const categoriesData = categories.data.data || []
    log(`✅ ${categoriesData.length} catégories récupérées`, 'green')
    
    const expectedSlugs = ['alternance', 'reconversion', 'vae', 'entreprise']
    const foundSlugs = []
    
    categoriesData.forEach((category, index) => {
      const attrs = category.attributes
      const formationsCount = attrs.formations?.data?.length || 0
      
      foundSlugs.push(attrs.slug)
      
      log(`   Catégorie ${index + 1}: "${attrs.name}"`, 'yellow')
      log(`     - Slug: ${attrs.slug}`, 'yellow')
      log(`     - Formations: ${formationsCount}`, formationsCount > 0 ? 'green' : 'red')
      log(`     - Publié: ${attrs.publishedAt ? '✅' : '❌'}`, attrs.publishedAt ? 'green' : 'red')
    })
    
    log(`\n🎯 VÉRIFICATION SLUGS ATTENDUS:`, 'bold')
    expectedSlugs.forEach(slug => {
      const found = foundSlugs.includes(slug)
      log(`   ${slug}: ${found ? '✅' : '❌'}`, found ? 'green' : 'red')
    })
    
    return categoriesData.length > 0
  } catch (error) {
    log(`❌ Erreur: ${error.message}`, 'red')
    return false
  }
}

async function testFrontendPages() {
  log('\n🌐 TEST 4: PAGES FRONTEND', 'blue')
  log('=' .repeat(50), 'blue')
  
  const pagesToTest = [
    '/formations',
    '/formations/charge-affaires-batiment',
    '/formations/conducteur-travaux-batiment'
  ]
  
  for (const page of pagesToTest) {
    try {
      const response = await makeRequest(`${FRONTEND_URL}${page}`)
      
      if (response.status === 200) {
        log(`✅ ${page} - Accessible`, 'green')
        
        // Vérifier si c'est du HTML
        if (response.raw && typeof response.data === 'string') {
          const hasFormations = response.data.includes('formation') || response.data.includes('Formation')
          const hasError = response.data.includes('error') || response.data.includes('Error')
          
          log(`   - Contenu formations: ${hasFormations ? '✅' : '❌'}`, hasFormations ? 'green' : 'red')
          log(`   - Erreurs détectées: ${hasError ? '❌' : '✅'}`, hasError ? 'red' : 'green')
        }
      } else {
        log(`❌ ${page} - Erreur ${response.status}`, 'red')
      }
    } catch (error) {
      log(`❌ ${page} - Erreur: ${error.message}`, 'red')
    }
  }
}

async function testSpecificFormation() {
  log('\n🎯 TEST 5: FORMATION SPÉCIFIQUE', 'blue')
  log('=' .repeat(50), 'blue')
  
  try {
    // Test d'une formation spécifique
    const slug = 'charge-affaires-batiment'
    const formation = await makeRequest(`${STRAPI_URL}/api/formations?filters[slug][$eq]=${slug}&populate=*`)
    
    if (formation.status !== 200) {
      log(`❌ Erreur ${formation.status} pour la formation ${slug}`, 'red')
      return false
    }
    
    const formationData = formation.data.data?.[0]
    
    if (!formationData) {
      log(`❌ Formation "${slug}" non trouvée`, 'red')
      return false
    }
    
    const attrs = formationData.attributes
    log(`✅ Formation "${attrs.title}" trouvée`, 'green')
    log(`   - Slug: ${attrs.slug}`, 'green')
    log(`   - Description: ${attrs.shortDesc ? '✅' : '❌'}`, attrs.shortDesc ? 'green' : 'red')
    log(`   - Catégorie: ${attrs.category?.data ? '✅' : '❌'}`, attrs.category?.data ? 'green' : 'red')
    log(`   - Image: ${attrs.image?.data ? '✅' : '❌'}`, attrs.image?.data ? 'green' : 'red')
    log(`   - Publié: ${attrs.publishedAt ? '✅' : '❌'}`, attrs.publishedAt ? 'green' : 'red')
    
    if (attrs.category?.data) {
      log(`   - Catégorie slug: ${attrs.category.data.attributes.slug}`, 'yellow')
    }
    
    return true
  } catch (error) {
    log(`❌ Erreur: ${error.message}`, 'red')
    return false
  }
}

async function runDiagnostic() {
  log('🚀 DIAGNOSTIC COMPLET - PAGES FORMATIONS', 'bold')
  log('=' .repeat(60), 'bold')
  log(`Frontend: ${FRONTEND_URL}`, 'blue')
  log(`Backend: ${STRAPI_URL}`, 'blue')
  
  const results = {
    strapiAPI: false,
    formationsData: false,
    categories: false,
    frontendPages: false,
    specificFormation: false
  }
  
  // Exécution des tests
  results.strapiAPI = await testStrapiAPI()
  
  if (results.strapiAPI) {
    results.formationsData = await testFormationsData()
    results.categories = await testCategories()
    results.specificFormation = await testSpecificFormation()
  }
  
  await testFrontendPages()
  
  // Résumé final
  log('\n📋 RÉSUMÉ DIAGNOSTIC', 'bold')
  log('=' .repeat(50), 'bold')
  
  const tests = [
    { name: 'Connexion Strapi API', status: results.strapiAPI },
    { name: 'Données formations', status: results.formationsData },
    { name: 'Catégories', status: results.categories },
    { name: 'Formation spécifique', status: results.specificFormation }
  ]
  
  tests.forEach(test => {
    log(`${test.status ? '✅' : '❌'} ${test.name}`, test.status ? 'green' : 'red')
  })
  
  // Recommandations
  log('\n🎯 RECOMMANDATIONS', 'bold')
  log('=' .repeat(50), 'bold')
  
  if (!results.strapiAPI) {
    log('❌ CRITIQUE: Configurer les permissions Strapi', 'red')
    log('   → Aller dans Strapi Admin > Settings > Users & Permissions > Roles > Public', 'yellow')
    log('   → Activer find et findOne pour Formation et Formation-category', 'yellow')
  }
  
  if (!results.categories) {
    log('❌ IMPORTANT: Vérifier les catégories', 'red')
    log('   → Créer les catégories avec les bons slugs: alternance, reconversion, vae, entreprise', 'yellow')
  }
  
  if (!results.formationsData) {
    log('❌ IMPORTANT: Vérifier les formations', 'red')
    log('   → Publier les formations', 'yellow')
    log('   → Assigner une catégorie à chaque formation', 'yellow')
  }
  
  log('\n✨ Diagnostic terminé !', 'green')
}

// Exécution
runDiagnostic().catch(console.error)