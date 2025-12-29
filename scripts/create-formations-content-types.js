/**
 * Création des content types Formations pour Strapi
 * Usage: node scripts/create-formations-content-types.js
 */

const fs = require('fs');
const path = require('path');

// Schéma pour Formation Category
const formationCategorySchema = {
  "kind": "collectionType",
  "collectionName": "formation_categories",
  "info": {
    "singularName": "formation-category",
    "pluralName": "formation-categories",
    "displayName": "Formation Category",
    "description": "Catégories de formations (Alternance, Reconversion, VAE, etc.)"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "name": {
      "type": "string",
      "required": true
    },
    "slug": {
      "type": "uid",
      "targetField": "name"
    },
    "description": {
      "type": "text"
    },
    "color": {
      "type": "string",
      "default": "#3B82F6"
    },
    "icon": {
      "type": "string"
    },
    "ordre": {
      "type": "integer",
      "default": 1
    },
    "formations": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::formation.formation",
      "mappedBy": "category"
    }
  }
};

// Schéma pour Formation
const formationSchema = {
  "kind": "collectionType",
  "collectionName": "formations",
  "info": {
    "singularName": "formation",
    "pluralName": "formations",
    "displayName": "Formation",
    "description": "Formations proposées par l'école"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "slug": {
      "type": "uid",
      "targetField": "title"
    },
    "level": {
      "type": "string",
      "required": true
    },
    "rncp": {
      "type": "string"
    },
    "shortDesc": {
      "type": "text",
      "required": true
    },
    "fullDesc": {
      "type": "richtext"
    },
    "metierDesc": {
      "type": "richtext"
    },
    "objectifs": {
      "type": "json"
    },
    "programme": {
      "type": "json"
    },
    "competences2eAnnee": {
      "type": "json"
    },
    "debouches": {
      "type": "json"
    },
    "duree": {
      "type": "string"
    },
    "volumeHoraire": {
      "type": "string"
    },
    "repartition": {
      "type": "string"
    },
    "rythme": {
      "type": "string"
    },
    "modalite": {
      "type": "string"
    },
    "typeContrat": {
      "type": "string"
    },
    "effectif": {
      "type": "string"
    },
    "prerequis": {
      "type": "json"
    },
    "cout": {
      "type": "string"
    },
    "financement": {
      "type": "string"
    },
    "certificateur": {
      "type": "string"
    },
    "dateEnregistrement": {
      "type": "string"
    },
    "entreprisesPartenaires": {
      "type": "json"
    },
    "tauxReussite": {
      "type": "string"
    },
    "tauxInsertion": {
      "type": "string"
    },
    "conception": {
      "type": "string"
    },
    "evaluation": {
      "type": "json"
    },
    "modalitesEvaluation": {
      "type": "json"
    },
    "poursuites": {
      "type": "json"
    },
    "poursuiteEtudes": {
      "type": "json"
    },
    "publicCible": {
      "type": "string"
    },
    "contact": {
      "type": "json"
    },
    "category": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::formation-category.formation-category",
      "inversedBy": "formations"
    },
    "image": {
      "type": "media",
      "multiple": false,
      "required": false,
      "allowedTypes": ["images"]
    },
    "gallery": {
      "type": "media",
      "multiple": true,
      "required": false,
      "allowedTypes": ["images"]
    },
    "brochure": {
      "type": "media",
      "multiple": false,
      "required": false,
      "allowedTypes": ["files"]
    },
    "ordre": {
      "type": "integer",
      "default": 1
    },
    "isActive": {
      "type": "boolean",
      "default": true
    },
    "seoTitle": {
      "type": "string"
    },
    "seoDescription": {
      "type": "text"
    },
    "seoKeywords": {
      "type": "json"
    }
  }
};

// Schéma pour Site Settings
const siteSettingsSchema = {
  "kind": "singleType",
  "collectionName": "site_settings",
  "info": {
    "singularName": "site-settings",
    "pluralName": "site-settings",
    "displayName": "Site Settings",
    "description": "Paramètres globaux du site"
  },
  "options": {
    "draftAndPublish": false
  },
  "pluginOptions": {},
  "attributes": {
    "siteName": {
      "type": "string",
      "required": true,
      "default": "CMA Education"
    },
    "siteDescription": {
      "type": "text",
      "default": "Formation BTP en alternance, reconversion et VAE"
    },
    "contactPhone": {
      "type": "string",
      "default": "01 89 70 60 52"
    },
    "contactEmail": {
      "type": "string",
      "default": "contact.academy@cma-education.com"
    },
    "emailInscription": {
      "type": "string",
      "default": "inscription.academy@cma-education.com"
    },
    "contactAddress": {
      "type": "text",
      "default": "67-69 Avenue du Général de Gaulle, 77420 Champs sur Marne"
    },
    "socialMedia": {
      "type": "json"
    },
    "logo": {
      "type": "media",
      "multiple": false,
      "required": false,
      "allowedTypes": ["images"]
    },
    "favicon": {
      "type": "media",
      "multiple": false,
      "required": false,
      "allowedTypes": ["images"]
    },
    "seoTitle": {
      "type": "string",
      "default": "Formation BTP Alternance, Reconversion et VAE | CMA Education"
    },
    "seoDescription": {
      "type": "text",
      "default": "Formation conducteur de travaux, chargé d'affaires bâtiment en alternance. Formation BTP reconversion et VAE. 98% insertion, prise en charge OPCO."
    },
    "seoKeywords": {
      "type": "json"
    },
    "emailConfig": {
      "type": "json"
    }
  }
};

