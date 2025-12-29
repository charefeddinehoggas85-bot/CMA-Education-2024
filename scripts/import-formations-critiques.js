const axios = require('axios');

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || '34ebc27d0aae530b71f7c236385a2013ba8db694ccbdf80a49a5cc3e0499ae408caa45dddb48f2a9ed35fd17a8a9eedb71fbf587e0806ccc282a4c62f8aa575457bc480b312f9740d1f3e1651e196a507075ed08a858b8dda30c5c1ffc88b61352c9436b7fddeb70f6668b194166d1a18133990d6da183edb6a0f4f4694f716d';

const api = axios.create({
  baseURL: STRAPI_URL,
  headers: {
    'Authorization': `Bearer ${STRAPI_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

// Catégories de formations à créer d'abord
const formationCategories = [
  {
    name: 'Alternance',
    slug: 'alternance',
    description: 'Formations en alternance pour acquérir une expérience professionnelle',
    color: '#3B82F6',
    icon: 'GraduationCap',
    ordre: 1
  },
  {
    name: 'Reconversion',
    slug: 'reconversion',
    description: 'Formations pour professionnels en reconversion',
    color: '#10B981',
    icon: 'RotateCcw',
    ordre: 2
  },
  {
    name: 'VAE',
    slug: 'vae',
    description: 'Validation des Acquis de l\'Expérience',
    color: '#F59E0B',
    icon: 'Award',
    ordre: 3
  },
  {
    name: 'VRD',
    slug: 'vrd',
    description: 'Formations Voirie et Réseaux Divers',
    color: '#8B5CF6',
    icon: 'Road',
    ordre: 4
  }
];

// 9 formations critiques manquantes (basées sur src/lib/data.ts)
const formationsCritiques = [
  {
    title: 'Chargé(e) d\'Affaires du Bâtiment',
    slug: 'charge-affaires-batiment-alternance',
    level: 'Niveau 5 Européen (équivalent BAC+2)',
    rncp: 'RNCP35503',
    shortDesc: 'Formation conçue, validée et dispensée par des professionnels du BTP pour développer des compétences opérationnelles solides.',
    fullDesc: 'Cette formation permet aux futurs chargés d\'affaires de développer des compétences opérationnelles solides, mobilisables dès leur entrée en entreprise. En combinant maîtrise technique, gestion financière, coordination de projets et relation client, elle prépare des professionnels complets capables de piloter des chantiers tous corps d\'état.',
    objectives: [
      'Maîtriser l\'analyse technique et financière des projets de construction',
      'Développer des compétences commerciales avancées (prospection, négociation, suivi client)',
      'Piloter efficacement les chantiers : planification, coordination, gestion des aléas',
      'Gérer la rentabilité : études de prix, optimisation des coûts, suivi budgétaire',
      'Manager les équipes et coordonner les différents corps de métier',
      'Maîtriser les outils numériques du BTP (logiciels de chiffrage, planning, BIM)',
      'Assurer la qualité, la sécurité et le respect des normes environnementales'
    ],
    opportunities: [
      'Chargé(e) d\'affaires tous corps d\'état (salaire : 35-50k€)',
      'Conducteur(trice) de travaux (salaire : 32-45k€)',
      'Responsable de production (salaire : 38-52k€)',
      'Chef de projet BTP (salaire : 40-55k€)',
      'Créateur d\'entreprise BTP',
      'Consultant en maîtrise d\'œuvre',
      'Responsable développement commercial BTP'
    ],
    prerequisites: [
      'Baccalauréat (toutes séries) ou équivalent',
      'Motivation confirmée pour le secteur du BTP',
      'Capacités d\'organisation et de communication',
      'Esprit d\'équipe et leadership',
      'Aisance avec les outils numériques'
    ],
    duration: '24 mois',
    rhythm: '3 semaines en entreprise / 1 semaine en formation',
    price: 'Gratuit (prise en charge OPCO)',
    successRate: 92,
    insertionRate: 96,
    isAlternance: true,
    isReconversion: false,
    category: 'alternance',
    ordre: 1
  },
  {
    title: 'Conducteur(trice) de Travaux Bâtiment & Génie Civil',
    slug: 'conducteur-travaux-batiment-alternance',
    level: 'Niveau 6 Européen (équivalent BAC+3)',
    rncp: 'RNCP34079',
    shortDesc: 'Formation d\'excellence pour devenir conducteur de travaux, alliant expertise technique, management d\'équipes et gestion de projets complexes.',
    fullDesc: 'Cette formation prépare les futurs conducteurs de travaux à gérer des projets de construction de A à Z. De la préparation technique à la réception des ouvrages, en passant par le management d\'équipes et la coordination des entreprises, cette formation développe toutes les compétences nécessaires pour exceller dans ce métier stratégique du BTP.',
    objectives: [
      'Maîtriser la préparation et l\'organisation des chantiers',
      'Piloter la réalisation des ouvrages (planning, qualité, sécurité, coûts)',
      'Manager et coordonner les équipes de production',
      'Gérer les relations avec les clients, architectes et bureaux d\'études',
      'Optimiser les méthodes de construction et l\'utilisation des ressources',
      'Assurer le respect des normes de sécurité et environnementales',
      'Maîtriser les outils numériques de gestion de chantier et BIM'
    ],
    opportunities: [
      'Conducteur(trice) de travaux (salaire : 38-55k€)',
      'Chef de chantier (salaire : 35-48k€)',
      'Responsable de production (salaire : 42-60k€)',
      'Directeur de travaux (salaire : 50-70k€)',
      'Responsable d\'agence BTP (salaire : 55-80k€)',
      'Consultant en maîtrise d\'œuvre',
      'Créateur d\'entreprise BTP'
    ],
    prerequisites: [
      'BTS Bâtiment, Travaux Publics ou équivalent (BAC+2)',
      'Expérience professionnelle dans le BTP souhaitée',
      'Capacités de management et de communication',
      'Rigueur, organisation et sens des responsabilités',
      'Mobilité géographique'
    ],
    duration: '12 mois',
    rhythm: '2 semaines en entreprise / 2 semaines en formation',
    price: 'Gratuit (prise en charge OPCO)',
    successRate: 89,
    insertionRate: 98,
    isAlternance: true,
    isReconversion: true,
    category: 'alternance',
    ordre: 2
  },
  {
    title: 'Chef de Chantier VRD',
    slug: 'chef-chantier-vrd-alternance',
    level: 'Niveau 5 Européen (équivalent BAC+2)',
    rncp: 'RNCP34624',
    shortDescription: 'Spécialisation VRD (Voirie et Réseaux Divers) pour devenir chef de chantier expert en infrastructures urbaines.',
    fullDescription: 'Cette formation spécialisée prépare aux métiers du VRD (Voirie et Réseaux Divers). Elle couvre l\'ensemble des compétences nécessaires pour gérer des chantiers d\'infrastructures : réseaux d\'eau, d\'assainissement, électriques, télécoms, voirie, espaces verts. Une formation technique pointue dans un secteur en forte demande.',
    objectives: [
      'Maîtriser les techniques de construction VRD (terrassement, réseaux, voirie)',
      'Lire et interpréter les plans de réseaux et d\'infrastructures',
      'Organiser et planifier les chantiers VRD',
      'Coordonner les différents corps de métier (terrassiers, canalisateurs, etc.)',
      'Assurer la sécurité sur les chantiers d\'infrastructures',
      'Contrôler la qualité des ouvrages et la conformité aux normes',
      'Gérer les relations avec les concessionnaires et services publics'
    ],
    opportunities: [
      'Chef de chantier VRD (salaire : 32-45k€)',
      'Conducteur de travaux VRD (salaire : 38-52k€)',
      'Responsable d\'exploitation réseaux (salaire : 35-48k€)',
      'Chargé d\'affaires VRD (salaire : 40-55k€)',
      'Responsable technique collectivités (salaire : 38-50k€)',
      'Consultant en infrastructures',
      'Créateur d\'entreprise VRD'
    ],
    prerequisites: [
      'Baccalauréat STI2D, Pro ou général',
      'Intérêt pour les infrastructures et l\'aménagement urbain',
      'Capacités d\'organisation et de coordination',
      'Rigueur et sens des responsabilités',
      'Permis B obligatoire'
    ],
    duration: '24 mois',
    rhythm: '3 semaines en entreprise / 1 semaine en formation',
    price: 'Gratuit (prise en charge OPCO)',
    successRate: 88,
    insertionRate: 94,
    isAlternance: true,
    isReconversion: false,
    category: 'vrd',
    ordre: 3
  },
  {
    title: 'Double Parcours : Responsable Travaux & Coordinateur BIM',
    slug: 'double-parcours-bim-alternance',
    level: 'Niveau 6 Européen (équivalent BAC+3)',
    rncp: 'RNCP34079 + Certification BIM',
    shortDescription: 'Formation innovante combinant management de travaux et expertise BIM pour les professionnels du futur.',
    fullDescription: 'Cette formation unique combine deux expertises complémentaires : le management de travaux traditionnel et la maîtrise des technologies BIM (Building Information Modeling). Elle prépare les professionnels aux enjeux de la transformation numérique du BTP, en formant des experts capables de piloter des projets complexes avec les outils de demain.',
    objectives: [
      'Maîtriser le management de travaux (planning, coûts, qualité, sécurité)',
      'Développer une expertise BIM complète (Revit, Navisworks, BIM 360)',
      'Coordonner les maquettes numériques et gérer les données BIM',
      'Piloter des projets en mode collaboratif BIM',
      'Optimiser les processus de construction grâce au numérique',
      'Former et accompagner les équipes à la transition BIM',
      'Assurer l\'interface entre maîtrise d\'œuvre et entreprises'
    ],
    opportunities: [
      'BIM Manager (salaire : 45-65k€)',
      'Coordinateur BIM (salaire : 40-55k€)',
      'Conducteur de travaux BIM (salaire : 42-58k€)',
      'Responsable innovation BTP (salaire : 50-70k€)',
      'Consultant BIM (salaire : 55-80k€)',
      'Chef de projet digital construction',
      'Formateur BIM'
    ],
    prerequisites: [
      'BTS/DUT Bâtiment ou expérience BTP significative',
      'Maîtrise des outils informatiques',
      'Capacités d\'adaptation aux nouvelles technologies',
      'Esprit d\'analyse et de synthèse',
      'Anglais technique souhaité'
    ],
    duration: '18 mois',
    rhythm: '2 semaines en entreprise / 2 semaines en formation',
    price: 'Gratuit (prise en charge OPCO)',
    successRate: 94,
    insertionRate: 100,
    isAlternance: true,
    isReconversion: true,
    category: 'alternance',
    ordre: 4
  },
  {
    title: 'Chef de Projets BTP',
    slug: 'chef-projets-btp-alternance',
    level: 'Niveau 6 Européen (équivalent BAC+3)',
    rncp: 'RNCP34079',
    shortDescription: 'Formation management pour piloter des projets BTP complexes de la conception à la livraison.',
    fullDescription: 'Cette formation prépare aux fonctions de chef de projets BTP, métier stratégique qui consiste à piloter des opérations de construction complexes. De la phase conception à la livraison, le chef de projets coordonne tous les acteurs (maîtrise d\'œuvre, entreprises, clients) et garantit le respect des objectifs qualité, délais et coûts.',
    objectives: [
      'Maîtriser la gestion de projets BTP (méthodes, outils, indicateurs)',
      'Coordonner les phases de conception et de réalisation',
      'Piloter les équipes projet et animer les réunions de chantier',
      'Gérer les risques et anticiper les aléas de construction',
      'Optimiser la rentabilité et contrôler les budgets',
      'Assurer la qualité et la conformité des ouvrages',
      'Développer les relations clients et partenaires'
    ],
    opportunities: [
      'Chef de projets BTP (salaire : 42-60k€)',
      'Directeur de travaux (salaire : 50-70k€)',
      'Responsable d\'opérations immobilières (salaire : 45-65k€)',
      'Consultant en maîtrise d\'ouvrage (salaire : 48-68k€)',
      'Responsable développement (salaire : 50-75k€)',
      'Directeur d\'agence BTP (salaire : 60-90k€)',
      'Créateur d\'entreprise BTP'
    ],
    prerequisites: [
      'BAC+2 BTP ou expérience professionnelle équivalente',
      'Capacités de management et de communication',
      'Rigueur, organisation et sens des responsabilités',
      'Esprit de synthèse et capacités d\'analyse',
      'Mobilité géographique'
    ],
    duration: '15 mois',
    rhythm: '2 semaines en entreprise / 2 semaines en formation',
    price: 'Gratuit (prise en charge OPCO)',
    successRate: 91,
    insertionRate: 97,
    isAlternance: true,
    isReconversion: true,
    category: 'alternance',
    ordre: 5
  },
  {
    title: 'Chargé(e) d\'Affaires Bâtiment - Reconversion',
    slug: 'charge-affaires-batiment-reconversion',
    level: 'Niveau 5 Européen (équivalent BAC+2)',
    rncp: 'RNCP35503',
    shortDescription: 'Formation reconversion intensive pour devenir chargé d\'affaires BTP en 12 mois.',
    fullDescription: 'Cette formation intensive s\'adresse aux professionnels en reconversion souhaitant intégrer le secteur du BTP. En 12 mois, elle permet d\'acquérir toutes les compétences nécessaires pour devenir chargé d\'affaires : techniques de construction, gestion commerciale, pilotage de chantiers et management d\'équipes.',
    objectives: [
      'Acquérir les fondamentaux techniques du BTP',
      'Développer les compétences commerciales (prospection, négociation)',
      'Maîtriser la gestion de projets et le pilotage de chantiers',
      'Apprendre le management d\'équipes et la coordination',
      'Comprendre les aspects juridiques et réglementaires',
      'Utiliser les outils numériques du BTP',
      'Développer son réseau professionnel'
    ],
    opportunities: [
      'Chargé(e) d\'affaires BTP (salaire : 32-45k€)',
      'Commercial BTP (salaire : 30-42k€)',
      'Conducteur de travaux junior (salaire : 35-48k€)',
      'Responsable de secteur (salaire : 38-50k€)',
      'Consultant en bâtiment (salaire : 35-50k€)',
      'Créateur d\'entreprise BTP',
      'Responsable développement'
    ],
    prerequisites: [
      'BAC+2 minimum (toutes filières)',
      'Expérience professionnelle de 3 ans minimum',
      'Projet de reconversion confirmé vers le BTP',
      'Capacités relationnelles et commerciales',
      'Motivation et disponibilité pour formation intensive'
    ],
    duration: '12 mois',
    rhythm: 'Formation continue intensive',
    price: 'Financement CPF, Pôle Emploi, OPCO',
    successRate: 87,
    insertionRate: 93,
    isAlternance: false,
    isReconversion: true,
    category: 'reconversion',
    ordre: 6
  },
  {
    title: 'Technicien VRD - Voirie et Réseaux Divers',
    slug: 'technicien-vrd-formation',
    level: 'Niveau 4 Européen (équivalent BAC)',
    rncp: 'RNCP34624',
    shortDescription: 'Formation technique spécialisée dans les infrastructures urbaines et les réseaux.',
    fullDescription: 'Cette formation technique forme des spécialistes des infrastructures urbaines. Elle couvre l\'ensemble des compétences nécessaires pour intervenir sur les réseaux d\'eau, d\'assainissement, électriques, de télécommunications, ainsi que sur la voirie et les espaces verts urbains.',
    objectives: [
      'Maîtriser les techniques de terrassement et de pose de réseaux',
      'Lire et interpréter les plans de réseaux et topographiques',
      'Utiliser les outils de topographie et de géolocalisation',
      'Respecter les normes de sécurité sur chantiers urbains',
      'Coordonner avec les concessionnaires et services techniques',
      'Contrôler la qualité des travaux et la conformité',
      'Gérer l\'interface avec les riverains et usagers'
    ],
    opportunities: [
      'Technicien VRD (salaire : 25-35k€)',
      'Chef d\'équipe VRD (salaire : 28-38k€)',
      'Contrôleur de travaux (salaire : 30-40k€)',
      'Technicien de collectivité (salaire : 27-37k€)',
      'Responsable d\'exploitation réseaux (salaire : 32-42k€)',
      'Consultant technique VRD',
      'Formateur technique'
    ],
    prerequisites: [
      'Baccalauréat professionnel ou technologique',
      'Intérêt pour les travaux d\'infrastructures',
      'Capacités techniques et manuelles',
      'Rigueur et sens de l\'organisation',
      'Permis B obligatoire'
    ],
    duration: '18 mois',
    rhythm: '3 semaines en entreprise / 1 semaine en formation',
    price: 'Gratuit (prise en charge OPCO)',
    successRate: 85,
    insertionRate: 91,
    isAlternance: true,
    isReconversion: false,
    category: 'vrd',
    ordre: 7
  },
  {
    title: 'Responsable de Chantier VRD',
    slug: 'responsable-chantier-vrd-formation',
    level: 'Niveau 5 Européen (équivalent BAC+2)',
    rncp: 'RNCP34624',
    shortDescription: 'Formation management pour encadrer les équipes sur les chantiers d\'infrastructures.',
    fullDescription: 'Cette formation prépare aux fonctions d\'encadrement sur les chantiers VRD. Elle développe les compétences techniques spécialisées dans les infrastructures urbaines ainsi que les capacités de management d\'équipes et de gestion de chantiers complexes en milieu urbain.',
    objectives: [
      'Planifier et organiser les chantiers VRD',
      'Manager les équipes et coordonner les sous-traitants',
      'Maîtriser les techniques avancées de construction VRD',
      'Gérer les contraintes urbaines et la coactivité',
      'Assurer la sécurité et la signalisation de chantier',
      'Contrôler la qualité et la conformité des ouvrages',
      'Optimiser les coûts et respecter les plannings'
    ],
    opportunities: [
      'Responsable de chantier VRD (salaire : 35-48k€)',
      'Conducteur de travaux VRD (salaire : 40-55k€)',
      'Chef de secteur VRD (salaire : 42-58k€)',
      'Responsable d\'exploitation (salaire : 38-52k€)',
      'Chargé d\'affaires VRD (salaire : 45-60k€)',
      'Consultant en infrastructures',
      'Responsable technique collectivité'
    ],
    prerequisites: [
      'BTS Travaux Publics ou expérience VRD significative',
      'Capacités de management et de communication',
      'Connaissance des réglementations urbaines',
      'Rigueur et sens des responsabilités',
      'Mobilité géographique'
    ],
    duration: '15 mois',
    rhythm: '2 semaines en entreprise / 2 semaines en formation',
    price: 'Gratuit (prise en charge OPCO)',
    successRate: 89,
    insertionRate: 95,
    isAlternance: true,
    isReconversion: true,
    category: 'vrd',
    ordre: 8
  },
  {
    title: 'BTS Bâtiment en Alternance',
    slug: 'bts-batiment-alternance',
    level: 'Niveau 5 Européen (équivalent BAC+2)',
    rncp: 'RNCP35334',
    shortDescription: 'Formation BTS Bâtiment en alternance pour devenir technicien supérieur du bâtiment.',
    fullDescription: 'Le BTS Bâtiment forme des techniciens supérieurs capables d\'organiser et de contrôler les travaux de construction. Cette formation en alternance permet d\'acquérir une expérience professionnelle solide tout en obtenant un diplôme reconnu par l\'État et les professionnels du secteur.',
    objectives: [
      'Maîtriser les techniques de construction et les matériaux',
      'Lire et interpréter les plans d\'exécution',
      'Organiser et planifier les travaux de construction',
      'Contrôler la qualité des ouvrages et la conformité',
      'Gérer les aspects sécurité et environnement',
      'Coordonner les équipes et les sous-traitants',
      'Utiliser les outils numériques du BTP'
    ],
    opportunities: [
      'Technicien de bureau d\'études (salaire : 28-38k€)',
      'Conducteur de travaux junior (salaire : 32-42k€)',
      'Chargé d\'affaires junior (salaire : 30-40k€)',
      'Responsable de chantier (salaire : 35-45k€)',
      'Métreur-vérificateur (salaire : 28-38k€)',
      'Contrôleur technique (salaire : 30-42k€)',
      'Consultant en bâtiment'
    ],
    prerequisites: [
      'Baccalauréat (toutes séries)',
      'Motivation pour le secteur du BTP',
      'Capacités d\'organisation et de rigueur',
      'Esprit d\'équipe et de communication',
      'Aptitudes techniques et scientifiques'
    ],
    duration: '24 mois',
    rhythm: '3 semaines en entreprise / 1 semaine en formation',
    price: 'Gratuit (prise en charge OPCO)',
    successRate: 92,
    insertionRate: 96,
    isAlternance: true,
    isReconversion: false,
    category: 'alternance',
    ordre: 9
  }
];

async function createFormationCategories() {
  console.log('📂 Création des catégories de formations...');
  
  let created = 0;
  
  for (const category of formationCategories) {
    try {
      const response = await api.post('/api/formation-categories', { data: category });
      console.log(`✅ Catégorie créée: ${category.name}`);
      created++;
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.error?.message?.includes('already exists')) {
        console.log(`ℹ️ Catégorie existe déjà: ${category.name}`);
      } else {
        console.error(`❌ Erreur création ${category.name}:`, error.message);
      }
    }
  }
  
  console.log(`📊 ${created} nouvelles catégories créées\n`);
  return created;
}

async function importFormationsCritiques() {
  console.log('🎓 Import des formations critiques...');
  
  // D'abord récupérer les catégories pour les relations
  let categories = {};
  try {
    const response = await api.get('/api/formation-categories');
    response.data.data.forEach(cat => {
      categories[cat.attributes.slug] = cat.id;
    });
    console.log(`📂 ${Object.keys(categories).length} catégories trouvées`);
  } catch (error) {
    console.error('❌ Erreur récupération catégories:', error.message);
    return 0;
  }
  
  let imported = 0;
  
  for (const formation of formationsCritiques) {
    try {
      // Préparer les données avec la relation catégorie
      const formationData = {
        ...formation,
        category: categories[formation.category] || null
      };
      
      // Supprimer le champ category string
      delete formationData.category;
      
      // Ajouter la relation
      if (categories[formation.category]) {
        formationData.category = categories[formation.category];
      }
      
      const response = await api.post('/api/formations', { data: formationData });
      console.log(`✅ Formation importée: ${formation.title}`);
      imported++;
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.error?.message?.includes('already exists')) {
        console.log(`ℹ️ Formation existe déjà: ${formation.title}`);
      } else {
        console.error(`❌ Erreur import ${formation.title}:`, error.response?.data || error.message);
      }
    }
  }
  
  console.log(`📊 ${imported}/${formationsCritiques.length} formations importées\n`);
  return imported;
}

async function main() {
  console.log('🚀 IMPORT DES FORMATIONS CRITIQUES - PHASE 4B\n');
  
  if (!STRAPI_TOKEN) {
    console.error('❌ STRAPI_TOKEN non défini');
    process.exit(1);
  }
  
  try {
    // Vérifier que Strapi est accessible
    await api.get('/api/formations');
    console.log('✅ Strapi accessible\n');
    
    const categoriesCreated = await createFormationCategories();
    const formationsImported = await importFormationsCritiques();
    
    console.log('📊 RÉSULTATS D\'IMPORT:');
    console.log(`✅ Catégories: ${categoriesCreated} créées`);
    console.log(`✅ Formations: ${formationsImported} importées`);
    
    console.log('\n🎯 Phase 4B - Formations terminée !');
    console.log('📋 Prochaine étape: Import partenaires et témoignages');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    if (error.response?.status === 500) {
      console.error('💡 Vérifiez que Strapi est démarré et accessible');
    }
    process.exit(1);
  }
}

main();