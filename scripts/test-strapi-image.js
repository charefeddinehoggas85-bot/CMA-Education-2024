const http = require('http');

function testStrapiImage() {
  console.log('🖼️ Test de l\'image Strapi...\n');
  
  const imagePath = '/uploads/conducteur_travaux_reconversion_ae28e612e2.jpg';
  const fullURL = `http://localhost:1337${imagePath}`;
  
  console.log('URL complète à tester:', fullURL);
  
  const options = {
    hostname: 'localhost',
    port: 1337,
    path: imagePath,
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Content-Type: ${res.headers['content-type']}`);
    console.log(`Content-Length: ${res.headers['content-length']}`);
    
    if (res.statusCode === 200) {
      console.log('✅ Image accessible via Strapi');
    } else {
      console.log('❌ Image non accessible via Strapi');
      console.log('Headers:', res.headers);
    }
  });

  req.on('error', (e) => {
    console.error('❌ Erreur de connexion:', e.message);
  });

  req.end();
}

testStrapiImage();