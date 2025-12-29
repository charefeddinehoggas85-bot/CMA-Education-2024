// Test des requêtes Strapi avec populate spécifique
async function testStrapiPopulate() {
  console.log('🔍 Test des requêtes Strapi avec populate...')
  
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
  
  try {
    // Test 1: populate=*
    console.log('\n📡 Test 1: populate=*')
    const response1 = await fetch(`${STRAPI_URL}/api/formations?populate=*`)
    const data1 = await response1.json()
    
    console.log(`Formations récupérées: ${data1.data?.length || 0}`)
    if (data1.data?.[0]) {
      const firstFormation = data1.data[0]
      console.log('Première formation:')
      console.log(`  - Title: ${firstFormation.attributes.title}`)
      console.log(`  - Category: ${firstFormation.attributes.category?.data?.attributes?.name || 'Aucune'}`)
    }
    
    // Test 2: populate spécifique
    console.log('\n📡 Test 2: populate[category]=*')
    const response2 = await fetch(`${STRAPI_URL}/api/formations?populate[category]=*`)
    const data2 = await response2.json()
    
    console.log(`Formations récupérées: ${data2.data?.length || 0}`)
    if (data2.data?.[0]) {
      const firstFormation = data2.data[0]
      console.log('Première formation:')
      console.log(`  - Title: ${firstFormation.attributes.title}`)
      console.log(`  - Category: ${firstFormation.attributes.category?.data?.attributes?.name || 'Aucune'}`)
    }
    
    // Test 3: Compter les formations par catégorie
    console.log('\n📊 Analyse des catégories:')
    const formationsWithCategories = data2.data?.filter(f => f.attributes.category?.data) || []
    const formationsWithoutCategories = data2.data?.filter(f => !f.attributes.category?.data) || []
    
    console.log(`  - Formations avec catégorie: ${formationsWithCategories.length}`)
    console.log(`  - Formations sans catégorie: ${formationsWithoutCategories.length}`)
    
    // Grouper par catégorie
    const categoryGroups = {}
    formationsWithCategories.forEach(formation => {
      const categoryName = formation.attributes.category.data.attributes.name
      if (!categoryGroups[categoryName]) {
        categoryGroups[categoryName] = []
      }
      categoryGroups[categoryName].push(formation.attributes.title)
    })
    
    console.log('\n📁 Formations par catégorie:')
    Object.entries(categoryGroups).forEach(([categoryName, formations]) => {
      console.log(`\n  ${categoryName}: ${formations.length} formations`)
      formations.forEach((title, idx) => {
        console.log(`    ${idx + 1}. ${title}`)
      })
    })
    
    if (formationsWithoutCategories.length > 0) {
      console.log('\n❌ Formations sans catégorie:')
      formationsWithoutCategories.forEach((formation, idx) => {
        console.log(`  ${idx + 1}. ${formation.attributes.title}`)
      })
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message)
  }
}

testStrapiPopulate()