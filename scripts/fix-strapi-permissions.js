const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';

// Script pour diagnostiquer et résoudre les problèmes d'APIs Strapi
async function fixStrapiPermissions() {
  console.log('🔧 Diagnostic et résolution des APIs Strapi...\n');
  console.log('=================================================\n');

  // Test de connectivité de base
  console.log('🌐 Test de connectivité Strapi...');
  try {
    const response = await axios.get(`${STRAPI_URL}/api/formations`);
    console.log('✅ Strapi accessible');
  } catch (error) {
    console.log('❌ Strapi non accessible:', error.message);
    console.log('⚠️  Vérifiez que Strapi est démarré: npm run cms:dev');
    return;
  }

  // Test des APIs existantes qui fonctionnent
  const workingAPIs = [
    { name: 'Formations', endpoint: '/api/formations' },
    { name: 'Partners', endpoint: '/api/partners' },
    { name: 'Testimonials', endpoint: '/api/testimonials' }
  ];

  console.log('\n✅ APIs fonctionnelles:');
  for (const api of workingAPIs) {
    try {
      const response = await axios.get(`${STRAPI_URL}${api.endpoint}`);
      const count = response.data.data?.length || 0;
      console.log(`   ${api.name}: ${count} éléments`);
    } catch (error) {
      console.log(`   ${api.name}: Erreur ${error.response?.status || error.message}`);
    }
  }

  // Test des APIs avec erreur 403 (permissions)
  const permissionAPIs = [
    { name: 'Site Settings', endpoint: '/api/site-settings' },
    { name: 'Statistiques Site', endpoint: '/api/statistiques-site' },
    { name: 'Processus Admission', endpoint: '/api/processus-admissions' },
    { name: 'Valeurs École', endpoint: '/api/valeurs-ecole' },
    { name: 'VAE Formules', endpoint: '/api/vae-formules' },
    { name: 'Entreprise Services', endpoint: '/api/entreprise-services' }
  ];

  console.log('\n🔒 APIs avec problèmes de permissions (403):');
  let permissionIssues = 0;
  for (const api of permissionAPIs) {
    try {
      const response = await axios.get(`${STRAPI_URL}${api.endpoint}`);
      const count = response.data.data?.length || 0;
      console.log(`   ✅ ${api.name}: ${count} éléments`);
    } catch (error) {
      if (error.response?.status === 403) {
        console.log(`   🔒 ${api.name}: Permissions manquantes`);
        permissionIssues++;
      } else {
        console.log(`   ❌ ${api.name}: Erreur ${error.response?.status || error.message}`);
      }
    }
  }

  // Test des nouvelles APIs (erreur 404)
  const newAPIs = [
    { name: 'Galeries', endpoint: '/api/galleries' },
    { name: 'FAQ', endpoint: '/api/faqs' },
    { name: 'SEO Settings', endpoint: '/api/seo-settings' },
    { name: 'Navigation Menus', endpoint: '/api/navigation-menus' },
    { name: 'Contact Info', endpoint: '/api/contact-info' },
    { name: 'Modalités', endpoint: '/api/modalites' }
  ];

  console.log('\n🆕 Nouvelles APIs (potentiellement 404):');
  let notFoundIssues = 0;
  for (const api of newAPIs) {
    try {
      const response = await axios.get(`${STRAPI_URL}${api.endpoint}`);
      const count = response.data.data?.length || 0;
      console.log(`   ✅ ${api.name}: ${count} éléments`);
    } catch (error) {
      if (error.response?.status === 404) {
        console.log(`   🔍 ${api.name}: Content type non trouvé`);
        notFoundIssues++;
      } else {
        console.log(`   ❌ ${api.name}: Erreur ${error.response?.status || error.message}`);
      }
    }
  }

  // Résumé et solutions
  console.log('\n📊 DIAGNOSTIC:');
  console.log(`✅ APIs fonctionnelles: ${workingAPIs.length}`);
  console.log(`🔒 APIs avec permissions: ${permissionIssues}`);
  console.log(`🔍 APIs non trouvées: ${notFoundIssues}`);

  console.log('\n💡 SOLUTIONS:');
  
  if (permissionIssues > 0) {
    console.log('\n🔒 Pour résoudre les permissions (403):');
    console.log('1. Ouvrir l\'admin Strapi: http://localhost:1337/admin');
    console.log('2. Aller dans Settings > Users & Permissions Plugin > Roles');
    console.log('3. Cliquer sur "Public"');
    console.log('4. Activer "find" et "findOne" pour tous les content types');
    console.log('5. Sauvegarder');
  }

  if (notFoundIssues > 0) {
    console.log('\n🔍 Pour résoudre les APIs non trouvées (404):');
    console.log('1. Vérifier que les content types sont créés');
    console.log('2. Redémarrer Strapi si nécessaire');
    console.log('3. Vérifier les noms des endpoints dans l\'admin');
  }

  console.log('\n🚀 PROCHAINES ÉTAPES:');
  console.log('1. Configurer les permissions dans l\'admin Strapi');
  console.log('2. Relancer le test: node scripts/test-phase5-final.js');
  console.log('3. Importer les données manquantes');
  console.log('4. Continuer avec la migration des pages');

  return {
    working: workingAPIs.length,
    permissionIssues,
    notFoundIssues,
    total: workingAPIs.length + permissionAPIs.length + newAPIs.length
  };
}

fixStrapiPermissions().catch(console.error);