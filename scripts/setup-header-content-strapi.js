const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';
const ADMIN_JWT = process.env.STRAPI_ADMIN_JWT || '';

async function setupHeaderContent() {
  console.log('🚀 Configuration du contenu header dans Strapi...');
  
  try {
    // 1. Vérifier si site-settings existe
    console.log('📋 Vérification du content-type site-settings...');
    const settingsResponse = await axios.get(`${STRAPI_URL}/api/site-settings`, {
      headers: { Authorization: `Bearer ${ADMIN_JWT}` }
    }).catch(err => ({ status: err.response?.status }));
    
    if (settingsResponse.status === 404) {
      console.log('❌ Content-type site-settings non trouvé');
      console.log('💡 Veuillez créer le content-type site-settings dans l\'admin Strapi');
      return;
    }
    
    // 2. Créer/Mettre à jour les paramètres du site
    console.log('⚙️ Configuration des paramètres du site...');
    const siteSettingsData = {
      data: {
        siteName: 'CMA Education',
        siteDescription: 'Centre de formation BTP d\'excellence - Formations en alternance et reconversion professionnelle',
        contactPhone: '01 89 70 60 52',
        contactEmail: 'contact.academy@cma-education.com',
        contactAddress: '67-69 Avenue du Général de Gaulle, 77420 Champs sur Marne',
        headerButtonText: 'Candidater',
        headerButtonUrl: '/contact',
        headerButtonVariant: 'neon',
        seoTitle: 'CMA Education - Formation BTP Excellence',
        seoDescription: 'Centre de formation BTP d\'excellence proposant des formations en alternance et reconversion professionnelle. Chargé d\'affaires, conducteur de travaux, chef de chantier VRD.',
        seoKeywords: 'formation btp, alternance, reconversion professionnelle, conducteur travaux, chargé affaires, chef chantier'
      }
    };
    
    // Essayer de mettre à jour ou créer
    let settingsResult;
    if (settingsResponse.data) {
      // Mise à jour
      settingsResult = await axios.put(`${STRAPI_URL}/api/site-settings`, siteSettingsData, {
        headers: { Authorization: `Bearer ${ADMIN_JWT}` }
      });
      console.log('✅ Paramètres du site mis à jour');
    } else {
      // Création (pour single type, utiliser PUT même pour la création)
      settingsResult = await axios.put(`${STRAPI_URL}/api/site-settings`, siteSettingsData, {
        headers: { Authorization: `Bearer ${ADMIN_JWT}` }
      });
      console.log('✅ Paramètres du site créés');
    }
    
    // 3. Vérifier main-navigation
    console.log('📋 Vérification du content-type main-navigation...');
    const navResponse = await axios.get(`${STRAPI_URL}/api/main-navigations`, {
      headers: { Authorization: `Bearer ${ADMIN_JWT}` }
    }).catch(err => ({ status: err.response?.status }));
    
    if (navResponse.status === 404) {
      console.log('❌ Content-type main-navigation non trouvé');
      console.log('💡 Utilisation de la navigation statique par défaut');
    } else {
      console.log('✅ Content-type main-navigation disponible');
      
      // Créer des éléments de navigation par défaut si vide
      if (navResponse.data?.data?.length === 0) {
        console.log('📝 Création des éléments de navigation par défaut...');
        
        const navigationItems = [
          {
            data: {
              label: 'Accueil',
              url: '/',
              ordre: 1,
              featured: true,
              external: false
            }
          },
          {
            data: {
              label: 'À propos',
              url: '/about',
              ordre: 2,
              featured: true,
              external: false
            }
          },
          {
            data: {
              label: 'Pédagogie',
              url: '/pedagogie',
              ordre: 3,
              featured: true,
              external: false
            }
          },
          {
            data: {
              label: 'Partenaires',
              url: '/partenaires',
              ordre: 4,
              featured: true,
              external: false
            }
          }
        ];
        
        for (const item of navigationItems) {
          await axios.post(`${STRAPI_URL}/api/main-navigations`, item, {
            headers: { Authorization: `Bearer ${ADMIN_JWT}` }
          });
        }
        
        console.log('✅ Éléments de navigation créés');
      }
    }
    
    // 4. Test de récupération des données
    console.log('🧪 Test de récupération des données header...');
    
    const finalSettings = await axios.get(`${STRAPI_URL}/api/site-settings?populate=*`, {
      headers: { Authorization: `Bearer ${ADMIN_JWT}` }
    });
    
    console.log('📊 Données site-settings récupérées:');
    console.log('- Nom du site:', finalSettings.data.data?.attributes?.siteName);
    console.log('- Téléphone:', finalSettings.data.data?.attributes?.contactPhone);
    console.log('- Email:', finalSettings.data.data?.attributes?.contactEmail);
    console.log('- Bouton header:', finalSettings.data.data?.attributes?.headerButtonText);
    
    console.log('🎉 Configuration header terminée avec succès!');
    console.log('💡 Vous pouvez maintenant modifier le contenu du header depuis l\'admin Strapi');
    
  } catch (error) {
    console.error('❌ Erreur lors de la configuration:', error.message);
    if (error.response?.status === 401) {
      console.log('🔑 Token d\'authentification requis. Connectez-vous à l\'admin Strapi d\'abord.');
    }
  }
}

setupHeaderContent();