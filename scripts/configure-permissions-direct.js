const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';

// Configuration directe des permissions via l'API
async function configurePermissionsDirect() {
  console.log('🔧 CONFIGURATION DIRECTE DES PERMISSIONS\n');
  console.log('=======================================\n');

  // Test simple pour voir quels content types sont disponibles
  const contentTypesToTest = [
    'galleries',
    'faqs',
    'seo-settings', 
    'navigation-menus',
    'contact-infos',
    'modalites'
  ];

  console.log('🔍 Test de disponibilité des content types...\n');

  let disponibles = [];
  let nonDisponibles = [];

  for (const ct of contentTypesToTest) {
    try {
      // Test avec différentes variantes d'endpoints
      const endpoints = [
        `/api/${ct}`,
        `/api/${ct.replace(/-/g, '_')}`,
        `/api/${ct.replace(/s$/, '')}`
      ];

      let found = false;
      for (const endpoint of endpoints) {
        try {
          const response = await axios.get(`${STRAPI_URL}${endpoint}`);
          console.log(`✅ ${ct}: Disponible sur ${endpoint} (${response.status})`);
          disponibles.push({ name: ct, endpoint });
          found = true;
          break;
        } catch (error) {
          if (error.response?.status === 403) {
            console.log(`🔒 ${ct}: Permissions manquantes sur ${endpoint} (403)`);
            disponibles.push({ name: ct, endpoint, needsPermissions: true });
            found = true;
            break;
          }
          // Continue testing other endpoints
        }
      }

      if (!found) {
        console.log(`❌ ${ct}: Non disponible sur aucun endpoint`);
        nonDisponibles.push(ct);
      }

    } catch (error) {
      console.log(`❌ ${ct}: Erreur ${error.message}`);
      nonDisponibles.push(ct);
    }
  }

  console.log('\n📊 RÉSUMÉ:\n');
  console.log(`✅ Disponibles: ${disponibles.length}/${contentTypesToTest.length}`);
  console.log(`❌ Non disponibles: ${nonDisponibles.length}/${contentTypesToTest.length}\n`);

  if (disponibles.length > 0) {
    console.log('✅ Content types disponibles:\n');
    disponibles.forEach(ct => {
      const status = ct.needsPermissions ? '(permissions requises)' : '(fonctionnel)';
      console.log(`   - ${ct.name} → ${ct.endpoint} ${status}`);
    });
    console.log('');
  }

  if (nonDisponibles.length > 0) {
    console.log('❌ Content types non disponibles:\n');
    nonDisponibles.forEach(ct => {
      console.log(`   - ${ct}`);
    });
    console.log('\n💡 Ces content types doivent être créés manuellement dans l\'admin\n');
  }

  // Instructions pour la configuration manuelle
  console.log('🎯 CONFIGURATION MANUELLE REQUISE:\n');
  console.log('1. Ouvrir http://localhost:1337/admin');
  console.log('2. Vérifier dans Content-Type Builder que tous les content types sont présents');
  console.log('3. Aller dans Settings > Users & Permissions > Roles > Public');
  console.log('4. Pour chaque content type disponible:');
  console.log('   - Activer "find" (lecture de liste)');
  console.log('   - Activer "findOne" (lecture d\'un élément)');
  console.log('5. Sauvegarder les permissions');
  console.log('6. Tester: node scripts/test-apis-corriges.js\n');

  // Test final avec tous les endpoints
  console.log('🧪 TEST FINAL DE TOUS LES ENDPOINTS:\n');
  
  const allEndpoints = [
    '/api/formations',
    '/api/partners', 
    '/api/testimonials',
    '/api/site-settings',
    '/api/statistiques-site',
    '/api/processus-admissions',
    '/api/valeurs-ecole',
    '/api/vae-formules',
    '/api/entreprise-services',
    '/api/galleries',
    '/api/faqs',
    '/api/seo-settings',
    '/api/navigation-menus',
    '/api/contact-infos',
    '/api/modalites'
  ];

  let totalFonctionnelles = 0;

  for (const endpoint of allEndpoints) {
    try {
      const response = await axios.get(`${STRAPI_URL}${endpoint}`);
      const count = response.data.data?.length || (response.data.data ? 1 : 0);
      console.log(`✅ ${endpoint}: ${count} éléments`);
      totalFonctionnelles++;
    } catch (error) {
      if (error.response?.status === 403) {
        console.log(`🔒 ${endpoint}: Permissions manquantes`);
      } else if (error.response?.status === 404) {
        console.log(`❌ ${endpoint}: Non disponible`);
      } else {
        console.log(`⚠️  ${endpoint}: Erreur ${error.response?.status}`);
      }
    }
  }

  const pourcentageFinal = Math.round((totalFonctionnelles / allEndpoints.length) * 100);
  console.log(`\n🎯 RÉSULTAT FINAL: ${pourcentageFinal}% (${totalFonctionnelles}/${allEndpoints.length})\n`);

  if (pourcentageFinal === 100) {
    console.log('🎉 FÉLICITATIONS ! MIGRATION 100% RÉUSSIE !');
  } else {
    console.log(`⚡ Encore ${100 - pourcentageFinal}% à débloquer pour atteindre 100%`);
  }

  return { disponibles: disponibles.length, nonDisponibles: nonDisponibles.length, pourcentageFinal };
}

configurePermissionsDirect().catch(console.error);