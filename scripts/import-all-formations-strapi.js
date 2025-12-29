/**
 * Script d'import automatique de TOUTES les formations dans Strapi
 * Adapté au schéma Strapi existant
 * Exécuter avec: node scripts/import-all-formations-strapi.js
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337'
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN

// Toutes les formations à importer (adaptées au schéma Strapi)
const formations = [
  // ========== FORMATIONS ALTERNANCE ==========
  {
    title: "Chargé(e) d'Affaires du Bâtiment",
    slug: "charge-affaires-batiment",
    level: "Niveau 5 Européen (équivalent BAC+2)",
    rncp: "RNCP35503",
    shortDesc: "Formation conçue, validée et dispensée par des professionnels du BTP pour développer des compétences opérationnelles solides.",
    fullDesc: "Cette formation vous prépare à devenir un professionnel capable de gérer des affaires dans le secteur du bâtiment. Vous développerez des compétences en gestion commerciale, technique et relationnelle pour piloter des projets de construction de A à Z.",
    metierDesc: "Le chargé d'affaires du bâtiment est l'interface entre l'entreprise et ses clients. Il gère le développement commercial, le suivi des projets et la relation client.",
    duree: "1 an en alternance",
    volumeHoraire: "595 heures en centre",
    repartition: "595h centre + 910h entreprise",
    rythme: "Alternance 1 semaine école / 3 semaines entreprise",
    modalite: "Présentiel",
    typeContrat: "Contrat d'apprentissage ou de professionnalisation",
    effectif: "15-20 personnes",
    cout: "Prise en charge par l'OPCO",
    financement: "100% pris en charge en alternance",
    certificateur: "CMA Formation",
    tauxReussite: "92%",
    tauxInsertion: "95%",
    publicCible: "Jeunes de 18 à 29 ans, demandeurs d'emploi",
    objectifs: [
      "Maîtriser la gestion commerciale et technique des affaires",
      "Développer et fidéliser un portefeuille clients",
      "Piloter les projets de construction",
      "Négocier et conclure des contrats",
      "Assurer le suivi financier des affaires"
    ],
    debouches: [
      "Chargé d'affaires BTP",
      "Technico-commercial BTP",
      "Responsable développement commercial",
      "Ingénieur commercial construction"
    ],
    prerequis: [
      "Bac ou équivalent",
      "Motivation pour le secteur BTP",
      "Sens commercial et relationnel"
    ],
    programme: [
      "Gestion commerciale et développement",
      "Techniques du bâtiment",
      "Gestion de projet",
      "Communication professionnelle",
      "Droit de la construction"
    ],
    evaluation: [
      "Contrôle continu",
      "Études de cas",
      "Soutenance devant jury"
    ],
    poursuites: [
      "Responsable travaux Bâtiment",
      "Chef de projets BTP"
    ],
    ordre: 1,
    isActive: true,
    seoTitle: "Formation Chargé d'Affaires Bâtiment en Alternance | CMA",
    seoDescription: "Devenez Chargé d'Affaires du Bâtiment avec notre formation en alternance. Niveau Bac+2, RNCP35503. 92% de réussite.",
    seoKeywords: ["chargé affaires bâtiment", "formation BTP alternance", "RNCP35503"]
  },
  {
    title: "Conducteur de Travaux – Bâtiment & Génie Civil",
    slug: "conducteur-travaux-batiment",
    level: "Niveau 5 (équivalent Bac+2)",
    rncp: "RNCP40217",
    shortDesc: "Formation professionnalisante pour devenir conducteur de travaux capable de préparer, gérer et coordonner un chantier de construction dans sa globalité.",
    fullDesc: "Devenez le chef d'orchestre des chantiers de construction. Cette formation vous apprend à organiser, planifier et superviser l'ensemble des opérations d'un chantier, de la préparation à la livraison.",
    metierDesc: "Le conducteur de travaux est responsable de l'exécution des travaux sur un ou plusieurs chantiers. Il coordonne les équipes, gère les plannings et assure la qualité des ouvrages.",
    duree: "1 an en alternance",
    volumeHoraire: "595 heures en centre",
    repartition: "595h centre + entreprise",
    rythme: "Alternance 1 semaine école / 3 semaines entreprise",
    modalite: "Présentiel",
    typeContrat: "Contrat d'apprentissage ou de professionnalisation",
    effectif: "15-20 personnes",
    cout: "Prise en charge par l'OPCO",
    financement: "100% pris en charge en alternance",
    certificateur: "CMA Formation",
    tauxReussite: "90%",
    tauxInsertion: "93%",
    publicCible: "Jeunes de 18 à 29 ans, professionnels en évolution",
    objectifs: [
      "Préparer et organiser un chantier",
      "Gérer les équipes et les sous-traitants",
      "Assurer le suivi technique et financier",
      "Garantir la sécurité sur le chantier",
      "Respecter les délais et la qualité"
    ],
    debouches: [
      "Conducteur de travaux",
      "Chef de chantier",
      "Responsable travaux",
      "Directeur de travaux"
    ],
    prerequis: [
      "Bac technique ou expérience BTP",
      "Capacité de management",
      "Rigueur et organisation"
    ],
    programme: [
      "Préparation de chantier",
      "Gestion de production",
      "Management d'équipe",
      "Sécurité et prévention",
      "Gestion financière"
    ],
    evaluation: [
      "Contrôle continu",
      "Projet de chantier",
      "Soutenance finale"
    ],
    poursuites: [
      "Responsable travaux",
      "Chef de projets BTP"
    ],
    ordre: 2,
    isActive: true,
    seoTitle: "Formation Conducteur de Travaux Bâtiment en Alternance | CMA",
    seoDescription: "Devenez Conducteur de Travaux avec notre formation en alternance. Niveau Bac+2, RNCP40217. 90% de réussite.",
    seoKeywords: ["conducteur travaux", "formation BTP", "alternance bâtiment"]
  },

  {
    title: "Chef de Chantier Voirie et Réseaux Divers",
    slug: "chef-chantier-vrd",
    level: "Niveau 5 (équivalent BAC+2)",
    rncp: "RNCP41368",
    shortDesc: "Formation professionnalisante pour devenir chef de chantier VRD capable de préparer, diriger et clôturer l'exécution de chantiers de voirie et réseaux divers.",
    fullDesc: "Spécialisez-vous dans les travaux publics et les infrastructures. Cette formation vous prépare à diriger des chantiers de voirie, d'assainissement et de réseaux divers avec expertise.",
    metierDesc: "Le chef de chantier VRD dirige les travaux de voirie et réseaux divers. Il encadre les équipes, organise le chantier et veille au respect des normes techniques.",
    duree: "1 an en alternance",
    volumeHoraire: "560 heures en centre",
    repartition: "560h centre + entreprise",
    rythme: "Alternance 1 semaine école / 3 semaines entreprise",
    modalite: "Présentiel",
    typeContrat: "Contrat d'apprentissage ou de professionnalisation",
    effectif: "15-20 personnes",
    cout: "Prise en charge par l'OPCO",
    financement: "100% pris en charge en alternance",
    certificateur: "CMA Formation",
    tauxReussite: "88%",
    tauxInsertion: "91%",
    publicCible: "Jeunes de 18 à 29 ans, professionnels TP",
    objectifs: [
      "Préparer l'exécution des travaux VRD",
      "Diriger les travaux de voirie",
      "Gérer les réseaux divers (eau, électricité, gaz)",
      "Manager les équipes terrain",
      "Assurer la qualité et la sécurité"
    ],
    debouches: [
      "Chef de chantier VRD",
      "Conducteur de travaux VRD",
      "Responsable travaux publics",
      "Chef d'équipe TP"
    ],
    prerequis: [
      "Bac ou expérience en travaux publics",
      "Intérêt pour les infrastructures",
      "Capacité de leadership"
    ],
    programme: [
      "Techniques VRD",
      "Topographie",
      "Gestion de chantier TP",
      "Réseaux et canalisations",
      "Sécurité chantier"
    ],
    evaluation: [
      "Contrôle continu",
      "Projet VRD",
      "Soutenance finale"
    ],
    poursuites: [
      "Conducteur de travaux VRD",
      "Responsable d'exploitation"
    ],
    ordre: 3,
    isActive: true,
    seoTitle: "Formation Chef de Chantier VRD en Alternance | CMA",
    seoDescription: "Devenez Chef de Chantier VRD avec notre formation en alternance. Niveau Bac+2, RNCP41368. Travaux publics.",
    seoKeywords: ["chef chantier VRD", "formation travaux publics", "alternance VRD"]
  },
  {
    title: "Double Parcours Responsable Travaux Bâtiment & Coordinateur BIM",
    slug: "responsable-travaux-bim",
    level: "Niveau 6 (équivalent Bac+3)",
    rncp: "RNCP39408",
    shortDesc: "Formation professionnalisante visant à former des professionnels du BTP capables de conduire des chantiers de construction tout en intégrant les outils numériques collaboratifs du BIM.",
    fullDesc: "Une double compétence unique : maîtrisez la conduite de travaux traditionnelle ET les outils numériques BIM. Cette formation vous positionne comme un expert recherché capable de piloter des projets innovants.",
    metierDesc: "Le responsable travaux BIM combine expertise terrain et maîtrise des outils numériques. Il pilote les chantiers tout en coordonnant la maquette numérique du projet.",
    duree: "1 an en alternance",
    volumeHoraire: "700 heures en centre",
    repartition: "700h centre + entreprise",
    rythme: "Alternance 1 semaine école / 3 semaines entreprise",
    modalite: "Présentiel",
    typeContrat: "Contrat d'apprentissage ou de professionnalisation",
    effectif: "12-15 personnes",
    cout: "Prise en charge par l'OPCO",
    financement: "100% pris en charge en alternance",
    certificateur: "CMA Formation",
    tauxReussite: "94%",
    tauxInsertion: "97%",
    publicCible: "Bac+2 technique, professionnels BTP",
    objectifs: [
      "Maîtriser la conduite de travaux bâtiment",
      "Coordonner les projets en BIM",
      "Intégrer les outils numériques collaboratifs",
      "Gérer la maquette numérique",
      "Optimiser les processus de construction"
    ],
    debouches: [
      "Responsable travaux",
      "Coordinateur BIM",
      "Chef de projet construction",
      "BIM Manager junior"
    ],
    prerequis: [
      "Bac+2 technique ou expérience significative",
      "Intérêt pour le numérique",
      "Capacité d'adaptation"
    ],
    programme: [
      "Conduite de travaux avancée",
      "Méthodologie BIM",
      "Logiciels BIM (Revit, Navisworks)",
      "Coordination de projet",
      "Management digital"
    ],
    evaluation: [
      "Contrôle continu",
      "Projet BIM",
      "Soutenance finale"
    ],
    poursuites: [
      "Chef de projets BTP",
      "BIM Manager"
    ],
    ordre: 4,
    isActive: true,
    seoTitle: "Formation Responsable Travaux BIM en Alternance | CMA",
    seoDescription: "Double parcours Responsable Travaux et Coordinateur BIM. Niveau Bac+3, RNCP39408. Formation innovante.",
    seoKeywords: ["responsable travaux BIM", "formation BIM", "coordinateur BIM alternance"]
  },
  {
    title: "Chef de Projets BTP",
    slug: "chef-projets-btp",
    level: "Niveau 7 (équivalent Bac+5)",
    rncp: "En cours d'enregistrement",
    shortDesc: "Formation professionnalisante préparant des experts capables de gérer des projets de construction complexes et innovants, en intégrant les enjeux contemporains du BTP.",
    fullDesc: "Accédez aux plus hautes responsabilités du BTP. Cette formation de niveau Master vous prépare à diriger des projets d'envergure, manager des équipes pluridisciplinaires et intégrer les enjeux RSE et développement durable.",
    metierDesc: "Le chef de projets BTP pilote des opérations de construction complexes. Il coordonne l'ensemble des intervenants et garantit la réussite technique, financière et humaine des projets.",
    duree: "2 ans en alternance",
    volumeHoraire: "1393 heures en centre",
    repartition: "1393h centre + entreprise",
    rythme: "Alternance 1 semaine école / 3 semaines entreprise",
    modalite: "Présentiel",
    typeContrat: "Contrat d'apprentissage ou de professionnalisation",
    effectif: "12-15 personnes",
    cout: "Prise en charge par l'OPCO",
    financement: "100% pris en charge en alternance",
    certificateur: "CMA Formation",
    tauxReussite: "96%",
    tauxInsertion: "98%",
    publicCible: "Bac+3 ou expérience significative BTP",
    objectifs: [
      "Piloter des projets de construction complexes",
      "Manager des équipes pluridisciplinaires",
      "Intégrer les enjeux RSE et développement durable",
      "Maîtriser les aspects juridiques et financiers",
      "Développer une vision stratégique"
    ],
    debouches: [
      "Chef de projets BTP",
      "Directeur de travaux",
      "Responsable d'agence",
      "Directeur technique"
    ],
    prerequis: [
      "Bac+3 ou expérience significative en BTP",
      "Capacités managériales",
      "Vision stratégique"
    ],
    programme: [
      "Management de projet avancé",
      "Stratégie d'entreprise BTP",
      "Finance et gestion",
      "RSE et développement durable",
      "Leadership et management"
    ],
    evaluation: [
      "Contrôle continu",
      "Mémoire professionnel",
      "Soutenance devant jury"
    ],
    poursuites: [
      "Directeur d'agence",
      "Directeur général"
    ],
    ordre: 5,
    isActive: true,
    seoTitle: "Formation Chef de Projets BTP Bac+5 en Alternance | CMA",
    seoDescription: "Devenez Chef de Projets BTP avec notre formation niveau Master. 2 ans en alternance. 96% de réussite.",
    seoKeywords: ["chef projets BTP", "formation Bac+5 BTP", "master BTP alternance"]
  },

  {
    title: "Conducteur de Travaux en VRD - Cursus 1 an",
    slug: "conducteur-travaux-vrd-1an",
    level: "BAC+3 - Niveau 6",
    rncp: "RNCP41369",
    shortDesc: "Formation intensive pour former des professionnels capables de gérer l'ensemble des étapes d'un chantier VRD, de la préparation à la réception des ouvrages.",
    fullDesc: "Un cursus intensif d'un an pour devenir conducteur de travaux VRD. Vous apprendrez à gérer des chantiers d'infrastructures de A à Z : voirie, réseaux, assainissement.",
    metierDesc: "Le conducteur de travaux VRD supervise les chantiers de voirie et réseaux. Il planifie, coordonne et contrôle l'exécution des travaux d'infrastructure.",
    duree: "1 an en alternance",
    volumeHoraire: "560 heures en centre",
    repartition: "560h centre + entreprise",
    rythme: "Alternance 1 semaine école / 3 semaines entreprise",
    modalite: "Présentiel",
    typeContrat: "Contrat d'apprentissage ou de professionnalisation",
    effectif: "15-20 personnes",
    cout: "Prise en charge par l'OPCO",
    financement: "100% pris en charge en alternance",
    certificateur: "CMA Formation",
    tauxReussite: "89%",
    tauxInsertion: "92%",
    publicCible: "Bac+2 technique ou expérience TP",
    objectifs: [
      "Préparer et organiser un chantier VRD",
      "Gérer les ressources humaines et matérielles",
      "Assurer la qualité et la sécurité",
      "Suivre le budget et les délais",
      "Coordonner les intervenants"
    ],
    debouches: [
      "Conducteur de travaux VRD",
      "Chef de chantier TP",
      "Responsable d'exploitation",
      "Directeur de travaux TP"
    ],
    prerequis: [
      "Bac+2 technique ou expérience TP",
      "Connaissance du terrain",
      "Sens de l'organisation"
    ],
    programme: [
      "Techniques VRD avancées",
      "Gestion de chantier",
      "Topographie et implantation",
      "Réseaux humides et secs",
      "Management d'équipe"
    ],
    evaluation: [
      "Contrôle continu",
      "Projet de chantier VRD",
      "Soutenance finale"
    ],
    poursuites: [
      "Directeur de travaux TP",
      "Responsable d'agence"
    ],
    ordre: 6,
    isActive: true,
    seoTitle: "Formation Conducteur de Travaux VRD 1 an | CMA",
    seoDescription: "Devenez Conducteur de Travaux VRD en 1 an. Niveau Bac+3, RNCP41369. Formation intensive en alternance.",
    seoKeywords: ["conducteur travaux VRD", "formation VRD 1 an", "alternance travaux publics"]
  },
  {
    title: "Conducteur de Travaux Voirie et Réseaux Divers - Cursus 2 ans",
    slug: "conducteur-travaux-vrd-2ans",
    level: "BAC+3 - Niveau 6",
    rncp: "RNCP39469",
    shortDesc: "Formation approfondie pour maîtriser tous les aspects du métier de conducteur de travaux VRD sur 2 années complètes.",
    fullDesc: "Le cursus complet de 2 ans pour une maîtrise approfondie du métier. Plus de temps pour développer vos compétences techniques et managériales dans les travaux publics.",
    metierDesc: "Le conducteur de travaux VRD senior gère des chantiers d'envergure. Il possède une expertise technique approfondie et des compétences managériales avancées.",
    duree: "2 ans en alternance",
    volumeHoraire: "1400 heures en centre",
    repartition: "1400h centre + 2100h entreprise",
    rythme: "Alternance 1 semaine école / 3 semaines entreprise",
    modalite: "Présentiel",
    typeContrat: "Contrat d'apprentissage ou de professionnalisation",
    effectif: "15-20 personnes",
    cout: "Prise en charge par l'OPCO",
    financement: "100% pris en charge en alternance",
    certificateur: "CMA Formation",
    tauxReussite: "91%",
    tauxInsertion: "94%",
    publicCible: "Bac technique, motivation TP",
    objectifs: [
      "Maîtriser la gestion complète de chantiers VRD",
      "Développer des compétences managériales avancées",
      "Gérer les aspects techniques et financiers",
      "Piloter des projets d'envergure",
      "Optimiser les processus de construction"
    ],
    debouches: [
      "Conducteur de travaux VRD senior",
      "Directeur de travaux TP",
      "Responsable d'agence TP",
      "Chef de secteur"
    ],
    prerequis: [
      "Bac technique minimum",
      "Motivation pour les travaux publics",
      "Engagement sur 2 ans"
    ],
    programme: [
      "Techniques VRD complètes",
      "Gestion de projet TP",
      "Management avancé",
      "Études de prix",
      "Développement durable TP"
    ],
    evaluation: [
      "Contrôle continu",
      "Projets annuels",
      "Mémoire et soutenance"
    ],
    poursuites: [
      "Directeur de travaux",
      "Responsable d'exploitation"
    ],
    ordre: 7,
    isActive: true,
    seoTitle: "Formation Conducteur de Travaux VRD 2 ans | CMA",
    seoDescription: "Formation complète Conducteur de Travaux VRD en 2 ans. Niveau Bac+3, RNCP39469. Expertise approfondie.",
    seoKeywords: ["conducteur travaux VRD 2 ans", "formation TP complète", "alternance VRD"]
  },

  // ========== FORMATIONS RECONVERSION ==========
  {
    title: "Chargé d'affaires du bâtiment - Professionnels en reconversion",
    slug: "charge-affaires-reconversion",
    level: "Niveau 5 (équivalent Bac+2)",
    rncp: "RNCP35503",
    shortDesc: "Une formation pensée pour les professionnels en reconversion souhaitant intégrer le secteur du BTP.",
    fullDesc: "Vous souhaitez changer de carrière et rejoindre le secteur dynamique du BTP ? Cette formation intensive de 7 mois vous donne toutes les clés pour devenir chargé d'affaires, même sans expérience préalable dans le bâtiment.",
    metierDesc: "Le chargé d'affaires en reconversion apporte un regard neuf sur le secteur. Son expérience professionnelle antérieure est un atout pour la relation client et la gestion de projet.",
    duree: "7 mois",
    volumeHoraire: "595 heures",
    repartition: "595h en centre de formation",
    rythme: "Formation continue intensive",
    modalite: "Présentiel",
    typeContrat: "Formation continue",
    effectif: "12-15 personnes",
    cout: "Sur devis",
    financement: "CPF, Pôle Emploi, Transition Pro",
    certificateur: "CMA Formation",
    tauxReussite: "87%",
    tauxInsertion: "89%",
    publicCible: "Professionnels en reconversion, demandeurs d'emploi",
    objectifs: [
      "Acquérir les fondamentaux du BTP",
      "Développer des compétences commerciales",
      "Maîtriser la gestion de projets",
      "Comprendre les aspects techniques du bâtiment",
      "Construire un réseau professionnel"
    ],
    debouches: [
      "Chargé d'affaires BTP",
      "Commercial BTP",
      "Responsable développement",
      "Conseiller technique"
    ],
    prerequis: [
      "Bac ou équivalent",
      "Projet de reconversion validé",
      "Motivation et dynamisme"
    ],
    programme: [
      "Fondamentaux du BTP",
      "Techniques commerciales",
      "Gestion de projet",
      "Réglementation construction",
      "Stage en entreprise"
    ],
    evaluation: [
      "Contrôle continu",
      "Études de cas",
      "Soutenance finale"
    ],
    poursuites: [
      "Conducteur de travaux",
      "Responsable commercial BTP"
    ],
    ordre: 101,
    isActive: true,
    seoTitle: "Formation Chargé d'Affaires BTP Reconversion | CMA",
    seoDescription: "Reconversion professionnelle vers le BTP. Formation Chargé d'Affaires en 7 mois. Financement CPF possible.",
    seoKeywords: ["reconversion BTP", "chargé affaires reconversion", "formation CPF bâtiment"]
  },
  {
    title: "Conducteur de Travaux Bâtiment et Génie Civil - Professionnels en reconversion",
    slug: "conducteur-travaux-reconversion",
    level: "Bac+2 - Niveau 5",
    rncp: "RNCP40217",
    shortDesc: "Une formation pensée pour les professionnels en reconversion vers le métier de conducteur de travaux.",
    fullDesc: "Reconvertissez-vous vers un métier d'avenir ! En 7 mois intensifs, acquérez toutes les compétences pour piloter des chantiers de construction, même si vous venez d'un autre secteur.",
    metierDesc: "Le conducteur de travaux en reconversion apporte ses compétences transversales au service du chantier. Son expérience professionnelle enrichit sa vision du management.",
    duree: "7 mois",
    volumeHoraire: "595 heures",
    repartition: "595h en centre de formation",
    rythme: "Formation continue intensive",
    modalite: "Présentiel",
    typeContrat: "Formation continue",
    effectif: "12-15 personnes",
    cout: "Sur devis",
    financement: "CPF, Pôle Emploi, Transition Pro",
    certificateur: "CMA Formation",
    tauxReussite: "85%",
    tauxInsertion: "88%",
    publicCible: "Professionnels en reconversion, demandeurs d'emploi",
    objectifs: [
      "Maîtriser la conduite de chantier",
      "Gérer les équipes terrain",
      "Assurer le suivi technique et administratif",
      "Comprendre les normes et réglementations",
      "Développer le leadership"
    ],
    debouches: [
      "Conducteur de travaux",
      "Chef de chantier",
      "Assistant travaux",
      "Coordinateur de chantier"
    ],
    prerequis: [
      "Bac ou équivalent",
      "Expérience professionnelle (tout secteur)",
      "Capacité d'adaptation"
    ],
    programme: [
      "Techniques de construction",
      "Gestion de chantier",
      "Management d'équipe",
      "Sécurité et prévention",
      "Stage en entreprise"
    ],
    evaluation: [
      "Contrôle continu",
      "Projet de chantier",
      "Soutenance finale"
    ],
    poursuites: [
      "Responsable travaux",
      "Chef de projets"
    ],
    ordre: 102,
    isActive: true,
    seoTitle: "Formation Conducteur de Travaux Reconversion | CMA",
    seoDescription: "Reconversion vers Conducteur de Travaux en 7 mois. Formation intensive, financement CPF. Changez de carrière !",
    seoKeywords: ["reconversion conducteur travaux", "formation BTP reconversion", "CPF bâtiment"]
  }
]

// Fonction pour créer une formation
async function createFormation(formation) {
  const headers = {
    'Content-Type': 'application/json'
  }
  
  if (STRAPI_API_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`
  }

  try {
    // Vérifier si la formation existe déjà
    const checkResponse = await fetch(
      `${STRAPI_URL}/api/formations?filters[slug][$eq]=${formation.slug}`,
      { headers }
    )
    const checkData = await checkResponse.json()
    
    if (checkData.data && checkData.data.length > 0) {
      console.log(`⏭️  "${formation.title}" existe déjà`)
      
      // Mettre à jour la formation existante
      const existingId = checkData.data[0].id
      const updateResponse = await fetch(
        `${STRAPI_URL}/api/formations/${existingId}`,
        {
          method: 'PUT',
          headers,
          body: JSON.stringify({ data: formation })
        }
      )
      
      if (updateResponse.ok) {
        console.log(`   ✅ Mise à jour réussie`)
        return { success: true, action: 'updated' }
      } else {
        const error = await updateResponse.text()
        console.log(`   ❌ Erreur: ${error.substring(0, 100)}`)
        return { success: false, error }
      }
    }

    // Créer la nouvelle formation
    const response = await fetch(`${STRAPI_URL}/api/formations`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ data: formation })
    })

    if (response.ok) {
      console.log(`✅ Créée: "${formation.title}"`)
      return { success: true, action: 'created' }
    } else {
      const error = await response.text()
      console.log(`❌ Erreur "${formation.title}": ${error.substring(0, 100)}`)
      return { success: false, error }
    }
  } catch (error) {
    console.log(`❌ Erreur réseau: ${error.message}`)
    return { success: false, error: error.message }
  }
}

// Fonction principale
async function importAllFormations() {
  console.log('═══════════════════════════════════════════════════════════')
  console.log('   IMPORT AUTOMATIQUE DES FORMATIONS DANS STRAPI')
  console.log('═══════════════════════════════════════════════════════════')
  console.log(`\n📡 URL Strapi: ${STRAPI_URL}`)
  console.log(`🔑 Token: ${STRAPI_API_TOKEN ? 'Configuré' : 'Non configuré'}\n`)

  // Vérifier la connexion à Strapi
  try {
    const healthCheck = await fetch(`${STRAPI_URL}/api/formations`)
    if (!healthCheck.ok) {
      console.log('❌ Impossible de se connecter à Strapi')
      console.log('   Vérifiez que Strapi est démarré sur ' + STRAPI_URL)
      console.log('   Vérifiez les permissions publiques sur "formation"')
      return
    }
  } catch (error) {
    console.log('❌ Strapi non accessible: ' + error.message)
    console.log('   Démarrez Strapi avec: cd cms-cma && npm run develop')
    return
  }

  console.log('✅ Connexion à Strapi OK\n')
  console.log('─────────────────────────────────────────────────────────────')

  let created = 0, updated = 0, errors = 0

  for (const formation of formations) {
    const result = await createFormation(formation)
    if (result.success) {
      if (result.action === 'created') created++
      else if (result.action === 'updated') updated++
    } else {
      errors++
    }
  }

  console.log('\n─────────────────────────────────────────────────────────────')
  console.log('📊 RÉSUMÉ')
  console.log('─────────────────────────────────────────────────────────────')
  console.log(`   ✅ Créées:       ${created}`)
  console.log(`   🔄 Mises à jour: ${updated}`)
  console.log(`   ❌ Erreurs:      ${errors}`)
  console.log(`   📦 Total:        ${formations.length}`)
  console.log('─────────────────────────────────────────────────────────────')

  if (errors === 0) {
    console.log('\n🎉 Import terminé avec succès!')
    console.log('\n📋 URLs disponibles:')
    formations.forEach(f => console.log(`   → /formations/${f.slug}`))
  } else {
    console.log('\n⚠️  Import terminé avec des erreurs.')
    console.log('   Vérifiez les permissions Strapi (Settings > Roles > Public)')
  }
}

importAllFormations()
