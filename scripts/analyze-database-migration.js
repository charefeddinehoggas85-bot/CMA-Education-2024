#!/usr/bin/env node

/**
 * ANALYSE COMPLÈTE DE LA BASE DE DONNÉES POUR MIGRATION
 * 
 * Ce script analyse la base de données Neon PostgreSQL pour identifier
 * toutes les données existantes et planifier une migration complète.
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

// Helper pour faire des requêtes HTTP
function makeRequest(url, options = {}) {
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

// Collections à analyser
const COLLECTIONS = [
  'formations',
  'formation-categories', 
  'formateurs',
  'testimonials',
  'partners',
  'blog-articles',
  'pages',
  'site-settings',
  'modalites',
  'processus-admissions',
  'statistique-sites',
  'chiffre-cles',
  'methode-pedagogiques',
  'outil-pedagogiques',
  'vae-certifications',
  'vae-faqs',
  'page-entreprises',
  'page-vaes',
  'page-admissions',
  'page-partenaires',
  'entreprise-modalites',
  'etape-admissions'
]

async function analyzeCollection(collectionName) {
  try {
    log(`\n📊 Analyse: ${collectionName}`, 'cyan')
    
    const response = await makeRequest(`${STRAPI_URL}/api/${collectionName}?populate=*`)
    
    if (response.status === 200) {
      const data = response.data.data || []
      const meta = response.data.meta || {}
      
      log(`✅ ${collectionName}: ${data.length} éléments`, 'green')
      
      if (data.length > 0) {
        // Analyser le premier élément pour voir la structure
        const firstItem = data[0]
        const attributes = firstItem.attributes || {}
        const fields = Object.keys(attributes)
        
        log(`   Champs: ${fields.slice(0, 5).join(', ')}${fields.length > 5 ? '...' : ''}`, 'yellow')
        
        // Vérifier les relations
        const relations = fields.filter(field => 
          attributes[field] && 
          typeof attributes[field] === 'object' && 
          attributes[field].data !== undefined
        )
        
        if (relations.length > 0) {
          log(`   Relations: ${relations.join(', ')}`, 'blue')
        }
        
        // Vérifier les médias
        const mediaFields = fields.filter(field => 
          field.includes('image') || 
          field.includes('photo') || 
          field.includes('media') ||
          field.includes('brochure') ||
          field.includes('gallery')
        )
        
        if (mediaFields.length > 0) {
          log(`   Médias: ${mediaFields.join(', ')}`, 'cyan')
        }
      }
      
      return {
        name: collectionName,
        count: data.length,
        data: data,
        meta: meta,
        success: true
      }
    } else if (response.status === 404) {
      log(`⚠️ ${collectionName}: Collection non trouvée`, 'yellow')
      return { name: collectionName, count: 0, success: false, error: 'Not found' }
    } else {
      log(`❌ ${collectionName}: Erreur ${response.status}`, 'red')
      return { name: collectionName, count: 0, success: false, error: response.status }
    }
  } catch (error) {
    log(`❌ ${collectionName}: ${error.message}`, 'red')
    return { name: collectionName, count: 0, success: false, error: error.message }
  }
}

async function analyzeFormationsInDetail() {
  log('\n🔍 ANALYSE DÉTAILLÉE DES FORMATIONS', 'bold')
  log('=' .repeat(50), 'bold')
  
  try {
    const response = await makeRequest(`${STRAPI_URL}/api/formations?populate=*`)
    
    if (response.status !== 200) {
      log(`❌ Erreur ${response.status}`, 'red')
      return
    }
    
    const formations = response.data.data || []
    
    log(`📚 ${formations.length} formations trouvées`, 'green')
    
    let withCategory = 0
    let withImage = 0
    let published = 0
    let withBrochure = 0
    
    formations.forEach((formation, index) => {
      const attrs = formation.attributes
      const hasCategory = attrs.category?.data !== null
      const hasImage = attrs.image?.data !== null
      const isPublished = attrs.publishedAt !== null
      const hasBrochure = attrs.brochure?.data !== null
      
      if (hasCategory) withCategory++
      if (hasImage) withImage++
      if (isPublished) published++
      if (hasBrochure) withBrochure++
      
      log(`\n   ${index + 1}. "${attrs.title}"`, 'yellow')
      log(`      Slug: ${attrs.slug}`, 'reset')
      log(`      Publié: ${isPublished ? '✅' : '❌'}`, isPublished ? 'green' : 'red')
      log(`      Catégorie: ${hasCategory ? '✅' : '❌'} ${hasCategory ? `(${attrs.category.data.attributes.slug})` : ''}`, hasCategory ? 'green' : 'red')
      log(`      Image: ${hasImage ? '✅' : '❌'}`, hasImage ? 'green' : 'red')
      log(`      Brochure: ${hasBrochure ? '✅' : '❌'}`, hasBrochure ? 'green' : 'red')
      
      // Vérifier les champs importants
      const importantFields = ['level', 'rncp', 'shortDesc', 'duree', 'rythme', 'modalite']
      const missingFields = importantFields.filter(field => !attrs[field])
      
      if (missingFields.length > 0) {
        log(`      Champs manquants: ${missingFields.join(', ')}`, 'red')
      }
    })
    
    log(`\n📈 STATISTIQUES FORMATIONS:`, 'bold')
    log(`   Publiées: ${published}/${formations.length}`, published === formations.length ? 'green' : 'yellow')
    log(`   Avec catégorie: ${withCategory}/${formations.length}`, withCategory === formations.length ? 'green' : 'red')
    log(`   Avec image: ${withImage}/${formations.length}`, withImage === formations.length ? 'green' : 'yellow')
    log(`   Avec brochure: ${withBrochure}/${formations.length}`, withBrochure === formations.length ? 'green' : 'yellow')
    
  } catch (error) {
    log(`❌ Erreur: ${error.message}`, 'red')
  }
}

async function analyzeCategories() {
  log('\n🏷️ ANALYSE DES CATÉGORIES', 'bold')
  log('=' .repeat(40), 'bold')
  
  try {
    const response = await makeRequest(`${STRAPI_URL}/api/formation-categories?populate=*`)
    
    if (response.status !== 200) {
      log(`❌ Erreur ${response.status}`, 'red')
      return
    }
    
    const categories = response.data.data || []
    
    log(`🏷️ ${categories.length} catégories trouvées`, 'green')
    
    const expectedSlugs = ['alternance', 'reconversion', 'vae', 'entreprise']
    const foundSlugs = []
    
    categories.forEach((category, index) => {
      const attrs = category.attributes
      const formationsCount = attrs.formations?.data?.length || 0
      
      foundSlugs.push(attrs.slug)
      
      log(`\n   ${index + 1}. "${attrs.name}"`, 'yellow')
      log(`      Slug: ${attrs.slug}`, 'reset')
      log(`      Formations liées: ${formationsCount}`, formationsCount > 0 ? 'green' : 'red')
      log(`      Publié: ${attrs.publishedAt ? '✅' : '❌'}`, attrs.publishedAt ? 'green' : 'red')
    })
    
    log(`\n🎯 SLUGS ATTENDUS:`, 'bold')
    expectedSlugs.forEach(slug => {
      const found = foundSlugs.includes(slug)
      log(`   ${slug}: ${found ? '✅' : '❌'}`, found ? 'green' : 'red')
    })
    
  } catch (error) {
    log(`❌ Erreur: ${error.message}`, 'red')
  }
}

async function generateMigrationPlan(results) {
  log('\n📋 PLAN DE MIGRATION', 'bold')
  log('=' .repeat(40), 'bold')
  
  const existingCollections = results.filter(r => r.success && r.count > 0)
  const missingCollections = results.filter(r => !r.success)
  const emptyCollections = results.filter(r => r.success && r.count === 0)
  
  log(`\n✅ Collections avec données (${existingCollections.length}):`, 'green')
  existingCollections.forEach(col => {
    log(`   - ${col.name}: ${col.count} éléments`, 'green')
  })
  
  log(`\n⚠️ Collections vides (${emptyCollections.length}):`, 'yellow')
  emptyCollections.forEach(col => {
    log(`   - ${col.name}`, 'yellow')
  })
  
  log(`\n❌ Collections manquantes (${missingCollections.length}):`, 'red')
  missingCollections.forEach(col => {
    log(`   - ${col.name}`, 'red')
  })
  
  // Plan d'action
  log(`\n🎯 ACTIONS RECOMMANDÉES:`, 'bold')
  
  log(`\n1. CORRECTION IMMÉDIATE:`, 'blue')
  log(`   - Assigner catégories aux formations (0/11 actuellement)`, 'yellow')
  log(`   - Créer catégorie "entreprise" manquante`, 'yellow')
  
  log(`\n2. MIGRATION DES DONNÉES:`, 'blue')
  if (existingCollections.length > 0) {
    log(`   - Migrer ${existingCollections.length} collections existantes`, 'green')
    log(`   - Vérifier les relations entre collections`, 'yellow')
    log(`   - Migrer les médias associés`, 'yellow')
  }
  
  log(`\n3. CRÉATION DE CONTENU:`, 'blue')
  if (emptyCollections.length > 0) {
    log(`   - Créer contenu pour ${emptyCollections.length} collections vides`, 'yellow')
  }
  if (missingCollections.length > 0) {
    log(`   - Créer ${missingCollections.length} collections manquantes`, 'red')
  }
  
  log(`\n4. VALIDATION:`, 'blue')
  log(`   - Tester l'affichage frontend`, 'yellow')
  log(`   - Vérifier les permissions API`, 'yellow')
  log(`   - Valider les relations`, 'yellow')
}

async function runDatabaseAnalysis() {
  log('🔍 ANALYSE COMPLÈTE DE LA BASE DE DONNÉES', 'bold')
  log('=' .repeat(60), 'bold')
  log(`Base: ${STRAPI_URL}`, 'blue')
  log(`Collections à analyser: ${COLLECTIONS.length}`, 'blue')
  
  // Analyse générale des collections
  log('\n📊 ANALYSE DES COLLECTIONS', 'bold')
  log('=' .repeat(40), 'bold')
  
  const results = []
  
  for (const collection of COLLECTIONS) {
    const result = await analyzeCollection(collection)
    results.push(result)
    
    // Pause pour éviter de surcharger l'API
    await new Promise(resolve => setTimeout(resolve, 200))
  }
  
  // Analyses détaillées
  await analyzeFormationsInDetail()
  await analyzeCategories()
  
  // Plan de migration
  await generateMigrationPlan(results)
  
  // Résumé final
  log('\n📊 RÉSUMÉ DE L\'ANALYSE', 'bold')
  log('=' .repeat(40), 'bold')
  
  const totalElements = results.reduce((sum, r) => sum + (r.count || 0), 0)
  const successfulCollections = results.filter(r => r.success).length
  
  log(`Collections analysées: ${results.length}`, 'blue')
  log(`Collections trouvées: ${successfulCollections}`, 'green')
  log(`Total éléments: ${totalElements}`, 'cyan')
  
  log('\n✨ Analyse terminée !', 'green')
  log('Utilisez les informations ci-dessus pour planifier la migration.', 'yellow')
}

// Exécution
runDatabaseAnalysis().catch(console.error)