#!/usr/bin/env node

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const FRONTEND_URL = 'http://localhost:3000';

async function testComplete() {
  try {
    console.log('🧪 Test complet de la page partenaires...\n');

    // 1. Vérifier l'API Strapi
    console.log('1️⃣  Vérification de l\'API Strapi...');
    const apiResponse = await fetch(`${STRAPI_URL}/api/page-partenaires?populate=*`);
    
    if (!apiResponse.ok) {
      console.error(`❌ API Strapi non accessible: ${apiResponse.status}`);
      return;
    }

    const apiData = await apiResponse.json();
    const heroImage = apiData.data?.attributes?.heroImage?.data;
    
    if (!heroImage) {
      console.error('❌ Image hero manquante dans Strapi');
      return;
    }

    const imageUrl = `${STRAPI_URL}${heroImage.attributes.url}`;
    console.log(`✅ API Strapi OK`);
    console.log(`   Image: ${imageUrl}`);

    // 2. Vérifier l'accès à l'image
    console.log('\n2️⃣  Vérification de l\'accès à l\'image...');
    const imageResponse = await fetch(imageUrl);
    
    if (!imageResponse.ok) {
      console.error(`❌ Image non accessible: ${imageResponse.status}`);
      return;
    }

    console.log(`✅ Image accessible (${imageResponse.headers.get('content-length')} bytes)`);

    // 3. Vérifier le frontend
    console.log('\n3️⃣  Vérification du frontend...');
    const frontendResponse = await fetch(`${FRONTEND_URL}/partenaires`);
    
    if (!frontendResponse.ok) {
      console.error(`❌ Frontend non accessible: ${frontendResponse.status}`);
      return;
    }

    const html = await frontendResponse.text();
    
    // Vérifier que l'image est dans le HTML
    if (html.includes('DEAL_DONE') || html.includes('uploads')) {
      console.log(`✅ Frontend OK`);
      console.log(`   Image trouvée dans le HTML`);
    } else {
      console.log(`⚠️  Image non trouvée dans le HTML`);
      console.log(`   Vérifiez les logs du navigateur`);
    }

    // 4. Vérifier les données
    console.log('\n4️⃣  Vérification des données...');
    if (html.includes('Nos Partenaires')) {
      console.log(`✅ Titre trouvé`);
    }
    if (html.includes('Ils nous font confiance')) {
      console.log(`✅ Section title trouvé`);
    }

    console.log('\n✅ Test complet terminé!');
    console.log('\n🌐 Accédez à: http://localhost:3000/partenaires');
    console.log('\n💡 Ouvrez la console du navigateur (F12) pour voir les logs');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

testComplete();
