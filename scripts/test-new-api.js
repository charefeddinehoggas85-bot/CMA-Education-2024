/**
 * Test des nouveaux endpoints API Strapi
 */

const STRAPI_URL = 'http://localhost:1337';
const STRAPI_API_TOKEN = '34ebc27d0aae530b71f7c236385a2013ba8db694ccbdf80a49a5cc3e0499ae408caa45dddb48f2a9ed35fd17a8a9eedb71fbf587e0806ccc282a4c62f8aa575457bc480b312f9740d1f3e1651e196a507075ed08a858b8dda30c5c1ffc88b61352c9436b7fddeb70f6668b194166d1a18133990d6da183edb6a0f4f4694f716d';

async function testAPI(endpoint, name) {
  try {
    const response = await fetch(`${STRAPI_URL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${STRAPI_API_TOKEN}`
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ ${name}: ${data.data?.length || 0} éléments`);
      return data.data;
    } else {
      console.log(`❌ ${name}: ${response.status} ${response.statusText}`);
      return null;
    }
  } catch (error) {
    console.log(`❌ ${name}: ${error.message}`);
    return null;
  }
}

async function testAllEndpoints() {
  console.log('🧪 Test des nouveaux endpoints API...\n');
  
  const endpoints = [
    ['/api/vae-formules?sort=ordre:asc', 'VAE Formules'],
    ['/api/entreprise-services?sort=ordre:asc', 'Services Entreprises'],
    ['/api/formation-thematiques?sort=ordre:asc', 'Thématiques Formation'],
    ['/api/valeurs-ecole?sort=ordre:asc', 'Valeurs École'],
    ['/api/statistiques-site?sort=ordre:asc', 'Statistiques Site'],
    ['/api/processus-admissions?sort=etape:asc', 'Processus Admission']
  ];
  
  for (const [endpoint, name] of endpoints) {
    await testAPI(endpoint, name);
  }
  
  console.log('\n✨ Tests terminés!');
}

testAllEndpoints();