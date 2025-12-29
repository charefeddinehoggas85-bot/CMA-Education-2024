const fs = require('fs');
const path = require('path');

// Créer les content types manquants avec les noms d'API exacts
async function createExactMissingAPIs() {
  console.log('🚀 Création des APIs manquantes avec noms exacts...\n');

  // Les APIs manquantes détectées par le monitoring
  const missingAPIs = [
    {
      apiName: 'galleries',
      singularName: 'gallery',
      pluralName: 'galleries',
      displayName: 'Gallery'
    },
    {
      apiName: 'faqs', 
      singularName: 'faq',
      pluralName: 'faqs',
      displayName: 'FAQ'
    },
    {
      apiName: 'seo-settings',
      singularName: 'seo-setting', 
      pluralName: 'seo-settings',
      displayName: 'SEO Setting'
    },
    {
      apiName: 'navigation-menus',
      singularName: 'navigation-menu',
      pluralName: 'navigation-menus', 
      displayName: 'Navigation Menu'
    },
    {
      apiName: 'contact-info',
      singularName: 'contact-info',
      pluralName: 'contact-infos',
      displayName: 'Contact Info'
    },
    {
      apiName: 'modalites',
      singularName: 'modalite',
      pluralName: 'modalites',
      displayName: 'Modalité'
    }
  ];

  for (const api of missingAPIs) {
    try {
      // Créer le dossier du content type
      const contentTypeDir = path.join('cms-cma', 'src', 'api', api.apiName, 'content-types', api.singularName);
      
      if (!fs.existsSync(contentTypeDir)) {
        fs.mkdirSync(contentTypeDir, { recursive: true });
      }

      // Créer le schema.json
      const schema = {
        "kind": "collectionType",
        "collectionName": api.pluralName.replace(/-/g, '_'),
        "info": {
          "singularName": api.singularName,
          "pluralName": api.pluralName,
          "displayName": api.displayName,
          "description": `Content type for ${api.displayName}`
        },
        "options": {
          "draftAndPublish": true
        },
        "pluginOptions": {},
        "attributes": getAttributesForAPI(api.apiName)
      };

      const schemaPath = path.join(contentTypeDir, 'schema.json');
      fs.writeFileSync(schemaPath, JSON.stringify(schema, null, 2));

      console.log(`✅ API créée: /api/${api.apiName}`);
      console.log(`   📁 ${schemaPath}`);
      console.log(`   🔗 Endpoint: http://localhost:1337/api/${api.apiName}`);

    } catch (error) {
      console.log(`❌ Erreur création ${api.apiName}:`, error.message);
    }
  }

  console.log('\n🎉 Toutes les APIs manquantes ont été créées !');
  console.log('\n📋 APIs créées:');
  missingAPIs.forEach(api => {
    console.log(`   - /api/${api.apiName} (${api.displayName})`);
  });
  
  console.log('\n⚠️  IMPORTANT: Redémarrez Strapi pour appliquer les changements:');
  console.log('   1. Arrêter Strapi (Ctrl+C)');
  console.log('   2. Relancer: npm run develop dans cms-cma/');
  console.log('   3. Configurer les permissions dans l\'admin');
  console.log('\n🎯 Après redémarrage + permissions: 100% (15/15) APIs !');
}

function getAttributesForAPI(apiName) {
  switch (apiName) {
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
          "allowedTypes": ["images"]
        },
        "category": {
          "type": "string"
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
        },
        "isActive": {
          "type": "boolean",
          "default": true
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
        },
        "canonicalUrl": {
          "type": "string"
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
        },
        "isActive": {
          "type": "boolean",
          "default": true
        }
      };

    case 'contact-info':
      return {
        "type": {
          "type": "enumeration",
          "enum": ["address", "phone", "email", "hours", "social", "gps"],
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
        },
        "isActive": {
          "type": "boolean",
          "default": true
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
        },
        "isActive": {
          "type": "boolean",
          "default": true
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
        },
        "isActive": {
          "type": "boolean",
          "default": true
        }
      };
  }
}

createExactMissingAPIs().catch(console.error);