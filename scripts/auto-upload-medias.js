const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const STRAPI_URL = 'http://localhost:1337';

// Tentative d'upload automatique des médias
async function autoUploadMedias() {
  console.log('🤖 TENTATIVE D\'UPLOAD AUTOMATIQUE DES MÉDIAS\n');
  console.log('============================================\n');

  // Liste des fichiers à uploader
  const mediaFiles = [
    {
      path: 'public/videos/hero-background.mp4',
      name: 'hero-background.mp4',
      type: 'video/mp4',
      description: 'Vidéo de fond pour la section hero principale'
    },
    {
      path: 'public/images/hero/hero-bg.jpg',
      name: 'hero-bg.jpg',
      type: 'image/jpeg',
      description: 'Image de fond principale pour hero'
    },
    {
      path: 'public/images/hero/construction-hero.svg',
      name: 'construction-hero.svg',
      type: 'image/svg+xml',
      description: 'Icône SVG construction pour hero'
    },
    {
      path: 'public/images/blog-hero.jpg',
      name: 'blog-hero.jpg',
      type: 'image/jpeg',
      description: 'Image hero pour la page blog'
    },
    {
      path: 'public/images/contact-hero.jpg',
      name: 'contact-hero.jpg',
      type: 'image/jpeg',
      description: 'Image hero pour la page contact'
    },
    {
      path: 'public/images/rejoignez-hero.jpg',
      name: 'rejoignez-hero.jpg',
      type: 'image/jpeg',
      description: 'Image hero pour section rejoignez-nous'
    }
  ];

  console.log('📊 FICHIERS À UPLOADER:\n');
  mediaFiles.forEach((file, index) => {
    if (fs.existsSync(file.path)) {
      const stats = fs.statSync(file.path);
      const sizeMB = Math.round(stats.size / (1024 * 1024));
      const sizeKB = Math.round(stats.size / 1024);
      const size = sizeMB > 0 ? `${sizeMB} MB` : `${sizeKB} KB`;
      
      console.log(`${index + 1}. ${file.name} (${size})`);
      console.log(`   📄 Chemin: ${file.path}`);
      console.log(`   📝 Description: ${file.description}`);
      console.log('');
    } else {
      console.log(`${index + 1}. ❌ ${file.name} - FICHIER NON TROUVÉ`);
      console.log(`   📄 Chemin attendu: ${file.path}`);
      console.log('');
    }
  });

  // Test de connectivité Strapi
  console.log('🌐 Test de connectivité Strapi...');
  try {
    const response = await axios.get(`${STRAPI_URL}/api/formations`);
    console.log('✅ Strapi accessible\n');
  } catch (error) {
    console.log('❌ Strapi non accessible');
    console.log('⚠️  Vérifiez que Strapi est démarré et accessible sur http://localhost:1337\n');
    return;
  }

  // Tentative d'upload automatique
  console.log('📤 TENTATIVE D\'UPLOAD AUTOMATIQUE...\n');
  
  let uploadedCount = 0;
  let failedCount = 0;

  for (const file of mediaFiles) {
    if (!fs.existsSync(file.path)) {
      console.log(`⏭️  Ignorer ${file.name} - fichier non trouvé`);
      failedCount++;
      continue;
    }

    try {
      console.log(`📤 Upload ${file.name}...`);
      
      const formData = new FormData();
      formData.append('files', fs.createReadStream(file.path), {
        filename: file.name,
        contentType: file.type
      });

      const response = await axios.post(`${STRAPI_URL}/api/upload`, formData, {
        headers: {
          ...formData.getHeaders(),
        },
        timeout: 120000, // 2 minutes pour gros fichiers
      });

      if (response.status === 200) {
        console.log(`✅ ${file.name} uploadé avec succès`);
        console.log(`   📎 ID: ${response.data[0]?.id}`);
        console.log(`   🔗 URL: ${response.data[0]?.url}`);
        uploadedCount++;
      } else {
        console.log(`⚠️  ${file.name} - Statut ${response.status}`);
        failedCount++;
      }
    } catch (error) {
      console.log(`❌ ${file.name} - Erreur: ${error.response?.status || error.message}`);
      if (error.response?.status === 413) {
        console.log('   💡 Fichier trop volumineux - Upload manuel requis');
      } else if (error.response?.status === 401 || error.response?.status === 403) {
        console.log('   🔒 Permissions insuffisantes - Upload manuel requis');
      }
      failedCount++;
    }
    
    console.log('');
  }

  // Résumé
  console.log('📊 RÉSUMÉ UPLOAD AUTOMATIQUE:\n');
  console.log(`✅ Fichiers uploadés: ${uploadedCount}/${mediaFiles.length}`);
  console.log(`❌ Échecs: ${failedCount}/${mediaFiles.length}`);
  
  if (uploadedCount === mediaFiles.length) {
    console.log('🎉 TOUS LES FICHIERS UPLOADÉS AVEC SUCCÈS !');
    console.log('✅ Médias prêts pour configuration dans Strapi');
  } else if (uploadedCount > 0) {
    console.log('⚠️  UPLOAD PARTIEL - Certains fichiers nécessitent upload manuel');
  } else {
    console.log('❌ AUCUN FICHIER UPLOADÉ - Upload manuel requis');
  }

  // Instructions pour upload manuel si nécessaire
  if (failedCount > 0) {
    console.log('\n📋 INSTRUCTIONS UPLOAD MANUEL\n');
    console.log('=============================\n');
    
    console.log('🔧 ÉTAPE 1: Ouvrir Admin Strapi');
    console.log('URL: http://localhost:1337/admin\n');
    
    console.log('📸 ÉTAPE 2: Accéder Media Library');
    console.log('Menu gauche > Media Library\n');
    
    console.log('📤 ÉTAPE 3: Upload fichiers restants');
    console.log('Cliquer "Upload assets" et uploader:\n');
    
    mediaFiles.forEach((file, index) => {
      if (fs.existsSync(file.path)) {
        const stats = fs.statSync(file.path);
        const sizeMB = Math.round(stats.size / (1024 * 1024));
        const sizeKB = Math.round(stats.size / 1024);
        const size = sizeMB > 0 ? `${sizeMB} MB` : `${sizeKB} KB`;
        
        console.log(`${index + 1}. ${file.name} (${size})`);
        console.log(`   📁 Depuis: ${file.path}`);
        console.log('');
      }
    });
  }

  // Prochaines étapes
  console.log('🚀 PROCHAINES ÉTAPES:\n');
  
  if (uploadedCount === mediaFiles.length) {
    console.log('1. ✅ Médias uploadés - Configurer Site Settings');
    console.log('2. ✅ Lier médias aux content types');
    console.log('3. ✅ Configurer permissions APIs');
    console.log('4. ✅ Test final migration 100%');
  } else {
    console.log('1. 📤 Terminer upload manuel des médias');
    console.log('2. ✅ Configurer Site Settings avec médias');
    console.log('3. ✅ Configurer permissions APIs');
    console.log('4. ✅ Test final migration 100%');
  }

  console.log('\n💡 AIDE SUPPLÉMENTAIRE:');
  console.log('- Guide détaillé: GUIDE_UPLOAD_MEDIAS_STRAPI.md');
  console.log('- Instructions immédiates: INSTRUCTIONS_IMMEDIATES_UPLOAD.md');
  console.log('- Test final: node scripts/test-migration-100-complete.js');

  return {
    uploaded: uploadedCount,
    failed: failedCount,
    total: mediaFiles.length,
    success: uploadedCount === mediaFiles.length
  };
}

autoUploadMedias().catch(console.error);