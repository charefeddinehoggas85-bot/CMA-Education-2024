#!/usr/bin/env node

/**
 * Script de vérification rapide pour confirmer que les corrections
 * ont résolu les erreurs de production
 */

const VERCEL_SITE = 'https://cma-education-2024.vercel.app'
const RAILWAY_STRAPI = 'https://cma-education-strapi-production.up.railway.app'

console.log('🔍 Vérification des corrections de production...\n')

// 1. Tester la connectivité Railway Strapi
async function testRailwayStrapi() {
  console.log('1️⃣ Test Railway Strapi...')
  
  const endpoints = [
    '/api/formations',
    '/api/site-setting',
    '/api/testimonials'
  ]
  
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(`${RAILWAY_STRAPI}${endpoint}`)
      const status = response.status === 200 ? '✅' : '❌'
      console.log(`   ${endpoint}: ${status} ${response.status}`)
    } catch (error) {
      console.log(`   ${endpoint}: ❌ ERROR`)
    }
  }
}

// 2. Vérifier que le site Vercel ne charge plus localhost
async function checkVercelSite() {
  console.log('\n2️⃣ Test site Vercel...')
  
  try {
    const response = await fetch(VERCEL_SITE)
    
    if (response.ok) {
      console.log('   ✅ Site accessible')
      
      // Vérifier les headers pour s'assurer qu'il n'y a pas de redirection vers localhost
      const html = await response.text()
      
      if (html.includes('localhost:1337')) {
        console.log('   ❌ Références localhost encore présentes dans le HTML')
        console.log('   🔧 Action: Vérifier les variables d\'environnement Vercel')
      } else {
        console.log('   ✅ Plus de références localhost dans le HTML')
      }
    } else {
      console.log(`   ❌ Site inaccessible: ${response.status}`)
    }
  } catch (error) {
    console.log(`   ❌ Erreur: ${error.message}`)
  }
}

// 3. Tester les APIs depuis le frontend
async function testFrontendAPIs() {
  console.log('\n3️⃣ Test APIs depuis le frontend...')
  
  // Simuler les appels que fait le frontend
  const testCalls = [
    { name: 'Formations', url: `${RAILWAY_STRAPI}/api/formations?populate=*` },
    { name: 'Site Settings', url: `${RAILWAY_STRAPI}/api/site-setting?populate=*` },
    { name: 'Testimonials', url: `${RAILWAY_STRAPI}/api/testimonials?populate=*` }
  ]
  
  for (const test of testCalls) {
    try {
      const response = await fetch(test.url)
      const status = response.status === 200 ? '✅' : '❌'
      
      if (response.ok) {
        const data = await response.json()
        const count = Array.isArray(data.data) ? data.data.length : 'singleton'
        console.log(`   ${test.name}: ${status} ${count} entrées`)
      } else {
        console.log(`   ${test.name}: ${status} ${response.status}`)
      }
    } catch (error) {
      console.log(`   ${test.name}: ❌ ERROR`)
    }
  }
}

// 4. Vérifier les erreurs spécifiques
async function checkSpecificErrors() {
  console.log('\n4️⃣ Vérification des erreurs spécifiques...')
  
  // Test Partners API (doit être 404 si pas encore créé)
  try {
    const partnersResponse = await fetch(`${RAILWAY_STRAPI}/api/partners`)
    if (partnersResponse.status === 404) {
      console.log('   ⚠️ Partners API: 404 (normal - content type pas encore créé)')
    } else if (partnersResponse.status === 200) {
      console.log('   ✅ Partners API: Fonctionnel')
    } else {
      console.log(`   ❌ Partners API: ${partnersResponse.status}`)
    }
  } catch (error) {
    console.log('   ❌ Partners API: Erreur réseau')
  }
  
  // Test Site Settings pour vidéo hero
  try {
    const siteResponse = await fetch(`${RAILWAY_STRAPI}/api/site-setting?populate=*`)
    if (siteResponse.ok) {
      const siteData = await siteResponse.json()
      const heroVideo = siteData.data?.attributes?.heroVideo
      
      if (!heroVideo || !heroVideo.data) {
        console.log('   ✅ Vidéo hero: Désactivée (plus d\'erreur localhost)')
      } else {
        const videoUrl = heroVideo.data.attributes.url
        if (videoUrl.includes('localhost')) {
          console.log('   ❌ Vidéo hero: URL localhost encore présente')
        } else {
          console.log('   ✅ Vidéo hero: URL production correcte')
        }
      }
    }
  } catch (error) {
    console.log('   ❌ Site Settings: Erreur réseau')
  }
}

// 5. Résumé et recommandations
function provideSummary() {
  console.log('\n5️⃣ Résumé et recommandations:')
  
  console.log('\n📋 Si tout est ✅:')
  console.log('   - Site fonctionnel sans erreurs')
  console.log('   - Plus d\'erreur ERR_CONNECTION_REFUSED')
  console.log('   - APIs Railway accessibles')
  
  console.log('\n📋 Si des ❌ persistent:')
  console.log('   1. Vérifier les variables d\'environnement Vercel')
  console.log('   2. Redéployer: vercel --prod')
  console.log('   3. Attendre 2-3 minutes pour la propagation')
  
  console.log('\n📋 Prochaines étapes (optionnelles):')
  console.log('   1. Créer le content type Partners sur Railway')
  console.log('   2. Réactiver la vidéo hero avec URL correcte')
  
  console.log('\n🔗 Liens de vérification:')
  console.log(`   - Site: ${VERCEL_SITE}`)
  console.log(`   - Strapi: ${RAILWAY_STRAPI}/admin`)
}

// Fonction principale
async function main() {
  console.log('🎯 Vérification complète des corrections de production\n')
  
  await testRailwayStrapi()
  await checkVercelSite()
  await testFrontendAPIs()
  await checkSpecificErrors()
  
  provideSummary()
  
  console.log('\n✅ Vérification terminée!')
}

// Exécution
if (require.main === module) {
  main().catch(console.error)
}

module.exports = { main }