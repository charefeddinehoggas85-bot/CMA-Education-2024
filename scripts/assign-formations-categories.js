// Script pour assigner les bonnes catégories aux formations dans Strapi
async function assignFormationsCategories() {
  console.log('🔄 Attribution des catégories aux formations...')
  
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
  
  try {
    // Récupérer les catégories
    const categoriesResponse = await fetch(`${STRAPI_URL}/api/formation-categories`)
    const categoriesData = await categoriesResponse.json()
    
    const categories = {}
    categoriesData.data?.forEach(cat => {
      categories[cat.attributes.slug] = cat.id
    })
    
    console.log('📊 Catégories disponibles:', categories)
    
    // Récupérer toutes les formations
    const formationsResponse = await fetch(`${STRAPI_URL}/api/formations`)
    const formationsData = await formationsResponse.json()
    
    // Mapping des formations selon vos spécifications
    const formationsMapping = {
      // Formations en alternance
      'alternance': [
        'Chargé d\'Affaires du Bâtiment',
        'Chargé(e) d\'Affaires du Bâtiment', 
        'Conducteur de Travaux – Bâtiment & Génie Civil',
        'Conducteur(trice) de Travaux Bâtiment & Génie Civil',
        'Conducteur de Travaux, Travaux Publics',
        'Double Parcours – Responsable de Travaux, Parcours Bâtiment & Coordinateur BIM du Bâtiment',
        'Double Parcours : Responsable Travaux & Coordinateur BIM',
        'Responsable Travaux Publics',
        'Chef de Projets BTP'
      ],
      
      // Formations reconversion
      'reconversion': [
        'Conducteur de Travaux – Bâtiment & Génie Civil – professionnels en reconversion',
        'Conducteur de Travaux Bâtiment et Génie Civil - Professionnels en reconversion',
        'Conducteur de Travaux Publics – Professionnels en reconversion', 
        'Chargé d\'affaires du bâtiment – Professionnels en reconversion'
      ]
    }
    
    let updatedCount = 0
    
    // Parcourir toutes les formations et les assigner
    for (const formation of formationsData.data) {
      const formationTitle = formation.attributes.title || formation.attributes.titre
      let targetCategory = null
      
      // Trouver la catégorie appropriée
      for (const [categorySlug, titles] of Object.entries(formationsMapping)) {
        if (titles.some(title => 
          formationTitle.toLowerCase().includes(title.toLowerCase()) ||
          title.toLowerCase().includes(formationTitle.toLowerCase())
        )) {
          targetCategory = categories[categorySlug]
          break
        }
      }
      
      // Mettre à jour si une catégorie a été trouvée
      if (targetCategory && formation.attributes.category?.data?.id !== targetCategory) {
        console.log(`🔄 Attribution "${formationTitle}" -> catégorie ${targetCategory}`)
        
        const updateResponse = await fetch(`${STRAPI_URL}/api/formations/${formation.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: {
              category: targetCategory
            }
          })
        })
        
        if (updateResponse.ok) {
          console.log(`✅ Formation "${formationTitle}" mise à jour`)
          updatedCount++
        } else {
          console.log(`❌ Erreur mise à jour "${formationTitle}"`)
        }
      } else if (!targetCategory) {
        console.log(`⚠️  Aucune catégorie trouvée pour "${formationTitle}"`)
      }
    }
    
    console.log(`\n✅ Attribution terminée: ${updatedCount} formations mises à jour`)
    
  } catch (error) {
    console.error('❌ Erreur:', error.message)
  }
}

assignFormationsCategories()