// Schéma pour Partner
const partnerSchema = {
  "kind": "collectionType",
  "collectionName": "partners",
  "info": {
    "singularName": "partner",
    "pluralName": "partners",
    "displayName": "Partner",
    "description": "Partenaires entreprises"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "name": {
      "type": "string",
      "required": true
    },
    "sector": {
      "type": "string"
    },
    "type": {
      "type": "string"
    },
    "effectifs": {
      "type": "string"
    },
    "projets": {
      "type": "text"
    },
    "description": {
      "type": "text"
    },
    "website": {
      "type": "string"
    },
    "logo": {
      "type": "media",
      "multiple": false,
      "required": false,
      "allowedTypes": ["images"]
    },
    "ordre": {
      "type": "integer",
      "default": 1
    },
    "featured": {
      "type": "boolean",
      "default": false
    }
  }
};

// Schéma pour Testimonial
const testimonialSchema = {
  "kind": "collectionType",
  "collectionName": "testimonials",
  "info": {
    "singularName": "testimonial",
    "pluralName": "testimonials",
    "displayName": "Testimonial",
    "description": "Témoignages d'étudiants et diplômés"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "name": {
      "type": "string",
      "required": true
    },
    "position": {
      "type": "string",
      "required": true
    },
    "company": {
      "type": "string"
    },
    "content": {
      "type": "text",
      "required": true
    },
    "rating": {
      "type": "integer",
      "min": 1,
      "max": 5,
      "default": 5
    },
    "photo": {
      "type": "media",
      "multiple": false,
      "required": false,
      "allowedTypes": ["images"]
    },
    "featured": {
      "type": "boolean",
      "default": false
    },
    "ordre": {
      "type": "integer",
      "default": 1
    },
    "formation": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::formation.formation"
    }
  }
};

function createContentType(name, schema) {
  const apiPath = path.join(__dirname, '..', 'cms-cma', 'src', 'api', name);
  const contentTypesPath = path.join(apiPath, 'content-types', name);
  const routesPath = path.join(apiPath, 'routes');
  const controllersPath = path.join(apiPath, 'controllers');
  const servicesPath = path.join(apiPath, 'services');

  // Créer les dossiers
  fs.mkdirSync(contentTypesPath, { recursive: true });
  fs.mkdirSync(routesPath, { recursive: true });
  fs.mkdirSync(controllersPath, { recursive: true });
  fs.mkdirSync(servicesPath, { recursive: true });

  // Créer le schéma
  fs.writeFileSync(
    path.join(contentTypesPath, 'schema.json'),
    JSON.stringify(schema, null, 2)
  );

  // Créer les routes
  const routesContent = `/**
 * ${name} router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::${name}.${name}');
`;

  fs.writeFileSync(
    path.join(routesPath, `${name}.ts`),
    routesContent
  );

  // Créer le controller
  const controllerContent = `/**
 * ${name} controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::${name}.${name}');
`;

  fs.writeFileSync(
    path.join(controllersPath, `${name}.ts`),
    controllerContent
  );

  // Créer le service
  const serviceContent = `/**
 * ${name} service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::${name}.${name}');
`;

  fs.writeFileSync(
    path.join(servicesPath, `${name}.ts`),
    serviceContent
  );

  console.log(`✅ Content type "${name}" créé avec succès`);
}

function createFormationsContentTypes() {
  console.log('🚀 Création des content types Formations critiques...\n');

  try {
    // Créer Formation Category
    createContentType('formation-category', formationCategorySchema);
    
    // Créer Formation
    createContentType('formation', formationSchema);
    
    // Créer Site Settings
    createContentType('site-settings', siteSettingsSchema);
    
    // Créer Partner
    createContentType('partner', partnerSchema);
    
    // Créer Testimonial
    createContentType('testimonial', testimonialSchema);

    console.log('\n✨ Tous les content types critiques ont été créés!');
    console.log('\n💡 Prochaines étapes:');
    console.log('  1. Redémarrer Strapi pour charger les nouveaux content types');
    console.log('  2. Configurer les permissions API dans l\'admin Strapi');
    console.log('  3. Importer les données avec les scripts d\'import');
    console.log('  4. Tester les nouveaux endpoints API');

  } catch (error) {
    console.error('\n❌ Erreur lors de la création des content types:', error.message);
  }
}

createFormationsContentTypes();