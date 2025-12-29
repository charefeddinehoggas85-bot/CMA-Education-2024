// Test simple de l'API Strapi
async function testStrapiAPI() {
  console.log('🔍 Test de l\'API Strapi...')
  
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
  
  try {
    // Test de connexion basique
    console.log('📡 Test de connexion à:', STRAPI_URL)
    
    const response = await fetch(`${STRAPI_URL}/api/formations?populate=*`)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    console.log('✅ Connexion réussie!')
    console.log('📊 Formations trouvées:', data.data?.length || 0)
    
    if (data.data?.length > 0) {
      console.log('📋 Première formation:', {
        id: data.data[0].id,
        title: data.data[0].attributes?.title || data.data[0].attributes?.titre,
        slug: data.data[0].attributes?.slug,
        category: data.data[0].attributes?.category?.data?.attributes?.name
      })
    }
    
    // Test des catégories
    const categoriesResponse = await fetch(`${STRAPI_URL}/api/formation-categories?populate=*`)
    if (categoriesResponse.ok) {
      const categoriesData = await categoriesResponse.json()
      console.log('📊 Catégories trouvées:', categoriesData.data?.length || 0)
    }
    
  } catch (error) {
    console.error('❌ Erreur de connexion Strapi:', error.message)
    console.log('💡 Vérifiez que Strapi est démarré sur', STRAPI_URL)
    console.log('💡 Ou que NEXT_PUBLIC_STRAPI_URL est correctement configuré')
  }
}

testStrapiAPI()