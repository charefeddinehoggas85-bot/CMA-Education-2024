const STRAPI_URL = 'http://localhost:1337'

async function testCategoriesStructure() {
  try {
    console.log('🔍 Test de la structure des catégories...')
    
    const response = await fetch(`${STRAPI_URL}/api/formation-categories?populate=*`)
    const data = await response.json()
    
    if (data.data && data.data.length > 0) {
      console.log(`📊 ${data.data.length} catégories trouvées`)
      
      data.data.forEach((category, index) => {
        console.log(`\n📂 Catégorie ${index + 1}:`)
        console.log(`  - ID: ${category.id}`)
        console.log(`  - Nom: ${category.attributes.nom}`)
        console.log(`  - Slug: ${category.attributes.slug}`)
        console.log(`  - Couleur: ${category.attributes.couleur}`)
        console.log(`  - Ordre: ${category.attributes.ordre}`)
      })
    } else {
      console.log('❌ Aucune catégorie trouvée')
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message)
  }
}

testCategoriesStructure()