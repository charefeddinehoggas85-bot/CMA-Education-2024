const http = require('http');

// Configuration des content types pour le header
const headerContentTypes = {
  'site-settings': {
    "kind": "singleType",
    "collectionName": "site_settings",
    "info": {
      "singularName": "site-settings",
      "pluralName": "site-settings",
      "displayName": "Paramètres du Site",
      "description": "Configuration générale du site (logo, nom, contact, etc.)"
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
        "type": "text"
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
      "contactPhone": {
        "type": "string",
        "default": "01 89 70 60 52"
      },
      "contactEmail": {
        "type": "email",
        "default": "contact.academy@cma-education.com"
      },
      "contactAddress": {
        "type": "text"
      },
      "socialMedia": {
        "type": "json"
      },
      "headerCTA": {
        "type": "component",
        "repeatable": false,
        "component": "ui.button-config"
      },
      "seoTitle": {
        "type": "string"
      },
      "seoDescription": {
        "type": "text"
      },
      "seoKeywords": {
        "type": "string"
      }
    }
  },
  
  'main-navigation': {
    "kind": "collectionType",
    "collectionName": "main_navigations",
    "info": {
      "singularName": "main-navigation",
      "pluralName": "main-navigations",
      "displayName": "Navigation Principale",
      "description": "Éléments de navigation du header"
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
        "default": 1
      },
      "icon": {
        "type": "string"
      },
      "featured": {
        "type": "boolean",
        "default": true
      },
      "external": {
        "type": "boolean",
        "default": false
      },
      "description": {
        "type": "text"
      }
    }
  }
};

// Composant pour le bouton CTA
const buttonComponent = {
  "collectionName": "components_ui_button_configs",
  "info": {
    "displayName": "Button Config",
    "description": "Configuration d'un bouton (CTA, etc.)"
  },
  "options": {},
  "attributes": {
    "text": {
      "type": "string",
      "required": true,
      "default": "Candidater"
    },
    "url": {
      "type": "string",
      "required": true,
      "default": "/contact"
    },
    "variant": {
      "type": "enumeration",
      "enum": ["primary", "secondary", "neon", "outline"],
      "default": "neon"
    },
    "size": {
      "type": "enumeration", 
      "enum": ["sm", "md", "lg"],
      "default": "md"
    },
    "icon": {
      "type": "string"
    },
    "external": {
      "type": "boolean",
      "default": false
    }
  }
};

async function setupHeaderStrapi() {
  console.log('🚀 Configuration du header Strapi...\n');
  
  try {
    // 1. Créer le composant bouton
    console.log('1️⃣ Création du composant Button Config...');
    await createComponent('ui.button-config', buttonComponent);
    
    // 2. Créer les content types
    for (const [name, schema] of Object.entries(headerContentTypes)) {
      console.log(`2️⃣ Création du content type: ${name}...`);
      await createContentType(name, schema);
    }
    
    // 3. Ajouter des données par défaut
    console.log('3️⃣ Ajout des données par défaut...');
    await addDefaultData();
    
    console.log('\n✅ Configuration du header terminée !');
    console.log('\n📋 Vous pouvez maintenant gérer depuis Strapi :');
    console.log('   - Logo et nom du site');
    console.log('   - Navigation principale');
    console.log('   - Bouton CTA du header');
    console.log('   - Informations de contact');
    console.log('   - Réseaux sociaux');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

function createComponent(name, schema) {
  return makeRequest('POST', '/content-type-builder/components', {
    component: {
      uid: `ui.button-config`,
      category: 'ui',
      ...schema
    }
  });
}

function createContentType(name, schema) {
  return makeRequest('POST', '/content-type-builder/content-types', {
    contentType: {
      uid: `api::${name}.${name}`,
      ...schema
    }
  });
}

async function addDefaultData() {
  // Données par défaut pour site-settings
  const siteSettingsData = {
    data: {
      siteName: "CMA Education",
      siteDescription: "Centre de formation BTP d'excellence",
      contactPhone: "01 89 70 60 52",
      contactEmail: "contact.academy@cma-education.com",
      contactAddress: "67-69 Avenue du Général de Gaulle, 77420 Champs sur Marne",
      headerCTA: {
        text: "Candidater",
        url: "/contact",
        variant: "neon",
        size: "md",
        external: false
      },
      seoTitle: "Formation BTP Alternance, Reconversion et VAE | CMA Education",
      seoDescription: "Formation conducteur de travaux, chargé d'affaires bâtiment en alternance. Formation BTP reconversion et VAE. 98% insertion, prise en charge OPCO."
    }
  };
  
  // Navigation par défaut
  const navigationItems = [
    { label: "Accueil", url: "/", ordre: 1, featured: true, external: false },
    { label: "À propos", url: "/about", ordre: 2, featured: true, external: false },
    { label: "Pédagogie", url: "/pedagogie", ordre: 3, featured: true, external: false },
    { label: "Partenaires", url: "/partenaires", ordre: 4, featured: true, external: false },
    { label: "Contact", url: "/contact", ordre: 5, featured: true, external: false }
  ];
  
  try {
    // Créer site-settings
    await makeRequest('PUT', '/site-settings', siteSettingsData);
    console.log('   ✅ Site settings créés');
    
    // Créer navigation items
    for (const item of navigationItems) {
      await makeRequest('POST', '/main-navigations', { data: item });
    }
    console.log('   ✅ Navigation créée');
    
  } catch (error) {
    console.log('   ⚠️ Données par défaut: certaines existent déjà');
  }
}

function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 1337,
      path: `/api${path}`,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(responseData || '{}'));
        } else {
          reject(new Error(`${res.statusCode}: ${res.statusMessage}`));
        }
      });
    });

    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

setupHeaderStrapi();