// Comparaison des slugs entre Strapi et données statiques
async function compareSlugs() {
  console.log('🔍 Comparaison des slugs Strapi vs données statiques...\n')
  
  // Récupérer les slugs depuis Strapi
  console.log('📡 Récupération des slugs Strapi...')
  try {
    const strapiResponse = await fetch('http://localhost:1337/api/formations?populate=*')
    const strapiData = await strapiResponse.json()
    
    const strapiSlugs = strapiData.data?.map(formation => ({
      id: formation.id,
      title: formation.attributes?.title,
      slug: formation.attributes?.slug,
      category: formation.attributes?.category?.data?.attributes?.name
    })) || []
    
    console.log('✅ Slugs Strapi trouvés:', strapiSlugs.length)
    console.log('\n📋 Liste des formations Strapi:')
    strapiSlugs.forEach((formation, index) => {
      console.log(`${index + 1}. ${formation.title}`)
      console.log(`   Slug: ${formation.slug}`)
      console.log(`   Catégorie: ${formation.category}`)
      console.log('')
    })
    
    // Récupérer les slugs depuis les données statiques
    console.log('📊 Slugs des données statiques:')
    
    // Simuler les données statiques (on ne peut pas importer le fichier TS directement)
    const staticSlugs = [
      'conducteur-travaux',
      'charge-affaires',
      'chef-equipe-gros-oeuvre',
      'technicien-etudes-batiment',
      'conducteur-travaux-reconversion',
      'charge-affaires-reconversion',
      'chef-equipe-reconversion',
      'technicien-etudes-reconversion'
    ]
    
    console.log('📋 Slugs statiques connus:')
    staticSlugs.forEach((slug, index) => {
      console.log(`${index + 1}. ${slug}`)
    })
    
    console.log('\n' + '='.repeat(60))
    
    // Comparaison
    console.log('\n🔍 ANALYSE DES CORRESPONDANCES:\n')
    
    console.log('✅ Slugs Strapi qui correspondent aux routes statiques:')
    const matchingSlugs = strapiSlugs.filter(strapi => 
      staticSlugs.some(static => static === strapi.slug || strapi.slug.includes(static))
    )
    matchingSlugs.forEach(match => {
      console.log(`   - ${match.slug} → ${match.title}`)
    })
    
    console.log('\n❌ Slugs Strapi sans correspondance statique:')
    const nonMatchingSlugs = strapiSlugs.filter(strapi => 
      !staticSlugs.some(static => static === strapi.slug || strapi.slug.includes(static))
    )
    nonMatchingSlugs.forEach(nonMatch => {
      console.log(`   - ${nonMatch.slug} → ${nonMatch.title}`)
    })
    
    console.log('\n📊 STATISTIQUES:')
    console.log(`   - Total formations Strapi: ${strapiSlugs.length}`)
    console.log(`   - Correspondances trouvées: ${matchingSlugs.length}`)
    console.log(`   - Sans correspondance: ${nonMatchingSlugs.length}`)
    console.log(`   - Taux de correspondance: ${Math.round((matchingSlugs.length / strapiSlugs.length) * 100)}%`)
    
    console.log('\n🔧 RECOMMANDATIONS:')
    console.log('1. Créer des pages Next.js pour tous les slugs Strapi')
    console.log('2. Ou ajuster les slugs Strapi pour correspondre aux routes existantes')
    console.log('3. Implémenter un système de redirection pour les anciens slugs')
    console.log('4. Vérifier que getFormation() utilise les bons slugs')
    
    // Test des URLs spécifiques
    console.log('\n🌐 TEST DES URLS SPÉCIFIQUES:')
    const testUrls = [
      'conducteur-travaux-batiment-alternance',
      'charge-affaires-batiment-alternance',
      'conducteur-travaux',
      'charge-affaires'
    ]
    
    for (const slug of testUrls) {
      try {
        const response = await fetch(`http://localhost:3000/formations/${slug}`)
        const strapiMatch = strapiSlugs.find(s => s.slug === slug)
        console.log(`   ${slug}:`)
        console.log(`     - URL accessible: ${response.ok} (${response.status})`)
        console.log(`     - Existe dans Strapi: ${!!strapiMatch}`)
        if (strapiMatch) {
          console.log(`     - Titre Strapi: ${strapiMatch.title}`)
        }
      } catch (error) {
        console.log(`   ${slug}: Erreur - ${error.message}`)
      }
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message)
  }
}

compareSlugs()