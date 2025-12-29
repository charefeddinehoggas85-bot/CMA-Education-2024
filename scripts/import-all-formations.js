/**
 * Script d'import complet des formations depuis src/lib/data.ts vers Strapi
 * Usage: node scripts/import-all-formations.js
 */

const STRAPI_URL = 'http://localhost:1337';
const STRAPI_API_TOKEN = '34ebc27d0aae530b71f7c236385a2013ba8db694ccbdf80a49a5cc3e0499ae408caa45dddb48f2a9ed35fd17a8a9eedb71fbf587e0806ccc282a4c62f8aa575457bc480b312f9740d1f3e1651e196a507075ed08a858b8dda30c5c1ffc88b61352c9436b7fddeb70f6668b194166d1a18133990d6da183edb6a0f4f4694f716d';

async function fetchAPI(endpoint, method = 'GET', data = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`
    }
  };
  
  if (data) {
    options.body = JSON.stringify({ data });
  }
  
  const response = await fetch(`${STRAPI_URL}${endpoint}`, options);
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API Error ${response.status}: ${error}`);
  }
  
  return response.json();
}

// Formations en alternance (depuis src/lib/data.ts)
const formationsAlternance = [
  {
    title: "Chargé(e) d'Affaires du Bâtiment",
    slug: "charge-affaires-batiment-alternance",
    level: "Niveau 5 Européen (équivalent BAC+2)",
    rncp: "RNCP35503",
    shortDescription: "Formation conçue, validée et dispensée par des professionnels du BTP pour développer des compétences opérationnelles solides.",
    fullDescription: "Cette formation permet aux futurs chargés d'affaires de développer des compétences opérationnelles solides, mobilisables dès leur entrée en entreprise. En combinant maîtrise technique, gestion financière, coordination de projets et relation client, elle prépare des professionnels complets capables de piloter des chantiers tous corps d'état. Grâce à son format en alternance, elle favorise une insertion rapide sur le marché du travail et offre de réelles perspectives d'évolution vers des fonctions à responsabilités dans les entreprises du BTP, de la PME au maître d'œuvre.",
    duration: "1 an en alternance (100%)",
    rhythm: "5 semaines de cours / 12 semaines en entreprise",
    price: "9300€ HT - Prise en charge par l'OPCO et l'entreprise - Aucun frais à la charge des alternants",
    objectives: [
      "Maîtriser l'analyse technique et financière des projets de construction",
      "Développer des compétences commerciales avancées (prospection, négociation, suivi client)",
      "Piloter efficacement les chantiers : planification, coordination, gestion des aléas",
      "Gérer la rentabilité : études de prix, optimisation des coûts, suivi budgétaire",
      "Manager les équipes et coordonner les différents corps de métier",
      "Maîtriser les outils numériques du BTP (logiciels de chiffrage, planning, BIM)",
      "Assurer la qualité, la sécurité et le respect des normes environnementales"
    ],
    prerequisites: [
      "Baccalauréat (tous les domaines)",
      "Ou niveau Bac avec expérience professionnelle managériale ou dans le BTP de plus de 3 ans"
    ],
    opportunities: [
      "Chargé(e) d'affaires tous corps d'état (salaire : 35-50k€)",
      "Conducteur(trice) de travaux (salaire : 32-45k€)",
      "Technico-commercial(e) BTP (salaire : 30-42k€ + primes)",
      "Coordinateur(trice) OPC (salaire : 35-48k€)",
      "Responsable de programmes immobiliers (salaire : 40-60k€)",
      "Chef de projet maîtrise d'œuvre (salaire : 38-55k€)",
      "Consultant en ingénierie bâtiment (salaire : 35-50k€)"
    ],
    successRate: 94,
    insertionRate: 89,
    isAlternance: true,
    isReconversion: false,
    publishedAt: new Date().toISOString()
  },
  {
    title: "Conducteur de Travaux – Bâtiment & Génie Civil",
    slug: "conducteur-travaux-batiment-alternance",
    level: "Niveau 5 (équivalent Bac+2)",
    rncp: "RNCP40217",
    shortDescription: "Formation professionnalisante pour devenir conducteur de travaux capable de préparer, gérer et coordonner un chantier de construction dans sa globalité.",
    fullDescription: "Cette formation professionnalisante a pour but de vous former en tant que conducteur de travaux capables de préparer, gérer et coordonner un chantier de construction dans sa globalité. Elle vise à transmettre toutes les compétences techniques, juridiques, financières et organisationnelles nécessaires pour conduire un projet de construction ou de génie civil, de la phase d'étude à la livraison finale.",
    duration: "1 an",
    rhythm: "17 semaines à l'école - 35 semaines en entreprise",
    price: "8000€ HT - Prise en charge par l'OPCO et l'entreprise - Aucun frais à la charge des alternants",
    objectives: [
      "Préparer un chantier en maîtrisant les aspects techniques, administratifs et budgétaires",
      "Piloter les travaux sur le terrain, coordonner les équipes et gérer les aléas",
      "Assurer la gestion financière d'un projet (études de prix, marges, achats…)",
      "Garantir la conformité réglementaire, la sécurité et la qualité des opérations",
      "Communiquer efficacement avec tous les intervenants du chantier"
    ],
    prerequisites: [
      "Être titulaire du baccalauréat",
      "Ou avoir un niveau bac avec au moins 3 ans d'expérience dans le BTP ou dans un poste managérial"
    ],
    opportunities: [
      "Conducteur(trice) de travaux",
      "Coordinateur(trice) ou responsable de chantier",
      "Chef de chantier",
      "Chargé(e) d'études techniques",
      "Assistant(e) OPC",
      "Assistant(e) maître d'œuvre"
    ],
    successRate: 92,
    insertionRate: 87,
    isAlternance: true,
    isReconversion: false,
    publishedAt: new Date().toISOString()
  },
  {
    title: "Chef de Chantier Voirie et Réseaux Divers",
    slug: "chef-chantier-vrd-alternance",
    level: "Niveau 5 (équivalent BAC+2)",
    rncp: "RNCP41368",
    shortDescription: "Formation professionnalisante pour devenir chef de chantier VRD capable de préparer, diriger et clôturer l'exécution de chantiers de voirie et réseaux divers.",
    fullDescription: "Cette formation professionnalisante, directement ancrée dans les réalités du terrain, vous forme en tant que chef de chantier en voirie et réseaux divers capables de préparer l'exécution d'un chantier, diriger l'exécution, et clôturer l'exécution (voirie, réseaux, assainissement, ouvrages d'art, etc.). Elle permet d'acquérir des compétences techniques, organisationnelles et réglementaires immédiatement applicables en entreprise.",
    duration: "1 an",
    rhythm: "16 semaines à l'école - 36 semaines en entreprise",
    price: "9520€ HT - Prise en charge par l'OPCO et l'entreprise - Aucun frais à la charge des alternants",
    objectives: [
      "Maîtriser les fondamentaux techniques VRD pour exécuter un chantier",
      "Appliquer les techniques topographiques pour implantations et contrôles",
      "Réaliser des métrés quantitatifs précis et analyser les études de prix",
      "Organiser et piloter un chantier VRD/TP",
      "Mobiliser/coordonner ressources humaines et matérielles",
      "Encadrer et motiver des équipes pluridisciplinaires"
    ],
    prerequisites: [
      "Titulaire d'un Bac professionnel, général ou technique",
      "Ou niveau Bac avec 2 ans d'expérience dans le domaine de la VRD/TP"
    ],
    opportunities: [
      "Chef(fe) de chantier VRD",
      "Chef de chantier TP",
      "Chef de chantier voirie et réseaux divers",
      "Chef de chantier terrassement et canalisation"
    ],
    successRate: 91,
    insertionRate: 88,
    isAlternance: true,
    isReconversion: false,
    publishedAt: new Date().toISOString()
  },
  {
    title: "Double Parcours Responsable Travaux Bâtiment & Coordinateur BIM du Bâtiment",
    slug: "double-parcours-bim-alternance",
    level: "Niveau 6 (équivalent Bac+3)",
    rncp: "RNCP39408",
    shortDescription: "Formation professionnalisante visant à former des professionnels du BTP capables de conduire des chantiers de construction tout en intégrant les outils numériques collaboratifs du BIM.",
    fullDescription: "Cette formation professionnalisante vise à former des professionnels du BTP capables de conduire des chantiers de construction tout en intégrant les outils numériques collaboratifs du BIM. Elle allie les compétences techniques, organisationnelles et réglementaires du Responsable Travaux à une expertise pointue en coordination BIM, répondant aux nouveaux enjeux du bâtiment intelligent et connecté.",
    duration: "1 an",
    rhythm: "20 semaines à l'école - 32 semaines en entreprise",
    price: "9000€HT (PRISE EN CHARGE PAR L'OPCO ET L'ENTREPRISE – AUCUN FRAIS À LA CHARGE DES ALTERNANTS)",
    objectives: [
      "Gérer un chantier de construction de A à Z, en respectant les délais, les budgets et les normes",
      "Organiser, coordonner et superviser les équipes et les sous-traitants",
      "Suivre les indicateurs de performance et réaliser des contre-études technico-financières",
      "Mettre en œuvre les protocoles BIM et animer la collaboration autour de la maquette numérique",
      "Intégrer les principes du Lean Construction et de l'innovation digitale dans vos projets"
    ],
    prerequisites: [
      "Être titulaire d'un BAC+2 professionnel ou technique dans le BTP",
      "Ou justifier d'un niveau 5 équivalent avec une expérience significative dans le secteur"
    ],
    opportunities: [
      "Coordinateur(trice) de chantier ou responsable de chantier",
      "Chargé(e) d'études techniques ou assistant(e) au maître d'ouvrage",
      "Coordinateur BIM, BIM modeleur confirmé, référent BIM ou encore responsable BIM",
      "Chargé(e) de projet BIM au sein d'agences, de bureaux d'études ou de grands groupes"
    ],
    successRate: 93,
    insertionRate: 91,
    isAlternance: true,
    isReconversion: false,
    publishedAt: new Date().toISOString()
  },
  {
    title: "Chef de Projets BTP",
    slug: "chef-projets-btp-alternance",
    level: "Niveau 7 (équivalent Bac+5)",
    rncp: "En cours d'enregistrement",
    shortDescription: "Formation professionnalisante préparant des experts capables de gérer des projets de construction complexes et innovants, en intégrant les enjeux contemporains du BTP.",
    fullDescription: "Cette formation chef de projets BTP professionnalisante prépare des experts capables de gérer des projets de construction complexes et innovants, en intégrant les enjeux contemporains du BTP : transition énergétique, digitalisation, durabilité, performance économique et innovation managériale. Elle forme des chefs de projets agiles, stratèges et responsables, capables de répondre aux exigences des Smart Buildings, des Smart Cities, et de la construction durable.",
    duration: "2 ans",
    rhythm: "40 semaines à l'école - 64 semaines en entreprise",
    price: "13€ HT/h DE FORMATION (PRISE EN CHARGE PAR L'OPCO ET L'ENTREPRISE)",
    objectives: [
      "Piloter intégralement des projets de construction complexes, de la conception à la livraison",
      "Intégrer les outils numériques comme le BIM, l'intelligence artificielle et le Lean Construction dans la stratégie de projet",
      "Gérer les dimensions financières, juridiques, contractuelles et environnementales d'une opération",
      "Manager des équipes pluridisciplinaires et multiculturelles avec leadership et méthode",
      "Répondre aux enjeux des territoires intelligents grâce à une vision Smart Building et Smart Cities"
    ],
    prerequisites: [
      "Être titulaire d'un BAC+3 professionnel ou technique dans le BTP",
      "Ou justifier d'un niveau 6 équivalent avec expérience dans le domaine"
    ],
    opportunities: [
      "Chef de projets BTP",
      "Conducteur de travaux",
      "Ingénieur travaux",
      "Manager de la construction",
      "Responsable BIM & innovation numérique",
      "Consultant en stratégie BTP/RSE"
    ],
    successRate: 95,
    insertionRate: 92,
    isAlternance: true,
    isReconversion: false,
    publishedAt: new Date().toISOString()
  }
];

