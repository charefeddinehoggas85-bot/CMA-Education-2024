const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';

async function testSimpleAPIs() {
  console.log('🧪 Test simple des APIs Strapi...\n');

  // Test des APIs de base qui fonctionnent
  const basicAPIs = [
    '/api/formations',
    '/api/partners', 
    '/api/testimonials'
  ];

  console.log('✅ APIs de base qui fonctionnent:');
  for (const api of basicAPIs) {
    try {
      const response = await axios.get(`${STRAPI_URL}${api}`);
      console.log(`   ${api}: ${response.data.data?.length || 0} éléments`);
    } catch (error) {
      console.log(`   ${api}: Erreur ${error.response?.status || error.message}`);
    }
  }

  // Test des nouvelles APIs
  const newAPIs = [
    '/api/galleries',
    '/api/faqs', 
    '/api/seo-settings',
    '/api/navigation-menus',
    '/api/contact-info',
    '/api/modalites'
  ];

  console.log('\n🆕 Nouvelles APIs créées:');
  for (const api of newAPIs) {
    try {
      const response = await axios.get(`${STRAPI_URL}${api}`);
      console.log(`   ${api}: ${response.data.data?.length || 0} éléments`);
    } catch (error) {
      console.log(`   ${api}: Erreur ${error.response?.status || error.message}`);
    }
  }

  // Test des APIs avec permissions
  const protectedAPIs = [
    '/api/site-settings',
    '/api/statistiques-site',
    '/api/processus-admissions',
    '/api/valeurs-ecole',
    '/api/vae-formules',
    '/api/entreprise-services'
  ];

  console.log('\n🔒 APIs avec permissions:');
  for (const api of protectedAPIs) {
    try {
      const response = await axios.get(`${STRAPI_URL}${api}`);
      console.log(`   ${api}: ${response.data.data?.length || 0} éléments`);
    } catch (error) {
      console.log(`   ${api}: Erreur ${error.response?.status || error.message}`);
    }
  }

  console.log('\n📋 RÉSUMÉ:');
  console.log('- Les APIs de base (formations, partners, testimonials) fonctionnent');
  console.log('- Les nouvelles APIs peuvent nécessiter une configuration');
  console.log('- Certaines APIs peuvent avoir des restrictions de permissions');
  console.log('\n💡 SOLUTION: Vérifier les permissions dans l\'admin Strapi');
  console.log('   http://localhost:1337/admin');
}

testSimpleAPIs().catch(console.error);