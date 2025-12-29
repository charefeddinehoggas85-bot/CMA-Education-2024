#!/usr/bin/env node

// Simuler les fonctions Strapi
const STRAPI_URL = 'http://localhost:1337';

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
  const validateURL = (url) => {
    if (typeof url === 'string' && url.length > 0 && !url.includes('[object')) {
      return url;
    }
    return null;
  };

  const strapiURL = getStrapiMediaURL(strapiMedia);
  const validStrapiURL = validateURL(strapiURL);
  if (validStrapiURL) return validStrapiURL;
  
  if (fallbackPath && typeof fallbackPath === 'string') {
    const validFallback = validateURL(fallbackPath);
    if (validFallback) return validFallback;
  }
  
  return '/images/formations/formations-hero.jpg';
}

function transformStrapiData(item) {
  if (!item) return null;
  const transformed = { id: item.id, ...item.attributes };
  
  if (item.attributes?.heroImage?.data) {
    transformed.heroImage = item.attributes.heroImage;
  }
  
  return transformed;
}

async function testGetPagePartenaires() {
  try {
    console.log('🧪 Test de getPagePartenaires...\n');

    // Récupérer les données brutes
    const response = await fetch(`${STRAPI_URL}/api/page-partenaires?populate=*`);
    const data = await response.json();
    
    console.log('1️⃣  Données brutes de Strapi:');
    console.log(`   heroImage présent: ${data.data?.attributes?.heroImage ? '✅' : '❌'}`);
    console.log(`   heroImage.data présent: ${data.data?.attributes?.heroImage?.data ? '✅' : '❌'}`);
    
    if (data.data?.attributes?.heroImage?.data) {
      console.log(`   URL: ${data.data.attributes.heroImage.data.attributes.url}`);
    }

    // Transformer les données
    const transformed = transformStrapiData(data.data);
    
    console.log('\n2️⃣  Après transformStrapiData:');
    console.log(`   heroImage présent: ${transformed?.heroImage ? '✅' : '❌'}`);
    console.log(`   heroImage.data présent: ${transformed?.heroImage?.data ? '✅' : '❌'}`);
    
    if (transformed?.heroImage) {
      console.log(`   heroImage structure:`, JSON.stringify(transformed.heroImage, null, 2).substring(0, 200));
    }

    // Appliquer getImageURL
    const imageUrl = getImageURL(transformed?.heroImage, '/images/hero/DEAL_DONE.jpg');
    
    console.log('\n3️⃣  Après getImageURL:');
    console.log(`   URL finale: ${imageUrl}`);
    console.log(`   Valide: ${imageUrl.startsWith('http') || imageUrl.startsWith('/') ? '✅' : '❌'}`);

    // Vérifier l'accès à l'image
    if (imageUrl.startsWith('http')) {
      console.log('\n4️⃣  Test d\'accès à l\'image...');
      const imgResponse = await fetch(imageUrl);
      console.log(`   Accessible: ${imgResponse.ok ? '✅' : '❌'} (${imgResponse.status})`);
    }

    console.log('\n✅ Test terminé!');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

testGetPagePartenaires();
