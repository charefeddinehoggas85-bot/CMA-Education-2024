const axios = require('axios');

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '';

async function checkSchema() {
  try {
    console.log('🔍 Checking site-setting schema...');
    
    const response = await axios.get(
      `${STRAPI_URL}/api/content-type-builder/content-types/api::site-setting.site-setting`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        },
      }
    );

    console.log('\n📋 Schema Structure:');
    console.log(JSON.stringify(response.data, null, 2));

  } catch (error) {
    console.error('❌ Error:');
    if (error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error(`Data:`, error.response.data);
    } else {
      console.error(error.message);
    }
  }
}

checkSchema();
