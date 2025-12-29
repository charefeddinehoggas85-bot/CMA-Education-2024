const fs = require('fs');
const path = require('path');

// Créer le content type modalites
const modalitesSchema = {
  "kind": "collectionType",
  "collectionName": "modalites",
  "info": {
    "singularName": "modalite",
    "pluralName": "modalites",
    "displayName": "Modalité de Formation",
    "description": "Modalités de formation (alternance, reconversion, VAE)"
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
      "type": "text",
      "required": true
    },
    "slug": {
      "type": "uid",
      "targetField": "titre",
      "required": true
    },
    "icon": {
      "type": "string",
      "required": true
    },
    "couleur": {
      "type": "string",
      "required": true
    },
    "lien": {
      "type": "string",
      "required": true
    },
    "ordre": {
      "type": "integer",
      "default": 0
    },
    "featured": {
      "type": "boolean",
      "default": true
    },
    "avantages": {
      "type": "component",
      "repeatable": true,
      "component": "formation.avantage"
    }
  }
};

// Créer le composant avantage
const avantageComponent = {
  "collectionName": "components_formation_avantages",
  "info": {
    "displayName": "Avantage",
    "description": "Avantage d'une modalité"
  },
  "options": {},
  "attributes": {
    "titre": {
      "type": "string",
      "required": true
    },
    "description": {
      "type": "text"
    },
    "icon": {
      "type": "string"
    }
  }
};

async function createModalitesContentType() {
  console.log('🚀 Création du content type Modalités...\n');

  // Créer le composant avantage
  const componentDir = 'cms-cma/src/components/formation';
  const componentFile = path.join(componentDir, 'avantage.json');

  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
    console.log(`📁 Dossier créé: ${componentDir}`);
  }

  fs.writeFileSync(componentFile, JSON.stringify(avantageComponent, null, 2));
  console.log('✅ Composant créé: formation.avantage');

  // Créer le content type modalites
  const apiDir = 'cms-cma/src/api/modalite';
  const contentTypeDir = `${apiDir}/content-types/modalite`;
  const schemaFile = `${contentTypeDir}/schema.json`;

  if (!fs.existsSync(contentTypeDir)) {
    fs.mkdirSync(contentTypeDir, { recursive: true });
    console.log(`📁 Dossier créé: ${contentTypeDir}`);
  }

  fs.writeFileSync(schemaFile, JSON.stringify(modalitesSchema, null, 2));
  console.log('✅ Content type créé: modalite');

  console.log('\n🎉 Content type Modalités créé avec succès !');
  console.log('\n⚠️  IMPORTANT: Redémarrez Strapi pour appliquer les changements:');
  console.log('   npm run cms:dev');
}

createModalitesContentType().catch(console.error);