const STRAPI_URL = 'http://localhost:1337'

async function debugGalleryLoadingIssue() {
  try {
    console.log('🔍 Debug du problème de chargement de FormationsGallery...')
    
    // Simuler exactement la logique de FormationsGallery
    console.log('\n1️⃣ Test du timeout Promise.race...')
    
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout Strapi')), 3000)
    )
    
    try {
      const startTime = Date.now()
      
      const [formationsResponse, categoriesResponse] = await Promise.race([
        Promise.all([
          fetch(`${STRAPI_URL}/api/formations?populate=*&sort=ordre:asc`),
          fetch(`${STRAPI_URL}/api/formation-categories?populate=*&sort=ordre:asc`)
        ]),
        timeoutPromise
      ])
      
      const endTime = Date.now()
      console.log(`✅ Requêtes terminées en ${endTime - startTime}ms`)
      
      const formationsData = await formationsResponse.json()
      const categoriesData = await categoriesResponse.json()
      
      console.log('\n2️⃣ Analyse des données reçues...')
      console.log(`📊 Formations: ${formationsData.data?.length || 0}`)
      console.log(`📊 Catégories: ${categoriesData.data?.length || 0}`)
      
      // Transformer les données comme dans strapi.ts
      const transformedFormations = formationsData.data?.map(item => ({
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
      })) || []
      
      const transformedCategories = categoriesData.data?.map(item => ({
        id: item.id,
        name: item.attributes.name,
        slug: item.attributes.slug,
        color: item.attributes.color
      })) || []
      
      console.log('\n3️⃣ Test de la condition de validation...')
      console.log(`Formations transformées: ${transformedFormations.length}`)
      console.log(`Catégories transformées: ${transformedCategories.length}`)
      
      const condition1 = transformedFormations && transformedCategories
      const condition2 = transformedFormations.length > 0 && transformedCategories.length > 0
      
      console.log(`Condition 1 (existence): ${condition1}`)
      console.log(`Condition 2 (longueur > 0): ${condition2}`)
      
      if (condition1 && condition2) {
        console.log('✅ CONDITIONS VALIDÉES: Strapi devrait être utilisé')
        
        // Test de l'organisation des données
        console.log('\n4️⃣ Test de l\'organisation des données...')
        
        const organizedCategories = transformedCategories.map(category => {
          const categoryFormations = transformedFormations.filter(formation => 
            formation.category?.slug === category.slug
          )
          
          console.log(`📂 ${category.name} (${category.slug}): ${categoryFormations.length} formations`)
          
          return {
            id: category.id,
            nom: category.name,
            slug: category.slug,
            couleur: category.color || 'blue',
            formations: categoryFormations.map(formation => ({
              id: formation.id,
              title: formation.title,
              slug: formation.slug,
              level: formation.level,
              rncp: formation.rncp,
              shortDescription: formation.shortDesc,
              image: '/images/formations/default.jpg',
              isAlternance: category.slug === 'alternance',
              isReconversion: category.slug === 'reconversion'
            }))
          }
        })
        
        const totalFormations = organizedCategories.reduce((acc, cat) => acc + cat.formations.length, 0)
        console.log(`📊 Total formations organisées: ${totalFormations}`)
        
        if (totalFormations === 0) {
          console.log('❌ PROBLÈME: Aucune formation n\'est associée aux catégories')
          console.log('   → Vérifier les relations category dans Strapi')
        } else {
          console.log('✅ SUCCÈS: Les données sont correctement organisées')
        }
        
      } else {
        console.log('❌ CONDITIONS NON VALIDÉES: Fallback vers données statiques')
        console.log('   Raisons possibles:')
        if (!condition1) console.log('   - Données nulles ou undefined')
        if (!condition2) console.log('   - Tableaux vides')
      }
      
    } catch (raceError) {
      console.log(`❌ Erreur Promise.race: ${raceError.message}`)
      console.log('   → Fallback vers données statiques activé')
    }
    
  } catch (error) {
    console.error('❌ Erreur générale:', error.message)
  }
}

debugGalleryLoadingIssue()