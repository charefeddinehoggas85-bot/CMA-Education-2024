#!/usr/bin/env node

/**
 * Script pour ajouter le contenu "Notre Histoire" via l'API pages
 */

const axios = require('axios')

const STRAPI_URL = 'http://localhost:1337'

const histoireContent = {
  title: "Notre Histoire",
  content: "Créée par des experts, l'Academy est née de la volonté de repenser la formation afin de mieux répondre aux défis actuels et futurs du secteur du BTP, tout en s'adaptant précisément aux besoins réels des entreprises. Experts du BTP et de la formation, nous conjuguons savoir-faire pédagogique et expérience terrain pour accompagner votre réussite professionnelle.",
  slug: "notre-histoire",
  section: "about"
}

async function checkPagesAPI() {
  try {
    console.log('🔍 Vérification de l\'API pages...')
    const response = await axios.get(`${STRAPI_URL}/api/pages`)
    
    console.log(`✅ API pages disponible - ${response.data.data?.length || 0} éléments`)
    
    if (response.data.data && response.data.data.length > 0) {
      console.log('📄 Pages existantes:')
      response.data.data.forEach(page => {
        console.log(`  • ID: ${page.id}`)
        console.log(`    Attributs: ${Object.keys(page.attributes || {}).join(', ')}`)
        if (page.attributes.title) console.log(`    Titre: ${page.attributes.title}`)
        if (page.attributes.slug) console.log(`    Slug: ${page.attributes.slug}`)
        console.log('')
      })
    }
    
    return response.data.data
  } catch (error) {
    console.error('❌ Erreur lors de la vérification de l\'API pages:', error.message)
    return null
  }
}

async function addHistoireToPages() {
  try {
    console.log('📝 Ajout du contenu "Notre Histoire" via l\'API pages...')
    
    const pageData = {
      data: histoireContent
    }
    
    const response = await axios.post(
      `${STRAPI_URL}/api/pages`,
      pageData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    
    console.log('✅ Contenu "Notre Histoire" ajouté avec succès!')
    console.log('📄 Détails de la page créée:')
    console.log(`   ID: ${response.data.data.id}`)
    console.log(`   Titre: ${response.data.data.attributes.title}`)
    console.log(`   Slug: ${response.data.data.attributes.slug}`)
    
    return response.data.data
  } catch (error) {
    console.error('❌ Erreur lors de l\'ajout:', error.response?.data || error.message)
    
    if (error.response?.status === 400) {
      console.log('\n💡 L\'API pages pourrait nécessiter des champs spécifiques.')
      console.log('Essayons de voir la structure attendue...')
      
      // Essayer avec une structure minimale
      try {
        const minimalData = {
          data: {
            title: histoireContent.title,
            content: histoireContent.content
          }
        }
        
        const retryResponse = await axios.post(
          `${STRAPI_URL}/api/pages`,
          minimalData,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        
        console.log('✅ Contenu ajouté avec structure minimale!')
        return retryResponse.data.data
      } catch (retryError) {
        console.error('❌ Échec avec structure minimale:', retryError.response?.data || retryError.message)
      }
    }
    
    return null
  }
}

async function checkExistingHistoire() {
  try {
    console.log('🔍 Vérification si "Notre Histoire" existe déjà...')
    const response = await axios.get(`${STRAPI_URL}/api/pages`)
    
    const existingPage = response.data.data?.find(page => 
      page.attributes.title === 'Notre Histoire' ||
      page.attributes.slug === 'notre-histoire' ||
      (page.attributes.content && page.attributes.content.includes('Academy est née'))
    )
    
    if (existingPage) {
      console.log('⚠️ Une page "Notre Histoire" existe déjà:')
      console.log(`   ID: ${existingPage.id}`)
      console.log(`   Titre: ${existingPage.attributes.title}`)
      return existingPage
    }
    
    console.log('ℹ️ Aucune page "Notre Histoire" trouvée')
    return null
  } catch (error) {
    console.error('❌ Erreur lors de la vérification:', error.message)
    return null
  }
}

async function updateExistingHistoire(pageId) {
  try {
    console.log(`📝 Mise à jour de la page existante (ID: ${pageId})...`)
    
    const updateData = {
      data: histoireContent
    }
    
    const response = await axios.put(
      `${STRAPI_URL}/api/pages/${pageId}`,
      updateData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    
    console.log('✅ Page "Notre Histoire" mise à jour avec succès!')
    return response.data.data
  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour:', error.response?.data || error.message)
    return null
  }
}

async function main() {
  console.log('🚀 Ajout du contenu "Notre Histoire" à la page À propos\n')
  
  // 1. Vérifier l'API pages
  const pages = await checkPagesAPI()
  if (pages === null) {
    console.log('❌ Impossible d\'accéder à l\'API pages')
    return
  }
  
  // 2. Vérifier si le contenu existe déjà
  const existingPage = await checkExistingHistoire()
  
  if (existingPage) {
    // 3a. Mettre à jour le contenu existant
    const updated = await updateExistingHistoire(existingPage.id)
    if (updated) {
      console.log('\n🎉 Contenu "Notre Histoire" mis à jour avec succès!')
    }
  } else {
    // 3b. Ajouter le nouveau contenu
    const created = await addHistoireToPages()
    if (created) {
      console.log('\n🎉 Contenu "Notre Histoire" ajouté avec succès!')
    }
  }
  
  console.log('\n💡 Prochaines étapes:')
  console.log('1. Vérifiez le contenu dans l\'admin Strapi')
  console.log('2. Modifiez le composant AboutSection pour récupérer ce contenu')
  console.log('3. Testez l\'affichage sur la page À propos')
}

main().catch(console.error)