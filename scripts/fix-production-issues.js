#!/usr/bin/env node

/**
 * Script pour corriger les problèmes de production identifiés :
 * 1. Mixed Content Error (localhost URLs en production)
 * 2. 404 sur l'API partners
 * 3. Vérification des variables d'environnement
 */

const https = require('https')
const http = require('http')

const RAILWAY_STRAPI_URL = 'https://cma-education-strapi-production.up.railway.app'
const VERCEL_SITE_URL = 'https://cma-education-2024.vercel.app'

console.log('🔍 Diagnostic des problèmes de production...\n')

// 1. Vérifier la connexion à Railway Strapi
async function checkRailwayStrapi() {
  console.log('1️⃣ Vérification de Railway Strapi...')
  
  try {
    const response = await fetch(`${RAILWAY_STRAPI_URL}/api/partners?populate=*&sort=ordre:asc`)
    console.log(`   Status: ${response.status} ${response.statusText}`)
    
    if (response.ok) {
      const data = await response.json()
      console.log(`   ✅ Partners API disponible - ${data.data?.length || 0} partenaires trouvés`)
      return true
    } else {
      console.log(`   ❌ Partners API non disponible`)
      
      // Vérifier si l'endpoint existe
      const healthCheck = await fetch(`${RAILWAY_STRAPI_URL}/api/partners`)
      console.log(`   Health check: ${healthCheck.status}`)
      
      return false
    }
  } catch (error) {
    console.log(`   ❌ Erreur de connexion: ${error.message}`)
    return false
  }
}

// 2. Vérifier les content types disponibles sur Railway
async function checkAvailableContentTypes() {
  console.log('\n2️⃣ Vérification des content types disponibles...')
  
  const contentTypes = [
    'formations',
    'partners', 
    'testimonials',
    'articles-blog',
    'site-setting',
    'formation-categories'
  ]
  
  for (const contentType of contentTypes) {
    try {
      const response = await fetch(`${RAILWAY_STRAPI_URL}/api/${contentType}`)
      const status = response.status
      
      if (status === 200) {
        const data = await response.json()
        console.log(`   ✅ ${contentType}: ${data.data?.length || 'singleton'} entrées`)
      } else if (status === 404) {
        console.log(`   ❌ ${contentType}: Content type manquant (404)`)
      } else {
        console.log(`   ⚠️ ${contentType}: Status ${status}`)
      }
    } catch (error) {
      console.log(`   ❌ ${contentType}: Erreur ${error.message}`)
    }
  }
}

// 3. Vérifier les médias et URLs localhost
async function checkMediaURLs() {
  console.log('\n3️⃣ Vérification des URLs de médias...')
  
  try {
    // Vérifier site-setting pour la vidéo hero
    const siteSettingResponse = await fetch(`${RAILWAY_STRAPI_URL}/api/site-setting?populate=*`)
    
    if (siteSettingResponse.ok) {
      const siteData = await siteSettingResponse.json()
      const heroVideo = siteData.data?.attributes?.heroVideo
      
      if (heroVideo?.data?.attributes?.url) {
        const videoURL = heroVideo.data.attributes.url
        console.log(`   Vidéo hero trouvée: ${videoURL}`)
        
        if (videoURL.includes('localhost')) {
          console.log(`   ❌ URL localhost détectée en production!`)
          console.log(`   🔧 Action requise: Remplacer par l'URL Railway`)
        } else {
          console.log(`   ✅ URL de production correcte`)
        }
      } else {
        console.log(`   ⚠️ Aucune vidéo hero configurée`)
      }
    } else {
      console.log(`   ❌ Site settings non disponible (${siteSettingResponse.status})`)
    }
  } catch (error) {
    console.log(`   ❌ Erreur vérification médias: ${error.message}`)
  }
}

// 4. Tester la connectivité depuis Vercel
async function testVercelConnectivity() {
  console.log('\n4️⃣ Test de connectivité Vercel → Railway...')
  
  try {
    // Simuler une requête depuis Vercel
    const testEndpoints = [
      '/api/formations?populate=*',
      '/api/partners?populate=*&sort=ordre:asc',
      '/api/site-setting?populate=*'
    ]
    
    for (const endpoint of testEndpoints) {
      const response = await fetch(`${RAILWAY_STRAPI_URL}${endpoint}`)
      console.log(`   ${endpoint}: ${response.status} ${response.statusText}`)
      
      if (response.status === 404) {
        console.log(`     ❌ Endpoint manquant - vérifier le content type`)
      } else if (response.ok) {
        console.log(`     ✅ Endpoint fonctionnel`)
      }
    }
  } catch (error) {
    console.log(`   ❌ Erreur test connectivité: ${error.message}`)
  }
}

// 5. Proposer des solutions
function proposeSolutions() {
  console.log('\n🔧 SOLUTIONS RECOMMANDÉES:\n')
  
  console.log('1. Pour l\'erreur Mixed Content (localhost URLs):')
  console.log('   - Vérifier que NEXT_PUBLIC_STRAPI_URL est bien défini sur Vercel')
  console.log('   - Redéployer après avoir mis à jour les variables d\'environnement')
  console.log('   - Commande: vercel env pull .env.local\n')
  
  console.log('2. Pour l\'erreur 404 sur /api/partners:')
  console.log('   - Créer le content type "partners" sur Railway Strapi')
  console.log('   - Importer les données des partenaires')
  console.log('   - Configurer les permissions publiques\n')
  
  console.log('3. Pour la vidéo 503 Service Unavailable:')
  console.log('   - Uploader la vidéo sur Railway Strapi')
  console.log('   - Mettre à jour site-setting avec la nouvelle URL')
  console.log('   - Vérifier les permissions de lecture des médias\n')
  
  console.log('4. Actions immédiates:')
  console.log('   - Exécuter: node scripts/create-missing-partners-content-type.js')
  console.log('   - Exécuter: node scripts/fix-hero-video-url.js')
  console.log('   - Redéployer sur Vercel')
}

// Fonction principale
async function main() {
  console.log('🚀 Diagnostic de production CMA Education\n')
  
  await checkRailwayStrapi()
  await checkAvailableContentTypes()
  await checkMediaURLs()
  await testVercelConnectivity()
  
  proposeSolutions()
  
  console.log('\n✅ Diagnostic terminé!')
  console.log('📋 Consultez les solutions ci-dessus pour corriger les problèmes.')
}

// Exécution
if (require.main === module) {
  main().catch(console.error)
}

module.exports = { main }