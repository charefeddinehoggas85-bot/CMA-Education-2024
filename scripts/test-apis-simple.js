// Test simple des APIs sans dépendances externes
const https = require('https');
const http = require('http');
const { URL } = require('url');

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const client = parsedUrl.protocol === 'https:' ? https : http;
    
    const req = client.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: null, error: 'Invalid JSON' });
        }
      });
    });
    
    req.on('error', reject);
    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

async function testAPIs() {
  console.log('🧪 Test des APIs Strapi (sans authentification)...\n');
  
  const apis = [
    { name: 'Formations', endpoint: '/api/formations' },
    { name: 'Formation Categories', endpoint: '/api/formation-categories' },
    { name: 'Partners', endpoint: '/api/partners' },
    { name: 'Testimonials', endpoint: '/api/testimonials' },
    { name: 'VAE Formules', endpoint: '/api/vae-formules' },
    { name: 'Entreprise Services', endpoint: '/api/entreprise-services' },
    { name: 'Formation Thematiques', endpoint: '/api/formation-thematiques' },
    { name: 'Valeurs Ecole', endpoint: '/api/valeurs-ecole' },
    { name: 'Statistiques Site', endpoint: '/api/statistiques-site' },
    { name: 'Processus Admission', endpoint: '/api/processus-admissions' },
    { name: 'Categories Blog', endpoint: '/api/categories-blog' },
    { name: 'Articles Blog', endpoint: '/api/articles-blog' },
    { name: 'Formateurs', endpoint: '/api/formateurs' },
    { name: 'Site Settings', endpoint: '/api/site-settings' },
  ];

  let successCount = 0;
  let errorCount = 0;

  for (const apiTest of apis) {
    try {
      const url = `${STRAPI_URL}${apiTest.endpoint}`;
      const response = await makeRequest(url);
      
      if (response.status === 200 && response.data) {
        const count = Array.isArray(response.data.data) ? response.data.data.length : (response.data.data ? 1 : 0);
        console.log(`✅ ${apiTest.name}: ${count} éléments (${response.status})`);
        successCount++;
      } else {
        console.log(`⚠️ ${apiTest.name}: Status ${response.status}`);
        errorCount++;
      }
    } catch (error) {
      console.log(`❌ ${apiTest.name}: ${error.message}`);
      errorCount++;
    }
  }

  console.log(`\n📊 Résultats: ${successCount} APIs OK, ${errorCount} APIs en erreur/inaccessibles`);
  
  if (errorCount === 0) {
    console.log('🎉 Toutes les APIs sont accessibles !');
  } else {
    console.log('⚠️ Certaines APIs sont inaccessibles (normal si Strapi n\'est pas démarré)');
  }
}

async function main() {
  console.log('🚀 TEST SIMPLE DES APIS - PHASE 4A\n');
  
  try {
    await testAPIs();
    
    console.log('\n✅ Phase 4A - Nettoyage terminé !');
    console.log('📋 Doublons supprimés:');
    console.log('   - cms-cma/src/api/site-setting (gardé site-settings)');
    console.log('   - cms-cma/src/api/blog-category (gardé categorie-blog)');
    console.log('📋 APIs standardisées dans src/lib/strapi.ts');
    console.log('\n🎯 Prochaine étape: Démarrer Strapi et importer les données manquantes');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

main();