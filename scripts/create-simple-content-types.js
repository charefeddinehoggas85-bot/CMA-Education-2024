const fs = require('fs');
const path = require('path');

// Création de content types avec noms simplifiés
async function createSimpleContentTypes() {
  console.log('🚀 CRÉATION CONTENT TYPES SIMPLIFIÉS\n');
  console.log('===================================\n');

  // Supprimer tous les anciens content types problématiques
  const dirsToRemove = [
    'cms-cma/src/api/galleries',
    'cms-cma/src/api/faqs',
    'cms-cma/src/api/seo-settings',
    'cms-cma/src/api/navigation-menus', 
    'cms-cma/src/api/contact-infos',
    'cms-cma/src/api/modalites'
  ];

  console.log('🗑️  Nettoyage complet...');
  for (const dir of dirsToRemove) {
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
      console.log(`✅ Supprimé: ${path.basename(dir)}`);
    }
  }

  // Content types avec noms très simples (sans tirets)
  const simpleContentTypes = [
    {
      name: 'gallery',
      plural: 'galleries',
      displayName: 'Gallery',
      collectionName: 'galleries'
    },
    {
      name: 'faq',
      plural: 'faqs',
      displayName: 'FAQ', 
      collectionName: 'faqs'
    },
    {
      name: 'seosetting',
      plural: 'seosettings',
      displayName: 'SEO Setting',
      collectionName: 'seo_settings'
    },
    {
      name: 'navigationmenu',
      plural: 'navigationmenus',
      displayName: 'Navigation Menu',
      collectionName: 'navigation_menus'
    },
    {
      name: 'contactinfo',
      plural: 'contactinfos',
      displayName: 'Contact Info',
      collectionName: 'contact_infos'
    },
    {
      name: 'modalite',
      plural: 'modalites',
      displayName: 'Modalité',
      collectionName: 'modalites'
    }
  ];

  console.log('\n🔧 Création avec noms simplifiés...\n');

  for (const ct of simpleContentTypes) {
    try {
      // Structure Strapi standard
      const apiDir = path.join('cms-cma', 'src', 'api', ct.plural);
      const contentTypeDir = path.join(apiDir, 'content-types', ct.name);
      const controllersDir = path.join(apiDir, 'controllers');
      const routesDir = path.join(apiDir, 'routes');
      const servicesDir = path.join(apiDir, 'services');

      // Créer tous les dossiers
      [contentTypeDir, controllersDir, routesDir, servicesDir].forEach(dir => {
        fs.mkdirSync(dir, { recursive: true });
      });

      // Schema ultra-simple
      const schema = {
        kind: 'collectionType',
        collectionName: ct.collectionName,
        info: {
          singularName: ct.name,
          pluralName: ct.plural,
          displayName: ct.displayName,
          description: ''
        },
        options: {
          draftAndPublish: false // Simplifier
        },
        pluginOptions: {},
        attributes: {
          title: {
            type: 'string',
            required: true
          },
          description: {
            type: 'text'
          }
        }
      };

      // Écrire le schema
      fs.writeFileSync(
        path.join(contentTypeDir, 'schema.json'),
        JSON.stringify(schema, null, 2)
      );

      // Controller minimal
      const controller = `'use strict';
const { createCoreController } = require('@strapi/strapi').factories;
module.exports = createCoreController('api::${ct.plural}.${ct.name}');`;

      fs.writeFileSync(path.join(controllersDir, `${ct.name}.js`), controller);

      // Routes minimal
      const routes = `'use strict';
const { createCoreRouter } = require('@strapi/strapi').factories;
module.exports = createCoreRouter('api::${ct.plural}.${ct.name}');`;

      fs.writeFileSync(path.join(routesDir, `${ct.name}.js`), routes);

      // Service minimal
      const service = `'use strict';
const { createCoreService } = require('@strapi/strapi').factories;
module.exports = createCoreService('api::${ct.plural}.${ct.name}');`;

      fs.writeFileSync(path.join(servicesDir, `${ct.name}.js`), service);

      console.log(`✅ ${ct.displayName} → /api/${ct.plural}`);

    } catch (error) {
      console.log(`❌ ${ct.displayName}: ${error.message}`);
    }
  }

  console.log('\n🎉 CONTENT TYPES SIMPLIFIÉS CRÉÉS !\n');

  // Créer un script de test adapté
  const testScript = `const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';

async function testSimplifiedAPIs() {
  console.log('🧪 TEST DES APIS SIMPLIFIÉES\\n');
  
  const apis = [
    '/api/formations', '/api/partners', '/api/testimonials',
    '/api/site-settings', '/api/statistiques-site', '/api/processus-admissions',
    '/api/valeurs-ecole', '/api/vae-formules', '/api/entreprise-services',
    '/api/galleries', '/api/faqs', '/api/seosettings',
    '/api/navigationmenus', '/api/contactinfos', '/api/modalites'
  ];

  let working = 0;
  
  for (const endpoint of apis) {
    try {
      const response = await axios.get(STRAPI_URL + endpoint);
      const count = response.data.data?.length || (response.data.data ? 1 : 0);
      console.log(\`✅ \${endpoint}: \${count} éléments\`);
      working++;
    } catch (error) {
      if (error.response?.status === 403) {
        console.log(\`🔒 \${endpoint}: Permissions manquantes\`);
      } else {
        console.log(\`❌ \${endpoint}: Non disponible (\${error.response?.status})\`);
      }
    }
  }
  
  const percentage = Math.round((working / apis.length) * 100);
  console.log(\`\\n📊 RÉSULTAT: \${percentage}% (\${working}/\${apis.length})\\n\`);
  
  if (percentage === 100) {
    console.log('🎉 MIGRATION 100% RÉUSSIE !');
  } else {
    console.log('🔧 Configuration des permissions requise dans l\\'admin');
  }
}

testSimplifiedAPIs().catch(console.error);`;

  fs.writeFileSync('scripts/test-simplified-apis.js', testScript);

  console.log('📋 Content types créés:\n');
  simpleContentTypes.forEach((ct, i) => {
    console.log(`${i + 1}. ${ct.displayName} (${ct.plural})`);
  });

  console.log('\n⚡ PROCHAINES ÉTAPES:\n');
  console.log('1. 🔄 Redémarrer Strapi (en cours...)');
  console.log('2. ⏱️  Attendre 2-3 minutes');
  console.log('3. 🧪 Tester: node scripts/test-simplified-apis.js');
  console.log('4. 🔧 Configurer permissions si nécessaire\n');

  console.log('🎯 OBJECTIF: 100% (15/15) APIs fonctionnelles !');

  return simpleContentTypes.length;
}

createSimpleContentTypes().catch(console.error);