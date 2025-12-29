#!/usr/bin/env node

const fetch = require('node-fetch');

const FRONTEND_URL = 'http://localhost:3001';
const STRAPI_URL = 'http://localhost:1337';

const testSlugs = [
  'metiers-btp-2025',
  'guide-formation-btp',
  'reconversion-40ans',
  'alternance-btp',
  'formation-bim',
  'conducteur-travaux',
  'financement-formation',
  'centre-formation',
  'economiste-construction',
  'reconversion-professionnelle-btp-guide',
  'vae-btp-valoriser-experience',
  'devenir-conducteur-travaux-alternance',
  'metiers-avenir-btp-2024'
];

async function testBlogPages() {
  console.log('🧪 Test des pages du blog\n');

  // Test 1: Page blog principale
  console.log('1️⃣ Test de la page blog principale...');
  try {
    const response = await fetch(`${FRONTEND_URL}/blog`);
    if (response.ok) {
      console.log('✅ Page blog accessible\n');
    } else {
      console.log(`❌ Erreur: ${response.status}\n`);
    }
  } catch (error) {
    console.log(`❌ Erreur: ${error.message}\n`);
  }

  // Test 2: Pages d'articles
  console.log('2️⃣ Test des pages d\'articles...\n');
  for (const slug of testSlugs) {
    try {
      const response = await fetch(`${FRONTEND_URL}/blog/${slug}`);
      if (response.ok) {
        console.log(`✅ /blog/${slug}`);
      } else {
        console.log(`❌ /blog/${slug} - ${response.status}`);
      }
    } catch (error) {
      console.log(`❌ /blog/${slug} - ${error.message}`);
    }
  }

  // Test 3: API Strapi
  console.log('\n3️⃣ Test de l\'API Strapi...');
  try {
    const response = await fetch(`${STRAPI_URL}/api/articles-blog?populate=*`);
    if (response.ok) {
      const result = await response.json();
      console.log(`✅ API accessible - ${result.data.length} articles trouvés\n`);
    } else {
      console.log(`❌ Erreur API: ${response.status}\n`);
    }
  } catch (error) {
    console.log(`❌ Erreur API: ${error.message}\n`);
  }

  console.log('═══════════════════════════════════════════════════════════');
  console.log('✅ Tests terminés!');
  console.log('═══════════════════════════════════════════════════════════\n');
}

testBlogPages().catch(console.error);
