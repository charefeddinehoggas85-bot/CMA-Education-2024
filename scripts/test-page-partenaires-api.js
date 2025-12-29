#!/usr/bin/env node

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || 'your-token-here';

async function testPagePartenairesAPI() {
  try {
    console.log('🧪 Test de l\'API page-partenaires...\n');

    // Test 1: Accès sans token (comme le frontend)
    console.log('1️⃣  Test sans token (accès public)...');
    const publicResponse = await fetch(
      `${STRAPI_URL}/api/page-partenaires?populate=*`
    );

    if (publicResponse.ok) {
      const data = await publicResponse.json();
      console.log('✅ Accès public OK');
      
      const attrs = data.data?.attributes;
      if (attrs) {
        console.log('\n📋 Données reçues:');
        console.log(`  • heroTitle: ${attrs.heroTitle}`);
        console.log(`  • heroSubtitle: ${attrs.heroSubtitle}`);
        console.log(`  • heroImage: ${attrs.heroImage?.data ? '✅ Présent' : '❌ Manquant'}`);
        
        if (attrs.heroImage?.data) {
          const imageUrl = `${STRAPI_URL}${attrs.heroImage.data.attributes.url}`;
          console.log(`  • Image URL: ${imageUrl}`);
        }
      }
    } else {
      console.error(`❌ Erreur: ${publicResponse.status}`);
      const error = await publicResponse.text();
      console.error(error);
    }

    // Test 2: Accès avec token
    console.log('\n2️⃣  Test avec token (accès authentifié)...');
    const authResponse = await fetch(
      `${STRAPI_URL}/api/page-partenaires?populate=*`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        },
      }
    );

    if (authResponse.ok) {
      const data = await authResponse.json();
      console.log('✅ Accès authentifié OK');
      console.log(`   Données complètes: ${JSON.stringify(data.data?.attributes, null, 2).substring(0, 200)}...`);
    } else {
      console.error(`❌ Erreur: ${authResponse.status}`);
    }

    console.log('\n✅ Tests terminés!');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

testPagePartenairesAPI();
