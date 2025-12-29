/**
 * Test des données Blog importées
 */

const STRAPI_URL = 'http://localhost:1337';
const STRAPI_API_TOKEN = '34ebc27d0aae530b71f7c236385a2013ba8db694ccbdf80a49a5cc3e0499ae408caa45dddb48f2a9ed35fd17a8a9eedb71fbf587e0806ccc282a4c62f8aa575457bc480b312f9740d1f3e1651e196a507075ed08a858b8dda30c5c1ffc88b61352c9436b7fddeb70f6668b194166d1a18133990d6da183edb6a0f4f4694f716d';

async function testBlogData() {
  console.log('🧪 Test des données Blog importées...\n');
  
  const endpoints = [
    ['/api/categories-blog', 'Catégories Blog'],
    ['/api/articles-blog', 'Articles Blog'],
    ['/api/formateurs', 'Formateurs']
  ];
  
  for (const [endpoint, name] of endpoints) {
    try {
      const response = await fetch(`${STRAPI_URL}${endpoint}`, {
        headers: { 'Authorization': `Bearer ${STRAPI_API_TOKEN}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ ${name}: ${data.data?.length || 0} éléments`);
        
        if (data.data && data.data.length > 0) {
          const sample = data.data[0].attributes;
          const sampleText = sample.nom || sample.titre || sample.prenom + ' ' + sample.nom || 'N/A';
          console.log(`   📋 Exemple: ${sampleText}`);
        }
      } else {
        console.log(`❌ ${name}: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.log(`❌ ${name}: ${error.message}`);
    }
    console.log('');
  }
}

testBlogData();