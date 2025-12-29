const STRAPI_URL = 'http://localhost:1337'

// Simuler la logique de FormationsGallery
async function testFrontendRNCPMapping() {
  try {
    console.log('🔍 Test du mapping RNCP côté frontend...')
    
    // Récupérer les données comme le fait FormationsGallery
    const [formationsResponse, categoriesResponse] = await Promise.all([
      fetch(`${STRAPI_URL}/api/formations?populate=*&sort=ordre:asc`),
      fetch(`${STRAPI_URL}/api/formation-categories?populate=*&sort=ordre:asc`)
    ])
    
    const formationsData = await formationsResponse.json()
    const categoriesData = await categoriesResponse.json()
    
    console.log(`📊 Formations API: ${formationsData.data?.length || 0}`)
    console.log(`📊 Catégories API: ${categoriesData.data?.length || 0}`)
    
    if (formationsData.data && categoriesData.data) {
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
          ...item.attributes.category.data.attributes
        } : null
      }))
      
      const transformedCategories = categoriesData.data.map(item => ({
        id: item.id,
        nom: item.attributes.nom,
        slug: item.attributes.slug,
        couleur: item.attributes.couleur
      }))
      
      console.log('\n📋 Formations transformées (avec RNCP):')
      transformedFormations.slice(0, 3).forEach(formation => {
        console.log(`  - ${formation.title}`)
        console.log(`    RNCP: ${formation.rncp || 'NON DÉFINI'}`)
        console.log(`    Niveau: ${formation.level}`)
        console.log(`    Catégorie: ${formation.category?.nom || 'Aucune'}`)
        console.log('')
      })
      
      // Organiser par catégorie comme dans FormationsGallery
      const organizedCategories = transformedCategories.map(category => ({
        id: category.id,
        nom: category.nom,
        slug: category.slug,
        couleur: category.couleur || 'blue',
        formations: transformedFormations.filter(formation => 
          formation.category?.slug === category.slug
        ).map(formation => ({
          id: formation.id,
          title: formation.title,
          slug: formation.slug,
          level: formation.level,
          rncp: formation.rncp, // RNCP depuis Strapi
          shortDescription: formation.shortDesc || formation.description,
          image: formation.image || '/images/formations/default.jpg',
          isAlternance: category.slug === 'alternance',
          isReconversion: category.slug === 'reconversion'
        }))
      }))
      
      console.log('\n🎯 Résultat final organisé par catégorie:')
      organizedCategories.forEach(category => {
        console.log(`\n📂 ${category.nom} (${category.formations.length} formations):`)
        category.formations.forEach(formation => {
          console.log(`  ✅ ${formation.title}`)
          console.log(`     RNCP: ${formation.rncp || 'NON DÉFINI'}`)
        })
      })
      
      // Vérifier que tous les RNCP sont présents
      const totalFormations = organizedCategories.reduce((acc, cat) => acc + cat.formations.length, 0)
      const formationsWithRNCP = organizedCategories.reduce((acc, cat) => 
        acc + cat.formations.filter(f => f.rncp && f.rncp.trim() !== '').length, 0
      )
      
      console.log(`\n✅ Résumé: ${formationsWithRNCP}/${totalFormations} formations ont un code RNCP`)
      
    } else {
      console.log('❌ Données manquantes')
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message)
  }
}

testFrontendRNCPMapping()