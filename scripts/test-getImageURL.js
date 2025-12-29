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

async function testGetImageURL() {
  try {
    console.log('🧪 Test de getImageURL...\n');

    // Récupérer les données brutes
    const response = await fetch(`${STRAPI_URL}/api/page-partenaires?populate=*`);
    const data = await response.json();
    
    const heroImage = data.data?.attributes?.heroImage;
    
    console.log('1️⃣  Données brutes:');
    console.log(`   heroImage présent: ${heroImage ? '✅' : '❌'}`);
    console.log(`   heroImage.data présent: ${heroImage?.data ? '✅' : '❌'}`);
    
    if (heroImage?.data) {
      console.log(`   URL: ${heroImage.data.attributes.url}`);
    }

    // Appliquer getImageURL
    const imageUrl = getImageURL(heroImage, '/images/hero/DEAL_DONE.jpg');
    
    console.log('\n2️⃣  Après getImageURL:');
    console.log(`   URL: ${imageUrl}`);
    console.log(`   Valide: ${imageUrl && imageUrl.length > 0 ? '✅' : '❌'}`);
    console.log(`   Commence par http: ${imageUrl?.startsWith('http') ? '✅' : '❌'}`);
    console.log(`   Commence par /: ${imageUrl?.startsWith('/') ? '✅' : '❌'}`);

    // Tester le CSS
    console.log('\n3️⃣  CSS généré:');
    const cssUrl = `url('${imageUrl}')`;
    console.log(`   backgroundImage: ${cssUrl}`);

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

testGetImageURL();
