const STRAPI_URL = 'http://localhost:1337';
const STRAPI_API_TOKEN = '34ebc27d0aae530b71f7c236385a2013ba8db694ccbdf80a49a5cc3e0499ae408caa45dddb48f2a9ed35fd17a8a9eedb71fbf587e0806ccc282a4c62f8aa575457bc480b312f9740d1f3e1651e196a507075ed08a858b8dda30c5c1ffc88b61352c9436b7fddeb70f6668b194166d1a18133990d6da183edb6a0f4f4694f716d';

async function testAdmissionAPI() {
  console.log('🧪 Test de l\'API Page Admission\n');
  
  // Test 1: Accès public (sans token)
  console.log('1️⃣ Test accès PUBLIC (sans token)...');
  const publicRes = await fetch(`${STRAPI_URL}/api/page-admission?populate=*`);
  console.log(`   Status: ${publicRes.status}`);
  
  if (publicRes.ok) {
    const data = await publicRes.json();
    console.log('   ✅ Accès public OK');
    console.log(`   Titre: ${data.data?.attributes?.titre || 'Non défini'}`);
    
    if (data.data?.attributes?.heroImage?.data) {
      const imgUrl = data.data.attributes.heroImage.data.attributes.url;
      console.log(`   🖼️ Image hero: ${imgUrl}`);
      console.log(`   URL complète: ${STRAPI_URL}${imgUrl}`);
    } else {
      console.log('   ⚠️ Pas d\'image hero configurée');
    }
  } else {
    const err = await publicRes.json();
    console.log(`   ❌ Erreur: ${err.error?.message}`);
    
    if (publicRes.status === 404) {
      console.log('\n   📋 Le contenu n\'existe pas. Créez-le dans Strapi Admin:');
      console.log('      1. Allez sur http://localhost:1337/admin');
      console.log('      2. Content Manager > Page Admission');
      console.log('      3. Remplissez les champs et ajoutez une image');
      console.log('      4. Cliquez sur Save puis Publish');
    }
    
    if (publicRes.status === 403) {
      console.log('\n   📋 Permissions manquantes. Configurez-les:');
      console.log('      1. Allez sur http://localhost:1337/admin');
      console.log('      2. Settings > Roles > Public');
      console.log('      3. Trouvez "Page-admission" et cochez "find"');
      console.log('      4. Sauvegardez');
    }
  }
  
  // Test 2: Accès avec token
  console.log('\n2️⃣ Test accès avec TOKEN...');
  const tokenRes = await fetch(`${STRAPI_URL}/api/page-admission?populate=*`, {
    headers: { 'Authorization': `Bearer ${STRAPI_API_TOKEN}` }
  });
  console.log(`   Status: ${tokenRes.status}`);
  
  // Test 3: Étapes d'admission
  console.log('\n3️⃣ Test étapes d\'admission...');
  const etapesRes = await fetch(`${STRAPI_URL}/api/etape-admissions?populate=*`);
  console.log(`   Status: ${etapesRes.status}`);
  
  if (etapesRes.ok) {
    const etapesData = await etapesRes.json();
    console.log(`   ✅ ${etapesData.data?.length || 0} étapes trouvées`);
  }
  
  // Test 4: Liste des médias
  console.log('\n4️⃣ Médias disponibles pour heroImage...');
  const mediaRes = await fetch(`${STRAPI_URL}/api/upload/files`, {
    headers: { 'Authorization': `Bearer ${STRAPI_API_TOKEN}` }
  });
  
  if (mediaRes.ok) {
    const medias = await mediaRes.json();
    const heroImages = medias.filter(m => 
      m.name.toLowerCase().includes('hero') || 
      m.name.toLowerCase().includes('admission') ||
      m.name.toLowerCase().includes('background')
    );
    
    console.log(`   ${medias.length} médias au total`);
    if (heroImages.length > 0) {
      console.log('   Images hero disponibles:');
      heroImages.forEach(img => {
        console.log(`      - ${img.name} (ID: ${img.id}) - ${STRAPI_URL}${img.url}`);
      });
    }
  }
  
  console.log('\n✅ Test terminé');
}

testAdmissionAPI().catch(console.error);
