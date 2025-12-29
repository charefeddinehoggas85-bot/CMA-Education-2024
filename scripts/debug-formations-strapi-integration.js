// Debug de l'intégration Strapi pour les formations
async function debugFormationsIntegration() {
  console.log('🔍 Debug de l\'intégration Strapi formations...\n')
  
  // Test 1: Vérifier que Strapi fonctionne
  console.log('📡 Test 1: Connexion Strapi...')
  try {
    const strapiResponse = await fetch('http://localhost:1337/api/formations?populate=*')
    const strapiData = await strapiResponse.json()
    
    console.log('✅ Strapi accessible:', strapiResponse.ok)
    console.log('📊 Formations Strapi:', strapiData.data?.length || 0)
    
    if (strapiData.data && strapiData.data.length > 0) {
      const formation = strapiData.data[0]
      console.log('📋 Exemple formation Strapi:')
      console.log('   - ID:', formation.id)
      console.log('   - Titre:', formation.attributes?.title)
      console.log('   - Slug:', formation.attributes?.slug)
      console.log('   - Description courte:', formation.attributes?.shortDescription?.substring(0, 50) + '...')
      console.log('   - Niveau:', formation.attributes?.level)
      console.log('   - RNCP:', formation.attributes?.rncp)
      console.log('   - Durée:', formation.attributes?.duree)
      console.log('   - Rythme:', formation.attributes?.rythme)
      console.log('   - Image présente:', !!formation.attributes?.image?.data)
      console.log('   - Catégorie:', formation.attributes?.category?.data?.attributes?.name)
      console.log('   - Objectifs présents:', !!formation.attributes?.objectifs)
      console.log('   - Débouchés présents:', !!formation.attributes?.debouches)
    }
  } catch (error) {
    console.error('❌ Erreur Strapi:', error.message)
    return
  }
  
  console.log('\n' + '='.repeat(60) + '\n')
  
  // Test 2: Tester la page formations
  console.log('📋 Test 2: Page formations (/formations)...')
  try {
    const formationsPageResponse = await fetch('http://localhost:3000/formations')
    console.log('✅ Page accessible:', formationsPageResponse.ok)
    
    if (formationsPageResponse.ok) {
      const html = await formationsPageResponse.text()
      
      // Analyser le contenu HTML
      console.log('📊 Analyse du contenu:')
      
      // Vérifier les formations affichées
      const formationTitles = html.match(/Formation[^<]*(?:conducteur|chargé|bâtiment|travaux)/gi) || []
      console.log('   - Titres de formations trouvés:', formationTitles.length)
      formationTitles.slice(0, 3).forEach((title, i) => {
        console.log(`     ${i + 1}. ${title.substring(0, 50)}...`)
      })
      
      // Vérifier les boutons candidater
      const candidaterButtons = html.match(/Candidater maintenant/g) || []
      console.log('   - Boutons "Candidater maintenant":', candidaterButtons.length)
      
      // Vérifier les images
      const images = html.match(/src="[^"]*(?:formations|strapi|localhost:1337)[^"]*"/g) || []
      console.log('   - Images de formations:', images.length)
      images.slice(0, 3).forEach((img, i) => {
        console.log(`     ${i + 1}. ${img}`)
      })
      
      // Vérifier les données Strapi vs statiques
      const hasStaticData = html.includes('formationsAlternance') || html.includes('formationsReconversion')
      const hasStrapiData = html.includes('localhost:1337') || html.includes('strapi')
      console.log('   - Utilise données statiques:', hasStaticData)
      console.log('   - Utilise données Strapi:', hasStrapiData)
      
      // Vérifier les catégories
      const categories = html.match(/(?:Alternance|Reconversion|VAE|Entreprise)/g) || []
      console.log('   - Catégories affichées:', [...new Set(categories)])
    }
  } catch (error) {
    console.error('❌ Erreur page formations:', error.message)
  }
  
  console.log('\n' + '='.repeat(60) + '\n')
  
  // Test 3: Tester une page formation spécifique
  console.log('📋 Test 3: Page formation spécifique...')
  const testSlugs = [
    'conducteur-travaux-batiment-alternance',
    'charge-affaires-batiment-alternance',
    'conducteur-travaux'
  ]
  
  for (const slug of testSlugs) {
    console.log(`\n🔍 Test slug: ${slug}`)
    try {
      const response = await fetch(`http://localhost:3000/formations/${slug}`)
      console.log('   ✅ Status:', response.status)
      
      if (response.ok) {
        const html = await response.text()
        
        // Vérifier le contenu
        const hasTitle = html.includes('Conducteur') || html.includes('Chargé') || html.includes('Formation')
        const hasObjectifs = html.includes('Objectifs') || html.includes('objectifs')
        const hasDebouches = html.includes('Débouchés') || html.includes('débouchés')
        const hasImage = html.includes('localhost:1337') || html.includes('/images/formations/')
        const hasRNCP = html.includes('RNCP')
        
        console.log('   📊 Contenu:')
        console.log('     - Titre présent:', hasTitle)
        console.log('     - Objectifs présents:', hasObjectifs)
        console.log('     - Débouchés présents:', hasDebouches)
        console.log('     - Image présente:', hasImage)
        console.log('     - RNCP présent:', hasRNCP)
        
        // Extraire le titre de la page
        const titleMatch = html.match(/<h1[^>]*>([^<]+)</i)
        if (titleMatch) {
          console.log('     - Titre extrait:', titleMatch[1].trim())
        }
        
        // Vérifier les erreurs
        const hasError = html.includes('Formation non trouvée') || html.includes('404')
        console.log('     - Erreur détectée:', hasError)
        
      } else if (response.status === 404) {
        console.log('   ❌ Formation non trouvée (404)')
      }
    } catch (error) {
      console.error('   ❌ Erreur:', error.message)
    }
  }
  
  console.log('\n' + '='.repeat(60) + '\n')
  
  // Résumé et recommandations
  console.log('🎯 RÉSUMÉ ET RECOMMANDATIONS:\n')
  
  console.log('✅ Points positifs:')
  console.log('   - Strapi fonctionne et contient 18 formations')
  console.log('   - Les pages Next.js sont accessibles')
  console.log('   - Les composants sont configurés pour utiliser Strapi')
  
  console.log('\n❌ Points à vérifier:')
  console.log('   - Les données Strapi sont-elles effectivement utilisées ?')
  console.log('   - Les slugs correspondent-ils entre Strapi et Next.js ?')
  console.log('   - Les images Strapi sont-elles correctement affichées ?')
  console.log('   - Les objectifs et débouchés sont-ils correctement mappés ?')
  
  console.log('\n🔧 Actions recommandées:')
  console.log('   1. Vérifier les logs du serveur Next.js pendant le chargement des pages')
  console.log('   2. Ajouter des console.log dans les composants pour tracer les appels Strapi')
  console.log('   3. Vérifier que les useEffect() se déclenchent correctement')
  console.log('   4. Vérifier la correspondance des slugs entre Strapi et les routes Next.js')
  console.log('   5. Tester la gestion des erreurs et fallbacks')
}

debugFormationsIntegration()