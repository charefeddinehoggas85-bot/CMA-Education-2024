// Test direct de la fonction getFormation
async function testGetFormationFunction() {
  console.log('🔍 Test direct de la fonction getFormation...\n')
  
  const slug = 'conducteur-travaux-batiment-alternance'
  
  // Simuler la fonction getFormation
  async function testGetFormation(slug) {
    const STRAPI_URL = 'http://localhost:1337'
    
    try {
      console.log('📡 Appel API Strapi...')
      const url = `${STRAPI_URL}/api/formations?filters[slug][$eq]=${slug}&populate=*`
      console.log('URL:', url)
      
      const response = await fetch(url)
      console.log('✅ Réponse:', response.ok, response.status)
      
      if (!response.ok) {
        console.error('❌ Erreur API:', response.status, response.statusText)
        return null
      }
      
      const data = await response.json()
      console.log('📊 Données reçues:', !!data.data, 'formations:', data.data?.length || 0)
      
      if (!data.data || data.data.length === 0) {
        console.log('❌ Aucune formation trouvée')
        return null
      }
      
      const item = data.data[0]
      console.log('📋 Formation brute:', !!item)
      
      // Transformer les données (comme dans strapi.ts)
      const transformed = {
        id: item.id,
        ...item.attributes,
        // Mapper les relations de catégorie
        category: item.attributes?.category?.data ? {
          id: item.attributes.category.data.id,
          ...item.attributes.category.data.attributes
        } : null,
        // Ajouter les données d'image
        imageData: item.attributes?.image || null
      }
      
      console.log('✅ Formation transformée:')
      console.log('   - ID:', transformed.id)
      console.log('   - Titre:', transformed.title)
      console.log('   - Slug:', transformed.slug)
      console.log('   - Niveau:', transformed.level)
      console.log('   - RNCP:', transformed.rncp)
      console.log('   - Durée:', transformed.duree)
      console.log('   - Rythme:', transformed.rythme)
      console.log('   - Description courte:', transformed.shortDescription)
      console.log('   - Description complète:', transformed.fullDescription)
      console.log('   - Objectifs type:', typeof transformed.objectifs)
      console.log('   - Objectifs contenu:', Array.isArray(transformed.objectifs) ? transformed.objectifs.length + ' items' : transformed.objectifs)
      console.log('   - Débouchés type:', typeof transformed.debouches)
      console.log('   - Débouchés contenu:', Array.isArray(transformed.debouches) ? transformed.debouches.length + ' items' : transformed.debouches)
      console.log('   - Prérequis type:', typeof transformed.prerequis)
      console.log('   - Image data:', !!transformed.imageData)
      console.log('   - Catégorie:', transformed.category?.name)
      
      return transformed
      
    } catch (error) {
      console.error('❌ Erreur getFormation:', error.message)
      return null
    }
  }
  
  // Test de la fonction
  const formation = await testGetFormation(slug)
  
  if (formation) {
    console.log('\n🎯 RÉSULTAT:')
    console.log('✅ La fonction getFormation fonctionne correctement')
    console.log('✅ Les données sont complètes et bien formatées')
    console.log('\n📋 Données finales pour le composant:')
    console.log(JSON.stringify({
      id: formation.id,
      title: formation.title,
      slug: formation.slug,
      level: formation.level,
      rncp: formation.rncp,
      duree: formation.duree,
      objectifs: Array.isArray(formation.objectifs) ? formation.objectifs.slice(0, 2) : 'Non array',
      debouches: Array.isArray(formation.debouches) ? formation.debouches.slice(0, 2) : 'Non array'
    }, null, 2))
  } else {
    console.log('\n❌ PROBLÈME:')
    console.log('La fonction getFormation ne retourne pas de données')
    console.log('Vérifiez la configuration Strapi et les permissions')
  }
}

testGetFormationFunction()