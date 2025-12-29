#!/usr/bin/env node

const fetch = require('node-fetch');

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || 'your-api-token';

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${STRAPI_API_TOKEN}`,
};

async function createContentType(name, singularName, pluralName, attributes) {
  try {
    console.log(`\n📝 Création du content type: ${name}`);
    
    const response = await fetch(`${STRAPI_URL}/api/content-types`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name,
        singularName,
        pluralName,
        attributes,
      }),
    });

    if (response.ok) {
      console.log(`✅ Content type ${name} créé avec succès`);
      return true;
    } else {
      const error = await response.text();
      console.log(`⚠️ Content type ${name} existe probablement déjà`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Erreur création ${name}:`, error.message);
    return false;
  }
}

async function setupBlogContentTypes() {
  console.log('🚀 Configuration des content types Blog...\n');

  // Content Type: Catégorie Blog
  await createContentType(
    'Catégorie Blog',
    'categorie-blog',
    'categories-blog',
    {
      nom: {
        type: 'string',
        required: true,
      },
      slug: {
        type: 'uid',
        targetField: 'nom',
        required: true,
      },
      description: {
        type: 'text',
      },
      couleur: {
        type: 'string',
        default: '#000000',
      },
      ordre: {
        type: 'integer',
        default: 0,
      },
      articles: {
        type: 'relation',
        relation: 'oneToMany',
        target: 'api::article-blog.article-blog',
        mappedBy: 'categorie',
      },
    }
  );

  // Content Type: Article Blog
  await createContentType(
    'Article Blog',
    'article-blog',
    'articles-blog',
    {
      titre: {
        type: 'string',
        required: true,
      },
      slug: {
        type: 'uid',
        targetField: 'titre',
        required: true,
      },
      resume: {
        type: 'text',
        required: true,
      },
      contenu: {
        type: 'richtext',
        required: true,
      },
      imagePrincipale: {
        type: 'media',
        multiple: false,
      },
      datePublication: {
        type: 'datetime',
        required: true,
      },
      auteur: {
        type: 'string',
        default: 'Équipe CMA',
      },
      featured: {
        type: 'boolean',
        default: false,
      },
      categorie: {
        type: 'relation',
        relation: 'manyToOne',
        target: 'api::categorie-blog.categorie-blog',
        inversedBy: 'articles',
      },
      ordre: {
        type: 'integer',
        default: 0,
      },
    }
  );

  console.log('\n✅ Configuration des content types Blog terminée!');
  console.log('\n📋 Prochaines étapes:');
  console.log('1. Accédez à http://localhost:1337/admin');
  console.log('2. Allez dans Content Manager');
  console.log('3. Créez des catégories de blog');
  console.log('4. Créez des articles de blog');
  console.log('5. Configurez les permissions pour les rôles');
}

setupBlogContentTypes().catch(console.error);
