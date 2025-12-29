const axios = require('axios');
const fs = require('fs');
const path = require('path');

const STRAPI_URL = 'http://localhost:1337';

// Configuration automatique complète pour atteindre 100%
async function autoConfigureStrapi100() {
  console.log('🚀 CONFIGURATION AUTOMATIQUE VERS 100%\n');
  console.log('=====================================\n');

  // Étape 1: Créer un utilisateur admin temporaire pour l'API
  console.log('🔧 Étape 1: Configuration de l\'authentification...\n');

  let authToken = null;

  try {
    // Essayer de créer un admin temporaire
    const adminData = {
      firstname: 'Admin',
      lastname: 'Temp',
      email: 'admin@temp.com',
      password: 'TempPassword123!',
      confirmPassword: 'TempPassword123!'
    };

    try {
      const registerResponse = await axios.post(`${STRAPI_URL}/admin/register-admin`, adminData);
      console.log('✅ Admin temporaire créé');
      authToken = registerResponse.data.token;
    } catch (error) {
      // Si l'admin existe déjà, essayer de se connecter
      try {
        const loginResponse = await axios.post(`${STRAPI_URL}/admin/login`, {
          email: adminData.email,
          password: adminData.password
        });
        console.log('✅ Connexion admin réussie');
        authToken = loginResponse.data.token;
      } catch (loginError) {
        console.log('⚠️  Impossible de s\'authentifier automatiquement');
      }
    }
  } catch (error) {
    console.log('⚠️  Authentification automatique échouée');
  }

  // Étape 2: Configurer les permissions pour les content types existants
  console.log('\n🔧 Étape 2: Configuration des permissions...\n');

  const contentTypesToPermit = [
    'api::gallery.gallery',
    'api::faq.faq',
    'api::seo-setting.seo-setting',
    'api::navigation-menu.navigation-menu',
    'api::contact-info.contact-info',
    'api::modalite.modalite'
  ];

  if (authToken) {
    try {
      // Récupérer le rôle Public
      const rolesResponse = await axios.get(`${STRAPI_URL}/admin/users-permissions/roles`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });

      const publicRole = rolesResponse.data.roles.find(role => role.type === 'public');

      if (publicRole) {
        console.log('✅ Rôle Public trouvé');

        // Configurer les permissions pour chaque content type
        for (const contentType of contentTypesToPermit) {
          try {
            const permissionData = {
              permissions: {
                [contentType]: {
                  controllers: {
                    [contentType.split('.')[1]]: {
                      find: { enabled: true },
                      findOne: { enabled: true }
                    }
                  }
                }
              }
            };

            await axios.put(`${STRAPI_URL}/admin/users-permissions/roles/${publicRole.id}`, permissionData, {
              headers: { Authorization: `Bearer ${authToken}` }
            });

            console.log(`✅ Permissions configurées pour ${contentType}`);
          } catch (error) {
            console.log(`⚠️  Erreur permissions ${contentType}: ${error.response?.status}`);
          }
        }
      }
    } catch (error) {
      console.log('⚠️  Erreur configuration permissions:', error.response?.status);
    }
  }

  // Étape 3: Test des APIs après configuration
  console.log('\n🧪 Étape 3: Test des APIs...\n');

  const allAPIs = [
    { name: 'Formations', endpoint: '/api/formations' },
    { name: 'Partners', endpoint: '/api/partners' },
    { name: 'Testimonials', endpoint: '/api/testimonials' },
    { name: 'Site Settings', endpoint: '/api/site-settings' },
    { name: 'Statistiques Site', endpoint: '/api/statistiques-site' },
    { name: 'Processus Admission', endpoint: '/api/processus-admissions' },
    { name: 'Valeurs École', endpoint: '/api/valeurs-ecole' },
    { name: 'VAE Formules', endpoint: '/api/vae-formules' },
    { name: 'Entreprise Services', endpoint: '/api/entreprise-services' },
    { name: 'Galeries', endpoint: '/api/galleries' },
    { name: 'FAQ', endpoint: '/api/faqs' },
    { name: 'SEO Settings', endpoint: '/api/seo-settings' },
    { name: 'Navigation Menus', endpoint: '/api/navigation-menus' },
    { name: 'Contact Infos', endpoint: '/api/contact-infos' },
    { name: 'Modalités', endpoint: '/api/modalites' }
  ];

  let fonctionnelles = 0;
  let permissionsManquantes = 0;
  let contentTypesManquants = 0;

  for (const api of allAPIs) {
    try {
      const response = await axios.get(`${STRAPI_URL}${api.endpoint}`);
      
      if (response.status === 200) {
        const count = response.data.data?.length || (response.data.data ? 1 : 0);
        console.log(`✅ ${api.name}: ${count} éléments`);
        fonctionnelles++;
      }
    } catch (error) {
      if (error.response?.status === 403) {
        console.log(`🔒 ${api.name}: Permissions manquantes`);
        permissionsManquantes++;
      } else if (error.response?.status === 404) {
        console.log(`❌ ${api.name}: Content type manquant`);
        contentTypesManquants++;
      } else {
        console.log(`⚠️  ${api.name}: Erreur ${error.response?.status}`);
      }
    }
  }

  const total = allAPIs.length;
  const pourcentage = Math.round((fonctionnelles / total) * 100);

  console.log('\n📊 RÉSULTAT FINAL\n');
  console.log('=================\n');
  console.log(`📈 PROGRESSION: ${pourcentage}% (${fonctionnelles}/${total})`);
  
  const progressBar = '█'.repeat(Math.floor(pourcentage / 2)) + '░'.repeat(50 - Math.floor(pourcentage / 2));
  console.log(`${progressBar} ${pourcentage}%\n`);

  console.log(`✅ Fonctionnelles: ${fonctionnelles}/${total}`);
  console.log(`🔒 Permissions manquantes: ${permissionsManquantes}/${total}`);
  console.log(`❌ Content types manquants: ${contentTypesManquants}/${total}\n`);

  // Étape 4: Instructions finales
  if (pourcentage === 100) {
    console.log('🎉 FÉLICITATIONS ! MIGRATION 100% RÉUSSIE !\n');
    console.log('🏆 TOUTES LES APIS SONT FONCTIONNELLES !');
    console.log('✅ Site entièrement administrable via Strapi');
    console.log('✅ Équipes autonomes sur le contenu');
    console.log('✅ Architecture parfaite et évolutive\n');
  } else {
    console.log('🔧 ACTIONS FINALES REQUISES:\n');
    
    if (contentTypesManquants > 0) {
      console.log('📋 Content types à créer manuellement dans l\'admin:');
      console.log('1. Ouvrir http://localhost:1337/admin');
      console.log('2. Aller dans Content-Type Builder');
      console.log('3. Créer les content types manquants avec les noms exacts');
      console.log('4. Configurer leurs permissions (Public role)\n');
    }

    if (permissionsManquantes > 0) {
      console.log('🔒 Permissions à configurer manuellement:');
      console.log('1. Ouvrir http://localhost:1337/admin');
      console.log('2. Settings > Users & Permissions > Roles > Public');
      console.log('3. Activer "find" et "findOne" pour tous les content types');
      console.log('4. Sauvegarder\n');
    }

    console.log('🧪 Test final: node scripts/test-apis-corriges.js');
  }

  return { fonctionnelles, permissionsManquantes, contentTypesManquants, pourcentage };
}

autoConfigureStrapi100().catch(console.error);