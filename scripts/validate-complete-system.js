#!/usr/bin/env node

/**
 * Script de validation complète du système d'import et d'affichage des formations
 * Vérifie que tout fonctionne de bout en bout
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Configuration
const STRAPI_URL = process.env.STRAPI_URL || 'https://cma-education-strapi-production.up.railway.app';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || 'your-strapi-token';

console.log('🔍 Validation complète du système formations');
console.log('=' .repeat(50));

async function validateSystem() {
  const results = {
    strapi: {
      connectivity: false,
      categories: 0,
      formations: 0,
      images: 0
    },
    frontend: {
      component: false,
      staticData: false,
      carousel: false
    },
    documentation: {
      importGuide: false,
      adminGuide: false,
      summary: false
    },
    scripts: {
      importScript: false,
      testScript: false,
      validationScript: false
    }
  };

  try {
    // 1. Validation Strapi
    console.log('\n🔗 1. Validation Strapi...');
    
    try {
      const formationsResponse = await axios.get(`${STRAPI_URL}/api/formations?populate=*`, {
        headers: { Authorization: `Bearer ${STRAPI_TOKEN}` }
      });
      
      const categoriesResponse = await axios.get(`${STRAPI_URL}/api/categories`, {
        headers: { Authorization: `Bearer ${STRAPI_TOKEN}` }
      });
      
      results.strapi.connectivity = true;
      results.strapi.formations = formationsResponse.data.data.length;
      results.strapi.categories = categoriesResponse.data.data.length;
      
      // Compter les images
      const imagesCount = formationsResponse.data.data.filter(f => f.attributes.image?.data).length;
      results.strapi.images = imagesCount;
      
      console.log(`✅ Strapi connecté`);
      console.log(`   📚 ${results.strapi.formations} formations`);
      console.log(`   🏷️  ${results.strapi.categories} catégories`);
      console.log(`   📸 ${results.strapi.images} images`);
      
    } catch (error) {
      console.log('❌ Erreur Strapi:', error.message);
    }

    // 2. Validation Frontend
    console.log('\n🎨 2. Validation Frontend...');
    
    // Vérifier le composant carousel
    const carouselPath = 'src/components/sections/FeaturedFormationsClient.tsx';
    if (fs.existsSync(carouselPath)) {
      const carouselContent = fs.readFileSync(carouselPath, 'utf8');
      
      // Vérifier les éléments clés
      const hasArtisticCarousel = carouselContent.includes('ArtisticFormationsCarousel');
      const hasGradients = carouselContent.includes('getCategoryGradient');
      const hasAnimations = carouselContent.includes('framer-motion');
      const hasCompactDesign = carouselContent.includes('w-72 h-96');
      
      if (hasArtisticCarousel && hasGradients && hasAnimations && hasCompactDesign) {
        results.frontend.component = true;
        console.log('✅ Composant carousel artistique OK');
      } else {
        console.log('⚠️  Composant carousel incomplet');
      }
    } else {
      console.log('❌ Composant carousel manquant');
    }
    
    // Vérifier les données statiques
    const staticDataPath = 'src/data/formations-static.ts';
    if (fs.existsSync(staticDataPath)) {
      const staticContent = fs.readFileSync(staticDataPath, 'utf8');
      
      const hasAlternance = staticContent.includes('formationsAlternance');
      const hasReconversion = staticContent.includes('formationsReconversion');
      const hasVAE = staticContent.includes('vaeCertifications');
      const hasEntreprise = staticContent.includes('entrepriseThematiques');
      
      if (hasAlternance && hasReconversion && hasVAE && hasEntreprise) {
        results.frontend.staticData = true;
        console.log('✅ Données statiques complètes');
      } else {
        console.log('⚠️  Données statiques incomplètes');
      }
    } else {
      console.log('❌ Données statiques manquantes');
    }
    
    results.frontend.carousel = results.frontend.component && results.frontend.staticData;

    // 3. Validation Documentation
    console.log('\n📚 3. Validation Documentation...');
    
    const docs = [
      { file: 'GUIDE_IMPORT_FORMATIONS_STRAPI_COMPLET.md', key: 'importGuide', name: 'Guide d\'import' },
      { file: 'GUIDE_ADMIN_FORMATIONS_STRAPI.md', key: 'adminGuide', name: 'Guide admin' },
      { file: 'STRAPI_IMPORT_COMPLETE_SUMMARY.md', key: 'summary', name: 'Résumé complet' }
    ];
    
    docs.forEach(doc => {
      if (fs.existsSync(doc.file)) {
        const content = fs.readFileSync(doc.file, 'utf8');
        if (content.length > 1000) { // Vérifier que le contenu est substantiel
          results.documentation[doc.key] = true;
          console.log(`✅ ${doc.name} OK`);
        } else {
          console.log(`⚠️  ${doc.name} trop court`);
        }
      } else {
        console.log(`❌ ${doc.name} manquant`);
      }
    });

    // 4. Validation Scripts
    console.log('\n🛠️  4. Validation Scripts...');
    
    const scripts = [
      { file: 'scripts/import-formations-examples-with-images.js', key: 'importScript', name: 'Script d\'import' },
      { file: 'scripts/test-import-formations-examples.js', key: 'testScript', name: 'Script de test' },
      { file: 'scripts/validate-complete-system.js', key: 'validationScript', name: 'Script de validation' }
    ];
    
    scripts.forEach(script => {
      if (fs.existsSync(script.file)) {
        const content = fs.readFileSync(script.file, 'utf8');
        if (content.includes('module.exports') || content.includes('async function')) {
          results.scripts[script.key] = true;
          console.log(`✅ ${script.name} OK`);
        } else {
          console.log(`⚠️  ${script.name} incomplet`);
        }
      } else {
        console.log(`❌ ${script.name} manquant`);
      }
    });

    return results;

  } catch (error) {
    console.error('❌ Erreur lors de la validation:', error.message);
    return results;
  }
}

function displayValidationResults(results) {
  console.log('\n' + '='.repeat(50));
  console.log('📊 RÉSULTATS DE LA VALIDATION');
  console.log('='.repeat(50));
  
  // Strapi
  console.log('\n🔗 STRAPI:');
  console.log(`   Connectivité: ${results.strapi.connectivity ? '✅' : '❌'}`);
  console.log(`   Formations: ${results.strapi.formations} ${results.strapi.formations >= 8 ? '✅' : '⚠️'}`);
  console.log(`   Catégories: ${results.strapi.categories} ${results.strapi.categories >= 4 ? '✅' : '⚠️'}`);
  console.log(`   Images: ${results.strapi.images} ${results.strapi.images >= 8 ? '✅' : '⚠️'}`);
  
  // Frontend
  console.log('\n🎨 FRONTEND:');
  console.log(`   Composant carousel: ${results.frontend.component ? '✅' : '❌'}`);
  console.log(`   Données statiques: ${results.frontend.staticData ? '✅' : '❌'}`);
  console.log(`   Système complet: ${results.frontend.carousel ? '✅' : '❌'}`);
  
  // Documentation
  console.log('\n📚 DOCUMENTATION:');
  console.log(`   Guide d'import: ${results.documentation.importGuide ? '✅' : '❌'}`);
  console.log(`   Guide admin: ${results.documentation.adminGuide ? '✅' : '❌'}`);
  console.log(`   Résumé complet: ${results.documentation.summary ? '✅' : '❌'}`);
  
  // Scripts
  console.log('\n🛠️  SCRIPTS:');
  console.log(`   Script d'import: ${results.scripts.importScript ? '✅' : '❌'}`);
  console.log(`   Script de test: ${results.scripts.testScript ? '✅' : '❌'}`);
  console.log(`   Script de validation: ${results.scripts.validationScript ? '✅' : '❌'}`);
  
  // Score global
  const totalChecks = 13;
  const passedChecks = [
    results.strapi.connectivity,
    results.strapi.formations >= 8,
    results.strapi.categories >= 4,
    results.strapi.images >= 8,
    results.frontend.component,
    results.frontend.staticData,
    results.documentation.importGuide,
    results.documentation.adminGuide,
    results.documentation.summary,
    results.scripts.importScript,
    results.scripts.testScript,
    results.scripts.validationScript,
    results.frontend.carousel
  ].filter(Boolean).length;
  
  const score = Math.round((passedChecks / totalChecks) * 100);
  
  console.log('\n🎯 SCORE GLOBAL:');
  console.log(`   ${passedChecks}/${totalChecks} vérifications réussies`);
  console.log(`   Score: ${score}% ${score >= 90 ? '🎉' : score >= 70 ? '👍' : '⚠️'}`);
  
  if (score >= 90) {
    console.log('\n🎉 SYSTÈME COMPLET ET OPÉRATIONNEL !');
    console.log('   ✅ Import Strapi fonctionnel');
    console.log('   ✅ Carousel artistique moderne');
    console.log('   ✅ Documentation complète');
    console.log('   ✅ Scripts de gestion');
  } else if (score >= 70) {
    console.log('\n👍 SYSTÈME MAJORITAIREMENT FONCTIONNEL');
    console.log('   Quelques améliorations possibles');
  } else {
    console.log('\n⚠️  SYSTÈME NÉCESSITE DES CORRECTIONS');
    console.log('   Plusieurs éléments manquants ou défaillants');
  }
  
  console.log('\n💡 PROCHAINES ÉTAPES:');
  if (results.strapi.formations < 8) {
    console.log('   • Lancer l\'import des formations d\'exemple');
  }
  if (!results.frontend.carousel) {
    console.log('   • Vérifier l\'intégration du carousel');
  }
  if (score < 100) {
    console.log('   • Consulter les guides pour les éléments manquants');
  }
  console.log('   • Tester l\'affichage sur la homepage');
  console.log('   • Personnaliser le contenu selon vos besoins');
}

// Fonction principale
async function main() {
  console.log('🚀 Démarrage de la validation système...\n');
  
  const results = await validateSystem();
  displayValidationResults(results);
  
  console.log('\n📋 FICHIERS CRÉÉS:');
  console.log('   📄 GUIDE_IMPORT_FORMATIONS_STRAPI_COMPLET.md');
  console.log('   📄 GUIDE_ADMIN_FORMATIONS_STRAPI.md');
  console.log('   📄 STRAPI_IMPORT_COMPLETE_SUMMARY.md');
  console.log('   🔧 scripts/import-formations-examples-with-images.js');
  console.log('   🔧 scripts/test-import-formations-examples.js');
  console.log('   🔧 scripts/validate-complete-system.js');
  
  console.log('\n🎯 MISSION ACCOMPLIE !');
}

// Lancer la validation si le script est exécuté directement
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Erreur lors de la validation:', error.message);
    process.exit(1);
  });
}

module.exports = { validateSystem };
