const STRAPI_URL = 'http://localhost:1337';
const STRAPI_API_TOKEN = '34ebc27d0aae530b71f7c236385a2013ba8db694ccbdf80a49a5cc3e0499ae408caa45dddb48f2a9ed35fd17a8a9eedb71fbf587e0806ccc282a4c62f8aa575457bc480b312f9740d1f3e1651e196a507075ed08a858b8dda30c5c1ffc88b61352c9436b7fddeb70f6668b194166d1a18133990d6da183edb6a0f4f4694f716d';

async function checkFormation() {
  console.log('🔍 Vérification de la formation Conducteur Travaux Publics Reconversion...\n');
  
  // Vérifier la formation créée
  const response = await fetch(`${STRAPI_URL}/api/formations?filters[slug][$eq]=conducteur-travaux-publics-reconversion&populate=*`, {
    headers: {
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  
  if (data.data && data.data.length > 0) {
    const formation = data.data[0];
    console.log('✅ Formation trouvée:');
    console.log('   ID:', formation.id);
    console.log('   Titre:', formation.attributes.title);
    console.log('   Slug:', formation.attributes.slug);
    console.log('   Catégorie:', JSON.stringify(formation.attributes.category, null, 2));
    console.log('   PublishedAt:', formation.attributes.publishedAt);
  } else {
    console.log('❌ Formation non trouvée');
  }
  
  // Vérifier les catégories disponibles
  console.log('\n📂 Catégories disponibles:');
  const catResponse = await fetch(`${STRAPI_URL}/api/formation-categories?populate=*`, {
    headers: {
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });
  const catData = await catResponse.json();
  
  if (catData.data) {
    catData.data.forEach(cat => {
      console.log(`   - ID: ${cat.id}, Nom: ${cat.attributes.name}, Slug: ${cat.attributes.slug}`);
    });
  }
  
  // Vérifier toutes les formations reconversion
  console.log('\n📋 Formations avec catégorie reconversion:');
  const reconvResponse = await fetch(`${STRAPI_URL}/api/formations?filters[category][slug][$eq]=reconversion&populate=*`, {
    headers: {
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });
  const reconvData = await reconvResponse.json();
  
  if (reconvData.data && reconvData.data.length > 0) {
    reconvData.data.forEach(f => {
      console.log(`   - ${f.attributes.title} (slug: ${f.attributes.slug})`);
    });
  } else {
    console.log('   Aucune formation trouvée avec category.slug = reconversion');
  }
  
  // Vérifier avec reconversion-btp
  console.log('\n📋 Formations avec catégorie reconversion-btp:');
  const reconvBtpResponse = await fetch(`${STRAPI_URL}/api/formations?filters[category][slug][$eq]=reconversion-btp&populate=*`, {
    headers: {
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });
  const reconvBtpData = await reconvBtpResponse.json();
  
  if (reconvBtpData.data && reconvBtpData.data.length > 0) {
    reconvBtpData.data.forEach(f => {
      console.log(`   - ${f.attributes.title} (slug: ${f.attributes.slug})`);
    });
  } else {
    console.log('   Aucune formation trouvée avec category.slug = reconversion-btp');
  }
}

checkFormation().catch(console.error);
