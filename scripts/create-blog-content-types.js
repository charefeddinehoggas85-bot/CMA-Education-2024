/**
 * Création des content types Blog pour Strapi
 * Usage: node scripts/create-blog-content-types.js
 */

const fs = require('fs');
const path = require('path');

// Schéma pour Catégorie Blog
const categorieBlogSchema = {
  "kind": "collectionType",
  "collectionName": "categories_blog",
  "info": {
    "singularName": "categorie-blog",
    "pluralName": "categories-blog",
    "displayName": "Catégorie Blog",
    "description": "Catégories pour les articles de blog"
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
    "slug": {
      "type": "uid",
      "targetField": "nom"
    },
    "description": {
      "type": "text"
    },
    "couleur": {
      "type": "string",
      "default": "#3B82F6"
    },
    "articles": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::article-blog.article-blog",
      "mappedBy": "categorie"
    }
  }
};

// Schéma pour Article Blog
const articleBlogSchema = {
  "kind": "collectionType",
  "collectionName": "articles_blog",
  "info": {
    "singularName": "article-blog",
    "pluralName": "articles-blog",
    "displayName": "Article Blog",
    "description": "Articles de blog du site"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "titre": {
      "type": "string",
      "required": true
    },
    "slug": {
      "type": "uid",
      "targetField": "titre"
    },
    "extrait": {
      "type": "text",
      "required": true
    },
    "contenu": {
      "type": "richtext"
    },
    "auteur": {
      "type": "string",
      "required": true
    },
    "datePublication": {
      "type": "date",
      "required": true
    },
    "tempsLecture": {
      "type": "string",
      "default": "5 min"
    },
    "image": {
      "type": "media",
      "multiple": false,
      "required": false,
      "allowedTypes": ["images"]
    },
    "featured": {
      "type": "boolean",
      "default": false
    },
    "tags": {
      "type": "json"
    },
    "categorie": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::categorie-blog.categorie-blog",
      "inversedBy": "articles"
    },
    "formationsLiees": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::formation.formation"
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

// Schéma pour Formateur
const formateurSchema = {
  "kind": "collectionType",
  "collectionName": "formateurs",
  "info": {
    "singularName": "formateur",
    "pluralName": "formateurs",
    "displayName": "Formateur",
    "description": "Formateurs et intervenants"
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
    "prenom": {
      "type": "string",
      "required": true
    },
    "poste": {
      "type": "string",
      "required": true
    },
    "specialites": {
      "type": "json"
    },
    "experience": {
      "type": "text"
    },
    "photo": {
      "type": "media",
      "multiple": false,
      "required": false,
      "allowedTypes": ["images"]
    },
    "biographie": {
      "type": "richtext"
    },
    "linkedin": {
      "type": "string"
    },
    "formations": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::formation.formation"
    },
    "ordre": {
      "type": "integer",
      "default": 1
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

function createBlogContentTypes() {
  console.log('🚀 Création des content types Blog...\n');

  try {
    // Créer Catégorie Blog
    createContentType('categorie-blog', categorieBlogSchema);
    
    // Créer Article Blog
    createContentType('article-blog', articleBlogSchema);
    
    // Créer Formateur
    createContentType('formateur', formateurSchema);

    console.log('\n✨ Tous les content types Blog ont été créés!');
    console.log('\n💡 Prochaines étapes:');
    console.log('  1. Redémarrer Strapi pour charger les nouveaux content types');
    console.log('  2. Configurer les permissions API dans l\'admin Strapi');
    console.log('  3. Importer les données avec les scripts d\'import');
    console.log('  4. Tester les nouveaux endpoints API');

  } catch (error) {
    console.error('\n❌ Erreur lors de la création des content types:', error.message);
  }
}

createBlogContentTypes();