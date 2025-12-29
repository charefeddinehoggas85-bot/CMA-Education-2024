const axios = require('axios');
const fs = require('fs');
const path = require('path');

const STRAPI_URL = 'http://localhost:1337';

// Test complet de la migration 100%
async function testMigration100Complete() {
  console.log('🎉 TEST FINAL - MIGRATION 100% COMPLÈTE\n');
  console.log('=====================================\n');

  let totalScore = 0;
  let maxScore = 0;

  // 1. Test des composants (25 points)
  console.log('🧩 TEST COMPOSANTS (25 points)...\n');
  const componentsToCheck = [
    'src/components/layout/Header.tsx',
    'src/components/layout/Footer.tsx',
    'src/components/sections/HeroSection.tsx',
    'src/components/sections/ModalitesSection.tsx',
    'src/components/sections/FormationsSection.tsx',
    'src/components/sections/InstitutionalSection.tsx',
    'src/components/sections/SocialProofSection.tsx',
    'src/components/sections/AccessibilityBanner.tsx',
    'src/components/sections/GallerySection.tsx',
    'src/components/sections/ContactSection.tsx',
    'src/components/sections/ProcessSection.tsx',
    'src/components/sections/ValuesSection.tsx',
    'src/components/sections/StatsSection.tsx',
    'src/components/sections/PartnersSection.tsx',
    'src/components/sections/TestimonialsSection.tsx',
    'src/components/sections/FormationDetailsSection.tsx',
    'src/components/ui/ImageGallery.tsx',
    'src/components/ui/PartnersLogos.tsx',
    'src/components/ui/FormationsDropdown.tsx'
  ];

  let componentsScore = 0;
  for (const component of componentsToCheck) {
    if (fs.existsSync(component)) {
      console.log(`✅ ${component}`);
      componentsScore++;
    } else {
      console.log(`❌ ${component}`);
    }
  }
  
  const componentsPercentage = Math.round((componentsScore / componentsToCheck.length) * 100);
  console.log(`\n📊 Composants: ${componentsPercentage}% (${componentsScore}/${componentsToCheck.length})`);
  totalScore += componentsScore;
  maxScore += componentsToCheck.length;

  // 2. Test des pages (20 points)
  console.log('\n📄 TEST PAGES (20 points)...\n');
  const pagesToCheck = [
    'src/app/page.tsx',
    'src/app/about/page.tsx',
    'src/app/contact/page.tsx',
    'src/app/formations/page.tsx',
    'src/app/partenaires/page.tsx',
    'src/app/pedagogie/page.tsx',
    'src/app/confidentialite/page.tsx',
    'src/app/vie-etudiante/page.tsx',
    'src/app/blog/page.tsx',
    'src/app/formateurs/page.tsx',
    'src/app/formations/vae-btp/page.tsx',
    'src/app/formations/entreprises/page.tsx',
    'src/app/formations/alt-bac2-charge-affaires/page.tsx',
    'src/app/formations/alt-bac2-chef-chantier-vrd/page.tsx',
    'src/app/formations/alt-bac2-conducteur-travaux/page.tsx',
    'src/app/formations/alt-bac3-conducteur-vrd-1an/page.tsx',
    'src/app/formations/alt-bac3-conducteur-vrd-2ans/page.tsx',
    'src/app/formations/alt-bac3-double-parcours/page.tsx',
    'src/app/formations/alt-bac5-chef-projets/page.tsx',
    'src/app/formations/reconversion-btp/page.tsx'
  ];

  let pagesScore = 0;
  for (const page of pagesToCheck) {
    if (fs.existsSync(page)) {
      console.log(`✅ ${page}`);
      pagesScore++;
    } else {
      console.log(`❌ ${page}`);
    }
  }
  
  const pagesPercentage = Math.round((pagesScore / pagesToCheck.length) * 100);
  console.log(`\n📊 Pages: ${pagesPercentage}% (${pagesScore}/${pagesToCheck.length})`);
  totalScore += pagesScore;
  maxScore += pagesToCheck.length;

  // 3. Test des APIs Strapi (15 points)
  console.log('\n📡 TEST APIS STRAPI (15 points)...\n');
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

  let apisScore = 0;
  for (const api of apisToTest) {
    try {
      const response = await axios.get(`${STRAPI_URL}${api.endpoint}`);
      if (response.status === 200) {
        const count = response.data.data?.length || (response.data.data ? 1 : 0);
        console.log(`✅ ${api.name}: ${count} éléments`);
        apisScore++;
      } else {
        console.log(`⚠️  ${api.name}: Statut ${response.status}`);
      }
    } catch (error) {
      const status = error.response?.status || 'Erreur';
      console.log(`❌ ${api.name}: ${status}`);
    }
  }
  
  const apisPercentage = Math.round((apisScore / apisToTest.length) * 100);
  console.log(`\n📊 APIs: ${apisPercentage}% (${apisScore}/${apisToTest.length})`);
  totalScore += apisScore;
  maxScore += apisToTest.length;

  // 4. Test des scripts (10 points)
  console.log('\n🛠️  TEST SCRIPTS (10 points)...\n');
  const scriptsToCheck = [
    'scripts/create-content-types.js',
    'scripts/create-missing-content-types.js',
    'scripts/import-missing-data.js',
    'scripts/import-complete-data-100.js',
    'scripts/test-phase5-final.js',
    'scripts/test-migration-100-complete.js',
    'scripts/migrate-all-remaining-pages.js',
    'scripts/fix-strapi-permissions.js',
    'scripts/test-simple-apis.js',
    'scripts/import-partners-testimonials.js'
  ];

  let scriptsScore = 0;
  for (const script of scriptsToCheck) {
    if (fs.existsSync(script)) {
      console.log(`✅ ${script}`);
      scriptsScore++;
    } else {
      console.log(`❌ ${script}`);
    }
  }
  
  const scriptsPercentage = Math.round((scriptsScore / scriptsToCheck.length) * 100);
  console.log(`\n📊 Scripts: ${scriptsPercentage}% (${scriptsScore}/${scriptsToCheck.length})`);
  totalScore += scriptsScore;
  maxScore += scriptsToCheck.length;

  // Calcul du score final
  const finalPercentage = Math.round((totalScore / maxScore) * 100);
  
  console.log('\n🎯 RÉSULTATS FINAUX MIGRATION 100%\n');
  console.log('=====================================\n');
  
  console.log(`🧩 Composants: ${componentsPercentage}% (${componentsScore}/${componentsToCheck.length})`);
  console.log(`📄 Pages: ${pagesPercentage}% (${pagesScore}/${pagesToCheck.length})`);
  console.log(`📡 APIs: ${apisPercentage}% (${apisScore}/${apisToTest.length})`);
  console.log(`🛠️  Scripts: ${scriptsPercentage}% (${scriptsScore}/${scriptsToCheck.length})`);
  
  console.log(`\n🎉 SCORE GLOBAL: ${finalPercentage}% (${totalScore}/${maxScore})`);
  
  // Barre de progression visuelle
  const progressBar = '█'.repeat(Math.floor(finalPercentage / 2)) + '░'.repeat(50 - Math.floor(finalPercentage / 2));
  console.log(`\n${progressBar} ${finalPercentage}%`);
  
  // Évaluation finale
  if (finalPercentage >= 95) {
    console.log('\n🏆 EXCELLENT ! Migration 100% quasi-parfaite !');
    console.log('🎉 Objectif atteint avec brio !');
  } else if (finalPercentage >= 90) {
    console.log('\n🎉 TRÈS BIEN ! Migration très avancée !');
    console.log('👍 Objectif pratiquement atteint !');
  } else if (finalPercentage >= 80) {
    console.log('\n👍 BIEN ! Bonne progression !');
    console.log('⚡ Quelques ajustements nécessaires');
  } else {
    console.log('\n⚠️  Progression à améliorer');
    console.log('🔧 Travail supplémentaire requis');
  }

  // Recommandations
  console.log('\n💡 RECOMMANDATIONS:\n');
  
  if (componentsPercentage < 100) {
    console.log('🧩 Composants: Vérifier les composants manquants');
  }
  if (pagesPercentage < 100) {
    console.log('📄 Pages: Créer les pages manquantes');
  }
  if (apisPercentage < 80) {
    console.log('📡 APIs: Configurer les permissions Strapi');
    console.log('   → Ouvrir http://localhost:1337/admin');
    console.log('   → Settings > Users & Permissions > Roles > Public');
    console.log('   → Activer "find" et "findOne" pour tous les content types');
  }
  if (scriptsPercentage < 100) {
    console.log('🛠️  Scripts: Vérifier les scripts manquants');
  }

  console.log('\n🚀 PROCHAINES ÉTAPES:');
  console.log('1. Configurer les permissions Strapi si nécessaire');
  console.log('2. Tester le site en mode développement');
  console.log('3. Valider toutes les fonctionnalités');
  console.log('4. Préparer la mise en production');

  console.log('\n⚡ MIGRATION VERS 100% - PHASE 6 TERMINÉE !');
  
  return {
    components: componentsPercentage,
    pages: pagesPercentage,
    apis: apisPercentage,
    scripts: scriptsPercentage,
    global: finalPercentage
  };
}

testMigration100Complete().catch(console.error);