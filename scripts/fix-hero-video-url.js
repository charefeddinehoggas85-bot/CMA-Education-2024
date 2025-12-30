#!/usr/bin/env node

/**
 * Script pour corriger l'URL de la vidéo hero qui pointe vers localhost
 * et la remplacer par l'URL Railway correcte
 */

const STRAPI_URL = 'https://cma-education-strapi-production.up.railway.app'
const STRAPI_TOKEN = '62559d2051c7e5f7576a0e12524b1a160a5dde2b9c0428afd257df0c5ec8b81ae33683899ae9fadd3e6b6d2853b858f31343efbae9b692bf785758173d01428e43ed02efec664f698718fa44079f64b3b03e1e6663d1200ab0b5cf6345fd78cbd11f41b02be1303e7f122e18aa18be690225201a96cbe8aa71d8229deba2e94ec236385a2013ba8db694ccbdf80a49a5cc3e0499ae408caa45dddb48f2a9ed35fd17a8a9eedb71fbf587e0806ccc282a4c62f8aa575457bc480b312f9740d1f3e1651e196a507075ed08a858b8dda30c5c1ffc88b61352c9436b7fddeb70f6668b194166d1a18133990d6da183edb6a0f4f4694f716d'

console.log('🎬 Correction de l\'URL de la vidéo hero...\n')

// 1. Vérifier le site-setting actuel
async function checkCurrentSiteSetting() {
  console.log('1️⃣ Vérification du site-setting actuel...')
  
  try {
    const response = await fetch(`${STRAPI_URL}/api/site-setting?populate=*`, {
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`
      }
    })
    
    if (response.ok) {
      const data = await response.json()
      console.log('✅ Site-setting trouvé')
      
      const heroVideo = data.data?.attributes?.heroVideo
      if (heroVideo?.data?.attributes?.url) {
        const videoURL = heroVideo.data.attributes.url
        console.log(`   Vidéo actuelle: ${videoURL}`)
        
        if (videoURL.includes('localhost')) {
          console.log('❌ URL localhost détectée!')
          return { needsFix: true, currentData: data.data, videoId: heroVideo.data.id }
        } else {
          console.log('✅ URL de production correcte')
          return { needsFix: false, currentData: data.data }
        }
      } else {
        console.log('⚠️ Aucune vidéo hero configurée')
        return { needsFix: false, currentData: data.data }
      }
    } else {
      console.log(`❌ Erreur récupération site-setting: ${response.status}`)
      return { needsFix: false, currentData: null }
    }
  } catch (error) {
    console.log(`❌ Erreur: ${error.message}`)
    return { needsFix: false, currentData: null }
  }
}

// 2. Lister les médias disponibles
async function listAvailableMedia() {
  console.log('\n2️⃣ Recherche de vidéos disponibles...')
  
  try {
    const response = await fetch(`${STRAPI_URL}/api/upload/files`, {
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`
      }
    })
    
    if (response.ok) {
      const files = await response.json()
      const videos = files.filter(file => 
        file.mime?.startsWith('video/') || 
        file.ext?.match(/\.(mp4|webm|mov|avi)$/i)
      )
      
      console.log(`📁 ${videos.length} vidéo(s) trouvée(s):`)
      videos.forEach(video => {
        console.log(`   - ${video.name} (ID: ${video.id})`)
        console.log(`     URL: ${video.url}`)
        console.log(`     Taille: ${(video.size / 1024 / 1024).toFixed(2)} MB`)
      })
      
      return videos
    } else {
      console.log(`❌ Erreur récupération médias: ${response.status}`)
      return []
    }
  } catch (error) {
    console.log(`❌ Erreur: ${error.message}`)
    return []
  }
}

