const http = require('http');

async function finalImageTest() {
  console.log('🎯 Test final des images...\n');
  
  // Test 1: Vérifier l'image Strapi
  console.log('1️⃣ Test image Strapi...');
  await testImageURL('http://localhost:1337/uploads/conducteur_travaux_reconversion_ae28e612e2.jpg');
  
  // Test 2: Vérifier l'image statique
  console.log('\n2️⃣ Test image statique...');
  await testImageURL('http://localhost:3000/images/formations/conducteur-travaux-reconversion.jpg');
  
  // Test 3: Vérifier l'image par défaut
  console.log('\n3️⃣ Test image par défaut...');
  await testImageURL('http://localhost:3000/images/formations/formations-hero.jpg');
  
  // Test 4: Vérifier la page avec image
  console.log('\n4️⃣ Test page formation...');
  await testFormationPage();
}

function testImageURL(url) {
  return new Promise((resolve) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname,
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      console.log(`   ${url}`);
      console.log(`   Status: ${res.statusCode} ${res.statusCode === 200 ? '✅' : '❌'}`);
      console.log(`   Type: ${res.headers['content-type'] || 'N/A'}`);
      console.log(`   Taille: ${res.headers['content-length'] || 'N/A'} bytes`);
      resolve();
    });

    req.on('error', (e) => {
      console.log(`   ${url}`);
      console.log(`   Erreur: ${e.message} ❌`);
      resolve();
    });

    req.setTimeout(5000, () => {
      console.log(`   ${url}`);
      console.log(`   Timeout ❌`);
      req.destroy();
      resolve();
    });

    req.end();
  });
}

function testFormationPage() {
  return new Promise((resolve) => {
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
          // Chercher l'image hero
          const heroImageMatch = data.match(/<img[^>]+src="([^"]*formations[^"]*)"[^>]*class="[^"]*absolute[^"]*"/);
          
          if (heroImageMatch) {
            console.log(`   ✅ Image hero trouvée: ${heroImageMatch[1]}`);
          } else {
            console.log(`   ❌ Image hero non trouvée`);
          }
          
          // Vérifier le titre
          const titleMatch = data.match(/<h1[^>]*>([^<]*Conducteur[^<]*)<\/h1>/);
          console.log(`   Titre: ${titleMatch ? '✅' : '❌'}`);
          
          // Vérifier l'état de chargement
          const isLoading = data.includes('Chargement de la formation');
          console.log(`   État: ${isLoading ? 'Chargement...' : 'Chargé'} ${isLoading ? '⚠️' : '✅'}`);
        }
        
        resolve();
      });
    });

    req.on('error', (e) => {
      console.log(`   Erreur page: ${e.message} ❌`);
      resolve();
    });

    req.end();
  });
}

finalImageTest();