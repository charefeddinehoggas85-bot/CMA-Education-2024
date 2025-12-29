const fs = require('fs');
const path = require('path');

// Vérification de la configuration upload Strapi
function checkStrapiUploadConfig() {
  console.log('🔍 VÉRIFICATION CONFIGURATION UPLOAD STRAPI\n');
  console.log('==========================================\n');

  const strapiPath = 'cms-cma';
  
  // Vérifier les fichiers de configuration
  const configFiles = [
    'config/middlewares.ts',
    'config/server.ts',
    'config/plugins.ts'
  ];

  console.log('📁 VÉRIFICATION FICHIERS CONFIG...\n');

  configFiles.forEach(configFile => {
    const filePath = path.join(strapiPath, configFile);
    if (fs.existsSync(filePath)) {
      console.log(`✅ ${configFile} - Existe`);
      
      // Lire le contenu pour vérifier les limites
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Chercher les configurations de taille
        if (content.includes('sizeLimit') || content.includes('maxFileSize')) {
          console.log(`   📏 Configuration taille trouvée dans ${configFile}`);
        }
        
        if (content.includes('bodyParser') || content.includes('formLimit')) {
          console.log(`   📦 Configuration body parser trouvée dans ${configFile}`);
        }
      } catch (error) {
        console.log(`   ⚠️  Erreur lecture ${configFile}`);
      }
    } else {
      console.log(`❌ ${configFile} - Manquant`);
    }
  });

  // Vérifier la taille des médias à uploader
  console.log('\n📊 ANALYSE MÉDIAS À UPLOADER...\n');
  
  const mediaFiles = [
    { path: 'public/videos/hero-background.mp4', name: 'Vidéo Hero', critical: true },
    { path: 'public/images/hero/hero-bg.jpg', name: 'Image Hero BG', critical: false },
    { path: 'public/images/blog-hero.jpg', name: 'Image Blog', critical: false },
    { path: 'public/images/contact-hero.jpg', name: 'Image Contact', critical: false },
    { path: 'public/images/rejoignez-hero.jpg', name: 'Image Rejoignez', critical: false },
    { path: 'public/images/hero/construction-hero.svg', name: 'Icône SVG', critical: false }
  ];

  let totalSize = 0;
  let largestFile = { size: 0, name: '', path: '' };

  mediaFiles.forEach(media => {
    if (fs.existsSync(media.path)) {
      const stats = fs.statSync(media.path);
      const sizeKB = Math.round(stats.size / 1024);
      const sizeMB = Math.round(stats.size / (1024 * 1024));
      
      console.log(`✅ ${media.name}:`);
      console.log(`   📄 Fichier: ${media.path}`);
      
      if (sizeMB > 0) {
        console.log(`   📏 Taille: ${sizeMB} MB`);
        if (sizeMB > 50) {
          console.log(`   ⚠️  ATTENTION: Fichier très volumineux (>${sizeMB} MB)`);
        }
      } else {
        console.log(`   📏 Taille: ${sizeKB} KB`);
      }
      
      if (media.critical && sizeMB > 10) {
        console.log(`   🎯 Fichier critique volumineux - Vérifier config upload`);
      }
      
      totalSize += stats.size;
      
      if (stats.size > largestFile.size) {
        largestFile = { size: stats.size, name: media.name, path: media.path };
      }
      
      console.log('');
    } else {
      console.log(`❌ ${media.name}: Fichier non trouvé - ${media.path}`);
    }
  });

  const totalMB = Math.round(totalSize / (1024 * 1024));
  const largestMB = Math.round(largestFile.size / (1024 * 1024));

  console.log('📊 RÉSUMÉ MÉDIAS:');
  console.log(`📦 Taille totale: ${totalMB} MB`);
  console.log(`📏 Plus gros fichier: ${largestFile.name} (${largestMB} MB)`);
  console.log('');

  // Recommandations de configuration
  console.log('⚙️  RECOMMANDATIONS CONFIGURATION STRAPI\n');
  console.log('=======================================\n');

  if (largestMB > 50) {
    console.log('🔴 CRITIQUE: Fichier > 50 MB détecté');
    console.log('Action requise: Augmenter limite upload Strapi\n');
  } else if (largestMB > 10) {
    console.log('🟡 ATTENTION: Fichier > 10 MB détecté');
    console.log('Action recommandée: Vérifier limite upload Strapi\n');
  } else {
    console.log('🟢 OK: Tous les fichiers < 10 MB');
    console.log('Configuration par défaut Strapi suffisante\n');
  }

  // Créer configuration recommandée
  const recommendedConfig = {
    middlewares: `export default [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https:'],
          'media-src': ["'self'", 'data:', 'blob:', 'https:'],
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      formLimit: '256mb', // Augmenté pour vidéos
      jsonLimit: '256mb',
      textLimit: '256mb',
      formidable: {
        maxFileSize: 200 * 1024 * 1024, // 200 MB pour vidéos
      },
    },
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];`,
    plugins: `export default {
  upload: {
    config: {
      sizeLimit: 200 * 1024 * 1024, // 200 MB
      breakpoints: {
        xlarge: 1920,
        large: 1000,
        medium: 750,
        small: 500,
        xsmall: 64
      },
    },
  },
};`
  };

  // Écrire les configurations recommandées
  console.log('📄 CRÉATION CONFIGURATIONS RECOMMANDÉES...\n');

  // Middlewares config
  const middlewaresPath = path.join(strapiPath, 'config', 'middlewares.ts');
  if (largestMB > 10) {
    fs.writeFileSync(middlewaresPath, recommendedConfig.middlewares);
    console.log('✅ Configuration middlewares.ts mise à jour (limite 200 MB)');
  }

  // Plugins config
  const pluginsPath = path.join(strapiPath, 'config', 'plugins.ts');
  if (largestMB > 10) {
    fs.writeFileSync(pluginsPath, recommendedConfig.plugins);
    console.log('✅ Configuration plugins.ts créée (upload 200 MB)');
  }

  // Instructions d'upload
  console.log('\n📤 INSTRUCTIONS UPLOAD MÉDIAS\n');
  console.log('============================\n');

  console.log('🔧 ÉTAPE 1: Redémarrer Strapi (si config modifiée)');
  if (largestMB > 10) {
    console.log('⚠️  Configuration modifiée - Redémarrage requis:');
    console.log('1. Arrêter Strapi (Ctrl+C)');
    console.log('2. Relancer: npm run develop (dans cms-cma)');
    console.log('3. Attendre démarrage complet\n');
  } else {
    console.log('✅ Aucune modification config - Pas de redémarrage requis\n');
  }

  console.log('📸 ÉTAPE 2: Upload dans Media Library');
  console.log('1. Ouvrir http://localhost:1337/admin');
  console.log('2. Aller dans Media Library');
  console.log('3. Cliquer "Upload assets"');
  console.log('4. Uploader les fichiers un par un:');
  
  mediaFiles.forEach((media, index) => {
    if (fs.existsSync(media.path)) {
      const stats = fs.statSync(media.path);
      const sizeMB = Math.round(stats.size / (1024 * 1024));
      const sizeKB = Math.round(stats.size / 1024);
      
      const size = sizeMB > 0 ? `${sizeMB} MB` : `${sizeKB} KB`;
      console.log(`   ${index + 1}. ${path.basename(media.path)} (${size})`);
    }
  });

  console.log('\n✅ ÉTAPE 3: Validation upload');
  console.log('1. Vérifier que tous les fichiers sont visibles');
  console.log('2. Tester les aperçus');
  console.log('3. Noter les URLs générées\n');

  console.log('🎯 RÉSULTAT ATTENDU:');
  console.log(`📦 ${mediaFiles.length} fichiers uploadés (${totalMB} MB total)`);
  console.log('📸 Media Library complète et organisée');
  console.log('🔗 Médias prêts pour configuration content types');

  return {
    totalFiles: mediaFiles.length,
    totalSizeMB: totalMB,
    largestFileMB: largestMB,
    configUpdateRequired: largestMB > 10
  };
}

checkStrapiUploadConfig();