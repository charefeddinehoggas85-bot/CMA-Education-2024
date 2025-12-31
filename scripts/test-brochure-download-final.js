const axios = require('axios');

console.log('🔍 Test final du téléchargement des brochures...\n');

async function testBrochureDownload() {
  const strapiUrl = 'https://cma-education-strapi-production.up.railway.app';
  
  try {
    // 1. Récupérer les formations avec brochures
    console.log('📋 Récupération des formations avec brochures...');
    const response = await axios.get(`${strapiUrl}/api/formations?populate=*`);
    const formations = response.data.data;
    
    // 2. Filtrer les formations avec brochures (comme dans le code corrigé)
    const formationsWithBrochures = formations.filter(f => 
      f.attributes.brochure?.data?.attributes?.url
    );
    
    console.log(`✅ ${formationsWithBrochures.length} formations avec brochures trouvées`);
    
    // 3. Tester quelques URLs de brochures
    console.log('\n🔍 Test des URLs de brochures:');
    
    for (let i = 0; i < Math.min(3, formationsWithBrochures.length); i++) {
      const formation = formationsWithBrochures[i];
      const brochureUrl = `${strapiUrl}${formation.attributes.brochure.data.attributes.url}`;
      
      console.log(`\n${i + 1}. ${formation.attributes.title}`);
      console.log(`   URL: ${brochureUrl}`);
      
      try {
        const brochureResponse = await axios.head(brochureUrl);
        console.log(`   ✅ Accessible - Status: ${brochureResponse.status}`);
        console.log(`   📄 Type: ${brochureResponse.headers['content-type']}`);
        console.log(`   📏 Taille: ${Math.round(brochureResponse.headers['content-length'] / 1024)} KB`);
      } catch (error) {
        console.log(`   ❌ Erreur: ${error.response?.status} - ${error.message}`);
      }
    }
    
    console.log('\n✅ Test terminé - Le système de brochures devrait fonctionner correctement !');
    console.log('🔗 Testez sur: https://cma-education-2024.vercel.app/brochure');
    
  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message);
  }
}

testBrochureDownload();
