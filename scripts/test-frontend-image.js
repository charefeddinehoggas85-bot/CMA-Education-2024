const http = require('http');

function testFrontendImage() {
  console.log('🌐 Test de l\'image depuis le frontend...\n');
  
  // Test 1: Vérifier si l'image Strapi est accessible depuis le frontend
  testImageAccess('http://localhost:1337/uploads/conducteur_travaux_reconversion_ae28e612e2.jpg')
    .then(() => {
      // Test 2: Vérifier le HTML de la page
      return testPageHTML();
    })
    .then(() => {
      console.log('\n✅ Tests terminés');
    });
}

function testImageAccess(imageUrl) {
  return new Promise((resolve) => {
    console.log('1️⃣ Test d\'accès direct à l\'image...');
    console.log('URL:', imageUrl);
    
    const url = new URL(imageUrl);
    const options = {
      hostname: url.hostname,
      port: url.port || 1337,
      path: url.pathname,
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      console.log(`   Status: ${res.statusCode} ${res.statusCode === 200 ? '✅' : '❌'}`);
      console.log(`   Content-Type: ${res.headers['content-type']}`);
      console.log(`   Content-Length: ${res.headers['content-length']}`);
      resolve();
    });

    req.on('error', (e) => {
      console.log(`   ❌ Erreur: ${e.message}`);
      resolve();
    });

    req.end();
  });
}

function testPageHTML() {
  return new Promise((resolve) => {
    console.log('\n2️⃣ Analyse du HTML de la page...');
    
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/formations/conducteur-travaux-batiment',
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log(`   Status: ${res.statusCode}`);
        
        if (res.statusCode === 200) {
          // Chercher les images dans le HTML
          const imgRegex = /<img[^>]+src="([^"]*)"[^>]*>/g;
          const images = [];
          let match;
          
          while ((match = imgRegex.exec(data)) !== null) {
            images.push(match[1]);
          }
          
          console.log(`   Images trouvées dans le HTML: ${images.length}`);
          images.forEach((img, index) => {
            console.log(`   [${index + 1}] ${img}`);
          });
          
          // Chercher spécifiquement l'image de formation
          const hasFormationImage = data.includes('conducteur_travaux_reconversion');
          console.log(`   Image de formation présente: ${hasFormationImage ? '✅' : '❌'}`);
          
          // Chercher les styles CSS qui pourraient cacher l'image
          const hasOpacity = data.includes('opacity-30');
          console.log(`   Style opacity-30 présent: ${hasOpacity ? '✅' : '❌'}`);
          
          // Chercher les erreurs JavaScript
          const hasJSError = data.includes('console.error') || data.includes('onerror');
          console.log(`   Erreurs JS détectées: ${hasJSError ? '❌' : '✅'}`);
        }
        
        resolve();
      });
    });

    req.on('error', (e) => {
      console.log(`   ❌ Erreur: ${e.message}`);
      resolve();
    });

    req.end();
  });
}

testFrontendImage();