// Formations reconversion (échantillon)
const formationsReconversion = [
  {
    title: "Chargé d'affaires du bâtiment - Professionnels en reconversion",
    slug: "charge-affaires-batiment-reconversion",
    level: "Niveau 5 (équivalent Bac+2)",
    rncp: "RNCP35503",
    shortDescription: "Une formation pensée pour les professionnels en reconversion.",
    fullDescription: "Ce parcours est conçu pour les professionnels du bâtiment souhaitant accéder à un rôle stratégique en gestion de projet et relation client. Que vous ayez de l'expérience à valoriser (VAE) ou que vous envisagiez une reconversion, CMA vous forme à un métier clé du secteur : Chargé d'Affaires du Bâtiment.",
    duration: "Formation modulaire adaptée",
    rhythm: "Rythme personnalisé selon profil",
    price: "Prise en charge possible selon statut",
    objectives: [
      "Comprendre et analyser un projet de construction ou rénovation",
      "Réaliser une étude de faisabilité technique et financière",
      "Concevoir une offre commerciale adaptée",
      "Piloter les travaux sur le terrain, gérer les imprévus et optimiser les délais",
      "Communiquer efficacement avec les clients, fournisseurs, artisans et maîtres d'œuvre",
      "Suivre la rentabilité des opérations et veiller à la satisfaction client"
    ],
    prerequisites: [
      "Expérience professionnelle dans le BTP ou secteur connexe",
      "Motivation pour une reconversion professionnelle"
    ],
    opportunities: [
      "Chargé(e) d'affaires tous corps d'état",
      "Conducteur(trice) de travaux",
      "Technico-commercial(e) en BTP",
      "Coordinateur(trice) OPC",
      "Assistant(e) chef de projet dans un bureau d'études",
      "Responsable d'opérations ou chargé(e) d'affaires en maîtrise d'œuvre"
    ],
    successRate: 88,
    insertionRate: 85,
    isAlternance: false,
    isReconversion: true,
    publishedAt: new Date().toISOString()
  }
];

