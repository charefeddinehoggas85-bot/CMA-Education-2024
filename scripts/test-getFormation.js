/**
 * Test de la fonction getFormation du frontend
 */

// Simuler l'environnement Next.js
process.env.NEXT_PUBLIC_STRAPI_URL = 'http://localhost:1337';
process.env.STRAPI_API_TOKEN = '34ebc27d0aae530b71f7c236385a2013ba8db694ccbdf80a49a5cc3e0499ae408caa45dddb48f2a9ed35fd17a8a9eedb71fbf587e0806ccc282a4c62f8aa575457bc480b312f9740d1f3e1651e196a507075ed08a858b8dda30c5c1ffc88b61352c9436b7fddeb70f6668b194166d1a18133990d6da183edb6a0f4f4694f716d';

// Simuler fetch pour Node.js
global.fetch = require('node-fetch');

// Importer les fonctions Strapi
const { getFormation, getImageURL } = require('../src/lib/strapi.ts');

async function testGetFormation() {
  console.log('🧪 Test de la fonction getFormation\n');

  const slugsToTest = [
    'charge-affaires-batiment',
    'conducteur-travaux-batiment',
    'chef-chantier-vrd',
    'formation-inexistante'
  ];

  for (const slug of slugsToTest) {
    console.log(`🔍 Test: ${slug}`);
    
    try {
      const formation = await getFormation(slug);
      
      if (formation) {
        console.log(`   ✅ Formation trouvée: ${formation.title}`);
        console.log(`   📝 ID: ${formation.id}`);
        console.log(`   📝 Slug: ${formation.slug}`);
        
        if (formation.imageData) {
          console.log(`   🖼️  ImageData présent: ${formation.imageData.data.attributes?.url}`);
          const imageUrl = getImageURL(formation.imageData);
          console.log(`   🔗 URL finale: ${imageUrl}`);
        } else {
          console.log(`   ❌ Pas d'imageData`);
        }
      } else {
        console.log(`   ❌ Formation non trouvée`);
      }
    } catch (error) {
      console.log(`   ❌ Erreur: ${error.message}`);
    }
    
    console.log('');
  }
}

testGetFormation().catch(console.error);