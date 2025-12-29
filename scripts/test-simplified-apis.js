const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';

async function testSimplifiedAPIs() {
  console.log('🧪 TEST DES APIS SIMPLIFIÉES\n');
  
  const apis = [
    '/api/formations', '/api/partners', '/api/testimonials',
    '/api/site-settings', '/api/statistiques-site', '/api/processus-admissions',
    '/api/valeurs-ecole', '/api/vae-formules', '/api/entreprise-services',
    '/api/galleries', '/api/faqs', '/api/seosettings',
    '/api/navigationmenus', '/api/contactinfos', '/api/modalites'
  ];

  let working = 0;
  
  for (const endpoint of apis) {
    try {
      const response = await axios.get(STRAPI_URL + endpoint);
      const count = response.data.data?.length || (response.data.data ? 1 : 0);
      console.log(`✅ ${endpoint}: ${count} éléments`);
      working++;
    } catch (error) {
      if (error.response?.status === 403) {
        console.log(`🔒 ${endpoint}: Permissions manquantes`);
      } else {
        console.log(`❌ ${endpoint}: Non disponible (${error.response?.status})`);
      }
    }
  }
  
  const percentage = Math.round((working / apis.length) * 100);
  console.log(`\n📊 RÉSULTAT: ${percentage}% (${working}/${apis.length})\n`);
  
  if (percentage === 100) {
    console.log('🎉 MIGRATION 100% RÉUSSIE !');
  } else {
    console.log('🔧 Configuration des permissions requise dans l\'admin');
  }
}

testSimplifiedAPIs().catch(console.error);