// 3. Uploader une nouvelle vidéo si nécessaire
async function uploadHeroVideo() {
  console.log('\n3️⃣ Upload d\'une vidéo de démonstration...')
  
  // Pour l'instant, on va créer un placeholder ou utiliser une vidéo existante
  console.log('⚠️ Aucune vidéo locale à uploader')
  console.log('💡 Solutions:')
  console.log('   1. Uploader manuellement via l\'admin Strapi')
  console.log('   2. Utiliser une vidéo externe (YouTube, Vimeo)')
  console.log('   3. Désactiver temporairement la vidéo hero')
  
  return null
}

// 4. Mettre à jour le site-setting
async function updateSiteSetting(siteSettingId, newVideoId = null) {
  console.log('\n4️⃣ Mise à jour du site-setting...')
  
  try {
    let updateData = {}
    
    if (newVideoId) {
      updateData.heroVideo = newVideoId
      console.log(`🔄 Association de la nouvelle vidéo (ID: ${newVideoId})`)
    } else {
      // Supprimer la référence à la vidéo hero pour éviter l'erreur
      updateData.heroVideo = null
      console.log('🚫 Suppression temporaire de la vidéo hero')
    }
    
    const response = await fetch(`${STRAPI_URL}/api/site-setting`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`
      },
      body: JSON.stringify({
        data: updateData
      })
    })
    
    if (response.ok) {
      const result = await response.json()
      console.log('✅ Site-setting mis à jour avec succès')
      return true
    } else {
      const error = await response.text()
      console.log(`❌ Erreur mise à jour: ${response.status}`, error)
      return false
    }
  } catch (error) {
    console.log(`❌ Erreur: ${error.message}`)
    return false
  }
}

// 5. Vérifier la correction
async function verifyFix() {
  console.log('\n5️⃣ Vérification de la correction...')
  
  try {
    // Test public (sans token)
    const response = await fetch(`${STRAPI_URL}/api/site-setting?populate=*`)
    
    if (response.ok) {
      const data = await response.json()
      const heroVideo = data.data?.attributes?.heroVideo
      
      if (!heroVideo || !heroVideo.data) {
        console.log('✅ Vidéo hero désactivée - plus d\'erreur Mixed Content')
        return true
      } else {
        const videoURL = heroVideo.data.attributes.url
        if (!videoURL.includes('localhost')) {
          console.log(`✅ Vidéo hero corrigée: ${videoURL}`)
          return true
        } else {
          console.log('❌ URL localhost encore présente')
          return false
        }
      }
    } else {
      console.log(`❌ Erreur vérification: ${response.status}`)
      return false
    }
  } catch (error) {
    console.log(`❌ Erreur: ${error.message}`)
    return false
  }
}

// Fonction principale
async function main() {
  console.log('🎯 Objectif: Corriger l\'erreur Mixed Content de la vidéo hero\n')
  
  // Vérifier le problème
  const checkResult = await checkCurrentSiteSetting()
  
  if (!checkResult.needsFix) {
    console.log('✅ Aucune correction nécessaire')
    return
  }
  
  // Lister les médias disponibles
  const availableVideos = await listAvailableMedia()
  
  // Pour l'instant, on va désactiver la vidéo hero pour corriger l'erreur
  console.log('\n🔧 Application de la correction temporaire...')
  console.log('   → Désactivation de la vidéo hero pour éviter l\'erreur Mixed Content')
  
  const success = await updateSiteSetting(checkResult.currentData.id, null)
  
  if (success) {
    await verifyFix()
    
    console.log('\n🎉 Correction appliquée!')
    console.log('📋 Prochaines étapes:')
    console.log('   1. Uploader une nouvelle vidéo via l\'admin Strapi')
    console.log('   2. L\'associer au site-setting')
    console.log('   3. Ou utiliser une vidéo externe (YouTube embed)')
    console.log('\n🔗 Admin Strapi: https://cma-education-strapi-production.up.railway.app/admin')
  }
}

// Exécution
if (require.main === module) {
  main().catch(console.error)
}

module.exports = { main }