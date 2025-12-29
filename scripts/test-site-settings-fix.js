const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';

async function testSiteSettingsAPI() {
  console.log('🧪 Test de l\'API site-setting...');
  
  try {
    // Test de l'API site-setting (correct)
    console.log('\n1. Test API site-setting (correct):');
    const response1 = await axios.get(`${STRAPI_URL}/api/site-setting?populate=*`);
    console.log('✅ Status:', response1.status);
    console.log('📊 Données:', response1.data);
    
  } catch (error) {
    console.error('❌ Erreur API site-setting:', error.response?.status, error.response?.statusText);
  }
  
  try {
    // Test de l'ancienne API site-settings (devrait échouer)
    console.log('\n2. Test API site-settings (ancienne - devrait échouer):');
    const response2 = await axios.get(`${STRAPI_URL}/api/site-settings?populate=*`);
    console.log('⚠️ Status:', response2.status);
    
  } catch (error) {
    console.log('✅ Erreur attendue pour site-settings:', error.response?.status, error.response?.statusText);
  }
}

async function testFormationsAPI() {
  console.log('\n🧪 Test de l\'API formations...');
  
  try {
    const response = await axios.get(`${STRAPI_URL}/api/formations?populate=*`);
    console.log('✅ Formations API Status:', response.status);
    console.log('📊 Nombre de formations:', response.data.data?.length || 0);
    
    const response2 = await axios.get(`${STRAPI_URL}/api/formation-categories?populate=*`);
    console.log('✅ Categories API Status:', response2.status);
    console.log('📊 Nombre de catégories:', response2.data.data?.length || 0);
    
  } catch (error) {
    console.error('❌ Erreur API formations:', error.response?.status, error.response?.statusText);
  }
}

async function main() {
  console.log('🔧 Test de résolution du problème 404 site-settings');
  console.log('='.repeat(60));
  
  await testSiteSettingsAPI();
  await testFormationsAPI();
  
  console.log('\n✅ Tests terminés!');
  console.log('\n💡 Le problème 404 devrait être résolu:');
  console.log('   - L\'API site-setting fonctionne');
  console.log('   - L\'API site-settings n\'existe plus (normal)');
  console.log('   - Les APIs formations fonctionnent');
}

main().catch(console.error);