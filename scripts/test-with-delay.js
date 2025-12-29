const http = require('http');

function testWithDelay() {
  console.log('🧪 Test avec délai...\n');
  
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/formations/conducteur-travaux-batiment',
    method: 'GET'
  };

  console.log('📡 Première requête immédiate...');
  
  const req1 = http.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      const hasLoading = data.includes('Chargement de la formation');
      const hasTitle = data.includes('Conducteur de Travaux');
      
      console.log(`Status: ${res.statusCode}`);
      console.log(`Loading: ${hasLoading ? '⚠️' : '✅'}`);
      console.log(`Title: ${hasTitle ? '✅' : '❌'}`);
      
      // Attendre 2 secondes puis refaire la requête
      setTimeout(() => {
        console.log('\n📡 Deuxième requête après 2 secondes...');
        
        const req2 = http.request(options, (res2) => {
          let data2 = '';
          
          res2.on('data', (chunk) => {
            data2 += chunk;
          });
          
          res2.on('end', () => {
            const hasLoading2 = data2.includes('Chargement de la formation');
            const hasTitle2 = data2.includes('Conducteur de Travaux');
            
            console.log(`Status: ${res2.statusCode}`);
            console.log(`Loading: ${hasLoading2 ? '⚠️' : '✅'}`);
            console.log(`Title: ${hasTitle2 ? '✅' : '❌'}`);
          });
        });
        
        req2.on('error', (e) => {
          console.error(`❌ Erreur req2: ${e.message}`);
        });
        
        req2.end();
      }, 2000);
    });
  });

  req1.on('error', (e) => {
    console.error(`❌ Erreur req1: ${e.message}`);
  });

  req1.end();
}

testWithDelay();