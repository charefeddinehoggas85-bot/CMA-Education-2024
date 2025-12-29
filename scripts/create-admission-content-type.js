const STRAPI_URL = 'http://localhost:1337';
const STRAPI_API_TOKEN = '34ebc27d0aae530b71f7c236385a2013ba8db694ccbdf80a49a5cc3e0499ae408caa45dddb48f2a9ed35fd17a8a9eedb71fbf587e0806ccc282a4c62f8aa575457bc480b312f9740d1f3e1651e196a507075ed08a858b8dda30c5c1ffc88b61352c9436b7fddeb70f6668b194166d1a18133990d6da183edb6a0f4f4694f716d';

// Données des étapes d'admission
const etapesAdmission = [
  {
    numero: 1,
    titre: "Soumission du dossier de candidature",
    description: "Commencez par compléter notre formulaire en ligne : présentez votre parcours, votre profil et votre projet professionnel.",
    details: [
      "Complétez le formulaire de candidature en ligne",
      "Présentez votre parcours et votre projet professionnel",
      "Notre équipe vous recontacte sous 24 heures pour fixer un rendez-vous"
    ],
    icone: "FileText",
    ordre: 1
  },
  {
    numero: 2,
    titre: "L'entretien d'admission CMA",
    description: "L'entretien peut se dérouler en présentiel ou à distance, selon votre préférence. C'est un moment d'échange privilégié pour discuter de vos motivations.",
    details: [
      "Entretien en présentiel ou à distance selon votre préférence",
      "Échange sur vos motivations et votre projet professionnel",
      "Évaluation de la cohérence entre votre profil et la formation visée",
      "Décision communiquée sous 48 heures après l'entretien"
    ],
    icone: "Users",
    ordre: 2
  },
  {
    numero: 3,
    titre: "La recherche d'alternance",
    description: "Une fois votre candidature validée, vous recevrez tous les documents nécessaires pour démarrer votre recherche d'entreprise.",
    details: [
      "Réception des documents pour la recherche d'entreprise",
      "Préparation de votre contrat d'alternance",
      "Inscription définitive à la signature de la convention de formation"
    ],
    icone: "Search",
    ordre: 3
  },
  {
    numero: 4,
    titre: "Un accompagnement dédié pour trouver votre entreprise",
    description: "Dès que votre inscription est validée, vous bénéficiez d'un accompagnement personnalisé dans votre recherche d'alternance.",
    details: [
      "Accompagnement personnalisé dans votre recherche",
      "Atelier pratique pour optimiser votre CV et lettre de motivation",
      "Conseils pour maximiser vos chances auprès des recruteurs"
    ],
    icone: "HeartHandshake",
    ordre: 4
  }
];

// Données de la page admission
const pageAdmission = {
  titre: "Parcours d'admission CMA",
  sousTitre: "Comment intégrer CMA ?",
  introduction: "À la Construction Management Academy, nous vous offrons un processus d'admission simplifié, sans concours d'entrée. L'admission CMA se fait uniquement sur la base d'un entretien de motivation. Si vous détenez les diplômes requis pour nos formations, vous êtes éligible. Lors de l'entretien, nous évaluerons votre motivation, qui est au cœur de notre processus de sélection. Il est important de noter qu'aucun frais de scolarité ou d'inscription ne sera demandé à l'alternant.",
  contactPhone: "01 89 70 60 52",
  contactEmail: "inscription.academy@cma-education.com"
};

async function checkAndCreateContentTypes() {
  console.log('🔍 Vérification des content types existants...\n');
  
  // Vérifier si etape-admission existe
  const etapeResponse = await fetch(`${STRAPI_URL}/api/etape-admissions`, {
    headers: {
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });
  
  // Vérifier si page-admission existe
  const pageResponse = await fetch(`${STRAPI_URL}/api/page-admission`, {
    headers: {
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });
  
  const etapeExists = etapeResponse.ok;
  const pageExists = pageResponse.ok;
  
  console.log(`   etape-admission: ${etapeExists ? '✅ Existe' : '❌ N\'existe pas'}`);
  console.log(`   page-admission: ${pageExists ? '✅ Existe' : '❌ N\'existe pas'}`);
  
  return { etapeExists, pageExists };
}

async function importEtapesAdmission() {
  console.log('\n📥 Import des étapes d\'admission...\n');
  
  for (const etape of etapesAdmission) {
    try {
      const response = await fetch(`${STRAPI_URL}/api/etape-admissions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: {
            numero: etape.numero,
            titre: etape.titre,
            description: etape.description,
            details: etape.details,
            icone: etape.icone,
            ordre: etape.ordre,
            publishedAt: new Date().toISOString()
          }
        })
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log(`   ✅ Étape ${etape.numero}: ${etape.titre}`);
      } else {
        const error = await response.json();
        console.log(`   ❌ Erreur étape ${etape.numero}:`, error.error?.message || 'Erreur inconnue');
      }
    } catch (error) {
      console.log(`   ❌ Erreur étape ${etape.numero}:`, error.message);
    }
  }
}

async function importPageAdmission() {
  console.log('\n📥 Import des données de la page admission...\n');
  
  try {
    const response = await fetch(`${STRAPI_URL}/api/page-admission`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: {
          ...pageAdmission,
          publishedAt: new Date().toISOString()
        }
      })
    });
    
    if (response.ok) {
      console.log('   ✅ Page admission configurée');
    } else {
      const error = await response.json();
      console.log('   ❌ Erreur:', error.error?.message || 'Erreur inconnue');
    }
  } catch (error) {
    console.log('   ❌ Erreur:', error.message);
  }
}

async function main() {
  console.log('🚀 Configuration de la page Admission dans Strapi\n');
  console.log('=' .repeat(50));
  
  const { etapeExists, pageExists } = await checkAndCreateContentTypes();
  
  if (!etapeExists || !pageExists) {
    console.log('\n⚠️  Les content types n\'existent pas encore dans Strapi.');
    console.log('   Vous devez les créer manuellement dans l\'admin Strapi:\n');
    
    if (!etapeExists) {
      console.log('   📋 Content Type: etape-admission (Collection Type)');
      console.log('      - numero (Number, required)');
      console.log('      - titre (Text, required)');
      console.log('      - description (Text, long text)');
      console.log('      - details (JSON)');
      console.log('      - icone (Text)');
      console.log('      - ordre (Number)\n');
    }
    
    if (!pageExists) {
      console.log('   📋 Content Type: page-admission (Single Type)');
      console.log('      - titre (Text, required)');
      console.log('      - sousTitre (Text)');
      console.log('      - introduction (Text, long text)');
      console.log('      - contactPhone (Text)');
      console.log('      - contactEmail (Email)\n');
    }
    
    console.log('   Une fois créés, relancez ce script pour importer les données.');
    console.log('\n   💡 En attendant, la page utilise les données statiques par défaut.');
    return;
  }
  
  // Importer les données
  await importEtapesAdmission();
  await importPageAdmission();
  
  console.log('\n' + '=' .repeat(50));
  console.log('✅ Configuration terminée!');
  console.log('   La page /admission est maintenant accessible.');
  console.log('   Les données sont modifiables via Strapi admin.');
}

main().catch(console.error);
