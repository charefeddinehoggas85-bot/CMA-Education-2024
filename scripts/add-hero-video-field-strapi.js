const axios = require('axios');

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '';

async function addHeroVideoField() {
  try {
    console.log('🔧 Adding heroVideo field to site-setting content type...');
    
    // Get the current schema
    const schemaResponse = await axios.get(
      `${STRAPI_URL}/api/content-type-builder/content-types/api::site-setting.site-setting`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        },
      }
    );

    const schema = schemaResponse.data.data.schema;
    console.log('✅ Current schema retrieved');

    // Add heroVideo field if it doesn't exist
    if (!schema.attributes.heroVideo) {
      schema.attributes.heroVideo = {
        type: 'media',
        multiple: false,
        required: false,
        private: false,
        allowedTypes: ['videos'],
      };

      console.log('📝 Adding heroVideo field to schema...');

      const updateResponse = await axios.put(
        `${STRAPI_URL}/api/content-type-builder/content-types/api::site-setting.site-setting`,
        { data: { schema } },
        {
          headers: {
            Authorization: `Bearer ${STRAPI_API_TOKEN}`,
          },
        }
      );

      console.log('✅ heroVideo field added successfully!');
      console.log('   Field type: media (videos only)');
      console.log('   Multiple: false');
      console.log('   Required: false');
    } else {
      console.log('ℹ️  heroVideo field already exists');
    }

  } catch (error) {
    console.error('❌ Error adding heroVideo field:');
    if (error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error(`Data:`, error.response.data);
    } else {
      console.error(error.message);
    }
  }
}

addHeroVideoField();
