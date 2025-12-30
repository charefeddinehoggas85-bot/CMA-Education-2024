#!/usr/bin/env node

/**
 * ANALYSE DE LA BASE DE DONNÉES VIA API PUBLIQUE
 * 
 * Ce script analyse la base de données via les APIs publiques
 * pour identifier les données existantes et planifier la migration.
 */

const https = require('https')

// Configuration
const STRAPI_URL = 'https://cma-education-strapi-production.up.railway.app'

// Couleurs pour les logs
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  cyan: '\x1b[36m'
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

// Helper pour faire des requêtes HTTP
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : require('http')
    
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

async function analyzePublicAPI() {
  log('🔍 ANALYSE VIA API PUBLIQUE', 'bold')
  log('=' .repeat(50), 'bold')
  log(`Base: ${STRAPI_URL}`, 'blue')
  
  // APIs publiques à tester
  const publicAPIs = [
    'formations',
    'formation-categories',
    'formateurs',
    'testimonials',
    'blog-articles',
    'partners',
    'pages',
    'modalites'
  ]
  
  const results = {}
  
  for (const api of publicAPIs) {
    try {
      log(`\n📊 Test: ${api}`, 'cyan')
      
      const response = await makeRequest(`${STRAPI_URL}/api/${api}`)
      
      if (response.status === 200) {
        const data = response.data.data || []
        results[api] = { count: data.length, data: data, success: true }
        log(`✅ ${api}: ${data.length} éléments`, 'green')
      } else if (response.status === 403) {
        results[api] = { count: 0, success: false, error: 'Permissions' }
        log(`🔒 ${api}: Permissions manquantes (403)`, 'yellow')
      } else if (response.status === 404) {
        results[api] = { count: 0, success: false, error: 'Not found' }
        log(`❌ ${api}: Collection non trouvée (404)`, 'red')
      } else {
        results[api] = { count: 0, success: false, error: response.status }
        log(`❌ ${api}: Erreur ${response.status}`, 'red')
      }
      
      // Pause pour éviter de surcharger l'API
      await new Promise(resolve => setTimeout(resolve, 300))
      
    } catch (error) {
      results[api] = { count: 0, success: false, error: error.message }
      log(`❌ ${api}: ${error.message}`, 'red')
    }
  }
  
  return results
}

async function analyzeFormationsDetailed() {
  log('\n🔍 ANALYSE DÉTAILLÉE DES FORMATIONS', 'bold')
  log('=' .repeat(50), 'bold')
  
  try {
    const response = await makeRequest(`${STRAPI_URL}/api/formations?populate=*`)
    
    if (response.status === 200) {
      const formations = response.data.data || []
      
      log(`📚 ${formations.length} formations trouvées`, 'green')
      
      if (formations.length === 0) {
        log('⚠️ Aucune formation dans la base de données', 'yellow')
        return
      }
      
      let stats = {
        withCategory: 0,
        withImage: 0,
        published: 0,
        withBrochure: 0,
        withRNCP: 0,
        withDescription: 0
      }
      
      formations.forEach((formation, index) => {
        const attrs = formation.attributes
        
        // Statistiques
        if (attrs.category?.data) stats.withCategory++
        if (attrs.image?.data) stats.withImage++
        if (attrs.publishedAt) stats.published++
        if (attrs.brochure?.data) stats.withBrochure++
        if (attrs.rncp) stats.withRNCP++
        if (attrs.shortDesc || attrs.fullDesc) stats.withDescription++
        
        // Affichage détaillé pour les 5 premières
        if (index < 5) {
          log(`\n   ${index + 1}. "${attrs.title}"`, 'yellow')
          log(`      Slug: ${attrs.slug}`, 'reset')
          log(`      Publié: ${attrs.publishedAt ? '✅' : '❌'}`, attrs.publishedAt ? 'green' : 'red')
          log(`      Catégorie: ${attrs.category?.data ? '✅' : '❌'}`, attrs.category?.data ? 'green' : 'red')
          log(`      RNCP: ${attrs.rncp || 'Non défini'}`, attrs.rncp ? 'green' : 'yellow')
          log(`      Description: ${attrs.shortDesc ? '✅' : '❌'}`, attrs.shortDesc ? 'green' : 'red')
        }
      })
      
      if (formations.length > 5) {
        log(`\n   ... et ${formations.length - 5} autres formations`, 'cyan')
      }
      
      log(`\n📈 STATISTIQUES FORMATIONS:`, 'bold')
      log(`   Total: ${formations.length}`, 'blue')
      log(`   Publiées: ${stats.published}/${formations.length} (${Math.round(stats.published/formations.length*100)}%)`, stats.published === formations.length ? 'green' : 'yellow')
      log(`   Avec catégorie: ${stats.withCategory}/${formations.length} (${Math.round(stats.withCategory/formations.length*100)}%)`, stats.withCategory > 0 ? 'green' : 'red')
      log(`   Avec image: ${stats.withImage}/${formations.length} (${Math.round(stats.withImage/formations.length*100)}%)`, stats.withImage > 0 ? 'green' : 'yellow')
      log(`   Avec RNCP: ${stats.withRNCP}/${formations.length} (${Math.round(stats.withRNCP/formations.length*100)}%)`, stats.withRNCP > 0 ? 'green' : 'yellow')
      log(`   Avec description: ${stats.withDescription}/${formations.length} (${Math.round(stats.withDescription/formations.length*100)}%)`, stats.withDescription > 0 ? 'green' : 'yellow')
      
      return stats
      
    } else if (response.status === 403) {
      log('🔒 Permissions manquantes pour accéder aux formations', 'yellow')
      log('Les formations existent mais ne sont pas accessibles publiquement', 'yellow')
      return null
    } else {
      log(`❌ Erreur ${response.status}`, 'red')
      return null
    }
  } catch (error) {
    log(`❌ Erreur: ${error.message}`, 'red')
    return null
  }
}

