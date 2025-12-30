#!/usr/bin/env node

/**
 * Script pour vérifier et corriger les variables d'environnement Vercel
 * qui causent les erreurs Mixed Content et 404
 */

console.log('🔧 Vérification des variables d\'environnement Vercel...\n')

// Variables d'environnement requises
const requiredEnvVars = {
  'NEXT_PUBLIC_STRAPI_URL': 'https://cma-education-strapi-production.up.railway.app',
  'STRAPI_API_TOKEN': process.env.STRAPI_API_TOKEN || 'TOKEN_REQUIS'
}

// 1. Vérifier les variables locales
function checkLocalEnvVars() {
  console.log('1️⃣ Variables d\'environnement locales (.env.local):')
  
  for (const [key, expectedValue] of Object.entries(requiredEnvVars)) {
    const currentValue = process.env[key]
    
    if (currentValue) {
      if (key === 'NEXT_PUBLIC_STRAPI_URL') {
        if (currentValue.includes('localhost')) {
          console.log(`   ❌ ${key}: ${currentValue} (contient localhost!)`)
        } else {
          console.log(`   ✅ ${key}: ${currentValue}`)
        }
      } else {
        console.log(`   ✅ ${key}: [DÉFINI]`)
      }
    } else {
      console.log(`   ❌ ${key}: [NON DÉFINI]`)
    }
  }
}

// 2. Générer les commandes Vercel
function generateVercelCommands() {
  console.log('\n2️⃣ Commandes pour configurer Vercel:')
  console.log('\n# Supprimer les anciennes variables (si elles existent)')
  console.log('vercel env rm NEXT_PUBLIC_STRAPI_URL production')
  console.log('vercel env rm STRAPI_API_TOKEN production')
  
  console.log('\n# Ajouter les nouvelles variables')
  console.log(`vercel env add NEXT_PUBLIC_STRAPI_URL production`)
  console.log('# Entrer: https://cma-education-strapi-production.up.railway.app')
  
  console.log(`\nvercel env add STRAPI_API_TOKEN production`)
  console.log('# Entrer le token Strapi')
  
  console.log('\n# Redéployer')
  console.log('vercel --prod')
}

// 3. Créer un fichier de configuration
function createVercelConfig() {
  console.log('\n3️⃣ Création du fichier de configuration...')
  
  const config = {
    "framework": "nextjs",
    "buildCommand": "npm run build",
    "outputDirectory": ".next",
    "regions": ["cdg1"],
    "env": {
      "NEXT_PUBLIC_STRAPI_URL": "https://cma-education-strapi-production.up.railway.app"
    },
    "functions": {
      "src/app/**/*.{js,ts,jsx,tsx}": {
        "maxDuration": 30
      }
    }
  }
  
  console.log('📝 Configuration recommandée pour vercel.json:')
  console.log(JSON.stringify(config, null, 2))
}

// 4. Tester la connectivité
async function testConnectivity() {
  console.log('\n4️⃣ Test de connectivité Railway Strapi...')
  
  const testUrl = 'https://cma-education-strapi-production.up.railway.app/api/formations'
  
  try {
    const response = await fetch(testUrl)
    console.log(`   Status: ${response.status} ${response.statusText}`)
    
    if (response.ok) {
      const data = await response.json()
      console.log(`   ✅ ${data.data?.length || 0} formations disponibles`)
    } else {
      console.log(`   ❌ Erreur d'accès à l'API`)
    }
  } catch (error) {
    console.log(`   ❌ Erreur de connexion: ${error.message}`)
  }
}

// 5. Instructions de déploiement
function deploymentInstructions() {
  console.log('\n5️⃣ Instructions de déploiement:')
  console.log('\n📋 Étapes à suivre:')
  console.log('   1. Configurer les variables d\'environnement Vercel (voir commandes ci-dessus)')
  console.log('   2. Créer le content type "partners" sur Railway Strapi')
  console.log('   3. Corriger ou supprimer la vidéo hero avec URL localhost')
  console.log('   4. Redéployer sur Vercel')
  
  console.log('\n🔗 Liens utiles:')
  console.log('   - Vercel Dashboard: https://vercel.com/dashboard')
  console.log('   - Railway Strapi Admin: https://cma-education-strapi-production.up.railway.app/admin')
  console.log('   - Site de production: https://cma-education-2024.vercel.app')
}

// 6. Script de test rapide
function createQuickTestScript() {
  console.log('\n6️⃣ Script de test rapide:')
  
  const testScript = `
// Test rapide des APIs
const testAPIs = async () => {
  const baseURL = 'https://cma-education-strapi-production.up.railway.app'
  const endpoints = ['/api/formations', '/api/partners', '/api/site-setting']
  
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(baseURL + endpoint)
      console.log(\`\${endpoint}: \${response.status}\`)
    } catch (error) {
      console.log(\`\${endpoint}: ERROR\`)
    }
  }
}

testAPIs()
`
  
  console.log('📝 Copiez ce code dans la console du navigateur pour tester:')
  console.log(testScript)
}

// Fonction principale
async function main() {
  console.log('🎯 Diagnostic et correction des variables d\'environnement\n')
  
  checkLocalEnvVars()
  generateVercelCommands()
  createVercelConfig()
  await testConnectivity()
  deploymentInstructions()
  createQuickTestScript()
  
  console.log('\n✅ Diagnostic terminé!')
  console.log('🚀 Suivez les instructions ci-dessus pour corriger les problèmes de production.')
}

// Exécution
if (require.main === module) {
  main().catch(console.error)
}

module.exports = { main }