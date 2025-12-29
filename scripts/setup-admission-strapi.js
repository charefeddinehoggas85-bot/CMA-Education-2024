const STRAPI_URL = 'http://localhost:1337';
const STRAPI_API_TOKEN = '34ebc27d0aae530b71f7c236385a2013ba8db694ccbdf80a49a5cc3e0499ae408caa45dddb48f2a9ed35fd17a8a9eedb71fbf587e0806ccc282a4c62f8aa575457bc480b312f9740d1f3e1651e196a507075ed08a858b8dda30c5c1ffc88b61352c9436b7fddeb70f6668b194166d1a18133990d6da183edb6a0f4f4694f716d';

async function setupAdmission() {
  console.log('🚀 Configuration de la page Admission dans Strapi\n');
  
  // 1. Vérifier les médias disponibles
  console.log('📷 Recherche des images uploadées...');
  const mediaRes = await fetch(`${STRAPI_URL}/api/upload/files`, {
    headers: { 'Authorization': `Bearer ${STRAPI_API_TOKEN}` }
  });
  const medias = await mediaRes.json();
  console.log(`   ${medias.length} médias trouvés`);
  
  // Chercher une image hero ou admission
  const heroImage = medias.find(m => 
    m.name.toLowerCase().includes('hero') || 
    m.name.toLowerCase().includes('admission') ||
    m.name.toLowerCase().includes('background')
  );
  
  if (heroImage) {
    console.log(`   ✅ Image hero trouvée: ${heroImage.name} (ID: ${heroImage.id})`);
  } else {
    console.log('   ⚠️ Pas d\'image hero trouvée. Images disponibles:');
    medias.slice(0, 10).forEach(m => console.log(`      - ${m.name} (ID: ${m.id})`));
  }
  
  // 2. Créer/Mettre à jour le contenu page-admission
  console.log('\n📝 Création du contenu page-admission...');
  const pageData = {
    titre: "Parcours d'admission CMA",
    sousTitre: "Comment intégrer CMA ?",
    introduction: "À la Construction Management Academy, nous vous offrons un processus d'admission simplifié, sans concours d'entrée. L'admission CMA se fait uniquement sur la base d'un entretien de motivation. Si vous détenez les diplômes requis pour nos formations, vous êtes éligible.",
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
  
  // Ajouter l'image si trouvée
  if (heroImage) {
    pageData.heroImage = heroImage.id;
  }
  
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
    console.log('   ✅ Page admission créée/mise à jour');
    console.log(`   ID: ${result.data?.id}`);
  } else {
    console.log('   ❌ Erreur:', result.error?.message);
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
  
  // Enable page-admission
  newPermissions['api::page-admission'] = {
    controllers: {
      'page-admission': {
        find: { enabled: true, policy: '' }
      }
    }
  };
  
  // Enable etape-admission
  newPermissions['api::etape-admission'] = {
    controllers: {
      'etape-admission': {
        find: { enabled: true, policy: '' },
        findOne: { enabled: true, policy: '' }
      }
    }
  };
  
  const updateRes = await fetch(`${STRAPI_URL}/api/users-permissions/roles/${publicRole.id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ permissions: newPermissions })
  });
  
  if (updateRes.ok) {
    console.log('   ✅ Permissions configurées');
  } else {
    console.log('   ❌ Erreur permissions');
  }
  
  // 4. Test final
  console.log('\n🧪 Test de l\'API...');
  
  // Attendre un peu pour que les permissions soient appliquées
  await new Promise(r => setTimeout(r, 1000));
  
  const testRes = await fetch(`${STRAPI_URL}/api/page-admission?populate=*`);
  console.log(`   Status: ${testRes.status}`);
  
  if (testRes.ok) {
    const testData = await testRes.json();
    console.log('   ✅ API accessible');
    console.log(`   Titre: ${testData.data?.attributes?.titre}`);
    if (testData.data?.attributes?.heroImage?.data) {
      console.log(`   🖼️ Image hero: ${testData.data.attributes.heroImage.data.attributes.url}`);
    } else {
      console.log('   ⚠️ Pas d\'image hero configurée');
    }
  } else {
    const errData = await testRes.json();
    console.log('   ❌ Erreur:', errData.error?.message);
  }
  
  console.log('\n✅ Configuration terminée!');
}

setupAdmission().catch(console.error);
