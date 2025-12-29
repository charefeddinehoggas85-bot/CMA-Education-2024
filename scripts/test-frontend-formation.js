/**
 * Test de récupération d'une formation spécifique comme le fait le frontend
 */

const http = require('http');

const STRAPI_URL = 'http://localhost:1337';
const STRAPI_TOKEN = '34ebc27d0aae530b71f7c236385a2013ba8db694ccbdf80a49a5cc3e0499ae408caa45dddb48f2a9ed35fd17a8a9eedb71fbf587e0806ccc282a4c62f8aa575457bc480b312f9740d1f3e1651e196a507075ed08a858b8dda30c5c1ffc88b61352c9436b7fddeb70f6668b194166d1a18133990d6da183edb6a0f4f4694f716d';

function fetchAPI(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 1337,
      path: path,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (!res.statusCode || res.statusCode < 200 || res.statusCode >= 300) {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
          return;
        }
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Parse error: ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

function transformStrapiData(item) {
  if (!item) return null;
  const transformed = { id: item.id, ...item.attributes };
  
  // Ajouter les données d'image si présentes
  if (item.attributes?.image?.data) {
    transformed.imageData = item.attributes.image;
  }
  
  return transformed;
}

async function getFormation(slug) {
  const data = await fetchAPI(`/api/formations?filters[slug][$eq]=${slug}&populate=*`);
  return transformStrapiData(data.data?.[0]);
}

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

async function testFormationFrontend() {
  console.log('🧪 Test frontend getFormation\n');

  const slugsToTest = [
    'charge-affaires-batiment',
    'conducteur-travaux-batiment',
    'chef-chantier-vrd'
  ];

  for (const slug of slugsToTest) {
    console.log(`🔍 Test: ${slug}`);
    
    try {
      const formation = await getFormation(slug);
      
      if (formation && formation.id) {
        console.log(`   ✅ Formation trouvée: ${formation.title}`);
        console.log(`   📝 ID: ${formation.id}`);
        console.log(`   📝 Slug: ${formation.slug}`);
        
        if (formation.imageData) {
          console.log(`   🖼️  ImageData présent`);
          const imageUrl = getImageURL(formation.imageData);
          console.log(`   🔗 URL finale: ${imageUrl}`);
        } else {
          console.log(`   ❌ Pas d'imageData`);
        }
      } else {
        console.log(`   ❌ Formation non trouvée ou invalide`);
        console.log(`   📋 Données reçues:`, formation);
      }
    } catch (error) {
      console.log(`   ❌ Erreur: ${error.message}`);
    }
    
    console.log('');
  }
}

testFormationFrontend().catch(console.error);