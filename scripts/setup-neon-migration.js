#!/usr/bin/env node

/**
 * CONFIGURATION POUR LA MIGRATION VERS NEON
 * 
 * Ce script aide à configurer les variables d'environnement
 * et vérifier la connectivité avant la migration.
 */

const { Client } = require('pg')
const readline = require('readline')
const fs = require('fs')
const path = require('path')

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

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function question(prompt) {
  return new Promise(resolve => {
    rl.question(`${colors.blue}${prompt}${colors.reset}`, resolve)
  })
}

async function testDatabaseConnection(config, name) {
  log(`\n🔌 Test de connexion ${name}...`, 'blue')
  
  try {
    const client = new Client(config)
    await client.connect()
    
    // Test simple
    const result = await client.query('SELECT NOW() as current_time, version() as version')
    const { current_time, version } = result.rows[0]
    
    log(`✅ Connexion ${name} réussie`, 'green')
    log(`   Heure: ${current_time}`, 'cyan')
    log(`   Version: ${version.split(' ').slice(0, 2).join(' ')}`, 'cyan')
    
    // Compter les tables
    const tablesResult = await client.query(`
      SELECT COUNT(*) as table_count 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `)
    const tableCount = tablesResult.rows[0].table_count
    log(`   Tables: ${tableCount}`, 'cyan')
    
    await client.end()
    return true
  } catch (error) {
    log(`❌ Erreur connexion ${name}: ${error.message}`, 'red')
    return false
  }
}

async function setupNeonConfiguration() {
  log('🚀 CONFIGURATION MIGRATION NEON', 'bold')
  log('=' .repeat(50), 'bold')
  
  log('\n📋 Informations requises:', 'yellow')
  log('1. URL de connexion Neon PostgreSQL', 'cyan')
  log('2. Vérification de la base locale', 'cyan')
  
  // 1. Configuration Neon
  log('\n🔧 Configuration Neon PostgreSQL', 'blue')
  log('Format: postgresql://username:password@host/database?sslmode=require', 'yellow')
  
  const neonUrl = await question('\nEntrez votre URL de connexion Neon: ')
  
  if (!neonUrl || !neonUrl.startsWith('postgresql://')) {
    log('❌ URL Neon invalide', 'red')
    return false
  }
  
  // 2. Configuration locale (par défaut)
  const localConfig = {
    host: '127.0.0.1',
    port: 5432,
    database: 'cma_cms',
    user: 'postgres',
    password: 'root'
  }
  
  log('\n🔧 Configuration locale par défaut:', 'blue')
  log(`   Host: ${localConfig.host}`, 'cyan')
  log(`   Port: ${localConfig.port}`, 'cyan')
  log(`   Database: ${localConfig.database}`, 'cyan')
  log(`   User: ${localConfig.user}`, 'cyan')
  
  const useDefault = await question('\nUtiliser cette configuration locale ? (y/n): ')
  
  if (useDefault.toLowerCase() !== 'y') {
    localConfig.host = await question('Host local (127.0.0.1): ') || localConfig.host
    localConfig.port = parseInt(await question('Port local (5432): ') || localConfig.port)
    localConfig.database = await question('Nom base locale (cma_cms): ') || localConfig.database
    localConfig.user = await question('Utilisateur local (postgres): ') || localConfig.user
    localConfig.password = await question('Mot de passe local (root): ') || localConfig.password
  }
  
  // 3. Test des connexions
  log('\n🧪 Test des connexions...', 'bold')
  
  const localOk = await testDatabaseConnection(localConfig, 'LOCALE')
  const neonOk = await testDatabaseConnection({
    connectionString: neonUrl,
    ssl: { rejectUnauthorized: false }
  }, 'NEON')
  
  if (!localOk || !neonOk) {
    log('\n❌ Impossible de continuer avec des connexions défaillantes', 'red')
    return false
  }
  
  // 4. Sauvegarder la configuration
  const envContent = `
# Configuration pour migration Neon
DATABASE_URL=${neonUrl}

# Configuration locale (pour référence)
LOCAL_DATABASE_HOST=${localConfig.host}
LOCAL_DATABASE_PORT=${localConfig.port}
LOCAL_DATABASE_NAME=${localConfig.database}
LOCAL_DATABASE_USER=${localConfig.user}
LOCAL_DATABASE_PASSWORD=${localConfig.password}

# Date de configuration
MIGRATION_CONFIG_DATE=${new Date().toISOString()}
`
  
  const envPath = path.join(process.cwd(), '.env.migration')
  fs.writeFileSync(envPath, envContent.trim())
  
  log(`\n💾 Configuration sauvegardée dans .env.migration`, 'green')
  
  // 5. Analyser les données à migrer
  await analyzeMigrationData(localConfig, neonUrl)
  
  log('\n✅ Configuration terminée !', 'green')
  log('\nPour lancer la migration:', 'yellow')
  log('  node scripts/complete-database-migration-localhost-to-neon.js', 'cyan')
  
  return true
}

