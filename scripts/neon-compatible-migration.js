#!/usr/bin/env node

/**
 * MIGRATION COMPATIBLE NEON
 * 
 * Ce script effectue une migration adaptée aux limitations de Neon PostgreSQL
 * sans utiliser session_replication_role qui n'est pas autorisé.
 */

const https = require('https')
const http = require('http')
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
  cyan: '\x1b[36m',
  magenta: '\x1b[35m'
}

function log(message, color = 'reset') {
  const timestamp = new Date().toLocaleTimeString()
  console.log(`${colors[color]}[${timestamp}] ${message}${colors.reset}`)
}

// Tables critiques à migrer en priorité (avec données importantes)
const CRITICAL_TABLES = [
  'formations',
  'formation_categories',
  'formateurs',
  'testimonials',
  'partners',
  'articles_blog',
  'categories_blog',
  'site_settings',
  'pages',
  'page_entreprises',
  'page_vaes',
  'page_admissions',
  'page_partenaires',
  'modalites',
  'processus_admissions',
  'statistiques_site',
  'entreprise_services',
  'formation_thematiques',
  'vae_formules',
  'valeurs_ecole',
  'upload_folders'
]

class NeonMigrator {
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
      if (!NEON_DB_CONFIG.connectionString) {
        throw new Error('DATABASE_URL non définie')
      }
      
      this.neonClient = new Client(NEON_DB_CONFIG)
      await this.neonClient.connect()
      log('✅ Connexion Neon établie', 'green')
      
