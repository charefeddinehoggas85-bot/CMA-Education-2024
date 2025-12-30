#!/usr/bin/env node

/**
 * Script final pour résoudre définitivement le problème localhost
 * en supprimant la vidéo hero problématique sur Railway Strapi
 */

const STRAPI_URL = 'https://cma-education-strapi-production.up.railway.app'
const STRAPI_TOKEN = '62559d2051c7e5f7576a0e12524b1a160a5dde2b9c0428afd257df0c5ec8b81ae33683899ae9fadd3e6b6d2853b858f31343efbae9b692bf785758173d01428e43ed02efec664f698718fa44079f64b3b03e1e6663d1200ab0b5cf6345fd78cbd11f41b02be1303e7f122e18aa18be690225201a96cbe8aa71d8229deba2e94ec236385a2013ba8db694ccbdf80a49a5cc3e0499ae408caa45dddb48f2a9ed35fd17a8a9eedb71fbf587e0806ccc282a4c62f8aa575457bc480b312f9740d1f3e1651e196a507075ed08a858b8dda30c5c1ffc88b61352c9436b7fddeb70f6668b194166d1a18133990d6da183edb6a0f4f4694f716d'

console.log('🎯 CORRECTION FINALE - Élimination définitive des références localhost\n')

// 1. Supprimer définitivement la vidéo hero avec URL localhost
async function removeHeroVideoDefinitively() {
  console.log('1️⃣ Suppression définitive de la vidéo hero localhost...')
  
  try {
    // Récupérer le site-setting actuel
    const getResponse = await fetch(`${STRAPI_URL}/api/site-setting?populate=*`, {
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`
      }
    })
    
    if (!getResponse.ok) {
      console.log(`❌ Erreur récupération site-setting: ${getResponse.status}`)
      return false
    }
    
    const siteData = await getResponse.json()
    const heroVideo = siteData.data?.attributes?.heroVideo
    
    if (heroVideo?.data?.attributes?.url?.includes('localhost')) {
      console.log(`❌ Vidéo localhost détectée: ${heroVideo.data.attributes.url}`)
      
      // Supprimer la référence à la vidéo hero
      const updateResponse = await fetch(`${STRAPI_URL}/api/site-setting`, {
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
      
      if (updateResponse.ok) {
        console.log('✅ Vidéo hero supprimée définitivement')
        
        // Supprimer aussi le fichier média si possible
        if (heroVideo.data.id) {
          try {
            const deleteMediaResponse = await fetch(`${STRAPI_URL}/api/upload/files/${heroVideo.data.id}`, {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${STRAPI_TOKEN}`
              }
            })
            
            if (deleteMediaResponse.ok) {
              console.log('✅ Fichier média supprimé également')
            } else {
              console.log('⚠️ Fichier média non supprimé (pas critique)')
            }
          } catch (error) {
            console.log('⚠️ Erreur suppression média (pas critique)')
          }
        }
        
        return true
      } else {
        console.log(`❌ Erreur suppression vidéo: ${updateResponse.status}`)
        return false
      }
    } else {
      console.log('✅ Aucune vidéo localhost trouvée')
      return true
    }
  } catch (error) {
    console.log(`❌ Erreur: ${error.message}`)
    return false
  }
}

