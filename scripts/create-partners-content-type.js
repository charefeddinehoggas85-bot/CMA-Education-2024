#!/usr/bin/env node

/**
 * Script pour créer le content-type Partners dans Strapi
 */

const fs = require('fs')
const path = require('path')

async function createPartnersContentType() {
  console.log('🏢 Création du content-type Partners...')
  
  // Créer le dossier si nécessaire
  const apiDir = path.join(__dirname, '..', 'cms-cma', 'src', 'api', 'partner')
  const contentTypesDir = path.join(apiDir, 'content-types', 'partner')
  
  if (!fs.existsSync(contentTypesDir)) {
    fs.mkdirSync(contentTypesDir, { recursive: true })
  }
  
  // Schema du content-type
  const schema = {
    "kind": "collectionType",
    "collectionName": "partners",
    "info": {
      "singularName": "partner",
      "pluralName": "partners",
      "displayName": "Partner",
      "description": "Partenaires de l'école"
    },
    "options": {
      "draftAndPublish": true
    },
    "pluginOptions": {},
    "attributes": {
      "nom": {
        "type": "string",
        "required": true
      },
      "logo": {
        "type": "media",
        "multiple": false,
        "required": false,
        "allowedTypes": ["images"]
      },
      "description": {
        "type": "text"
      },
      "siteWeb": {
        "type": "string"
      },
      "secteur": {
        "type": "string"
      },
      "ordre": {
        "type": "integer",
        "default": 0
      },
      "featured": {
        "type": "boolean",
        "default": false
      }
    }
  }
  
  // Écrire le schema
  const schemaPath = path.join(contentTypesDir, 'schema.json')
  fs.writeFileSync(schemaPath, JSON.stringify(schema, null, 2))
  console.log('✅ Schema créé:', schemaPath)
  
  // Créer les dossiers pour controllers, services, routes
  const controllersDir = path.join(apiDir, 'controllers')
  const servicesDir = path.join(apiDir, 'services')
  const routesDir = path.join(apiDir, 'routes')
  
  if (!fs.existsSync(controllersDir)) {
    fs.mkdirSync(controllersDir, { recursive: true })
  }
  if (!fs.existsSync(servicesDir)) {
    fs.mkdirSync(servicesDir, { recursive: true })
  }
  if (!fs.existsSync(routesDir)) {
    fs.mkdirSync(routesDir, { recursive: true })
  }
  
  // Controller
  const controller = `'use strict';

/**
 * partner controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::partner.partner');
`
  
  fs.writeFileSync(path.join(controllersDir, 'partner.js'), controller)
  console.log('✅ Controller créé')
  
  // Service
  const service = `'use strict';

/**
 * partner service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::partner.partner');
`
  
  fs.writeFileSync(path.join(servicesDir, 'partner.js'), service)
  console.log('✅ Service créé')
  
  // Routes
  const routes = `'use strict';

/**
 * partner router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::partner.partner');
`
  
  fs.writeFileSync(path.join(routesDir, 'partner.js'), routes)
  console.log('✅ Routes créées')
  
  console.log('\n🎉 Content-type Partners créé avec succès !')
  console.log('📁 Fichiers créés dans:', apiDir)
  console.log('\n⚠️ IMPORTANT: Redémarrez Strapi pour que les changements prennent effet:')
  console.log('   1. Arrêtez Strapi (Ctrl+C)')
  console.log('   2. Relancez: npm run develop (dans le dossier cms-cma)')
  console.log('   3. Configurez les permissions dans Admin > Settings > Users & Permissions')
}

async function createSamplePartners() {
  console.log('\n📊 Création de partenaires d\'exemple...')
  
  const partnersData = [
    {
      nom: 'Bouygues Construction',
      description: 'Leader mondial de la construction et des services',
      secteur: 'Construction',
      siteWeb: 'https://www.bouygues-construction.com',
      ordre: 1,
      featured: true
    },
    {
      nom: 'Vinci Construction',
      description: 'Groupe de construction et concessions',
      secteur: 'Construction',
      siteWeb: 'https://www.vinci-construction.com',
      ordre: 2,
      featured: true
    },
    {
      nom: 'Eiffage',
      description: 'Groupe européen de construction et concessions',
      secteur: 'Construction',
      siteWeb: 'https://www.eiffage.com',
      ordre: 3,
      featured: true
    },
    {
      nom: 'Spie Batignolles',
      description: 'Entreprise générale de construction',
      secteur: 'Construction',
      siteWeb: 'https://www.spiebatignolles.fr',
      ordre: 4,
      featured: true
    },
    {
      nom: 'Colas',
      description: 'Leader mondial de la construction routière',
      secteur: 'Infrastructure',
      siteWeb: 'https://www.colas.com',
      ordre: 5,
      featured: true
    },
    {
      nom: 'Sogea-Satom',
      description: 'Filiale de Vinci Construction',
      secteur: 'Construction',
      siteWeb: 'https://www.sogea-satom.com',
      ordre: 6,
      featured: true
    },
    {
      nom: 'Razel-Bec',
      description: 'Entreprise de travaux publics',
      secteur: 'Travaux Publics',
      siteWeb: 'https://www.razel-bec.com',
      ordre: 7,
      featured: false
    },
    {
      nom: 'Eurovia',
      description: 'Filiale de Vinci, spécialisée dans les infrastructures',
      secteur: 'Infrastructure',
      siteWeb: 'https://www.eurovia.com',
      ordre: 8,
      featured: false
    },
    {
      nom: 'Demathieu Bard',
      description: 'Groupe de construction',
      secteur: 'Construction',
      siteWeb: 'https://www.demathieu-bard.fr',
      ordre: 9,
      featured: false
    },
    {
      nom: 'Fayat',
      description: 'Groupe de construction et travaux publics',
      secteur: 'Construction',
      siteWeb: 'https://www.fayat.com',
      ordre: 10,
      featured: false
    },
    {
      nom: 'NGE',
      description: 'Groupe de construction et travaux publics',
      secteur: 'Construction',
      siteWeb: 'https://www.nge.fr',
      ordre: 11,
      featured: false
    },
    {
      nom: 'Chantiers Modernes',
      description: 'Entreprise de construction',
      secteur: 'Construction',
      siteWeb: 'https://www.chantiers-modernes.com',
      ordre: 12,
      featured: false
    }
  ]
  
  // Créer un fichier JSON avec les données
  const dataPath = path.join(__dirname, '..', 'partners-sample-data.json')
  fs.writeFileSync(dataPath, JSON.stringify(partnersData, null, 2))
  console.log('✅ Données d\'exemple sauvegardées:', dataPath)
  console.log('\n💡 Pour importer ces données après le redémarrage de Strapi:')
  console.log('   node scripts/import-partners-data.js')
}

async function main() {
  await createPartnersContentType()
  await createSamplePartners()
  
  console.log('\n🚀 Prochaines étapes:')
  console.log('   1. Redémarrez Strapi')
  console.log('   2. Configurez les permissions pour l\'API Partners')
  console.log('   3. Importez les données d\'exemple')
  console.log('   4. Testez: http://localhost:1337/api/partners')
}

main().catch(console.error)