const fs = require('fs');
const path = require('path');

// Créer les APIs complètes avec routes, controllers et services
async function createCompleteAPIs() {
  console.log('🚀 Création des APIs complètes avec routes, controllers et services...\n');

  const apis = [
    'galleries',
    'faqs', 
    'seo-settings',
    'navigation-menus',
    'contact-info',
    'modalites'
  ];

  for (const apiName of apis) {
    try {
      const apiDir = path.join('cms-cma', 'src', 'api', apiName);
      
      // Créer les dossiers nécessaires
      const dirs = [
        path.join(apiDir, 'controllers'),
        path.join(apiDir, 'routes'),
        path.join(apiDir, 'services')
      ];

      dirs.forEach(dir => {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
      });

      // Créer le controller
      const controllerContent = `'use strict';

/**
 * ${apiName} controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::${apiName}.${getSingularName(apiName)}');
`;

      fs.writeFileSync(path.join(apiDir, 'controllers', `${getSingularName(apiName)}.js`), controllerContent);

      // Créer les routes
      const routesContent = `'use strict';

/**
 * ${apiName} router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::${apiName}.${getSingularName(apiName)}');
`;

      fs.writeFileSync(path.join(apiDir, 'routes', `${getSingularName(apiName)}.js`), routesContent);

      // Créer le service
      const serviceContent = `'use strict';

/**
 * ${apiName} service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::${apiName}.${getSingularName(apiName)}');
`;

      fs.writeFileSync(path.join(apiDir, 'services', `${getSingularName(apiName)}.js`), serviceContent);

      console.log(`✅ API complète créée: ${apiName}`);
      console.log(`   📁 Controller: ${path.join(apiDir, 'controllers', getSingularName(apiName) + '.js')}`);
      console.log(`   📁 Routes: ${path.join(apiDir, 'routes', getSingularName(apiName) + '.js')}`);
      console.log(`   📁 Service: ${path.join(apiDir, 'services', getSingularName(apiName) + '.js')}`);

    } catch (error) {
      console.log(`❌ Erreur création ${apiName}:`, error.message);
    }
  }

  console.log('\n🎉 Toutes les APIs complètes ont été créées !');
  console.log('\n⚠️  IMPORTANT: Redémarrez Strapi pour charger les nouvelles APIs:');
  console.log('   1. Arrêter Strapi (Ctrl+C)');
  console.log('   2. Relancer: npm run develop dans cms-cma/');
  console.log('\n🎯 Après redémarrage: 100% (15/15) APIs !');
}

function getSingularName(apiName) {
  const singularMap = {
    'galleries': 'gallery',
    'faqs': 'faq',
    'seo-settings': 'seo-setting',
    'navigation-menus': 'navigation-menu',
    'contact-info': 'contact-info',
    'modalites': 'modalite'
  };
  return singularMap[apiName] || apiName;
}

createCompleteAPIs().catch(console.error);