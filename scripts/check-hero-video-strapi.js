const axios = require('axios');

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '';

async function checkHeroVideo() {
  try {
    console.log('🔍 Checking site-settings in Strapi...');
    
    const response = await axios.get(`${STRAPI_URL}/api/site-setting?populate=*`, {
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
    });

    console.log('\n📋 Site Settings Data:');
    console.log(JSON.stringify(response.data, null, 2));

    if (response.data.data) {
      const settings = response.data.data;
      console.log('\n🎬 Hero Video Field:');
      console.log(JSON.stringify(settings.attributes?.heroVideo, null, 2));
    }

  } catch (error) {
    console.error('❌ Error checking site-settings:');
    if (error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error(`Data:`, error.response.data);
    } else {
      console.error(error.message);
    }
  }
}

checkHeroVideo();
