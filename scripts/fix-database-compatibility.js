#!/usr/bin/env node

/**
 * CORRECTION AUTOMATIQUE - INCOMPATIBILITÉ BASE DE DONNÉES
 * 
 * Problème : Le clone CMA-Education-2024 utilise SQLite alors que Railway utilise PostgreSQL
 * Solution : Configurer le clone pour utiliser la même base PostgreSQL que Railway
 */

const fs = require('fs')
const path = require('path')

// Couleurs pour les logs
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

// Chemins des fichiers
const CLONE_PATH = 'CMA-Education-2024'
const CLONE_ENV_PATH = path.join(CLONE_PATH, '.env')
const MAIN_ENV_PATH = '.env.local'
const CLONE_TMP_PATH = path.join(CLONE_PATH, '.tmp')
const CLONE_STRAPI_PATH = path.join(CLONE_PATH, '.strapi')

// Configuration PostgreSQL pour Railway
const RAILWAY_CONFIG = `# Strapi Configuration
HOST=0.0.0.0
PORT=1337
APP_KEYS=Pk5hrpgS6z4VT7nWbWkdR6V8Qofq6QNGGS0uNJGzgBM=,y2OURcKeQFiY26Nu2ERcMtSE93KbN3fDBzPnKzlT1jU=,tA7fRZE3ZCtwWkWdh2CxGol8b9PSsNio/Q+FiPHhzNA=,M9x8Hnp/2eygLJL7/6wfEnT+7Uxoq8x1TecauQuYS8I=
API_TOKEN_SALT=9jCSkb8ltUxR2tCm2c0B00sq/bG0vfNXrrCcoguqVVM=
ADMIN_JWT_SECRET=epxZhgL+lQmE8ueSxBFMLxy/vXAJqs8Lx6FTujQiOGM=
TRANSFER_TOKEN_SALT=JVqKuPkfTnHILFHVRuQX0is6rQ0ZS7bxIziSjVNycq0=
JWT_SECRET=epxZhgL+lQmE8ueSxBFMLxy/vXAJqs8Lx6FTujQiOGM=

# Database Neon PostgreSQL (même que production)
DATABASE_URL=postgresql://neondb_owner:npg_P2DZma1jtAkB@ep-silent-voice-a47tu3wg-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

# Disable Strapi Analytics
STRAPI_TELEMETRY_DISABLED=true

# Strapi API Token (pour connexion frontend)
STRAPI_API_TOKEN=62559d2051c7e5f7576a0e12524b1a160a5dde2b9c0428afd257df0c5ec8b81ae33683899ae9fadd3e6b6d2853b858f31343efbae9b692bf785758173d01428e43ed02efec664f698718fa44079f64b3b03e1e6663d1200ab0b5cf6345fd78cbd11f41b02be1303e7f122e18aa18be690225201a96cbe8aa71d8229deba2e94ec236385a2013ba8db694ccbdf80a49a5cc3e0499ae408caa45dddb48f2a9ed35fd17a8a9eedb71fbf587e0806ccc282a4c62f8aa575457bc480b312f9740d1f3e1651e196a507075ed08a858b8dda30c5c1ffc88b61352c9436b7fddeb70f6668b194166d1a18133990d6da183edb6a0f4f4694f716d
`

function checkCloneExists() {
  if (!fs.existsSync(CLONE_PATH)) {
    log(`❌ Le dossier clone "${CLONE_PATH}" n'existe pas`, 'red')
    log('Vérifiez le chemin du clone CMA-Education-2024', 'yellow')
    return false
  }
  return true
}

function backupSQLiteData() {
  log('\n📦 Sauvegarde des données SQLite...', 'blue')
  
  const sqliteFile = path.join(CLONE_TMP_PATH, 'data.db')
  
  if (fs.existsSync(sqliteFile)) {
    const backupPath = path.join(CLONE_PATH, 'backup-sqlite-data.db')
    try {
      fs.copyFileSync(sqliteFile, backupPath)
      log(`✅ Données SQLite sauvegardées dans: ${backupPath}`, 'green')
      return true
    } catch (error) {
      log(`⚠️ Erreur lors de la sauvegarde: ${error.message}`, 'yellow')
      return false
    }
  } else {
    log('ℹ️ Aucune base SQLite trouvée à sauvegarder', 'blue')
    return true
  }
}

function updateEnvFile() {
  log('\n🔧 Mise à jour du fichier .env...', 'blue')
  
  try {
    // Sauvegarder l'ancien .env
    if (fs.existsSync(CLONE_ENV_PATH)) {
      const backupEnvPath = path.join(CLONE_PATH, '.env.backup')
      fs.copyFileSync(CLONE_ENV_PATH, backupEnvPath)
      log(`✅ Ancien .env sauvegardé dans: .env.backup`, 'green')
    }
    
    // Écrire la nouvelle configuration
    fs.writeFileSync(CLONE_ENV_PATH, RAILWAY_CONFIG)
    log('✅ Nouveau .env configuré pour PostgreSQL Railway', 'green')
    
    return true
  } catch (error) {
    log(`❌ Erreur lors de la mise à jour du .env: ${error.message}`, 'red')
    return false
  }
}

