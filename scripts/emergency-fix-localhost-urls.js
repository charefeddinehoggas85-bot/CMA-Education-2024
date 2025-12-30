#!/usr/bin/env node

/**
 * Script d'urgence pour supprimer toutes les références localhost
 * qui causent les erreurs ERR_CONNECTION_REFUSED en production
 */

const STRAPI_URL = 'https://cma-education-strapi-production.up.railway.app'
const STRAPI_TOKEN = '62559d2051c7e5f7576a0e12524b1a160a5dde2b9c0428afd257df0c5ec8b81ae33683899ae9fadd3e6b6d2853b858f31343efbae9b692bf785758173d01428e43ed02efec664f698718fa44079f64b3b03e1e6663d1200ab0b5cf6345fd78cbd11f41b02be1303e7f122e18aa18be690225201a96cbe8aa71d8229deba2e94ec236385a2013ba8db694ccbdf80a49a5cc3e0499ae408caa45dddb48f2a9ed35fd17a8a9eedb71fbf587e0806ccc282a4c62f8aa575457bc480b312f9740d1f3e1651e196a507075ed08a858b8dda30c5c1ffc88b61352c9436b7fddeb70f6668b194166d1a18133990d6da183edb6a0f4f4694f716d'

console.log('🚨 CORRECTION D\'URGENCE - Suppression des URLs localhost\n')

// 1. Supprimer la vidéo hero avec URL localhost
async function removeLocalhostHeroVideo() {
  console.log('1️⃣ Suppression de la vidéo hero localhost...')
  
  try {
    const response = await fetch(`${STRAPI_URL}/api/site-setting`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`
      },
      body: JSON.stringify({
        data: {
          heroVideo: null
        }
      })
    })
    
    if (response.ok) {
      console.log('✅ Vidéo hero supprimée - plus d\'erreur ERR_CONNECTION_REFUSED')
      return true
    } else {
      console.log(`❌ Erreur suppression vidéo: ${response.status}`)
      return false
    }
  } catch (error) {
    console.log(`❌ Erreur: ${error.message}`)
    return false
  }
}

// 2. Vérifier et nettoyer tous les médias avec URLs localhost
async function cleanLocalhostMedias() {
  console.log('\n2️⃣ Nettoyage des médias avec URLs localhost...')
  
  try {
    const response = await fetch(`${STRAPI_URL}/api/upload/files`, {
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`
      }
    })
    
    if (response.ok) {
      const files = await response.json()
      const localhostFiles = files.filter(file => 
        file.url && file.url.includes('localhost')
      )
      
      console.log(`📁 ${localhostFiles.length} fichier(s) avec URL localhost trouvé(s)`)
      
      for (const file of localhostFiles) {
        console.log(`   - ${file.name}: ${file.url}`)
        
        // Supprimer le fichier avec URL localhost
        try {
          const deleteResponse = await fetch(`${STRAPI_URL}/api/upload/files/${file.id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${STRAPI_TOKEN}`
            }
          })
          
          if (deleteResponse.ok) {
            console.log(`     ✅ Supprimé`)
          } else {
            console.log(`     ❌ Erreur suppression: ${deleteResponse.status}`)
          }
        } catch (error) {
          console.log(`     ❌ Erreur: ${error.message}`)
        }
      }
      
      return true
    } else {
      console.log(`❌ Erreur récupération médias: ${response.status}`)
      return false
    }
  } catch (error) {
    console.log(`❌ Erreur: ${error.message}`)
    return false
  }
}

