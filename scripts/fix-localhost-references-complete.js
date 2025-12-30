#!/usr/bin/env node

/**
 * Script pour corriger définitivement toutes les références localhost
 * et forcer l'utilisation de l'URL de production Railway
 */

const fs = require('fs')
const path = require('path')

const RAILWAY_STRAPI_URL = 'https://cma-education-strapi-production.up.railway.app'

console.log('🔧 Correction complète des références localhost...\n')

// 1. Vérifier et corriger src/lib/strapi.ts
function fixStrapiConfig() {
  console.log('1️⃣ Correction de src/lib/strapi.ts...')
  
  const strapiPath = 'src/lib/strapi.ts'
  
  if (!fs.existsSync(strapiPath)) {
    console.log('❌ Fichier strapi.ts non trouvé')
    return
  }
  
  let content = fs.readFileSync(strapiPath, 'utf8')
  
  // Remplacer la ligne de configuration STRAPI_URL
  const oldLine = `const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'`
  const newLine = `const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || '${RAILWAY_STRAPI_URL}'`
  
  if (content.includes(oldLine)) {
    content = content.replace(oldLine, newLine)
    fs.writeFileSync(strapiPath, content)
    console.log('   ✅ Configuration STRAPI_URL corrigée')
  } else {
    console.log('   ⚠️ Configuration déjà correcte ou format différent')
  }
}

// 2. Vérifier et corriger next.config.js
function fixNextConfig() {
  console.log('\n2️⃣ Vérification de next.config.js...')
  
  const nextConfigPath = 'next.config.js'
  
  if (!fs.existsSync(nextConfigPath)) {
    console.log('❌ Fichier next.config.js non trouvé')
    return
  }
  
  let content = fs.readFileSync(nextConfigPath, 'utf8')
  
  // Vérifier s'il y a des références localhost
  if (content.includes('localhost:1337')) {
    console.log('   ⚠️ Références localhost trouvées dans next.config.js')
    
    // Remplacer toutes les occurrences
    content = content.replace(/localhost:1337/g, RAILWAY_STRAPI_URL.replace('https://', ''))
    fs.writeFileSync(nextConfigPath, content)
    console.log('   ✅ next.config.js corrigé')
  } else {
    console.log('   ✅ next.config.js correct')
  }
}

// 3. Rechercher et corriger tous les fichiers avec des références localhost
function findAndFixLocalhostReferences() {
  console.log('\n3️⃣ Recherche de toutes les références localhost...')
  
  const searchDirs = ['src', 'pages', 'components']
  const extensions = ['.ts', '.tsx', '.js', '.jsx']
  
  function searchInDirectory(dir) {
    if (!fs.existsSync(dir)) return
    
    const files = fs.readdirSync(dir)
    
    files.forEach(file => {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)
      
      if (stat.isDirectory()) {
        searchInDirectory(filePath)
      } else if (extensions.some(ext => file.endsWith(ext))) {
        checkAndFixFile(filePath)
      }
    })
  }
  
  function checkAndFixFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8')
    
    if (content.includes('localhost:1337')) {
      console.log(`   🔧 Correction de ${filePath}`)
      
      const newContent = content.replace(/http:\/\/localhost:1337/g, RAILWAY_STRAPI_URL)
      fs.writeFileSync(filePath, newContent)
      console.log(`   ✅ ${filePath} corrigé`)
    }
  }
  
  searchDirs.forEach(dir => {
    searchInDirectory(dir)
  })
}

// 4. Créer un fichier .env.production pour forcer les variables en production
function createProductionEnv() {
  console.log('\n4️⃣ Création de .env.production...')
  
  const envContent = `# Variables de production
NEXT_PUBLIC_STRAPI_URL=${RAILWAY_STRAPI_URL}
STRAPI_API_TOKEN=744de645f118fa88ee689db97a0f091b5ae17685a7f5646f113c62607fdd47c892ce1f2570fa89f62bcdec23577dc618d12bdb69547b6778153470637b626987869d6d11124ae446edac14e95283981eba766cfb3c2d4fc8d5c0d608c84bd036f705448818feece41ce7f3b9afea49d07dc26d0cf7d6ebc257b76f900be69c00

# Email configuration
EMAIL_USER=contact.academy@construction-management-academy.fr
EMAIL_PASSWORD=your-app-password
BROCHURE_NOTIFICATION_EMAIL=contact.academy@construction-management-academy.fr
`
  
  fs.writeFileSync('.env.production', envContent)
  console.log('   ✅ .env.production créé')
}

