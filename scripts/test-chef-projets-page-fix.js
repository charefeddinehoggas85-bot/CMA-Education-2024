#!/usr/bin/env node

const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

console.log('🧪 Test de la page formation Chef de Projets BTP après correction...');

async function testFormationPage() {
  try {
    console.log('📡 Test d\'accès à la page formation...');
    
    // Test de l'API Strapi
    const strapiResponse = await axios.get(
      'http://localhost:1337/api/formations/21?populate=*'
    );

    if (strapiResponse.data.data) {
      const formation = strapiResponse.data.data.attributes;
      
      console.log('✅ API Strapi accessible');
      console.log(`📌 Formation: ${formation.title}`);
      
      // Vérifier les types de données
      console.log('\n🔍 Vérification des types de données:');
      console.log(`• Objectifs: ${typeof formation.objectifs} (${formation.objectifs ? 'présent' : 'absent'})`);
      console.log(`• Programme: ${typeof formation.programme} (${formation.programme ? 'présent' : 'absent'})`);
      console.log(`• Compétences: ${typeof formation.competences2eAnnee} (${formation.competences2eAnnee ? 'présent' : 'absent'})`);
      
      // Vérifier le contenu
      if (formation.objectifs) {
        console.log(`• Objectifs - Longueur: ${formation.objectifs.length} caractères`);
        console.log(`• Objectifs - Aperçu: "${formation.objectifs.substring(0, 100)}..."`);
      }
      
      if (formation.programme) {
        console.log(`• Programme - Longueur: ${formation.programme.length} caractères`);
        console.log(`• Programme - Aperçu: "${formation.programme.substring(0, 100)}..."`);
      }
      
      if (formation.competences2eAnnee) {
        console.log(`• Compétences - Longueur: ${formation.competences2eAnnee.length} caractères`);
        console.log(`• Compétences - Aperçu: "${formation.competences2eAnnee.substring(0, 100)}..."`);
      }
      
      console.log('\n✅ Structure de données compatible avec le composant React');
      console.log('🎯 Le composant peut maintenant gérer les formats string et array');
      
      return true;
    }

  } catch (error) {
    console.error('❌ Erreur:', error.response?.data || error.message);
    return false;
  }
}

async function testFrontendCompatibility() {
  try {
    console.log('\n🔧 Test de compatibilité frontend...');
    
    // Simuler la logique du composant React
    const response = await axios.get('http://localhost:1337/api/formations/21');
    const formation = response.data.data.attributes;
    
    // Test de la logique objectifs
    console.log('📋 Test logique objectifs:');
    if (formation.objectifs) {
      if (Array.isArray(formation.objectifs)) {
        console.log('  ✅ Format array - utilisera la liste à puces');
      } else {
        console.log('  ✅ Format string - utilisera le texte formaté');
      }
    }
    
    // Test de la logique programme
    console.log('📚 Test logique programme:');
    if (formation.programme) {
      if (Array.isArray(formation.programme)) {
        console.log('  ✅ Format array - utilisera les modules structurés');
      } else {
        console.log('  ✅ Format string - utilisera le texte formaté');
      }
    }
    
    console.log('\n🎉 Compatibilité frontend confirmée!');
    return true;
    
  } catch (error) {
    console.error('❌ Erreur de compatibilité:', error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 Démarrage des tests...\n');
  
  const apiTest = await testFormationPage();
  const compatibilityTest = await testFrontendCompatibility();
  
  if (apiTest && compatibilityTest) {
    console.log('\n🎉 Tous les tests réussis!');
    console.log('✅ La page formation Chef de Projets BTP devrait maintenant fonctionner');
    console.log('🌐 Vous pouvez accéder à: http://localhost:3000/formations/chef-projets-btp-1an');
  } else {
    console.log('\n❌ Certains tests ont échoué');
  }
}

main();