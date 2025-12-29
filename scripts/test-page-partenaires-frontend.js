#!/usr/bin/env node

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';

async function testFrontendAccess() {
  try {
    console.log('🧪 Test d\'accès frontend à la page partenaires...\n');

    // Récupérer les données comme le ferait le frontend
    const response = await fetch(
      `${STRAPI_URL}/api/page-partenaires?populate=*`
    );

    if (!response.ok) {
      console.error(`❌ Erreur: ${response.status}`);
      return;
    }

    const data = await response.json();
    const attrs = data.data?.attributes;

    console.log('✅ Données reçues du serveur\n');
    console.log('📋 Contenu:');
    console.log(`  • heroTitle: "${attrs.heroTitle}"`);
    console.log(`  • heroSubtitle: "${attrs.heroSubtitle}"`);
    console.log(`  • sectionTitle: "${attrs.sectionTitle}"`);
    console.log(`  • ctaTitle: "${attrs.ctaTitle}"`);

    // Vérifier l'image
    const heroImage = attrs.heroImage?.data;
    if (heroImage) {
      const imageUrl = `${STRAPI_URL}${heroImage.attributes.url}`;
      console.log(`\n📸 Image hero:`);
      console.log(`  • Présente: ✅`);
      console.log(`  • URL: ${imageUrl}`);
      console.log(`  • Taille: ${heroImage.attributes.size} bytes`);
      console.log(`  • Type: ${heroImage.attributes.mime}`);
      
      // Tester l'accès à l'image
      console.log(`\n🔗 Test d'accès à l'image...`);
      const imageResponse = await fetch(imageUrl);
      if (imageResponse.ok) {
        console.log(`  ✅ Image accessible (${imageResponse.headers.get('content-length')} bytes)`);
      } else {
        console.log(`  ❌ Image non accessible (${imageResponse.status})`);
      }
    } else {
      console.log(`\n📸 Image hero: ❌ Manquante`);
    }

    console.log('\n✅ Test terminé!');
    console.log('\n💡 Prochaine étape: Accédez à http://localhost:3000/partenaires');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

testFrontendAccess();
