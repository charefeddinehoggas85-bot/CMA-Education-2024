const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Création finale des content types avec redémarrage automatique
async function createContentTypesFinal() {
  console.log('🚀 CRÉATION FINALE DES CONTENT TYPES\n');
  console.log('===================================\n');

  // Arrêter Strapi d'abord
  console.log('🛑 Arrêt de Strapi...');
  try {
    execSync('taskkill /F /IM node.exe', { stdio: 'ignore' });
    console.log('✅ Strapi arrêté\n');
  } catch (error) {
    console.log('⚠️  Strapi peut-être déjà arrêté\n');
  }

  // Supprimer les anciens content types défaillants
  const oldDirs = [
    'cms-cma/src/api/galleries',
    'cms-cma/src/api/faqs',
    'cms-cma/src/api/seo-settings',
    'cms-cma/src/api/navigation-menus',
    'cms-cma/src/api/contact-infos',
    'cms-cma/src/api/modalites'
  ];

  console.log('🗑️  Nettoyage des anciens content types...');
  for (const dir of oldDirs) {
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
      console.log(`✅ Supprimé: ${dir}`);
    }
  }

  // Content types avec structure Strapi correcte
  const contentTypes = [
    {
      name: 'gallery',
      plural: 'galleries',
      displayName: 'Gallery',
      description: 'Galeries d\'images',
      attributes: {
        title: { type: 'string', required: true },
        description: { type: 'text' },
        images: { type: 'media', multiple: true, allowedTypes: ['images'] },
        category: { type: 'string' }
      }
    },
    {
      name: 'faq',
      plural: 'faqs',
      displayName: 'FAQ',
      description: 'Questions fréquemment posées',
      attributes: {
        question: { type: 'string', required: true },
        answer: { type: 'text', required: true },
        category: { type: 'string' },
        order: { type: 'integer', default: 0 }
      }
    },
    {
      name: 'seo-setting',
      plural: 'seo-settings',
      displayName: 'SEO Setting',
      description: 'Paramètres SEO',
      attributes: {
        page: { type: 'string', required: true, unique: true },
        title: { type: 'string', required: true },
        description: { type: 'text', required: true },
        keywords: { type: 'string' }
      }
    },
    {
      name: 'navigation-menu',
      plural: 'navigation-menus',
      displayName: 'Navigation Menu',
      description: 'Menus de navigation',
      attributes: {
        name: { type: 'string', required: true },
        items: { type: 'json', required: true },
        position: { type: 'enumeration', enum: ['header', 'footer', 'sidebar'], default: 'header' }
      }
    },
    {
      name: 'contact-info',
      plural: 'contact-infos',
      displayName: 'Contact Info',
      description: 'Informations de contact',
      attributes: {
        type: { type: 'enumeration', enum: ['address', 'phone', 'email', 'hours', 'social'], required: true },
        label: { type: 'string', required: true },
        value: { type: 'string', required: true },
        icon: { type: 'string' },
        order: { type: 'integer', default: 0 }
      }
    },
    {
      name: 'modalite',
      plural: 'modalites',
      displayName: 'Modalité',
      description: 'Modalités de formation',
      attributes: {
        title: { type: 'string', required: true },
        description: { type: 'text', required: true },
        duration: { type: 'string' },
        format: { type: 'enumeration', enum: ['presentiel', 'distanciel', 'hybride'], default: 'presentiel' },
        price: { type: 'decimal' }
      }
    }
  ];

  console.log('\n🔧 Création des content types...\n');

  for (const ct of contentTypes) {
    try {
      // Créer la structure complète
      const apiDir = path.join('cms-cma', 'src', 'api', ct.plural);
      const contentTypeDir = path.join(apiDir, 'content-types', ct.name);
      const controllersDir = path.join(apiDir, 'controllers');
      const routesDir = path.join(apiDir, 'routes');
      const servicesDir = path.join(apiDir, 'services');

      // Créer tous les dossiers
      [contentTypeDir, controllersDir, routesDir, servicesDir].forEach(dir => {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
      });

      // 1. Schema.json avec structure Strapi v4
      const schema = {
        kind: 'collectionType',
        collectionName: ct.plural.replace(/-/g, '_'),
        info: {
          singularName: ct.name,
          pluralName: ct.plural,
          displayName: ct.displayName,
          description: ct.description
        },
        options: {
          draftAndPublish: true
        },
        pluginOptions: {
          'content-manager': {
            visible: true
          },
          'content-type-builder': {
            visible: true
          }
        },
        attributes: ct.attributes
      };

      fs.writeFileSync(
        path.join(contentTypeDir, 'schema.json'),
        JSON.stringify(schema, null, 2)
      );

      // 2. Controller avec factory Strapi v4
      const controller = `'use strict';

/**
 * ${ct.name} controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::${ct.plural}.${ct.name}');
`;

      fs.writeFileSync(
        path.join(controllersDir, `${ct.name}.js`),
        controller
      );

      // 3. Routes avec factory Strapi v4
      const routes = `'use strict';

/**
 * ${ct.name} router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::${ct.plural}.${ct.name}');
`;

      fs.writeFileSync(
        path.join(routesDir, `${ct.name}.js`),
        routes
      );

      // 4. Service avec factory Strapi v4
      const service = `'use strict';

/**
 * ${ct.name} service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::${ct.plural}.${ct.name}');
`;

      fs.writeFileSync(
        path.join(servicesDir, `${ct.name}.js`),
        service
      );

      console.log(`✅ ${ct.displayName} (${ct.plural})`);
      console.log(`   📁 API: /api/${ct.plural}`);
      console.log(`   📄 Schema: ${path.join(contentTypeDir, 'schema.json')}`);

    } catch (error) {
      console.log(`❌ Erreur ${ct.displayName}:`, error.message);
    }
  }

  console.log('\n🎉 TOUS LES CONTENT TYPES CRÉÉS !\n');

  // Créer un script de démarrage avec permissions
  const startupScript = `
console.log('🚀 Démarrage Strapi avec configuration des permissions...');

const strapi = require('@strapi/strapi');

async function setupPermissions() {
  try {
    const app = await strapi().load();
    
    // Attendre que Strapi soit complètement chargé
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    console.log('🔧 Configuration des permissions...');
    
    // Content types à configurer
    const contentTypes = [
      'api::galleries.gallery',
      'api::faqs.faq', 
      'api::seo-settings.seo-setting',
      'api::navigation-menus.navigation-menu',
      'api::contact-infos.contact-info',
      'api::modalites.modalite'
    ];
    
    // Configurer les permissions pour le rôle Public
    const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
      where: { type: 'public' }
    });
    
    if (publicRole) {
      for (const contentType of contentTypes) {
        try {
          // Activer find et findOne
          await strapi.query('plugin::users-permissions.permission').updateMany({
            where: { 
              role: publicRole.id,
              action: { $in: ['find', 'findOne'] },
              subject: contentType
            },
            data: { enabled: true }
          });
          
          console.log(\`✅ Permissions configurées pour \${contentType}\`);
        } catch (error) {
          console.log(\`⚠️  Erreur permissions \${contentType}: \${error.message}\`);
        }
      }
    }
    
    console.log('🎉 Configuration terminée !');
    
  } catch (error) {
    console.error('❌ Erreur configuration:', error.message);
  }
}

// Lancer la configuration après le démarrage
setTimeout(setupPermissions, 10000);
`;

  fs.writeFileSync('cms-cma/setup-permissions.js', startupScript);

  console.log('📋 Content types créés:\n');
  contentTypes.forEach((ct, index) => {
    console.log(`${index + 1}. ${ct.displayName} → /api/${ct.plural}`);
  });

  console.log('\n🚀 REDÉMARRAGE AUTOMATIQUE DE STRAPI...\n');

  // Redémarrer Strapi
  try {
    console.log('⚡ Démarrage de Strapi...');
    
    // Changer vers le dossier cms-cma et démarrer
    process.chdir('cms-cma');
    
    const { spawn } = require('child_process');
    const strapiProcess = spawn('npm', ['run', 'develop'], {
      stdio: 'inherit',
      shell: true
    });

    console.log('✅ Strapi en cours de démarrage...');
    console.log('⏱️  Attendre 60 secondes pour le démarrage complet');
    console.log('🌐 Admin: http://localhost:1337/admin');
    
    // Attendre le démarrage
    setTimeout(() => {
      console.log('\n🧪 Test automatique dans 60 secondes...');
      setTimeout(() => {
        process.chdir('..');
        const { execSync } = require('child_process');
        try {
          execSync('node scripts/test-apis-corriges.js', { stdio: 'inherit' });
        } catch (error) {
          console.log('⚠️  Lancer manuellement: node scripts/test-apis-corriges.js');
        }
      }, 60000);
    }, 5000);

  } catch (error) {
    console.error('❌ Erreur redémarrage:', error.message);
    console.log('\n💡 REDÉMARRAGE MANUEL REQUIS:');
    console.log('1. cd cms-cma');
    console.log('2. npm run develop');
    console.log('3. Attendre le démarrage complet');
    console.log('4. node scripts/test-apis-corriges.js');
  }

  return contentTypes.length;
}

createContentTypesFinal().catch(console.error);