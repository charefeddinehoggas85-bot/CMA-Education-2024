const axios = require('axios');

console.log('🧪 Test de l\'API de téléchargement de brochures...\n');

async function testAPIBrochureDownload() {
  const frontendUrl = 'https://cma-education-2024.vercel.app';
  const strapiUrl = 'https://cma-education-strapi-production.up.railway.app';
  
  try {
    // 1. Récupérer les formations avec brochures
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
    
    // 2. Tester l'API avec plusieurs formations
    console.log('\n🔍 Test de l\'API de téléchargement:');
    
    let successCount = 0;
    let failCount = 0;
    
    for (let i = 0; i < Math.min(3, formationsAvecBrochures.length); i++) {
      const formation = formationsAvecBrochures[i];
      
      console.log(`\n${i + 1}. ${formation.attributes.title}`);
      console.log(`   ID: ${formation.id}`);
      console.log(`   Brochure: ${formation.attributes.brochure.data.attributes.name}`);
      
      const testData = {
        formationId: formation.id,
        userData: {
          nom: 'Test',
          prenom: 'User',
          email: 'test@example.com',
          telephone: '0123456789',
          type: 'particulier'
        }
      };
      
      try {
        console.log('   🔄 Appel API...');
        
        const apiResponse = await axios.post(`${frontendUrl}/api/download-brochure`, testData, {
          headers: {
            'Content-Type': 'application/json'
          },
          responseType: 'arraybuffer',
          timeout: 30000,
          maxContentLength: 50 * 1024 * 1024, // 50MB max
        });
        
        console.log(`   ✅ Status: ${apiResponse.status}`);
        console.log(`   📄 Content-Type: ${apiResponse.headers['content-type']}`);
        console.log(`   📏 Taille: ${apiResponse.data.byteLength} bytes`);
        
        // Vérifier les headers
        const downloadMethod = apiResponse.headers['x-download-method'];
        if (downloadMethod) {
          console.log(`   🔧 Méthode utilisée: ${downloadMethod}`);
        }
        
        // Vérifier que c'est bien un PDF
        const pdfHeader = new Uint8Array(apiResponse.data.slice(0, 4));
        const isPdf = pdfHeader[0] === 0x25 && pdfHeader[1] === 0x50 && pdfHeader[2] === 0x44 && pdfHeader[3] === 0x46;
        
        if (isPdf) {
          console.log('   ✅ PDF valide confirmé');
          successCount++;
        } else {
          console.log('   ⚠️ Le contenu ne semble pas être un PDF valide');
          failCount++;
        }
        
      } catch (apiError) {
        console.log(`   ❌ Erreur API: ${apiError.response?.status || apiError.message}`);
        
        if (apiError.response?.data) {
          try {
            const errorText = Buffer.from(apiError.response.data).toString();
            const errorJson = JSON.parse(errorText);
            console.log(`   📋 Détails: ${errorJson.error}`);
            if (errorJson.details) {
              console.log(`   📋 Plus d'infos: ${errorJson.details}`);
            }
          } catch (parseError) {
            console.log('   📋 Impossible de parser l\'erreur');
          }
        }
        
        failCount++;
      }
    }
    
    // 3. Résumé des tests
    console.log(`\n📊 Résultats des tests API:`);
    console.log(`   ✅ Succès: ${successCount}`);
    console.log(`   ❌ Échecs: ${failCount}`);
    
    const successRate = (successCount / (successCount + failCount)) * 100;
    console.log(`   📈 Taux de réussite: ${successRate.toFixed(1)}%`);
    
    // 4. Test de performance
    if (successCount > 0) {
      console.log('\n⚡ Test de performance...');
      
      const testFormation = formationsAvecBrochures[0];
      const testData = {
        formationId: testFormation.id,
        userData: {
          nom: 'Perf',
          prenom: 'Test',
          email: 'perf@test.com',
          telephone: '0123456789',
          type: 'particulier'
        }
      };
      
      const startTime = Date.now();
      try {
        await axios.post(`${frontendUrl}/api/download-brochure`, testData, {
          headers: { 'Content-Type': 'application/json' },
          responseType: 'arraybuffer',
          timeout: 15000
        });
        
        const duration = Date.now() - startTime;
        console.log(`   ⏱️ Temps de réponse: ${duration}ms`);
        
        if (duration < 3000) {
          console.log('   ✅ Performance excellente');
        } else if (duration < 8000) {
          console.log('   ⚠️ Performance acceptable');
        } else {
          console.log('   ❌ Performance lente');
        }
        
      } catch (perfError) {
        console.log('   ❌ Test de performance échoué');
      }
    }
    
    // 5. Recommandations
    console.log('\n💡 Recommandations:');
    
    if (successCount === 0) {
      console.log('❌ L\'API ne fonctionne pas - vérifier le déploiement');
      console.log('🔧 Actions suggérées:');
      console.log('   1. Vérifier que l\'API est déployée sur Vercel');
      console.log('   2. Vérifier les logs Vercel pour les erreurs');
      console.log('   3. Tester l\'accès direct à Strapi');
    } else if (successRate < 50) {
      console.log('⚠️ L\'API fonctionne partiellement');
      console.log('🔧 Certains PDFs sont inaccessibles depuis Railway');
    } else {
      console.log('✅ L\'API fonctionne correctement !');
      console.log('🎉 Les utilisateurs peuvent télécharger les brochures');
    }
    
    console.log('\n📋 Instructions pour test manuel:');
    console.log(`1. Aller sur: ${frontendUrl}/brochure`);
    console.log('2. Sélectionner une formation');
    console.log('3. Remplir le formulaire');
    console.log('4. Cliquer sur "Télécharger la brochure"');
    console.log('5. Le PDF devrait se télécharger automatiquement');
    
  } catch (error) {
    console.error('❌ Erreur générale:', error.message);
  }
}

testAPIBrochureDownload();