// 3. Vérifier les variables d'environnement Vercel
function checkEnvironmentVariables() {
  console.log('\n3️⃣ Vérification des variables d\'environnement...')
  
  const currentStrapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL
  
  if (!currentStrapiUrl) {
    console.log('❌ NEXT_PUBLIC_STRAPI_URL non définie')
    console.log('🔧 Action requise sur Vercel:')
    console.log('   vercel env add NEXT_PUBLIC_STRAPI_URL production')
    console.log('   → https://cma-education-strapi-production.up.railway.app')
    return false
  } else if (currentStrapiUrl.includes('localhost')) {
    console.log(`❌ NEXT_PUBLIC_STRAPI_URL contient localhost: ${currentStrapiUrl}`)
    console.log('🔧 Action requise sur Vercel:')
    console.log('   vercel env rm NEXT_PUBLIC_STRAPI_URL production')
    console.log('   vercel env add NEXT_PUBLIC_STRAPI_URL production')
    console.log('   → https://cma-education-strapi-production.up.railway.app')
    return false
  } else {
    console.log(`✅ NEXT_PUBLIC_STRAPI_URL correcte: ${currentStrapiUrl}`)
    return true
  }
}

// 4. Tester la correction
async function testFix() {
  console.log('\n4️⃣ Test de la correction...')
  
  try {
    // Tester site-setting sans vidéo localhost
    const response = await fetch(`${STRAPI_URL}/api/site-setting?populate=*`)
    
    if (response.ok) {
      const data = await response.json()
      const heroVideo = data.data?.attributes?.heroVideo
      
      if (!heroVideo || !heroVideo.data) {
        console.log('✅ Plus de vidéo hero - erreur ERR_CONNECTION_REFUSED corrigée')
        return true
      } else {
        const videoUrl = heroVideo.data.attributes.url
        if (videoUrl.includes('localhost')) {
          console.log('❌ URL localhost encore présente')
          return false
        } else {
          console.log(`✅ Vidéo hero avec URL correcte: ${videoUrl}`)
          return true
        }
      }
    } else {
      console.log(`❌ Erreur test: ${response.status}`)
      return false
    }
  } catch (error) {
    console.log(`❌ Erreur: ${error.message}`)
    return false
  }
}

// 5. Instructions de redéploiement
function deploymentInstructions() {
  console.log('\n5️⃣ Instructions de redéploiement:')
  
  console.log('\n🔧 Actions Vercel (OBLIGATOIRES):')
  console.log('1. Configurer la variable d\'environnement:')
  console.log('   vercel env add NEXT_PUBLIC_STRAPI_URL production')
  console.log('   → https://cma-education-strapi-production.up.railway.app')
  
  console.log('\n2. Redéployer immédiatement:')
  console.log('   vercel --prod')
  
  console.log('\n📋 Vérification post-déploiement:')
  console.log('   - Ouvrir: https://cma-education-2024.vercel.app')
  console.log('   - Console navigateur: plus d\'erreur ERR_CONNECTION_REFUSED')
  console.log('   - Site fonctionnel sans erreurs')
  
  console.log('\n⚡ CRITIQUE: Sans ces actions, le site restera cassé!')
}

// Fonction principale
async function main() {
  console.log('🎯 Objectif: Éliminer toutes les erreurs ERR_CONNECTION_REFUSED\n')
  
  // Supprimer la vidéo hero localhost
  const videoFixed = await removeLocalhostHeroVideo()
  
  // Nettoyer les médias localhost
  const mediasFixed = await cleanLocalhostMedias()
  
  // Vérifier les variables d'environnement
  const envOk = checkEnvironmentVariables()
  
  // Tester la correction
  const testOk = await testFix()
  
  console.log('\n📊 RÉSUMÉ:')
  console.log(`   Vidéo hero: ${videoFixed ? '✅' : '❌'}`)
  console.log(`   Médias: ${mediasFixed ? '✅' : '❌'}`)
  console.log(`   Variables env: ${envOk ? '✅' : '❌'}`)
  console.log(`   Test final: ${testOk ? '✅' : '❌'}`)
  
  if (videoFixed && testOk) {
    console.log('\n🎉 Correction côté Strapi terminée!')
    console.log('⚠️ IMPORTANT: Configurer Vercel et redéployer maintenant')
  } else {
    console.log('\n❌ Correction partielle - voir les erreurs ci-dessus')
  }
  
  deploymentInstructions()
}

// Exécution
if (require.main === module) {
  main().catch(console.error)
}

module.exports = { main }