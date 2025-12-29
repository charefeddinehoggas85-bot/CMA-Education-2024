// Debug du mapping formations/catégories
async function debugFormationsMapping() {
  console.log('🔍 Debug du mapping formations/catégories...')
  
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
  
  try {
    // Récupérer les catégories
    const categoriesResponse = await fetch(`${STRAPI_URL}/api/formation-categories?populate=*`)
    const categoriesData = await categoriesResponse.json()
    
    console.log('📊 Catégories trouvées:')
    categoriesData.data?.forEach(cat => {
      console.log(`  - ID: ${cat.id}, Name: ${cat.attributes.name}, Slug: ${cat.attributes.slug}`)
    })
    
    // Récupérer les formations
    const formationsResponse = await fetch(`${STRAPI_URL}/api/formations?populate=*`)
    const formationsData = await formationsResponse.json()
    
    console.log('\n📊 Formations trouvées:')
    formationsData.data?.forEach(formation => {
      const categoryInfo = formation.attributes.category?.data
      console.log(`  - ${formation.attributes.title || formation.attributes.titre}`)
      console.log(`    Category: ${categoryInfo?.attributes?.name || 'Aucune'} (slug: ${categoryInfo?.attributes?.slug || 'N/A'})`)
    })
    
    // Test du mapping
    console.log('\n🔄 Test du mapping...')
    const categories = categoriesData.data?.map(cat => ({
      id: cat.id,
      name: cat.attributes.name,
      slug: cat.attributes.slug
    })) || []
    
    const formations = formationsData.data?.map(formation => ({
      id: formation.id,
      title: formation.attributes.title || formation.attributes.titre,
      slug: formation.attributes.slug,
      category: formation.attributes.category?.data ? {
        name: formation.attributes.category.data.attributes.name,
        slug: formation.attributes.category.data.attributes.slug
      } : null
    })) || []
    
    const categoriesWithFormations = categories.map(category => {
      const categoryFormations = formations.filter(formation => 
        formation.category?.slug === category.slug || formation.category?.name === category.name
      )
      
      return {
        ...category,
        formations: categoryFormations
      }
    })
    
    console.log('\n✅ Résultat final du mapping:')
    categoriesWithFormations.forEach(cat => {
      console.log(`\n📁 ${cat.name} (${cat.slug}):`)
      if (cat.formations.length > 0) {
        cat.formations.forEach(formation => {
          console.log(`  ✓ ${formation.title}`)
        })
      } else {
        console.log('  ❌ Aucune formation')
      }
    })
    
  } catch (error) {
    console.error('❌ Erreur:', error.message)
  }
}

debugFormationsMapping()