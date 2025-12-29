const fs = require('fs');
const path = require('path');

// Créer les content types manquants pour finaliser la migration

const contentTypes = [
  {
    name: 'gallery',
    schema: {
      "kind": "collectionType",
      "collectionName": "galleries",
      "info": {
        "singularName": "gallery",
        "pluralName": "galleries",
        "displayName": "Gallery",
        "description": "Galeries d'images pour les pages"
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
        "description": {
          "type": "text"
        },
        "slug": {
          "type": "uid",
          "targetField": "titre",
          "required": true
        },
        "images": {
          "type": "media",
          "multiple": true,
          "required": false,
          "allowedTypes": ["images"]
        },
        "page": {
          "type": "string",
          "required": false
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
  },
  {
    name: 'faq',
    schema: {
      "kind": "collectionType",
      "collectionName": "faqs",
      "info": {
        "singularName": "faq",
        "pluralName": "faqs",
        "displayName": "FAQ",
        "description": "Questions fréquemment posées"
      },
      "options": {
        "draftAndPublish": true
      },
      "pluginOptions": {},
      "attributes": {
        "question": {
          "type": "string",
          "required": true
        },
        "reponse": {
          "type": "richtext",
          "required": true
        },
        "categorie": {
          "type": "enumeration",
          "enum": ["formations", "admissions", "alternance", "vae", "entreprises", "general"],
          "default": "general"
        },
        "ordre": {
          "type": "integer",
          "default": 0
        },
        "featured": {
          "type": "boolean",
          "default": false
        },
        "page": {
          "type": "string",
          "required": false
        }
      }
    }
  },
  {
    name: 'seo-setting',
    schema: {
      "kind": "collectionType",
      "collectionName": "seo_settings",
      "info": {
        "singularName": "seo-setting",
        "pluralName": "seo-settings",
        "displayName": "SEO Settings",
        "description": "Paramètres SEO pour les pages"
      },
      "options": {
        "draftAndPublish": true
      },
      "pluginOptions": {},
      "attributes": {
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
          "type": "text"
        },
        "ogTitle": {
          "type": "string"
        },
        "ogDescription": {
          "type": "text"
        },
        "ogImage": {
          "type": "media",
          "multiple": false,
          "required": false,
          "allowedTypes": ["images"]
        },
        "canonicalUrl": {
          "type": "string"
        },
        "noIndex": {
          "type": "boolean",
          "default": false
        },
        "structuredData": {
          "type": "json"
        }
      }
    }
  },
  {
    name: 'navigation-menu',
    schema: {
      "kind": "collectionType",
      "collectionName": "navigation_menus",
      "info": {
        "singularName": "navigation-menu",
        "pluralName": "navigation-menus",
        "displayName": "Navigation Menu",
        "description": "Éléments de navigation dynamiques"
      },
      "options": {
        "draftAndPublish": true
      },
      "pluginOptions": {},
      "attributes": {
        "label": {
          "type": "string",
          "required": true
        },
        "url": {
          "type": "string",
          "required": true
        },
        "ordre": {
          "type": "integer",
          "default": 0
        },
        "parent": {
          "type": "relation",
          "relation": "manyToOne",
          "target": "api::navigation-menu.navigation-menu",
          "inversedBy": "children"
        },
        "children": {
          "type": "relation",
          "relation": "oneToMany",
          "target": "api::navigation-menu.navigation-menu",
          "mappedBy": "parent"
        },
        "icon": {
          "type": "string"
        },
        "description": {
          "type": "text"
        },
        "featured": {
          "type": "boolean",
          "default": false
        },
        "external": {
          "type": "boolean",
          "default": false
        }
      }
    }
  },
  {
    name: 'contact-info',
    schema: {
      "kind": "singleType",
      "collectionName": "contact_infos",
      "info": {
        "singularName": "contact-info",
        "pluralName": "contact-infos",
        "displayName": "Contact Info",
        "description": "Informations de contact complètes"
      },
      "options": {
        "draftAndPublish": true
      },
      "pluginOptions": {},
      "attributes": {
        "adressePrincipale": {
          "type": "component",
          "repeatable": false,
          "component": "contact.adresse"
        },
        "adressesSecondaires": {
          "type": "component",
          "repeatable": true,
          "component": "contact.adresse"
        },
        "telephones": {
          "type": "component",
          "repeatable": true,
          "component": "contact.telephone"
        },
        "emails": {
          "type": "component",
          "repeatable": true,
          "component": "contact.email"
        },
        "reseauxSociaux": {
          "type": "component",
          "repeatable": true,
          "component": "contact.reseau-social"
        },
        "horairesOuverture": {
          "type": "component",
          "repeatable": true,
          "component": "contact.horaire"
        },
        "coordonneesGPS": {
          "type": "component",
          "repeatable": false,
          "component": "contact.coordonnees-gps"
        }
      }
    }
  }
];

// Créer les composants nécessaires
const components = [
  {
    name: 'contact.adresse',
    path: 'cms-cma/src/components/contact',
    file: 'adresse.json',
    schema: {
      "collectionName": "components_contact_adresses",
      "info": {
        "displayName": "Adresse",
        "description": "Adresse complète"
      },
      "options": {},
      "attributes": {
        "nom": {
          "type": "string",
          "required": true
        },
        "rue": {
          "type": "string",
          "required": true
        },
        "ville": {
          "type": "string",
          "required": true
        },
        "codePostal": {
          "type": "string",
          "required": true
        },
        "pays": {
          "type": "string",
          "default": "France"
        },
        "complement": {
          "type": "string"
        }
      }
    }
  },
  {
    name: 'contact.telephone',
    path: 'cms-cma/src/components/contact',
    file: 'telephone.json',
    schema: {
      "collectionName": "components_contact_telephones",
      "info": {
        "displayName": "Téléphone",
        "description": "Numéro de téléphone"
      },
      "options": {},
      "attributes": {
        "numero": {
          "type": "string",
          "required": true
        },
        "type": {
          "type": "enumeration",
          "enum": ["fixe", "mobile", "fax"],
          "default": "fixe"
        },
        "label": {
          "type": "string",
          "required": true
        },
        "principal": {
          "type": "boolean",
          "default": false
        }
      }
    }
  },
  {
    name: 'contact.email',
    path: 'cms-cma/src/components/contact',
    file: 'email.json',
    schema: {
      "collectionName": "components_contact_emails",
      "info": {
        "displayName": "Email",
        "description": "Adresse email"
      },
      "options": {},
      "attributes": {
        "email": {
          "type": "email",
          "required": true
        },
        "type": {
          "type": "enumeration",
          "enum": ["contact", "inscription", "commercial", "support", "rh"],
          "default": "contact"
        },
        "label": {
          "type": "string",
          "required": true
        },
        "principal": {
          "type": "boolean",
          "default": false
        }
      }
    }
  },
  {
    name: 'contact.reseau-social',
    path: 'cms-cma/src/components/contact',
    file: 'reseau-social.json',
    schema: {
      "collectionName": "components_contact_reseaux_sociaux",
      "info": {
        "displayName": "Réseau Social",
        "description": "Réseau social"
      },
      "options": {},
      "attributes": {
        "nom": {
          "type": "string",
          "required": true
        },
        "url": {
          "type": "string",
          "required": true
        },
        "icon": {
          "type": "string"
        },
        "actif": {
          "type": "boolean",
          "default": true
        }
      }
    }
  },
  {
    name: 'contact.horaire',
    path: 'cms-cma/src/components/contact',
    file: 'horaire.json',
    schema: {
      "collectionName": "components_contact_horaires",
      "info": {
        "displayName": "Horaire",
        "description": "Horaire d'ouverture"
      },
      "options": {},
      "attributes": {
        "jour": {
          "type": "enumeration",
          "enum": ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"],
          "required": true
        },
        "ouverture": {
          "type": "time"
        },
        "fermeture": {
          "type": "time"
        },
        "ferme": {
          "type": "boolean",
          "default": false
        },
        "note": {
          "type": "string"
        }
      }
    }
  },
  {
    name: 'contact.coordonnees-gps',
    path: 'cms-cma/src/components/contact',
    file: 'coordonnees-gps.json',
    schema: {
      "collectionName": "components_contact_coordonnees_gps",
      "info": {
        "displayName": "Coordonnées GPS",
        "description": "Coordonnées GPS"
      },
      "options": {},
      "attributes": {
        "latitude": {
          "type": "decimal",
          "required": true
        },
        "longitude": {
          "type": "decimal",
          "required": true
        },
        "zoom": {
          "type": "integer",
          "default": 15
        }
      }
    }
  }
];

async function createContentTypes() {
  console.log('🚀 Création des content types manquants...\n');

  // Créer les composants d'abord
  for (const component of components) {
    const componentDir = component.path;
    const componentFile = path.join(componentDir, component.file);

    // Créer le dossier si nécessaire
    if (!fs.existsSync(componentDir)) {
      fs.mkdirSync(componentDir, { recursive: true });
      console.log(`📁 Dossier créé: ${componentDir}`);
    }

    // Créer le fichier de composant
    fs.writeFileSync(componentFile, JSON.stringify(component.schema, null, 2));
    console.log(`✅ Composant créé: ${component.name}`);
  }

  // Créer les content types
  for (const contentType of contentTypes) {
    const apiDir = `cms-cma/src/api/${contentType.name}`;
    const contentTypeDir = `${apiDir}/content-types/${contentType.name}`;
    const schemaFile = `${contentTypeDir}/schema.json`;

    // Créer les dossiers
    if (!fs.existsSync(contentTypeDir)) {
      fs.mkdirSync(contentTypeDir, { recursive: true });
      console.log(`📁 Dossier créé: ${contentTypeDir}`);
    }

    // Créer le fichier schema
    fs.writeFileSync(schemaFile, JSON.stringify(contentType.schema, null, 2));
    console.log(`✅ Content type créé: ${contentType.name}`);
  }

  console.log('\n🎉 Tous les content types manquants ont été créés !');
  console.log('\n📋 Content types créés:');
  contentTypes.forEach(ct => console.log(`   - ${ct.name}`));
  
  console.log('\n📋 Composants créés:');
  components.forEach(comp => console.log(`   - ${comp.name}`));

  console.log('\n⚠️  IMPORTANT: Redémarrez Strapi pour appliquer les changements:');
  console.log('   npm run cms:dev');
}

createContentTypes().catch(console.error);