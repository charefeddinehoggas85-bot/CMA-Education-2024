const fs = require('fs');
const path = require('path');

// Créer les content types manquants avec les bons noms d'API
async function createFinalMissingContentTypes() {
  console.log('🚀 Création des content types manquants finaux...\n');

  const contentTypes = [
    {
      name: 'galleries',
      displayName: 'Gallery',
      singularName: 'gallery',
      pluralName: 'galleries'
    },
    {
      name: 'faqs',
      displayName: 'FAQ',
      singularName: 'faq',
      pluralName: 'faqs'
    },
    {
      name: 'seo-settings',
      displayName: 'SEO Setting',
      singularName: 'seo-setting',
      pluralName: 'seo-settings'
    },
    {
      name: 'navigation-menus',
      displayName: 'Navigation Menu',
      singularName: 'navigation-menu',
      pluralName: 'navigation-menus'
    },
    {
      name: 'contact-info',
      displayName: 'Contact Info',
      singularName: 'contact-info',
      pluralName: 'contact-infos'
    },
    {
      name: 'modalites',
      displayName: 'Modalité',
      singularName: 'modalite',
      pluralName: 'modalites'
    }
  ];

  for (const contentType of contentTypes) {
    try {
      // Créer le dossier du content type
      const contentTypeDir = path.join('cms-cma', 'src', 'api', contentType.name, 'content-types', contentType.singularName);
      
      if (!fs.existsSync(contentTypeDir)) {
        fs.mkdirSync(contentTypeDir, { recursive: true });
      }

      // Créer le schema.json
      const schema = {
        "kind": "collectionType",
        "collectionName": contentType.pluralName.replace('-', '_'),
        "info": {
          "singularName": contentType.singularName,
          "pluralName": contentType.pluralName,
          "displayName": contentType.displayName,
          "description": ""
        },
        "options": {
          "draftAndPublish": true
        },
        "pluginOptions": {},
        "attributes": getAttributesForContentType(contentType.name)
      };

      const schemaPath = path.join(contentTypeDir, 'schema.json');
      fs.writeFileSync(schemaPath, JSON.stringify(schema, null, 2));

      console.log(`✅ Content type créé: ${contentType.name}`);
      console.log(`   📁 ${schemaPath}`);

    } catch (error) {
      console.log(`❌ Erreur création ${contentType.name}:`, error.message);
    }
  }

  console.log('\n🎉 Tous les content types manquants ont été créés !');
  console.log('\n⚠️  IMPORTANT: Redémarrez Strapi pour appliquer les changements:');
  console.log('   Ctrl+C puis npm run develop dans cms-cma/');
}

function getAttributesForContentType(name) {
  switch (name) {
    case 'galleries':
      return {
        "title": {
          "type": "string",
          "required": true
        },
        "description": {
          "type": "text"
        },
        "images": {
          "type": "media",
          "multiple": true,
          "required": false,
          "allowedTypes": ["images"]
        }
      };

    case 'faqs':
      return {
        "question": {
          "type": "string",
          "required": true
        },
        "answer": {
          "type": "text",
          "required": true
        },
        "category": {
          "type": "string"
        },
        "order": {
          "type": "integer",
          "default": 0
        }
      };

    case 'seo-settings':
      return {
        "page": {
          "type": "string",
          "required": true,
          "unique": true
        },
        "title": {
          "type": "string",
          "required": true
        },
        "description": {
          "type": "text",
          "required": true
        },
        "keywords": {
          "type": "string"
        },
        "ogImage": {
          "type": "media",
          "multiple": false,
          "allowedTypes": ["images"]
        }
      };

    case 'navigation-menus':
      return {
        "name": {
          "type": "string",
          "required": true
        },
        "items": {
          "type": "json",
          "required": true
        },
        "position": {
          "type": "enumeration",
          "enum": ["header", "footer", "sidebar"],
          "default": "header"
        }
      };

    case 'contact-info':
      return {
        "type": {
          "type": "enumeration",
          "enum": ["address", "phone", "email", "hours", "social"],
          "required": true
        },
        "label": {
          "type": "string",
          "required": true
        },
        "value": {
          "type": "string",
          "required": true
        },
        "icon": {
          "type": "string"
        },
        "order": {
          "type": "integer",
          "default": 0
        }
      };

    case 'modalites':
      return {
        "title": {
          "type": "string",
          "required": true
        },
        "description": {
          "type": "text",
          "required": true
        },
        "duration": {
          "type": "string"
        },
        "format": {
          "type": "enumeration",
          "enum": ["presentiel", "distanciel", "hybride"],
          "default": "presentiel"
        },
        "price": {
          "type": "decimal"
        },
        "icon": {
          "type": "string"
        }
      };

    default:
      return {
        "title": {
          "type": "string",
          "required": true
        },
        "description": {
          "type": "text"
        }
      };
  }
}

createFinalMissingContentTypes().catch(console.error);