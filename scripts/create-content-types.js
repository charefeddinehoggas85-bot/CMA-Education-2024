/**
 * Script pour créer tous les fichiers manquants des content types
 */

const fs = require('fs');
const path = require('path');

const contentTypes = [
  'formation-thematique',
  'valeur-ecole', 
  'statistique-site',
  'processus-admission'
];

function createFiles(contentType) {
  const apiPath = `cms-cma/src/api/${contentType}`;
  
  // Créer les dossiers
  const dirs = [
    `${apiPath}/routes`,
    `${apiPath}/controllers`, 
    `${apiPath}/services`
  ];
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
  
  // Router
  const routerContent = `/**
 * ${contentType} router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::${contentType}.${contentType}');`;
  
  fs.writeFileSync(`${apiPath}/routes/${contentType}.ts`, routerContent);
  
  // Controller
  const controllerContent = `/**
 * ${contentType} controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::${contentType}.${contentType}');`;
  
  fs.writeFileSync(`${apiPath}/controllers/${contentType}.ts`, controllerContent);
  
  // Service
  const serviceContent = `/**
 * ${contentType} service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::${contentType}.${contentType}');`;
  
  fs.writeFileSync(`${apiPath}/services/${contentType}.ts`, serviceContent);
  
  console.log(`✅ Fichiers créés pour ${contentType}`);
}

console.log('🚀 Création des fichiers content types...\n');

contentTypes.forEach(createFiles);

console.log('\n✨ Tous les fichiers content types créés!');
console.log('\n💡 Prochaines étapes:');
console.log('  1. Redémarrer Strapi pour charger les nouveaux content types');
console.log('  2. Configurer les permissions dans l\'admin Strapi');
console.log('  3. Exécuter le script d\'import des données');