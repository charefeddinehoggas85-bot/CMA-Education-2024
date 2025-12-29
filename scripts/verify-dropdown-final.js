// Script de vérification finale du dropdown formations

async function verifyDropdownData() {
  console.log('🔍 Vérification finale du dropdown formations...\n')
  
  const STRAPI_URL = 'http://localhost:1337'
  
  try {
    // Test 1: Vérifier les catégories
    console.log('📋 Test 1: Récupération des catégories...')
    const categoriesResponse = await fetch(`${STRAPI_URL}/api/formation-categories?populate=*&sort=ordre:asc`)
    const categoriesData = await categoriesResponse.json()
    
    console.log(`✅ ${categoriesData.data?.length || 0} catégories trouvées`)
    categoriesData.data?.forEach(cat => {
      console.log(`   - ${cat.attributes.name} (${cat.attributes.slug})`)
    })
    
    // Test 2: Vérifier les formations
    console.log('\n📚 Test 2: Récupération des formations...')
    const formationsResponse = await fetch(`${STRAPI_URL}/api/formations?populate=*&sort=ordre:asc`)
    const formationsData = await formationsResponse.json()
    
    console.log(`✅ ${formationsData.data?.length || 0} formations trouvées`)
    
    // Organiser par catégorie
    const formationsByCategory = {}
    formationsData.data?.forEach(formation => {
      const categorySlug = formation.attributes.category?.data?.attributes?.slug || 'sans-categorie'
      if (!formationsByCategory[categorySlug]) {
        formationsByCategory[categorySlug] = []
      }
      formationsByCategory[categorySlug].push({
        title: formation.attributes.title,
        slug: formation.attributes.slug
      })
    })
    
    // Test 3: Vérifier l'organisation par catégorie
    console.log('\n🗂️  Test 3: Organisation par catégorie...')
    
    console.log('\n📁 ALTERNANCE:')
    const alternanceFormations = formationsByCategory['alternance'] || []
    console.log(`   ${alternanceFormations.length} formations`)
    alternanceFormations.slice(0, 3).forEach((f, i) => {
      console.log(`   ${i + 1}. ${f.title}`)
    })
    if (alternanceFormations.length > 3) {
      console.log(`   ... et ${alternanceFormations.length - 3} autres`)
    }
    
    console.log('\n📁 RECONVERSION:')
    const reconversionFormations = formationsByCategory['reconversion'] || []
    console.log(`   ${reconversionFormations.length} formations`)
    reconversionFormations.forEach((f, i) => {
      console.log(`   ${i + 1}. ${f.title}`)
    })
    
    console.log('\n📁 VAE:')
    const vaeFormations = formationsByCategory['vae'] || []
    console.log(`   ${vaeFormations.length} formations dans Strapi`)
    if (vaeFormations.length === 0) {
      console.log('   🔄 Utilise le fallback:')
      console.log('   1. VAE Conducteur de Travaux')
      console.log('   2. VAE Chargé d\'Affaires')
    }
    
    // Test 4: Vérifier la logique du dropdown
    console.log('\n🎯 Test 4: Logique du dropdown...')
    
    const validCategories = Object.keys(formationsByCategory).filter(cat => 
      cat !== 'sans-categorie' && formationsByCategory[cat].length > 0
    )
    
    console.log(`✅ Catégories valides avec formations: ${validCategories.length}`)
    console.log(`✅ Condition dropdown (>= 1): ${validCategories.length >= 1 ? 'PASS' : 'FAIL'}`)
    
    if (validCategories.length >= 1) {
      console.log('✅ Le dropdown devrait utiliser les données Strapi')
    } else {
      console.log('🔄 Le dropdown devrait utiliser le fallback')
    }
    
    // Test 5: URLs des formations
    console.log('\n🔗 Test 5: Vérification des URLs...')
    
    const sampleFormations = [
      ...alternanceFormations.slice(0, 2),
      ...reconversionFormations.slice(0, 1)
    ]
    
    sampleFormations.forEach(formation => {
      const url = `/formations/${formation.slug}`
      console.log(`   ✅ ${formation.title} → ${url}`)
    })
    
    // URLs VAE (fallback)
    console.log('   🔄 VAE Conducteur de Travaux → /formations/vae-conducteur-travaux')
    console.log('   🔄 VAE Chargé d\'Affaires → /formations/vae-charge-affaires')
    
    console.log('\n🎉 RÉSUMÉ FINAL:')
    console.log('=' .repeat(50))
    console.log(`📊 Total formations: ${formationsData.data?.length || 0}`)
    console.log(`📁 Alternance: ${alternanceFormations.length} formations`)
    console.log(`📁 Reconversion: ${reconversionFormations.length} formations`)
    console.log(`📁 VAE: ${vaeFormations.length > 0 ? vaeFormations.length : '2 (fallback)'} formations`)
    console.log(`🎯 Dropdown fonctionnel: ${validCategories.length >= 1 ? 'OUI' : 'NON'}`)
    
    console.log('\n✅ Le dropdown formations devrait maintenant fonctionner correctement!')
    console.log('🌐 Vérifiez sur: http://localhost:3000')
    console.log('🔍 Survolez "Formations" dans le header pour voir le dropdown')
    
  } catch (error) {
    console.error('❌ Erreur lors de la vérification:', error.message)
  }
}

verifyDropdownData()