const http = require('http');

async function debugFormationImage() {
  console.log('🔍 Diagnostic des images de formation...\n');
  
  // 1. Vérifier les données Strapi
  await checkStrapiImageData();
  
  // 2. Vérifier les images statiques
  await checkStaticImages();
  
  // 3. Vérifier la logique de getImageURL
  await testImageURL();
}

function checkStrapiImageData() {
  return new Promise((resolve) => {
    console.log('1️⃣ Vérification des données d\'image Strapi...');
    
    const options = {
      hostname: 'localhost',
      port: 1337,
      path: '/api/formations?filters[slug][$eq]=conducteur-travaux-batiment&populate=*',
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          
          if (jsonData.data && jsonData.data[0]) {
            const formation = jsonData.data[0];
            const attributes = formation.attributes;
            
            console.log('   📋 Données image Strapi:');
            console.log('   - Image field exists:', !!attributes.image);
            console.log('   - Image data:', attributes.image);
            console.log('   - Image data structure:', typeof attributes.image);
            
            if (attributes.image && attributes.image.data) {
              console.log('   - Image URL:', attributes.image.data.attributes?.url);
              console.log('   - Image name:', attributes.image.data.attributes?.name);
            } else {
              console.log('   ❌ Pas de données d\'image dans Strapi');
            }
          }
        } catch (error) {
          console.log('   ❌ Erreur parsing JSON:', error.message);
        }
        resolve();
      });
    });

    req.on('error', (e) => {
      console.log('   ❌ Erreur Strapi:', e.message);
      resolve();
    });

    req.end();
  });
}

function checkStaticImages() {
  return new Promise((resolve) => {
    console.log('\n2️⃣ Vérification des images statiques...');
    
    // Test de l'image par défaut
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/images/formations/formations-hero.jpg',
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      console.log(`   - Image par défaut (/images/formations/formations-hero.jpg): ${res.statusCode === 200 ? '✅' : '❌'}`);
      
      // Test d'autres images possibles
      testImage('/images/formations/conducteur-travaux.jpg').then(() => {
        testImage('/images/formations/conducteur-travaux-batiment.jpg').then(() => {
          resolve();
        });
      });
    });

    req.on('error', (e) => {
      console.log('   ❌ Erreur image par défaut:', e.message);
      resolve();
    });

    req.end();
  });
}

function testImage(path) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      console.log(`   - ${path}: ${res.statusCode === 200 ? '✅' : '❌'}`);
      resolve();
    });

    req.on('error', (e) => {
      console.log(`   - ${path}: ❌`);
      resolve();
    });

    req.end();
  });
}

function testImageURL() {
  return new Promise((resolve) => {
    console.log('\n3️⃣ Test de la fonction getImageURL...');
    
    // Simuler différents cas
    const testCases = [
      { name: 'Strapi media null', media: null, fallback: '/test.jpg' },
      { name: 'Strapi media avec data', media: { data: { attributes: { url: '/uploads/test.jpg' } } }, fallback: '/fallback.jpg' },
      { name: 'Strapi media sans data', media: { url: '/direct.jpg' }, fallback: '/fallback.jpg' },
      { name: 'Pas de media, avec fallback', media: undefined, fallback: '/images/formations/conducteur-travaux.jpg' }
    ];
    
    testCases.forEach(testCase => {
      // Simuler la logique de getImageURL
      let result;
      if (testCase.media) {
        if (testCase.media.data && testCase.media.data.attributes && testCase.media.data.attributes.url) {
          const url = testCase.media.data.attributes.url;
          result = url.startsWith('http') ? url : `http://localhost:1337${url}`;
        } else if (testCase.media.url) {
          result = testCase.media.url.startsWith('http') ? testCase.media.url : `http://localhost:1337${testCase.media.url}`;
        } else {
          result = testCase.fallback || '/images/formations/formations-hero.jpg';
        }
      } else {
        result = testCase.fallback || '/images/formations/formations-hero.jpg';
      }
      
      console.log(`   - ${testCase.name}: ${result}`);
    });
    
    resolve();
  });
}

debugFormationImage();