async function analyzeCategories() {
  log('\n🏷️ ANALYSE DES CATÉGORIES', 'bold')
  log('=' .repeat(40), 'bold')
  
  try {
    const response = await makeRequest(`${STRAPI_URL}/api/formation-categories?populate=*`)
    
    if (response.status === 200) {
      const categories = response.data.data || []
      
      log(`🏷️ ${categories.length} catégories trouvées`, 'green')
      
      if (categories.length === 0) {
        log('⚠️ Aucune catégorie dans la base de données', 'yellow')
        return
      }
      
      const expectedSlugs = ['alternance', 'reconversion', 'vae', 'entreprise']
      const foundSlugs = []
      
      categories.forEach((category, index) => {
        const attrs = category.attributes
        foundSlugs.push(attrs.slug)
        
        log(`\n   ${index + 1}. "${attrs.name}"`, 'yellow')
        log(`      Slug: ${attrs.slug}`, 'reset')
        log(`      Formations liées: ${attrs.formations?.data?.length || 0}`, 'blue')
        log(`      Publié: ${attrs.publishedAt ? '✅' : '❌'}`, attrs.publishedAt ? 'green' : 'red')
      })
      
      log(`\n🎯 VÉRIFICATION SLUGS ATTENDUS:`, 'bold')
      expectedSlugs.forEach(slug => {
        const found = foundSlugs.includes(slug)
        log(`   ${slug}: ${found ? '✅' : '❌'}`, found ? 'green' : 'red')
      })
      
      return { categories, foundSlugs, expectedSlugs }
      
    } else if (response.status === 403) {
      log('🔒 Permissions manquantes pour accéder aux catégories', 'yellow')
      return null
    } else {
      log(`❌ Erreur ${response.status}`, 'red')
      return null
    }
  } catch (error) {
    log(`❌ Erreur: ${error.message}`, 'red')
    return null
  }
}

async function checkDatabaseContent() {
  log('\n💾 VÉRIFICATION CONTENU BASE DE DONNÉES', 'bold')
  log('=' .repeat(50), 'bold')
  
  // Test de connectivité de base
  try {
    const healthCheck = await makeRequest(`${STRAPI_URL}/api/formations?pagination[limit]=1`)
    
    if (healthCheck.status === 200) {
      const total = healthCheck.data.meta?.pagination?.total || 0
      log(`✅ Base de données accessible`, 'green')
      log(`📊 Total formations: ${total}`, 'blue')
      
      if (total > 0) {
        log('✅ La base contient des données !', 'green')
        return true
      } else {
        log('⚠️ Base de données vide', 'yellow')
        return false
      }
    } else if (healthCheck.status === 403) {
      log('🔒 Base accessible mais permissions limitées', 'yellow')
      log('Les données existent mais ne sont pas publiquement accessibles', 'yellow')
      return true // Les données existent probablement
    } else {
      log(`❌ Base non accessible (${healthCheck.status})`, 'red')
      return false
    }
  } catch (error) {
    log(`❌ Erreur de connexion: ${error.message}`, 'red')
    return false
  }
}

