const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';

// Créer les content types via l'API admin de Strapi
async function createContentTypesViaAPI() {
  console.log('🚀 CRÉATION AUTOMATIQUE DES CONTENT TYPES VIA API\n');
  console.log('===============================================\n');

  // Content types à créer
  const contentTypes = [
    {
      uid: 'api::gallery.gallery',
      displayName: 'Gallery',
      singularName: 'gallery',
      pluralName: 'galleries',
      description: 'Galeries d\'images',
      attributes: {
        title: {
          type: 'string',
          required: true
        },
        description: {
          type: 'text'
        },
        images: {
          type: 'media',
          multiple: true,
          allowedTypes: ['images']
        },
        category: {
          type: 'string'
        }
      }
    },
    {
      uid: 'api::faq.faq',
      displayName: 'FAQ',
      singularName: 'faq',
      pluralName: 'faqs',
      description: 'Questions fréquemment posées',
      attributes: {
        question: {
          type: 'string',
          required: true
        },
        answer: {
          type: 'text',
          required: true
        },
        category: {
          type: 'string'
        },
        order: {
          type: 'integer',
          default: 0
        }
      }
    },
    {
      uid: 'api::seo-setting.seo-setting',
      displayName: 'SEO Setting',
      singularName: 'seo-setting',
      pluralName: 'seo-settings',
      description: 'Paramètres SEO par page',
      attributes: {
        page: {
          type: 'string',
          required: true,
          unique: true
        },
        title: {
          type: 'string',
          required: true
        },
        description: {
          type: 'text',
          required: true
        },
        keywords: {
          type: 'string'
        }
      }
    },
    {
      uid: 'api::navigation-menu.navigation-menu',
      displayName: 'Navigation Menu',
      singularName: 'navigation-menu',
      pluralName: 'navigation-menus',
      description: 'Menus de navigation',
      attributes: {
        name: {
          type: 'string',
          required: true
        },
        items: {
          type: 'json',
          required: true
        },
        position: {
          type: 'enumeration',
          enum: ['header', 'footer', 'sidebar'],
          default: 'header'
        }
      }
    },
    {
      uid: 'api::contact-info.contact-info',
      displayName: 'Contact Info',
      singularName: 'contact-info',
      pluralName: 'contact-infos',
      description: 'Informations de contact',
      attributes: {
        type: {
          type: 'enumeration',
          enum: ['address', 'phone', 'email', 'hours', 'social'],
          required: true
        },
        label: {
          type: 'string',
          required: true
        },
        value: {
          type: 'string',
          required: true
        },
        icon: {
          type: 'string'
        },
        order: {
          type: 'integer',
          default: 0
        }
      }
    },
    {
      uid: 'api::modalite.modalite',
      displayName: 'Modalité',
      singularName: 'modalite',
      pluralName: 'modalites',
      description: 'Modalités de formation',
      attributes: {
        title: {
          type: 'string',
          required: true
        },
        description: {
          type: 'text',
          required: true
        },
        duration: {
          type: 'string'
        },
        format: {
          type: 'enumeration',
          enum: ['presentiel', 'distanciel', 'hybride'],
          default: 'presentiel'
        },
        price: {
          type: 'decimal'
        }
      }
    }
  ];

  let created = 0;
  let errors = 0;

  console.log('📋 Content types à créer:\n');
  contentTypes.forEach((ct, index) => {
    console.log(`${index + 1}. ${ct.displayName} (${ct.pluralName})`);
  });
  console.log('');

  // Créer chaque content type
  for (const contentType of contentTypes) {
    try {
      console.log(`🔧 Création de ${contentType.displayName}...`);

      const payload = {
        contentType: {
          uid: contentType.uid,
          displayName: contentType.displayName,
          singularName: contentType.singularName,
          pluralName: contentType.pluralName,
          description: contentType.description,
          kind: 'collectionType',
          collectionName: contentType.pluralName.replace(/-/g, '_'),
          attributes: contentType.attributes,
          options: {
            draftAndPublish: true
          },
          pluginOptions: {}
        }
      };

      // Tentative de création via l'API admin
      const response = await axios.post(`${STRAPI_URL}/content-type-builder/content-types`, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201 || response.status === 200) {
        console.log(`✅ ${contentType.displayName}: Créé avec succès`);
        created++;
      } else {
        console.log(`⚠️  ${contentType.displayName}: Réponse inattendue (${response.status})`);
      }

    } catch (error) {
      console.log(`❌ ${contentType.displayName}: Erreur ${error.response?.status || error.code}`);
      if (error.response?.data) {
        console.log(`   Détail: ${JSON.stringify(error.response.data)}`);
      }
      errors++;
    }
  }

  console.log('\n📊 RÉSUMÉ DE CRÉATION:\n');
  console.log(`✅ Créés avec succès: ${created}/${contentTypes.length}`);
  console.log(`❌ Erreurs: ${errors}/${contentTypes.length}\n`);

  if (created > 0) {
    console.log('🎉 SUCCÈS ! Content types créés.\n');
    console.log('🔄 PROCHAINES ÉTAPES:\n');
    console.log('1. Redémarrer Strapi pour charger les nouveaux content types');
    console.log('2. Configurer les permissions (Public role)');
    console.log('3. Tester: node scripts/diagnostic-apis-complet.js\n');
  } else {
    console.log('⚠️  CRÉATION MANUELLE REQUISE\n');
    console.log('Les content types doivent être créés via l\'interface admin:');
    console.log('1. Ouvrir http://localhost:1337/admin');
    console.log('2. Aller dans Content-Type Builder');
    console.log('3. Créer manuellement chaque content type\n');
  }

  return { created, errors, total: contentTypes.length };
}

// Fonction pour configurer les permissions après création
async function configurePermissions() {
  console.log('🔧 CONFIGURATION DES PERMISSIONS\n');
  console.log('================================\n');

  const contentTypesToPermit = [
    'galleries',
    'faqs',
    'seo-settings', 
    'navigation-menus',
    'contact-infos', // Note: pluriel différent
    'modalites'
  ];

  console.log('📋 Permissions à configurer:\n');
  contentTypesToPermit.forEach((ct, index) => {
    console.log(`${index + 1}. ${ct}`);
  });

  console.log('\n💡 CONFIGURATION MANUELLE REQUISE:\n');
  console.log('1. Ouvrir http://localhost:1337/admin');
  console.log('2. Aller dans Settings > Users & Permissions > Roles > Public');
  console.log('3. Pour chaque content type ci-dessus:');
  console.log('   - Activer "find" (lecture de liste)');
  console.log('   - Activer "findOne" (lecture d\'un élément)');
  console.log('4. Sauvegarder les permissions');
  console.log('5. Tester: node scripts/diagnostic-apis-complet.js\n');
}

// Lancer la création
createContentTypesViaAPI()
  .then(result => {
    if (result.created > 0) {
      console.log('🚀 Redémarrage de Strapi recommandé...\n');
    }
    return configurePermissions();
  })
  .catch(error => {
    console.error('\n❌ ERREUR GLOBALE:', error.message);
    console.log('\n💡 SOLUTIONS ALTERNATIVES:');
    console.log('1. Vérifier que Strapi est démarré');
    console.log('2. Créer les content types manuellement via l\'admin');
    console.log('3. Configurer les permissions manuellement');
  });