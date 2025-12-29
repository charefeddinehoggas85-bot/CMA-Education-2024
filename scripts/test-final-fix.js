const http = require('http');

async function testFinalFix() {
  console.log('🎯 Test du correctif final...\n');
  
  // Test plusieurs fois pour vérifier la stabilité
  for (let i = 1; i <= 3; i++) {
    console.log(`📋 Test ${i}/3:`);
    await testFormationPage();
    
    if (i < 3) {
      console.log('   ⏳ Attente 2 secondes...\n');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  console.log('✅ Tests terminés');
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
          const heroImageMatch = data.match(/<img[^>]+src="([^"]*)"[^>]*class="[^"]*absolute[^"]*"/);
          
          if (heroImageMatch) {
            const imageSrc = heroImageMatch[1];
            console.log(`   ✅ Image hero: ${imageSrc}`);
            
            // Vérifier que ce n'est pas un objet
            const isValidImage = !imageSrc.includes('[object') && 
                               (imageSrc.includes('/images/') || imageSrc.includes('/uploads/'));
            console.log(`   Image valide: ${isValidImage ? '✅' : '❌'}`);
          } else {
            console.log(`   ❌ Image hero non trouvée`);
          }
          
          // Vérifier le titre
          const titleMatch = data.match(/<h1[^>]*>([^<]*Conducteur[^<]*)<\/h1>/);
          console.log(`   Titre: ${titleMatch ? '✅' : '❌'}`);
          
          // Vérifier l'état de chargement
          const isLoading = data.includes('Chargement de la formation');
          console.log(`   État: ${isLoading ? 'Chargement' : 'Chargé'} ${isLoading ? '⚠️' : '✅'}`);
          
          // Vérifier les sections
          const hasObjectifs = data.includes('Objectifs de la formation');
          const hasDebouches = data.includes('Débouchés professionnels');
          console.log(`   Sections: Obj:${hasObjectifs ? '✅' : '❌'} Déb:${hasDebouches ? '✅' : '❌'}`);
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

testFinalFix();