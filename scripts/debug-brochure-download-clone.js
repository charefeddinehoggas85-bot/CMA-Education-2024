const axios = require('axios');

console.log('🔍 Diagnostic du problème de téléchargement de brochures (CLONE)...\n');

async function debugBrochureIssue() {
  const strapiUrl = 'https://cma-education-strapi-production.up.railway.app';
  
  try {
    // 1. Tester la connexion Strapi
    console.log('🔗 Test de connexion Strapi...');
    const healthCheck = await axios.get(`${strapiUrl}/api/formations?populate=*`);
    console.log(`✅ Strapi accessible - ${healthCheck.data.data.length} formations trouvées`);
    
    // 2. Analyser les formations et leurs brochures
    console.log('\n📋 Analyse des brochures disponibles:');
    const formations = healthCheck.data.data;
    
    formations.forEach((formation, index) => {
      console.log(`\n${index + 1}. ${formation.attributes.title}`);
      
      // Vérifier les différents champs de brochure
      const brochureField = formation.attributes.brochure;
      const brochureDataField = formation.attributes.brochureData;
      
      if (brochureField) {
        console.log(`   📄 Champ brochure:`, typeof brochureField === 'object' ? JSON.stringify(brochureField, null, 2) : brochureField);
      }
      
      if (brochureDataField?.data) {
        console.log(`   📄 BrochureData:`, brochureDataField.data.attributes?.url || 'URL manquante');
        console.log(`   📄 URL complète: ${strapiUrl}${brochureDataField.data.attributes?.url}`);
      }
      
      if (!brochureField && !brochureDataField?.data) {
        console.log(`   ❌ Aucune brochure trouvée`);
      }
    });
    
    // 3. Tester une URL de brochure spécifique
    console.log('\n🔍 Test d\'une URL de brochure...');
    const formationAvecBrochure = formations.find(f => 
      f.attributes.brochureData?.data?.attributes?.url
    );
    
    if (formationAvecBrochure) {
      const brochureUrl = `${strapiUrl}${formationAvecBrochure.attributes.brochureData.data.attributes.url}`;
      console.log(`🔗 Test de l'URL: ${brochureUrl}`);
      
      try {
        const brochureResponse = await axios.head(brochureUrl);
        console.log(`✅ Brochure accessible - Status: ${brochureResponse.status}`);
        console.log(`📄 Type: ${brochureResponse.headers['content-type']}`);
        console.log(`📏 Taille: ${brochureResponse.headers['content-length']} bytes`);
      } catch (brochureError) {
        console.log(`❌ Erreur d'accès à la brochure: ${brochureError.response?.status} - ${brochureError.message}`);
      }
    }
    
    // 4. Vérifier les uploads Strapi
    console.log('\n🔍 Vérification des fichiers uploadés...');
    try {
      const uploadsCheck = await axios.get(`${strapiUrl}/api/upload/files`);
      const pdfFiles = uploadsCheck.data.filter(file => 
        file.mime === 'application/pdf' || file.ext === '.pdf'
      );
      
      console.log(`📁 ${pdfFiles.length} fichiers PDF trouvés dans les uploads:`);
      pdfFiles.slice(0, 5).forEach(file => {
        console.log(`   - ${file.name}`);
        console.log(`     URL: ${strapiUrl}${file.url}`);
      });
      
    } catch (uploadError) {
      console.log('❌ Impossible d\'accéder aux uploads:', uploadError.message);
    }
    
  } catch (error) {
    console.error('❌ Erreur lors du diagnostic:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}

debugBrochureIssue();
