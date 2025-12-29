#!/usr/bin/env node

const fetch = require('node-fetch');

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || 'your-api-token';

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${STRAPI_API_TOKEN}`,
};

async function testStrapiAPI() {
  console.log('🧪 Test de l\'API Strapi Blog\n');

  try {
    // Test 1: Vérifier la connexion à Strapi
    console.log('1️⃣ Vérification de la connexion à Strapi...');
    const healthResponse = await fetch(`${STRAPI_URL}/api/health`);
    if (healthResponse.ok) {
      console.log('✅ Strapi est accessible\n');
    } else {
      console.log('❌ Strapi n\'est pas accessible\n');
      return;
    }

    // Test 2: Récupérer les catégories
    console.log('2️⃣ Récupération des catégories...');
    const categoriesResponse = await fetch(
      `${STRAPI_URL}/api/categories-blog?populate=*`,
      { headers }
    );
    if (categoriesResponse.ok) {
      const categoriesData = await categoriesResponse.json();
      const count = categoriesData.data?.length || 0;
      console.log(`✅ ${count} catégorie(s) trouvée(s)\n`);
      if (count > 0) {
        console.log('Catégories:');
        categoriesData.data.forEach((cat) => {
          console.log(`  - ${cat.attributes.nom} (${cat.attributes.slug})`);
        });
        console.log();
      }
    } else {
      console.log('❌ Erreur récupération catégories\n');
    }

    // Test 3: Récupérer les articles
    console.log('3️⃣ Récupération des articles...');
    const articlesResponse = await fetch(
      `${STRAPI_URL}/api/articles-blog?populate=*&sort=datePublication:desc`,
      { headers }
    );
    if (articlesResponse.ok) {
      const articlesData = await articlesResponse.json();
      const count = articlesData.data?.length || 0;
      console.log(`✅ ${count} article(s) trouvé(s)\n`);
      if (count > 0) {
        console.log('Articles:');
        articlesData.data.slice(0, 5).forEach((article) => {
          console.log(`  - ${article.attributes.titre} (${article.attributes.slug})`);
          console.log(`    Auteur: ${article.attributes.auteur}`);
          console.log(`    Date: ${new Date(article.attributes.datePublication).toLocaleDateString('fr-FR')}`);
        });
        console.log();
      }
    } else {
      console.log('❌ Erreur récupération articles\n');
    }

    // Test 4: Récupérer un article spécifique
    console.log('4️⃣ Récupération d\'un article spécifique...');
    const singleArticleResponse = await fetch(
      `${STRAPI_URL}/api/articles-blog?filters[slug][$eq]=tendances-btp-2024&populate=*`,
      { headers }
    );
    if (singleArticleResponse.ok) {
      const singleArticleData = await singleArticleResponse.json();
      if (singleArticleData.data?.length > 0) {
        const article = singleArticleData.data[0];
        console.log(`✅ Article trouvé: ${article.attributes.titre}\n`);
      } else {
        console.log('⚠️ Article "tendances-btp-2024" non trouvé\n');
      }
    } else {
      console.log('❌ Erreur récupération article\n');
    }

    // Test 5: Vérifier les permissions publiques
    console.log('5️⃣ Vérification des permissions publiques...');
    const publicArticlesResponse = await fetch(
      `${STRAPI_URL}/api/articles-blog?populate=*`
    );
    if (publicArticlesResponse.ok) {
      console.log('✅ Les articles sont accessibles publiquement\n');
    } else {
      console.log('⚠️ Les articles ne sont pas accessibles publiquement\n');
      console.log('   Configurez les permissions pour le rôle "Public"\n');
    }

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

async function testFrontend() {
  console.log('🧪 Test du Frontend Blog\n');

  try {
    // Test 1: Vérifier la page blog
    console.log('1️⃣ Vérification de la page blog...');
    const blogPageResponse = await fetch(`${FRONTEND_URL}/blog`);
    if (blogPageResponse.ok) {
      console.log('✅ Page blog accessible\n');
    } else {
      console.log('❌ Page blog non accessible\n');
      return;
    }

    // Test 2: Vérifier une page d'article
    console.log('2️⃣ Vérification d\'une page d\'article...');
    const articlePageResponse = await fetch(`${FRONTEND_URL}/blog/tendances-btp-2024`);
    if (articlePageResponse.ok) {
      console.log('✅ Page article accessible\n');
    } else {
      console.log('⚠️ Page article non accessible (article peut ne pas exister)\n');
    }

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

async function runTests() {
  console.log('═══════════════════════════════════════════════════════════\n');
  console.log('🚀 Tests du Blog Strapi\n');
  console.log('═══════════════════════════════════════════════════════════\n');

  await testStrapiAPI();
  await testFrontend();

  console.log('═══════════════════════════════════════════════════════════\n');
  console.log('✅ Tests terminés!\n');
  console.log('📋 Prochaines étapes:');
  console.log('1. Accédez à http://localhost:3000/blog');
  console.log('2. Vérifiez que les articles s\'affichent');
  console.log('3. Testez la recherche et les filtres');
  console.log('4. Cliquez sur un article pour voir la page détail');
  console.log('5. Modifiez un article dans Strapi et vérifiez la mise à jour\n');
}

runTests().catch(console.error);
