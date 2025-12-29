const http = require('http');

async function debugFormationData() {
  return new Promise((resolve, reject) => {
    console.log('🔍 Testing Strapi formation API...');
    
    const options = {
      hostname: 'localhost',
      port: 1337,
      path: '/api/formations?filters[slug][$eq]=conducteur-travaux-batiment&populate=*',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          if (res.statusCode !== 200) {
            console.log('❌ Strapi API error:', res.statusCode, res.statusMessage);
            return resolve();
          }
          
          const jsonData = JSON.parse(data);
          console.log('📋 Raw Strapi response structure:');
          console.log('- Data array length:', jsonData.data?.length || 0);
          
          if (jsonData.data && jsonData.data[0]) {
            const formation = jsonData.data[0];
            console.log('\n🎯 Formation attributes:');
            console.log('- ID:', formation.id);
            console.log('- Title:', formation.attributes?.title);
            console.log('- Objectifs type:', typeof formation.attributes?.objectifs);
            console.log('- Objectifs value:', formation.attributes?.objectifs);
            console.log('- Débouchés type:', typeof formation.attributes?.debouches);
            console.log('- Débouchés value:', formation.attributes?.debouches);
            console.log('- Prérequis type:', typeof formation.attributes?.prerequis);
            console.log('- Prérequis value:', formation.attributes?.prerequis);
            
            // Check if arrays contain objects
            if (formation.attributes?.objectifs && Array.isArray(formation.attributes.objectifs)) {
              console.log('\n📝 Objectifs analysis:');
              formation.attributes.objectifs.forEach((obj, i) => {
                console.log(`  [${i}] Type: ${typeof obj}, Value:`, obj);
              });
            }
            
            if (formation.attributes?.debouches && Array.isArray(formation.attributes.debouches)) {
              console.log('\n💼 Débouchés analysis:');
              formation.attributes.debouches.forEach((deb, i) => {
                console.log(`  [${i}] Type: ${typeof deb}, Value:`, deb);
              });
            }
          } else {
            console.log('❌ No formation found');
          }
          
          resolve();
        } catch (error) {
          console.error('❌ JSON Parse Error:', error.message);
          resolve();
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ Request Error:', error.message);
      resolve();
    });

    req.end();
  });
}

debugFormationData();