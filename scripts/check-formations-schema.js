#!/usr/bin/env node

/**
 * Script pour vérifier le schéma du content-type formations dans Strapi
 */

const STRAPI_URL = 'http://localhost:1337'

async function checkFormationsSchema() {
  console.log('🔍 Vérification du schéma formations dans Strapi...\n')

  try {
    // 1. Récupérer une formation existante pour voir la structure
    console.log('📋 Récupération d\'une formation existante...')
    const response = await fetch(`${STRAPI_URL}/api/formations?populate=*&pagination[limit]=1`)
    
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (data.data && data.data.length > 0) {
      const formation = data.data[0]
      console.log('✅ Structure de la formation:')
      console.log(`   ID: ${formation.id}`)
      console.log('   Attributs disponibles:')
      
      Object.keys(formation.attributes).forEach(key => {
        const value = formation.attributes[key]
        const type = typeof value
        console.log(`   • ${key}: ${type} = ${type === 'object' ? JSON.stringify(value).substring(0, 50) + '...' : value}`)
      })
      
      // 2. Test de mise à jour avec les bons noms de champs
      console.log('\n🔄 Test de mise à jour avec les champs corrects...')
      
      const testData = {
        data: {
          duration: "1 an",
          rhythm: "697 heures (divisé par 2 par rapport au cursus 2 ans)",
          mode: "Présentiel", 
          price: "Prise en charge",
          isAlternance: true,
          isReconversion: false
        }
      }
      
      // Chercher spécifiquement la formation Chef de Projets BTP 1 an
      const chefProjetsResponse = await fetch(`${STRAPI_URL}/api/formations?filters[slug][$eq]=chef-projets-btp-1an`)
      const chefProjetsData = await chefProjetsResponse.json()
      
      if (chefProjetsData.data && chefProjetsData.data.length > 0) {
        const formationId = chefProjetsData.data[0].id
        console.log(`📝 Mise à jour de la formation ID: ${formationId}`)
        
        const updateResponse = await fetch(`${STRAPI_URL}/api/formations/${formationId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(testData)
        })
        
        if (updateResponse.ok) {
          const updatedData = await updateResponse.json()
          console.log('✅ Mise à jour réussie!')
          console.log('   Nouveaux attributs:')
          Object.keys(testData.data).forEach(key => {
            console.log(`   • ${key}: ${updatedData.data.attributes[key]}`)
          })
        } else {
          const errorText = await updateResponse.text()
          console.log(`❌ Erreur de mise à jour: ${updateResponse.status}`)
          console.log(`   Détails: ${errorText}`)
        }
      }
      
    } else {
      console.log('❌ Aucune formation trouvée')
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message)
  }
}

// Exécution du script
checkFormationsSchema()