      return true
    } catch (error) {
      log(`❌ Erreur de connexion: ${error.message}`, 'red')
      return false
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

  async clearNeonTableSafely(tableName) {
    try {
      // Méthode compatible Neon : DELETE au lieu de TRUNCATE
      const result = await this.neonClient.query(`DELETE FROM "${tableName}"`)
      log(`🧹 Table ${tableName} vidée (${result.rowCount} lignes supprimées)`, 'yellow')
      return true
    } catch (error) {
      log(`⚠️ Impossible de vider ${tableName}: ${error.message}`, 'yellow')
      return false
    }
  }

  async insertDataToNeonSafely(tableName, rows) {
    if (rows.length === 0) return { success: true, inserted: 0 }

    try {
      const columns = Object.keys(rows[0])
      const columnNames = columns.map(col => `"${col}"`).join(', ')
      
      let inserted = 0
      let errors = 0
      
      for (const row of rows) {
        try {
          const values = columns.map(col => row[col])
          const placeholders = values.map((_, i) => `$${i + 1}`).join(', ')
          
          const insertQuery = `INSERT INTO "${tableName}" (${columnNames}) VALUES (${placeholders})`
          
          await this.neonClient.query(insertQuery, values)
          inserted++
        } catch (error) {
          errors++
          if (errors <= 3) { // Afficher seulement les 3 premières erreurs
            log(`⚠️ Erreur insertion ligne ${inserted + errors} dans ${tableName}: ${error.message}`, 'yellow')
          }
        }
      }
      
      if (errors > 3) {
        log(`⚠️ ... et ${errors - 3} autres erreurs d'insertion`, 'yellow')
      }
      
      log(`✅ ${inserted}/${rows.length} lignes insérées dans ${tableName}`, inserted === rows.length ? 'green' : 'yellow')
      return { success: inserted > 0, inserted, errors }
      
    } catch (error) {
      log(`❌ Erreur insertion ${tableName}: ${error.message}`, 'red')
      return { success: false, inserted: 0, errors: rows.length }
    }
  }

  async migrateTableSafely(tableName) {
    log(`\n🔄 Migration sécurisée: ${tableName}`, 'cyan')
    
    try {
      // 1. Récupérer les données locales
      const { count, rows } = await this.getTableData(tableName)
      log(`📊 ${count} enregistrements à migrer`, 'blue')
      
      if (count === 0) {
        log(`✅ Table ${tableName} vide - migration terminée`, 'green')
        return true
      }
      
      // 2. Vider la table Neon (si possible)
      await this.clearNeonTableSafely(tableName)
      
      // 3. Insérer les données par petits lots
      const batchSize = 10
      let totalInserted = 0
      
      for (let i = 0; i < rows.length; i += batchSize) {
        const batch = rows.slice(i, i + batchSize)
        const result = await this.insertDataToNeonSafely(tableName, batch)
        totalInserted += result.inserted
        
        // Pause entre les lots
        await new Promise(resolve => setTimeout(resolve, 100))
      }
      
      this.migrationStats.recordsMigrated += totalInserted
      
      if (totalInserted === count) {
        log(`✅ Migration ${tableName} terminée: ${totalInserted} enregistrements`, 'green')
        return true
      } else {
        log(`⚠️ Migration ${tableName} partielle: ${totalInserted}/${count} enregistrements`, 'yellow')
        return false
      }
      
    } catch (error) {
      log(`❌ Erreur migration ${tableName}: ${error.message}`, 'red')
      this.migrationStats.errors++
      return false
    }
  }

  async resetSequencesSafely() {
    log('\n🔄 Réinitialisation des séquences...', 'blue')
    
    try {
      // Récupérer les séquences existantes
      const result = await this.neonClient.query(`
        SELECT sequence_name, sequence_schema
        FROM information_schema.sequences
        WHERE sequence_schema = 'public'
      `)
      
      for (const row of result.rows) {
        try {
          const sequenceName = `${row.sequence_schema}.${row.sequence_name}`
          
          // Trouver la table et colonne associées
          const tableName = row.sequence_name.replace(/_id_seq$/, '')
          
          // Vérifier si la table existe et a des données
          const tableCheck = await this.neonClient.query(`
            SELECT COUNT(*) as count FROM "${tableName}"
          `)
          
          if (parseInt(tableCheck.rows[0].count) > 0) {
            await this.neonClient.query(`
              SELECT setval('${sequenceName}', COALESCE((SELECT MAX(id) FROM "${tableName}"), 1))
            `)
            log(`✅ Séquence ${sequenceName} réinitialisée`, 'green')
          }
        } catch (error) {
          log(`⚠️ Erreur séquence ${row.sequence_name}: ${error.message}`, 'yellow')
        }
      }
    } catch (error) {
      log(`❌ Erreur réinitialisation séquences: ${error.message}`, 'red')
    }
  }

  async verifyMigration() {
    log('\n🔍 Vérification de la migration...', 'blue')
    
    let totalLocal = 0
    let totalNeon = 0
    let matchingTables = 0
    
    for (const table of CRITICAL_TABLES) {
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
          matchingTables++
        } else {
          log(`❌ ${table}: Local=${localCount}, Neon=${neonCount}`, 'red')
        }
      } catch (error) {
        log(`⚠️ Erreur vérification ${table}: ${error.message}`, 'yellow')
      }
    }
    
    log(`\n📊 RÉSUMÉ VÉRIFICATION:`, 'bold')
    log(`Tables correspondantes: ${matchingTables}/${CRITICAL_TABLES.length}`, matchingTables === CRITICAL_TABLES.length ? 'green' : 'yellow')
    log(`Total Local: ${totalLocal}`, 'blue')
    log(`Total Neon: ${totalNeon}`, 'blue')
    log(`Correspondance: ${totalLocal === totalNeon ? '✅' : '❌'}`, totalLocal === totalNeon ? 'green' : 'red')
    
    return totalLocal === totalNeon
  }

  async runNeonMigration() {
    log('🚀 MIGRATION COMPATIBLE NEON', 'bold')
    log('=' .repeat(50), 'bold')
    
    // 1. Connexion
    const connected = await this.connectDatabases()
    if (!connected) {
      return false
    }
    
    // 2. Migration des tables critiques
    log(`\n📋 ${CRITICAL_TABLES.length} tables critiques à migrer`, 'blue')
    
    for (let i = 0; i < CRITICAL_TABLES.length; i++) {
      const table = CRITICAL_TABLES[i]
      const progress = `[${i + 1}/${CRITICAL_TABLES.length}]`
      
      log(`\n${progress} Migration: ${table}`, 'magenta')
      
      const success = await this.migrateTableSafely(table)
      this.migrationStats.tablesProcessed++
      
      if (!success) {
        log(`❌ Échec migration ${table}`, 'red')
      }
      
      // Pause pour éviter la surcharge
      await new Promise(resolve => setTimeout(resolve, 200))
    }
    
    // 3. Réinitialiser les séquences
    await this.resetSequencesSafely()
    
    // 4. Vérification
    const verified = await this.verifyMigration()
    
    // 5. Statistiques finales
    this.printFinalStats(verified)
    
    return verified
  }

  printFinalStats(verified) {
    const duration = new Date() - this.migrationStats.startTime
    const minutes = Math.floor(duration / 60000)
    const seconds = Math.floor((duration % 60000) / 1000)
    
    log('\n📊 STATISTIQUES FINALES', 'bold')
    log('=' .repeat(40), 'bold')
    log(`Tables traitées: ${this.migrationStats.tablesProcessed}`, 'blue')
    log(`Enregistrements migrés: ${this.migrationStats.recordsMigrated}`, 'green')
    log(`Erreurs: ${this.migrationStats.errors}`, this.migrationStats.errors > 0 ? 'red' : 'green')
    log(`Durée: ${minutes}m ${seconds}s`, 'cyan')
    log(`Vérification: ${verified ? '✅' : '❌'}`, verified ? 'green' : 'red')
    
    if (verified && this.migrationStats.errors === 0) {
      log('\n🎉 MIGRATION NEON RÉUSSIE !', 'green')
      log('Vos données critiques ont été migrées avec succès.', 'cyan')
    } else if (verified) {
      log('\n✅ MIGRATION NEON TERMINÉE', 'green')
      log('Données migrées avec quelques erreurs mineures.', 'yellow')
    } else {
      log('\n⚠️ MIGRATION NEON INCOMPLÈTE', 'yellow')
      log('Certaines données n\'ont pas pu être migrées.', 'cyan')
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
async function runNeonMigration() {
  const migrator = new NeonMigrator()
  
  try {
    const success = await migrator.runNeonMigration()
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
    log('Définissez votre URL de connexion Neon dans DATABASE_URL', 'yellow')
    process.exit(1)
  }
  
  runNeonMigration().then(success => {
    process.exit(success ? 0 : 1)
  })
}

module.exports = { NeonMigrator }