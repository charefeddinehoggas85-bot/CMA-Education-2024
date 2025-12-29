/**
 * Test des API formations après migration Phase 4
 */

const STRAPI_URL = 'http://localhost:1337';
const STRAPI_API_TOKEN = '34ebc27d0aae530b71f7c236385a2013ba8db694ccbdf80a49a5cc3e0499ae408caa45dddb48f2a9ed35fd17a8a9eedb71fbf587e0806ccc282a4c62f8aa575457bc480b312f9740d1f3e1651e196a507075ed08a858b8dda30c5c1ffc88b61352c9436b7fddeb70f6668b194166d1a18133990d6da183edb6a0f4f4694f716d';

async function fetchAPI(endpoint) {
  const response = await fetch(`${STRAPI_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`
    }
  });
  
  if (!response.ok) {
    throw new Error(`API Error ${response.status}: ${response.statusText}`);
  }
  
  return response.json();
}

async function testFormationsAPI() {
  console.log('🧪 Test des API Formations Phase 4...\n');

  const tests = [
    {
      name: 'Formation Categories',
      endpoint: '/api/formation-categories?populate=*',
      expected: 'Array with categories'
    },
    {
      name: 'Formations',
      endpoint: '/api/formations?populate=*',
      expected: 'Array with formations'
    },
    {
      name: 'Partners',
      endpoint: '/api/partners?populate=*',
      expected: 'Array with partners'
    },
    {
      name: 'Testimonials',
      endpoint: '/api/testimonials?populate=*',
      expected: 'Array with testimonials'
    },
    {
      name: 'Site Settings',
      endpoint: '/api/site-settings?populate=*',
      expected: 'Single object with site settings'
    }
  ];

  let successCount = 0;
  let totalTests = tests.length;

  for (const test of tests) {
    try {
      console.log(`📡 Testing ${test.name}...`);
      const data = await fetchAPI(test.endpoint);
      
      if (data.data) {
        const count = Array.isArray(data.data) ? data.data.length : 1;
        console.log(`  ✅ ${test.name}: ${count} item(s) found`);
        successCount++;
      } else {
        console.log(`  ⚠️ ${test.name}: No data returned`);
      }
    } catch (error) {
      console.log(`  ❌ ${test.name}: ${error.message}`);
    }
  }

  console.log(`\n📊 Résultats: ${successCount}/${totalTests} tests réussis`);
  
  if (successCount === totalTests) {
    console.log('🎉 Tous les tests API sont passés avec succès!');
    console.log('\n💡 Prochaines étapes:');
    console.log('  1. Tester le FormationsDropdown dans le navigateur');
    console.log('  2. Migrer les autres composants (PartnersLogos, BlogGrid)');
    console.log('  3. Importer les formations restantes (VRD, reconversion)');
  } else {
    console.log('⚠️ Certains tests ont échoué. Vérifiez la configuration Strapi.');
  }
}

testFormationsAPI().catch(console.error);