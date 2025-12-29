const STRAPI_URL = 'http://localhost:1337';
const STRAPI_API_TOKEN = '34ebc27d0aae530b71f7c236385a2013ba8db694ccbdf80a49a5cc3e0499ae408caa45dddb48f2a9ed35fd17a8a9eedb71fbf587e0806ccc282a4c62f8aa575457bc480b312f9740d1f3e1651e196a507075ed08a858b8dda30c5c1ffc88b61352c9436b7fddeb70f6668b194166d1a18133990d6da183edb6a0f4f4694f716d';

async function createPageAdmission() {
  console.log('🚀 Création de la Page Admission avec image...\n');
  
  // 1. Trouver l'image d'admission (ID: 62)
  console.log('📷 Recherche de l\'image d\'admission...');
  const mediaRes = await fetch(`${STRAPI_URL}/api/upload/files`, {
    headers: { 'Authorization': `Bearer ${STRAPI_API_TOKEN}` }
  });
  const medias = await mediaRes.json();
  
  // Chercher l'image spécifique
  const admissionImage = medias.find(m => m.name.includes('Admission') || m.id === 62);
  
  if (admissionImage) {
    console.log(`   ✅ Image trouvée: ${admissionImage.name}`);
    console.log(`   ID: ${admissionImage.id}`);
    console.log(`   URL: ${STRAPI_URL}${admissionImage.url}`);
  } else {
    console.log('   ❌ Image non trouvée');
    return;
  }
  
  // 2. Créer le contenu page-admission
  console.log('\n📝 Création du contenu Page Admission...');
  
  const pageData = {
    titre: "Parcours d'admission CMA",
    sousTitre: "Comment intégrer CMA ?",
    introduction: "À la Construction Management Academy, nous vous offrons un processus d'admission simplifié, sans concours d'entrée. L'admission CMA se fait uniquement sur la base d'un entretien de motivation. Si vous détenez les diplômes requis pour nos formations, vous êtes éligible. Lors de l'entretien, nous évaluerons votre motivation, qui est au cœur de notre processus de sélection. Il est important de noter qu'aucun frais de scolarité ou d'inscription ne sera demandé à l'alternant.",
    heroImage: admissionImage.id,
    contactPhone: "01 89 70 60 52",
    contactEmail: "inscription.academy@cma-education.com",
    ctaTexte: "Déposer ma candidature",
    ctaUrl: "https://cma-education.ymag.cloud/index.php/preinscription/",
    pointCle1Titre: "Sans concours",
    pointCle1Description: "Admission sur entretien de motivation uniquement",
    pointCle2Titre: "Gratuit pour l'alternant",
    pointCle2Description: "Aucun frais de scolarité ou d'inscription",
    pointCle3Titre: "Réponse rapide",
    pointCle3Description: "Décision sous 48h après l'entretien",
    titreEtapes: "Les étapes de votre admission",
    descriptionEtapes: "Un processus simple et transparent pour rejoindre la Construction Management Academy",
    titreCTA: "Prêt à rejoindre CMA ?",
    descriptionCTA: "Lancez votre candidature dès maintenant et commencez votre parcours vers une carrière dans le BTP",
    titreContact: "Des questions sur l'admission ?",
    descriptionContact: "Notre équipe est à votre disposition pour vous accompagner",
    publishedAt: new Date().toISOString()
  };
  
  const createRes = await fetch(`${STRAPI_URL}/api/page-admission`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ data: pageData })
  });
  
  const result = await createRes.json();
  
  if (createRes.ok) {
    console.log('   ✅ Page Admission créée avec succès!');
    console.log(`   ID: ${result.data?.id}`);
  } else {
    console.log('   ❌ Erreur:', result.error?.message || JSON.stringify(result));
    return;
  }
  
  // 3. Configurer les permissions
  console.log('\n🔐 Configuration des permissions...');
  
  const rolesRes = await fetch(`${STRAPI_URL}/api/users-permissions/roles`, {
    headers: { 'Authorization': `Bearer ${STRAPI_API_TOKEN}` }
  });
  const roles = await rolesRes.json();
  const publicRole = roles.roles.find(r => r.type === 'public');
  
  const roleRes = await fetch(`${STRAPI_URL}/api/users-permissions/roles/${publicRole.id}`, {
    headers: { 'Authorization': `Bearer ${STRAPI_API_TOKEN}` }
  });
  const roleData = await roleRes.json();
  
  const newPermissions = { ...roleData.role.permissions };
  
  newPermissions['api::page-admission'] = {
    controllers: {
      'page-admission': {
        find: { enabled: true, policy: '' }
      }
    }
  };
  
  newPermissions['api::etape-admission'] = {
    controllers: {
      'etape-admission': {
        find: { enabled: true, policy: '' },
        findOne: { enabled: true, policy: '' }
      }
    }
  };
  
  await fetch(`${STRAPI_URL}/api/users-permissions/roles/${publicRole.id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ permissions: newPermissions })
  });
  
  console.log('   ✅ Permissions configurées');
  
  // 4. Test final
  console.log('\n🧪 Test de l\'API...');
  await new Promise(r => setTimeout(r, 1000));
  
  const testRes = await fetch(`${STRAPI_URL}/api/page-admission?populate=*`);
  
  if (testRes.ok) {
    const testData = await testRes.json();
    console.log('   ✅ API accessible publiquement');
    console.log(`   Titre: ${testData.data?.attributes?.titre}`);
    
    if (testData.data?.attributes?.heroImage?.data) {
      const imgUrl = testData.data.attributes.heroImage.data.attributes.url;
      console.log(`   🖼️ Image hero: ${STRAPI_URL}${imgUrl}`);
    }
  } else {
    console.log('   ❌ API non accessible:', testRes.status);
  }
  
  console.log('\n✅ Terminé! Rafraîchis la page /admission pour voir l\'image.');
}

createPageAdmission().catch(console.error);
