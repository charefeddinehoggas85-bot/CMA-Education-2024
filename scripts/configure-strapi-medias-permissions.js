const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

const STRAPI_URL = 'http://localhost:1337';

// Configuration complète des médias et permissions Strapi
async function configureStrapiMediasPermissions() {
  console.log('🎯 CONFIGURATION FINALE STRAPI - MÉDIAS & PERMISSIONS\n');
  console.log('=====================================================\n');

  // 1. Test de connectivité
  console.log('🌐 Test de connectivité Strapi...');
  try {
    const response = await axios.get(`${STRAPI_URL}/api/formations`);
    console.log('✅ Strapi accessible');
  } catch (error) {
    console.log('❌ Strapi non accessible:', error.message);
    console.log('⚠️  Vérifiez que Strapi est démarré: npm run cms:dev');
    return;
  }

  // 2. Vérifier les permissions actuelles
  console.log('\n📡 Vérification des permissions actuelles...');
  const apisToTest = [
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
    { name: 'Contact Info', endpoint: '/api/contact-info' },
    { name: 'Modalités', endpoint: '/api/modalites' }
  ];

  let workingAPIs = 0;
  let permissionIssues = 0;
  let notFoundIssues = 0;

  for (const api of apisToTest) {
    try {
      const response = await axios.get(`${STRAPI_URL}${api.endpoint}`);
      if (response.status === 200) {
        const count = response.data.data?.length || (response.data.data ? 1 : 0);
        console.log(`✅ ${api.name}: ${count} éléments`);
        workingAPIs++;
      }
    } catch (error) {
      if (error.response?.status === 403) {
        console.log(`🔒 ${api.name}: Permissions manquantes (403)`);
        permissionIssues++;
      } else if (error.response?.status === 404) {
        console.log(`🔍 ${api.name}: Content type non trouvé (404)`);
        notFoundIssues++;
      } else {
        console.log(`❌ ${api.name}: Erreur ${error.response?.status || error.message}`);
      }
    }
  }

  console.log(`\n📊 STATUT APIS:`);
  console.log(`✅ Fonctionnelles: ${workingAPIs}/${apisToTest.length}`);
  console.log(`🔒 Permissions: ${permissionIssues}`);
  console.log(`🔍 Non trouvées: ${notFoundIssues}`);

  // 3. Vérifier les médias disponibles
  console.log('\n📸 Vérification des médias disponibles...');
  const mediaFolders = [
    'public/images/hero',
    'public/images/formations',
    'public/images/partners',
    'public/images/testimonials',
    'public/images/gallery',
    'public/images/about',
    'public/images/blog'
  ];

  let totalImages = 0;
  for (const folder of mediaFolders) {
    try {
      if (fs.existsSync(folder)) {
        const files = fs.readdirSync(folder);
        const imageFiles = files.filter(file => 
          /\.(jpg|jpeg|png|webp|svg)$/i.test(file)
        );
        console.log(`📁 ${folder}: ${imageFiles.length} images`);
        totalImages += imageFiles.length;
      } else {
        console.log(`📁 ${folder}: Dossier non trouvé`);
      }
    } catch (error) {
      console.log(`📁 ${folder}: Erreur lecture`);
    }
  }

  console.log(`\n📊 Total images disponibles: ${totalImages}`);

  // 4. Instructions pour la configuration manuelle
  console.log('\n🔧 INSTRUCTIONS CONFIGURATION MANUELLE\n');
  console.log('=====================================\n');

  console.log('📡 ÉTAPE 1: Configurer les permissions APIs (5 min)');
  console.log('1. Ouvrir http://localhost:1337/admin dans votre navigateur');
  console.log('2. Se connecter avec vos identifiants admin');
  console.log('3. Aller dans Settings > Users & Permissions Plugin > Roles');
  console.log('4. Cliquer sur "Public"');
  console.log('5. Pour chaque content type, activer:');
  console.log('   ✅ find (lecture liste)');
  console.log('   ✅ findOne (lecture élément)');
  console.log('6. Sauvegarder');

  if (permissionIssues > 0) {
    console.log(`\n🔒 Content types nécessitant des permissions (${permissionIssues}):`);
    console.log('   - Site Settings');
    console.log('   - Statistiques Site');
    console.log('   - Processus Admissions');
    console.log('   - Valeurs École');
    console.log('   - VAE Formules');
    console.log('   - Entreprise Services');
  }

  if (notFoundIssues > 0) {
    console.log(`\n🔍 Content types à vérifier/créer (${notFoundIssues}):`);
    console.log('   - Galleries');
    console.log('   - FAQ');
    console.log('   - SEO Settings');
    console.log('   - Navigation Menus');
    console.log('   - Contact Info');
    console.log('   - Modalités');
  }

  console.log('\n📸 ÉTAPE 2: Configurer la bibliothèque de médias (3 min)');
  console.log('1. Dans l\'admin Strapi, aller dans "Media Library"');
  console.log('2. Cliquer sur "Upload assets"');
  console.log('3. Sélectionner et uploader les images depuis:');
  console.log('   📁 public/images/hero/ (images hero)');
  console.log('   📁 public/images/formations/ (images formations)');
  console.log('   📁 public/images/partners/ (logos partenaires)');
  console.log('   📁 public/images/gallery/ (galerie)');
  console.log('4. Organiser en dossiers si nécessaire');

  console.log('\n🔗 ÉTAPE 3: Lier les médias aux content types (5 min)');
  console.log('1. Aller dans Content Manager');
  console.log('2. Pour chaque content type avec images:');
  console.log('   - Formations: ajouter image de couverture');
  console.log('   - Partners: ajouter logo');
  console.log('   - Testimonials: ajouter photo');
  console.log('   - Galleries: ajouter images');
  console.log('3. Sauvegarder chaque élément');

  console.log('\n✅ ÉTAPE 4: Validation finale (2 min)');
  console.log('1. Lancer le test: node scripts/test-migration-100-complete.js');
  console.log('2. Vérifier que le score passe à 100%');
  console.log('3. Tester l\'affichage des images sur le site');

  // 5. Créer un guide rapide pour les médias
  const mediaGuide = `# 📸 GUIDE RAPIDE - CONFIGURATION MÉDIAS STRAPI

## 🎯 Objectif
Configurer la bibliothèque de médias Strapi pour les images du site.

## 📁 Images Disponibles (${totalImages} total)
${mediaFolders.map(folder => {
    if (fs.existsSync(folder)) {
      const files = fs.readdirSync(folder);
      const imageFiles = files.filter(file => /\.(jpg|jpeg|png|webp|svg)$/i.test(file));
      return `- **${folder}**: ${imageFiles.length} images\\n  ${imageFiles.slice(0, 3).join(', ')}${imageFiles.length > 3 ? '...' : ''}`;
    }
    return `- **${folder}**: Dossier non trouvé`;
  }).join('\\n')}

## 🔧 Configuration Rapide

### 1. Accéder à la Media Library
- Ouvrir http://localhost:1337/admin
- Cliquer sur "Media Library" dans le menu

### 2. Upload des Images
- Cliquer "Upload assets"
- Sélectionner les images par dossier
- Organiser en dossiers (hero, formations, partners, etc.)

### 3. Lier aux Content Types
- Content Manager > Formations > Ajouter images
- Content Manager > Partners > Ajouter logos
- Content Manager > Galleries > Ajouter images

### 4. Validation
- Tester l'affichage sur le site
- Vérifier les URLs des images

## 📋 Checklist
- [ ] Upload images hero
- [ ] Upload logos partenaires  
- [ ] Upload images formations
- [ ] Upload images galerie
- [ ] Lier aux content types
- [ ] Tester affichage site
`;

  fs.writeFileSync('GUIDE_MEDIAS_STRAPI.md', mediaGuide);
  console.log('\n📄 Guide créé: GUIDE_MEDIAS_STRAPI.md');

  // 6. Résumé final
  console.log('\n🎯 RÉSUMÉ CONFIGURATION FINALE\n');
  console.log('==============================\n');
  
  console.log(`📊 APIs: ${workingAPIs}/${apisToTest.length} fonctionnelles`);
  console.log(`📸 Médias: ${totalImages} images disponibles`);
  console.log(`⏱️  Temps estimé: 15 minutes`);
  
  console.log('\n🚀 APRÈS CONFIGURATION:');
  console.log('✅ APIs: 100% fonctionnelles');
  console.log('✅ Médias: Bibliothèque complète');
  console.log('✅ Score global: 100%');
  console.log('✅ Site: 100% administrable');

  console.log('\n🎉 MIGRATION STRAPI 100% PARFAITE À PORTÉE DE MAIN !');
  
  return {
    workingAPIs,
    totalAPIs: apisToTest.length,
    permissionIssues,
    notFoundIssues,
    totalImages
  };
}

configureStrapiMediasPermissions().catch(console.error);