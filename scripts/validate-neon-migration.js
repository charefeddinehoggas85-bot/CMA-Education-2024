#!/usr/bin/env node

/**
 * VALIDATION SIMPLIFIÉE POUR NEON
 * 
 * Ce script valide la migration Neon en se concentrant sur les données critiques
 * et en utilisant des requêtes compatibles avec les limitations de Neon.
 */

const https = require('https')
const http = require('http')
const { Client } = require('pg')

// Configuration
const LOCAL_DB_CONFIG = {
  host: '127.0.0.1',
  port: 5432,
  database: 'cma_cms',
  user: 'postgres',
  password: 'root'
}

const NEON_DB_CONFIG = {
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
}

const STRAPI_NEON_URL = 'https://cma-education-strapi-production.up.railway.app'
const STRAPI_TOKEN = '62559d2051c7e5f7576a0e12524b1a160a5dde2b9c0428afd257df0c5ec8b81ae33683899ae9fadd3e6b6d2853b858f31343efbae9b692bf785758173d01428e43ed02efec664f698718fa44079f64b3b03e1e6663d1200ab0b5cf6345fd78cbd11f41b02be1303e7f122e18aa18be690225201a96cbe8aa71d8229deba2e94ec236385a2013ba8db694ccbdf80a49a5cc3e0499ae408caa45dddb48f2a9ed35fd17a8a9eedb71fbf587e0806ccc282a4c62f8aa575457bc480b312f9740d1f3e1651e196a507075ed08a858b8dda30c5c1ffc88b61352c9436b7fddeb70f6668b194166d1a18133990d6da183edb6a0f4f4694f716d'

// Tables critiques à valider
const CRITICAL_TABLES = [
  'formations',
  'formation_categories',
  'formateurs',
  'testimonials',
  'partners',
  'articles_blog',
  'categories_blog',
  'site_settings'
]

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
  const timestamp = new Date().toLocaleTimeString()
  console.log(`${colors[color]}[${timestamp}] ${message}${colors.reset}`)
}

// Helper pour faire des requêtes HTTP
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url)
    const isHttps = urlObj.protocol === 'https:'
    const httpModule = isHttps ? https : http
    
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
        ...options.headers
      },
      timeout: 10000
    }
    
    const req = httpModule.request(requestOptions, (res) => {
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
    req.on('timeout', () => {
      req.destroy()
      reject(new Error('Request timeout'))
    })
    
    if (options.body) {
      req.write(JSON.stringify(options.body))
    }
    
    req.end()
  })
}

class NeonValidator {
  constructor() {
    this.localClient = null
    this.neonClient = null
    this.validationResults = {
      critical_tables: {},
      api_tests: {},
      data_samples: {},
      errors: []
    }
  }

  async connectDatabases() {
    log('🔌 Connexion aux bases de données...', 'blue')
    
    try {
      // Connexion locale
      this.localClient = new Client(LOCAL_DB_CONFIG)
      await this.localClient.connect()
      log('✅ Connexion locale établie', 'green')
      
      // Connexion Neon
      if (!NEON_DB_CONFIG.connectionString) {
        throw new Error('DATABASE_URL non définie')
      }
      
      this.neonClient = new Client(NEON_DB_CONFIG)
      await this.neonClient.connect()
      log('✅ Connexion Neon établie', 'green')
      
      return true
    } catch (error) {
      log(`❌ Erreur de connexion: ${error.message}`, 'red')
      this.validationResults.errors.push(`Database connection: ${error.message}`)
      return false
    }
  }

