#!/usr/bin/env node

/**
 * MIGRATION AVEC CORRECTION DES CHAMPS JSON
 * 
 * Ce script corrige les problèmes de champs JSON lors de la migration
 * en convertissant correctement les données entre les formats.
 */

const { Client } = require('pg')

// Configuration des bases de données
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

// Tables avec des champs JSON problématiques
const TABLES_WITH_JSON = {
  'formations': ['content', 'seo', 'metadata'],
  'formateurs': ['bio', 'competences', 'certifications'],
  'articles_blog': ['content', 'seo'],
  'vae_formules': ['details', 'avantages'],
  'valeurs_ecole': ['description', 'details']
}

class JsonFieldsMigrator {
  constructor() {
    this.localClient = null
    this.neonClient = null
    this.migrationStats = {
      tablesProcessed: 0,
      recordsMigrated: 0,
      jsonFieldsFixed: 0,
      errors: 0
    }
  }

  async connectDatabases() {
    log('🔌 Connexion aux bases de données...', 'blue')
    
    try {
      this.localClient = new Client(LOCAL_DB_CONFIG)
      await this.localClient.connect()
      log('✅ Connexion locale établie', 'green')
      
      this.neonClient = new Client(NEON_DB_CONFIG)
      await this.neonClient.connect()
      log('✅ Connexion Neon établie', 'green')
      
      return true
    } catch (error) {
      log(`❌ Erreur de connexion: ${error.message}`, 'red')
      return false
    }
  }

  async getTableStructure(tableName) {
    try {
      const result = await this.localClient.query(`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns
        WHERE table_name = $1
        ORDER BY ordinal_position
      `, [tableName])
      
      return result.rows
    } catch (error) {
      log(`❌ Erreur structure ${tableName}: ${error.message}`, 'red')
      return []
    }
  }

  sanitizeJsonValue(value, columnName) {
    if (value === null || value === undefined) {
      return null
    }
    
    // Si c'est déjà un objet, le convertir en string JSON
    if (typeof value === 'object') {
      try {
        return JSON.stringify(value)
      } catch (error) {
        log(`⚠️ Erreur conversion JSON pour ${columnName}: ${error.message}`, 'yellow')
        return null
      }
    }
    
    // Si c'est une string, vérifier si c'est du JSON valide
    if (typeof value === 'string') {
      if (value.trim() === '') {
        return null
      }
      
      try {
        // Tenter de parser pour valider
        JSON.parse(value)
        return value
      } catch (error) {
        // Si ce n'est pas du JSON valide, l'encapsuler
        try {
          return JSON.stringify({ content: value })
        } catch (error2) {
          log(`⚠️ Impossible de convertir ${columnName}: ${value.substring(0, 50)}...`, 'yellow')
          return null
        }
      }
    }
    
    // Pour les autres types, les convertir en JSON
    try {
      return JSON.stringify(value)
    } catch (error) {
      log(`⚠️ Type non supporté pour ${columnName}: ${typeof value}`, 'yellow')
      return null
    }
  }

  async sanitizeRowData(tableName, row, structure) {
    const sanitizedRow = { ...row }
    const jsonColumns = TABLES_WITH_JSON[tableName] || []
    
    // Identifier les colonnes JSON dans la structure
    const jsonStructureColumns = structure
      .filter(col => col.data_type === 'json' || col.data_type === 'jsonb')
      .map(col => col.column_name)
    
    const allJsonColumns = [...new Set([...jsonColumns, ...jsonStructureColumns])]
    
    for (const column of allJsonColumns) {
      if (sanitizedRow[column] !== undefined) {
        const originalValue = sanitizedRow[column]
        const sanitizedValue = this.sanitizeJsonValue(originalValue, column)
        
        if (sanitizedValue !== originalValue) {
          sanitizedRow[column] = sanitizedValue
          this.migrationStats.jsonFieldsFixed++
        }
      }
    }
    
    return sanitizedRow
  }

