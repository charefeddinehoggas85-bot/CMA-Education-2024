#!/usr/bin/env node

/**
 * Script pour vérifier les APIs disponibles pour la page À propos
 */

const axios = require('axios')

const STRAPI_URL = 'http://localhost:1337'

async function checkAvailableAPIs() {
  console.log('🔍 Vérification des APIs disponibles...\n')
  
  const apisToCheck = [
    'page-abouts',
    'about-pages', 
    'pages',
    'sections',
    'site-settings',
    'content-sections'
  ]
  
  for (const api of apisToCheck) {
    try {
      const response = await axios.get(`${STRAPI_URL}/api/${api}`)
      console.log(`✅ API /${api} disponible - ${response.data.data?.length || 0} éléments`)
      
      if (response.data.data && response.data.data.length > 0) {
        console.log(`   Premier élément:`, {
          id: response.data.data[0].id,
          attributes: Object.keys(response.data.data[0].attributes || {})
        })
      }
    } catch (error) {
      if (error.response?.status === 404) {
        console.log(`❌ API /${api} non trouvée`)
      } else {
        console.log(`⚠️ API /${api} - Erreur: ${error.message}`)
      }
    }
  }
}

async function checkSiteSettings() {
  try {
    console.log('\n🔍 Vérification des paramètres du site...')
    const response = await axios.get(`${STRAPI_URL}/api/site-setting`)
    
    console.log('✅ Site settings trouvés:')
    console.log('   Attributs disponibles:', Object.keys(response.data.data.attributes || {}))
    
    const attributes = response.data.data.attributes
    if (attributes.aboutTitle || attributes.aboutDescription) {
      console.log('   📄 Contenu À propos existant:')
      if (attributes.aboutTitle) console.log(`     Titre: ${attributes.aboutTitle}`)
      if (attributes.aboutDescription) console.log(`     Description: ${attributes.aboutDescription.substring(0, 100)}...`)
    }
    
    return response.data.data
  } catch (error) {
    console.log('❌ Site settings non trouvés:', error.message)
    return null
  }
}

async function main() {
  await checkAvailableAPIs()
  await checkSiteSettings()
  
  console.log('\n💡 Recommandations:')
  console.log('1. Si site-settings existe, on peut ajouter le contenu "Notre Histoire" là')
  console.log('2. Sinon, on peut créer un nouveau content type spécifique')
  console.log('3. Ou utiliser une API existante comme "pages" ou "sections"')
}

main().catch(console.error)