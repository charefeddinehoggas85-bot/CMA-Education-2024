const axios = require('axios');

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

async function updateSocialMediaLinks() {
  try {
    console.log('🔄 Mise à jour des liens réseaux sociaux...');

    // Récupérer les paramètres actuels du site
    const response = await axios.get(`${STRAPI_URL}/api/site-settings`, {
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    const currentSettings = response.data.data;
    console.log('📋 Paramètres actuels récupérés');

    // Mettre à jour avec les nouveaux liens
    const updatedData = {
      data: {
        ...currentSettings.attributes,
        socialMedia: {
          ...currentSettings.attributes.socialMedia,
          facebook: 'https://www.facebook.com/Constructionmanagementacademy',
          tiktok: 'https://www.tiktok.com/@cmaeducation'
        }
      }
    };

    // Envoyer la mise à jour
    const updateResponse = await axios.put(
      `${STRAPI_URL}/api/site-settings/${currentSettings.id}`,
      updatedData,
      {
        headers: {
          'Authorization': `Bearer ${STRAPI_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Liens réseaux sociaux mis à jour avec succès !');
    console.log('📱 Facebook:', updatedData.data.socialMedia.facebook);
    console.log('🎵 TikTok:', updatedData.data.socialMedia.tiktok);

    return updateResponse.data;

  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour:', error.response?.data || error.message);
    
    // Si les paramètres du site n'existent pas, les créer
    if (error.response?.status === 404) {
      console.log('🔄 Création des paramètres du site...');
      
      try {
        const createResponse = await axios.post(`${STRAPI_URL}/api/site-settings`, {
          data: {
            siteName: 'Construction Management Academy',
            contactPhone: '01 89 70 60 52',
            contactEmail: 'contact.academy@construction-management-academy.fr',
            contactAddress: '67-69 Avenue du Général de Gaulle, 77420 Champs sur Marne',
            socialMedia: {
              linkedin: 'https://www.linkedin.com/company/construction-management-academy',
              instagram: 'https://www.instagram.com/construction_management_academy',
              facebook: 'https://www.facebook.com/Constructionmanagementacademy',
              youtube: 'https://www.youtube.com/channel/construction-management-academy',
              tiktok: 'https://www.tiktok.com/@cmaeducation'
            }
          }
        }, {
          headers: {
            'Authorization': `Bearer ${STRAPI_TOKEN}`,
            'Content-Type': 'application/json'
          }
        });

        console.log('✅ Paramètres du site créés avec les nouveaux liens !');
        return createResponse.data;
      } catch (createError) {
        console.error('❌ Erreur lors de la création:', createError.response?.data || createError.message);
      }
    }
  }
}

// Test de la fonction
async function testSocialMediaLinks() {
  console.log('🧪 Test des liens réseaux sociaux...');
  
  try {
    const response = await axios.get(`${STRAPI_URL}/api/site-settings`, {
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    const socialMedia = response.data.data?.attributes?.socialMedia;
    
    if (socialMedia) {
      console.log('📱 Liens sociaux actuels:');
      console.log('  Facebook:', socialMedia.facebook);
      console.log('  TikTok:', socialMedia.tiktok);
      console.log('  LinkedIn:', socialMedia.linkedin);
      console.log('  Instagram:', socialMedia.instagram);
      console.log('  YouTube:', socialMedia.youtube);
    } else {
      console.log('⚠️ Aucun lien social trouvé');
    }

  } catch (error) {
    console.error('❌ Erreur lors du test:', error.response?.data || error.message);
  }
}

// Exécution
if (require.main === module) {
  updateSocialMediaLinks()
    .then(() => testSocialMediaLinks())
    .then(() => {
      console.log('🎉 Mise à jour terminée !');
      process.exit(0);
    })
    .catch(error => {
      console.error('💥 Erreur fatale:', error);
      process.exit(1);
    });
}

module.exports = { updateSocialMediaLinks, testSocialMediaLinks };