const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';

async function testNouvelleFormationTPReconversion() {
  try {
    console.log('🧪 Test de la nouvelle formation Conducteur de Travaux Publics - Reconversion');
    console.log('=' .repeat(80));

    // 1. Test de l'API formations reconversion
    console.log('\n📋 1. Test API formations reconversion...');
    const formationsReconversionResponse = await axios.get(
      `${STRAPI_URL}/api/formations?populate=formation_categories`
    );
    
    const formationsReconversion = formationsReconversionResponse.data.data.filter(formation => {
      const categories = formation.attributes.formation_categories?.data || [];
      return categories.some(cat => cat.attributes?.nom === 'reconversion');
    });
    console.log(`✅ Formations en reconversion trouvées: ${formationsReconversion.length}`);
    
    formationsReconversion.forEach((formation, index) => {
      console.log(`  ${index + 1}. ${formation.attributes.titre}`);
      console.log(`     Slug: ${formation.attributes.slug}`);
      console.log(`     RNCP: ${formation.attributes.rncp}`);
    });

    // 2. Vérifier spécifiquement la nouvelle formation
    console.log('\n🎯 2. Vérification de la nouvelle formation...');
    const nouvelleFormation = formationsReconversion.find(f => 
      f.attributes.slug === 'conducteur-travaux-publics-reconversion'
    );
    
    if (nouvelleFormation) {
      console.log('✅ Formation Conducteur de Travaux Publics trouvée!');
      console.log(`   Titre: ${nouvelleFormation.attributes.titre}`);
      console.log(`   Niveau: ${nouvelleFormation.attributes.niveau}`);
      console.log(`   Durée: ${nouvelleFormation.attributes.duree}`);
      console.log(`   Prix: ${nouvelleFormation.attributes.prix}`);
      console.log(`   Objectifs: ${nouvelleFormation.attributes.objectifs?.length || 0} objectifs`);
      console.log(`   Débouchés: ${nouvelleFormation.attributes.debouches?.length || 0} débouchés`);
    } else {
      console.log('❌ Formation Conducteur de Travaux Publics NON trouvée');
      return;
    }

    // 3. Test du dropdown (API catégories avec formations)
    console.log('\n🎯 3. Test du dropdown formations...');
    const dropdownResponse = await axios.get(
      `${STRAPI_URL}/api/formation-categories?populate[formations][populate]=*`
    );
    
    const categories = dropdownResponse.data.data;
    console.log(`✅ Catégories trouvées: ${categories.length}`);
    
    categories.forEach(category => {
      const formationsCount = category.attributes.formations?.data?.length || 0;
      console.log(`  - ${category.attributes.nom}: ${formationsCount} formations`);
      
      if (category.attributes.nom === 'reconversion') {
        console.log('    📋 Formations reconversion dans le dropdown:');
        category.attributes.formations.data.forEach((formation, index) => {
          console.log(`      ${index + 1}. ${formation.attributes.titre}`);
        });
      }
    });

    // 4. Test de l'URL de la formation
    console.log('\n🌐 4. Test de l\'URL de la formation...');
    try {
      const formationDetailResponse = await axios.get(
        `${STRAPI_URL}/api/formations/${nouvelleFormation.id}?populate=*`
      );
      
      if (formationDetailResponse.status === 200) {
        console.log('✅ URL de détail accessible');
        console.log(`   API URL: ${STRAPI_URL}/api/formations/${nouvelleFormation.id}`);
        console.log(`   Frontend URL: http://localhost:3000/formations/${nouvelleFormation.attributes.slug}`);
        console.log(`   Page statique: http://localhost:3000/formations/reconversion-btp/conducteur-travaux-publics`);
      }
    } catch (error) {
      console.log('❌ Erreur lors du test de l\'URL:', error.message);
    }

    // 5. Vérification des données complètes
    console.log('\n📊 5. Vérification des données complètes...');
    const formation = nouvelleFormation.attributes;
    
    const checks = [
      { field: 'titre', value: formation.titre, expected: 'string' },
      { field: 'slug', value: formation.slug, expected: 'string' },
      { field: 'niveau', value: formation.niveau, expected: 'string' },
      { field: 'rncp', value: formation.rncp, expected: 'string' },
      { field: 'description_courte', value: formation.description_courte, expected: 'string' },
      { field: 'duree', value: formation.duree, expected: 'string' },
      { field: 'rythme', value: formation.rythme, expected: 'string' },
      { field: 'modalite', value: formation.modalite, expected: 'string' },
      { field: 'prix', value: formation.prix, expected: 'string' },
      { field: 'objectifs', value: formation.objectifs, expected: 'array' },
      { field: 'debouches', value: formation.debouches, expected: 'array' },
      { field: 'programme', value: formation.programme, expected: 'array' },
      { field: 'prerequis', value: formation.prerequis, expected: 'string' },
      { field: 'evaluation', value: formation.evaluation, expected: 'array' },
      { field: 'financement', value: formation.financement, expected: 'string' },
      { field: 'poursuites_etudes', value: formation.poursuites_etudes, expected: 'array' }
    ];
    
    let allChecksPass = true;
    checks.forEach(check => {
      const actualType = Array.isArray(check.value) ? 'array' : typeof check.value;
      const isValid = check.value && actualType === check.expected;
      
      if (isValid) {
        console.log(`   ✅ ${check.field}: ${actualType} (${Array.isArray(check.value) ? check.value.length + ' items' : 'OK'})`);
      } else {
        console.log(`   ❌ ${check.field}: ${actualType} (attendu: ${check.expected})`);
        allChecksPass = false;
      }
    });

    // 6. Résumé final
    console.log('\n' + '='.repeat(80));
    console.log('📋 RÉSUMÉ DU TEST');
    console.log('='.repeat(80));
    
    if (allChecksPass && nouvelleFormation) {
      console.log('✅ SUCCÈS: La formation Conducteur de Travaux Publics - Reconversion est correctement configurée');
      console.log('✅ Elle apparaît dans la catégorie reconversion');
      console.log('✅ Toutes les données sont présentes');
      console.log('✅ Elle sera visible dans le dropdown du site');
      console.log('\n🌐 URLs disponibles:');
      console.log(`   - Strapi: ${STRAPI_URL}/api/formations/${nouvelleFormation.id}`);
      console.log(`   - Frontend dynamique: http://localhost:3000/formations/${nouvelleFormation.attributes.slug}`);
      console.log(`   - Page statique: http://localhost:3000/formations/reconversion-btp/conducteur-travaux-publics`);
    } else {
      console.log('❌ ÉCHEC: Des problèmes ont été détectés');
    }

  } catch (error) {
    console.error('❌ Erreur lors du test:', error.response?.data || error.message);
  }
}

// Exécuter le test
testNouvelleFormationTPReconversion();