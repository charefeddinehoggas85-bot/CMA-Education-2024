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

// 9 formations critiques manquantes (champs corrigés selon schema)
const formationsCritiques = [
  {
    title: 'Chargé(e) d\'Affaires du Bâtiment',
    slug: 'charge-affaires-batiment-alternance',
    level: 'Niveau 5 Européen (équivalent BAC+2)',
    rncp: 'RNCP35503',
    shortDesc: 'Formation conçue, validée et dispensée par des professionnels du BTP pour développer des compétences opérationnelles solides.',
    fullDesc: 'Cette formation permet aux futurs chargés d\'affaires de développer des compétences opérationnelles solides, mobilisables dès leur entrée en entreprise. En combinant maîtrise technique, gestion financière, coordination de projets et relation client, elle prépare des professionnels complets capables de piloter des chantiers tous corps d\'état.',
    objectifs: [
      'Maîtriser l\'analyse technique et financière des projets de construction',
      'Développer des compétences commerciales avancées (prospection, négociation, suivi client)',
      'Piloter efficacement les chantiers : planification, coordination, gestion des aléas',
      'Gérer la rentabilité : études de prix, optimisation des coûts, suivi budgétaire',
      'Manager les équipes et coordonner les différents corps de métier',
      'Maîtriser les outils numériques du BTP (logiciels de chiffrage, planning, BIM)',
      'Assurer la qualité, la sécurité et le respect des normes environnementales'
    ],
    debouches: [
      'Chargé(e) d\'affaires tous corps d\'état (salaire : 35-50k€)',
      'Conducteur(trice) de travaux (salaire : 32-45k€)',
      'Responsable de production (salaire : 38-52k€)',
      'Chef de projet BTP (salaire : 40-55k€)',
      'Créateur d\'entreprise BTP',
      'Consultant en maîtrise d\'œuvre',
      'Responsable développement commercial BTP'
    ],
    prerequis: [
      'Baccalauréat (toutes séries) ou équivalent',
      'Motivation confirmée pour le secteur du BTP',
      'Capacités d\'organisation et de communication',
      'Esprit d\'équipe et leadership',
      'Aisance avec les outils numériques'
    ],
    duree: '24 mois',
    rythme: '3 semaines en entreprise / 1 semaine en formation',
    cout: 'Gratuit (prise en charge OPCO)',
    tauxReussite: '92%',
    tauxInsertion: '96%',
    category: 'alternance',
    ordre: 1,
    isActive: true
  },
  {
    title: 'Conducteur(trice) de Travaux Bâtiment & Génie Civil',
    slug: 'conducteur-travaux-batiment-alternance',
    level: 'Niveau 6 Européen (équivalent BAC+3)',
    rncp: 'RNCP34079',
    shortDesc: 'Formation d\'excellence pour devenir conducteur de travaux, alliant expertise technique, management d\'équipes et gestion de projets complexes.',
    fullDesc: 'Cette formation prépare les futurs conducteurs de travaux à gérer des projets de construction de A à Z. De la préparation technique à la réception des ouvrages, en passant par le management d\'équipes et la coordination des entreprises, cette formation développe toutes les compétences nécessaires pour exceller dans ce métier stratégique du BTP.',
    objectifs: [
      'Maîtriser la préparation et l\'organisation des chantiers',
      'Piloter la réalisation des ouvrages (planning, qualité, sécurité, coûts)',
      'Manager et coordonner les équipes de production',
      'Gérer les relations avec les clients, architectes et bureaux d\'études',
      'Optimiser les méthodes de construction et l\'utilisation des ressources',
      'Assurer le respect des normes de sécurité et environnementales',
      'Maîtriser les outils numériques de gestion de chantier et BIM'
    ],
    debouches: [
      'Conducteur(trice) de travaux (salaire : 38-55k€)',
      'Chef de chantier (salaire : 35-48k€)',
      'Responsable de production (salaire : 42-60k€)',
      'Directeur de travaux (salaire : 50-70k€)',
      'Responsable d\'agence BTP (salaire : 55-80k€)',
      'Consultant en maîtrise d\'œuvre',
      'Créateur d\'entreprise BTP'
    ],
    prerequis: [
      'BTS Bâtiment, Travaux Publics ou équivalent (BAC+2)',
      'Expérience professionnelle dans le BTP souhaitée',
      'Capacités de management et de communication',
      'Rigueur, organisation et sens des responsabilités',
      'Mobilité géographique'
    ],
    duree: '12 mois',
    rythme: '2 semaines en entreprise / 2 semaines en formation',
    cout: 'Gratuit (prise en charge OPCO)',
    tauxReussite: '89%',
    tauxInsertion: '98%',
    category: 'alternance',
    ordre: 2,
    isActive: true
  },
  {
    title: 'Chef de Chantier VRD',
    slug: 'chef-chantier-vrd-alternance',
    level: 'Niveau 5 Européen (équivalent BAC+2)',
    rncp: 'RNCP34624',
    shortDesc: 'Spécialisation VRD (Voirie et Réseaux Divers) pour devenir chef de chantier expert en infrastructures urbaines.',
    fullDesc: 'Cette formation spécialisée prépare aux métiers du VRD (Voirie et Réseaux Divers). Elle couvre l\'ensemble des compétences nécessaires pour gérer des chantiers d\'infrastructures : réseaux d\'eau, d\'assainissement, électriques, télécoms, voirie, espaces verts. Une formation technique pointue dans un secteur en forte demande.',
    objectifs: [
      'Maîtriser les techniques de construction VRD (terrassement, réseaux, voirie)',
      'Lire et interpréter les plans de réseaux et d\'infrastructures',
      'Organiser et planifier les chantiers VRD',
      'Coordonner les différents corps de métier (terrassiers, canalisateurs, etc.)',
      'Assurer la sécurité sur les chantiers d\'infrastructures',
      'Contrôler la qualité des ouvrages et la conformité aux normes',
      'Gérer les relations avec les concessionnaires et services publics'
    ],
    debouches: [
      'Chef de chantier VRD (salaire : 32-45k€)',
      'Conducteur de travaux VRD (salaire : 38-52k€)',
      'Responsable d\'exploitation réseaux (salaire : 35-48k€)',
      'Chargé d\'affaires VRD (salaire : 40-55k€)',
      'Responsable technique collectivités (salaire : 38-50k€)',
      'Consultant en infrastructures',
      'Créateur d\'entreprise VRD'
    ],
    prerequis: [
      'Baccalauréat STI2D, Pro ou général',
      'Intérêt pour les infrastructures et l\'aménagement urbain',
      'Capacités d\'organisation et de coordination',
      'Rigueur et sens des responsabilités',
      'Permis B obligatoire'
    ],
    duree: '24 mois',
    rythme: '3 semaines en entreprise / 1 semaine en formation',
    cout: 'Gratuit (prise en charge OPCO)',
    tauxReussite: '88%',
    tauxInsertion: '94%',
    category: 'vrd',
    ordre: 3,
    isActive: true
  },
  {
    title: 'Double Parcours : Responsable Travaux & Coordinateur BIM',
    slug: 'double-parcours-bim-alternance',
    level: 'Niveau 6 Européen (équivalent BAC+3)',
    rncp: 'RNCP34079 + Certification BIM',
    shortDesc: 'Formation innovante combinant management de travaux et expertise BIM pour les professionnels du futur.',
    fullDesc: 'Cette formation unique combine deux expertises complémentaires : le management de travaux traditionnel et la maîtrise des technologies BIM (Building Information Modeling). Elle prépare les professionnels aux enjeux de la transformation numérique du BTP, en formant des experts capables de piloter des projets complexes avec les outils de demain.',
    objectifs: [
      'Maîtriser le management de travaux (planning, coûts, qualité, sécurité)',
      'Développer une expertise BIM complète (Revit, Navisworks, BIM 360)',
      'Coordonner les maquettes numériques et gérer les données BIM',
      'Piloter des projets en mode collaboratif BIM',
      'Optimiser les processus de construction grâce au numérique',
      'Former et accompagner les équipes à la transition BIM',
      'Assurer l\'interface entre maîtrise d\'œuvre et entreprises'
    ],
    debouches: [
      'BIM Manager (salaire : 45-65k€)',
      'Coordinateur BIM (salaire : 40-55k€)',
      'Conducteur de travaux BIM (salaire : 42-58k€)',
      'Responsable innovation BTP (salaire : 50-70k€)',
      'Consultant BIM (salaire : 55-80k€)',
      'Chef de projet digital construction',
      'Formateur BIM'
    ],
    prerequis: [
      'BTS/DUT Bâtiment ou expérience BTP significative',
      'Maîtrise des outils informatiques',
      'Capacités d\'adaptation aux nouvelles technologies',
      'Esprit d\'analyse et de synthèse',
      'Anglais technique souhaité'
    ],
    duree: '18 mois',
    rythme: '2 semaines en entreprise / 2 semaines en formation',
    cout: 'Gratuit (prise en charge OPCO)',
    tauxReussite: '94%',
    tauxInsertion: '100%',
    category: 'alternance',
    ordre: 4,
    isActive: true
  },
  {
    title: 'Chef de Projets BTP',
    slug: 'chef-projets-btp-alternance',
    level: 'Niveau 6 Européen (équivalent BAC+3)',
    rncp: 'RNCP34079',
    shortDesc: 'Formation management pour piloter des projets BTP complexes de la conception à la livraison.',
    fullDesc: 'Cette formation prépare aux fonctions de chef de projets BTP, métier stratégique qui consiste à piloter des opérations de construction complexes. De la phase conception à la livraison, le chef de projets coordonne tous les acteurs (maîtrise d\'œuvre, entreprises, clients) et garantit le respect des objectifs qualité, délais et coûts.',
    objectifs: [
      'Maîtriser la gestion de projets BTP (méthodes, outils, indicateurs)',
      'Coordonner les phases de conception et de réalisation',
      'Piloter les équipes projet et animer les réunions de chantier',
      'Gérer les risques et anticiper les aléas de construction',
      'Optimiser la rentabilité et contrôler les budgets',
      'Assurer la qualité et la conformité des ouvrages',
      'Développer les relations clients et partenaires'
    ],
    debouches: [
      'Chef de projets BTP (salaire : 42-60k€)',
      'Directeur de travaux (salaire : 50-70k€)',
      'Responsable d\'opérations immobilières (salaire : 45-65k€)',
      'Consultant en maîtrise d\'ouvrage (salaire : 48-68k€)',
      'Responsable développement (salaire : 50-75k€)',
      'Directeur d\'agence BTP (salaire : 60-90k€)',
      'Créateur d\'entreprise BTP'
    ],
    prerequis: [
      'BAC+2 BTP ou expérience professionnelle équivalente',
      'Capacités de management et de communication',
      'Rigueur, organisation et sens des responsabilités',
      'Esprit de synthèse et capacités d\'analyse',
      'Mobilité géographique'
    ],
    duree: '15 mois',
    rythme: '2 semaines en entreprise / 2 semaines en formation',
    cout: 'Gratuit (prise en charge OPCO)',
    tauxReussite: '91%',
    tauxInsertion: '97%',
    category: 'alternance',
    ordre: 5,
    isActive: true
  }
];

