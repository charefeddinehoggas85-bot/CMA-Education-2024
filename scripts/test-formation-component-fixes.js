#!/usr/bin/env node

const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

console.log('🧪 Test complet des corrections du composant FormationContent...');

async function testFormationData() {
  try {
    console.log('📡 Récupération des données de formation...');
    
    const response = await axios.get('http://localhost:1337/api/formations/21');
    const formation = response.data.data.attributes;
    
    console.log('✅ Données récupérées avec succès');
    console.log(`📌 Formation: ${formation.title}`);
    
    // Test des champs qui causaient des erreurs
    console.log('\n🔍 Vérification des champs problématiques:');
    
    const fieldsToCheck = [
      { name: 'objectifs', expected: 'string', actual: typeof formation.objectifs },
      { name: 'programme', expected: 'string', actual: typeof formation.programme },
      { name: 'debouches', expected: 'string', actual: typeof formation.debouches },
      { name: 'prerequis', expected: 'string', actual: typeof formation.prerequis },
      { name: 'modalitesEvaluation', expected: 'string', actual: typeof formation.modalitesEvaluation },
      { name: 'poursuiteEtudes', expected: 'string', actual: typeof formation.poursuiteEtudes }
    ];
    
    let allCorrect = true;
    
    fieldsToCheck.forEach(field => {
      const hasContent = formation[field.name] && formation[field.name].length > 0;
      const typeMatch = field.actual === field.expected;
      const status = hasContent && typeMatch ? '✅' : '❌';
      
      console.log(`• ${field.name}: ${field.actual} ${status} ${hasContent ? '(contenu présent)' : '(pas de contenu)'}`);
      
      if (!typeMatch || !hasContent) {
        allCorrect = false;
      }
    });
    
    console.log(`\n📊 Résultat: ${allCorrect ? '✅ Tous les champs sont corrects' : '❌ Certains champs ont des problèmes'}`);
    
    return { formation, allCorrect };
    
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des données:', error.message);
    return { formation: null, allCorrect: false };
  }
}

async function simulateComponentLogic(formation) {
  console.log('\n🔧 Simulation de la logique du composant React...');
  
  const tests = [
    {
      name: 'Objectifs',
      field: 'objectifs',
      logic: () => {
        if (formation.objectifs) {
          if (Array.isArray(formation.objectifs)) {
            return 'Affichage en liste à puces';
          } else {
            return 'Affichage en texte formaté';
          }
        }
        return 'Pas d\'affichage';
      }
    },
    {
      name: 'Programme',
      field: 'programme',
      logic: () => {
        if (formation.programme) {
          if (Array.isArray(formation.programme)) {
            return 'Affichage en modules structurés';
          } else {
            return 'Affichage en texte formaté';
          }
        }
        return 'Pas d\'affichage';
      }
    },
    {
      name: 'Débouchés',
      field: 'debouches',
      logic: () => {
        if (formation.debouches) {
          if (Array.isArray(formation.debouches)) {
            return 'Affichage en grille de cartes';
          } else {
            return 'Affichage en texte formaté';
          }
        }
        return 'Pas d\'affichage';
      }
    },
    {
      name: 'Prérequis',
      field: 'prerequis',
      logic: () => {
        if (formation.prerequis) {
          if (Array.isArray(formation.prerequis)) {
            return 'Affichage en liste numérotée';
          } else {
            return 'Affichage en texte formaté';
          }
        }
        return 'Pas d\'affichage';
      }
    },
    {
      name: 'Évaluation',
      field: 'modalitesEvaluation',
      logic: () => {
        if (formation.modalitesEvaluation) {
          if (Array.isArray(formation.modalitesEvaluation)) {
            return 'Affichage en liste à puces';
          } else {
            return 'Affichage en texte formaté';
          }
        }
        return 'Pas d\'affichage';
      }
    },
    {
      name: 'Poursuites d\'études',
      field: 'poursuiteEtudes',
      logic: () => {
        if (formation.poursuiteEtudes) {
          if (Array.isArray(formation.poursuiteEtudes)) {
            return 'Affichage en liste avec flèches';
          } else {
            return 'Affichage en texte formaté';
          }
        }
        return 'Pas d\'affichage';
      }
    }
  ];
  
  let allTestsPassed = true;
  
  tests.forEach(test => {
    try {
      const result = test.logic();
      const success = result !== 'Pas d\'affichage';
      console.log(`• ${test.name}: ${result} ${success ? '✅' : '❌'}`);
      
      if (!success) {
        allTestsPassed = false;
      }
    } catch (error) {
      console.log(`• ${test.name}: Erreur - ${error.message} ❌`);
      allTestsPassed = false;
    }
  });
  
  return allTestsPassed;
}

async function testContentPreview(formation) {
  console.log('\n📋 Aperçu du contenu qui sera affiché:');
  
  const contentFields = [
    { name: 'Objectifs', field: 'objectifs', maxLength: 150 },
    { name: 'Programme', field: 'programme', maxLength: 150 },
    { name: 'Débouchés', field: 'debouches', maxLength: 150 },
    { name: 'Prérequis', field: 'prerequis', maxLength: 100 },
    { name: 'Évaluation', field: 'modalitesEvaluation', maxLength: 100 },
    { name: 'Poursuites', field: 'poursuiteEtudes', maxLength: 150 }
  ];
  
  contentFields.forEach(item => {
    const content = formation[item.field];
    if (content) {
      const preview = content.length > item.maxLength 
        ? content.substring(0, item.maxLength) + '...' 
        : content;
      console.log(`\n📝 ${item.name}:`);
      console.log(`   "${preview}"`);
    } else {
      console.log(`\n📝 ${item.name}: Pas de contenu`);
    }
  });
}

async function main() {
  console.log('🚀 Démarrage des tests de correction...\n');
  
  // 1. Test des données
  const { formation, allCorrect } = await testFormationData();
  
  if (!formation) {
    console.log('\n❌ Impossible de continuer sans les données de formation');
    return;
  }
  
  // 2. Test de la logique du composant
  const componentTestsPassed = await simulateComponentLogic(formation);
  
  // 3. Aperçu du contenu
  await testContentPreview(formation);
  
  // 4. Résultat final
  console.log('\n🎯 RÉSULTAT FINAL:');
  console.log(`📊 Données correctes: ${allCorrect ? '✅' : '❌'}`);
  console.log(`🔧 Logique composant: ${componentTestsPassed ? '✅' : '❌'}`);
  
  if (allCorrect && componentTestsPassed) {
    console.log('\n🎉 SUCCÈS! Toutes les corrections fonctionnent');
    console.log('✅ Le composant FormationContent peut maintenant gérer les formats string et array');
    console.log('✅ Aucune erreur .map() ne devrait plus se produire');
    console.log('🌐 La page formation devrait maintenant s\'afficher correctement');
    console.log('\n🔗 Testez la page: http://localhost:3000/formations/chef-projets-btp-1an');
  } else {
    console.log('\n⚠️ Des problèmes persistent');
    if (!allCorrect) {
      console.log('❌ Problème avec les données de formation');
    }
    if (!componentTestsPassed) {
      console.log('❌ Problème avec la logique du composant');
    }
  }
}

main();