async function importFormations() {
  console.log('🚀 Import complet des formations vers Strapi...\n');

  try {
    // Test de connexion
    console.log('🔗 Test de connexion à Strapi...');
    await fetchAPI('/api/formations?pagination[limit]=1');
    console.log('✅ Connexion Strapi OK\n');

    // Import formations alternance
    console.log('📚 Import des formations en alternance...');
    for (const formation of formationsAlternance) {
      try {
        await fetchAPI('/api/formations', 'POST', formation);
        console.log(`  ✅ "${formation.title}" importée`);
      } catch (error) {
        if (error.message.includes('400')) {
          console.log(`  ⚠️ "${formation.title}" existe déjà ou erreur de validation`);
        } else {
          console.log(`  ❌ "${formation.title}": ${error.message}`);
        }
      }
    }

    // Import formations reconversion
    console.log('\n🔄 Import des formations reconversion...');
    for (const formation of formationsReconversion) {
      try {
        await fetchAPI('/api/formations', 'POST', formation);
        console.log(`  ✅ "${formation.title}" importée`);
      } catch (error) {
        if (error.message.includes('400')) {
          console.log(`  ⚠️ "${formation.title}" existe déjà ou erreur de validation`);
        } else {
          console.log(`  ❌ "${formation.title}": ${error.message}`);
        }
      }
    }

    console.log('\n✨ Import terminé!');
    console.log(`📊 Total: ${formationsAlternance.length + formationsReconversion.length} formations traitées`);

    // Vérification
    console.log('\n🔍 Vérification des données importées...');
    const result = await fetchAPI('/api/formations?pagination[limit]=100');
    console.log(`✅ ${result.data.length} formations trouvées dans Strapi`);

  } catch (error) {
    console.error('\n❌ Erreur lors de l\'import:', error.message);
    console.log('\n💡 Vérifiez que:');
    console.log('  - Strapi est démarré (npm run develop dans cms-cma/)');
    console.log('  - Le token API est correct dans le script');
    console.log('  - Les content types sont bien créés dans Strapi');
  }
}

importFormations();