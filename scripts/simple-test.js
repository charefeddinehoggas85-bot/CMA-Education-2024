const axios = require('axios');

async function simpleTest() {
  console.log('🧪 Test simple...');
  
  try {
    console.log('Tentative de connexion à http://localhost:3000...');
    const response = await axios.get('http://localhost:3000', {
      timeout: 15000
    });
    
    console.log('✅ Connexion réussie, status:', response.status);
    console.log('📄 Taille de la réponse:', response.data.length, 'caractères');
    
    if (response.data.includes('CMA')) {
      console.log('✅ Contenu CMA détecté');
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    console.log('Code d\'erreur:', error.code);
  }
}

simpleTest();