async function analyzeMigrationData(localConfig, neonUrl) {
  log('\n📊 Analyse des données à migrer...', 'blue')
  
  try {
    const localClient = new Client(localConfig)
    await localClient.connect()
    
    // Récupérer les tables et leurs tailles
    const result = await localClient.query(`
      SELECT 
        schemaname,
        tablename,
        n_tup_ins as inserts,
        n_tup_upd as updates,
        n_tup_del as deletes,
        n_live_tup as live_tuples,
        n_dead_tup as dead_tuples
      FROM pg_stat_user_tables
      WHERE schemaname = 'public'
      ORDER BY n_live_tup DESC
    `)
    
    let totalRecords = 0
    log('\n📋 Tables avec données:', 'yellow')
    
    for (const row of result.rows) {
      if (row.live_tuples > 0) {
        log(`   ${row.tablename}: ${row.live_tuples} enregistrements`, 'cyan')
        totalRecords += parseInt(row.live_tuples)
      }
    }
    
    log(`\n📊 Total à migrer: ${totalRecords} enregistrements`, 'green')
    
    // Vérifier les tables importantes
    const importantTables = ['formations', 'formation_categories', 'formateurs', 'testimonials', 'partners']
    log('\n🎯 Tables critiques:', 'yellow')
    
    for (const table of importantTables) {
      try {
        const countResult = await localClient.query(`SELECT COUNT(*) FROM "${table}"`)
        const count = countResult.rows[0].count
        log(`   ${table}: ${count} enregistrements`, count > 0 ? 'green' : 'red')
      } catch (error) {
        log(`   ${table}: Table non trouvée`, 'red')
      }
    }
    
    await localClient.end()
  } catch (error) {
    log(`❌ Erreur analyse: ${error.message}`, 'red')
  }
}

async function quickMigrationCheck() {
  log('🔍 VÉRIFICATION RAPIDE AVANT MIGRATION', 'bold')
  log('=' .repeat(50), 'bold')
  
  // Vérifier si .env.migration existe
  const envPath = path.join(process.cwd(), '.env.migration')
  if (!fs.existsSync(envPath)) {
    log('❌ Fichier .env.migration non trouvé', 'red')
    log('Lancez d\'abord: node scripts/setup-neon-migration.js', 'yellow')
    return false
  }
  
  // Charger la configuration
  const envContent = fs.readFileSync(envPath, 'utf8')
  const databaseUrl = envContent.match(/DATABASE_URL=(.+)/)?.[1]
  
  if (!databaseUrl) {
    log('❌ DATABASE_URL non trouvée dans .env.migration', 'red')
    return false
  }
  
  // Test rapide des connexions
  const localConfig = {
    host: '127.0.0.1',
    port: 5432,
    database: 'cma_cms',
    user: 'postgres',
    password: 'root'
  }
  
  const localOk = await testDatabaseConnection(localConfig, 'LOCALE')
  const neonOk = await testDatabaseConnection({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false }
  }, 'NEON')
  
  if (localOk && neonOk) {
    log('\n✅ Prêt pour la migration !', 'green')
    log('Lancez: node scripts/complete-database-migration-localhost-to-neon.js', 'cyan')
    return true
  } else {
    log('\n❌ Problèmes de connexion détectés', 'red')
    return false
  }
}

// Menu principal
async function main() {
  const args = process.argv.slice(2)
  
  if (args.includes('--check')) {
    await quickMigrationCheck()
  } else {
    await setupNeonConfiguration()
  }
  
  rl.close()
}

if (require.main === module) {
  main().catch(console.error)
}