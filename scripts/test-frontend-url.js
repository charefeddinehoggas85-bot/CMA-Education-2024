/**
 * Test de l'URL frontend
 */

const http = require('http');

function testFrontendURL(url) {
  return new Promise((resolve) => {
    const urlObj = new URL(url);
    
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname,
      method: 'GET',
      timeout: 10000
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`✅ Frontend accessible: ${res.statusCode}`);
        if (data.includes('Formation non trouvée')) {
          console.log('   ❌ Formation non trouvée dans le HTML');
        } else if (data.includes('Chargement de la formation')) {
          console.log('   ⏳ Page en cours de chargement');
        } else if (data.includes('Chargé(e) d\'Affaires')) {
          console.log('   ✅ Formation trouvée dans le HTML');
        }
        resolve(true);
      });
    });

    req.on('error', (error) => {
      console.log(`❌ Erreur frontend: ${error.message}`);
      resolve(false);
    });

    req.on('timeout', () => {
      console.log(`⏱️ Timeout frontend`);
      req.destroy();
      resolve(false);
    });

    req.end();
  });
}

async function main() {
  console.log('🌐 Test des URLs frontend\n');
  
  const urls = [
    'http://localhost:3001',
    'http://localhost:3001/formations',
    'http://localhost:3001/formations/charge-affaires-batiment'
  ];
  
  for (const url of urls) {
    console.log(`🔍 Test: ${url}`);
    await testFrontendURL(url);
    console.log('');
  }
  
  console.log('📝 Ouvrez ces URLs dans votre navigateur pour voir les logs:');
  console.log('   http://localhost:3001/formations/charge-affaires-batiment');
  console.log('   Ouvrez la console (F12) pour voir les logs de debug');
}

main().catch(console.error);