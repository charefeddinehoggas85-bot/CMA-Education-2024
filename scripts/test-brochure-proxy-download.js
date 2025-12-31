const axios = require('axios');

console.log('🧪 Test du téléchargement de brochures via API proxy...\n');

async function testBrochureProxyDownload() {
  const frontendUrl = 'https://cma-education-2024.vercel.app';
  const strapiUrl = 'https://cma-education-strapi-production.up.railway.app';
  
  try {
    // 1. Récupérer les formations avec brochures depuis Strapi
    console.log('📚 Récupération des formations avec brochures...');
    const formationsResponse = await axios.get(`${strapiUrl}/api/formations?populate=brochure`);
    const formations = formationsResponse.data.data;
    
    const formationsAvecBrochures = formations.filter(f => 
      f.attributes.brochure?.data?.attributes?.url
    );
    
    console.log(`✅ ${formationsAvecBrochures.length} formations avec brochures trouvées`);
    
    if (formationsAvecBrochures.length === 0) {
      console.log('❌ Aucune formation avec brochure trouvée');
      return;
    }
    
    // 2. Tester l'API proxy avec la première formation
    const testFormation = formationsAvecBrochures[0];
    console.log(`\n🔍 Test avec: ${testFormation.attributes.title}`);
    console.log(`   ID: ${testFormation.id}`);
    console.log(`   Brochure: ${testFormation.attributes.brochure.data.attributes.name}`);
    
    const testData = {
      formationId: testFormation.id,
      userData: {
        nom: 'Test',
        prenom: 'User',
        email: 'test@example.com',
        telephone: '0123456789',
        type: 'particulier'
      }
    };
    
    console.log('\n🔄 Test de l\'API proxy...');
    
    try {
      const proxyResponse = await axios.post(`${frontendUrl}/api/download-brochure`, testData, {
        headers: {
          'Content-Type': 'application/json'
        },
        responseType: 'arraybuffer',
        timeout: 30000
      });
      
      console.log(`✅ API proxy fonctionne !`);
      console.log(`   Status: ${proxyResponse.status}`);
      console.log(`   Content-Type: ${proxyResponse.headers['content-type']}`);
      console.log(`   Taille: ${proxyResponse.data.byteLength} bytes`);
      
      // Vérifier que c'est bien un PDF
      const pdfHeader = new Uint8Array(proxyResponse.data.slice(0, 4));
      const isPdf = pdfHeader[0] === 0x25 && pdfHeader[1] === 0x50 && pdfHeader[2] === 0x44 && pdfHeader[3] === 0x46; // %PDF
      
      if (isPdf) {
        console.log('✅ Le fichier téléchargé est bien un PDF valide');
      } else {
        console.log('⚠️ Le fichier téléchargé ne semble pas être un PDF');
      }
      
    } catch (proxyError) {
      console.log(`❌ Erreur API proxy: ${proxyError.response?.status || proxyError.message}`);
      
      if (proxyError.response?.data) {
        try {
          const errorText = Buffer.from(proxyError.response.data).toString();
          console.log(`   Détails: ${errorText}`);
        } catch (e) {
          console.log('   Impossible de lire les détails de l\'erreur');
        }
      }
    }
    
    // 3. Tester plusieurs formations
    console.log('\n🔍 Test de plusieurs formations...');
    
    let successCount = 0;
    let failCount = 0;
    
    for (let i = 0; i < Math.min(3, formationsAvecBrochures.length); i++) {
      const formation = formationsAvecBrochures[i];
      
      console.log(`\n${i + 1}. ${formation.attributes.title}`);
      
      try {
        const testResponse = await axios.post(`${frontendUrl}/api/download-brochure`, {
          formationId: formation.id,
          userData: testData.userData
        }, {
          headers: { 'Content-Type': 'application/json' },
          responseType: 'arraybuffer',
          timeout: 15000
        });
        
        console.log(`   ✅ Succès - ${testResponse.data.byteLength} bytes`);
        successCount++;
        
      } catch (error) {
        console.log(`   ❌ Échec - ${error.response?.status || error.message}`);
        failCount++;
      }
    }
    
    console.log(`\n📊 Résultats:`)
    console.log(`   ✅ Succès: ${successCount}`)
    console.log(`   ❌ Échecs: ${failCount}`)
    
    if (successCount > 0) {
      console.log('\n🎉 La solution proxy fonctionne ! Les brochures peuvent être téléchargées.');
      console.log('\n📋 Instructions pour tester manuellement:');
      console.log(`1. Aller sur: ${frontendUrl}/brochure`);
      console.log('2. Sélectionner une formation');
      console.log('3. Remplir le formulaire');
      console.log('4. Cliquer sur "Télécharger la brochure"');
    } else {
      console.log('\n⚠️ Aucun téléchargement n\'a réussi. Vérifiez la configuration.');
    }
    
  } catch (error) {
    console.error('❌ Erreur générale:', error.message);
  }
}

testBrochureProxyDownload();
