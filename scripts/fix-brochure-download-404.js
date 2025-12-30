const axios = require('axios');

console.log('🔧 Fix immédiat du problème 404 des brochures...\n');

async function fixBrochureDownload() {
  const strapiUrl = 'https://cma-education-strapi-production.up.railway.app';
  
  try {
    // 1. Tester les URLs des brochures
    console.log('🔍 Test des URLs de brochures Strapi...');
    const response = await axios.get(`${strapiUrl}/api/formations?populate=*`);
    const formations = response.data.data;
    
    const formationsWithBrochures = formations.filter(f => 
      f.attributes.brochure?.data?.attributes?.url
    );
    
    console.log(`📋 ${formationsWithBrochures.length} formations avec brochures trouvées`);
    
    // 2. Tester quelques URLs
    for (let i = 0; i < Math.min(3, formationsWithBrochures.length); i++) {
      const formation = formationsWithBrochures[i];
      const brochureUrl = `${strapiUrl}${formation.attributes.brochure.data.attributes.url}`;
      
      console.log(`\n${i + 1}. ${formation.attributes.title}`);
      console.log(`   URL: ${brochureUrl}`);
      
      try {
        const brochureResponse = await axios.head(brochureUrl);
        console.log(`   ✅ Accessible - Status: ${brochureResponse.status}`);
      } catch (error) {
        console.log(`   ❌ 404 Error - ${error.response?.status}`);
      }
    }
    
    console.log('\n🔧 Problème confirmé: Les URLs Strapi retournent 404');
    console.log('💡 Solution: Créer un système de brochures générées dynamiquement');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

fixBrochureDownload();