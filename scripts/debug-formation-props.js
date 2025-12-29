const http = require('http');

function debugFormationProps() {
  console.log('🔍 Debug des props de formation...\n');
  
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
          const strapiFormation = jsonData.data[0];
          
          // Simuler la transformation comme dans strapi.ts
          const transformed = { 
            id: strapiFormation.id, 
            ...strapiFormation.attributes 
          };
          
          // Ajouter imageData comme dans transformStrapiData
          if (strapiFormation.attributes?.image?.data) {
            transformed.imageData = strapiFormation.attributes.image;
          }
          
          console.log('📋 Formation transformée:');
          console.log('- id:', transformed.id);
          console.log('- title:', transformed.title);
          console.log('- image (attribut):', transformed.image);
          console.log('- imageData:', !!transformed.imageData);
          console.log('- imageData structure:', transformed.imageData);
          
          // Test de getImageURL avec ces données
          console.log('\n🔗 Test getImageURL:');
          
          // Simuler getStrapiMediaURL
          function getStrapiMediaURL(media) {
            if (!media) return null;
            
            if (media.data) {
              const url = media.data.attributes?.url;
              if (url) {
                return url.startsWith('http') ? url : `http://localhost:1337${url}`;
              }
              return null;
            }
            
            if (media.url) {
              return media.url.startsWith('http') ? media.url : `http://localhost:1337${media.url}`;
            }
            
            return null;
          }
          
          // Simuler getImageURL
          function getImageURL(strapiMedia, fallbackPath) {
            const strapiURL = getStrapiMediaURL(strapiMedia);
            if (strapiURL) return strapiURL;
            return fallbackPath || '/images/formations/formations-hero.jpg';
          }
          
          const imageURL = getImageURL(transformed.imageData, transformed.image);
          console.log('- URL finale:', imageURL);
          
          // Test de la condition d'affichage
          const shouldShowImage = !!(transformed.imageData || transformed.image);
          console.log('- Condition d\'affichage (imageData || image):', shouldShowImage);
          
        }
      } catch (error) {
        console.log('❌ Erreur:', error.message);
      }
    });
  });

  req.on('error', (e) => {
    console.error('❌ Erreur de connexion:', e.message);
  });

  req.end();
}

debugFormationProps();