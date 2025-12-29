const axios = require('axios');

async function testImageFix() {
  console.log('🧪 Test de la correction des images...');
  
  try {
    // Test de la page formation
    console.log('📋 Test de la page formation conducteur-travaux-batiment...');
    const response = await axios.get('http://localhost:3001/formations/conducteur-travaux-batiment', {
      timeout: 10000
    });
    
    if (response.status === 200) {
      console.log('✅ Page chargée avec succès');
      
      // Vérifier que la page contient les éléments attendus
      const html = response.data;
      
      // Vérifier le titre
      if (html.includes('Conducteur de Travaux')) {
        console.log('✅ Titre de formation trouvé');
      } else {
        console.log('❌ Titre de formation manquant');
      }
      
      // Vérifier qu'il n'y a pas d'objets dans les URLs d'images
      if (html.includes('[object Object]')) {
        console.log('❌ Objets détectés dans le HTML - problème non résolu');
      } else {
        console.log('✅ Aucun objet détecté dans le HTML');
      }
      
      // Vérifier la présence d'images valides
      const imageMatches = html.match(/src="([^"]*\.(jpg|jpeg|png|svg|webp))"/gi);
      if (imageMatches && imageMatches.length > 0) {
        console.log('✅ Images valides trouvées:', imageMatches.length);
        imageMatches.slice(0, 3).forEach(match => {
          console.log('  -', match);
        });
      } else {
        console.log('⚠️ Aucune image valide trouvée');
      }
      
    } else {
      console.log('❌ Erreur HTTP:', response.status);
    }
    
  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Assurez-vous que le serveur Next.js fonctionne sur le port 3001');
    }
  }
}

testImageFix();