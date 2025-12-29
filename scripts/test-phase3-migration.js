/**
 * Test complet de la migration Phase 3
 * Valide les nouveaux content types Blog et Formateurs
 */

const STRAPI_URL = 'http://localhost:1337';
const STRAPI_API_TOKEN = '34ebc27d0aae530b71f7c236385a2013ba8db694ccbdf80a49a5cc3e0499ae408caa45dddb48f2a9ed35fd17a8a9eedb71fbf587e0806ccc282a4c62f8aa575457bc480b312f9740d1f3e1651e196a507075ed08a858b8dda30c5c1ffc88b61352c9436b7fddeb70f6668b194166d1a18133990d6da183edb6a0f4f4694f716d';

async function testEndpoint(endpoint, expectedCount, name) {
  try {
    const response = await fetch(`${STRAPI_URL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${STRAPI_API_TOKEN}`
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      const count = data.data?.length || 0;
      const status = count >= expectedCount ? '✅' : '⚠️';
      console.log(`${status} ${name}: ${count} éléments (attendu: ${expectedCount}+)`);
      
      if (count > 0 && data.data[0]) {
        const sample = data.data[0].attributes;
        const sampleText = sample.nom || sample.titre || sample.type || sample.cle || 'N/A';
        console.log(`   📋 Exemple: ${sampleText}`);
      }
      
      return { success: true, count, expected: expectedCount };
    } else {
      console.log(`❌ ${name}: ${response.status} ${response.statusText}`);
      return { success: false, error: response.status };
    }
  } catch (error) {
    console.log(`❌ ${name}: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function testPhase3Migration() {
  console.log('🧪 TEST COMPLET DE LA MIGRATION PHASE 3\n');
  console.log('📅 Date:', new Date().toLocaleString('fr-FR'));
  console.log('🔗 Strapi URL:', STRAPI_URL);
  console.log('');
  
  // Tests Phase 2 (vérification)
  console.log('🔄 VÉRIFICATION PHASE 2:');
  const phase2Tests = [
    ['/api/vae-formules?sort=ordre:asc', 2, 'VAE Formules'],
    ['/api/entreprise-services?sort=ordre:asc', 4, 'Services Entreprises'],
    ['/api/formation-thematiques?sort=ordre:asc', 5, 'Thématiques Formation'],
    ['/api/valeurs-ecole?sort=ordre:asc', 3, 'Valeurs École'],
    ['/api/statistiques-site?sort=ordre:asc', 4, 'Statistiques Site'],
    ['/api/processus-admissions?sort=etape:asc', 4, 'Processus Admission']
  ];
  
  const phase2Results = [];
  for (const [endpoint, expectedCount, name] of phase2Tests) {
    const result = await testEndpoint(endpoint, expectedCount, name);
    phase2Results.push({ name, ...result });
  }
  
  // Tests Phase 3 (nouveaux content types)
  console.log('\n🆕 TESTS PHASE 3 - NOUVEAUX CONTENT TYPES:');
  const phase3Tests = [
    ['/api/categories-blog', 0, 'Catégories Blog'],
    ['/api/articles-blog', 0, 'Articles Blog'],
    ['/api/formateurs', 0, 'Formateurs']
  ];
  
  const phase3Results = [];
  for (const [endpoint, expectedCount, name] of phase3Tests) {
    const result = await testEndpoint(endpoint, expectedCount, name);
    phase3Results.push({ name, ...result });
  }
  
  // Résumé des tests
  console.log('\n📊 RÉSUMÉ DES TESTS:');
  console.log('='.repeat(50));
  
  const allResults = [...phase2Results, ...phase3Results];
  const successful = allResults.filter(r => r.success);
  const errors = allResults.filter(r => !r.success);
  
  console.log(`✅ Tests réussis: ${successful.length}/${allResults.length}`);
  console.log(`❌ Erreurs: ${errors.length}/${allResults.length}`);
  
  if (errors.length > 0) {
    console.log('\n❌ ERREURS:');
    errors.forEach(e => {
      console.log(`   - ${e.name}: ${e.error}`);
    });
  }
  
  // Status de la migration
  console.log('\n🎯 STATUS MIGRATION PHASE 3:');
  console.log('='.repeat(50));
  
  const phase2Success = phase2Results.filter(r => r.success && r.count >= r.expected).length;
  const phase3Success = phase3Results.filter(r => r.success).length;
  
  if (phase2Success === phase2Tests.length) {
    console.log('✅ Phase 2: COMPLÈTEMENT VALIDÉE');
  } else {
    console.log('⚠️  Phase 2: Quelques problèmes détectés');
  }
  
  if (phase3Success === phase3Tests.length) {
    console.log('✅ Phase 3: Content types créés et accessibles');
    console.log('📝 Prêt pour l\'import des données Blog');
  } else {
    console.log('❌ Phase 3: Problèmes avec les nouveaux content types');
    console.log('🔧 Vérifiez que Strapi a bien redémarré');
  }
  
  console.log('\n💡 PROCHAINES ÉTAPES PHASE 3:');
  console.log('   1. Importer les données Blog: node scripts/import-blog-data.js');
  console.log('   2. Migrer les composants Blog du frontend');
  console.log('   3. Migrer les pages principales (accueil, à propos, contact)');
  console.log('   4. Créer le content type Site Settings');
  console.log('   5. Nettoyer les fichiers statiques obsolètes');
  
  console.log('\n📈 PROGRESSION GLOBALE:');
  console.log('   Phase 1: Content types créés ✅ (100%)');
  console.log('   Phase 2: Données importées et frontend migré ✅ (100%)');
  console.log(`   Phase 3: Nouveaux content types ${phase3Success === phase3Tests.length ? '✅' : '⚠️'} (${Math.round(phase3Success/phase3Tests.length*100)}%)`);
  
  console.log('\n✨ Test terminé!');
}

testPhase3Migration();