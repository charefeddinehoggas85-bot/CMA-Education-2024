const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';

// Configuration automatique des permissions
async function configurePermissionsAuto() {
  console.log('🔧 CONFIGURATION AUTOMATIQUE DES PERMISSIONS\n');
  console.log('============================================\n');

  try {
    // 1. Récupérer le token d'authentification (si nécessaire)
    console.log('🔍 Vérification des content types disponibles...\n');

    // 2. Lister tous les content types disponibles
    const contentTypesToCheck = [
      'galleries',
      'faqs', 
      'seo-settings',
      'navigation-menus',
      'contact-info',
      'modalites'
    ];

    console.log('📋 Content types à vérifier:\n');
    contentTypesToCheck.forEach((ct, index) => {
      console.log(`${index + 1}. ${ct}`);
    });

    console.log('\n🧪 Test de disponibilité...\n');

    let disponibles = [];
    let nonDisponibles = [];

    for (const contentType of contentTypesToCheck) {
      try {
        // Test simple de l'endpoint
        const response = await axios.get(`${STRAPI_URL}/api/${contentType}`);
        console.log(`✅ ${contentType}: Disponible (${response.status})`);
        disponibles.push(contentType);
      } catch (error) {
        if (error.response?.status === 403) {
          console.log(`🔒 ${contentType}: Permissions manquantes (403)`);
          disponibles.push(contentType); // Existe mais pas de permissions
        } else if (error.response?.status === 404) {
          console.log(`❌ ${contentType}: Non disponible (404)`);
          nonDisponibles.push(contentType);
        } else {
          console.log(`⚠️  ${contentType}: Erreur ${error.response?.status || error.code}`);
          nonDisponibles.push(contentType);
        }
      }
    }

    console.log('\n📊 RÉSUMÉ:\n');
    console.log(`✅ Disponibles: ${disponibles.length}/${contentTypesToCheck.length}`);
    console.log(`❌ Non disponibles: ${nonDisponibles.length}/${contentTypesToCheck.length}\n`);

    if (disponibles.length > 0) {
      console.log('✅ Content types disponibles:');
      disponibles.forEach(ct => console.log(`   - ${ct}`));
      console.log('');
    }

    if (nonDisponibles.length > 0) {
      console.log('❌ Content types non disponibles:');
      nonDisponibles.forEach(ct => console.log(`   - ${ct}`));
      console.log('\n💡 Ces content types doivent être créés manuellement dans l\'admin Strapi\n');
    }

    // 3. Instructions pour la configuration manuelle
    console.log('🎯 INSTRUCTIONS POUR CONFIGURATION MANUELLE:\n');
    console.log('1. Ouvrir http://localhost:1337/admin');
    console.log('2. Aller dans Content-Type Builder');
    console.log('3. Vérifier que tous les content types sont présents');
    console.log('4. Aller dans Settings > Users & Permissions > Roles > Public');
    console.log('5. Activer "find" et "findOne" pour chaque content type');
    console.log('6. Sauvegarder les permissions\n');

    // 4. Test final recommandé
    console.log('🧪 APRÈS CONFIGURATION:\n');
    console.log('Relancer le test: node scripts/diagnostic-apis-complet.js\n');

    return {
      disponibles: disponibles.length,
      nonDisponibles: nonDisponibles.length,
      total: contentTypesToCheck.length
    };

  } catch (error) {
    console.error('❌ ERREUR:', error.message);
    console.log('\n💡 VÉRIFICATIONS:');
    console.log('1. Strapi est-il démarré ?');
    console.log('2. L\'admin est-il accessible ?');
    console.log('3. Y a-t-il des erreurs dans les logs ?');
  }
}

// Fonction pour créer les content types manquants via l'admin
async function createMissingContentTypesViaAdmin() {
  console.log('\n🔧 CRÉATION VIA ADMIN STRAPI\n');
  console.log('============================\n');

  const contentTypesToCreate = [
    {
      name: 'galleries',
      displayName: 'Gallery',
      description: 'Galeries d\'images'
    },
    {
      name: 'faqs',
      displayName: 'FAQ', 
      description: 'Questions fréquemment posées'
    },
    {
      name: 'seo-settings',
      displayName: 'SEO Setting',
      description: 'Paramètres SEO par page'
    },
    {
      name: 'navigation-menus',
      displayName: 'Navigation Menu',
      description: 'Menus de navigation'
    },
    {
      name: 'contact-info',
      displayName: 'Contact Info',
      description: 'Informations de contact'
    },
    {
      name: 'modalites',
      displayName: 'Modalité',
      description: 'Modalités de formation'
    }
  ];

  console.log('📋 Content types à créer manuellement:\n');
  contentTypesToCreate.forEach((ct, index) => {
    console.log(`${index + 1}. ${ct.displayName} (${ct.name})`);
    console.log(`   Description: ${ct.description}`);
    console.log('');
  });

  console.log('🎯 ÉTAPES DANS L\'ADMIN:\n');
  console.log('1. Ouvrir http://localhost:1337/admin');
  console.log('2. Aller dans Content-Type Builder');
  console.log('3. Cliquer "Create new collection type"');
  console.log('4. Pour chaque content type ci-dessus:');
  console.log('   - Display name: [voir ci-dessus]');
  console.log('   - API ID: [voir ci-dessus]');
  console.log('   - Ajouter un champ "title" (Text, Required)');
  console.log('   - Ajouter un champ "description" (Rich text)');
  console.log('   - Sauvegarder');
  console.log('5. Configurer les permissions (Public role)');
  console.log('6. Tester avec: node scripts/diagnostic-apis-complet.js\n');
}

// Lancer la configuration
configurePermissionsAuto()
  .then(result => {
    if (result && result.nonDisponibles > 0) {
      createMissingContentTypesViaAdmin();
    }
  })
  .catch(console.error);