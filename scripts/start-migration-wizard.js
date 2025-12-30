#!/usr/bin/env node

/**
 * ASSISTANT DE MIGRATION - ÉTAPE PAR ÉTAPE
 * 
 * Ce script guide l'utilisateur à travers le processus de migration
 * de manière interactive et sécurisée.
 */

const readline = require('readline')
const { spawn } = require('child_process')
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

function runScript(scriptName, args = []) {
  return new Promise((resolve, reject) => {
    log(`\n🚀 Exécution: ${scriptName}`, 'blue')
    
    const child = spawn('node', [scriptName, ...args], {
      stdio: 'inherit',
      cwd: process.cwd()
    })
    
    child.on('close', (code) => {
      if (code === 0) {
        log(`✅ ${scriptName} terminé avec succès`, 'green')
        resolve(true)
      } else {
        log(`❌ ${scriptName} a échoué (code ${code})`, 'red')
        resolve(false)
      }
    })
    
    child.on('error', (error) => {
      log(`❌ Erreur exécution ${scriptName}: ${error.message}`, 'red')
      reject(error)
    })
  })
}

async function checkPrerequisites() {
  log('🔍 VÉRIFICATION DES PRÉREQUIS', 'bold')
  log('=' .repeat(40), 'bold')
  
  // Vérifier Node.js
  const nodeVersion = process.version
  log(`Node.js: ${nodeVersion}`, 'cyan')
  
  // Vérifier les scripts
  const scripts = [
    'scripts/setup-neon-migration.js',
    'scripts/backup-before-migration.js',
    'scripts/complete-database-migration-localhost-to-neon.js',
    'scripts/validate-migration-complete.js'
  ]
  
  let allScriptsExist = true
  for (const script of scripts) {
    if (fs.existsSync(script)) {
      log(`✅ ${script}`, 'green')
    } else {
      log(`❌ ${script} manquant`, 'red')
      allScriptsExist = false
    }
  }
  
  if (!allScriptsExist) {
    log('\n❌ Scripts manquants détectés', 'red')
    return false
  }
  
  log('\n✅ Prérequis validés', 'green')
  return true
}

async function showWelcome() {
  log('\n🚀 ASSISTANT DE MIGRATION LOCALHOST → NEON', 'bold')
  log('=' .repeat(60), 'bold')
  log('', 'reset')
  log('Cet assistant vous guide dans la migration complète', 'cyan')
  log('de votre base de données PostgreSQL locale vers Neon.', 'cyan')
  log('', 'reset')
  log('📋 ÉTAPES DE LA MIGRATION:', 'yellow')
  log('  1. Configuration et vérification des connexions', 'blue')
  log('  2. Sauvegarde de sécurité de la base locale', 'blue')
  log('  3. Migration complète des données', 'blue')
  log('  4. Validation et vérification', 'blue')
  log('', 'reset')
  log('⚠️  IMPORTANT:', 'yellow')
  log('  • Assurez-vous que votre base locale est accessible', 'cyan')
  log('  • Ayez votre URL de connexion Neon prête', 'cyan')
  log('  • La migration peut prendre plusieurs minutes', 'cyan')
  log('', 'reset')
}

