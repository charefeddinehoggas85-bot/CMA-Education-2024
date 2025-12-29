// Test de l'accès à Strapi depuis le frontend

async function testStrapiFromFrontend() {
  try {
    console.log('🔍 Test de l\'accès à Strapi depuis le frontend...\n');
    
    // Tester l'accès direct à l'API Strapi
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    console.log(`🌐 URL Strapi: ${strapiUrl}`);
    
    // Test des formations
    const formationsResponse = await fetch(`${strapiUrl}/api/formations?populate=*&sort=ordre:asc`);
    console.log(`📋 Formations API: ${formationsResponse.status} ${formationsResponse.statusText}`);
    
    if (formationsResponse.ok) {
      const formationsData = await formationsResponse.json();
      console.log(`   Nombre de formations: ${formationsData.data?.length || 0}`);
      
      // Vérifier les catégories
      const formationsWithCategory = formationsData.data?.filter(f => f.attributes?.category?.data) || [];
      console.log(`   Formations avec catégorie: ${formationsWithCategory.length}`);
      
      // Lister les catégories uniques
      const categories = [...new Set(formationsWithCategory.map(f => f.attributes.category.data.attributes.name))];
      console.log(`   Catégories trouvées: ${categories.join(', ')}`);
    }
    
    // Test des catégories
    const categoriesResponse = await fetch(`${strapiUrl}/api/formation-categories?populate=*&sort=ordre:asc`);
    console.log(`🏷️ Catégories API: ${categoriesResponse.status} ${categoriesResponse.statusText}`);
    
    if (categoriesResponse.ok) {
      const categoriesData = await categoriesResponse.json();
      console.log(`   Nombre de catégories: ${categoriesData.data?.length || 0}`);
    }
    
    // Test des paramètres du site
    const settingsResponse = await fetch(`${strapiUrl}/api/site-settings?populate=*`);
    console.log(`⚙️ Site Settings API: ${settingsResponse.status} ${settingsResponse.statusText}`);
    
    // Test de la navigation
    const navResponse = await fetch(`${strapiUrl}/api/main-navigation?populate=*`);
    console.log(`🧭 Navigation API: ${navResponse.status} ${navResponse.statusText}`);
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

testStrapiFromFrontend();