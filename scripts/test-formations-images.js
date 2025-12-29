/**
 * Script pour tester les images des formations dans Strapi
 */

const http = require('http');

const STRAPI_URL = 'http://localhost:1337';
const STRAPI_TOKEN = '34ebc27d0aae530b71f7c236385a2013ba8db694ccbdf80a49a5cc3e0499ae408caa45dddb48f2a9ed35fd17a8a9eedb71fbf587e0806ccc282a4c62f8aa575457bc480b312f9740d1f3e1651e196a507075ed08a858b8dda30c5c1ffc88b61352c9436b7fddeb70f6668b194166d1a18133990d6da183edb6a0f4f4694f716d';

function apiRequest(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 1337,
      path: path,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function main() {
  console.log('🔍 Test des images des formations dans Strapi\n');

  try {
    const { data: formations } = await apiRequest('/api/formations?populate=*');
    
    if (!formations?.data) {
      console.log('❌ Aucune formation trouvée');
      return;
    }

    console.log(`📋 ${formations.data.length} formations trouvées\n`);

    for (const formation of formations.data) {
      const slug = formation.attributes?.slug;
      const title = formation.attributes?.title;
      const image = formation.attributes?.image;

      console.log(`📝 ${slug} (${title})`);
      
      if (image?.data) {
        const imageUrl = image.data.attributes?.url;
        const imageId = image.data.id;
        console.log(`   ✅ Image: ID ${imageId} - ${imageUrl}`);
        console.log(`   🔗 URL complète: ${STRAPI_URL}${imageUrl}`);
      } else {
        console.log(`   ❌ Pas d'image`);
      }
      console.log('');
    }

    // Test d'une formation spécifique
    console.log('\n🎯 Test formation spécifique...');
    const { data: formationTest } = await apiRequest('/api/formations?filters[slug][$eq]=charge-affaires-batiment&populate=*');
    
    if (formationTest?.data?.[0]) {
      const formation = formationTest.data[0];
      console.log(`📝 Formation trouvée: ${formation.attributes.title}`);
      
      if (formation.attributes.image?.data) {
        console.log(`✅ Image présente: ${formation.attributes.image.data.attributes.url}`);
      } else {
        console.log(`❌ Pas d'image pour cette formation`);
      }
    } else {
      console.log('❌ Formation charge-affaires-batiment non trouvée');
    }

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

main();