function cleanSQLiteFiles() {
  log('\n🧹 Nettoyage des fichiers SQLite...', 'blue')
  
  let cleaned = false
  
  // Supprimer le dossier .tmp
  if (fs.existsSync(CLONE_TMP_PATH)) {
    try {
      fs.rmSync(CLONE_TMP_PATH, { recursive: true, force: true })
      log('✅ Dossier .tmp supprimé', 'green')
      cleaned = true
    } catch (error) {
      log(`⚠️ Erreur lors de la suppression de .tmp: ${error.message}`, 'yellow')
    }
  }
  
  // Supprimer le dossier .strapi (cache)
  if (fs.existsSync(CLONE_STRAPI_PATH)) {
    try {
      fs.rmSync(CLONE_STRAPI_PATH, { recursive: true, force: true })
      log('✅ Cache Strapi (.strapi) supprimé', 'green')
      cleaned = true
    } catch (error) {
      log(`⚠️ Erreur lors de la suppression de .strapi: ${error.message}`, 'yellow')
    }
  }
  
  if (!cleaned) {
    log('ℹ️ Aucun fichier SQLite à nettoyer', 'blue')
  }
  
  return true
}

function verifyConfiguration() {
  log('\n🔍 Vérification de la configuration...', 'blue')
  
  try {
    const envContent = fs.readFileSync(CLONE_ENV_PATH, 'utf8')
    
    const hasPostgres = envContent.includes('DATABASE_URL=postgresql://')
    const hasSQLite = envContent.includes('DATABASE_CLIENT=sqlite')
    
    if (hasPostgres && !hasSQLite) {
      log('✅ Configuration PostgreSQL détectée', 'green')
      log('✅ Configuration SQLite supprimée', 'green')
      return true
    } else {
      log('❌ Configuration incorrecte', 'red')
      if (hasSQLite) log('  - SQLite encore présent', 'red')
      if (!hasPostgres) log('  - PostgreSQL manquant', 'red')
      return false
    }
  } catch (error) {
    log(`❌ Erreur lors de la vérification: ${error.message}`, 'red')
    return false
  }
}

function showNextSteps() {
  log('\n🎯 ÉTAPES SUIVANTES', 'bold')
  log('=' .repeat(50), 'bold')
  
  log('\n1. Redémarrer Strapi dans le clone:', 'blue')
  log(`   cd ${CLONE_PATH}`, 'yellow')
  log('   npm run develop', 'yellow')
  
  log('\n2. Vérifier la connexion:', 'blue')
  log('   - Aller sur http://localhost:1337/admin', 'yellow')
  log('   - Se connecter avec les identifiants admin', 'yellow')
  log('   - Vérifier que les formations sont présentes', 'yellow')
  
  log('\n3. Assigner les catégories aux formations:', 'blue')
  log('   - Content Manager > Formation', 'yellow')
  log('   - Assigner une catégorie à chaque formation', 'yellow')
  
  log('\n4. Tester le frontend:', 'blue')
  log('   - Aller sur https://cma-education-2024.vercel.app/formations', 'yellow')
  log('   - Vérifier que les formations s\'affichent', 'yellow')
  
  log('\n✨ Les formations devraient maintenant s\'afficher !', 'green')
}

async function fixDatabaseCompatibility() {
  log('🔧 CORRECTION INCOMPATIBILITÉ BASE DE DONNÉES', 'bold')
  log('=' .repeat(60), 'bold')
  log('Problème: Clone SQLite vs Production PostgreSQL', 'yellow')
  log('Solution: Configurer le clone pour PostgreSQL Railway', 'green')
  
  // Vérifications préliminaires
  if (!checkCloneExists()) {
    return false
  }
  
  // Étapes de correction
  const steps = [
    { name: 'Sauvegarde SQLite', fn: backupSQLiteData },
    { name: 'Mise à jour .env', fn: updateEnvFile },
    { name: 'Nettoyage SQLite', fn: cleanSQLiteFiles },
    { name: 'Vérification', fn: verifyConfiguration }
  ]
  
  let allSuccess = true
  
  for (const step of steps) {
    const success = step.fn()
    if (!success) {
      allSuccess = false
      log(`❌ Échec de l'étape: ${step.name}`, 'red')
    }
  }
  
  // Résumé
  log('\n📊 RÉSUMÉ DE LA CORRECTION', 'bold')
  log('=' .repeat(40), 'bold')
  
  if (allSuccess) {
    log('✅ Correction réussie !', 'green')
    log('Le clone utilise maintenant PostgreSQL Railway', 'green')
    showNextSteps()
  } else {
    log('❌ Correction partiellement échouée', 'red')
    log('Vérifiez les erreurs ci-dessus et corrigez manuellement', 'yellow')
  }
  
  return allSuccess
}

// Exécution
fixDatabaseCompatibility().catch(console.error)