// Script pour corriger les assignations de catégories
async function fixFormationsCategories() {
  console.log('🔧 Correction des assignations de catégories...')
  
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
  
  try {
    // Récupérer les catégories
    const categoriesResponse = await fetch(`${STRAPI_URL}/api/formation-categories`)
    const categoriesData = await categoriesResponse.json()
    
    const categories = {}
    categoriesData.data?.forEach(cat => {
      categories[cat.attributes.slug] = cat.id
    })
    
    // Récupérer toutes les formations
    const formationsResponse = await fetch(`${STRAPI_URL}/api/formations?populate=*`)
    const formationsData = await formationsResponse.json()
    
    let updatedCount = 0
    
    // Corrections spécifiques
    for (const formation of formationsData.data) {
      const formationTitle = formation.attributes.title || formation.attributes.titre
      let targetCategory = null
      
      // Formations qui doivent être en reconversion
      if (formationTitle.toLowerCase().includes('professionnels en reconversion')) {
        targetCategory = categories['reconversion']
        
        if (formation.attributes.category?.data?.id !== targetCategory) {
          console.log(`🔄 Correction "${formationTitle}" -> Reconversion`)
          
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
            console.log(`✅ Formation "${formationTitle}" corrigée`)
            updatedCount++
          }
        }
      }
    }
    
    console.log(`\n✅ Correction terminée: ${updatedCount} formations corrigées`)
    
  } catch (error) {
    console.error('❌ Erreur:', error.message)
  }
}

fixFormationsCategories()