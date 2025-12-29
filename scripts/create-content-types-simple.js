const fs = require('fs');
const path = require('path');

// Création simple et efficace des content types
async function createContentTypesSimple() {
  console.log('🚀 CRÉATION SIMPLE DES CONTENT TYPES\n');
  console.log('===================================\n');

  // Supprimer les anciens content types
  const oldDirs = [
    'cms-cma/src/api/galleries',
    'cms-cma/src/api/faqs', 
    'cms-cma/src/api/seo-settings',
    'cms-cma/src/api/navigation-menus',
    'cms-cma/src/api/contact-infos',
    'cms-cma/src/api/modalites'
  ];

  console.log('🗑️  Nettoyage...');
  for (const dir of oldDirs) {
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
      console.log(`✅ Supprimé: ${path.basename(dir)}`);
    }
  }

  // Content types optimisés pour Strapi
  const contentTypes = [
    {
      name: 'gallery',
      plural: 'galleries',
      displayName: 'Gallery'
    },
    {
      name: 'faq',
      plural: 'faqs',
      displayName: 'FAQ'
    },
    {
      name: 'seo-setting',
      plural: 'seo-settings', 
      displayName: 'SEO Setting'
    },
    {
      name: 'navigation-menu',
      plural: 'navigation-menus',
      displayName: 'Navigation Menu'
    },
    {
      name: 'contact-info',
      plural: 'contact-infos',
      displayName: 'Contact Info'
    },
    {
      name: 'modalite',
      plural: 'modalites',
      displayName: 'Modalité'
    }
  ];

  console.log('\n🔧 Création des content types...\n');

  for (const ct of contentTypes) {
    try {
      // Structure des dossiers
      const apiDir = path.join('cms-cma', 'src', 'api', ct.plural);
      const contentTypeDir = path.join(apiDir, 'content-types', ct.name);
      const controllersDir = path.join(apiDir, 'controllers');
      const routesDir = path.join(apiDir, 'routes');
      const servicesDir = path.join(apiDir, 'services');

      // Créer les dossiers
      [contentTypeDir, controllersDir, routesDir, servicesDir].forEach(dir => {
        fs.mkdirSync(dir, { recursive: true });
      });

      // Schema minimal mais complet
      const schema = {
        kind: 'collectionType',
        collectionName: ct.plural.replace(/-/g, '_'),
        info: {
          singularName: ct.name,
          pluralName: ct.plural,
          displayName: ct.displayName,
          description: ''
        },
        options: {
          draftAndPublish: true
        },
        pluginOptions: {},
        attributes: getAttributesForContentType(ct.name)
      };

      // Écrire les fichiers
      fs.writeFileSync(
        path.join(contentTypeDir, 'schema.json'),
        JSON.stringify(schema, null, 2)
      );

      // Controller
      fs.writeFileSync(
        path.join(controllersDir, `${ct.name}.js`),
        `'use strict';
const { createCoreController } = require('@strapi/strapi').factories;
module.exports = createCoreController('api::${ct.plural}.${ct.name}');`
      );

      // Routes
      fs.writeFileSync(
        path.join(routesDir, `${ct.name}.js`),
        `'use strict';
const { createCoreRouter } = require('@strapi/strapi').factories;
module.exports = createCoreRouter('api::${ct.plural}.${ct.name}');`
      );

      // Service
      fs.writeFileSync(
        path.join(servicesDir, `${ct.name}.js`),
        `'use strict';
const { createCoreService } = require('@strapi/strapi').factories;
module.exports = createCoreService('api::${ct.plural}.${ct.name}');`
      );

      console.log(`✅ ${ct.displayName} → /api/${ct.plural}`);

    } catch (error) {
      console.log(`❌ ${ct.displayName}: ${error.message}`);
    }
  }

  console.log('\n🎉 CRÉATION TERMINÉE !\n');
  console.log('📋 Content types créés:\n');
  contentTypes.forEach((ct, i) => {
    console.log(`${i + 1}. ${ct.displayName} (${ct.plural})`);
  });

  console.log('\n⚡ PROCHAINES ÉTAPES:\n');
  console.log('1. Redémarrer Strapi: npm run develop dans cms-cma/');
  console.log('2. Attendre le démarrage complet (2-3 minutes)');
  console.log('3. Configurer les permissions dans l\'admin');
  console.log('4. Tester: node scripts/test-apis-corriges.js\n');

  console.log('🎯 APRÈS CONFIGURATION: 100% (15/15) APIs !');

  return contentTypes.length;
}

function getAttributesForContentType(name) {
  const attributesMap = {
    'gallery': {
      title: { type: 'string', required: true },
      description: { type: 'text' },
      images: { type: 'media', multiple: true, allowedTypes: ['images'] }
    },
    'faq': {
      question: { type: 'string', required: true },
      answer: { type: 'text', required: true },
      category: { type: 'string' }
    },
    'seo-setting': {
      page: { type: 'string', required: true, unique: true },
      title: { type: 'string', required: true },
      description: { type: 'text', required: true }
    },
    'navigation-menu': {
      name: { type: 'string', required: true },
      items: { type: 'json', required: true },
      position: { type: 'enumeration', enum: ['header', 'footer'], default: 'header' }
    },
    'contact-info': {
      type: { type: 'enumeration', enum: ['address', 'phone', 'email'], required: true },
      label: { type: 'string', required: true },
      value: { type: 'string', required: true }
    },
    'modalite': {
      title: { type: 'string', required: true },
      description: { type: 'text', required: true },
      duration: { type: 'string' }
    }
  };

  return attributesMap[name] || {
    title: { type: 'string', required: true },
    description: { type: 'text' }
  };
}

createContentTypesSimple().catch(console.error);