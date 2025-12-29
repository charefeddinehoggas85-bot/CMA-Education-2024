const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';

// Diagnostic complet des APIs avec analyse détaillée
async function diagnosticAPIsComplet() {
  console.log('🔍 DIAGNOSTIC COMPLET DES APIS STRAPI\n');
  console.log('=====================================\n');

  // Liste complète des 15 APIs attendues
  const apisAttendues = [
    { name: 'Formations', endpoint: '/api/formations', status: 'unknown' },
    { name: 'Partners', endpoint: '/api/partners', status: 'unknown' },
    { name: 'Testimonials', endpoint: '/api/testimonials', status: 'unknown' },
    { name: 'Site Settings', endpoint: '/api/site-settings', status: 'unknown' },
    { name: 'Statistiques Site', endpoint: '/api/statistiques-site', status: 'unknown' },
    { name: 'Processus Admission', endpoint: '/api/processus-admissions', status: 'unknown' },
    { name: 'Valeurs École', endpoint: '/api/valeurs-ecole', status: 'unknown' },
    { name: 'VAE Formules', endpoint: '/api/vae-formules', status: 'unknown' },
    { name: 'Entreprise Services', endpoint: '/api/entreprise-services', status: 'unknown' },
    { name: 'Galeries', endpoint: '/api/galleries', status: 'unknown' },
    { name: 'FAQ', endpoint: '/api/faqs', status: 'unknown' },
    { name: 'SEO Settings', endpoint: '/api/seo-settings', status: 'unknown' },
    { name: 'Navigation Menus', endpoint: '/api/navigation-menus', status: 'unknown' },
    { name: 'Contact Info', endpoint: '/api/contact-info', status: 'unknown' },
    { name: 'Modalités', endpoint: '/api/modalites', status: 'unknown' }
  ];

  let fonctionnelles = 0;
  let permissionsManquantes = 0;
  let contentTypesManquants = 0;
  let autresErreurs = 0;

  console.log('🧪 TEST DE CHAQUE API...\n');

  for (const api of apisAttendues) {
    try {
      const response = await axios.get(`${STRAPI_URL}${api.endpoint}`);
      
      if (response.status === 200) {
        const count = response.data.data?.length || (response.data.data ? 1 : 0);
        console.log(`✅ ${api.name}: ${count} éléments`);
        api.status = 'fonctionnelle';
        fonctionnelles++;
      }
    } catch (error) {
      if (error.response?.status === 403) {
        console.log(`🔒 ${api.name}: Permissions manquantes (403)`);
        api.status = 'permissions';
        permissionsManquantes++;
      } else if (error.response?.status === 404) {
        console.log(`🔍 ${api.name}: Content type manquant (404)`);
        api.status = 'manquant';
        contentTypesManquants++;
      } else if (error.code === 'ECONNREFUSED') {
        console.log(`❌ ${api.name}: Strapi non accessible`);
        api.status = 'connexion';
        autresErreurs++;
      } else {
        console.log(`❌ ${api.name}: Erreur ${error.response?.status || error.code}`);
        api.status = 'erreur';
        autresErreurs++;
      }
    }
  }

  // Résumé détaillé
  console.log('\n📊 RÉSUMÉ DÉTAILLÉ\n');
  console.log('==================\n');

  const total = apisAttendues.length;
  const pourcentage = Math.round((fonctionnelles / total) * 100);

  console.log(`📈 PROGRESSION GLOBALE: ${pourcentage}% (${fonctionnelles}/${total})`);
  
  const progressBar = '█'.repeat(Math.floor(pourcentage / 2)) + '░'.repeat(50 - Math.floor(pourcentage / 2));
  console.log(`${progressBar} ${pourcentage}%\n`);

  // Détail par catégorie
  console.log('📋 RÉPARTITION PAR STATUT:\n');
  console.log(`✅ Fonctionnelles: ${fonctionnelles}/${total}`);
  console.log(`🔒 Permissions manquantes: ${permissionsManquantes}/${total}`);
  console.log(`🔍 Content types manquants: ${contentTypesManquants}/${total}`);
  console.log(`❌ Autres erreurs: ${autresErreurs}/${total}\n`);

  // APIs fonctionnelles
  if (fonctionnelles > 0) {
    console.log('✅ APIS FONCTIONNELLES:\n');
    apisAttendues.filter(api => api.status === 'fonctionnelle').forEach(api => {
      console.log(`   - ${api.name} (${api.endpoint})`);
    });
    console.log('');
  }

  // APIs avec permissions manquantes
  if (permissionsManquantes > 0) {
    console.log('🔒 APIS AVEC PERMISSIONS MANQUANTES:\n');
    apisAttendues.filter(api => api.status === 'permissions').forEach(api => {
      console.log(`   - ${api.name} (${api.endpoint})`);
    });
    console.log('\n💡 SOLUTION: Configurer les permissions dans l\'admin Strapi');
    console.log('   1. Ouvrir http://localhost:1337/admin');
    console.log('   2. Settings > Users & Permissions > Roles > Public');
    console.log('   3. Activer "find" et "findOne" pour chaque content type\n');
  }

  // Content types manquants
  if (contentTypesManquants > 0) {
    console.log('🔍 APIS AVEC CONTENT TYPES MANQUANTS:\n');
    apisAttendues.filter(api => api.status === 'manquant').forEach(api => {
      console.log(`   - ${api.name} (${api.endpoint})`);
    });
    console.log('\n💡 SOLUTION: Créer les content types manquants');
    console.log('   → Exécuter: node scripts/create-exact-missing-apis.js');
    console.log('   → Redémarrer Strapi après création\n');
  }

  // Autres erreurs
  if (autresErreurs > 0) {
    console.log('❌ APIS AVEC AUTRES ERREURS:\n');
    apisAttendues.filter(api => api.status === 'erreur' || api.status === 'connexion').forEach(api => {
      console.log(`   - ${api.name} (${api.endpoint})`);
    });
    console.log('\n💡 SOLUTION: Vérifier que Strapi fonctionne correctement\n');
  }

  // Plan d'action
  console.log('🎯 PLAN D\'ACTION POUR ATTEINDRE 100%\n');
  console.log('====================================\n');

  if (permissionsManquantes > 0) {
    console.log(`🔧 ÉTAPE 1: Configurer ${permissionsManquantes} permissions`);
    console.log('   → Gain attendu: +' + Math.round((permissionsManquantes / total) * 100) + '%');
    console.log('   → Temps estimé: 5-10 minutes\n');
  }

  if (contentTypesManquants > 0) {
    console.log(`🔧 ÉTAPE 2: Créer ${contentTypesManquants} content types`);
    console.log('   → Gain attendu: +' + Math.round((contentTypesManquants / total) * 100) + '%');
    console.log('   → Temps estimé: 5 minutes + redémarrage\n');
  }

  const potentielFinal = fonctionnelles + permissionsManquantes + contentTypesManquants;
  const pourcentageFinal = Math.round((potentielFinal / total) * 100);

  console.log(`🎉 RÉSULTAT FINAL ATTENDU: ${pourcentageFinal}% (${potentielFinal}/${total})`);
  
  if (pourcentageFinal === 100) {
    console.log('🏆 OBJECTIF 100% ATTEIGNABLE !');
  } else {
    console.log('⚠️  Objectif 100% nécessite des actions supplémentaires');
  }

  console.log('\n🚀 PROCHAINE ACTION RECOMMANDÉE:\n');
  
  if (permissionsManquantes > 0) {
    console.log('1. Configurer les permissions Strapi (priorité haute)');
    console.log('2. Tester à nouveau: node scripts/diagnostic-apis-complet.js');
  } else if (contentTypesManquants > 0) {
    console.log('1. Créer les content types manquants');
    console.log('2. Redémarrer Strapi');
    console.log('3. Configurer les permissions');
  } else {
    console.log('1. Vérifier la configuration Strapi');
    console.log('2. Analyser les logs d\'erreur');
  }

  return {
    total,
    fonctionnelles,
    permissionsManquantes,
    contentTypesManquants,
    autresErreurs,
    pourcentage,
    pourcentageFinal
  };
}

// Lancer le diagnostic
diagnosticAPIsComplet().catch(error => {
  console.error('\n❌ ERREUR DIAGNOSTIC:', error.message);
  console.log('\n💡 VÉRIFICATIONS:');
  console.log('1. Strapi est-il démarré ? (http://localhost:1337)');
  console.log('2. Le port 1337 est-il accessible ?');
  console.log('3. Y a-t-il des erreurs dans les logs Strapi ?');
});