// 5. Mettre à jour .env.local pour être cohérent
function updateLocalEnv() {
  console.log('\n5️⃣ Mise à jour de .env.local...')
  
  if (!fs.existsSync('.env.local')) {
    console.log('   ⚠️ .env.local non trouvé, création...')
  }
  
  const envContent = `# Variables locales (utilisées aussi en production si pas d'override)
NEXT_PUBLIC_STRAPI_URL=${RAILWAY_STRAPI_URL}
STRAPI_API_TOKEN=744de645f118fa88ee689db97a0f091b5ae17685a7f5646f113c62607fdd47c892ce1f2570fa89f62bcdec23577dc618d12bdb69547b6778153470637b626987869d6d11124ae446edac14e95283981eba766cfb3c2d4fc8d5c0d608c84bd036f705448818feece41ce7f3b9afea49d07dc26d0cf7d6ebc257b76f900be69c00

# Email configuration
EMAIL_USER=contact.academy@construction-management-academy.fr
EMAIL_PASSWORD=your-app-password
BROCHURE_NOTIFICATION_EMAIL=contact.academy@construction-management-academy.fr
`
  
  fs.writeFileSync('.env.local', envContent)
  console.log('   ✅ .env.local mis à jour')
}

// 6. Créer un script de test pour vérifier la correction
function createTestScript() {
  console.log('\n6️⃣ Création du script de test...')
  
  const testScript = `#!/usr/bin/env node

/**
 * Test rapide pour vérifier que les URLs sont correctes
 */

const EXPECTED_URL = '${RAILWAY_STRAPI_URL}'

console.log('🧪 Test des URLs de production...')
console.log('URL attendue:', EXPECTED_URL)

// Test 1: Variables d'environnement
console.log('\\n1️⃣ Variables d\\'environnement:')
console.log('NEXT_PUBLIC_STRAPI_URL:', process.env.NEXT_PUBLIC_STRAPI_URL || 'NON DÉFINIE')

// Test 2: Import du module strapi
try {
  // Simuler l'environnement de production
  process.env.NEXT_PUBLIC_STRAPI_URL = EXPECTED_URL
  
  const { getStrapiURL } = require('./src/lib/strapi.ts')
  const testUrl = getStrapiURL('/api/formations')
  
  console.log('\\n2️⃣ URL générée par getStrapiURL:')
  console.log('URL:', testUrl)
  
  if (testUrl.includes('localhost')) {
    console.log('❌ ERREUR: URL contient encore localhost!')
  } else if (testUrl.includes(EXPECTED_URL)) {
    console.log('✅ SUCCESS: URL utilise Railway!')
  } else {
    console.log('⚠️ WARNING: URL inattendue')
  }
  
} catch (error) {
  console.log('❌ Erreur lors du test:', error.message)
}

console.log('\\n🎯 Pour corriger définitivement:')
console.log('1. Vérifiez les variables Vercel')
console.log('2. Redéployez: vercel --prod')
console.log('3. Attendez 2-3 minutes')
console.log('4. Testez: node scripts/verify-production-fix.js')
`
  
  fs.writeFileSync('scripts/test-urls-fix.js', testScript)
  console.log('   ✅ Script de test créé: scripts/test-urls-fix.js')
}

// Fonction principale
async function main() {
  try {
    fixStrapiConfig()
    fixNextConfig()
    findAndFixLocalhostReferences()
    createProductionEnv()
    updateLocalEnv()
    createTestScript()
    
    console.log('\n🎉 Correction complète terminée!')
    console.log('\n📋 Prochaines étapes:')
    console.log('1. Vérifiez que vos variables Vercel sont correctes')
    console.log('2. Redéployez: vercel --prod')
    console.log('3. Testez: node scripts/test-urls-fix.js')
    console.log('4. Vérifiez: node scripts/verify-production-fix.js')
    
    console.log('\n🔗 Variables Vercel à vérifier:')
    console.log(`NEXT_PUBLIC_STRAPI_URL = ${RAILWAY_STRAPI_URL}`)
    console.log('STRAPI_API_TOKEN = [votre-token]')
    
  } catch (error) {
    console.error('❌ Erreur:', error)
  }
}

// Exécution
if (require.main === module) {
  main()
}

module.exports = { main }