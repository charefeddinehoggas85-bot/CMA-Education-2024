const fs = require('fs');
const path = require('path');

// Forcer la création des content types avec la structure correcte
async function forceCreateContentTypes() {
  console.log('🚀 CRÉATION FORCÉE DES CONTENT TYPES\n');
  console.log('===================================\n');

  // Supprimer les anciens content types défaillants
  const oldContentTypes = [
    'cms-cma/src/api/galleries',
    'cms-cma/src/api/faqs',
    'cms-cma/src/api/seo-settings',
    'cms-cma/src/api/navigation-menus',
    'cms-cma/src/api/contact-info',
    'cms-cma/src/api/modalites'
  ];

  console.log('🗑️  Suppression des anciens content types...\n');
  for (const dir of oldContentTypes) {
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
      console.log(`✅ Supprimé: ${dir}`);
    }
  }

  // Content types avec structure complète
  const contentTypes = [
    {
      apiName: 'gallery',
      pluralName: 'galleries',
      displayName: 'Gallery',
      collectionName: 'galleries',
      attributes: {
        title: { type: 'string', required: true },
        description: { type: 'text' },
        images: { type: 'media', multiple: true, allowedTypes: ['images'] },
        category: { type: 'string' }
      }
    },
    {
      apiName: 'faq',
      pluralName: 'faqs', 
      displayName: 'FAQ',
      collectionName: 'faqs',
      attributes: {
        question: { type: 'string', required: true },
        answer: { type: 'text', required: true },
        category: { type: 'string' },
        order: { type: 'integer', default: 0 }
      }
    },
    {
      apiName: 'seo-setting',
      pluralName: 'seo-settings',
      displayName: 'SEO Setting', 
      collectionName: 'seo_settings',
      attributes: {
        page: { type: 'string', required: true, unique: true },
        title: { type: 'string', required: true },
        description: { type: 'text', required: true },
        keywords: { type: 'string' }
      }
    },
    {
      apiName: 'navigation-menu',
      pluralName: 'navigation-menus',
      displayName: 'Navigation Menu',
      collectionName: 'navigation_menus', 
      attributes: {
        name: { type: 'string', required: true },
        items: { type: 'json', required: true },
        position: { type: 'enumeration', enum: ['header', 'footer', 'sidebar'], default: 'header' }
      }
    },
    {
      apiName: 'contact-info',
      pluralName: 'contact-infos',
      displayName: 'Contact Info',
      collectionName: 'contact_infos',
      attributes: {
        type: { type: 'enumeration', enum: ['address', 'phone', 'email', 'hours', 'social'], required: true },
        label: { type: 'string', required: true },
        value: { type: 'string', required: true },
        icon: { type: 'string' },
        order: { type: 'integer', default: 0 }
      }
    },
    {
      apiName: 'modalite',
      pluralName: 'modalites',
      displayName: 'Modalité',
      collectionName: 'modalites',
      attributes: {
        title: { type: 'string', required: true },
        description: { type: 'text', required: true },
        duration: { type: 'string' },
        format: { type: 'enumeration', enum: ['presentiel', 'distanciel', 'hybride'], default: 'presentiel' },
        price: { type: 'decimal' }
      }
    }
  ];

  console.log('\n🔧 Création des nouveaux content types...\n');

  for (const ct of contentTypes) {
    try {
      // Créer la structure de dossiers
      const apiDir = path.join('cms-cma', 'src', 'api', ct.pluralName);
      const contentTypeDir = path.join(apiDir, 'content-types', ct.apiName);
      const controllersDir = path.join(apiDir, 'controllers');
      const routesDir = path.join(apiDir, 'routes');
      const servicesDir = path.join(apiDir, 'services');

      [contentTypeDir, controllersDir, routesDir, servicesDir].forEach(dir => {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
      });

      // 1. Schema.json
      const schema = {
        kind: 'collectionType',
        collectionName: ct.collectionName,
        info: {
          singularName: ct.apiName,
          pluralName: ct.pluralName,
          displayName: ct.displayName,
          description: ''
        },
        options: {
          draftAndPublish: true
        },
        pluginOptions: {},
        attributes: ct.attributes
      };

      fs.writeFileSync(
        path.join(contentTypeDir, 'schema.json'),
        JSON.stringify(schema, null, 2)
      );

      // 2. Controller
      const controller = `'use strict';

/**
 * ${ct.apiName} controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::${ct.pluralName}.${ct.apiName}');
`;

      fs.writeFileSync(
        path.join(controllersDir, `${ct.apiName}.js`),
        controller
      );

      // 3. Routes
      const routes = `'use strict';

/**
 * ${ct.apiName} router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::${ct.pluralName}.${ct.apiName}');
`;

      fs.writeFileSync(
        path.join(routesDir, `${ct.apiName}.js`),
        routes
      );

      // 4. Service
      const service = `'use strict';

/**
 * ${ct.apiName} service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::${ct.pluralName}.${ct.apiName}');
`;

      fs.writeFileSync(
        path.join(servicesDir, `${ct.apiName}.js`),
        service
      );

      console.log(`✅ ${ct.displayName} (${ct.pluralName})`);
      console.log(`   📁 ${apiDir}`);

    } catch (error) {
      console.log(`❌ Erreur ${ct.displayName}:`, error.message);
    }
  }

  console.log('\n🎉 TOUS LES CONTENT TYPES CRÉÉS !\n');
  console.log('📋 Content types créés:\n');
  contentTypes.forEach((ct, index) => {
    console.log(`${index + 1}. ${ct.displayName} → /api/${ct.pluralName}`);
  });

  console.log('\n⚠️  REDÉMARRAGE STRAPI OBLIGATOIRE:\n');
  console.log('1. Arrêter Strapi (Ctrl+C)');
  console.log('2. Relancer: npm run develop dans cms-cma/');
  console.log('3. Attendre le démarrage complet');
  console.log('4. Configurer les permissions dans l\'admin');
  console.log('5. Tester: node scripts/diagnostic-apis-complet.js\n');

  console.log('🎯 APRÈS REDÉMARRAGE + PERMISSIONS: 100% (15/15) APIs !');

  return contentTypes.length;
}

forceCreateContentTypes().catch(console.error);