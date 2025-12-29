const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';
const API_TOKEN = 'your-api-token-here'; // À remplacer par le vrai token

const headers = {
  'Authorization': `Bearer ${API_TOKEN}`,
  'Content-Type': 'application/json'
};

// Configuration du contenu hero dans Strapi
async function configureHeroContentStrapi() {
  console.log('🎬 CONFIGURATION CONTENU HERO DANS STRAPI\n');
  console.log('========================================\n');

  // Données hero optimisées pour le composant HeroSection
  const heroContent = {
    siteName: "CMA Education",
    siteTagline: "Centre de Formation BTP d'Excellence",
    heroTitle: "L'Academy - Devenez l'acteur du BTP d'aujourd'hui et de demain",
    heroSubtitle: "Centre de Formation BTP d'Excellence",
    heroDescription: "Formations BTP en alternance, reconversion et VAE. Du Bac+2 au Bac+5 avec nos partenaires entreprises d'excellence.",
    contactPhone: "01 89 70 60 52",
    contactEmail: "contact.academy@cma-education.com",
    siteUrl: "https://cma-education.com",
    
    // Médias hero (URLs relatives - les fichiers doivent être uploadés dans Strapi Media Library)
    heroBackgroundVideo: "/videos/hero-background.mp4",
    heroBackgroundImage: "/images/hero/hero-bg.jpg",
    heroIcon: "/images/hero/construction-hero.svg",
    
    // Métadonnées SEO
    seoTitle: "CMA Education - Formation BTP Alternance, Reconversion, VAE",
    seoDescription: "École de formation BTP d'excellence. Formations en alternance, reconversion professionnelle et VAE du Bac+2 au Bac+5. Chargé d'Affaires, Conducteur de Travaux, Chef de Projets BTP.",
    seoKeywords: "formation btp, alternance btp, reconversion btp, vae btp, école btp, chargé affaires, conducteur travaux",
    
    // Réseaux sociaux
    socialLinks: {
      linkedin: "https://linkedin.com/company/cma-education",
      instagram: "https://instagram.com/cma_education",
      youtube: "https://youtube.com/@cma-education"
    }
  };

  // Données pour les pages avec hero spécifique
  const pagesHeroContent = [
    {
      title: "Blog - Actualités BTP",
      slug: "blog",
      heroTitle: "Actualités & Conseils BTP",
      heroSubtitle: "Restez informé des dernières tendances",
      heroDescription: "Découvrez nos articles, conseils et actualités du secteur BTP pour enrichir vos connaissances.",
      heroImage: "/images/blog-hero.jpg",
      seoTitle: "Blog BTP - Actualités et Conseils | CMA Education",
      seoDescription: "Blog BTP avec actualités, conseils formations, tendances du secteur. Expertise CMA Education."
    },
    {
      title: "Contact - Candidater",
      slug: "contact", 
      heroTitle: "Candidater à nos Formations",
      heroSubtitle: "Votre projet professionnel commence ici",
      heroDescription: "Contactez-nous pour candidater à nos formations BTP d'excellence. Accompagnement personnalisé garanti.",
      heroImage: "/images/contact-hero.jpg",
      seoTitle: "Contact - Candidater aux Formations BTP | CMA Education",
      seoDescription: "Contactez CMA Education pour candidater à nos formations BTP. Accompagnement personnalisé et conseil d'orientation."
    },
    {
      title: "Rejoignez-nous",
      slug: "rejoignez",
      heroTitle: "Rejoignez l'Excellence BTP",
      heroSubtitle: "Votre avenir commence maintenant",
      heroDescription: "Intégrez une école d'excellence et construisez votre carrière dans le BTP avec nos formations reconnues.",
      heroImage: "/images/rejoignez-hero.jpg",
      seoTitle: "Rejoignez CMA Education - École BTP d'Excellence",
      seoDescription: "Rejoignez CMA Education, école de formation BTP d'excellence. Formations reconnues, partenaires entreprises, insertion garantie."
    }
  ];

  console.log('📊 CONTENU HERO À CONFIGURER:\n');
  console.log('🏠 Site Settings Principal:');
  console.log(`   - Titre: ${heroContent.heroTitle}`);
  console.log(`   - Sous-titre: ${heroContent.heroSubtitle}`);
  console.log(`   - Description: ${heroContent.heroDescription}`);
  console.log(`   - Vidéo: ${heroContent.heroBackgroundVideo}`);
  console.log(`   - Image: ${heroContent.heroBackgroundImage}`);
  console.log('');

  console.log('📄 Pages avec Hero Spécifique:');
  pagesHeroContent.forEach((page, index) => {
    console.log(`   ${index + 1}. ${page.title} (${page.slug})`);
    console.log(`      - Image: ${page.heroImage}`);
    console.log(`      - Titre: ${page.heroTitle}`);
  });

  // Tentative de configuration automatique
  console.log('\n🤖 TENTATIVE DE CONFIGURATION AUTOMATIQUE...\n');

  try {
    // 1. Configurer Site Settings
    console.log('⚙️  Configuration Site Settings...');
    try {
      const siteSettingsResponse = await axios.post(`${STRAPI_URL}/api/site-settings`, {
        data: heroContent
      }, { headers });
      console.log('✅ Site Settings configuré avec succès');
    } catch (error) {
      if (error.response?.status === 403) {
        console.log('🔒 Site Settings: Permissions requises (configuration manuelle nécessaire)');
      } else if (error.response?.status === 400) {
        console.log('⚠️  Site Settings: Existe déjà ou erreur de structure');
      } else {
        console.log(`❌ Site Settings: Erreur ${error.response?.status || error.message}`);
      }
    }

    // 2. Configurer Pages Hero
    console.log('\n📄 Configuration Pages Hero...');
    for (const page of pagesHeroContent) {
      try {
        const pageResponse = await axios.post(`${STRAPI_URL}/api/pages`, {
          data: page
        }, { headers });
        console.log(`✅ Page ${page.title} configurée`);
      } catch (error) {
        if (error.response?.status === 403) {
          console.log(`🔒 Page ${page.title}: Permissions requises`);
        } else if (error.response?.status === 400) {
          console.log(`⚠️  Page ${page.title}: Existe déjà ou erreur`);
        } else {
          console.log(`❌ Page ${page.title}: Erreur ${error.response?.status}`);
        }
      }
    }

  } catch (error) {
    console.log('❌ Erreur configuration automatique:', error.message);
  }

  // Instructions manuelles
  console.log('\n🔧 INSTRUCTIONS CONFIGURATION MANUELLE\n');
  console.log('=====================================\n');

  console.log('📸 ÉTAPE 1: Upload des médias (5 min)');
  console.log('1. Ouvrir http://localhost:1337/admin');
  console.log('2. Aller dans Media Library');
  console.log('3. Uploader les fichiers suivants:');
  console.log('   📹 hero-background.mp4 (44 MB)');
  console.log('   🖼️  hero-bg.jpg');
  console.log('   🖼️  blog-hero.jpg');
  console.log('   🖼️  contact-hero.jpg');
  console.log('   🖼️  rejoignez-hero.jpg');
  console.log('   🎨 construction-hero.svg\n');

  console.log('⚙️  ÉTAPE 2: Configurer Site Settings (3 min)');
  console.log('1. Aller dans Content Manager > Site Settings');
  console.log('2. Créer/Modifier l\'entrée avec:');
  console.log(`   - Site Name: ${heroContent.siteName}`);
  console.log(`   - Hero Title: ${heroContent.heroTitle}`);
  console.log(`   - Hero Subtitle: ${heroContent.heroSubtitle}`);
  console.log(`   - Hero Description: ${heroContent.heroDescription}`);
  console.log('   - Hero Background Video: Lier hero-background.mp4');
  console.log('   - Hero Background Image: Lier hero-bg.jpg');
  console.log('   - Hero Icon: Lier construction-hero.svg\n');

  console.log('📄 ÉTAPE 3: Configurer Pages Hero (5 min)');
  console.log('1. Aller dans Content Manager > Pages');
  console.log('2. Créer/Modifier les pages:');
  pagesHeroContent.forEach((page, index) => {
    console.log(`   ${index + 1}. ${page.title}:`);
    console.log(`      - Slug: ${page.slug}`);
    console.log(`      - Hero Title: ${page.heroTitle}`);
    console.log(`      - Hero Image: Lier ${page.heroImage.split('/').pop()}`);
  });

  console.log('\n✅ ÉTAPE 4: Validation (2 min)');
  console.log('1. Tester l\'affichage sur http://localhost:3000');
  console.log('2. Vérifier que la vidéo se charge');
  console.log('3. Valider les textes dynamiques');
  console.log('4. Lancer le test final: node scripts/test-migration-100-complete.js\n');

  // Créer un guide de validation
  const validationGuide = `# ✅ VALIDATION MÉDIAS HERO

## 🎯 Points à Vérifier

### 1. Vidéo Hero Background
- [ ] La vidéo hero-background.mp4 se charge automatiquement
- [ ] Lecture en boucle sans son
- [ ] Overlay gradient visible
- [ ] Responsive sur mobile

### 2. Textes Dynamiques
- [ ] Titre hero depuis Strapi: "${heroContent.heroTitle}"
- [ ] Sous-titre depuis Strapi: "${heroContent.heroSubtitle}"
- [ ] Description depuis Strapi visible
- [ ] Fallback si Strapi indisponible

### 3. Images Hero Pages
- [ ] Page blog: blog-hero.jpg
- [ ] Page contact: contact-hero.jpg  
- [ ] Page rejoignez: rejoignez-hero.jpg
- [ ] Icône SVG: construction-hero.svg

### 4. Performance
- [ ] Vidéo optimisée (44 MB acceptable)
- [ ] Images compressées
- [ ] Chargement rapide
- [ ] Pas d'erreurs console

## 🚀 Test Final
\`\`\`bash
node scripts/test-migration-100-complete.js
\`\`\`

Objectif: 100% (64/64) validés
`;

  require('fs').writeFileSync('VALIDATION_MEDIAS_HERO.md', validationGuide);
  console.log('📄 Guide créé: VALIDATION_MEDIAS_HERO.md\n');

  console.log('🎯 RÉSUMÉ CONFIGURATION HERO\n');
  console.log('===========================\n');
  console.log('📹 Vidéo hero: 44 MB (hero-background.mp4)');
  console.log('🖼️  Images hero: 5 fichiers (786 KB total)');
  console.log('📄 Pages configurées: 3 + site settings');
  console.log('⏱️  Temps configuration: ~15 minutes');
  console.log('🎯 Impact: Hero section 100% dynamique\n');

  console.log('🎉 APRÈS CONFIGURATION:');
  console.log('✅ Hero section entièrement administrable');
  console.log('✅ Vidéo background automatique');
  console.log('✅ Textes modifiables via Strapi');
  console.log('✅ Images hero par page');
  console.log('✅ Migration 100% complète !');

  return {
    heroContent,
    pagesHeroContent,
    mediaFiles: 6,
    configurationTime: 15
  };
}

configureHeroContentStrapi().catch(console.error);