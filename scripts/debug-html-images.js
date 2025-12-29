const http = require('http');

function debugHTMLImages() {
  console.log('🔍 Debug des images dans le HTML...\n');
  
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
        // Chercher toutes les balises img
        const imgRegex = /<img[^>]*>/g;
        const images = data.match(imgRegex) || [];
        
        console.log(`\n📸 Balises img trouvées: ${images.length}`);
        images.forEach((img, index) => {
          console.log(`[${index + 1}] ${img}`);
        });
        
        // Chercher spécifiquement dans la section hero
        const heroSectionRegex = /<section[^>]*pt-36[^>]*>(.*?)<\/section>/s;
        const heroMatch = data.match(heroSectionRegex);
        
        if (heroMatch) {
          console.log('\n🎯 Section Hero trouvée');
          const heroContent = heroMatch[1];
          const heroImages = heroContent.match(imgRegex) || [];
          console.log(`Images dans hero: ${heroImages.length}`);
          heroImages.forEach((img, index) => {
            console.log(`[${index + 1}] ${img}`);
          });
        } else {
          console.log('\n❌ Section Hero non trouvée');
        }
        
        // Chercher les erreurs d'objets
        const objectErrors = data.match(/\[object Object\]/g) || [];
        console.log(`\n🚫 Erreurs d'objet: ${objectErrors.length}`);
        
        // Chercher les URLs d'images spécifiques
        const strapiImages = data.match(/uploads\/[^"']*/g) || [];
        const staticImages = data.match(/images\/formations\/[^"']*/g) || [];
        
        console.log(`\n📁 Images Strapi: ${strapiImages.length}`);
        strapiImages.forEach(img => console.log(`   - ${img}`));
        
        console.log(`\n📁 Images statiques: ${staticImages.length}`);
        staticImages.forEach(img => console.log(`   - ${img}`));
      }
    });
  });

  req.on('error', (e) => {
    console.error(`❌ Erreur: ${e.message}`);
  });

  req.end();
}

debugHTMLImages();