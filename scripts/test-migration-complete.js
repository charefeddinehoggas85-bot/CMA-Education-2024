/**
 * Test complet de la migration Phase 2
 * Valide tous les nouveaux endpoints et données
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
      const status = count === expectedCount ? '✅' : '⚠️';
      console.log(`${status} ${name}: ${count}/${expectedCount} éléments`);
      
      if (count > 0 && data.data[0]) {
        const sample = data.data[0].attributes;
        console.log(`   📋 Exemple: ${sample.type || sample.titre || sample.nom || sample.cle || sample.etape || 'N/A'}`);
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

async function testAllMigration() {
  console.log('🧪 TEST COMPLET DE LA MIGRATION PHASE 2\n');
  console.log('📅 Date:', new Date().toLocaleString('fr-FR'));
  console.log('🔗 Strapi URL:', STRAPI_URL);
  console.log('');
  
  const tests = [
    ['/api/vae-formules?sort=ordre:asc', 2, 'VAE Formules'],
    ['/api/entreprise-services?sort=ordre:asc', 4, 'Services Entreprises'],
    ['/api/formation-thematiques?sort=ordre:asc', 5, 'Thématiques Formation'],
    ['/api/valeurs-ecole?sort=ordre:asc', 3, 'Valeurs École'],
    ['/api/statistiques-site?sort=ordre:asc', 4, 'Statistiques Site'],
    ['/api/processus-admissions?sort=etape:asc', 4, 'Processus Admission']
  ];
  
  const results = [];
  
  for (const [endpoint, expectedCount, name] of tests) {
    const result = await testEndpoint(endpoint, expectedCount, name);
    results.push({ name, ...result });
    console.log('');
  }
  
  // Résumé des tests
  console.log('📊 RÉSUMÉ DES TESTS:');
  console.log('='.repeat(50));
  
  const successful = results.filter(r => r.success && r.count === r.expected);
  const warnings = results.filter(r => r.success && r.count !== r.expected);
  const errors = results.filter(r => !r.success);
  
  console.log(`✅ Tests réussis: ${successful.length}/${results.length}`);
  console.log(`⚠️  Avertissements: ${warnings.length}/${results.length}`);
  console.log(`❌ Erreurs: ${errors.length}/${results.length}`);
  
  if (warnings.length > 0) {
    console.log('\n⚠️  AVERTISSEMENTS:');
    warnings.forEach(w => {
      console.log(`   - ${w.name}: ${w.count}/${w.expected} éléments`);
    });
  }
  
  if (errors.length > 0) {
    console.log('\n❌ ERREURS:');
    errors.forEach(e => {
      console.log(`   - ${e.name}: ${e.error}`);
    });
  }
  
  // Test des anciennes API (formations, partners, testimonials)
  console.log('\n🔄 TEST DES API EXISTANTES:');
  const existingTests = [
    ['/api/formations?pagination[limit]=5', 'Formations existantes'],
    ['/api/partners', 'Partenaires existants'],
    ['/api/testimonials', 'Témoignages existants']
  ];
  
  for (const [endpoint, name] of existingTests) {
    try {
      const response = await fetch(`${STRAPI_URL}${endpoint}`, {
        headers: { 'Authorization': `Bearer ${STRAPI_API_TOKEN}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ ${name}: ${data.data?.length || 0} éléments`);
      } else {
        console.log(`❌ ${name}: ${response.status}`);
      }
    } catch (error) {
      console.log(`❌ ${name}: ${error.message}`);
    }
  }
  
  console.log('\n🎯 MIGRATION PHASE 2 STATUS:');
  console.log('='.repeat(50));
  
  if (successful.length === results.length) {
    console.log('🎉 MIGRATION PHASE 2 COMPLÈTEMENT RÉUSSIE!');
    console.log('✨ Tous les nouveaux content types sont fonctionnels');
    console.log('📊 Toutes les données sont correctement importées');
    console.log('🚀 Prêt pour la Phase 3 - Migration frontend complète');
  } else {
    console.log('⚠️  Migration Phase 2 partiellement réussie');
    console.log('🔧 Quelques ajustements nécessaires avant Phase 3');
  }
  
  console.log('\n💡 PROCHAINES ÉTAPES:');
  console.log('   1. Migrer les composants restants (Footer, Header, etc.)');
  console.log('   2. Créer les content types Blog et Formateurs');
  console.log('   3. Migrer les pages principales (accueil, à propos, contact)');
  console.log('   4. Nettoyer les fichiers statiques obsolètes');
  
  console.log('\n✨ Test terminé!');
}

testAllMigration();