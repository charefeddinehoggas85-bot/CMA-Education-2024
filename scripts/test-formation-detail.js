/**
 * Script pour tester la récupération d'une formation spécifique
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

// Simuler la fonction transformStrapiData
function transformStrapiData(item) {
  if (!item) return null;
  const transformed = { id: item.id, ...item.attributes };
  
  // Ajouter les données d'image si présentes
  if (item.attributes?.image?.data) {
    transformed.imageData = item.attributes.image;
  }
  
  return transformed;
}

async function testFormationDetail(slug) {
  console.log(`🔍 Test formation: ${slug}\n`);

  try {
    // Test API Strapi
    const { data: response } = await apiRequest(`/api/formations?filters[slug][$eq]=${slug}&populate=*`);
    
    if (response?.data?.[0]) {
      const rawFormation = response.data[0];
      console.log('📋 Données brutes Strapi:');
      console.log(`   ID: ${rawFormation.id}`);
      console.log(`   Title: ${rawFormation.attributes?.title}`);
      console.log(`   Slug: ${rawFormation.attributes?.slug}`);
      
      if (rawFormation.attributes?.image?.data) {
        console.log(`   ✅ Image brute: ${rawFormation.attributes.image.data.attributes?.url}`);
      } else {
        console.log(`   ❌ Pas d'image brute`);
      }
      
      // Test transformation
      const transformed = transformStrapiData(rawFormation);
      console.log('\n🔄 Données transformées:');
      console.log(`   ID: ${transformed.id}`);
      console.log(`   Title: ${transformed.title}`);
      console.log(`   Slug: ${transformed.slug}`);
      
      if (transformed.imageData) {
        console.log(`   ✅ ImageData: ${transformed.imageData.data.attributes?.url}`);
      } else {
        console.log(`   ❌ Pas d'imageData`);
      }
      
      // Test getImageURL
      console.log('\n🖼️  Test getImageURL:');
      const imageUrl = getImageURL(transformed.imageData);
      console.log(`   URL finale: ${imageUrl}`);
      
    } else {
      console.log('❌ Formation non trouvée dans Strapi');
    }

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

// Simuler getImageURL
function getStrapiMediaURL(media) {
  if (!media) return null;
  
  if (media.data) {
    const url = media.data.attributes?.url;
    if (url) {
      return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
    }
    return null;
  }
  
  if (media.url) {
    return media.url.startsWith('http') ? media.url : `${STRAPI_URL}${media.url}`;
  }
  
  return null;
}

function getImageURL(strapiMedia, fallbackPath) {
  const strapiURL = getStrapiMediaURL(strapiMedia);
  if (strapiURL) return strapiURL;
  return fallbackPath || '/images/formations/formations-hero.jpg';
}

async function main() {
  console.log('🧪 Test détaillé formation\n');
  
  // Tester plusieurs formations
  const slugsToTest = [
    'charge-affaires-batiment',
    'conducteur-travaux-batiment',
    'chef-chantier-vrd'
  ];
  
  for (const slug of slugsToTest) {
    await testFormationDetail(slug);
    console.log('\n' + '='.repeat(50) + '\n');
  }
}

main();