// Test du FormationsDropdown côté frontend
async function testFormationsDropdownFrontend() {
  console.log('🔍 Test du FormationsDropdown côté frontend...')
  
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
  
  try {
    // Simuler exactement ce que fait le FormationsDropdown
    console.log('📡 Récupération des catégories...')
    const categoriesResponse = await fetch(`${STRAPI_URL}/api/formation-categories?populate=*&sort=ordre:asc`)
    const categoriesData = await categoriesResponse.json()
    
    console.log('📡 Récupération des formations...')
    const formationsResponse = await fetch(`${STRAPI_URL}/api/formations?populate=*&sort=ordre:asc`)
    const formationsData = await formationsResponse.json()
    
    // Transformer les données comme dans strapi.ts
    const categories = categoriesData.data?.map(cat => ({
      id: cat.id,
      name: cat.attributes.name,
      slug: cat.attributes.slug,
      ...cat.attributes
    })) || []
    
    const formations = formationsData.data?.map(formation => ({
      id: formation.id,
      title: formation.attributes.title || formation.attributes.titre,
      slug: formation.attributes.slug,
      level: formation.attributes.level,
      duree: formation.attributes.duree,
      category: formation.attributes.category?.data ? {
        id: formation.attributes.category.data.id,
        name: formation.attributes.category.data.attributes.name,
        slug: formation.attributes.category.data.attributes.slug
      } : null,
      ...formation.attributes
    })) || []
    
    console.log(`✅ ${categories.length} catégories et ${formations.length} formations récupérées`)
    
    // Organiser les formations par catégorie (comme dans FormationsDropdown)
    const categoriesWithFormations = categories.map(category => {
      const categoryFormations = formations.filter(formation => 
        formation.category?.slug === category.slug || formation.category?.name === category.name
      )
      
      return {
        ...category,
        formations: categoryFormations
      }
    })
    
    console.log('\n📊 Organisation finale pour le dropdown:')
    categoriesWithFormations.forEach((cat, index) => {
      console.log(`\n${index + 1}. 📁 ${cat.name} (${cat.slug})`)
      console.log(`   📊 ${cat.formations?.length || 0} formations`)
      
      if (cat.formations?.length > 0) {
        cat.formations.slice(0, 5).forEach((formation, idx) => {
          console.log(`   ${idx + 1}. ✓ ${formation.title}`)
          console.log(`      Slug: ${formation.slug}`)
          console.log(`      Niveau: ${formation.level || 'N/A'} • Durée: ${formation.duree || 'N/A'}`)
        })
        
        if (cat.formations.length > 5) {
          console.log(`   ... et ${cat.formations.length - 5} autres formations`)
        }
      } else {
        console.log('   ❌ Aucune formation dans cette catégorie')
      }
    })
    
    // Vérifier si on utiliserait le fallback
    const validCategories = categoriesWithFormations.filter(cat => cat.formations?.length > 0)
    
    console.log(`\n🔍 Analyse pour le fallback:`)
    console.log(`   - Catégories avec formations: ${validCategories.length}`)
    console.log(`   - Seuil minimum: 2 catégories`)
    
    if (validCategories.length >= 2) {
      console.log('   ✅ Utilisation des données Strapi')
    } else {
      console.log('   🔄 Utilisation du fallback')
      
      // Afficher le fallback
      const fallbackData = [
        { 
          id: 1, 
          name: 'Formation en alternance', 
          slug: 'alternance', 
          formations: [
            { id: 1, title: 'Conducteur(trice) de Travaux Bâtiment & Génie Civil', slug: 'conducteur-travaux-batiment-alternance', level: 'BAC+2', duree: '2 ans' },
            { id: 2, title: 'Chargé(e) d\'Affaires du Bâtiment', slug: 'charge-affaires-batiment-alternance', level: 'BAC+2', duree: '2 ans' },
            { id: 3, title: 'Double Parcours : Responsable Travaux & Coordinateur BIM', slug: 'responsable-travaux-bim-alternance', level: 'BAC+5', duree: '2 ans' },
            { id: 4, title: 'Chef de Projets BTP', slug: 'chef-projets-btp-alternance', level: 'BAC+5', duree: '2 ans' }
          ]
        },
        { 
          id: 2, 
          name: 'Reconversion professionnelle', 
          slug: 'reconversion', 
          formations: [
            { id: 5, title: 'Conducteur de Travaux Bâtiment et Génie Civil - Professionnels en reconversion', slug: 'conducteur-travaux-reconversion', level: 'BAC+2', duree: '8 mois' },
            { id: 6, title: 'Chargé d\'affaires du bâtiment - Professionnels en reconversion', slug: 'charge-affaires-reconversion', level: 'BAC+2', duree: '8 mois' }
          ]
        },
        { 
          id: 3, 
          name: 'VAE BTP', 
          slug: 'vae', 
          formations: [
            { id: 7, title: 'VAE Conducteur de Travaux', slug: 'vae-conducteur-travaux', level: 'BAC+2', duree: '6 mois' },
            { id: 8, title: 'VAE Chargé d\'Affaires', slug: 'vae-charge-affaires', level: 'BAC+2', duree: '6 mois' }
          ]
        }
      ]
      
      console.log('\n📊 Données de fallback:')
      fallbackData.forEach((cat, index) => {
        console.log(`\n${index + 1}. 📁 ${cat.name} (${cat.slug})`)
        console.log(`   📊 ${cat.formations?.length || 0} formations`)
        cat.formations.forEach((formation, idx) => {
          console.log(`   ${idx + 1}. ✓ ${formation.title}`)
        })
      })
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message)
  }
}

testFormationsDropdownFrontend()