async function generateMigrationStrategy(apiResults, formationStats, categoryInfo) {
  log('\n📋 STRATÉGIE DE MIGRATION', 'bold')
  log('=' .repeat(40), 'bold')
  
  const hasData = Object.values(apiResults).some(r => r.success && r.count > 0)
  const hasPermissionIssues = Object.values(apiResults).some(r => r.error === 'Permissions')
  
  if (hasPermissionIssues) {
    log('🔒 PROBLÈME PRINCIPAL: Permissions API', 'red')
    log('\n🎯 SOLUTION IMMÉDIATE:', 'bold')
    log('1. Configurer les permissions dans Strapi Admin:', 'yellow')
    log('   - Aller dans Settings > Users & Permissions > Roles > Public', 'cyan')
    log('   - Activer find et findOne pour toutes les collections', 'cyan')
    log('   - Sauvegarder les permissions', 'cyan')
    
    log('\n2. Après correction des permissions:', 'yellow')
    log('   - Relancer ce script d\'analyse', 'cyan')
    log('   - Procéder à l\'assignation des catégories', 'cyan')
  }
  
  if (formationStats && formationStats.withCategory === 0) {
    log('\n🎯 PROBLÈME FORMATIONS:', 'red')
    log('Aucune formation n\'a de catégorie assignée !', 'red')
    log('\n📝 ACTIONS REQUISES:', 'yellow')
    log('1. Créer la catégorie "entreprise" si manquante', 'cyan')
    log('2. Assigner les catégories aux 11 formations:', 'cyan')
    log('   - 8 formations → Alternance', 'cyan')
    log('   - 3 formations → Reconversion', 'cyan')
  }
  
  log('\n🚀 PLAN D\'ACTION COMPLET:', 'bold')
  log('1. Corriger les permissions API (URGENT)', 'red')
  log('2. Assigner les catégories aux formations (CRITIQUE)', 'red')
  log('3. Vérifier les médias et brochures', 'yellow')
  log('4. Tester l\'affichage frontend', 'green')
  log('5. Valider la migration complète', 'green')
}

async function runPublicAnalysis() {
  log('🔍 ANALYSE COMPLÈTE VIA API PUBLIQUE', 'bold')
  log('=' .repeat(60), 'bold')
  
  // Vérification de base
  const hasContent = await checkDatabaseContent()
  
  if (!hasContent) {
    log('\n❌ Base de données vide ou inaccessible', 'red')
    log('Vérifiez la configuration de la base de données', 'yellow')
    return
  }
  
  // Analyse des APIs
  const apiResults = await analyzePublicAPI()
  
  // Analyses détaillées
  const formationStats = await analyzeFormationsDetailed()
  const categoryInfo = await analyzeCategories()
  
  // Stratégie de migration
  await generateMigrationStrategy(apiResults, formationStats, categoryInfo)
  
  // Résumé final
  log('\n📊 RÉSUMÉ DE L\'ANALYSE', 'bold')
  log('=' .repeat(40), 'bold')
  
  const successfulAPIs = Object.values(apiResults).filter(r => r.success).length
  const totalElements = Object.values(apiResults).reduce((sum, r) => sum + (r.count || 0), 0)
  
  log(`APIs testées: ${Object.keys(apiResults).length}`, 'blue')
  log(`APIs accessibles: ${successfulAPIs}`, successfulAPIs > 0 ? 'green' : 'red')
  log(`Total éléments: ${totalElements}`, 'cyan')
  
  if (formationStats) {
    log(`Formations: ${formationStats.published} publiées`, 'blue')
    log(`Catégories assignées: ${formationStats.withCategory}`, formationStats.withCategory > 0 ? 'green' : 'red')
  }
  
  log('\n✨ Analyse terminée !', 'green')
}

// Exécution
runPublicAnalysis().catch(console.error)