#!/usr/bin/env node

/**
 * Script pour analyser précisément où se trouvent les références localhost
 * dans le HTML de production et fournir une solution ciblée
 */

const VERCEL_SITE = 'https://cma-education-2024.vercel.app'

console.log('🔍 Analyse des références localhost dans le HTML de production...\n')

// 1. Analyser le HTML de production
async function analyzeProductionHTML() {
  console.log('1️⃣ Récupération et analyse du HTML de production...')
  
  try {
    const response = await fetch(VERCEL_SITE)
    
    if (!response.ok) {
      console.log(`❌ Erreur récupération HTML: ${response.status}`)
      return null
    }
    
    const html = await response.text()
    console.log(`✅ HTML récupéré (${Math.round(html.length / 1024)} KB)`)
    
    // Rechercher toutes les références localhost
    const localhostMatches = html.match(/localhost:1337[^"'\s]*/g) || []
    const localhostLines = html.split('\n').filter(line => line.includes('localhost:1337'))
    
    console.log(`\n📊 Références localhost trouvées: ${localhostMatches.length}`)
    
    if (localhostMatches.length > 0) {
      console.log('\n🔍 URLs localhost détectées:')
      const uniqueMatches = Array.from(new Set(localhostMatches))
      uniqueMatches.forEach(match => {
        console.log(`   - ${match}`)
      })
      
      console.log('\n📝 Contexte des références:')
      localhostLines.slice(0, 5).forEach((line, index) => {
        const trimmed = line.trim().substring(0, 100)
        console.log(`   ${index + 1}. ${trimmed}${line.length > 100 ? '...' : ''}`)
      })
      
      if (localhostLines.length > 5) {
        console.log(`   ... et ${localhostLines.length - 5} autres références`)
      }
    }
    
    return { html, localhostMatches, localhostLines }
  } catch (error) {
    console.log(`❌ Erreur: ${error.message}`)
    return null
  }
}

// 2. Vérifier les variables d'environnement via une API de test
async function checkEnvironmentViaAPI() {
  console.log('\n2️⃣ Vérification des variables d\'environnement via API...')
  
  try {
    // Tester l'API de test d'environnement si elle existe
    const testResponse = await fetch(`${VERCEL_SITE}/api/test-env`)
    
    if (testResponse.ok) {
      const envData = await testResponse.json()
      console.log('✅ Variables d\'environnement détectées:')
      console.log(`   NEXT_PUBLIC_STRAPI_URL: ${envData.NEXT_PUBLIC_STRAPI_URL || 'NON DÉFINIE'}`)
      console.log(`   NODE_ENV: ${envData.NODE_ENV || 'NON DÉFINIE'}`)
      
      if (!envData.NEXT_PUBLIC_STRAPI_URL) {
        console.log('❌ NEXT_PUBLIC_STRAPI_URL n\'est pas définie sur Vercel!')
        return false
      } else if (envData.NEXT_PUBLIC_STRAPI_URL.includes('localhost')) {
        console.log('❌ NEXT_PUBLIC_STRAPI_URL contient localhost!')
        return false
      } else {
        console.log('✅ NEXT_PUBLIC_STRAPI_URL correctement définie')
        return true
      }
    } else {
      console.log('⚠️ API de test non disponible, vérification manuelle requise')
      return null
    }
  } catch (error) {
    console.log(`⚠️ Impossible de vérifier via API: ${error.message}`)
    return null
  }
}

// 3. Analyser les scripts Next.js
async function analyzeNextJSScripts(html) {
  console.log('\n3️⃣ Analyse des scripts Next.js...')
  
  if (!html) return
  
  // Rechercher les scripts Next.js qui pourraient contenir les URLs
  const scriptMatches = html.match(/<script[^>]*src="[^"]*"[^>]*>/g) || []
  const inlineScripts = html.match(/<script[^>]*>[\s\S]*?<\/script>/g) || []
  
  console.log(`📦 Scripts externes: ${scriptMatches.length}`)
  console.log(`📝 Scripts inline: ${inlineScripts.length}`)
  
  // Vérifier si les scripts contiennent des références localhost
  let localhostInScripts = false
  
  inlineScripts.forEach((script, index) => {
    if (script.includes('localhost:1337')) {
      console.log(`❌ Script inline ${index + 1} contient localhost`)
      localhostInScripts = true
      
      // Extraire un aperçu du script
      const scriptContent = script.replace(/<\/?script[^>]*>/g, '').trim()
      const preview = scriptContent.substring(0, 200)
      console.log(`   Aperçu: ${preview}...`)
    }
  })
  
  if (!localhostInScripts) {
    console.log('✅ Aucune référence localhost dans les scripts inline')
  }
  
  return localhostInScripts
}

// 4. Fournir des solutions ciblées
function provideSolutions(analysisResult) {
  console.log('\n4️⃣ Solutions ciblées:')
  
  if (!analysisResult) {
    console.log('❌ Impossible d\'analyser - vérification manuelle requise')
    return
  }
  
  const { localhostMatches } = analysisResult
  
  if (localhostMatches.length === 0) {
    console.log('✅ Aucune référence localhost trouvée - problème résolu!')
    return
  }
  
  console.log('\n🎯 Cause probable:')
  console.log('   Les variables d\'environnement Vercel ne sont pas correctement configurées')
  console.log('   Next.js utilise les valeurs par défaut du code (localhost:1337)')
  
  console.log('\n🔧 Solution IMMÉDIATE:')
  console.log('\n   OPTION A - Via CLI Vercel:')
  console.log('   1. vercel env add NEXT_PUBLIC_STRAPI_URL production')
  console.log('   2. Entrer: https://cma-education-strapi-production.up.railway.app')
  console.log('   3. vercel --prod')
  
  console.log('\n   OPTION B - Via Dashboard Vercel:')
  console.log('   1. https://vercel.com/dashboard')
  console.log('   2. Projet > Settings > Environment Variables')
  console.log('   3. Ajouter NEXT_PUBLIC_STRAPI_URL = https://cma-education-strapi-production.up.railway.app')
  console.log('   4. Environment: Production')
  console.log('   5. Redéployer')
  
  console.log('\n⏱️ Temps de propagation: 2-3 minutes après redéploiement')
}

// 5. Créer un test de vérification
function createVerificationTest() {
  console.log('\n5️⃣ Test de vérification post-correction:')
  
  console.log('\n📋 Après avoir configuré les variables Vercel:')
  console.log('   1. Attendre 2-3 minutes')
  console.log('   2. Exécuter: node scripts/analyze-localhost-references.js')
  console.log('   3. Vérifier: 0 référence localhost')
  console.log('   4. Tester: https://cma-education-2024.vercel.app')
  console.log('   5. Console navigateur: plus d\'erreur ERR_CONNECTION_REFUSED')
}

// Fonction principale
async function main() {
  console.log('🎯 Objectif: Identifier et éliminer toutes les références localhost\n')
  
  // Analyser le HTML de production
  const analysisResult = await analyzeProductionHTML()
  
  // Vérifier les variables d'environnement
  const envStatus = await checkEnvironmentViaAPI()
  
  // Analyser les scripts Next.js
  if (analysisResult) {
    await analyzeNextJSScripts(analysisResult.html)
  }
  
  // Fournir des solutions
  provideSolutions(analysisResult)
  
  // Test de vérification
  createVerificationTest()
  
  console.log('\n🚨 CRITIQUE:')
  console.log('   Les références localhost DOIVENT être éliminées pour un site fonctionnel')
  console.log('   La configuration des variables Vercel est OBLIGATOIRE')
  
  console.log('\n✅ Analyse terminée!')
}

// Exécution
if (require.main === module) {
  main().catch(console.error)
}

module.exports = { main }