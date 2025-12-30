#!/usr/bin/env node

/**
 * VALIDATION COMPLÈTE POST-MIGRATION
 * 
 * Ce script valide que la migration vers Neon s'est bien déroulée
 * en comparant les données et en testant les fonctionnalités.
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

const STRAPI_LOCAL_URL = 'http://localhost:1337'
const STRAPI_NEON_URL = 'https://cma-education-strapi-production.up.railway.app'
const STRAPI_TOKEN = '62559d2051c7e5f7576a0e12524b1a160a5dde2b9c0428afd257df0c5ec8b81ae33683899ae9fadd3e6b6d2853b858f31343efbae9b692bf785758173d01428e43ed02efec664f698718fa44079f64b3b03e1e6663d1200ab0b5cf6345fd78cbd11f41b02be1303e7f122e18aa18be690225201a96cbe8aa71d8229deba2e94ec236385a2013ba8db694ccbdf80a49a5cc3e0499ae408caa45dddb48f2a9ed35fd17a8a9eedb71fbf587e0806ccc282a4c62f8aa575457bc480b312f9740d1f3e1651e196a507075ed08a858b8dda30c5c1ffc88b61352c9436b7fddeb70f6668b194166d1a18133990d6da183edb6a0f4f4694f716d'

// Couleurs pour les logs
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m'
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

class MigrationValidator {
  constructor() {
    this.localClient = null
    this.neonClient = null
    this.validationResults = {
      database_comparison: {},
      api_tests: {},
      data_integrity: {},
      performance: {},
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

  async compareTableCounts() {
    log('\n📊 Comparaison des comptages de tables...', 'blue')
    
    try {
      // Récupérer les tables communes
      const tablesQuery = `
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_type = 'BASE TABLE'
        ORDER BY table_name
      `
      
      const localTables = await this.localClient.query(tablesQuery)
      const neonTables = await this.neonClient.query(tablesQuery)
      
      const localTableNames = localTables.rows.map(r => r.table_name)
      const neonTableNames = neonTables.rows.map(r => r.table_name)
      
      log(`Local: ${localTableNames.length} tables`, 'cyan')
      log(`Neon: ${neonTableNames.length} tables`, 'cyan')
      
      // Tables manquantes
      const missingInNeon = localTableNames.filter(t => !neonTableNames.includes(t))
      const extraInNeon = neonTableNames.filter(t => !localTableNames.includes(t))
      
      if (missingInNeon.length > 0) {
        log(`⚠️ Tables manquantes dans Neon: ${missingInNeon.join(', ')}`, 'yellow')
      }
      
      if (extraInNeon.length > 0) {
        log(`ℹ️ Tables supplémentaires dans Neon: ${extraInNeon.join(', ')}`, 'blue')
      }
      
      // Comparer les comptages
      const commonTables = localTableNames.filter(t => neonTableNames.includes(t))
      let totalLocal = 0
      let totalNeon = 0
      let matchingTables = 0
      
      for (const table of commonTables) {
        try {
          const localCount = await this.localClient.query(`SELECT COUNT(*) FROM "${table}"`)
          const neonCount = await this.neonClient.query(`SELECT COUNT(*) FROM "${table}"`)
          
          const localNum = parseInt(localCount.rows[0].count)
          const neonNum = parseInt(neonCount.rows[0].count)
          
          totalLocal += localNum
          totalNeon += neonNum
          
          if (localNum === neonNum) {
            if (localNum > 0) {
              log(`✅ ${table}: ${localNum} enregistrements`, 'green')
            }
            matchingTables++
          } else {
            log(`❌ ${table}: Local=${localNum}, Neon=${neonNum}`, 'red')
            this.validationResults.errors.push(`Table ${table}: count mismatch (${localNum} vs ${neonNum})`)
          }
        } catch (error) {
          log(`⚠️ Erreur ${table}: ${error.message}`, 'yellow')
        }
      }
      
      this.validationResults.database_comparison = {
        local_tables: localTableNames.length,
        neon_tables: neonTableNames.length,
        common_tables: commonTables.length,
        matching_tables: matchingTables,
        total_local_records: totalLocal,
        total_neon_records: totalNeon,
        records_match: totalLocal === totalNeon
      }
      
      log(`\n📈 RÉSUMÉ COMPARAISON:`, 'bold')
      log(`Tables correspondantes: ${matchingTables}/${commonTables.length}`, matchingTables === commonTables.length ? 'green' : 'red')
      log(`Total Local: ${totalLocal}`, 'blue')
      log(`Total Neon: ${totalNeon}`, 'blue')
      log(`Correspondance: ${totalLocal === totalNeon ? '✅' : '❌'}`, totalLocal === totalNeon ? 'green' : 'red')
      
    } catch (error) {
      log(`❌ Erreur comparaison: ${error.message}`, 'red')
      this.validationResults.errors.push(`Table comparison: ${error.message}`)
    }
  }

  async testStrapiAPIs() {
    log('\n🔌 Test des APIs Strapi...', 'blue')
    
    const endpoints = [
      'formations',
      'formation-categories',
      'formateurs',
      'testimonials',
      'partners',
      'blog-articles',
      'site-settings'
    ]
    
    let successCount = 0
    
    for (const endpoint of endpoints) {
      try {
        log(`   Testing ${endpoint}...`, 'cyan')
        
        const response = await makeRequest(`${STRAPI_NEON_URL}/api/${endpoint}?populate=*`)
        
        if (response.status === 200) {
          const data = response.data.data || []
          const count = Array.isArray(data) ? data.length : (data ? 1 : 0)
          log(`   ✅ ${endpoint}: ${count} éléments`, 'green')
          successCount++
          
          this.validationResults.api_tests[endpoint] = {
            status: 'success',
            count: count,
            response_time: 'OK'
          }
        } else {
          log(`   ❌ ${endpoint}: Status ${response.status}`, 'red')
          this.validationResults.api_tests[endpoint] = {
            status: 'error',
            error: `HTTP ${response.status}`
          }
        }
      } catch (error) {
        log(`   ❌ ${endpoint}: ${error.message}`, 'red')
        this.validationResults.api_tests[endpoint] = {
          status: 'error',
          error: error.message
        }
      }
      
      // Pause pour éviter la surcharge
      await new Promise(resolve => setTimeout(resolve, 500))
    }
    
    log(`\n📊 APIs testées: ${successCount}/${endpoints.length}`, successCount === endpoints.length ? 'green' : 'yellow')
  }

  async validateDataIntegrity() {
    log('\n🔍 Validation de l\'intégrité des données...', 'blue')
    
    try {
      // Test 1: Formations avec catégories
      const formationsResult = await this.neonClient.query(`
        SELECT 
          COUNT(*) as total_formations,
          COUNT(CASE WHEN category_id IS NOT NULL THEN 1 END) as with_category,
          COUNT(CASE WHEN published_at IS NOT NULL THEN 1 END) as published
        FROM formations
      `)
      
      const formations = formationsResult.rows[0]
      log(`📚 Formations: ${formations.total_formations} total, ${formations.with_category} avec catégorie, ${formations.published} publiées`, 'cyan')
      
      // Test 2: Relations formations-catégories
      const categoriesResult = await this.neonClient.query(`
        SELECT 
          fc.name,
          fc.slug,
          COUNT(f.id) as formations_count
        FROM formation_categories fc
        LEFT JOIN formations f ON f.category_id = fc.id
        GROUP BY fc.id, fc.name, fc.slug
        ORDER BY formations_count DESC
      `)
      
      log('🏷️ Catégories et leurs formations:', 'cyan')
      for (const cat of categoriesResult.rows) {
        log(`   ${cat.name} (${cat.slug}): ${cat.formations_count} formations`, 'blue')
      }
      
      // Test 3: Médias et uploads
      const mediaResult = await this.neonClient.query(`
        SELECT 
          COUNT(*) as total_files,
          COUNT(CASE WHEN mime LIKE 'image/%' THEN 1 END) as images,
          COUNT(CASE WHEN mime LIKE 'application/pdf' THEN 1 END) as pdfs
        FROM upload_files
      `)
      
      const media = mediaResult.rows[0]
      log(`🖼️ Médias: ${media.total_files} fichiers (${media.images} images, ${media.pdfs} PDFs)`, 'cyan')
      
      this.validationResults.data_integrity = {
        formations: {
          total: parseInt(formations.total_formations),
          with_category: parseInt(formations.with_category),
          published: parseInt(formations.published)
        },
        categories: categoriesResult.rows.length,
        media: {
          total: parseInt(media.total_files),
          images: parseInt(media.images),
          pdfs: parseInt(media.pdfs)
        }
      }
      
    } catch (error) {
      log(`❌ Erreur validation intégrité: ${error.message}`, 'red')
      this.validationResults.errors.push(`Data integrity: ${error.message}`)
    }
  }

  async testPerformance() {
    log('\n⚡ Test de performance...', 'blue')
    
    const tests = [
      {
        name: 'Formations list',
        query: 'SELECT * FROM formations LIMIT 10'
      },
      {
        name: 'Formations with categories',
        query: `
          SELECT f.*, fc.name as category_name 
          FROM formations f 
          LEFT JOIN formation_categories fc ON fc.id = f.category_id 
          LIMIT 10
        `
      },
      {
        name: 'Count all tables',
        query: `
          SELECT 
            schemaname,
            tablename,
            n_live_tup as row_count
          FROM pg_stat_user_tables 
          WHERE schemaname = 'public'
        `
      }
    ]
    
    for (const test of tests) {
      try {
        const startTime = Date.now()
        await this.neonClient.query(test.query)
        const duration = Date.now() - startTime
        
        log(`   ✅ ${test.name}: ${duration}ms`, duration < 1000 ? 'green' : 'yellow')
        
        this.validationResults.performance[test.name] = {
          duration_ms: duration,
          status: duration < 2000 ? 'good' : 'slow'
        }
      } catch (error) {
        log(`   ❌ ${test.name}: ${error.message}`, 'red')
        this.validationResults.performance[test.name] = {
          error: error.message,
          status: 'failed'
        }
      }
    }
  }

  async generateValidationReport() {
    log('\n📋 Génération du rapport de validation...', 'blue')
    
    const report = {
      timestamp: new Date().toISOString(),
      migration_validation: {
        database_comparison: this.validationResults.database_comparison,
        api_tests: this.validationResults.api_tests,
        data_integrity: this.validationResults.data_integrity,
        performance: this.validationResults.performance,
        errors: this.validationResults.errors
      },
      summary: {
        total_errors: this.validationResults.errors.length,
        database_match: this.validationResults.database_comparison.records_match,
        apis_working: Object.values(this.validationResults.api_tests).filter(t => t.status === 'success').length,
        total_apis_tested: Object.keys(this.validationResults.api_tests).length,
        migration_success: this.validationResults.errors.length === 0 && this.validationResults.database_comparison.records_match
      },
      recommendations: []
    }
    
    // Ajouter des recommandations
    if (this.validationResults.errors.length > 0) {
      report.recommendations.push('Corriger les erreurs identifiées avant de continuer')
    }
    
    if (!this.validationResults.database_comparison.records_match) {
      report.recommendations.push('Vérifier la migration des données - comptages non correspondants')
    }
    
    const apiSuccessRate = report.summary.apis_working / report.summary.total_apis_tested
    if (apiSuccessRate < 1) {
      report.recommendations.push('Vérifier la configuration des APIs Strapi')
    }
    
    if (report.summary.migration_success) {
      report.recommendations.push('Migration validée avec succès - prêt pour la production')
    }
    
    // Sauvegarder le rapport
    const fs = require('fs')
    const path = require('path')
    const reportFile = path.join(process.cwd(), 'backups', 'migration', `validation_report_${new Date().toISOString().split('T')[0]}.json`)
    
    try {
      fs.writeFileSync(reportFile, JSON.stringify(report, null, 2))
      log(`📄 Rapport sauvegardé: ${reportFile}`, 'green')
    } catch (error) {
      log(`⚠️ Impossible de sauvegarder le rapport: ${error.message}`, 'yellow')
    }
    
    return report
  }

  async runCompleteValidation() {
    log('🔍 VALIDATION COMPLÈTE DE LA MIGRATION', 'bold')
    log('=' .repeat(60), 'bold')
    
    // 1. Connexion
    const connected = await this.connectDatabases()
    if (!connected) {
      return false
    }
    
    // 2. Comparaison des bases de données
    await this.compareTableCounts()
    
    // 3. Test des APIs
    await this.testStrapiAPIs()
    
    // 4. Validation de l'intégrité
    await this.validateDataIntegrity()
    
    // 5. Test de performance
    await this.testPerformance()
    
    // 6. Génération du rapport
    const report = await this.generateValidationReport()
    
    // 7. Résumé final
    this.printFinalSummary(report)
    
    return report.summary.migration_success
  }

  printFinalSummary(report) {
    log('\n🎯 RÉSUMÉ FINAL DE LA VALIDATION', 'bold')
    log('=' .repeat(50), 'bold')
    
    const summary = report.summary
    
    log(`Migration réussie: ${summary.migration_success ? '✅' : '❌'}`, summary.migration_success ? 'green' : 'red')
    log(`Correspondance BDD: ${summary.database_match ? '✅' : '❌'}`, summary.database_match ? 'green' : 'red')
    log(`APIs fonctionnelles: ${summary.apis_working}/${summary.total_apis_tested}`, summary.apis_working === summary.total_apis_tested ? 'green' : 'yellow')
    log(`Erreurs détectées: ${summary.total_errors}`, summary.total_errors === 0 ? 'green' : 'red')
    
    if (report.recommendations.length > 0) {
      log('\n📝 RECOMMANDATIONS:', 'yellow')
      report.recommendations.forEach(rec => {
        log(`   • ${rec}`, 'cyan')
      })
    }
    
    if (summary.migration_success) {
      log('\n🎉 MIGRATION VALIDÉE AVEC SUCCÈS !', 'green')
      log('Votre base de données Neon est prête pour la production.', 'cyan')
    } else {
      log('\n⚠️ PROBLÈMES DÉTECTÉS', 'yellow')
      log('Consultez les erreurs ci-dessus et corrigez avant de continuer.', 'cyan')
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
async function runValidation() {
  const validator = new MigrationValidator()
  
  try {
    const success = await validator.runCompleteValidation()
    process.exit(success ? 0 : 1)
  } catch (error) {
    log(`❌ Erreur fatale: ${error.message}`, 'red')
    console.error(error)
    process.exit(1)
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
  
  runValidation()
}

module.exports = { MigrationValidator }