/**
 * Test final complet de toute la migration Strapi
 * Valide toutes les phases et donne un rapport final
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
      console.log(`${status} ${name}: ${count}/${expectedCount} éléments`);
      
      return { success: true, count, expected: expectedCount, name };
    } else {
      console.log(`❌ ${name}: ${response.status} ${response.statusText}`);
      return { success: false, error: response.status, name };
    }
  } catch (error) {
    console.log(`❌ ${name}: ${error.message}`);
    return { success: false, error: error.message, name };
  }
}

async function testMigrationFinale() {
  console.log('🎯 TEST FINAL COMPLET DE LA MIGRATION STRAPI\n');
  console.log('📅 Date:', new Date().toLocaleString('fr-FR'));
  console.log('🔗 Strapi URL:', STRAPI_URL);
  console.log('');
  
  // Tests de tous les content types créés
  const allTests = [
    // Phase 1 & 2 - Content types de base
    ['/api/formations?pagination[limit]=5', 0, 'Formations (existantes)'],
    ['/api/partners', 0, 'Partenaires (existants)'],
    ['/api/testimonials', 0, 'Témoignages (existants)'],
    
    // Phase 2 - Nouveaux content types VAE/Entreprises
    ['/api/vae-formules?sort=ordre:asc', 2, 'VAE Formules'],
    ['/api/entreprise-services?sort=ordre:asc', 4, 'Services Entreprises'],
    ['/api/formation-thematiques?sort=ordre:asc', 5, 'Thématiques Formation'],
    ['/api/valeurs-ecole?sort=ordre:asc', 3, 'Valeurs École'],
    ['/api/statistiques-site?sort=ordre:asc', 4, 'Statistiques Site'],
    ['/api/processus-admissions?sort=etape:asc', 4, 'Processus Admission'],
    
    // Phase 3 - Content types Blog et Formateurs
    ['/api/categories-blog', 5, 'Catégories Blog'],
    ['/api/articles-blog', 4, 'Articles Blog'],
    ['/api/formateurs', 3, 'Formateurs']
  ];
  
  console.log('🔍 VALIDATION DE TOUS LES CONTENT TYPES:');
  console.log('='.repeat(60));
  
  const results = [];
  for (const [endpoint, expectedCount, name] of allTests) {
    const result = await testEndpoint(endpoint, expectedCount, name);
    results.push(result);
  }
  
  // Analyse des résultats
  console.log('\n📊 ANALYSE DES RÉSULTATS:');
  console.log('='.repeat(60));
  
  const successful = results.filter(r => r.success && r.count >= r.expected);
  const warnings = results.filter(r => r.success && r.count < r.expected);
  const errors = results.filter(r => !r.success);
  
  console.log(`✅ Tests réussis: ${successful.length}/${results.length}`);
  console.log(`⚠️  Avertissements: ${warnings.length}/${results.length}`);
  console.log(`❌ Erreurs: ${errors.length}/${results.length}`);
  
  // Détail par phase
  console.log('\n📈 DÉTAIL PAR PHASE:');
  console.log('='.repeat(60));
  
  const phase1Results = results.slice(0, 3); // Formations, Partners, Testimonials
  const phase2Results = results.slice(3, 9); // VAE, Entreprises, etc.
  const phase3Results = results.slice(9, 12); // Blog, Formateurs
  
  const phase1Success = phase1Results.filter(r => r.success).length;
  const phase2Success = phase2Results.filter(r => r.success && r.count >= r.expected).length;
  const phase3Success = phase3Results.filter(r => r.success && r.count >= r.expected).length;
  
  console.log(`Phase 1 (Base): ${phase1Success}/${phase1Results.length} ✅`);
  console.log(`Phase 2 (VAE/Entreprises): ${phase2Success}/${phase2Results.length} ${phase2Success === phase2Results.length ? '✅' : '⚠️'}`);
  console.log(`Phase 3 (Blog/Formateurs): ${phase3Success}/${phase3Results.length} ${phase3Success === phase3Results.length ? '✅' : '⚠️'}`);
  
  // Calcul du pourcentage de migration
  const totalDataEntries = results.reduce((sum, r) => sum + (r.count || 0), 0);
  const expectedDataEntries = results.reduce((sum, r) => sum + (r.expected || 0), 0);
  const migrationPercentage = Math.round((totalDataEntries / Math.max(expectedDataEntries, 1)) * 100);
  
  console.log('\n🎯 STATUT GLOBAL DE LA MIGRATION:');
  console.log('='.repeat(60));
  
  if (successful.length === results.length) {
    console.log('🎉 MIGRATION 100% RÉUSSIE!');
    console.log('✨ Tous les content types sont fonctionnels');
    console.log('📊 Toutes les données sont correctement importées');
    console.log('🚀 Interface admin Strapi complètement opérationnelle');
  } else if (successful.length >= results.length * 0.8) {
    console.log('🎊 MIGRATION LARGEMENT RÉUSSIE!');
    console.log(`✨ ${successful.length}/${results.length} content types fonctionnels`);
    console.log('📊 La majorité des données sont importées');
    console.log('🔧 Quelques ajustements mineurs nécessaires');
  } else {
    console.log('⚠️  MIGRATION PARTIELLEMENT RÉUSSIE');
    console.log('🔧 Des ajustements sont nécessaires');
  }
  
  console.log(`\n📊 DONNÉES MIGRÉES: ${totalDataEntries} entrées au total`);
  console.log(`📈 POURCENTAGE DE MIGRATION: ${migrationPercentage}%`);
  
  // Résumé des données par type
  console.log('\n📋 RÉSUMÉ DES DONNÉES IMPORTÉES:');
  console.log('='.repeat(60));
  
  const dataByType = {
    'VAE': results.find(r => r.name === 'VAE Formules')?.count || 0,
    'Services Entreprises': results.find(r => r.name === 'Services Entreprises')?.count || 0,
    'Thématiques Formation': results.find(r => r.name === 'Thématiques Formation')?.count || 0,
    'Valeurs École': results.find(r => r.name === 'Valeurs École')?.count || 0,
    'Statistiques': results.find(r => r.name === 'Statistiques Site')?.count || 0,
    'Processus Admission': results.find(r => r.name === 'Processus Admission')?.count || 0,
    'Catégories Blog': results.find(r => r.name === 'Catégories Blog')?.count || 0,
    'Articles Blog': results.find(r => r.name === 'Articles Blog')?.count || 0,
    'Formateurs': results.find(r => r.name === 'Formateurs')?.count || 0
  };
  
  Object.entries(dataByType).forEach(([type, count]) => {
    if (count > 0) {
      console.log(`  📌 ${type}: ${count} entrées`);
    }
  });
  
  // Recommandations finales
  console.log('\n💡 PROCHAINES ÉTAPES RECOMMANDÉES:');
  console.log('='.repeat(60));
  
  if (errors.length > 0) {
    console.log('🔧 CORRECTIONS NÉCESSAIRES:');
    errors.forEach(e => {
      console.log(`   - Résoudre l'erreur: ${e.name} (${e.error})`);
    });
    console.log('');
  }
  
  if (warnings.length > 0) {
    console.log('⚠️  AMÉLIORATIONS SUGGÉRÉES:');
    warnings.forEach(w => {
      console.log(`   - Compléter les données: ${w.name} (${w.count}/${w.expected})`);
    });
    console.log('');
  }
  
  console.log('🚀 ÉTAPES FINALES:');
  console.log('   1. Migrer les pages principales (accueil, à propos, contact)');
  console.log('   2. Créer le content type Site Settings');
  console.log('   3. Migrer les composants blog restants');
  console.log('   4. Nettoyer les fichiers statiques obsolètes');
  console.log('   5. Tests finaux et optimisation');
  
  console.log('\n🎯 OBJECTIF FINAL:');
  console.log('   📊 100% des contenus dans Strapi');
  console.log('   🎨 Interface admin complète');
  console.log('   🚀 Performance optimisée');
  console.log('   ✨ Gestion de contenu simplifiée');
  
  console.log('\n✨ Test final terminé!');
  console.log(`🏆 Migration actuelle: ${migrationPercentage}% complétée`);
}

testMigrationFinale();