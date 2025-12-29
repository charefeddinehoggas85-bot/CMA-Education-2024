#!/usr/bin/env node

const fetch = require('node-fetch');

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

async function testFeaturedArticles() {
  console.log('🧪 Test: Vérification des articles en vedette\n');
  
  try {
    // Test 1: Récupérer tous les articles
    console.log('📝 Test 1: Récupérer tous les articles...');
    const allResponse = await fetch(
      `${STRAPI_URL}/api/articles-blog?populate=*&sort=datePublication:desc`,
      {
        headers: {
          'Content-Type': 'application/json',
          ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` })
        }
      }
    );
    
    if (!allResponse.ok) {
      console.error(`❌ Erreur: ${allResponse.status} ${allResponse.statusText}`);
      return;
    }
    
    const allData = await allResponse.json();
    console.log(`✅ ${allData.data?.length || 0} articles trouvés\n`);
    
    if (allData.data && allData.data.length > 0) {
      console.log('📋 Premiers articles:');
      allData.data.slice(0, 3).forEach((article, i) => {
        console.log(`  ${i + 1}. "${article.attributes?.titre || 'Sans titre'}" (featured: ${article.attributes?.featured || false})`);
      });
      console.log();
    }
    
    // Test 2: Récupérer les articles en vedette
    console.log('⭐ Test 2: Récupérer les articles en vedette...');
    const featuredResponse = await fetch(
      `${STRAPI_URL}/api/articles-blog?filters[featured][$eq]=true&populate=*&sort=datePublication:desc`,
      {
        headers: {
          'Content-Type': 'application/json',
          ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` })
        }
      }
    );
    
    if (!featuredResponse.ok) {
      console.error(`❌ Erreur: ${featuredResponse.status} ${featuredResponse.statusText}`);
      return;
    }
    
    const featuredData = await featuredResponse.json();
    console.log(`✅ ${featuredData.data?.length || 0} articles en vedette trouvés\n`);
    
    if (featuredData.data && featuredData.data.length > 0) {
      console.log('⭐ Articles en vedette:');
      featuredData.data.forEach((article, i) => {
        console.log(`  ${i + 1}. "${article.attributes?.titre || 'Sans titre'}"`);
      });
    } else {
      console.log('⚠️  Aucun article marqué comme "featured" dans Strapi');
      console.log('💡 Solution: Allez dans Strapi Admin et cochez "Featured" pour au moins 1 article');
    }
    
    console.log('\n✅ Test terminé');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

testFeaturedArticles();
