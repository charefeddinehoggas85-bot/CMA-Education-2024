const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';

async function debugStrapiFormations() {
  try {
    console.log('🔍 Debug des formations et catégories Strapi');
    console.log('=' .repeat(60));

    // 1. Lister toutes les formations
    console.log('\n📋 1. Toutes les formations:');
    const formationsResponse = await axios.get(`${STRAPI_URL}/api/formations?populate=*`);
    const formations = formationsResponse.data.data;
    
    console.log(`Total formations: ${formations.length}`);
    formations.forEach((formation, index) => {
      console.log(`  ${index + 1}. ${formation.attributes.titre}`);
      console.log(`     Slug: ${formation.attributes.slug}`);
      console.log(`     ID: ${formation.id}`);
      
      const categories = formation.attributes.formation_categories?.data || [];
      if (categories.length > 0) {
        console.log(`     Catégories: ${categories.map(cat => cat.attributes?.nom || 'N/A').join(', ')}`);
      } else {
        console.log(`     Catégories: Aucune`);
      }
    });

    // 2. Lister toutes les catégories
    console.log('\n📂 2. Toutes les catégories:');
    const categoriesResponse = await axios.get(`${STRAPI_URL}/api/formation-categories?populate=*`);
    const categories = categoriesResponse.data.data;
    
    console.log(`Total catégories: ${categories.length}`);
    categories.forEach((category, index) => {
      const formationsCount = category.attributes.formations?.data?.length || 0;
      console.log(`  ${index + 1}. ${category.attributes.nom} (${formationsCount} formations)`);
      console.log(`     ID: ${category.id}`);
      console.log(`     Description: ${category.attributes.description || 'N/A'}`);
    });

    // 3. Chercher spécifiquement la formation TP
    console.log('\n🎯 3. Recherche formation Conducteur Travaux Publics:');
    const tpFormations = formations.filter(f => 
      f.attributes.titre.toLowerCase().includes('travaux publics') ||
      f.attributes.slug.includes('travaux-publics')
    );
    
    if (tpFormations.length > 0) {
      console.log(`✅ ${tpFormations.length} formation(s) trouvée(s):`);
      tpFormations.forEach(formation => {
        console.log(`  - ${formation.attributes.titre}`);
        console.log(`    Slug: ${formation.attributes.slug}`);
        console.log(`    ID: ${formation.id}`);
      });
    } else {
      console.log('❌ Aucune formation Travaux Publics trouvée');
    }

    // 4. Vérifier la catégorie reconversion
    console.log('\n🔍 4. Détail catégorie reconversion:');
    const reconversionCat = categories.find(cat => cat.attributes.nom === 'reconversion');
    
    if (reconversionCat) {
      console.log('✅ Catégorie reconversion trouvée:');
      console.log(`   ID: ${reconversionCat.id}`);
      console.log(`   Formations: ${reconversionCat.attributes.formations?.data?.length || 0}`);
      
      if (reconversionCat.attributes.formations?.data?.length > 0) {
        reconversionCat.attributes.formations.data.forEach(formation => {
          console.log(`     - ${formation.attributes.titre}`);
        });
      }
    } else {
      console.log('❌ Catégorie reconversion non trouvée');
    }

  } catch (error) {
    console.error('❌ Erreur:', error.response?.data || error.message);
  }
}

debugStrapiFormations();