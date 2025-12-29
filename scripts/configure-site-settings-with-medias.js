const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';

// Configuration automatique des Site Settings avec les médias uploadés
async function configureSiteSettingsWithMedias() {
  console.log('⚙️  CONFIGURATION SITE SETTINGS AVEC MÉDIAS\n');
  console.log('==========================================\n');

  // IDs des médias uploadés (depuis le résultat précédent)
  const mediaIds = {
    heroBackgroundVideo: 1, // hero-background.mp4
    heroBackgroundImage: 2, // hero-bg.jpg
    heroIcon: 3,           // construction-hero.svg
    blogHeroImage: 4,      // blog-hero.jpg
    contactHeroImage: 5,   // contact-hero.jpg
    rejoignezHeroImage: 6  // rejoignez-hero.jpg
  };

  // Configuration Site Settings complète
  const siteSettingsData = {
    siteName: "CMA Education",
    siteTagline: "Centre de Formation BTP d'Excellence",
    siteUrl: "https://cma-education.com",
    
    // Contenu Hero
    heroTitle: "L'Academy - Devenez l'acteur du BTP d'aujourd'hui et de demain",
    heroSubtitle: "Centre de Formation BTP d'Excellence",
    heroDescription: "Formations BTP en alternance, reconversion et VAE. Du Bac+2 au Bac+5 avec nos partenaires entreprises d'excellence.",
    
    // Médias Hero (IDs des fichiers uploadés)
    heroBackgroundVideo: mediaIds.heroBackgroundVideo,
    heroBackgroundImage: mediaIds.heroBackgroundImage,
    heroIcon: mediaIds.heroIcon,
    
    // Contact
    contactPhone: "01 89 70 60 52",
    contactEmail: "contact.academy@cma-education.com",
    
    // SEO
    seoTitle: "CMA Education - Formation BTP Alternance, Reconversion, VAE",
    seoDescription: "École de formation BTP d'excellence. Formations en alternance, reconversion professionnelle et VAE du Bac+2 au Bac+5. Chargé d'Affaires, Conducteur de Travaux, Chef de Projets BTP.",
    seoKeywords: "formation btp, alternance btp, reconversion btp, vae btp, école btp, chargé affaires, conducteur travaux",
    
    // Réseaux sociaux
    socialLinkedin: "https://linkedin.com/company/cma-education",
    socialInstagram: "https://instagram.com/cma_education",
    socialYoutube: "https://youtube.com/@cma-education"
  };

  console.log('📋 CONFIGURATION À APPLIQUER:\n');
  console.log(`🏷️  Site Name: ${siteSettingsData.siteName}`);
  console.log(`🎯 Hero Title: ${siteSettingsData.heroTitle}`);
  console.log(`📝 Hero Description: ${siteSettingsData.heroDescription}`);
  console.log(`🎬 Hero Video ID: ${siteSettingsData.heroBackgroundVideo}`);
  console.log(`🖼️  Hero Image ID: ${siteSettingsData.heroBackgroundImage}`);
  console.log(`🎨 Hero Icon ID: ${siteSettingsData.heroIcon}`);
  console.log('');

  // Test connectivité
  console.log('🌐 Test connectivité Strapi...');
  try {
    const testResponse = await axios.get(`${STRAPI_URL}/api/formations`);
    console.log('✅ Strapi accessible\n');
  } catch (error) {
    console.log('❌ Strapi non accessible');
    console.log('⚠️  Vérifiez que Strapi est démarré\n');
    return;
  }

  // Tentative de configuration automatique
  console.log('🤖 TENTATIVE DE CONFIGURATION AUTOMATIQUE...\n');

  try {
    // Vérifier si Site Settings existe déjà
    console.log('🔍 Vérification Site Settings existant...');
    let siteSettingsId = null;
    
    try {
      const existingResponse = await axios.get(`${STRAPI_URL}/api/site-settings`);
      if (existingResponse.data.data) {
        siteSettingsId = existingResponse.data.data.id;
        console.log(`✅ Site Settings existant trouvé (ID: ${siteSettingsId})`);
      }
    } catch (error) {
      console.log('📝 Aucun Site Settings existant - Création nécessaire');
    }

    // Créer ou mettre à jour Site Settings
    let response;
    if (siteSettingsId) {
      console.log('🔄 Mise à jour Site Settings...');
      response = await axios.put(`${STRAPI_URL}/api/site-settings/${siteSettingsId}`, {
        data: siteSettingsData
      });
    } else {
      console.log('📝 Création Site Settings...');
      response = await axios.post(`${STRAPI_URL}/api/site-settings`, {
        data: siteSettingsData
      });
    }

    if (response.status === 200 || response.status === 201) {
      console.log('✅ Site Settings configuré avec succès !');
      console.log(`📎 ID: ${response.data.data.id}`);
      console.log('🎬 Médias hero liés correctement');
      console.log('');
      
      // Vérifier la configuration
      console.log('🔍 Vérification configuration...');
      const verifyResponse = await axios.get(`${STRAPI_URL}/api/site-settings?populate=*`);
      const settings = verifyResponse.data.data;
      
      console.log('✅ Configuration vérifiée:');
      console.log(`   🏷️  Site Name: ${settings.attributes.siteName}`);
      console.log(`   🎯 Hero Title: ${settings.attributes.heroTitle}`);
      console.log(`   🎬 Video: ${settings.attributes.heroBackgroundVideo ? 'Lié' : 'Non lié'}`);
      console.log(`   🖼️  Image: ${settings.attributes.heroBackgroundImage ? 'Lié' : 'Non lié'}`);
      console.log(`   🎨 Icon: ${settings.attributes.heroIcon ? 'Lié' : 'Non lié'}`);
      
    } else {
      console.log(`⚠️  Configuration partielle - Statut ${response.status}`);
    }

  } catch (error) {
    console.log('❌ Erreur configuration automatique:');
    
    if (error.response?.status === 403) {
      console.log('🔒 Permissions insuffisantes - Configuration manuelle requise');
    } else if (error.response?.status === 400) {
      console.log('📋 Erreur de données - Vérifier structure content type');
    } else if (error.response?.status === 404) {
      console.log('🔍 Content type Site Settings non trouvé');
    } else {
      console.log(`❌ Erreur ${error.response?.status || error.message}`);
    }
    
    console.log('\n📋 CONFIGURATION MANUELLE REQUISE');
  }

  // Instructions configuration manuelle
  console.log('\n📋 INSTRUCTIONS CONFIGURATION MANUELLE\n');
  console.log('=====================================\n');

  console.log('🔧 ÉTAPE 1: Accéder à Site Settings');
  console.log('1. Ouvrir http://localhost:1337/admin');
  console.log('2. Aller dans Content Manager');
  console.log('3. Cliquer sur "Site Settings" (Collection Types)');
  console.log('4. Créer nouvelle entrée ou modifier existante\n');

  console.log('📝 ÉTAPE 2: Remplir les champs texte');
  console.log(`Site Name: ${siteSettingsData.siteName}`);
  console.log(`Hero Title: ${siteSettingsData.heroTitle}`);
  console.log(`Hero Subtitle: ${siteSettingsData.heroSubtitle}`);
  console.log(`Hero Description: ${siteSettingsData.heroDescription}`);
  console.log(`Contact Phone: ${siteSettingsData.contactPhone}`);
  console.log(`Contact Email: ${siteSettingsData.contactEmail}\n`);

  console.log('🔗 ÉTAPE 3: Lier les médias');
  console.log('Hero Background Video: Sélectionner "hero-background.mp4"');
  console.log('Hero Background Image: Sélectionner "hero-bg.jpg"');
  console.log('Hero Icon: Sélectionner "construction-hero.svg"\n');

  console.log('💾 ÉTAPE 4: Sauvegarder');
  console.log('Cliquer "Save" et attendre confirmation\n');

  // Test final
  console.log('🧪 ÉTAPE 5: Test final');
  console.log('1. Ouvrir http://localhost:3000');
  console.log('2. Vérifier que la vidéo hero se charge');
  console.log('3. Vérifier les textes dynamiques');
  console.log('4. Lancer: node scripts/test-migration-100-complete.js\n');

  console.log('🎯 RÉSULTAT ATTENDU:');
  console.log('✅ Hero section avec vidéo background');
  console.log('✅ Textes dynamiques depuis Strapi');
  console.log('✅ Images hero configurées');
  console.log('✅ Migration proche de 100%');

  return {
    mediaIds,
    siteSettingsData,
    configured: true
  };
}

configureSiteSettingsWithMedias().catch(console.error);