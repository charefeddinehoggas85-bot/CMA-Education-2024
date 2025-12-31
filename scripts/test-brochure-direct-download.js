const axios = require('axios');

console.log('🧪 Test du téléchargement direct de brochures...\n');

async function testBrochureDirectDownload() {
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
    
    // 2. Tester l'accès direct aux PDFs
    console.log('\n🔍 Test d\'accès direct aux PDFs:');
    
    let successCount = 0;
    let failCount = 0;
    
    for (let i = 0; i < Math.min(5, formationsAvecBrochures.length); i++) {
      const formation = formationsAvecBrochures[i];
      const brochureData = formation.attributes.brochure.data.attributes;
      const pdfUrl = `${strapiUrl}${brochureData.url}`;
      
      console.log(`\n${i + 1}. ${formation.attributes.title}`);
      console.log(`   Fichier: ${brochureData.name}`);
      console.log(`   URL: ${pdfUrl}`);
      
      try {
        // Test avec différentes méthodes
        const methods = [
          { name: 'HEAD', method: 'head' },
          { name: 'GET', method: 'get' }
        ];
        
        let methodSuccess = false;
        
        for (const methodTest of methods) {
          try {
            const response = await axios[methodTest.method](pdfUrl, {
              timeout: 10000,
              responseType: methodTest.method === 'get' ? 'arraybuffer' : undefined,
              maxRedirects: 5,
              validateStatus: (status) => status < 400
            });
            
            console.log(`   ✅ ${methodTest.name} - Status: ${response.status}`);
            console.log(`   📄 Content-Type: ${response.headers['content-type']}`);
            
            if (methodTest.method === 'get') {
              console.log(`   📏 Taille: ${response.data.byteLength} bytes`);
              
              // Vérifier que c'est bien un PDF
              const pdfHeader = new Uint8Array(response.data.slice(0, 4));
              const isPdf = pdfHeader[0] === 0x25 && pdfHeader[1] === 0x50 && pdfHeader[2] === 0x44 && pdfHeader[3] === 0x46;
              
              if (isPdf) {
                console.log(`   ✅ PDF valide confirmé`);
                methodSuccess = true;
                break;
              } else {
                console.log(`   ⚠️ Le contenu ne semble pas être un PDF`);
              }
            } else {
              methodSuccess = true;
              break;
            }
            
          } catch (methodError) {
            console.log(`   ❌ ${methodTest.name} - ${methodError.response?.status || methodError.message}`);
          }
        }
        
        if (methodSuccess) {
          successCount++;
        } else {
          failCount++;
        }
        
      } catch (error) {
        console.log(`   ❌ Tous les tests échoués`);
        failCount++;
      }
    }
    
    console.log(`\n📊 Résultats des tests directs:`);
    console.log(`   ✅ Succès: ${successCount}`);
    console.log(`   ❌ Échecs: ${failCount}`);
    
    // 3. Test de la logique frontend simulée
    console.log('\n🔍 Simulation de la logique frontend...');
    
    const testFormation = formationsAvecBrochures[0];
    console.log(`\nTest avec: ${testFormation.attributes.title}`);
    
    try {
      // Simuler la récupération de formation individuelle
      const formationDetailResponse = await axios.get(`${strapiUrl}/api/formations/${testFormation.id}?populate=brochure`);
      const formationDetail = formationDetailResponse.data.data;
      
      if (formationDetail.attributes.brochure?.data?.attributes?.url) {
        const brochureUrl = `${strapiUrl}${formationDetail.attributes.brochure.data.attributes.url}`;
        
        console.log('📄 URL récupérée:', brochureUrl);
        
        // Test de téléchargement
        const downloadResponse = await axios.get(brochureUrl, {
          responseType: 'arraybuffer',
          timeout: 15000
        });
        
        console.log('✅ Téléchargement simulé réussi');
        console.log(`   Taille: ${downloadResponse.data.byteLength} bytes`);
        console.log(`   Content-Type: ${downloadResponse.headers['content-type']}`);
        
        // Vérifier le PDF
        const pdfHeader = new Uint8Array(downloadResponse.data.slice(0, 4));
        const isPdf = pdfHeader[0] === 0x25 && pdfHeader[1] === 0x50 && pdfHeader[2] === 0x44 && pdfHeader[3] === 0x46;
        
        if (isPdf) {
          console.log('✅ PDF valide - La logique frontend devrait fonctionner !');
        } else {
          console.log('⚠️ Contenu reçu n\'est pas un PDF valide');
        }
        
      } else {
        console.log('❌ Pas de brochure dans les détails de formation');
      }
      
    } catch (frontendError) {
      console.log(`❌ Simulation frontend échouée: ${frontendError.response?.status || frontendError.message}`);
    }
    
    // 4. Recommandations
    console.log('\n💡 Recommandations:');
    
    if (successCount > 0) {
      console.log('✅ Certains PDFs sont accessibles directement');
      console.log('📋 La solution côté client devrait fonctionner pour ces fichiers');
      console.log('🔧 Pour les fichiers inaccessibles, le fallback "ouvrir dans nouvel onglet" sera utilisé');
    } else {
      console.log('❌ Aucun PDF n\'est accessible directement');
      console.log('🔧 La solution utilisera uniquement le fallback "ouvrir dans nouvel onglet"');
    }
    
    console.log('\n📋 Instructions pour tester manuellement:');
    console.log('1. Aller sur: https://cma-education-2024.vercel.app/brochure');
    console.log('2. Sélectionner une formation');
    console.log('3. Remplir le formulaire');
    console.log('4. Cliquer sur "Télécharger la brochure"');
    console.log('5. Le PDF devrait se télécharger ou s\'ouvrir dans un nouvel onglet');
    
  } catch (error) {
    console.error('❌ Erreur générale:', error.message);
  }
}

testBrochureDirectDownload();
