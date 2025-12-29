/**
 * Test script pour vérifier l'API Strapi
 */

const STRAPI_URL = 'http://localhost:1337';
const STRAPI_API_TOKEN = '34ebc27d0aae530b71f7c236385a2013ba8db694ccbdf80a49a5cc3e0499ae408caa45dddb48f2a9ed35fd17a8a9eedb71fbf587e0806ccc282a4c62f8aa575457bc480b312f9740d1f3e1651e196a507075ed08a858b8dda30c5c1ffc88b61352c9436b7fddeb70f6668b194166d1a18133990d6da183edb6a0f4f4694f716d';

async function testAPI() {
  try {
    console.log('🔍 Test de l\'API Strapi...\n');

    // Test formations
    const formationsResponse = await fetch(`${STRAPI_URL}/api/formations?pagination[limit]=5`, {
      headers: {
        'Authorization': `Bearer ${STRAPI_API_TOKEN}`
      }
    });

    if (!formationsResponse.ok) {
      throw new Error(`HTTP ${formationsResponse.status}: ${formationsResponse.statusText}`);
    }

    const formations = await formationsResponse.json();
    console.log(`✅ Formations: ${formations.data.length} trouvées`);
    
    formations.data.forEach((formation, index) => {
      console.log(`  ${index + 1}. ${formation.attributes.title} (${formation.attributes.level})`);
    });

    // Test partners
    const partnersResponse = await fetch(`${STRAPI_URL}/api/partners`, {
      headers: {
        'Authorization': `Bearer ${STRAPI_API_TOKEN}`
      }
    });

    if (partnersResponse.ok) {
      const partners = await partnersResponse.json();
      console.log(`\n✅ Partenaires: ${partners.data.length} trouvés`);
    }

    // Test testimonials
    const testimonialsResponse = await fetch(`${STRAPI_URL}/api/testimonials`, {
      headers: {
        'Authorization': `Bearer ${STRAPI_API_TOKEN}`
      }
    });

    if (testimonialsResponse.ok) {
      const testimonials = await testimonialsResponse.json();
      console.log(`✅ Témoignages: ${testimonials.data.length} trouvés`);
    }

    console.log('\n🎉 API Strapi fonctionne correctement!');

  } catch (error) {
    console.error('❌ Erreur API:', error.message);
  }
}

testAPI();