#!/usr/bin/env node

const fetch = require('node-fetch');

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

async function testFeaturedFormations() {
  console.log('🧪 Testing Featured Formations Section...\n');
  
  try {
    const url = `${STRAPI_URL}/api/formations?populate=*&sort=ordre:asc`;
    console.log(`📡 Fetching from: ${url}\n`);
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(STRAPI_API_TOKEN && {
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        }),
      },
    });

    if (!response.ok) {
      console.error(`❌ API Error: ${response.status} ${response.statusText}`);
      return;
    }

    const data = await response.json();
    
    if (!data.data || data.data.length === 0) {
      console.warn('⚠️ No formations found in Strapi');
      return;
    }

    console.log(`✅ Found ${data.data.length} formations\n`);
    
    // Show first 3 formations (featured)
    const featured = data.data.slice(0, 3);
    
    featured.forEach((formation, index) => {
      console.log(`\n📚 Formation ${index + 1}:`);
      console.log(`   ID: ${formation.id}`);
      console.log(`   Titre: ${formation.attributes?.titre || 'N/A'}`);
      console.log(`   Slug: ${formation.attributes?.slug || 'N/A'}`);
      console.log(`   Niveau RNCP: ${formation.attributes?.niveauRNCP || 'N/A'}`);
      console.log(`   Catégorie: ${formation.attributes?.categorie || 'N/A'}`);
      
      // Check image
      if (formation.attributes?.image?.data) {
        console.log(`   ✅ Image: ${formation.attributes.image.data.attributes?.url || 'URL not found'}`);
      } else {
        console.log(`   ⚠️ No image data`);
      }
    });

    console.log('\n✅ Featured Formations test completed successfully!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testFeaturedFormations();
