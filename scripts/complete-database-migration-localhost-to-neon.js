#!/usr/bin/env node

/**
 * MIGRATION COMPLÈTE DE LA BASE DE DONNÉES LOCALHOST VERS NEON
 * 
 * Ce script effectue une migration complète de toutes les données
 * de la base de données locale vers Neon PostgreSQL.
 * 
 * ÉTAPES:
 * 1. Connexion aux deux bases de données
 * 2. Export complet des données locales
 * 3. Nettoyage de la base Neon
 * 4. Import complet vers Neon
 * 5. Vérification de l'intégrité
 */

const https = require('https')
const { Client } = require('pg')

// Configuration des bases de données
const LOCAL_DB_CONFIG = {
  host: '127.0.0.1',
  port: 5432,
  database: 'cma_cms',
  user: 'postgres',
  password: 'root'
}

// Configuration Neon (à remplacer par vos vraies credentials)
const NEON_DB_CONFIG = {
  connectionString: process.env.DATABASE_URL || 'postgresql://username:password@host/database?sslmode=require',
  ssl: {
    rejectUnauthorized: false
  }
}

// Configuration Strapi
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
    const httpModule = isHttps ? https : require('http')
    
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
        ...options.headers
      }
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
    
    if (options.body) {
      req.write(JSON.stringify(options.body))
    }
    
    req.end()
  })
}

// Collections à migrer dans l'ordre (important pour les relations)
const MIGRATION_ORDER = [
  // 1. Collections de base sans relations
  'upload_folders',
  'upload_files',
  'i18n_locale',
  'users_permissions_permission',
  'users_permissions_role',
  'users_permissions_user',
  
  // 2. Collections de configuration
  'admin_permissions',
  'admin_roles',
  'admin_users',
  
  // 3. Collections métier de base
  'formation_categories',
  'formateurs',
  'partners',
  
  // 4. Collections avec relations simples
  'formations',
  'testimonials',
  'blog_articles',
  'modalites',
  'processus_admissions',
  'statistique_sites',
  'chiffre_cles',
  'methode_pedagogiques',
  'outil_pedagogiques',
  'vae_certifications',
  'vae_faqs',
  'entreprise_modalites',
  'etape_admissions',
  
  // 5. Pages et contenus complexes
  'pages',
  'page_entreprises',
  'page_vaes',
  'page_admissions',
  'page_partenaires',
  'site_settings'
]

class DatabaseMigrator {
  constructor() {
    this.localClient = null
    this.neonClient = null
    this.migrationStats = {
      tablesProcessed: 0,
      recordsMigrated: 0,
      errors: 0,
      startTime: new Date()
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
      this.neonClient = new Client(NEON_DB_CONFIG)
      await this.neonClient.connect()
      log('✅ Connexion Neon établie', 'green')
      
      return true
    } catch (error) {
      log(`❌ Erreur de connexion: ${error.message}`, 'red')
      return false
    }
  }

