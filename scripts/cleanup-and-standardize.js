const axios = require('axios');

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || '34ebc27d0aae530b71f7c236385a2013ba8db694ccbdf80a49a5cc3e0499ae408caa45dddb48f2a9ed35fd17a8a9eedb71fbf587e0806ccc282a4c62f8aa575457bc480b312f9740d1f3e1651e196a507075ed08a858b8dda30c5c1ffc88b61352c9436b7fddeb70f6668b194166d1a18133990d6da183edb6a0f4f4694f716d';

const api = axios.create({
  baseURL: STRAPI_URL,
  headers: {
    'Authorization': `Bearer ${STRAPI_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

async function testAllAPIs() {
  console.log('🧪 Test de toutes les APIs Strapi...\n');
  
  const apis = [
    // Formations
    { name: 'Formations', endpoint: '/api/formations?populate=*' },
    { name: 'Formation Categories', endpoint: '/api/formation-categories?populate=*' },
    
    // Partenaires & Témoignages
    { name: 'Partners', endpoint: '/api/partners?populate=*' },
    { name: 'Testimonials', endpoint: '/api/testimonials?populate=*' },
    
    // VAE & Entreprises
    { name: 'VAE Formules', endpoint: '/api/vae-formules?populate=*' },
    { name: 'Entreprise Services', endpoint: '/api/entreprise-services?populate=*' },
    { name: 'Formation Thematiques', endpoint: '/api/formation-thematiques?populate=*' },
    
    // Site & Processus
    { name: 'Valeurs Ecole', endpoint: '/api/valeurs-ecole?populate=*' },
    { name: 'Statistiques Site', endpoint: '/api/statistiques-site?populate=*' },
    { name: 'Processus Admission', endpoint: '/api/processus-admissions?populate=*' },
    
    // Blog
    { name: 'Categories Blog', endpoint: '/api/categories-blog?populate=*' },
    { name: 'Articles Blog', endpoint: '/api/articles-blog?populate=*' },
    { name: 'Formateurs', endpoint: '/api/formateurs?populate=*' },
    
    // Système
    { name: 'Site Settings', endpoint: '/api/site-settings?populate=*' },
    { name: 'Pages', endpoint: '/api/pages?populate=*' },
    { name: 'Menu Items', endpoint: '/api/menu-items?populate=*' },
  ];

  let successCount = 0;
  let errorCount = 0;

  for (const apiTest of apis) {
    try {
      const response = await api.get(apiTest.endpoint);
      const count = Array.isArray(response.data.data) ? response.data.data.length : (response.data.data ? 1 : 0);
      console.log(`✅ ${apiTest.name}: ${count} éléments`);
      successCount++;
    } catch (error) {
      console.log(`❌ ${apiTest.name}: ${error.response?.status || 'Erreur'} - ${error.message}`);
      errorCount++;
    }
  }

  console.log(`\n📊 Résultats: ${successCount} APIs OK, ${errorCount} APIs en erreur`);
  
  if (errorCount === 0) {
    console.log('🎉 Toutes les APIs sont fonctionnelles !');
  } else {
    console.log('⚠️ Certaines APIs nécessitent une attention.');
  }
}

async function checkDataIntegrity() {
  console.log('\n🔍 Vérification de l\'intégrité des données...\n');
  
  try {
    // Vérifier les relations
    const formations = await api.get('/api/formations?populate=*');
    const categories = await api.get('/api/formation-categories?populate=*');
    
    console.log(`📚 Formations: ${formations.data.data.length}`);
    console.log(`📂 Catégories: ${categories.data.data.length}`);
    
    // Vérifier les articles blog et leurs catégories
    const articles = await api.get('/api/articles-blog?populate=*');
    const categoriesBlog = await api.get('/api/categories-blog?populate=*');
    
    console.log(`📝 Articles Blog: ${articles.data.data.length}`);
    console.log(`🏷️ Catégories Blog: ${categoriesBlog.data.data.length}`);
    
    // Vérifier les formateurs
    const formateurs = await api.get('/api/formateurs?populate=*');
    console.log(`👨‍🏫 Formateurs: ${formateurs.data.data.length}`);
    
    console.log('\n✅ Intégrité des données vérifiée');
    
  } catch (error) {
    console.error('❌ Erreur lors de la vérification:', error.message);
  }
}

async function main() {
  console.log('🚀 NETTOYAGE ET STANDARDISATION - PHASE 4A\n');
  
  if (!STRAPI_TOKEN) {
    console.error('❌ STRAPI_TOKEN non défini dans les variables d\'environnement');
    process.exit(1);
  }
  
  try {
    await testAllAPIs();
    await checkDataIntegrity();
    
    console.log('\n🎯 Phase 4A terminée avec succès !');
    console.log('📋 Prochaine étape: Phase 4B - Complétion des données');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
}

main();