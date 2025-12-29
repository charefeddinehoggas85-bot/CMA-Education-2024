const fs = require('fs');
const path = require('path');

// Configuration des médias hero pour Strapi
function setupHeroMedias() {
  console.log('🎬 CONFIGURATION MÉDIAS HERO POUR STRAPI\n');
  console.log('=======================================\n');

  // Inventaire des médias hero disponibles
  const heroMedias = {
    images: [
      {
        file: 'public/images/hero/hero-bg.jpg',
        name: 'Hero Background',
        description: 'Image de fond principale pour la section hero',
        usage: 'Background image pour HeroSection',
        size: 'Large (recommandé 1920x1080)',
        type: 'image/jpeg'
      },
      {
        file: 'public/images/hero/construction-hero.svg',
        name: 'Construction Hero Icon',
        description: 'Icône SVG pour la section hero construction',
        usage: 'Illustration hero ou icône décorative',
        size: 'Vectoriel (scalable)',
        type: 'image/svg+xml'
      },
      {
        file: 'public/images/blog-hero.jpg',
        name: 'Blog Hero Image',
        description: 'Image hero pour la page blog',
        usage: 'Background pour page blog',
        size: 'Large',
        type: 'image/jpeg'
      },
      {
        file: 'public/images/contact-hero.jpg',
        name: 'Contact Hero Image',
        description: 'Image hero pour la page contact',
        usage: 'Background pour page contact',
        size: 'Large',
        type: 'image/jpeg'
      },
      {
        file: 'public/images/rejoignez-hero.jpg',
        name: 'Rejoignez Hero Image',
        description: 'Image hero pour section "Rejoignez-nous"',
        usage: 'Background pour call-to-action',
        size: 'Large',
        type: 'image/jpeg'
      }
    ],
    videos: [
      {
        file: 'public/videos/hero-background.mp4',
        name: 'Hero Background Video',
        description: 'Vidéo de fond pour la section hero principale',
        usage: 'Background video pour HeroSection dynamique',
        format: 'MP4',
        type: 'video/mp4'
      }
    ]
  };

  // Vérifier l'existence des fichiers
  console.log('📁 VÉRIFICATION DES FICHIERS MÉDIAS...\n');
  
  let totalFound = 0;
  let totalMissing = 0;

  console.log('🖼️  IMAGES HERO:');
  heroMedias.images.forEach((media, index) => {
    if (fs.existsSync(media.file)) {
      const stats = fs.statSync(media.file);
      const sizeKB = Math.round(stats.size / 1024);
      console.log(`✅ ${index + 1}. ${media.name}`);
      console.log(`   📄 Fichier: ${media.file}`);
      console.log(`   📏 Taille: ${sizeKB} KB`);
      console.log(`   🎯 Usage: ${media.usage}`);
      console.log('');
      totalFound++;
    } else {
      console.log(`❌ ${index + 1}. ${media.name} - MANQUANT`);
      console.log(`   📄 Fichier attendu: ${media.file}`);
      console.log('');
      totalMissing++;
    }
  });

  console.log('🎬 VIDÉOS HERO:');
  heroMedias.videos.forEach((media, index) => {
    if (fs.existsSync(media.file)) {
      const stats = fs.statSync(media.file);
      const sizeMB = Math.round(stats.size / (1024 * 1024));
      console.log(`✅ ${index + 1}. ${media.name}`);
      console.log(`   📄 Fichier: ${media.file}`);
      console.log(`   📏 Taille: ${sizeMB} MB`);
      console.log(`   🎯 Usage: ${media.usage}`);
      console.log('');
      totalFound++;
    } else {
      console.log(`❌ ${index + 1}. ${media.name} - MANQUANT`);
      console.log(`   📄 Fichier attendu: ${media.file}`);
      console.log('');
      totalMissing++;
    }
  });

  console.log('📊 RÉSUMÉ:');
  console.log(`✅ Médias trouvés: ${totalFound}`);
  console.log(`❌ Médias manquants: ${totalMissing}`);
  console.log(`📈 Total disponible: ${totalFound}/${totalFound + totalMissing}`);

  // Instructions pour l'upload dans Strapi
  console.log('\n🔧 INSTRUCTIONS UPLOAD STRAPI\n');
  console.log('============================\n');

  console.log('📸 ÉTAPE 1: Accéder à Media Library');
  console.log('1. Ouvrir http://localhost:1337/admin');
  console.log('2. Se connecter avec vos identifiants');
  console.log('3. Cliquer sur "Media Library" dans le menu de gauche\n');

  console.log('📤 ÉTAPE 2: Upload des médias hero');
  console.log('1. Cliquer sur "Upload assets"');
  console.log('2. Créer un dossier "hero" (optionnel)');
  console.log('3. Uploader les fichiers suivants:\n');

  if (totalFound > 0) {
    console.log('🖼️  IMAGES À UPLOADER:');
    heroMedias.images.forEach((media, index) => {
      if (fs.existsSync(media.file)) {
        console.log(`   ${index + 1}. ${path.basename(media.file)} (${media.name})`);
      }
    });

    console.log('\n🎬 VIDÉOS À UPLOADER:');
    heroMedias.videos.forEach((media, index) => {
      if (fs.existsSync(media.file)) {
        console.log(`   ${index + 1}. ${path.basename(media.file)} (${media.name})`);
      }
    });
  }

  console.log('\n🔗 ÉTAPE 3: Configuration dans les content types');
  console.log('1. Aller dans Content Manager');
  console.log('2. Modifier les éléments suivants:\n');

  console.log('📄 PAGES À CONFIGURER:');
  console.log('   - Site Settings: Ajouter hero background image/video');
  console.log('   - Formations: Ajouter images hero spécifiques');
  console.log('   - Pages individuelles: Lier images hero appropriées\n');

  // Créer un guide de mapping des médias
  const mediaMapping = `# 🎬 GUIDE MAPPING MÉDIAS HERO

## 📋 Correspondance Médias → Usage

### 🖼️ Images Hero
| Fichier | Usage Recommandé | Content Type | Champ |
|---------|------------------|--------------|-------|
| hero-bg.jpg | Page d'accueil principale | Site Settings | heroBackgroundImage |
| blog-hero.jpg | Page blog | Pages | heroImage (slug: blog) |
| contact-hero.jpg | Page contact | Pages | heroImage (slug: contact) |
| rejoignez-hero.jpg | Section CTA | Site Settings | ctaBackgroundImage |
| construction-hero.svg | Icône décorative | Site Settings | heroIcon |

### 🎬 Vidéos Hero
| Fichier | Usage Recommandé | Content Type | Champ |
|---------|------------------|--------------|-------|
| hero-background.mp4 | Vidéo de fond accueil | Site Settings | heroBackgroundVideo |

## 🔧 Configuration Strapi

### 1. Site Settings
- heroBackgroundImage: hero-bg.jpg
- heroBackgroundVideo: hero-background.mp4
- heroIcon: construction-hero.svg
- ctaBackgroundImage: rejoignez-hero.jpg

### 2. Pages Individuelles
- Blog: heroImage = blog-hero.jpg
- Contact: heroImage = contact-hero.jpg
- Formations: heroImage = hero-bg.jpg (par défaut)

### 3. Composant HeroSection
Le composant HeroSection utilisera automatiquement:
- Image de fallback si pas de vidéo
- Vidéo en background si disponible
- Icône décorative si configurée

## 📱 Responsive
- Images: Minimum 1920x1080 pour desktop
- Vidéo: Format MP4, optimisée web
- Fallbacks: Images pour mobile si vidéo trop lourde
`;

  fs.writeFileSync('GUIDE_MAPPING_MEDIAS_HERO.md', mediaMapping);
  console.log('📄 Guide créé: GUIDE_MAPPING_MEDIAS_HERO.md\n');

  // Créer un script de vérification des URLs
  const urlChecker = `// Vérification des URLs médias hero
export const HERO_MEDIAS = {
  images: {
    heroBg: '/images/hero/hero-bg.jpg',
    blogHero: '/images/blog-hero.jpg',
    contactHero: '/images/contact-hero.jpg',
    rejoignezHero: '/images/rejoignez-hero.jpg',
    constructionIcon: '/images/hero/construction-hero.svg'
  },
  videos: {
    heroBackground: '/videos/hero-background.mp4'
  }
};

// Fonction de vérification (côté client)
export function checkHeroMedias() {
  const results = {};
  
  Object.entries(HERO_MEDIAS.images).forEach(([key, url]) => {
    const img = new Image();
    img.onload = () => results[key] = 'OK';
    img.onerror = () => results[key] = 'ERROR';
    img.src = url;
  });
  
  return results;
}
`;

  fs.writeFileSync('src/lib/hero-medias.ts', urlChecker);
  console.log('📄 Fichier créé: src/lib/hero-medias.ts\n');

  console.log('🎯 RÉSUMÉ FINAL\n');
  console.log('==============\n');
  console.log(`📊 Médias hero disponibles: ${totalFound}`);
  console.log('📤 Prêts pour upload dans Strapi Media Library');
  console.log('🔗 Guide de mapping créé');
  console.log('⚙️  Configuration automatique préparée\n');

  console.log('🚀 PROCHAINES ÉTAPES:');
  console.log('1. Uploader les médias dans Strapi Media Library');
  console.log('2. Configurer les content types avec les médias');
  console.log('3. Tester l\'affichage sur les pages');
  console.log('4. Valider la migration 100%\n');

  if (totalFound === 0) {
    console.log('⚠️  ATTENTION: Aucun média hero trouvé !');
    console.log('Vérifiez que les fichiers sont bien présents dans:');
    console.log('- public/images/hero/');
    console.log('- public/videos/');
    console.log('- public/images/ (pour les autres images hero)');
  }

  return {
    found: totalFound,
    missing: totalMissing,
    images: heroMedias.images.filter(m => fs.existsSync(m.file)),
    videos: heroMedias.videos.filter(m => fs.existsSync(m.file))
  };
}

setupHeroMedias();