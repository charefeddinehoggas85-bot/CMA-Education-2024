/**
 * Test script pour vérifier l'intégration frontend-Strapi
 */

const NEXT_URL = 'http://localhost:3001';

async function testFrontendIntegration() {
  try {
    console.log('🔍 Test de l\'intégration frontend-Strapi...\n');

    // Test de la page formations
    console.log('📚 Test de la page formations...');
    const formationsResponse = await fetch(`${NEXT_URL}/formations`);
    
    if (formationsResponse.ok) {
      console.log('✅ Page formations accessible');
      const html = await formationsResponse.text();
      
      // Vérifier si les formations Strapi sont chargées
      if (html.includes('Chargement des formations')) {
        console.log('⚠️ Page en cours de chargement (normal)');
      } else if (html.includes('Formation en alternance')) {
        console.log('✅ Contenu des formations détecté');
      }
    } else {
      console.log(`❌ Page formations inaccessible: ${formationsResponse.status}`);
    }

    // Test de l'API Next.js (si elle existe)
    console.log('\n🔗 Test des API routes Next.js...');
    try {
      const apiResponse = await fetch(`${NEXT_URL}/api/formations`);
      if (apiResponse.ok) {
        console.log('✅ API Next.js accessible');
      } else {
        console.log('⚠️ API Next.js non configurée (normal)');
      }
    } catch (error) {
      console.log('⚠️ API Next.js non configurée (normal)');
    }

    console.log('\n🎉 Test terminé!');
    console.log('\n💡 Pour vérifier complètement:');
    console.log('  1. Ouvrez http://localhost:3001/formations dans votre navigateur');
    console.log('  2. Vérifiez que les formations Strapi s\'affichent');
    console.log('  3. Testez la navigation vers une formation individuelle');

  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message);
    console.log('\n💡 Vérifiez que:');
    console.log('  - Next.js est démarré (npm run dev)');
    console.log('  - Strapi est démarré (npm run develop dans cms-cma/)');
    console.log('  - Les variables d\'environnement sont correctes');
  }
}

testFrontendIntegration();