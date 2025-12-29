const axios = require('axios');

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '';

async function findVideoUrl() {
  try {
    const filesResponse = await axios.get(`${STRAPI_URL}/api/upload/files`, {
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
    });

    const video4 = filesResponse.data.find(file => 
      file.name.includes('Design sans titre (4)') && file.mime.includes('video')
    );

    if (video4) {
      console.log(`✅ Found: ${video4.name}`);
      console.log(`   ID: ${video4.id}`);
      console.log(`   URL: ${STRAPI_URL}${video4.url}`);
    } else {
      console.log('❌ Video not found');
      console.log('\nAvailable videos:');
      filesResponse.data
        .filter(f => f.mime.includes('video'))
        .forEach(f => console.log(`  - ${f.name} (${STRAPI_URL}${f.url})`));
    }

  } catch (error) {
    console.error('Error:', error.message);
  }
}

findVideoUrl();
