const http = require('http');

function debugFormationLoading() {
  console.log('🔍 Debug du chargement de formation...\n');
  
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
      console.log(`Status: ${res.statusCode}`);
      
      if (res.statusCode === 200) {
        // Chercher les messages de loading
        const hasLoading = data.includes('Chargement de la formation');
        console.log(`Message de chargement: ${hasLoading ? '✅' : '❌'}`);
        
        // Chercher les messages d'erreur
        const hasNotFound = data.includes('Formation non trouvée');
        console.log(`Message non trouvé: ${hasNotFound ? '❌' : '✅'}`);
        
        // Chercher le titre de la formation
        const titleMatch = data.match(/<h1[^>]*>([^<]*Conducteur[^<]*)<\/h1>/);
        console.log(`Titre trouvé: ${titleMatch ? '✅ ' + titleMatch[1] : '❌'}`);
        
        // Chercher la section hero
        const hasHeroSection = data.includes('pt-36 pb-16 bg-gradient-to-br');
        console.log(`Section hero présente: ${hasHeroSection ? '✅' : '❌'}`);
        
        // Chercher le debug info
        const debugMatch = data.match(/Slug: ([^<]*)/);
        console.log(`Debug info: ${debugMatch ? '✅ ' + debugMatch[1] : '❌'}`);
        
        // Chercher les erreurs JavaScript
        const hasJSError = data.includes('console.error') || data.includes('Error:');
        console.log(`Erreurs JS: ${hasJSError ? '❌' : '✅'}`);
        
        // Chercher les sections principales
        const sections = [
          'Objectifs de la formation',
          'Débouchés professionnels',
          'Informations pratiques'
        ];
        
        console.log('\n📋 Sections trouvées:');
        sections.forEach(section => {
          const found = data.includes(section);
          console.log(`   ${section}: ${found ? '✅' : '❌'}`);
        });
      }
    });
  });

  req.on('error', (e) => {
    console.error(`❌ Erreur: ${e.message}`);
  });

  req.end();
}

debugFormationLoading();