async function step1_Configuration() {
  log('\n📋 ÉTAPE 1: CONFIGURATION', 'bold')
  log('=' .repeat(30), 'bold')
  
  log('Cette étape va:', 'yellow')
  log('  • Demander votre URL de connexion Neon', 'cyan')
  log('  • Tester les connexions locale et Neon', 'cyan')
  log('  • Analyser les données à migrer', 'cyan')
  log('  • Créer le fichier de configuration', 'cyan')
  
  const proceed = await question('\nContinuer avec la configuration ? (y/n): ')
  if (proceed.toLowerCase() !== 'y') {
    return false
  }
  
  // Demander l'URL Neon
  log('\n🔧 Configuration Neon PostgreSQL', 'blue')
  log('Format attendu: postgresql://username:password@host/database?sslmode=require', 'yellow')
  
  const neonUrl = await question('\nEntrez votre URL de connexion Neon: ')
  
  if (!neonUrl || !neonUrl.startsWith('postgresql://')) {
    log('❌ URL Neon invalide', 'red')
    return false
  }
  
  // Sauvegarder temporairement l'URL
  process.env.DATABASE_URL = neonUrl
  
  log('\n🧪 Test des connexions en cours...', 'blue')
  
  // Créer un script de test simple
  const testScript = `
const { Client } = require('pg');

async function testConnections() {
  console.log('🔌 Test connexion locale...');
  try {
    const localClient = new Client({
      host: '127.0.0.1',
      port: 5432,
      database: 'cma_cms',
      user: 'postgres',
      password: 'root'
    });
    await localClient.connect();
    const result = await localClient.query('SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = \\'public\\'');
    console.log('✅ Connexion locale OK - ' + result.rows[0].count + ' tables');
    await localClient.end();
  } catch (error) {
    console.log('❌ Erreur connexion locale:', error.message);
    process.exit(1);
  }
  
  console.log('🔌 Test connexion Neon...');
  try {
    const neonClient = new Client({
      connectionString: '${neonUrl}',
      ssl: { rejectUnauthorized: false }
    });
    await neonClient.connect();
    const result = await neonClient.query('SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = \\'public\\'');
    console.log('✅ Connexion Neon OK - ' + result.rows[0].count + ' tables');
    await neonClient.end();
  } catch (error) {
    console.log('❌ Erreur connexion Neon:', error.message);
    process.exit(1);
  }
  
  console.log('✅ Configuration validée');
}

testConnections();
`
  
  const testFile = path.join(process.cwd(), 'temp_test_connections.js')
  fs.writeFileSync(testFile, testScript)
  
  const testSuccess = await runScript('temp_test_connections.js')
  
  // Nettoyer le fichier temporaire
  if (fs.existsSync(testFile)) {
    fs.unlinkSync(testFile)
  }
  
  if (!testSuccess) {
    log('❌ Tests de connexion échoués', 'red')
    return false
  }
  
  // Sauvegarder la configuration
  const envContent = `DATABASE_URL=${neonUrl}\nMIGRATION_CONFIG_DATE=${new Date().toISOString()}`
  fs.writeFileSync('.env.migration', envContent)
  
  log('✅ Configuration sauvegardée dans .env.migration', 'green')
  return true
}

async function step2_Backup() {
  log('\n💾 ÉTAPE 2: SAUVEGARDE DE SÉCURITÉ', 'bold')
  log('=' .repeat(40), 'bold')
  
  log('Cette étape va:', 'yellow')
  log('  • Créer un dump SQL complet de votre base locale', 'cyan')
  log('  • Générer une sauvegarde JSON structurée', 'cyan')
  log('  • Lister toutes les tables et leurs tailles', 'cyan')
  log('  • Sauvegarder dans le dossier backups/migration/', 'cyan')
  
  const proceed = await question('\nCréer la sauvegarde de sécurité ? (y/n): ')
  if (proceed.toLowerCase() !== 'y') {
    log('⚠️ Sauvegarde ignorée - RISQUÉ !', 'yellow')
    const confirm = await question('Êtes-vous sûr de continuer sans sauvegarde ? (y/n): ')
    return confirm.toLowerCase() === 'y'
  }
  
  return await runScript('scripts/backup-before-migration.js')
}

async function step3_Migration() {
  log('\n🔄 ÉTAPE 3: MIGRATION COMPLÈTE', 'bold')
  log('=' .repeat(35), 'bold')
  
  log('Cette étape va:', 'yellow')
  log('  • Migrer toutes les tables dans l\'ordre des dépendances', 'cyan')
  log('  • Préserver toutes les relations et contraintes', 'cyan')
  log('  • Réinitialiser les séquences automatiquement', 'cyan')
  log('  • Afficher les statistiques en temps réel', 'cyan')
  
  log('\n⚠️  ATTENTION:', 'yellow')
  log('  • Cette opération peut prendre plusieurs minutes', 'cyan')
  log('  • Ne pas interrompre le processus', 'cyan')
  log('  • Les données Neon existantes seront écrasées', 'cyan')
  
  const proceed = await question('\nLancer la migration complète ? (y/n): ')
  if (proceed.toLowerCase() !== 'y') {
    return false
  }
  
  // Charger l'URL depuis le fichier de config
  if (fs.existsSync('.env.migration')) {
    const envContent = fs.readFileSync('.env.migration', 'utf8')
    const match = envContent.match(/DATABASE_URL=(.+)/)
    if (match) {
      process.env.DATABASE_URL = match[1]
    }
  }
  
  return await runScript('scripts/complete-database-migration-localhost-to-neon.js')
}