  async validateCriticalTables() {
    log('\n📊 Validation des tables critiques...', 'blue')
    
    let totalMatching = 0
    
    for (const table of CRITICAL_TABLES) {
      try {
        // Compter local
        const localResult = await this.localClient.query(`SELECT COUNT(*) FROM "${table}"`)
        const localCount = parseInt(localResult.rows[0].count)
        
        // Compter Neon
        const neonResult = await this.neonClient.query(`SELECT COUNT(*) FROM "${table}"`)
        const neonCount = parseInt(neonResult.rows[0].count)
        
        const isMatching = localCount === neonCount
        if (isMatching) totalMatching++
        
        this.validationResults.critical_tables[table] = {
          local_count: localCount,
          neon_count: neonCount,
          matching: isMatching
        }
        
        if (isMatching && localCount > 0) {
          log(`✅ ${table}: ${localCount} enregistrements`, 'green')
        } else if (isMatching && localCount === 0) {
          log(`ℹ️ ${table}: vide (normal)`, 'cyan')
        } else {
          log(`❌ ${table}: Local=${localCount}, Neon=${neonCount}`, 'red')
          this.validationResults.errors.push(`Table ${table}: count mismatch`)
        }
        
      } catch (error) {
        log(`⚠️ Erreur ${table}: ${error.message}`, 'yellow')
        this.validationResults.errors.push(`Table ${table}: ${error.message}`)
      }
    }
    
    log(`\n📈 Tables critiques correspondantes: ${totalMatching}/${CRITICAL_TABLES.length}`, 
        totalMatching === CRITICAL_TABLES.length ? 'green' : 'yellow')
    
    return totalMatching === CRITICAL_TABLES.length
  }

  async testStrapiAPIs() {
    log('\n🔌 Test des APIs Strapi critiques...', 'blue')
    
    const endpoints = [
      { name: 'formations', url: 'formations' },
      { name: 'formation-categories', url: 'formation-categories' },
      { name: 'formateurs', url: 'formateurs' },
      { name: 'testimonials', url: 'testimonials' }
    ]
    
    let successCount = 0
    
    for (const endpoint of endpoints) {
      try {
        log(`   Testing ${endpoint.name}...`, 'cyan')
        
        const response = await makeRequest(`${STRAPI_NEON_URL}/api/${endpoint.url}?populate=*`)
        
        if (response.status === 200) {
          const data = response.data.data || []
          const count = Array.isArray(data) ? data.length : (data ? 1 : 0)
          log(`   ✅ ${endpoint.name}: ${count} éléments`, 'green')
          successCount++
          
          this.validationResults.api_tests[endpoint.name] = {
            status: 'success',
            count: count
          }
        } else if (response.status === 401) {
          log(`   ⚠️ ${endpoint.name}: Non autorisé (permissions à configurer)`, 'yellow')
          this.validationResults.api_tests[endpoint.name] = {
            status: 'unauthorized',
            note: 'Permissions required'
          }
        } else {
          log(`   ❌ ${endpoint.name}: Status ${response.status}`, 'red')
          this.validationResults.api_tests[endpoint.name] = {
            status: 'error',
            error: `HTTP ${response.status}`
          }
        }
      } catch (error) {
        log(`   ❌ ${endpoint.name}: ${error.message}`, 'red')
        this.validationResults.api_tests[endpoint.name] = {
          status: 'error',
          error: error.message
        }
      }
      
      // Pause pour éviter la surcharge
      await new Promise(resolve => setTimeout(resolve, 500))
    }
    
    log(`\n📊 APIs testées avec succès: ${successCount}/${endpoints.length}`, 
        successCount > 0 ? 'green' : 'red')
    
    return successCount > 0
  }

  async validateDataSamples() {
    log('\n🔍 Validation d\'échantillons de données...', 'blue')
    
    try {
      // Test 1: Formations avec leurs slugs
      const formationsResult = await this.neonClient.query(`
        SELECT id, title, slug, published_at
        FROM formations 
        WHERE published_at IS NOT NULL
        LIMIT 5
      `)
      
      log(`📚 Formations publiées: ${formationsResult.rows.length}`, 'cyan')
      formationsResult.rows.forEach(formation => {
        log(`   • ${formation.title} (${formation.slug})`, 'blue')
      })
      
      // Test 2: Catégories de formations
      const categoriesResult = await this.neonClient.query(`
        SELECT id, name, slug
        FROM formation_categories
        ORDER BY name
      `)
      
      log(`🏷️ Catégories: ${categoriesResult.rows.length}`, 'cyan')
      categoriesResult.rows.forEach(category => {
        log(`   • ${category.name} (${category.slug})`, 'blue')
      })
      
      // Test 3: Formateurs
      const formateursResult = await this.neonClient.query(`
        SELECT id, nom, prenom, specialite
        FROM formateurs
        LIMIT 5
      `)
      
      log(`👨‍🏫 Formateurs: ${formateursResult.rows.length}`, 'cyan')
      formateursResult.rows.forEach(formateur => {
        log(`   • ${formateur.prenom} ${formateur.nom} - ${formateur.specialite}`, 'blue')
      })
      
      this.validationResults.data_samples = {
        formations_published: formationsResult.rows.length,
        categories: categoriesResult.rows.length,
        formateurs: formateursResult.rows.length
      }
      
      return true
      
    } catch (error) {
      log(`❌ Erreur validation échantillons: ${error.message}`, 'red')
      this.validationResults.errors.push(`Data samples: ${error.message}`)
      return false
    }
  }

