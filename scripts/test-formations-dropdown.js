const { getFormations, getFormationCategories } = require('../src/lib/strapi.ts')

async function testFormationsDropdown() {
  console.log('🔍 Test du dropdown formations...')
  
  try {
    console.log('📡 Test de getFormationCategories...')
    const categories = await getFormationCategories()
    console.log('✅ Catégories récupérées:', categories?.length || 0)
    if (categories?.length > 0) {
      console.log('📋 Première catégorie:', categories[0])
    }
    
    console.log('\n📡 Test de getFormations...')
    const formations = await getFormations()
    console.log('✅ Formations récupérées:', formations?.length || 0)
    if (formations?.length > 0) {
      console.log('📋 Première formation:', formations[0])
    }
    
    // Test de l'organisation par catégorie
    console.log('\n🔄 Test d\'organisation par catégorie...')
    const categoriesWithFormations = categories?.map(category => ({
      ...category,
      formations: formations?.filter(formation => 
        formation.category?.slug === category.slug
      ) || []
    })) || []
    
    console.log('📊 Résultat final:')
    categoriesWithFormations.forEach(cat => {
      console.log(`  - ${cat.name}: ${cat.formations?.length || 0} formations`)
    })
    
  } catch (error) {
    console.error('❌ Erreur:', error.message)
    console.log('🔄 Utilisation des données de fallback...')
    
    const fallbackCategories = [
      { 
        id: 1, 
        name: 'Formation en alternance', 
        slug: 'alternance', 
        formations: [
          { id: 1, title: 'Chargé d\'Affaires du Bâtiment (BAC+2)', slug: 'alt-bac2-charge-affaires', level: 'BAC+2', duree: '2 ans' },
          { id: 2, title: 'Conducteur de Travaux Bâtiment (BAC+2)', slug: 'alt-bac2-conducteur-travaux', level: 'BAC+2', duree: '2 ans' }
        ]
      }
    ]
    
    console.log('✅ Fallback configuré avec', fallbackCategories[0].formations.length, 'formations')
  }
}

testFormationsDropdown()