  async migrateTableWithJsonFix(tableName) {
    log(`\n🔄 Migration avec correction JSON: ${tableName}`, 'cyan')
    
    try {
      // 1. Récupérer la structure
      const structure = await this.getTableStructure(tableName)
      if (structure.length === 0) {
        log(`⚠️ Structure ${tableName} introuvable`, 'yellow')
        return false
      }
      
      // 2. Récupérer les données locales
      const localResult = await this.localClient.query(`SELECT * FROM "${tableName}"`)
      const localRows = localResult.rows
      
      log(`📊 ${localRows.length} enregistrements à migrer`, 'blue')
      
      if (localRows.length === 0) {
        log(`✅ Table ${tableName} vide`, 'green')
        return true
      }
      
      // 3. Vider la table Neon
      try {
        await this.neonClient.query(`DELETE FROM "${tableName}"`)
        log(`🧹 Table ${tableName} vidée`, 'yellow')
      } catch (error) {
        log(`⚠️ Impossible de vider ${tableName}: ${error.message}`, 'yellow')
      }
      
      // 4. Migrer ligne par ligne avec correction JSON
      let successCount = 0
      let errorCount = 0
      
      for (let i = 0; i < localRows.length; i++) {
        try {
          const originalRow = localRows[i]
          const sanitizedRow = await this.sanitizeRowData(tableName, originalRow, structure)
          
          // Préparer la requête d'insertion
          const columns = Object.keys(sanitizedRow)
          const values = columns.map(col => sanitizedRow[col])
          const placeholders = values.map((_, idx) => `$${idx + 1}`).join(', ')
          const columnNames = columns.map(col => `"${col}"`).join(', ')
          
          const insertQuery = `INSERT INTO "${tableName}" (${columnNames}) VALUES (${placeholders})`
          
          await this.neonClient.query(insertQuery, values)
          successCount++
          
        } catch (error) {
          errorCount++
          if (errorCount <= 3) {
            log(`⚠️ Erreur ligne ${i + 1}: ${error.message}`, 'yellow')
          }
        }
      }
      
      if (errorCount > 3) {
        log(`⚠️ ... et ${errorCount - 3} autres erreurs`, 'yellow')
      }
      
      this.migrationStats.recordsMigrated += successCount
      this.migrationStats.errors += errorCount
      
      log(`✅ ${successCount}/${localRows.length} lignes migrées pour ${tableName}`, 
          successCount === localRows.length ? 'green' : 'yellow')
      
      return successCount > 0
      
    } catch (error) {
      log(`❌ Erreur migration ${tableName}: ${error.message}`, 'red')
      this.migrationStats.errors++
      return false
    }
  }

  async runJsonFixMigration() {
    log('🔧 MIGRATION AVEC CORRECTION JSON', 'bold')
    log('=' .repeat(45), 'bold')
    
    // 1. Connexion
    const connected = await this.connectDatabases()
    if (!connected) {
      return false
    }
    
    // 2. Migrer les tables avec des champs JSON
    const tablesToFix = Object.keys(TABLES_WITH_JSON)
    
    log(`\n📋 ${tablesToFix.length} tables avec champs JSON à corriger`, 'blue')
    
    for (let i = 0; i < tablesToFix.length; i++) {
      const table = tablesToFix[i]
      const progress = `[${i + 1}/${tablesToFix.length}]`
      
      log(`\n${progress} Correction: ${table}`, 'magenta')
      
      const success = await this.migrateTableWithJsonFix(table)
      this.migrationStats.tablesProcessed++
      
      if (!success) {
        log(`❌ Échec correction ${table}`, 'red')
      }
      
      // Pause
      await new Promise(resolve => setTimeout(resolve, 200))
    }
    
    // 3. Vérification
    await this.verifyJsonMigration()
    
    // 4. Statistiques
    this.printFinalStats()
    
    return this.migrationStats.errors === 0
  }

  async verifyJsonMigration() {
    log('\n🔍 Vérification des corrections JSON...', 'blue')
    
    for (const tableName of Object.keys(TABLES_WITH_JSON)) {
      try {
        const localResult = await this.localClient.query(`SELECT COUNT(*) FROM "${tableName}"`)
        const neonResult = await this.neonClient.query(`SELECT COUNT(*) FROM "${tableName}"`)
        
        const localCount = parseInt(localResult.rows[0].count)
        const neonCount = parseInt(neonResult.rows[0].count)
        
        if (localCount === neonCount) {
          log(`✅ ${tableName}: ${neonCount} enregistrements`, 'green')
        } else {
          log(`❌ ${tableName}: Local=${localCount}, Neon=${neonCount}`, 'red')
        }
      } catch (error) {
        log(`⚠️ Erreur vérification ${tableName}: ${error.message}`, 'yellow')
      }
    }
  }

  printFinalStats() {
    log('\n📊 STATISTIQUES CORRECTION JSON', 'bold')
    log('=' .repeat(40), 'bold')
    log(`Tables traitées: ${this.migrationStats.tablesProcessed}`, 'blue')
    log(`Enregistrements migrés: ${this.migrationStats.recordsMigrated}`, 'green')
    log(`Champs JSON corrigés: ${this.migrationStats.jsonFieldsFixed}`, 'cyan')
    log(`Erreurs: ${this.migrationStats.errors}`, this.migrationStats.errors > 0 ? 'red' : 'green')
    
    if (this.migrationStats.errors === 0) {
      log('\n🎉 CORRECTION JSON RÉUSSIE !', 'green')
    } else {
      log('\n⚠️ Correction terminée avec des erreurs', 'yellow')
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
async function runJsonFixMigration() {
  const migrator = new JsonFieldsMigrator()
  
  try {
    const success = await migrator.runJsonFixMigration()
    return success
  } catch (error) {
    log(`❌ Erreur fatale: ${error.message}`, 'red')
    console.error(error)
    return false
  } finally {
    await migrator.cleanup()
  }
}

// Point d'entrée
if (require.main === module) {
  if (!process.env.DATABASE_URL) {
    log('❌ Variable DATABASE_URL manquante', 'red')
    process.exit(1)
  }
  
  runJsonFixMigration().then(success => {
    process.exit(success ? 0 : 1)
  })
}

module.exports = { JsonFieldsMigrator }