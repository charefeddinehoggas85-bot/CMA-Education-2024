const fetch = require('node-fetch');

async function testRealPDFDownload() {
  console.log('🔍 Test de téléchargement des vrais PDFs depuis Strapi...\n');

  const strapiUrl = 'https://cma-education-strapi-production.up.railway.app';
  
  try {
    // 1. Récupérer les formations avec brochures
    console.log('📋 Récupération des formations avec brochures...');
    const formationsResponse = await fetch(`${strapiUrl}/api/formations?populate=brochure&pagination[limit]=100`);
    
    if (!formationsResponse.ok) {
      throw new Error(`Erreur API formations: ${formationsResponse.status}`);
    }

    const formationsData = await formationsResponse.json();
    const formations = formationsData.data;
    
    console.log(`✅ ${formations.length} formations trouvées\n`);

    // 2. Filtrer les formations avec brochures
    const formationsWithBrochures = formations.filter(f => 
      f.attributes.brochure?.data?.attributes?.url
    );

    console.log(`📄 ${formationsWithBrochures.length} formations avec brochures:\n`);

    // 3. Tester chaque brochure
    for (const formation of formationsWithBrochures.slice(0, 5)) { // Tester les 5 premières
      const brochure = formation.attributes.brochure.data.attributes;
      const brochureId = formation.attributes.brochure.data.id;
      
      console.log(`\n🔍 Test formation: ${formation.attributes.title}`);
      console.log(`   📄 Brochure: ${brochure.name}`);
      console.log(`   🆔 ID: ${brochureId}`);
      console.log(`   📍 URL: ${brochure.url}`);
      console.log(`   📏 Taille: ${brochure.size} bytes`);

      // Test 1: URL directe
      try {
        const directUrl = `${strapiUrl}${brochure.url}`;
        console.log(`   🔄 Test URL directe: ${directUrl}`);
        
        const response = await fetch(directUrl, {
          method: 'HEAD', // Juste les headers pour tester
          headers: {
            'Accept': 'application/pdf',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });

        console.log(`   📊 Status: ${response.status}`);
        console.log(`   📋 Content-Type: ${response.headers.get('content-type')}`);
        console.log(`   📏 Content-Length: ${response.headers.get('content-length')}`);
        
        if (response.ok) {
          console.log(`   ✅ URL directe accessible`);
        } else {
          console.log(`   ❌ URL directe inaccessible: ${response.status}`);
        }
      } catch (error) {
        console.log(`   ❌ Erreur URL directe: ${error.message}`);
      }

      // Test 2: API upload/files
      try {
        console.log(`   🔄 Test API upload/files/${brochureId}`);
        const apiResponse = await fetch(`${strapiUrl}/api/upload/files/${brochureId}`);
        
        if (apiResponse.ok) {
          const fileData = await apiResponse.json();
          console.log(`   ✅ API upload/files accessible`);
          console.log(`   📋 Nom: ${fileData.name}`);
          console.log(`   📍 URL: ${fileData.url}`);
        } else {
          console.log(`   ❌ API upload/files inaccessible: ${apiResponse.status}`);
        }
      } catch (error) {
        console.log(`   ❌ Erreur API upload/files: ${error.message}`);
      }

      // Test 3: Notre nouvelle API
      try {
        console.log(`   🔄 Test notre API download-brochure`);
        const apiUrl = 'http://localhost:3000/api/download-brochure';
        
        const testResponse = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            formationId: formation.id,
            userData: {
              nom: 'Test',
              prenom: 'User',
              email: 'test@example.com'
            }
          })
        });

        console.log(`   📊 Notre API Status: ${testResponse.status}`);
        
        if (testResponse.ok) {
          const contentType = testResponse.headers.get('content-type');
          const contentLength = testResponse.headers.get('content-length');
          console.log(`   ✅ Notre API fonctionne`);
          console.log(`   📋 Content-Type: ${contentType}`);
          console.log(`   📏 Content-Length: ${contentLength}`);
        } else {
          const errorData = await testResponse.json();
          console.log(`   ❌ Notre API erreur:`, errorData);
        }
      } catch (error) {
        console.log(`   ❌ Erreur notre API: ${error.message}`);
      }

      console.log(`   ${'─'.repeat(50)}`);
    }

    // 4. Test de diagnostic Railway uploads
    console.log(`\n🔍 Diagnostic configuration Railway uploads...\n`);
    
    try {
      // Tester l'endpoint uploads général
      const uploadsResponse = await fetch(`${strapiUrl}/uploads/`, {
        method: 'HEAD'
      });
      console.log(`📁 Endpoint /uploads/ status: ${uploadsResponse.status}`);
      
      // Tester l'API upload/files
      const uploadApiResponse = await fetch(`${strapiUrl}/api/upload/files?pagination[limit]=5`);
      if (uploadApiResponse.ok) {
        const uploadData = await uploadApiResponse.json();
        console.log(`📋 API upload/files: ${uploadData.length} fichiers trouvés`);
        
        if (uploadData.length > 0) {
          const firstFile = uploadData[0];
          console.log(`   Premier fichier: ${firstFile.name}`);
          console.log(`   URL: ${firstFile.url}`);
          console.log(`   Taille: ${firstFile.size} bytes`);
        }
      } else {
        console.log(`❌ API upload/files inaccessible: ${uploadApiResponse.status}`);
      }
    } catch (error) {
      console.log(`❌ Erreur diagnostic uploads: ${error.message}`);
    }

    console.log(`\n✅ Test terminé`);

  } catch (error) {
    console.error('❌ Erreur générale:', error.message);
  }
}

// Exécuter le test
testRealPDFDownload();