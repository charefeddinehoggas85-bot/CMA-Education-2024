const axios = require('axios');

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '';

async function updateHeroVideo() {
  try {
    console.log('🎬 Fetching uploaded videos from Strapi...');
    
    // First, get all uploaded files to find the video
    const filesResponse = await axios.get(`${STRAPI_URL}/api/upload/files`, {
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
    });

    console.log(`📁 Found ${filesResponse.data.length} files`);

    // Find the video file "Design sans titre (3).mp4"
    const videoFile = filesResponse.data.find(file => 
      file.name.includes('Design sans titre (3)') && file.mime.includes('video')
    );

    if (!videoFile) {
      console.error('❌ Video file "Design sans titre (3).mp4" not found in Strapi uploads');
      console.log('Available video files:');
      filesResponse.data
        .filter(f => f.mime.includes('video'))
        .forEach(f => console.log(`  - ${f.name} (ID: ${f.id})`));
      return;
    }

    console.log(`✅ Found video: ${videoFile.name} (ID: ${videoFile.id})`);
    console.log(`   URL: ${videoFile.url}`);

    // Now update site-settings with this video
    console.log('\n📝 Updating site-settings with hero video...');

    const updateResponse = await axios.put(
      `${STRAPI_URL}/api/site-setting`,
      {
        data: {
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
    console.log(`   Hero video set to: ${videoFile.name}`);
    console.log(`   Video URL: ${STRAPI_URL}${videoFile.url}`);

  } catch (error) {
    console.error('❌ Error updating hero video:');
    if (error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error(`Data:`, error.response.data);
    } else {
      console.error(error.message);
    }
  }
}

updateHeroVideo();
