const fetch = require('node-fetch');

async function testAllBrochureSolutions() {
  console.log('🧪 Test de toutes les solutions de téléchargement de brochures...\n');

  const strapiUrl = 'https://cma-education-strapi-production.up.railway.app';
  const frontendUrl = 'http://localhost:3000'; // Changez si nécessaire
  
  try {
    // 1. Récupérer une formation avec brochure pour les tests
    console.log('📋 Récupération d\'une formation avec brochure...');
    const formationsResponse = await fetch(`${strapiUrl}/api/formations?populate=brochure&pagination[limit]=1`);
    
    if (!formationsResponse.ok) {
      throw new Error(`Erreur API formations: ${formationsResponse.status}`);
    }

    const formationsData = await formationsResponse.json();
    const formations = formationsData.data.filter(f => f.attributes.brochure?.data);
    
    if (formations.length === 0) {
      console.log('❌ Aucune formation avec brochure trouvée');
      return;
    }

    const testFormation = formations[0];
    const brochure = testFormation.attributes.brochure.data;
    
    console.log(`✅ Formation test: ${testFormation.attributes.title}`);
    console.log(`📄 Brochure: ${brochure.attributes.name}`);
    console.log(`🆔 Formation ID: ${testFormation.id}`);
    console.log(`🆔 Brochure ID: ${brochure.id}\n`);

    const testUserData = {
      nom: 'Test',
      prenom: 'User',
      email: 'test@example.com',
      telephone: '0123456789',
      type: 'Étudiant'
    };

    // 2. Test de l'API download-brochure (avec fallback PDF généré)
    console.log('🔄 Test API download-brochure...');
    try {
      const downloadResponse = await fetch(`${frontendUrl}/api/download-brochure`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          formationId: testFormation.id,
          userData: testUserData
        })
      });

      console.log(`   📊 Status: ${downloadResponse.status}`);
      
      if (downloadResponse.ok) {
        const contentType = downloadResponse.headers.get('content-type');
        const contentLength = downloadResponse.headers.get('content-length');
        const downloadMethod = downloadResponse.headers.get('x-download-method');
        
        console.log(`   ✅ Succès!`);
        console.log(`   📋 Content-Type: ${contentType}`);
        console.log(`   📏 Content-Length: ${contentLength} bytes`);
        console.log(`   🔧 Méthode: ${downloadMethod}`);
        
        // Vérifier que c'est bien un PDF
        const buffer = await downloadResponse.arrayBuffer();
        const pdfHeader = new Uint8Array(buffer.slice(0, 4));
        const isPdf = pdfHeader[0] === 0x25 && pdfHeader[1] === 0x50 && pdfHeader[2] === 0x44 && pdfHeader[3] === 0x46;
        console.log(`   📄 Est un PDF valide: ${isPdf ? 'Oui' : 'Non'}`);
      } else {
        const errorData = await downloadResponse.json();
        console.log(`   ❌ Erreur:`, errorData);
      }
    } catch (error) {
      console.log(`   ❌ Erreur download-brochure: ${error.message}`);
    }

    console.log('');

    // 3. Test de l'API proxy-brochure (GET)
    console.log('🔄 Test API proxy-brochure (GET)...');
    try {
      const proxyResponse = await fetch(`${frontendUrl}/api/proxy-brochure?id=${brochure.id}`);

      console.log(`   📊 Status: ${proxyResponse.status}`);
      
      if (proxyResponse.ok) {
        const contentType = proxyResponse.headers.get('content-type');
        const contentLength = proxyResponse.headers.get('content-length');
        const proxyMethod = proxyResponse.headers.get('x-proxy-method');
        
        console.log(`   ✅ Succès!`);
        console.log(`   📋 Content-Type: ${contentType}`);
        console.log(`   📏 Content-Length: ${contentLength} bytes`);
        console.log(`   🔧 Méthode proxy: ${proxyMethod}`);
        
        // Vérifier le contenu
        const buffer = await proxyResponse.arrayBuffer();
        console.log(`   📦 Taille réelle: ${buffer.byteLength} bytes`);
        
        if (contentType?.includes('pdf')) {
          const pdfHeader = new Uint8Array(buffer.slice(0, 4));
          const isPdf = pdfHeader[0] === 0x25 && pdfHeader[1] === 0x50 && pdfHeader[2] === 0x44 && pdfHeader[3] === 0x46;
          console.log(`   📄 Est un PDF valide: ${isPdf ? 'Oui' : 'Non'}`);
        }
      } else {
        const errorData = await proxyResponse.json();
        console.log(`   ❌ Erreur:`, errorData);
      }
    } catch (error) {
      console.log(`   ❌ Erreur proxy-brochure: ${error.message}`);
    }

    console.log('');

    // 4. Test de l'API proxy-brochure (POST)
    console.log('🔄 Test API proxy-brochure (POST)...');
    try {
      const proxyPostResponse = await fetch(`${frontendUrl}/api/proxy-brochure`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          formationId: testFormation.id
        }),
        redirect: 'manual' // Pour voir la redirection
      });

      console.log(`   📊 Status: ${proxyPostResponse.status}`);
      
      if (proxyPostResponse.status === 302 || proxyPostResponse.status === 307) {
        const location = proxyPostResponse.headers.get('location');
        console.log(`   ↗️ Redirection vers: ${location}`);
        
        // Suivre la redirection manuellement
        if (location) {
          const finalResponse = await fetch(location);
          console.log(`   📊 Status final: ${finalResponse.status}`);
          
          if (finalResponse.ok) {
            const contentLength = finalResponse.headers.get('content-length');
            console.log(`   ✅ Redirection réussie!`);
            console.log(`   📏 Content-Length: ${contentLength} bytes`);
          }
        }
      } else if (proxyPostResponse.ok) {
        console.log(`   ✅ Succès direct!`);
      } else {
        const errorData = await proxyPostResponse.json();
        console.log(`   ❌ Erreur:`, errorData);
      }
    } catch (error) {
      console.log(`   ❌ Erreur proxy-brochure POST: ${error.message}`);
    }

    console.log('');

    // 5. Test direct de l'API Strapi upload/files
    console.log('🔄 Test direct API Strapi upload/files...');
    try {
      const strapiFileResponse = await fetch(`${strapiUrl}/api/upload/files/${brochure.id}`);
      
      if (strapiFileResponse.ok) {
        const fileData = await strapiFileResponse.json();
        console.log(`   ✅ Métadonnées récupérées: ${fileData.name}`);
        console.log(`   📍 URL: ${fileData.url}`);
        console.log(`   📏 Taille: ${fileData.size} bytes`);
        console.log(`   📋 MIME: ${fileData.mime}`);
        
        // Essayer de récupérer le contenu
        const contentUrl = `${strapiUrl}${fileData.url}`;
        const contentResponse = await fetch(contentUrl, {
          method: 'HEAD'
        });
        
        console.log(`   🔄 Test contenu: ${contentResponse.status}`);
        console.log(`   📋 Content-Type: ${contentResponse.headers.get('content-type')}`);
      } else {
        console.log(`   ❌ Erreur métadonnées: ${strapiFileResponse.status}`);
      }
    } catch (error) {
      console.log(`   ❌ Erreur Strapi direct: ${error.message}`);
    }

    console.log('\n📊 RÉSUMÉ DES TESTS:');
    console.log('─'.repeat(50));
    console.log('1. API download-brochure: Génère un PDF de remplacement si nécessaire');
    console.log('2. API proxy-brochure (GET): Essaie de récupérer le fichier original');
    console.log('3. API proxy-brochure (POST): Redirection vers GET avec ID');
    console.log('4. API Strapi direct: Métadonnées disponibles, contenu problématique');
    
    console.log('\n💡 RECOMMANDATIONS:');
    console.log('- Utiliser download-brochure pour une solution robuste avec fallback');
    console.log('- Utiliser proxy-brochure si le fichier original est accessible');
    console.log('- Corriger la configuration Railway pour servir /uploads/');

  } catch (error) {
    console.error('❌ Erreur générale:', error.message);
  }
}

// Exécuter les tests
testAllBrochureSolutions();