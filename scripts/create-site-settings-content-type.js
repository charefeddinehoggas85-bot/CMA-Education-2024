const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';
const STRAPI_ADMIN_TOKEN = 'your-admin-token'; // Remplacez par votre token admin

async function createSiteSettingsContentType() {
  console.log('🔧 Création du Content Type site-settings...');
  
  try {
    const contentTypeData = {
      contentType: {
        kind: 'singleType',
        collectionName: 'site_settings',
        info: {
          singularName: 'site-setting',
          pluralName: 'site-settings',
          displayName: 'Site Settings',
          description: 'Configuration générale du site'
        },
        options: {
          draftAndPublish: false
        },
        pluginOptions: {},
        attributes: {
          siteName: {
            type: 'string',
            required: true,
            default: 'CMA Academy'
          },
          siteDescription: {
            type: 'text'
          },
          contactPhone: {
            type: 'string',
            default: '01 89 70 60 52'
          },
          contactEmail: {
            type: 'email',
            default: 'contact.academy@cma-education.com'
          },
          contactAddress: {
            type: 'text',
            default: '67-69 Avenue du Général de Gaulle, 77420 Champs sur Marne'
          },
          emailInscription: {
            type: 'email',
            default: 'inscription.academy@cma-education.com'
          },
          horaires: {
            type: 'string',
            default: 'Lundi - Vendredi : 9h00 - 18h00'
          },
          socialLinks: {
            type: 'json'
          },
          seoTitle: {
            type: 'string'
          },
          seoDescription: {
            type: 'text'
          },
          logo: {
            type: 'media',
            multiple: false,
            required: false,
            allowedTypes: ['images']
          },
          favicon: {
            type: 'media',
            multiple: false,
            required: false,
            allowedTypes: ['images']
          }
        }
      }
    };

    // Créer le content type via l'API Content-Type Builder
    const response = await axios.post(
      `${STRAPI_URL}/content-type-builder/content-types`,
      contentTypeData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${STRAPI_ADMIN_TOKEN}`
        }
      }
    );

    console.log('✅ Content Type site-settings créé avec succès');
    
    // Attendre un peu pour que Strapi redémarre
    console.log('⏳ Attente du redémarrage de Strapi...');
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Créer l'entrée par défaut
    await createDefaultSiteSettings();
    
  } catch (error) {
    if (error.response?.status === 400 && error.response?.data?.error?.message?.includes('already exists')) {
      console.log('ℹ️ Content Type site-settings existe déjà');
      await createDefaultSiteSettings();
    } else {
      console.error('❌ Erreur création Content Type:', error.response?.data || error.message);
    }
  }
}

async function createDefaultSiteSettings() {
  console.log('📝 Création des paramètres par défaut...');
  
  try {
    const defaultSettings = {
      data: {
        siteName: 'CMA Academy',
        siteDescription: 'École de formation BTP - Formations en alternance et reconversion professionnelle',
        contactPhone: '01 89 70 60 52',
        contactEmail: 'contact.academy@cma-education.com',
        contactAddress: '67-69 Avenue du Général de Gaulle, 77420 Champs sur Marne',
        emailInscription: 'inscription.academy@cma-education.com',
        horaires: 'Lundi - Vendredi : 9h00 - 18h00',
        socialLinks: {
          facebook: '',
          linkedin: '',
          youtube: ''
        },
        seoTitle: 'CMA Academy - Formation BTP en Alternance et Reconversion',
        seoDescription: 'École de formation BTP proposant des formations en alternance et reconversion professionnelle. Conducteur de travaux, chargé d\'affaires, VAE BTP.'
      }
    };

    const response = await axios.put(
      `${STRAPI_URL}/api/site-settings`,
      defaultSettings,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Paramètres par défaut créés');
    
  } catch (error) {
    console.error('❌ Erreur création paramètres:', error.response?.data || error.message);
  }
}

// Méthode alternative sans token admin
async function createSiteSettingsViaAPI() {
  console.log('🔧 Création alternative du Content Type site-settings...');
  
  try {
    // Créer directement l'entrée - Strapi créera le content type automatiquement
    const defaultSettings = {
      data: {
        siteName: 'CMA Academy',
        siteDescription: 'École de formation BTP - Formations en alternance et reconversion professionnelle',
        contactPhone: '01 89 70 60 52',
        contactEmail: 'contact.academy@cma-education.com',
        contactAddress: '67-69 Avenue du Général de Gaulle, 77420 Champs sur Marne',
        emailInscription: 'inscription.academy@cma-education.com',
        horaires: 'Lundi - Vendredi : 9h00 - 18h00'
      }
    };

    const response = await axios.put(
      `${STRAPI_URL}/api/site-settings`,
      defaultSettings,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Site settings créé via API');
    
  } catch (error) {
    console.error('❌ Erreur:', error.response?.data || error.message);
    console.log('💡 Le Content Type site-settings doit être créé manuellement dans l\'admin Strapi');
  }
}

// Exécuter
if (require.main === module) {
  createSiteSettingsViaAPI();
}

module.exports = { createSiteSettingsContentType, createDefaultSiteSettings };