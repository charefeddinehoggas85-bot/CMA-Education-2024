const axios = require('axios');

async function testFormationSimple() {
  console.log('🧪 Test simple de la formation...');
  
  try {
    const response = await axios.get('http://localhost:3000/formations/conducteur-travaux-batiment', {
      timeout: 10000
    });
    
    const html = response.data;
    
    // Chercher le slug exact
    console.log('🔍 Recherche du slug...');
    const slugMatch = html.match(/Slug: <!-- -->([^<\n]+)/);
    if (slugMatch) {
      console.log('🏷️ Slug trouvé:', `"${slugMatch[1]}"`);
      console.log('📏 Longueur du slug:', slugMatch[1].length);
    } else {
      console.log('❌ Slug non trouvé');
    }
    
    // Vérifier si c'est en état de chargement
    if (html.includes('Chargement de la formation')) {
      console.log('⏳ Page en état de chargement');
      
      // Chercher des indices sur pourquoi ça charge
      if (html.includes('animate-spin')) {
        console.log('🔄 Spinner de chargement actif');
      }
    } else {
      console.log('✅ Page chargée complètement');
    }
    
    // Vérifier la présence du titre de formation
    if (html.includes('Conducteur de Travaux – Bâtiment')) {
      console.log('✅ Titre complet trouvé');
    } else if (html.includes('Conducteur de Travaux')) {
      console.log('⚠️ Titre partiel trouvé');
    } else {
      console.log('❌ Titre non trouvé');
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

testFormationSimple();