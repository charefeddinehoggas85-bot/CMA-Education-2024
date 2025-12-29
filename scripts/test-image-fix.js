const http = require('http');

async function testImageFix() {
  console.log('🔧 Test du correctif d\'image...\n');
  
  // Test 1: Formation Strapi (conducteur-travaux-batiment)
  await testFormationImage('conducteur-travaux-batiment', 'Strapi');
  
  // Test 2: Formation statique (responsable-travaux-bim)
  await testFormationImage('responsable-travaux-bim', 'Static');
  
  console.log('\n✅ Tests terminés');
}

function testFormationImage(slug, expectedSource) {
  return new Promise((resolve) => {
    console.log(`📋 Test formation: ${slug} (${expectedSource})`);
    
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: `/formations/${slug}`,
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log(`   Status: ${res.statusCode} ${res.statusCode === 200 ? '✅' : '❌'}`);
        
        if (res.statusCode === 200) {
          // Chercher les images dans le HTML
          const imgRegex = /<img[^>]+src="([^"]*)"[^>]*>/g;
          const images = [];
          let match;
          
          while ((match = imgRegex.exec(data)) !== null) {
            images.push(match[1]);
          }
          
          console.log(`   Images trouvées: ${images.length}`);
          
          // Chercher l'image hero spécifiquement
          const heroImages = images.filter(img => 
            img.includes('uploads/') || 
            img.includes('formations/') || 
            img.includes('hero')
          );
          
          console.log(`   Images hero: ${heroImages.length}`);
          heroImages.forEach((img, index) => {
            console.log(`   [${index + 1}] ${img}`);
          });
          
          // Vérifier qu'il n'y a pas d'objets dans les URLs
          const hasObjectURL = data.includes('src="[object Object]"');
          console.log(`   URLs d'objet détectées: ${hasObjectURL ? '❌' : '✅'}`);
          
          // Vérifier la présence du debug info
          const hasDebugInfo = data.includes('Source: ' + expectedSource);
          console.log(`   Debug info correct: ${hasDebugInfo ? '✅' : '❌'}`);
        }
        
        console.log('');
        resolve();
      });
    });

    req.on('error', (e) => {
      console.log(`   ❌ Erreur: ${e.message}\n`);
      resolve();
    });

    req.end();
  });
}

testImageFix();