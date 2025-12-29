const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';

// Test des APIs avec les noms corrects
async function testAPIsCorrects() {
  console.log('🔍 TEST DES APIS AVEC NOMS CORRECTS\n');
  console.log('==================================\n');

  // APIs avec les noms exacts des dossiers créés
  const apisToTest = [
    { name: 'Formations', endpoint: '/api/formations' },
    { name: 'Partners', endpoint: '/api/partners' },
    { name: 'Testimonials', endpoint: '/api/testimonials' },
    { name: 'Site Settings', endpoint: '/api/site-settings' },
    { name: 'Statistiques Site', endpoint: '/api/statistiques-site' },
    { name: 'Processus Admission', endpoint: '/api/processus-admissions' },
    { name: 'Valeurs École', endpoint: '/api/valeurs-ecole' },
    { name: 'VAE Formules', endpoint: '/api/vae-formules' },
    { name: 'Entreprise Services', endpoint: '/api/entreprise-services' },
    { name: 'Galeries', endpoint: '/api/galleries' },
    { name: 'FAQ', endpoint: '/api/faqs' },
    { name: 'SEO Settings', endpoint: '/api/seo-settings' },
    { name: 'Navigation Menus', endpoint: '/api/navigation-menus' },
    { name: 'Contact Infos', endpoint: '/api/contact-infos' }, // Corrigé !
    { name: 'Modalités', endpoint: '/api/modalites' }
  ];

  let fonctionnelles = 0;
  let permissionsManquantes = 0;
  let contentTypesManquants = 0;

  console.log('🧪 TEST DE CHAQUE API...\n');

  for (const api of apisToTest) {
    try {
      const response = await axios.get(`${STRAPI_URL}${api.endpoint}`);
      
      if (response.status === 200) {
        const count = response.data.data?.length || (response.data.data ? 1 : 0);
        console.log(`✅ ${api.name}: ${count} éléments`);
        fonctionnelles++;
      }
    } catch (error) {
      if (error.response?.status === 403) {
        console.log(`🔒 ${api.name}: Permissions manquantes (403)`);
        permissionsManquantes++;
      } else if (error.response?.status === 404) {
        console.log(`🔍 ${api.name}: Content type manquant (404)`);
        contentTypesManquants++;
      } else {
        console.log(`❌ ${api.name}: Erreur ${error.response?.status || error.code}`);
      }
    }
  }

  const total = apisToTest.length;
  const pourcentage = Math.round((fonctionnelles / total) * 100);

  console.log('\n📊 RÉSUMÉ FINAL\n');
  console.log('===============\n');
  console.log(`📈 PROGRESSION GLOBALE: ${pourcentage}% (${fonctionnelles}/${total})`);
  
  const progressBar = '█'.repeat(Math.floor(pourcentage / 2)) + '░'.repeat(50 - Math.floor(pourcentage / 2));
  console.log(`${progressBar} ${pourcentage}%\n`);

  console.log(`✅ Fonctionnelles: ${fonctionnelles}/${total}`);
  console.log(`🔒 Permissions manquantes: ${permissionsManquantes}/${total}`);
  console.log(`🔍 Content types manquants: ${contentTypesManquants}/${total}\n`);

  if (permissionsManquantes > 0) {
    console.log('🔧 ACTIONS REQUISES POUR LES PERMISSIONS:\n');
    console.log('1. Ouvrir http://localhost:1337/admin');
    console.log('2. Settings > Users & Permissions > Roles > Public');
    console.log('3. Activer "find" et "findOne" pour les content types avec erreur 403');
    console.log('4. Sauvegarder\n');
  }

  if (contentTypesManquants > 0) {
    console.log('🔧 ACTIONS REQUISES POUR LES CONTENT TYPES:\n');
    console.log('1. Vérifier dans Content-Type Builder');
    console.log('2. Créer manuellement les content types manquants');
    console.log('3. Configurer leurs permissions\n');
  }

  if (pourcentage === 100) {
    console.log('🎉 FÉLICITATIONS ! MIGRATION 100% RÉUSSIE !\n');
    console.log('🏆 TOUTES LES APIS SONT FONCTIONNELLES !');
    console.log('✅ Site entièrement administrable via Strapi');
    console.log('✅ Équipes autonomes sur le contenu');
    console.log('✅ Architecture parfaite et évolutive\n');
  } else {
    const restant = 100 - pourcentage;
    console.log(`🎯 OBJECTIF: +${restant}% pour atteindre 100%\n`);
  }

  return { fonctionnelles, permissionsManquantes, contentTypesManquants, pourcentage };
}

testAPIsCorrects().catch(console.error);