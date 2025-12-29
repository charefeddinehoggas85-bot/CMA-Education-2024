#!/usr/bin/env node

const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

// Lire le fichier .env.local
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const envLines = envContent.split('\n');

let STRAPI_URL = 'http://localhost:1337';
let STRAPI_API_TOKEN = '';

for (const line of envLines) {
  if (line.startsWith('NEXT_PUBLIC_STRAPI_URL=')) {
    STRAPI_URL = line.split('=')[1].trim();
  }
  if (line.startsWith('STRAPI_API_TOKEN=')) {
    STRAPI_API_TOKEN = line.split('=')[1].trim();
  }
}

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${STRAPI_API_TOKEN}`,
};

async function checkArticles() {
  try {
    console.log('🔍 Vérification des articles existants...\n');

    const response = await fetch(
      `${STRAPI_URL}/api/articles-blog?populate=*`,
      { headers }
    );

    if (response.ok) {
      const result = await response.json();
      const articles = result.data || [];

      console.log(`📊 ${articles.length} article(s) trouvé(s):\n`);

      articles.forEach((article, index) => {
        console.log(`${index + 1}. ${article.attributes.titre}`);
        console.log(`   Slug: ${article.attributes.slug}`);
        console.log(`   Status: ${article.attributes.publishedAt ? 'Publié' : 'Brouillon'}`);
        console.log();
      });

      if (articles.length === 0) {
        console.log('✅ Aucun article trouvé. Prêt pour l\'import!');
      }
    } else {
      const error = await response.json();
      console.error('❌ Erreur:', error);
    }
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

checkArticles();
