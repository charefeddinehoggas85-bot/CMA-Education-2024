#!/usr/bin/env node

/**
 * MIGRATION AUTOMATIQUE - ASSIGNATION DES CATÉGORIES
 * 
 * Ce script assigne automatiquement les bonnes catégories aux formations
 * basé sur l'analyse de la base de données existante.
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
  bold: '\x1b[1m',
  cyan: '\x1b[36m'
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

// Helper pour faire des requêtes HTTP avec authentification
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
    }).on('error', reject)
  })
}

// Mapping des formations vers les catégories basé sur les slugs
const FORMATION_CATEGORY_MAPPING = {
  // Formations Alternance
  'charge-affaires-batiment': 'alternance',
  'conducteur-travaux-batiment': 'alternance', 
  'chef-chantier-vrd': 'alternance',
  'responsable-travaux-bim': 'alternance',
  'chef-projets-btp': 'alternance',
  'conducteur-travaux-vrd-1an': 'alternance',
  'conducteur-travaux-vrd-2ans': 'alternance',
  'chef-projets-btp-1an': 'alternance',
  
  // Formations Reconversion
  'charge-affaires-reconversion': 'reconversion',
  'conducteur-travaux-reconversion': 'reconversion',
  'conducteur-travaux-publics-reconversion': 'reconversion'
}

async function getCategories() {
  log('📋 Récupération des catégories...', 'blue')
  
  try {
    const response = await makePublicRequest(`${STRAPI_URL}/api/formation-categories`)
    
    if (response.status !== 200) {
      throw new Error(`Erreur ${response.status}`)
    }
    
    const categories = {}
    response.data.data.forEach(cat => {
      categories[cat.attributes.slug] = cat.id
    })
    
    log(`✅ ${Object.keys(categories).length} catégories trouvées:`, 'green')
    Object.entries(categories).forEach(([slug, id]) => {
      log(`   - ${slug}: ID ${id}`, 'yellow')
    })
    
    return categories
  } catch (error) {
    log(`❌ Erreur: ${error.message}`, 'red')
    return null
  }
}

async function createMissingCategory() {
  log('\n🏗️ Création de la catégorie "Entreprise" manquante...', 'blue')
  
  try {
    const response = await makeAuthRequest(`${STRAPI_URL}/api/formation-categories`, {
      method: 'POST',
      body: {
        data: {
          name: 'Entreprise',
          slug: 'entreprise',
          description: 'Formations pour les entreprises',
          color: '#10B981',
          icon: 'Building2',
          ordre: 4,
          publishedAt: new Date().toISOString()
        }
      }
    })
    
    if (response.status === 200 || response.status === 201) {
      log(`✅ Catégorie "Entreprise" créée avec l'ID ${response.data.data.id}`, 'green')
      return response.data.data.id
    } else {
      log(`❌ Erreur ${response.status} lors de la création`, 'red')
      if (response.data.error) {
        log(`   Détail: ${JSON.stringify(response.data.error)}`, 'red')
      }
      return null
    }
  } catch (error) {
    log(`❌ Erreur: ${error.message}`, 'red')
    return null
  }
}

async function getFormations() {
  log('\n📚 Récupération des formations...', 'blue')
  
  try {
    const response = await makePublicRequest(`${STRAPI_URL}/api/formations`)
    
    if (response.status !== 200) {
      throw new Error(`Erreur ${response.status}`)
    }
    
    const formations = response.data.data.map(formation => ({
      id: formation.id,
      slug: formation.attributes.slug,
      title: formation.attributes.title,
      hasCategory: formation.attributes.category?.data !== null
    }))
    
    log(`✅ ${formations.length} formations trouvées`, 'green')
    
    const withoutCategory = formations.filter(f => !f.hasCategory)
    log(`⚠️ ${withoutCategory.length} formations sans catégorie`, 'yellow')
    
    return formations
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
      log(`✅ "${formationTitle}" → Catégorie assignée`, 'green')
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

async function runMigration() {
  log('🚀 MIGRATION AUTOMATIQUE - ASSIGNATION CATÉGORIES', 'bold')
  log('=' .repeat(60), 'bold')
  
  // 1. Récupérer les catégories existantes
  let categories = await getCategories()
  if (!categories) {
    log('❌ Impossible de récupérer les catégories', 'red')
    return false
  }
  
  // 2. Créer la catégorie "entreprise" si manquante
  if (!categories.entreprise) {
    const entrepriseId = await createMissingCategory()
    if (entrepriseId) {
      categories.entreprise = entrepriseId
      log(`✅ Catégorie "entreprise" ajoutée avec l'ID ${entrepriseId}`, 'green')
    } else {
      log('⚠️ Impossible de créer la catégorie "entreprise"', 'yellow')
    }
  }
  
  // 3. Récupérer les formations
  const formations = await getFormations()
  if (!formations) {
    log('❌ Impossible de récupérer les formations', 'red')
    return false
  }
  
  // 4. Assigner les catégories
  log('\n🎯 Assignation des catégories...', 'blue')
  log('=' .repeat(40), 'blue')
  
  let successCount = 0
  let errorCount = 0
  let skippedCount = 0
  
  for (const formation of formations) {
    // Vérifier si la formation a déjà une catégorie
    if (formation.hasCategory) {
      log(`⏭️ "${formation.title}" a déjà une catégorie`, 'cyan')
      skippedCount++
      continue
    }
    
    // Trouver la catégorie correspondante
    const categorySlug = FORMATION_CATEGORY_MAPPING[formation.slug]
    
    if (!categorySlug) {
      log(`⚠️ Pas de mapping pour "${formation.slug}"`, 'yellow')
      skippedCount++
      continue
    }
    
    const categoryId = categories[categorySlug]
    if (!categoryId) {
      log(`❌ Catégorie "${categorySlug}" non trouvée pour "${formation.slug}"`, 'red')
      errorCount++
      continue
    }
    
    log(`🔄 "${formation.title}" → ${categorySlug}`, 'yellow')
    
    const success = await assignCategoryToFormation(formation.id, categoryId, formation.title)
    if (success) {
      successCount++
    } else {
      errorCount++
    }
    
    // Pause pour éviter de surcharger l'API
    await new Promise(resolve => setTimeout(resolve, 500))
  }
  
  // 5. Résumé
  log('\n📊 RÉSUMÉ DE LA MIGRATION', 'bold')
  log('=' .repeat(40), 'bold')
  log(`✅ Formations mises à jour: ${successCount}`, 'green')
  log(`⏭️ Formations ignorées: ${skippedCount}`, 'cyan')
  log(`❌ Erreurs: ${errorCount}`, errorCount > 0 ? 'red' : 'green')
  log(`📋 Total formations: ${formations.length}`, 'blue')
  
  const totalProcessed = successCount + errorCount + skippedCount
  log(`📈 Taux de réussite: ${Math.round(successCount/totalProcessed*100)}%`, successCount > 0 ? 'green' : 'red')
  
  if (successCount > 0) {
    log('\n🎉 Migration réussie !', 'green')
    log('Les formations ont été assignées aux bonnes catégories.', 'green')
    
    log('\n🔍 Vérification recommandée:', 'blue')
    log('1. Lancer le script de vérification:', 'yellow')
    log('   node scripts/verify-formations-fix.js', 'cyan')
    log('2. Tester le site:', 'yellow')
    log('   https://cma-education-2024.vercel.app/formations', 'cyan')
  } else {
    log('\n⚠️ Aucune formation n\'a été mise à jour', 'yellow')
    log('Vérifiez les permissions et les données.', 'yellow')
  }
  
  return successCount > 0
}

// Exécution
runMigration().catch(console.error)