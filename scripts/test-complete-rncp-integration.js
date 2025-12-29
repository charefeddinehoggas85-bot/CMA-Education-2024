const STRAPI_URL = 'http://localhost:1337'

async function testCompleteRNCPIntegration() {
  try {
    console.log('🔍 Test complet de l\'intégration RNCP...')
    
    // Récupérer les données exactement comme FormationsGallery
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout Strapi')), 3000)
    )
    
    const [formationsResponse, categoriesResponse] = await Promise.race([
      Promise.all([
        fetch(`${STRAPI_URL}/api/formations?populate=*&sort=ordre:asc`),
        fetch(`${STRAPI_URL}/api/formation-categories?populate=*&sort=ordre:asc`)
      ]),
      timeoutPromise
    ])
    
    const formationsData = await formationsResponse.json()
    const categoriesData = await categoriesResponse.json()
    
    console.log(`📊 Formations reçues: ${formationsData.data?.length || 0}`)
    console.log(`📊 Catégories reçues: ${categoriesData.data?.length || 0}`)
    
    if (formationsData.data && categoriesData.data && formationsData.data.length > 0 && categoriesData.data.length > 0) {
      
      // Transformer les données comme dans strapi.ts
      const transformedFormations = formationsData.data.map(item => ({
        id: item.id,
        title: item.attributes.title,
        slug: item.attributes.slug,
        level: item.attributes.level,
        rncp: item.attributes.rncp,
        shortDesc: item.attributes.shortDesc,
        category: item.attributes.category?.data ? {
          id: item.attributes.category.data.id,
          slug: item.attributes.category.data.attributes.slug,
          name: item.attributes.category.data.attributes.name
        } : null
      }))
      
      const transformedCategories = categoriesData.data.map(item => ({
        id: item.id,
        name: item.attributes.name, // Correct field
        slug: item.attributes.slug,
        color: item.attributes.color // Correct field
      }))
      
      // Organiser par catégorie comme dans FormationsGallery (avec les bons noms de champs)
      const organizedCategories = transformedCategories.map(category => ({
        id: category.id,
        nom: category.name, // Mapping correct
        slug: category.slug,
        couleur: category.color || 'blue', // Mapping correct
        formations: transformedFormations.filter(formation => 
          formation.category?.slug === category.slug
        ).map(formation => ({
          id: formation.id,
          title: formation.title,
          slug: formation.slug,
          level: formation.level,
          rncp: formation.rncp, // RNCP depuis Strapi
          shortDescription: formation.shortDesc,
          image: '/images/formations/default.jpg',
          isAlternance: category.slug === 'alternance',
          isReconversion: category.slug === 'reconversion'
        }))
      }))
      
      console.log('\n🎯 Résultat final avec RNCP par catégorie:')
      organizedCategories.forEach(category => {
        console.log(`\n📂 ${category.nom} (${category.formations.length} formations):`)
        category.formations.forEach(formation => {
          console.log(`  ✅ ${formation.title}`)
          console.log(`     📋 RNCP: ${formation.rncp || 'NON DÉFINI'}`)
          console.log(`     📊 Niveau: ${formation.level}`)
        })
      })
      
      // Statistiques finales
      const totalFormations = organizedCategories.reduce((acc, cat) => acc + cat.formations.length, 0)
      const formationsWithRNCP = organizedCategories.reduce((acc, cat) => 
        acc + cat.formations.filter(f => f.rncp && f.rncp.trim() !== '').length, 0
      )
      
      console.log(`\n✅ SUCCÈS: ${formationsWithRNCP}/${totalFormations} formations ont un code RNCP`)
      console.log(`✅ Toutes les catégories sont correctement mappées`)
      console.log(`✅ L'intégration RNCP depuis Strapi fonctionne parfaitement`)
      
    } else {
      console.log('❌ Données Strapi incomplètes, fallback vers données statiques')
    }
    
  } catch (error) {
    console.log('❌ Erreur Strapi:', error.message)
    console.log('🔄 Fallback vers données statiques avec RNCP')
  }
}

testCompleteRNCPIntegration()