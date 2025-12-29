#!/usr/bin/env node

/**
 * Script pour ajouter le contenu "Notre Histoire" à la page À propos via Strapi
 */

const axios = require('axios')

const STRAPI_URL = 'http://localhost:1337'
const STRAPI_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM1MTM5NzI4LCJleHAiOjE3Mzc3MzE3Mjh9.Wd8Wd8Wd8Wd8Wd8Wd8Wd8Wd8Wd8Wd8Wd8Wd8Wd8'

const histoireContent = {
  titre: "Notre Histoire",
  contenu: "Créée par des experts, l'Academy est née de la volonté de repenser la formation afin de mieux répondre aux défis actuels et futurs du secteur du BTP, tout en s'adaptant précisément aux besoins réels des entreprises. Experts du BTP et de la formation, nous conjuguons savoir-faire pédagogique et expérience terrain pour accompagner votre réussite professionnelle."
}

async function checkExistingContentTypes() {
  try {
    console.log('🔍 Vérification des content types existants...')
    
    // Vérifier les content types disponibles
    const response = await axios.get(`${STRAPI_URL}/api/content-type-builder/content-types`, {
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`
      }
    })
    
    const contentTypes = response.data.data
    console.log('📋 Content Types disponibles:')
    Object.keys(contentTypes).forEach(key => {
      const ct = contentTypes[key]
      console.log(`  • ${key}: ${ct.info?.displayName || 'Sans nom'}`)
    })
    
    return contentTypes
  } catch (error) {
    console.error('❌ Erreur lors de la vérification des content types:', error.message)
    return null
  }
}

async function createAboutPageContentType() {
  try {
    console.log('🏗️ Création du content type "Page À Propos"...')
    
    const contentTypeData = {
      contentType: {
        uid: 'api::page-about.page-about',
        displayName: 'Page À Propos',
        singularName: 'page-about',
        pluralName: 'page-abouts',
        description: 'Contenu de la page À propos',
        collectionName: 'page_abouts',
        attributes: {
          titre: {
            type: 'string',
            required: true
          },
          contenu: {
            type: 'text',
            required: true
          },
          section: {
            type: 'string',
            required: false
          },
          ordre: {
            type: 'integer',
            default: 1
          },
          actif: {
            type: 'boolean',
            default: true
          }
        },
        options: {
          draftAndPublish: true
        }
      }
    }
    
    const response = await axios.post(
      `${STRAPI_URL}/api/content-type-builder/content-types`,
      contentTypeData,
      {
        headers: {
          'Authorization': `Bearer ${STRAPI_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    )
    
    console.log('✅ Content type "Page À Propos" créé avec succès')
    return true
  } catch (error) {
    console.error('❌ Erreur lors de la création du content type:', error.response?.data || error.message)
    return false
  }
}

async function addHistoireContent() {
  try {
    console.log('📝 Ajout du contenu "Notre Histoire"...')
    
    const contentData = {
      data: {
        titre: histoireContent.titre,
        contenu: histoireContent.contenu,
        section: 'histoire',
        ordre: 1,
        actif: true
      }
    }
    
    const response = await axios.post(
      `${STRAPI_URL}/api/page-abouts`,
      contentData,
      {
        headers: {
          'Authorization': `Bearer ${STRAPI_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    )
    
    console.log('✅ Contenu "Notre Histoire" ajouté avec succès')
    console.log('📄 ID du contenu créé:', response.data.data.id)
    
    // Publier le contenu
    await axios.put(
      `${STRAPI_URL}/api/page-abouts/${response.data.data.id}`,
      {
        data: {
          ...contentData.data,
          publishedAt: new Date().toISOString()
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${STRAPI_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    )
    
    console.log('✅ Contenu publié avec succès')
    return true
  } catch (error) {
    console.error('❌ Erreur lors de l\'ajout du contenu:', error.response?.data || error.message)
    return false
  }
}

async function checkIfContentExists() {
  try {
    console.log('🔍 Vérification si le contenu existe déjà...')
    
    const response = await axios.get(`${STRAPI_URL}/api/page-abouts`, {
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`
      }
    })
    
    const existingContent = response.data.data.find(item => 
      item.attributes.section === 'histoire' || 
      item.attributes.titre === 'Notre Histoire'
    )
    
    if (existingContent) {
      console.log('⚠️ Le contenu "Notre Histoire" existe déjà')
      console.log('📄 Contenu existant:', {
        id: existingContent.id,
        titre: existingContent.attributes.titre,
        contenu: existingContent.attributes.contenu.substring(0, 100) + '...'
      })
      return existingContent
    }
    
    return null
  } catch (error) {
    if (error.response?.status === 404) {
      console.log('ℹ️ API page-abouts non trouvée, le content type n\'existe pas encore')
      return null
    }
    console.error('❌ Erreur lors de la vérification:', error.message)
    return null
  }
}

async function main() {
  console.log('🚀 Ajout du contenu "Notre Histoire" à la page À propos\n')
  
  // 1. Vérifier les content types existants
  const contentTypes = await checkExistingContentTypes()
  if (!contentTypes) return
  
  // 2. Vérifier si le content type page-about existe
  const hasPageAbout = Object.keys(contentTypes).includes('api::page-about.page-about')
  
  if (!hasPageAbout) {
    console.log('\n📋 Le content type "Page À Propos" n\'existe pas, création...')
    const created = await createAboutPageContentType()
    if (!created) return
    
    // Attendre un peu pour que Strapi traite la création
    console.log('⏳ Attente de 3 secondes pour la synchronisation...')
    await new Promise(resolve => setTimeout(resolve, 3000))
  } else {
    console.log('✅ Content type "Page À Propos" déjà existant')
  }
  
  // 3. Vérifier si le contenu existe déjà
  const existingContent = await checkIfContentExists()
  
  if (existingContent) {
    console.log('\n🎯 Le contenu existe déjà, mise à jour...')
    
    try {
      await axios.put(
        `${STRAPI_URL}/api/page-abouts/${existingContent.id}`,
        {
          data: {
            titre: histoireContent.titre,
            contenu: histoireContent.contenu,
            section: 'histoire',
            ordre: 1,
            actif: true,
            publishedAt: new Date().toISOString()
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${STRAPI_TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      )
      console.log('✅ Contenu mis à jour avec succès')
    } catch (error) {
      console.error('❌ Erreur lors de la mise à jour:', error.response?.data || error.message)
    }
  } else {
    // 4. Ajouter le nouveau contenu
    console.log('\n📝 Ajout du nouveau contenu...')
    await addHistoireContent()
  }
  
  console.log('\n🎉 Processus terminé avec succès!')
  console.log('💡 Le contenu "Notre Histoire" est maintenant disponible dans Strapi')
  console.log('🔗 Vous pouvez le voir dans l\'admin: http://localhost:1337/admin/content-manager/collectionType/api::page-about.page-about')
}

main().catch(console.error)