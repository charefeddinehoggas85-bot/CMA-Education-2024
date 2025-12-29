const axios = require('axios');

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '';

async function updateSiteSettingWithVideo() {
  try {
    console.log('🎬 Fetching the hero video file...');
    
    // Get all files to find the video
    const filesResponse = await axios.get(`${STRAPI_URL}/api/upload/files`, {
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
    });

    const videoFile = filesResponse.data.find(file => 
      file.name.includes('Design sans titre (3)') && file.mime.includes('video')
    );

    if (!videoFile) {
      console.error('❌ Video file not found');
      return;
    }

    console.log(`✅ Found video: ${videoFile.name} (ID: ${videoFile.id})`);

    // Get current site-settings
    console.log('\n📝 Fetching current site-settings...');
    const settingsResponse = await axios.get(
      `${STRAPI_URL}/api/site-setting?populate=*`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        },
      }
    );

    const currentSettings = settingsResponse.data.data.attributes;
    console.log('✅ Current settings retrieved');

    // Update with video
    console.log('\n🎥 Updating site-settings with hero video...');
    const updateResponse = await axios.put(
      `${STRAPI_URL}/api/site-setting`,
      {
        data: {
          ...currentSettings,
          heroVideo: videoFile.id,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('✅ Site-settings updated successfully!');
    console.log(`   Hero video: ${videoFile.name}`);
    console.log(`   Video URL: ${STRAPI_URL}${videoFile.url}`);

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

updateSiteSettingWithVideo();