// 2. Vérifier que toutes les URLs localhost sont éliminées
async function verifyNoLocalhostURLs() {
  console.log('\n2️⃣ Vérification complète - élimination des URLs localhost...')
  
  try {
    // Vérifier site-setting
    const siteResponse = await fetch(`${STRAPI_URL}/api/site-setting?populate=*`)
    if (siteResponse.ok) {
      const siteData = await siteResponse.json()
      const heroVideo = siteData.data?.attributes?.heroVideo
      
      if (!heroVideo || !heroVideo.data) {
        console.log('✅ Site-setting: Aucune vidéo hero')
      } else {
        const videoUrl = heroVideo.data.attributes.url
        if (videoUrl.includes('localhost')) {
          console.log('❌ Site-setting: URL localhost encore présente')
          return false
        } else {
          console.log('✅ Site-setting: URL production correcte')
        }
      }
    }
    
    // Vérifier tous les médias
    const mediaResponse = await fetch(`${STRAPI_URL}/api/upload/files`, {
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`
      }
    })
    
    if (mediaResponse.ok) {
      const files = await mediaResponse.json()
      const localhostFiles = files.filter(file => 
        file.url && file.url.includes('localhost')
      )
      
      if (localhostFiles.length === 0) {
        console.log('✅ Médias: Aucune URL localhost')
      } else {
        console.log(`❌ Médias: ${localhostFiles.length} fichier(s) avec URL localhost`)
        return false
      }
    }
    
    return true
  } catch (error) {
    console.log(`❌ Erreur vérification: ${error.message}`)
    return false
  }
}

// 3. Tester le site de production
async function testProductionSite() {
  console.log('\n3️⃣ Test du site de production...')
  
  try {
    const response = await fetch('https://cma-education-2024.vercel.app')
    
    if (response.ok) {
      const html = await response.text()
      const localhostMatches = html.match(/localhost:1337/g) || []
      
      console.log(`📊 Références localhost dans le HTML: ${localhostMatches.length}`)
      
      if (localhostMatches.length === 0) {
        console.log('✅ HTML de production: Aucune référence localhost')
        return true
      } else {
        console.log('❌ HTML de production: Références localhost encore présentes')
        console.log('🔧 Action requise: Configurer les variables d\'environnement Vercel')
        return false
      }
    } else {
      console.log(`❌ Site inaccessible: ${response.status}`)
      return false
    }
  } catch (error) {
    console.log(`❌ Erreur test site: ${error.message}`)
    return false
  }
}

// 4. Instructions finales
function finalInstructions(strapiFixed, siteFixed) {
  console.log('\n4️⃣ Instructions finales:')
  
  console.log('\n📊 État actuel:')
  console.log(`   Strapi Railway: ${strapiFixed ? '✅' : '❌'}`)
  console.log(`   Site Vercel: ${siteFixed ? '✅' : '❌'}`)
  
  if (strapiFixed && siteFixed) {
    console.log('\n🎉 PROBLÈME RÉSOLU!')
    console.log('   ✅ Plus de références localhost')
    console.log('   ✅ Site entièrement fonctionnel')
    console.log('   ✅ Plus d\'erreur ERR_CONNECTION_REFUSED')
  } else if (strapiFixed && !siteFixed) {
    console.log('\n⚠️ STRAPI CORRIGÉ - VERCEL À CONFIGURER')
    console.log('\n🔧 Actions Vercel OBLIGATOIRES:')
    console.log('   1. vercel env add NEXT_PUBLIC_STRAPI_URL production')
    console.log('   2. Entrer: https://cma-education-strapi-production.up.railway.app')
    console.log('   3. vercel --prod')
    console.log('   4. Attendre 2-3 minutes')
    console.log('   5. Relancer ce script pour vérifier')
  } else {
    console.log('\n❌ CORRECTIONS REQUISES')
    console.log('   - Vérifier les permissions Strapi')
    console.log('   - Configurer les variables Vercel')
  }
}

// Fonction principale
async function main() {
  console.log('🎯 Objectif: Éliminer définitivement toutes les références localhost\n')
  
  // Supprimer la vidéo hero localhost
  const strapiFixed = await removeHeroVideoDefinitively()
  
  // Vérifier l'élimination complète
  const noLocalhostURLs = await verifyNoLocalhostURLs()
  
  // Tester le site de production
  const siteFixed = await testProductionSite()
  
  // Instructions finales
  finalInstructions(strapiFixed && noLocalhostURLs, siteFixed)
  
  console.log('\n✅ Correction finale terminée!')
  
  if (strapiFixed && noLocalhostURLs && siteFixed) {
    console.log('🚀 Votre site est maintenant entièrement fonctionnel!')
  } else {
    console.log('🔧 Suivez les instructions ci-dessus pour finaliser la correction.')
  }
}

// Exécution
if (require.main === module) {
  main().catch(console.error)
}

module.exports = { main }