#!/usr/bin/env node

/**
 * SAUVEGARDE COMPLÈTE AVANT MIGRATION
 * 
 * Ce script crée une sauvegarde complète de la base de données locale
 * avant de procéder à la migration vers Neon.
 */

const { Client } = require('pg')
const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')

// Configuration
const LOCAL_DB_CONFIG = {
  host: '127.0.0.1',
  port: 5432,
  database: 'cma_cms',
  user: 'postgres',
  password: 'root'
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

class DatabaseBackup {
  constructor() {
    this.backupDir = path.join(process.cwd(), 'backups', 'migration')
    this.timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0]
  }

  async createBackupDirectory() {
    if (!fs.existsSync(this.backupDir)) {
      fs.mkdirSync(this.backupDir, { recursive: true })
      log(`📁 Dossier de sauvegarde créé: ${this.backupDir}`, 'blue')
    }
  }

  async testConnection() {
    log('🔌 Test de connexion à la base locale...', 'blue')
    
    try {
      const client = new Client(LOCAL_DB_CONFIG)
      await client.connect()
      
      const result = await client.query('SELECT COUNT(*) as table_count FROM information_schema.tables WHERE table_schema = \'public\'')
      const tableCount = result.rows[0].table_count
      
      log(`✅ Connexion réussie - ${tableCount} tables trouvées`, 'green')
      
      await client.end()
      return true
    } catch (error) {
      log(`❌ Erreur de connexion: ${error.message}`, 'red')
      return false
    }
  }

  async createSQLDump() {
    log('💾 Création du dump SQL complet...', 'blue')
    
    const dumpFile = path.join(this.backupDir, `cma_cms_backup_${this.timestamp}.sql`)
    
    return new Promise((resolve, reject) => {
      const pgDump = spawn('pg_dump', [
        '-h', LOCAL_DB_CONFIG.host,
        '-p', LOCAL_DB_CONFIG.port.toString(),
        '-U', LOCAL_DB_CONFIG.user,
        '-d', LOCAL_DB_CONFIG.database,
        '--no-password',
        '--verbose',
        '--clean',
        '--if-exists',
        '--create',
        '--format=plain',
        '--file', dumpFile
      ], {
        env: {
          ...process.env,
          PGPASSWORD: LOCAL_DB_CONFIG.password
        }
      })

      pgDump.stdout.on('data', (data) => {
        log(`pg_dump: ${data.toString().trim()}`, 'cyan')
      })

      pgDump.stderr.on('data', (data) => {
        const message = data.toString().trim()
        if (message && !message.includes('NOTICE')) {
          log(`pg_dump: ${message}`, 'yellow')
        }
      })

      pgDump.on('close', (code) => {
        if (code === 0) {
          log(`✅ Dump SQL créé: ${dumpFile}`, 'green')
          resolve(dumpFile)
        } else {
          log(`❌ Erreur pg_dump (code ${code})`, 'red')
          reject(new Error(`pg_dump failed with code ${code}`))
        }
      })

      pgDump.on('error', (error) => {
        log(`❌ Erreur pg_dump: ${error.message}`, 'red')
        reject(error)
      })
    })
  }

  async createJSONBackup() {
    log('📄 Création de la sauvegarde JSON...', 'blue')
    
    try {
      const client = new Client(LOCAL_DB_CONFIG)
      await client.connect()
      
      // Récupérer la liste des tables
      const tablesResult = await client.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_type = 'BASE TABLE'
        ORDER BY table_name
      `)
      
      const tables = tablesResult.rows.map(row => row.table_name)
      const backup = {
        metadata: {
          timestamp: new Date().toISOString(),
          database: LOCAL_DB_CONFIG.database,
          tables_count: tables.length,
          pg_version: null
        },
        tables: {}
      }
      
      // Récupérer la version PostgreSQL
      const versionResult = await client.query('SELECT version()')
      backup.metadata.pg_version = versionResult.rows[0].version
      
      let totalRecords = 0
      
      for (const table of tables) {
        try {
          log(`   📊 Sauvegarde table: ${table}`, 'cyan')
          
          // Récupérer les données
          const dataResult = await client.query(`SELECT * FROM "${table}"`)
          const rows = dataResult.rows
          
          // Récupérer la structure
          const structureResult = await client.query(`
            SELECT column_name, data_type, is_nullable, column_default
            FROM information_schema.columns
            WHERE table_name = $1
            ORDER BY ordinal_position
          `, [table])
          
          backup.tables[table] = {
            structure: structureResult.rows,
            data: rows,
            count: rows.length
          }
          
          totalRecords += rows.length
          log(`      ✅ ${rows.length} enregistrements`, 'green')
          
        } catch (error) {
          log(`      ❌ Erreur table ${table}: ${error.message}`, 'red')
          backup.tables[table] = {
            error: error.message,
            count: 0
          }
        }
      }
      
      backup.metadata.total_records = totalRecords
      
      // Sauvegarder le JSON
      const jsonFile = path.join(this.backupDir, `cma_cms_backup_${this.timestamp}.json`)
      fs.writeFileSync(jsonFile, JSON.stringify(backup, null, 2))
      
      log(`✅ Sauvegarde JSON créée: ${jsonFile}`, 'green')
      log(`📊 Total: ${totalRecords} enregistrements dans ${tables.length} tables`, 'cyan')
      
      await client.end()
      return jsonFile
      
    } catch (error) {
      log(`❌ Erreur sauvegarde JSON: ${error.message}`, 'red')
      throw error
    }
  }

  async createTablesList() {
    log('📋 Création de la liste des tables...', 'blue')
    
    try {
      const client = new Client(LOCAL_DB_CONFIG)
      await client.connect()
      
      const result = await client.query(`
        SELECT 
          t.table_name,
          COALESCE(s.n_live_tup, 0) as row_count,
          pg_size_pretty(pg_total_relation_size(c.oid)) as size
        FROM information_schema.tables t
        LEFT JOIN pg_stat_user_tables s ON s.relname = t.table_name
        LEFT JOIN pg_class c ON c.relname = t.table_name
        WHERE t.table_schema = 'public' 
        AND t.table_type = 'BASE TABLE'
        ORDER BY COALESCE(s.n_live_tup, 0) DESC
      `)
      
      const tablesInfo = result.rows.map(row => ({
        name: row.table_name,
        records: parseInt(row.row_count) || 0,
        size: row.size || 'N/A'
      }))
      
      const listFile = path.join(this.backupDir, `tables_list_${this.timestamp}.json`)
      fs.writeFileSync(listFile, JSON.stringify(tablesInfo, null, 2))
      
      log(`✅ Liste des tables créée: ${listFile}`, 'green')
      
      // Afficher un résumé
      log('\n📊 RÉSUMÉ DES TABLES:', 'bold')
      tablesInfo.forEach(table => {
        if (table.records > 0) {
          log(`   ${table.name}: ${table.records} enregistrements (${table.size})`, 'cyan')
        }
      })
      
      await client.end()
      return listFile
      
    } catch (error) {
      log(`❌ Erreur liste tables: ${error.message}`, 'red')
      throw error
    }
  }

  async createBackupSummary(files) {
    const summary = {
      timestamp: new Date().toISOString(),
      database: LOCAL_DB_CONFIG.database,
      backup_files: files,
      migration_ready: true,
      notes: [
        'Sauvegarde créée avant migration vers Neon',
        'Utilisez restore-from-backup.js pour restaurer si nécessaire',
        'Vérifiez que tous les fichiers sont présents avant de continuer'
      ]
    }
    
    const summaryFile = path.join(this.backupDir, `backup_summary_${this.timestamp}.json`)
    fs.writeFileSync(summaryFile, JSON.stringify(summary, null, 2))
    
    log(`📋 Résumé de sauvegarde créé: ${summaryFile}`, 'green')
    return summaryFile
  }

  async runCompleteBackup() {
    log('💾 SAUVEGARDE COMPLÈTE AVANT MIGRATION', 'bold')
    log('=' .repeat(60), 'bold')
    
    try {
      // 1. Créer le dossier de sauvegarde
      await this.createBackupDirectory()
      
      // 2. Tester la connexion
      const connected = await this.testConnection()
      if (!connected) {
        throw new Error('Impossible de se connecter à la base de données')
      }
      
      // 3. Créer les sauvegardes
      const files = []
      
      log('\n🔄 Création des sauvegardes...', 'blue')
      
      try {
        const sqlDump = await this.createSQLDump()
        files.push(sqlDump)
      } catch (error) {
        log(`⚠️ Dump SQL échoué: ${error.message}`, 'yellow')
      }
      
      try {
        const jsonBackup = await this.createJSONBackup()
        files.push(jsonBackup)
      } catch (error) {
        log(`⚠️ Sauvegarde JSON échouée: ${error.message}`, 'yellow')
      }
      
      try {
        const tablesList = await this.createTablesList()
        files.push(tablesList)
      } catch (error) {
        log(`⚠️ Liste tables échouée: ${error.message}`, 'yellow')
      }
      
      // 4. Créer le résumé
      const summary = await this.createBackupSummary(files)
      files.push(summary)
      
      // 5. Résumé final
      log('\n✅ SAUVEGARDE TERMINÉE', 'bold')
      log('=' .repeat(40), 'bold')
      log(`Dossier: ${this.backupDir}`, 'blue')
      log(`Fichiers créés: ${files.length}`, 'green')
      
      files.forEach(file => {
        const fileName = path.basename(file)
        const stats = fs.statSync(file)
        const size = (stats.size / 1024 / 1024).toFixed(2)
        log(`   ${fileName} (${size} MB)`, 'cyan')
      })
      
      log('\n🚀 Prêt pour la migration !', 'green')
      log('Lancez: node scripts/complete-database-migration-localhost-to-neon.js', 'yellow')
      
      return true
      
    } catch (error) {
      log(`❌ Erreur sauvegarde: ${error.message}`, 'red')
      return false
    }
  }
}

// Point d'entrée
async function main() {
  const backup = new DatabaseBackup()
  await backup.runCompleteBackup()
}

if (require.main === module) {
  main().catch(console.error)
}

module.exports = { DatabaseBackup }