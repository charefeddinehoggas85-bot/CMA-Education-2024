const STRAPI_URL = 'http://localhost:1337';
const STRAPI_API_TOKEN = '34ebc27d0aae530b71f7c236385a2013ba8db694ccbdf80a49a5cc3e0499ae408caa45dddb48f2a9ed35fd17a8a9eedb71fbf587e0806ccc282a4c62f8aa575457bc480b312f9740d1f3e1651e196a507075ed08a858b8dda30c5c1ffc88b61352c9436b7fddeb70f6668b194166d1a18133990d6da183edb6a0f4f4694f716d';

async function fixFormationCategory() {
  console.log('🔧 Correction de la catégorie pour la formation ID 20...\n');
  
  // Mettre à jour la formation avec la catégorie reconversion (ID: 2)
  const response = await fetch(`${STRAPI_URL}/api/formations/20`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      data: {
        category: 2  // ID de la catégorie "reconversion"
      }
    })
  });
  
  const result = await response.json();
  
  if (response.ok) {
    console.log('✅ Catégorie mise à jour avec succès!');
    console.log('   Formation:', result.data.attributes.title);
    console.log('   Catégorie assignée:', JSON.stringify(result.data.attributes.category, null, 2));
  } else {
    console.log('❌ Erreur:', JSON.stringify(result, null, 2));
  }
  
  // Vérifier que la formation apparaît maintenant dans les formations reconversion
  console.log('\n📋 Vérification - Formations reconversion après correction:');
  const checkResponse = await fetch(`${STRAPI_URL}/api/formations?filters[category][slug][$eq]=reconversion&populate=*`, {
    headers: {
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });
  const checkData = await checkResponse.json();
  
  if (checkData.data && checkData.data.length > 0) {
    checkData.data.forEach(f => {
      console.log(`   - ${f.attributes.title} (slug: ${f.attributes.slug})`);
    });
  }
}

fixFormationCategory().catch(console.error);
