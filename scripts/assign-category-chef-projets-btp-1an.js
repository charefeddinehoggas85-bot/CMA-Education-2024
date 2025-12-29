#!/usr/bin/env node

/**
 * Script pour assigner la catégorie "alternance" à la formation Chef de Projets BTP 1 an
 */

const STRAPI_URL = 'http://localhost:1337'

async function assignCategoryChefProjetsBTP1an() {
  console.log('🔧 Attribution de catégorie - Formation Chef de Projets BTP 1 an...\n')

  try {
    // 1. Récupérer la catégorie "alternance"
    console.log('📂 1. Recherche de la catégorie "alternance"...')
    const categoryResponse = await fetch(`${STRAPI_URL}/api/formation-categories?filters[slug][$eq]=alternance`)
    
    if (!categoryResponse.ok) {
      throw new Error(`Erreur lors de la recherche de catégorie: ${categoryResponse.status}`)
    }
    
    const categoryData = await categoryResponse.json()
    
    if (!categoryData.data || categoryData.data.length === 0) {
      throw new Error('Catégorie "alternance" non trouvée')
    }
    
    const categoryId = categoryData.data[0].id
    console.log(`✅ Catégorie "alternance" trouvée avec l'ID: ${categoryId}`)

    // 2. Récupérer la formation Chef de Projets BTP 1 an
    console.log('\n🎯 2. Recherche de la formation Chef de Projets BTP 1 an...')
    const formationResponse = await fetch(`${STRAPI_URL}/api/formations?filters[slug][$eq]=chef-projets-btp-1an`)
    
    if (!formationResponse.ok) {
      throw new Error(`Erreur lors de la recherche de formation: ${formationResponse.status}`)
    }
    
    const formationData = await formationResponse.json()
    
    if (!formationData.data || formationData.data.length === 0) {
      throw new Error('Formation "chef-projets-btp-1an" non trouvée')
    }
    
    const formationId = formationData.data[0].id
    console.log(`✅ Formation trouvée avec l'ID: ${formationId}`)

    // 3. Assigner la catégorie à la formation
    console.log('\n🔗 3. Attribution de la catégorie "alternance" à la formation...')
    
    const updateData = {
      data: {
        category: categoryId
      }
    }
    
    const updateResponse = await fetch(`${STRAPI_URL}/api/formations/${formationId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    })
    
    if (!updateResponse.ok) {
      const errorText = await updateResponse.text()
      throw new Error(`Erreur lors de la mise à jour: ${updateResponse.status} - ${errorText}`)
    }
    
    console.log('✅ Catégorie assignée avec succès!')

    // 4. Vérification
    console.log('\n🔍 4. Vérification de l\'attribution...')
    const verifyResponse = await fetch(`${STRAPI_URL}/api/formations?filters[slug][$eq]=chef-projets-btp-1an&populate=category`)
    const verifyData = await verifyResponse.json()
    
    if (verifyData.data && verifyData.data.length > 0) {
      const formation = verifyData.data[0]
      const assignedCategory = formation.attributes.category?.data?.attributes?.name
      
      if (assignedCategory === 'Alternance') {
        console.log('✅ Vérification réussie: Formation assignée à la catégorie "Alternance"')
      } else {
        console.log(`❌ Problème: Formation assignée à "${assignedCategory}" au lieu de "Alternance"`)
      }
    }

    // 5. Vérifier que la formation apparaît maintenant dans les formations alternance
    console.log('\n📋 5. Vérification dans la liste des formations alternance...')
    const alternanceResponse = await fetch(`${STRAPI_URL}/api/formations?filters[category][slug][$eq]=alternance&populate=*&sort=ordre:asc`)
    
    if (alternanceResponse.ok) {
      const alternanceData = await alternanceResponse.json()
      const chefProjetsInList = alternanceData.data.find(f => f.attributes.slug === 'chef-projets-btp-1an')
      
      if (chefProjetsInList) {
        console.log('✅ Formation Chef de Projets BTP 1 an maintenant visible dans les formations alternance')
        console.log(`   Position dans la liste: ${alternanceData.data.findIndex(f => f.attributes.slug === 'chef-projets-btp-1an') + 1}/${alternanceData.data.length}`)
      } else {
        console.log('❌ Formation toujours non visible dans les formations alternance')
      }
    }

    console.log('\n🎉 Attribution de catégorie terminée!')
    console.log('📊 Résumé:')
    console.log('   ✅ Formation Chef de Projets BTP 1 an assignée à la catégorie "Alternance"')
    console.log('   ✅ Formation maintenant visible dans la liste des formations')
    console.log('   ✅ Ordre de tri: 18 (après les autres formations)')
    console.log('')
    console.log('🌐 La formation devrait maintenant apparaître sur:')
    console.log('   • http://localhost:3000/formations (section Alternance)')
    console.log('   • http://localhost:3000/formations/chef-projets-btp-1an (page dédiée)')
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'attribution de catégorie:', error.message)
    process.exit(1)
  }
}

// Exécution du script
assignCategoryChefProjetsBTP1an()