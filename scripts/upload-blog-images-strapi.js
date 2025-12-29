#!/usr/bin/env node

const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || 'your-api-token';

const headers = {
  Authorization: `Bearer ${STRAPI_API_TOKEN}`,
};

// Mapping des articles et leurs images
const articleImages = [
  {
    slug: 'metiers-btp-2025',
    imagePath: 'public/images/blog/metiers-btp-2025.jpg'
  },
  {
    slug: 'guide-formation-btp',
    imagePath: 'public/images/blog/guide-formation-btp.jpg'
  },
  {
    slug: 'reconversion-40ans',
    imagePath: 'public/images/blog/reconversion-40ans.jpg'
  },
  {
    slug: 'alternance-btp',
    imagePath: 'public/images/blog/alternance-btp.jpg'
  },
  {
    slug: 'formation-bim',
    imagePath: 'public/images/blog/formation-bim.jpg'
  },
  {
    slug: 'conducteur-travaux',
    imagePath: 'public/images/blog/conducteur-travaux.jpg'
  },
  {
    slug: 'financement-formation',
    imagePath: 'public/images/blog/financement-formation.jpg'
  },
  {
    slug: 'centre-formation',
    imagePath: 'public/images/blog/centre-formation.jpg'
  },
  {
    slug: 'economiste-construction',
    imagePath: 'public/images/blog/economiste-construction.jpg'
  }
];

async function uploadImage(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️ Fichier non trouvé: ${filePath}`);
      return null;
    }

    const form = new FormData();
    form.append('files', fs.createReadStream(filePath));

    const response = await fetch(`${STRAPI_URL}/api/upload`, {
      method: 'POST',
      headers,
      body: form,
    });

    if (response.ok) {
      const result = await response.json();
      console.log(`✅ Image téléchargée: ${path.basename(filePath)}`);
      return result[0]?.id;
    } else {
      const error = await response.json();
      console.log(`⚠️ Erreur téléchargement:`, error.error?.message || error);
      return null;
    }
  } catch (error) {
    console.error(`❌ Erreur:`, error.message);
    return null;
  }
}

async function getArticleBySlug(slug) {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/articles-blog?filters[slug][$eq]=${slug}&populate=*`,
      { headers }
    );

    if (response.ok) {
      const result = await response.json();
      return result.data?.[0];
    }
    return null;
  } catch (error) {
    console.error(`❌ Erreur recherche article:`, error.message);
    return null;
  }
}

async function updateArticleImage(articleId, imageId) {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/articles-blog/${articleId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            imagePrincipale: imageId,
          },
        }),
      }
    );

    if (response.ok) {
      console.log(`✅ Image associée à l'article`);
      return true;
    } else {
      const error = await response.json();
      console.log(`⚠️ Erreur association image:`, error.error?.message || error);
      return false;
    }
  } catch (error) {
    console.error(`❌ Erreur:`, error.message);
    return false;
  }
}

async function uploadBlogImages() {
  console.log('🚀 Téléchargement des images du blog...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const item of articleImages) {
    try {
      console.log(`\n📸 Traitement de l'article: ${item.slug}`);

      // Récupérer l'article
      const article = await getArticleBySlug(item.slug);
      if (!article) {
        console.log(`⚠️ Article non trouvé: ${item.slug}`);
        errorCount++;
        continue;
      }

      // Télécharger l'image
      const imageId = await uploadImage(item.imagePath);
      if (!imageId) {
        console.log(`⚠️ Erreur téléchargement image pour: ${item.slug}`);
        errorCount++;
        continue;
      }

      // Associer l'image à l'article
      const updated = await updateArticleImage(article.id, imageId);
      if (updated) {
        successCount++;
      } else {
        errorCount++;
      }
    } catch (error) {
      console.error(`❌ Erreur traitement ${item.slug}:`, error.message);
      errorCount++;
    }
  }

  console.log('\n═══════════════════════════════════════════════════════════');
  console.log(`\n✅ Téléchargement terminé!`);
  console.log(`   ${successCount} image(s) téléchargée(s)`);
  console.log(`   ${errorCount} erreur(s)`);
  console.log('\n📋 Prochaines étapes:');
  console.log('1. Accédez à http://localhost:1337/admin');
  console.log('2. Allez dans Content Manager > Articles Blog');
  console.log('3. Vérifiez que les images sont bien associées');
  console.log('4. Visitez http://localhost:3000/blog pour voir les articles avec images');
  console.log('\n═══════════════════════════════════════════════════════════\n');
}

uploadBlogImages().catch(console.error);
