#!/usr/bin/env node

const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

console.log('🎯 Vérification finale de la formation Chef de Projets BTP...');

async function finalVerification() {
  try {
    console.log('📡 Récupération des données finales...');
    
    const response = await axios.get('http://localhost:1337/api/formations/21');
    const formation = response.data.data.attributes;
    
    console.log('✅ Données récupérées avec succès');
    console.log(`📌 Formation: ${formation.title}`);
    
    // Vérification des arrays avec le contenu détaillé du markdown
    console.log('\n🔍 Vérification du contenu détaillé importé:');
    
    const checks = [
      {
        name: 'Objectifs',
        field: 'objectifs',
        expectedType: 'array',
        expectedCount: 5,
        test: (data) => Array.isArray(data) && data.length === 5 && data[0].includes('Piloter intégralement')
      },
      {
        name: 'Programme',
        field: 'programme', 
        expectedType: 'array d\'objets',
        expectedCount: 4,
        test: (data) => Array.isArray(data) && data.length === 4 && data[0].titre && data[0].titre.includes('Conduite et Management')
      },
      {
        name: 'Débouchés',
        field: 'debouches',
        expectedType: 'array',
        expectedCount: 8,
        test: (data) => Array.isArray(data) && data.length === 8 && data.some(d => d.includes('BIM & innovation'))
      },
      {
        name: 'Prérequis',
        field: 'prerequis',
        expectedType: 'array',
        expectedCount: 2,
        test: (data) => Array.isArray(data) && data.length === 2 && data[0].includes('BAC+3')
      },
      {
        name: 'Modalités d\'évaluation',
        field: 'modalitesEvaluation',
        expectedType: 'array',
        expectedCount: 3,
        test: (data) => Array.isArray(data) && data.length === 3 && data.some(e => e.includes('Contrôle continu'))
      },
      {
        name: 'Poursuites d\'études',
        field: 'poursuiteEtudes',
        expectedType: 'array',
        expectedCount: 6,
        test: (data) => Array.isArray(data) && data.length === 6 && data.some(p => p.includes('Mastère Spécialisé'))
      }
    ];
    
    let allPassed = true;
    
    checks.forEach(check => {
      const data = formation[check.field];
      const passed = check.test(data);
      const status = passed ? '✅' : '❌';
      
      console.log(`• ${check.name}: ${check.expectedType} (${data?.length || 0}/${check.expectedCount}) ${status}`);
      
      if (passed && data?.length > 0) {
        // Afficher un aperçu du contenu
        if (check.field === 'programme') {
          console.log(`    Exemple: "${data[0].titre}" - ${data[0].heures}`);
        } else {
          console.log(`    Exemple: "${data[0].substring(0, 60)}..."`);
        }
      }
      
      if (!passed) allPassed = false;
    });
    
    // Test de compatibilité avec le composant React
    console.log('\n🔧 Test de compatibilité avec FormationContent.tsx:');
    
    const componentTests = [
      {
        name: 'Objectifs - Array.isArray() check',
        test: () => Array.isArray(formation.objectifs),
        description: 'Le composant peut utiliser .map() sur objectifs'
      },
      {
        name: 'Programme - Array.isArray() check', 
        test: () => Array.isArray(formation.programme),
        description: 'Le composant peut utiliser .map() sur programme'
      },
      {
        name: 'Débouchés - Array.isArray() check',
        test: () => Array.isArray(formation.debouches),
        description: 'Le composant peut utiliser .map() sur debouches'
      },
      {
        name: 'Prérequis - Array.isArray() check',
        test: () => Array.isArray(formation.prerequis),
        description: 'Le composant peut utiliser .map() sur prerequis'
      },
      {
        name: 'Évaluation - Array.isArray() check',
        test: () => Array.isArray(formation.modalitesEvaluation),
        description: 'Le composant peut utiliser .map() sur modalitesEvaluation'
      },
      {
        name: 'Poursuites - Array.isArray() check',
        test: () => Array.isArray(formation.poursuiteEtudes),
        description: 'Le composant peut utiliser .map() sur poursuiteEtudes'
      }
    ];
    
    let componentCompatible = true;
    
    componentTests.forEach(test => {
      const passed = test.test();
      const status = passed ? '✅' : '❌';
      console.log(`• ${test.name}: ${status}`);
      console.log(`    ${test.description}`);
      
      if (!passed) componentCompatible = false;
    });
    
    // Résultat final
    console.log('\n🎯 RÉSULTAT FINAL:');
    console.log(`📊 Contenu détaillé importé: ${allPassed ? '✅ Complet' : '❌ Incomplet'}`);
    console.log(`🔧 Compatibilité composant: ${componentCompatible ? '✅ Compatible' : '❌ Incompatible'}`);
    
    if (allPassed && componentCompatible) {
      console.log('\n🎉 SUCCÈS TOTAL!');
      console.log('✅ Toutes les données du fichier markdown ont été importées');
      console.log('✅ Le format array est correct pour le composant React');
      console.log('✅ Aucune erreur .map() ne devrait se produire');
      console.log('✅ La formation contient maintenant:');
      console.log('   • 5 objectifs détaillés et professionnels');
      console.log('   • 4 modules de programme avec Smart Building & Smart Cities');
      console.log('   • 8 débouchés incluant BIM & innovation numérique');
      console.log('   • Prérequis, évaluation et poursuites d\'études complètes');
      console.log('\n🌐 Page prête: http://localhost:3000/formations/chef-projets-btp-1an');
    } else {
      console.log('\n⚠️ Des améliorations sont encore nécessaires');
    }
    
    return allPassed && componentCompatible;
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    return false;
  }
}

finalVerification();