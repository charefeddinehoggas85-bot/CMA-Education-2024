const http = require('http');

async function checkHeaderContentTypes() {
  console.log('🔍 Vérification des content types pour le header...\n');
  
  const contentTypes = [
    'site-settings',
    'main-navigation', 
    'formations',
    'formation-categories'
  ];
  
  for (const contentType of contentTypes) {
    await testContentType(contentType);
  }
}

function testContentType(contentType) {
  return new Promise((resolve) => {
    console.log(`📋 Test: ${contentType}`);
    
    const options = {
      hostname: 'localhost',
      port: 1337,
      path: `/api/${contentType}?populate=*`,
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          if (res.statusCode === 200) {
            const jsonData = JSON.parse(data);
            const count = Array.isArray(jsonData.data) ? jsonData.data.length : (jsonData.data ? 1 : 0);
            console.log(`   ✅ ${contentType}: ${count} entrée(s)`);
            
            if (count > 0) {
              const firstItem = Array.isArray(jsonData.data) ? jsonData.data[0] : jsonData.data;
              const attributes = firstItem?.attributes || {};
              const fields = Object.keys(attributes);
              console.log(`   📝 Champs: ${fields.slice(0, 5).join(', ')}${fields.length > 5 ? '...' : ''}`);
            }
          } else {
            console.log(`   ❌ ${contentType}: ${res.statusCode} ${res.statusMessage}`);
          }
        } catch (error) {
          console.log(`   ❌ ${contentType}: Erreur parsing`);
        }
        console.log('');
        resolve();
      });
    });

    req.on('error', (e) => {
      console.log(`   ❌ ${contentType}: ${e.message}\n`);
      resolve();
    });

    req.end();
  });
}

checkHeaderContentTypes();