  async getTableList() {
    log('📋 Récupération de la liste des tables...', 'blue')
    
    try {
      const result = await this.localClient.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_type = 'BASE TABLE'
        ORDER BY table_name
      `)
      
      const tables = result.rows.map(row => row.table_name)
      log(`📊 ${tables.length} tables trouvées`, 'cyan')
      
      return tables
    } catch (error) {
      log(`❌ Erreur récupération tables: ${error.message}`, 'red')
      return []
    }
  }

  async getTableStructure(tableName) {
    try {
      const result = await this.localClient.query(`
        SELECT column_name, data_type, is_nullable, column_default
        FROM information_schema.columns
        WHERE table_name = $1
        ORDER BY ordinal_position
      `, [tableName])
      
      return result.rows
    } catch (error) {
      log(`❌ Erreur structure table ${tableName}: ${error.message}`, 'red')
      return []
    }
  }

  async getTableData(tableName) {
    try {
      const countResult = await this.localClient.query(`SELECT COUNT(*) FROM "${tableName}"`)
      const count = parseInt(countResult.rows[0].count)
      
      if (count === 0) {
        return { count: 0, rows: [] }
      }
      
      const dataResult = await this.localClient.query(`SELECT * FROM "${tableName}"`)
      return { count, rows: dataResult.rows }
    } catch (error) {
      log(`❌ Erreur données table ${tableName}: ${error.message}`, 'red')
      return { count: 0, rows: [] }
    }
  }

  async clearNeonTable(tableName) {
    try {
      // Désactiver les contraintes temporairement
      await this.neonClient.query('SET session_replication_role = replica')
      
      // Vider la table
      await this.neonClient.query(`TRUNCATE TABLE "${tableName}" RESTART IDENTITY CASCADE`)
      
      log(`🧹 Table ${tableName} vidée`, 'yellow')
      return true
    } catch (error) {
      log(`⚠️ Impossible de vider ${tableName}: ${error.message}`, 'yellow')
      return false
    }
  }

  async insertDataToNeon(tableName, rows) {
    if (rows.length === 0) return true

    try {
      // Désactiver les contraintes temporairement
      await this.neonClient.query('SET session_replication_role = replica')
      
      const columns = Object.keys(rows[0])
      const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ')
      const columnNames = columns.map(col => `"${col}"`).join(', ')
      
      const insertQuery = `INSERT INTO "${tableName}" (${columnNames}) VALUES (${placeholders})`
      
      let inserted = 0
      for (const row of rows) {
        try {
          const values = columns.map(col => row[col])
          await this.neonClient.query(insertQuery, values)
          inserted++
        } catch (error) {
          log(`⚠️ Erreur insertion ligne dans ${tableName}: ${error.message}`, 'yellow')
        }
      }
      
      // Réactiver les contraintes
      await this.neonClient.query('SET session_replication_role = DEFAULT')
      
      log(`✅ ${inserted}/${rows.length} lignes insérées dans ${tableName}`, 'green')
      return true
    } catch (error) {
      log(`❌ Erreur insertion ${tableName}: ${error.message}`, 'red')
      return false
    }
  }

  async migrateTable(tableName) {
    log(`\n🔄 Migration de la table: ${tableName}`, 'cyan')
    
    try {
      // 1. Récupérer la structure
      const structure = await this.getTableStructure(tableName)
      if (structure.length === 0) {
        log(`⚠️ Table ${tableName} introuvable ou vide`, 'yellow')
        return false
      }
      
      // 2. Récupérer les données
      const { count, rows } = await this.getTableData(tableName)
      log(`📊 ${count} enregistrements à migrer`, 'blue')
      
      if (count === 0) {
        log(`✅ Table ${tableName} vide - migration terminée`, 'green')
        return true
      }
      
      // 3. Vider la table de destination
      await this.clearNeonTable(tableName)
      
      // 4. Insérer les données
      const success = await this.insertDataToNeon(tableName, rows)
      
      if (success) {
        this.migrationStats.recordsMigrated += count
        log(`✅ Migration ${tableName} terminée: ${count} enregistrements`, 'green')
      }
      
      return success
    } catch (error) {
      log(`❌ Erreur migration ${tableName}: ${error.message}`, 'red')
      this.migrationStats.errors++
      return false
    }
  }

  async resetSequences() {
    log('\n🔄 Réinitialisation des séquences...', 'blue')
    
    try {
      const result = await this.neonClient.query(`
        SELECT schemaname, tablename, attname, seq_name
        FROM (
          SELECT 
            schemaname,
            tablename,
            attname,
            CASE 
              WHEN split_part(split_part(array_to_string(con.conkey, ' '), ' ', 1), ' ', 1)::int = a.attnum 
              THEN pg_get_serial_sequence(schemaname||'.'||tablename, attname) 
            END AS seq_name
          FROM pg_attribute a
          JOIN pg_class c ON c.oid = a.attrelid
          JOIN pg_namespace n ON n.oid = c.relnamespace
          JOIN pg_constraint con ON con.conrelid = c.oid
          JOIN pg_tables t ON t.tablename = c.relname AND t.schemaname = n.nspname
          WHERE a.attnum > 0 
          AND pg_get_serial_sequence(schemaname||'.'||tablename, attname) IS NOT NULL
        ) AS sequences
        WHERE seq_name IS NOT NULL
      `)
      
      for (const row of result.rows) {
        try {
          await this.neonClient.query(`
            SELECT setval('${row.seq_name}', COALESCE((SELECT MAX(${row.attname}) FROM ${row.schemaname}.${row.tablename}), 1))
          `)
          log(`✅ Séquence ${row.seq_name} réinitialisée`, 'green')
        } catch (error) {
          log(`⚠️ Erreur séquence ${row.seq_name}: ${error.message}`, 'yellow')
        }
      }
    } catch (error) {
      log(`❌ Erreur réinitialisation séquences: ${error.message}`, 'red')
    }
  }

  async verifyMigration() {
    log('\n🔍 Vérification de la migration...', 'blue')
    
    const tables = await this.getTableList()
    let totalLocal = 0
    let totalNeon = 0
    
    for (const table of tables) {
      try {
        // Compter local
        const localResult = await this.localClient.query(`SELECT COUNT(*) FROM "${table}"`)
        const localCount = parseInt(localResult.rows[0].count)
        
        // Compter Neon
        const neonResult = await this.neonClient.query(`SELECT COUNT(*) FROM "${table}"`)
        const neonCount = parseInt(neonResult.rows[0].count)
        
        totalLocal += localCount
        totalNeon += neonCount
        
        if (localCount === neonCount) {
          if (localCount > 0) {
            log(`✅ ${table}: ${localCount} enregistrements`, 'green')
          }
        } else {
          log(`❌ ${table}: Local=${localCount}, Neon=${neonCount}`, 'red')
        }
      } catch (error) {
        log(`⚠️ Erreur vérification ${table}: ${error.message}`, 'yellow')
      }
    }
    
    log(`\n📊 RÉSUMÉ VÉRIFICATION:`, 'bold')
    log(`Total Local: ${totalLocal}`, 'blue')
    log(`Total Neon: ${totalNeon}`, 'blue')
    log(`Correspondance: ${totalLocal === totalNeon ? '✅' : '❌'}`, totalLocal === totalNeon ? 'green' : 'red')
  }

  async runMigration() {
    log('🚀 DÉBUT DE LA MIGRATION COMPLÈTE', 'bold')
    log('=' .repeat(60), 'bold')
    
    // 1. Connexion
    const connected = await this.connectDatabases()
    if (!connected) {
      log('❌ Impossible de se connecter aux bases de données', 'red')
      return false
    }
    
    // 2. Récupérer la liste des tables
    const tables = await this.getTableList()
    if (tables.length === 0) {
      log('❌ Aucune table trouvée', 'red')
      return false
    }
    
    // 3. Ordonner les tables selon les dépendances
    const orderedTables = this.orderTablesByDependencies(tables)
    
    log(`\n📋 ${orderedTables.length} tables à migrer`, 'blue')
    log('Ordre de migration:', 'yellow')
    orderedTables.forEach((table, index) => {
      log(`   ${index + 1}. ${table}`, 'cyan')
    })
    
    // 4. Migration table par table
    log('\n🔄 DÉBUT DE LA MIGRATION DES DONNÉES', 'bold')
    
    for (let i = 0; i < orderedTables.length; i++) {
      const table = orderedTables[i]
      const progress = `[${i + 1}/${orderedTables.length}]`
      
      log(`\n${progress} Migration: ${table}`, 'magenta')
      
      const success = await this.migrateTable(table)
      this.migrationStats.tablesProcessed++
      
      if (!success) {
        log(`❌ Échec migration ${table}`, 'red')
      }
      
      // Pause pour éviter la surcharge
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    
    // 5. Réinitialiser les séquences
    await this.resetSequences()
    
    // 6. Vérification
    await this.verifyMigration()
    
    // 7. Statistiques finales
    this.printFinalStats()
    
    return true
  }

  orderTablesByDependencies(tables) {
    // Ordre basé sur les dépendances connues
    const priorityOrder = [
      'i18n_locale',
      'upload_folders',
      'upload_files',
      'users_permissions_permission',
      'users_permissions_role',
      'users_permissions_user',
      'admin_permissions',
      'admin_roles',
      'admin_users',
      'formation_categories',
      'formateurs',
      'partners',
      'formations',
      'testimonials',
      'blog_articles',
      'modalites',
      'processus_admissions',
      'statistique_sites',
      'chiffre_cles',
      'methode_pedagogiques',
      'outil_pedagogiques',
      'vae_certifications',
      'vae_faqs',
      'entreprise_modalites',
      'etape_admissions',
      'pages',
      'page_entreprises',
      'page_vaes',
      'page_admissions',
      'page_partenaires',
      'site_settings'
    ]
    
    const ordered = []
    const remaining = [...tables]
    
    // Ajouter les tables dans l'ordre de priorité
    for (const priority of priorityOrder) {
      const index = remaining.indexOf(priority)
      if (index !== -1) {
        ordered.push(priority)
        remaining.splice(index, 1)
      }
    }
    
    // Ajouter les tables restantes
    ordered.push(...remaining.sort())
    
    return ordered
  }

  printFinalStats() {
    const duration = new Date() - this.migrationStats.startTime
    const minutes = Math.floor(duration / 60000)
    const seconds = Math.floor((duration % 60000) / 1000)
    
    log('\n📊 STATISTIQUES FINALES', 'bold')
    log('=' .repeat(40), 'bold')
    log(`Tables traitées: ${this.migrationStats.tablesProcessed}`, 'blue')
    log(`Enregistrements migrés: ${this.migrationStats.recordsMigrated}`, 'green')
    log(`Erreurs: ${this.migrationStats.errors}`, this.migrationStats.errors > 0 ? 'red' : 'green')
    log(`Durée: ${minutes}m ${seconds}s`, 'cyan')
    
    if (this.migrationStats.errors === 0) {
      log('\n🎉 MIGRATION TERMINÉE AVEC SUCCÈS !', 'green')
    } else {
      log('\n⚠️ Migration terminée avec des erreurs', 'yellow')
    }
  }

  async cleanup() {
    if (this.localClient) {
      await this.localClient.end()
      log('🔌 Connexion locale fermée', 'blue')
    }
    
    if (this.neonClient) {
      await this.neonClient.end()
      log('🔌 Connexion Neon fermée', 'blue')
    }
  }
}

// Fonction principale
async function runCompleteMigration() {
  const migrator = new DatabaseMigrator()
  
  try {
    await migrator.runMigration()
  } catch (error) {
    log(`❌ Erreur fatale: ${error.message}`, 'red')
    console.error(error)
  } finally {
    await migrator.cleanup()
  }
}

// Vérification des prérequis
function checkPrerequisites() {
  log('🔍 Vérification des prérequis...', 'blue')
  
  if (!process.env.DATABASE_URL) {
    log('❌ Variable DATABASE_URL manquante', 'red')
    log('Ajoutez votre URL de connexion Neon dans DATABASE_URL', 'yellow')
    return false
  }
  
  log('✅ Prérequis validés', 'green')
  return true
}

// Point d'entrée
if (require.main === module) {
  if (checkPrerequisites()) {
    runCompleteMigration()
  } else {
    process.exit(1)
  }
}

module.exports = { DatabaseMigrator }