  async generateSimpleReport() {
    const report = {
      timestamp: new Date().toISOString(),
      validation_results: this.validationResults,
      summary: {
        critical_tables_ok: Object.values(this.validationResults.critical_tables).every(t => t.matching),
        apis_working: Object.values(this.validationResults.api_tests).some(t => t.status === 'success'),
        total_errors: this.validationResults.errors.length,
        migration_success: this.validationResults.errors.length === 0
      }
    }
    
    // Sauvegarder le rapport
    const fs = require('fs')
    const path = require('path')
    
    try {
      const backupDir = path.join(process.cwd(), 'backups', 'migration')
      if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true })
      }
      
      const reportFile = path.join(backupDir, `neon_validation_${new Date().toISOString().split('T')[0]}.json`)
      fs.writeFileSync(reportFile, JSON.stringify(report, null, 2))
      log(`📄 Rapport sauvegardé: ${reportFile}`, 'green')
    } catch (error) {
      log(`⚠️ Impossible de sauvegarder le rapport: ${error.message}`, 'yellow')
    }
    
    return report
  }

  async runNeonValidation() {
    log('🔍 VALIDATION MIGRATION NEON', 'bold')
    log('=' .repeat(40), 'bold')
    
    // 1. Connexion
    const connected = await this.connectDatabases()
    if (!connected) {
      return false
    }
    
    // 2. Validation des tables critiques
    const tablesOk = await this.validateCriticalTables()
    
    // 3. Test des APIs
    const apisOk = await this.testStrapiAPIs()
    
    // 4. Validation des échantillons
    const samplesOk = await this.validateDataSamples()
    
    // 5. Génération du rapport
    const report = await this.generateSimpleReport()
    
    // 6. Résumé final
    this.printFinalSummary(report, tablesOk, apisOk, samplesOk)
    
    return report.summary.migration_success
  }

  printFinalSummary(report, tablesOk, apisOk, samplesOk) {
    log('\n🎯 RÉSUMÉ VALIDATION NEON', 'bold')
    log('=' .repeat(35), 'bold')
    
    log(`Tables critiques: ${tablesOk ? '✅' : '❌'}`, tablesOk ? 'green' : 'red')
    log(`APIs fonctionnelles: ${apisOk ? '✅' : '❌'}`, apisOk ? 'green' : 'yellow')
    log(`Échantillons valides: ${samplesOk ? '✅' : '❌'}`, samplesOk ? 'green' : 'red')
    log(`Erreurs détectées: ${report.summary.total_errors}`, report.summary.total_errors === 0 ? 'green' : 'red')
    
    if (tablesOk && samplesOk) {
      log('\n🎉 MIGRATION NEON VALIDÉE !', 'green')
      log('Vos données critiques sont correctement migrées.', 'cyan')
      
      if (!apisOk) {
        log('\n⚠️ Note: Configurez les permissions Strapi pour activer les APIs', 'yellow')
      }
    } else {
      log('\n⚠️ PROBLÈMES DÉTECTÉS', 'yellow')
      log('Consultez les erreurs ci-dessus.', 'cyan')
    }
  }

  async cleanup() {
    if (this.localClient) {
      await this.localClient.end()
    }
    
    if (this.neonClient) {
      await this.neonClient.end()
    }
  }
}

// Fonction principale
async function runNeonValidation() {
  const validator = new NeonValidator()
  
  try {
    const success = await validator.runNeonValidation()
    return success
  } catch (error) {
    log(`❌ Erreur fatale: ${error.message}`, 'red')
    console.error(error)
    return false
  } finally {
    await validator.cleanup()
  }
}

// Point d'entrée
if (require.main === module) {
  if (!process.env.DATABASE_URL) {
    log('❌ Variable DATABASE_URL manquante', 'red')
    log('Définissez votre URL de connexion Neon dans DATABASE_URL', 'yellow')
    process.exit(1)
  }
  
  runNeonValidation().then(success => {
    process.exit(success ? 0 : 1)
  })
}

module.exports = { NeonValidator }