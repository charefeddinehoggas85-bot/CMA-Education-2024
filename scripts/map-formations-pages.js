// Script pour mapper les formations avec leurs pages correspondantes
async function mapFormationsToPages() {
  console.log('🔍 Mapping des formations avec leurs pages...')
  
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
  
  try {
    // Récupérer toutes les formations avec catégories
    const response = await fetch(`${STRAPI_URL}/api/formations?populate[category]=*`)
    const data = await response.json()
    
    const formations = data.data?.map(formation => ({
      id: formation.id,
      title: formation.attributes.title || formation.attributes.titre,
      slug: formation.attributes.slug,
      category: formation.attributes.category?.data ? {
        name: formation.attributes.category.data.attributes.name,
        slug: formation.attributes.category.data.attributes.slug
      } : null
    })) || []
    
    console.log(`\n📊 ${formations.length} formations trouvées dans Strapi\n`)
    
    // Organiser par catégorie
    const categories = {
      'alternance': [],
      'reconversion': [],
      'vae': [],
      'sans-categorie': []
    }
    
    formations.forEach(formation => {
      const categorySlug = formation.category?.slug || 'sans-categorie'
      if (categories[categorySlug]) {
        categories[categorySlug].push(formation)
      } else {
        categories['sans-categorie'].push(formation)
      }
    })
    
    // Afficher les résultats
    console.log('📁 FORMATIONS EN ALTERNANCE (9 formations):')
    console.log('=' .repeat(60))
    categories.alternance.forEach((formation, idx) => {
      console.log(`${idx + 1}. ${formation.title}`)
      console.log(`   📄 Page: /formations/${formation.slug}`)
      console.log(`   🔗 Slug: ${formation.slug}`)
      console.log('')
    })
    
    console.log('📁 FORMATIONS EN RECONVERSION (2 formations):')
    console.log('=' .repeat(60))
    categories.reconversion.forEach((formation, idx) => {
      console.log(`${idx + 1}. ${formation.title}`)
      console.log(`   📄 Page: /formations/${formation.slug}`)
      console.log(`   🔗 Slug: ${formation.slug}`)
      console.log('')
    })
    
    console.log('📁 FORMATIONS VAE (0 formations dans Strapi):')
    console.log('=' .repeat(60))
    if (categories.vae.length === 0) {
      console.log('❌ Aucune formation VAE dans Strapi')
      console.log('🔄 Utilise le fallback avec:')
      console.log('   1. VAE Conducteur de Travaux')
      console.log('      📄 Page: /formations/vae-btp/conducteur-travaux')
      console.log('   2. VAE Chargé d\'Affaires')
      console.log('      📄 Page: /formations/vae-btp/charge-affaires')
      console.log('')
    } else {
      categories.vae.forEach((formation, idx) => {
        console.log(`${idx + 1}. ${formation.title}`)
        console.log(`   📄 Page: /formations/${formation.slug}`)
        console.log(`   🔗 Slug: ${formation.slug}`)
        console.log('')
      })
    }
    
    if (categories['sans-categorie'].length > 0) {
      console.log('📁 FORMATIONS SANS CATÉGORIE:')
      console.log('=' .repeat(60))
      categories['sans-categorie'].forEach((formation, idx) => {
        console.log(`${idx + 1}. ${formation.title}`)
        console.log(`   📄 Page: /formations/${formation.slug}`)
        console.log(`   🔗 Slug: ${formation.slug}`)
        console.log('')
      })
    }
    
    // Pages spécialisées existantes
    console.log('📁 PAGES SPÉCIALISÉES EXISTANTES:')
    console.log('=' .repeat(60))
    console.log('1. Page générale formations')
    console.log('   📄 Page: /formations')
    console.log('   📝 Description: Liste toutes les formations par catégorie')
    console.log('')
    
    console.log('2. Formations pour entreprises')
    console.log('   📄 Page: /formations/entreprises')
    console.log('   📝 Description: Formations dédiées aux entreprises')
    console.log('')
    
    console.log('3. VAE BTP - Page principale')
    console.log('   📄 Page: /formations/vae-btp')
    console.log('   📝 Description: Présentation générale de la VAE')
    console.log('')
    
    console.log('4. VAE Conducteur de Travaux')
    console.log('   📄 Page: /formations/vae-btp/conducteur-travaux')
    console.log('   📝 Description: VAE spécialisée Conducteur de Travaux')
    console.log('')
    
    console.log('5. VAE Chargé d\'Affaires')
    console.log('   📄 Page: /formations/vae-btp/charge-affaires')
    console.log('   📝 Description: VAE spécialisée Chargé d\'Affaires')
    console.log('')
    
    console.log('6. Reconversion BTP - Page principale')
    console.log('   📄 Page: /formations/reconversion-btp')
    console.log('   📝 Description: Présentation générale de la reconversion')
    console.log('')
    
    console.log('7. Reconversion Conducteur de Travaux')
    console.log('   📄 Page: /formations/reconversion-btp/conducteur-travaux')
    console.log('   📝 Description: Reconversion spécialisée Conducteur de Travaux')
    console.log('')
    
    console.log('8. Reconversion Chargé d\'Affaires')
    console.log('   📄 Page: /formations/reconversion-btp/charge-affaires')
    console.log('   📝 Description: Reconversion spécialisée Chargé d\'Affaires')
    console.log('')
    
    // Résumé
    console.log('📊 RÉSUMÉ:')
    console.log('=' .repeat(60))
    console.log(`✅ Formations Alternance: ${categories.alternance.length} (dans Strapi)`)
    console.log(`✅ Formations Reconversion: ${categories.reconversion.length} (dans Strapi)`)
    console.log(`🔄 Formations VAE: 2 (fallback - pages statiques existantes)`)
    console.log(`⚠️  Formations sans catégorie: ${categories['sans-categorie'].length}`)
    console.log(`📄 Pages spécialisées: 8 pages statiques`)
    console.log(`🎯 Total formations visibles dans dropdown: ${categories.alternance.length + categories.reconversion.length + 2}`)
    
  } catch (error) {
    console.error('❌ Erreur:', error.message)
  }
}

mapFormationsToPages()