async function importFormationsCritiques() {
  console.log('🎓 Import des 5 formations critiques...');
  
  // Récupérer les catégories pour les relations
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
      const formationData = { ...formation };
      
      // Remplacer category string par ID
      if (categories[formation.category]) {
        formationData.category = categories[formation.category];
      } else {
        delete formationData.category;
      }
      
      const response = await api.post('/api/formations', { data: formationData });
      console.log(`✅ Formation importée: ${formation.title}`);
      imported++;
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.error?.message?.includes('already exists')) {
        console.log(`ℹ️ Formation existe déjà: ${formation.title}`);
      } else {
        console.error(`❌ Erreur import ${formation.title}:`, error.response?.data?.error?.message || error.message);
      }
    }
  }
  
  console.log(`📊 ${imported}/${formationsCritiques.length} formations importées\n`);
  return imported;
}

async function main() {
  console.log('🚀 IMPORT DES FORMATIONS CRITIQUES CORRIGÉ - PHASE 4B\n');
  
  if (!STRAPI_TOKEN) {
    console.error('❌ STRAPI_TOKEN non défini');
    process.exit(1);
  }
  
  try {
    // Vérifier que Strapi est accessible
    await api.get('/api/formations');
    console.log('✅ Strapi accessible\n');
    
    const formationsImported = await importFormationsCritiques();
    
    console.log('📊 RÉSULTATS D\'IMPORT:');
    console.log(`✅ Formations: ${formationsImported} importées`);
    
    if (formationsImported > 0) {
      console.log('\n🎯 Phase 4B - Formations terminée avec succès !');
      console.log('📋 Prochaine étape: Import partenaires et témoignages');
    } else {
      console.log('\n⚠️ Aucune formation importée - Vérifiez les erreurs ci-dessus');
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    if (error.response?.status === 500) {
      console.error('💡 Vérifiez que Strapi est démarré et accessible');
    }
    process.exit(1);
  }
}

main();