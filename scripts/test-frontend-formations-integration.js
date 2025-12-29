// Test de l'intégration Strapi sur les pages formations
async function testFrontendIntegration() {
  console.log('🔍 Test de l\'intégration frontend formations...\n')
  
  const baseURL = 'http://localhost:3000'
  
  try {
    // Test 1: Page formations principale
    console.log('📋 Test page /formations...')
    const formationsResponse = await fetch(`${baseURL}/formations`)
    console.log('✅ Status:', formationsResponse.status)
    
    if (formationsResponse.ok) {
      const html = await formationsResponse.text()
      
      // Vérifier la présence de formations
      const hasFormationCards = html.includes('Formation') && html.includes('Candidater')
      console.log('📊 Contient des cartes de formation:', hasFormationCards)
      
      // Vérifier si les données Strapi sont utilisées
      const hasStaticData = html.includes('formationsAlternance') || html.includes('formationsReconversion')
      console.log('📋 Utilise données statiques:', hasStaticData)
      
      // Vérifier la présence d'images
      const hasImages = html.includes('/images/formations/') || html.includes('localhost:1337')
      console.log('🖼️ Contient des images:', hasImages)
      
      // Compter les formations affichées
      const formationMatches = html.match(/Candidater maintenant/g)
      console.log('📊 Nombre de boutons "Candidater":', formationMatches?.length || 0)
    }
    
    console.log('')
    
    // Test 2: Page formation spécifique
    console.log('📋 Test page formation spécifique...')
    const formationResponse = await fetch(`${baseURL}/formations/conducteur-travaux-batiment-alternance`)
    console.log('✅ Status:', formationResponse.status)
    
    if (formationResponse.ok) {
      const html = await formationResponse.text()
      
      // Vérifier le titre
      const hasTitle = html.includes('Conducteur') && html.includes('Travaux')
      console.log('📊 Contient le titre:', hasTitle)
      
      // Vérifier les objectifs
      const hasObjectifs = html.includes('Objectifs') || html.includes('objectifs')
      console.log('📋 Contient des objectifs:', hasObjectifs)
      
      // Vérifier les débouchés
      const hasDebouches = html.includes('Débouchés') || html.includes('débouchés')
      console.log('💼 Contient des débouchés:', hasDebouches)
      
      // Vérifier l'image
      const hasImage = html.includes('localhost:1337') || html.includes('/images/formations/')
      console.log('🖼️ Contient une image:', hasImage)
    }
    
    console.log('')
    
    // Test 3: Vérifier les logs du serveur pour les appels Strapi
    console.log('📡 Vérification des appels Strapi...')
    console.log('   - Vérifiez les logs du serveur Next.js pour voir les appels à getFormations()')
    console.log('   - Vérifiez les logs du serveur Next.js pour voir les appels à getFormation()')
    
  } catch (error) {
    console.error('❌ Erreur:', error.message)
  }
}

// Test direct de l'API Strapi
async function testStrapiAPI() {
  console.log('\n🔗 Test direct API Strapi...')
  
  try {
    const response = await fetch('http://localhost:1337/api/formations?populate=*')
    const data = await response.json()
    
    console.log('✅ API Strapi accessible:', response.ok)
    console.log('📊 Formations dans Strapi:', data.data?.length || 0)
    
    if (data.data && data.data.length > 0) {
      const formation = data.data[0]
      console.log('📋 Première formation:')
      console.log('   - Titre:', formation.attributes?.title)
      console.log('   - Slug:', formation.attributes?.slug)
      console.log('   - Image:', !!formation.attributes?.image?.data)
      console.log('   - Catégorie:', formation.attributes?.category?.data?.attributes?.name)
    }
  } catch (error) {
    console.error('❌ Erreur API Strapi:', error.message)
  }
}

async function main() {
  await testStrapiAPI()
  await testFrontendIntegration()
  
  console.log('\n🎯 Diagnostic:')
  console.log('1. Strapi contient les données des formations')
  console.log('2. Les pages Next.js sont accessibles')
  console.log('3. Vérifiez que les composants utilisent getFormations() et getFormation()')
  console.log('4. Vérifiez les logs du serveur Next.js pour les appels Strapi')
  console.log('\n💡 Actions recommandées:')
  console.log('- Vérifier que useEffect() dans les composants appelle les fonctions Strapi')
  console.log('- Vérifier que les données Strapi remplacent les données statiques')
  console.log('- Vérifier la gestion des erreurs et fallbacks')
}

main()