async function step4_Validation() {
  log('\n🔍 ÉTAPE 4: VALIDATION', 'bold')
  log('=' .repeat(25), 'bold')
  
  log('Cette étape va:', 'yellow')
  log('  • Comparer les comptages de données', 'cyan')
  log('  • Tester les APIs Strapi', 'cyan')
  log('  • Valider l\'intégrité des relations', 'cyan')
  log('  • Tester les performances', 'cyan')
  log('  • Générer un rapport complet', 'cyan')
  
  const proceed = await question('\nLancer la validation ? (y/n): ')
  if (proceed.toLowerCase() !== 'y') {
    log('⚠️ Validation ignorée', 'yellow')
    return true
  }
  
  return await runScript('scripts/validate-migration-complete.js')
}

async function showFinalSummary(results) {
  log('\n🎯 RÉSUMÉ FINAL DE LA MIGRATION', 'bold')
  log('=' .repeat(50), 'bold')
  
  const steps = [
    { name: 'Configuration', success: results.step1 },
    { name: 'Sauvegarde', success: results.step2 },
    { name: 'Migration', success: results.step3 },
    { name: 'Validation', success: results.step4 }
  ]
  
  steps.forEach(step => {
    const status = step.success ? '✅' : '❌'
    const color = step.success ? 'green' : 'red'
    log(`${status} ${step.name}`, color)
  })
  
  const allSuccess = Object.values(results).every(r => r === true)
  
  if (allSuccess) {
    log('\n🎉 MIGRATION TERMINÉE AVEC SUCCÈS !', 'green')
    log('Votre base de données Neon est prête pour la production.', 'cyan')
    log('\n📁 Fichiers générés:', 'yellow')
    log('  • .env.migration (configuration)', 'cyan')
    log('  • backups/migration/ (sauvegardes)', 'cyan')
    log('  • validation_report_*.json (rapport)', 'cyan')
  } else {
    log('\n⚠️ MIGRATION INCOMPLÈTE', 'yellow')
    log('Consultez les logs ci-dessus pour identifier les problèmes.', 'cyan')
    log('Vous pouvez relancer les étapes individuellement si nécessaire.', 'cyan')
  }
}

async function runMigrationWizard() {
  try {
    await showWelcome()
    
    const ready = await question('Prêt à commencer ? (y/n): ')
    if (ready.toLowerCase() !== 'y') {
      log('Migration annulée.', 'yellow')
      return
    }
    
    // Vérifier les prérequis
    const prereqsOk = await checkPrerequisites()
    if (!prereqsOk) {
      log('❌ Prérequis non satisfaits', 'red')
      return
    }
    
    const results = {
      step1: false,
      step2: false,
      step3: false,
      step4: false
    }
    
    // Étape 1: Configuration
    results.step1 = await step1_Configuration()
    if (!results.step1) {
      log('❌ Configuration échouée - arrêt de la migration', 'red')
      return
    }
    
    // Étape 2: Sauvegarde
    results.step2 = await step2_Backup()
    
    // Étape 3: Migration
    results.step3 = await step3_Migration()
    if (!results.step3) {
      log('❌ Migration échouée', 'red')
      const continueValidation = await question('Continuer avec la validation ? (y/n): ')
      if (continueValidation.toLowerCase() !== 'y') {
        await showFinalSummary(results)
        return
      }
    }
    
    // Étape 4: Validation
    results.step4 = await step4_Validation()
    
    // Résumé final
    await showFinalSummary(results)
    
  } catch (error) {
    log(`❌ Erreur fatale: ${error.message}`, 'red')
    console.error(error)
  } finally {
    rl.close()
  }
}

// Point d'entrée
if (require.main === module) {
  runMigrationWizard()
}