#!/usr/bin/env node

/**
 * FIX FORMATION MANQUANTE - ASSIGNATION CATÉGORIE
 * 
 * Ce script identifie et corrige la formation sans catégorie
 */

const https = require('https')

// Configuration
const STRAPI_URL = 'https://cma-education-strapi-production.up.railway.app'
const STRAPI_TOKEN = '62559d2051c7e5f7576a0e12524b1a160a5dde2b9c0428afd257df0c5ec8b81ae33683899ae9fadd3e6b6d2853b858f31343efbae9b692bf785758173d01428e43ed02efec664f698718fa44079f64b3b03e1e6663d1200ab0b5cf6345fd78cbd11f41b02be1303e7f122e18aa18be690225201a96cbe8aa71d8229deba2e94ec236385a2013ba8db694ccbdf80a49a5cc3e0499ae408caa45dddb48f2a9ed35fd17a8a9eedb71fbf587e0806ccc282a4c62f8aa575457bc480b312f9740d1f3e1651e196a507075ed08a858b8dda30c5c1ffc88b61352c9436b7fddeb70f6668b194166d1a18133990d6da183edb6a0f4f4694f716d'

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

// Helper pour requêtes authentifiées
function makeAuthRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url)
    
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || 443,
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
        ...options.headers
      }
    }
    
    const req = https.request(requestOptions, (res) => {
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
    })
    
    req.on('error', reject)
    
    if (options.body) {
      req.write(JSON.stringify(options.body))
    }
    
    req.end()
  })
}

// Helper pour requêtes publiques
function makePublicRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
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
    }).on('error', reject)
  })
}

async function findFormationWithoutCategory() {
  log('🔍 Recherche de la formation sans catégorie...', 'blue')
  
  try {
    const response = await makePublicRequest(`${STRAPI_URL}/api/formations?populate=category`)
    
    if (response.status !== 200) {
      throw new Error(`Erreur ${response.status}`)
    }
    
    const formations = response.data.data || []
    const formationWithoutCategory = formations.find(f => !f.attributes.category?.data)
    
    if (formationWithoutCategory) {
      log(`✅ Formation trouvée: "${formationWithoutCategory.attributes.title}"`, 'green')
      log(`   ID: ${formationWithoutCategory.id}`, 'yellow')
      log(`   Slug: ${formationWithoutCategory.attributes.slug}`, 'yellow')
      return formationWithoutCategory
    } else {
      log('✅ Toutes les formations ont une catégorie !', 'green')
      return null
    }
  } catch (error) {
    log(`❌ Erreur: ${error.message}`, 'red')
    return null
  }
}

async function getCategories() {
  try {
    const response = await makePublicRequest(`${STRAPI_URL}/api/formation-categories`)
    
    if (response.status !== 200) {
      throw new Error(`Erreur ${response.status}`)
    }
    
    const categories = {}
    response.data.data.forEach(cat => {
      categories[cat.attributes.slug] = cat.id
    })
    
    return categories
  } catch (error) {
    log(`❌ Erreur: ${error.message}`, 'red')
    return null
  }
}

async function assignCategoryToFormation(formationId, categoryId, formationTitle) {
  try {
    const response = await makeAuthRequest(`${STRAPI_URL}/api/formations/${formationId}`, {
      method: 'PUT',
      body: {
        data: {
          category: categoryId
        }
      }
    })
    
    if (response.status === 200) {
      log(`✅ Catégorie assignée à "${formationTitle}"`, 'green')
      return true
    } else {
      log(`❌ Erreur ${response.status} pour "${formationTitle}"`, 'red')
      if (response.data.error) {
        log(`   Détail: ${JSON.stringify(response.data.error)}`, 'red')
      }
      return false
    }
  } catch (error) {
    log(`❌ Erreur pour "${formationTitle}": ${error.message}`, 'red')
    return false
  }
}

async function fixMissingCategory() {
  log('🚀 CORRECTION FORMATION SANS CATÉGORIE', 'bold')
  log('=' .repeat(50), 'bold')
  
  // 1. Trouver la formation sans catégorie
  const formation = await findFormationWithoutCategory()
  if (!formation) {
    log('🎉 Aucune correction nécessaire !', 'green')
    return true
  }
  
  // 2. Récupérer les catégories
  const categories = await getCategories()
  if (!categories) {
    log('❌ Impossible de récupérer les catégories', 'red')
    return false
  }
  
  log('\n📋 Catégories disponibles:', 'blue')
  Object.entries(categories).forEach(([slug, id]) => {
    log(`   - ${slug}: ID ${id}`, 'yellow')
  })
  
  // 3. Déterminer la catégorie appropriée
  const slug = formation.attributes.slug
  let categorySlug = 'alternance' // Par défaut
  
  // Logique de mapping basée sur le slug
  if (slug.includes('reconversion')) {
    categorySlug = 'reconversion'
  } else if (slug.includes('vae')) {
    categorySlug = 'vae'
  } else if (slug.includes('entreprise')) {
    categorySlug = 'entreprise'
  } else {
    categorySlug = 'alternance' // Formations classiques
  }
  
  log(`\n🎯 Formation: "${formation.attributes.title}"`, 'cyan')
  log(`   Slug: ${slug}`, 'yellow')
  log(`   Catégorie suggérée: ${categorySlug}`, 'yellow')
  
  const categoryId = categories[categorySlug]
  if (!categoryId) {
    log(`❌ Catégorie "${categorySlug}" non trouvée`, 'red')
    return false
  }
  
  // 4. Assigner la catégorie
  log(`\n🔄 Assignation de la catégorie "${categorySlug}"...`, 'blue')
  const success = await assignCategoryToFormation(formation.id, categoryId, formation.attributes.title)
  
  if (success) {
    log('\n🎉 CORRECTION RÉUSSIE !', 'green')
    log('La formation a été assignée à la bonne catégorie.', 'green')
    
    log('\n🔍 Vérification recommandée:', 'blue')
    log('   node scripts/verify-formations-fix.js', 'cyan')
  } else {
    log('\n❌ CORRECTION ÉCHOUÉE', 'red')
    log('Vérifiez les permissions et réessayez.', 'red')
  }
  
  return success
}

// Exécution
fixMissingCategory().catch(console.error)