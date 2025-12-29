// Données statiques des formations - Fallback quand Strapi n'est pas disponible
// Ces données correspondent exactement à la version production sur Vercel

export const formationsAlternance = [
  {
    id: 1,
    title: "Chargé(e) d'Affaires du Bâtiment",
    slug: "charge-affaires-batiment",
    level: "Niveau 5 Européen (équivalent BAC+2)",
    rncp: "RNCP35503",
    rncpUrl: "https://www.francecompetences.fr/recherche/rncp/35503/",
    shortDescription: "Formation conçue, validée et dispensée par des professionnels du BTP pour développer des compétences opérationnelles solides.",
    duration: "1 an en alternance (100%)",
    rhythm: "595 heures en centre + 910 heures en entreprise",
    mode: "Présentiel",
    price: "Prise en charge",
    image: "/images/formations/charge-affaires.jpg",
    isAlternance: true,
    isReconversion: false,
    objectives: [
      "Maîtriser la gestion commerciale et technique des affaires",
      "Développer et fidéliser un portefeuille clients",
      "Piloter les projets de construction"
    ],
    opportunities: ["Chargé d'affaires", "Technico-commercial BTP", "Responsable développement"]
  },
  {
    id: 2,
    title: "Conducteur de Travaux – Bâtiment & Génie Civil",
    slug: "conducteur-travaux-batiment",
    level: "Niveau 5 (équivalent Bac+2)",
    rncp: "RNCP40217",
    rncpUrl: "https://www.francecompetences.fr/recherche/rncp/40217/",
    shortDescription: "Formation professionnalisante pour devenir conducteur de travaux capable de préparer, gérer et coordonner un chantier de construction dans sa globalité.",
    duration: "1 an",
    rhythm: "595 heures",
    mode: "Présentiel",
    price: "Prise en charge",
    image: "/images/formations/conducteur-travaux-reconversion.jpg",
    isAlternance: true,
    isReconversion: false,
    objectives: [
      "Préparer et organiser un chantier",
      "Gérer les équipes et les sous-traitants",
      "Assurer le suivi technique et financier"
    ],
    opportunities: ["Conducteur de travaux", "Chef de chantier", "Responsable travaux"]
  },
  {
    id: 17,
    title: "Conducteur de Travaux, Travaux Publics",
    slug: "conducteur-travaux-tp-alternance",
    level: "Niveau 5 (Equivalent Bac +2)",
    rncp: "RNCP41466",
    rncpUrl: "https://www.francecompetences.fr/recherche/rncp/41466/",
    shortDescription: "Formation professionnalisante pour devenir conducteur de travaux publics capable de préparer, coordonner et piloter des chantiers d'infrastructures (voirie, réseaux, assainissement, ouvrages d'art, etc.).",
    duration: "1 an",
    rhythm: "17 semaines à l'école, 35 semaines en entreprise",
    mode: "Présentiel",
    price: "9548€ HT (prise en charge OPCO)",
    image: "/images/formations/conducteur-travaux-reconversion.jpg",
    isAlternance: true,
    isReconversion: false,
    objectives: [
      "Planifier, organiser et suivre l'exécution de chantiers de travaux publics",
      "Gérer les budgets, contrats, achats et marges financières d'un projet",
      "Superviser les équipes sur le terrain et coordonner les différents corps de métier",
      "Veiller au respect des délais, des normes de sécurité, de qualité et des enjeux environnementaux",
      "Assurer la communication avec les riverains, les prestataires, les autorités locales et les donneurs d'ordre"
    ],
    opportunities: [
      "Conducteur(trice) de travaux TP",
      "Chef de chantier TP",
      "Coordinateur de travaux",
      "Chargé(e) d'études techniques",
      "Assistant(e) maître d'œuvre TP"
    ]
  },
  {
    id: 3,
    title: "Chef de Chantier Voirie et Réseaux Divers",
    slug: "chef-chantier-vrd",
    level: "Niveau 5 (équivalent BAC+2)",
    rncp: "RNCP41368",
    rncpUrl: "https://www.francecompetences.fr/recherche/rncp/41368/",
    shortDescription: "Formation professionnalisante pour devenir chef de chantier VRD capable de préparer, diriger et clôturer l'exécution de chantiers de voirie et réseaux divers.",
    duration: "1 an",
    rhythm: "560 heures",
    mode: "Présentiel",
    price: "Prise en charge",
    image: "/images/formations/chef-chantier-vrd.jpg",
    isAlternance: true,
    isReconversion: false,
    objectives: [
      "Préparer l'exécution des travaux VRD",
      "Diriger les travaux de voirie",
      "Gérer les réseaux divers"
    ],
    opportunities: ["Chef de chantier VRD", "Conducteur de travaux VRD", "Responsable travaux publics"]
  },
  {
    id: 4,
    title: "Double Parcours Responsable Travaux Bâtiment & Coordinateur BIM du Bâtiment",
    slug: "responsable-travaux-bim",
    level: "Niveau 6 (équivalent Bac+3)",
    rncp: "RNCP39408",
    rncpUrl: "https://www.francecompetences.fr/recherche/rncp/39408/",
    shortDescription: "Formation professionnalisante visant à former des professionnels du BTP capables de conduire des chantiers de construction tout en intégrant les outils numériques collaboratifs du BIM.",
    duration: "1 an",
    rhythm: "700 heures",
    mode: "Présentiel",
    price: "Prise en charge",
    image: "/images/formations/double-parcours-bim.jpg",
    isAlternance: true,
    isReconversion: false,
    objectives: [
      "Maîtriser la conduite de travaux bâtiment",
      "Coordonner les projets en BIM",
      "Intégrer les outils numériques collaboratifs"
    ],
    opportunities: ["Responsable travaux", "Coordinateur BIM", "Chef de projet construction"]
  },
  {
    id: 5,
    title: "Chef de Projets BTP",
    slug: "chef-projets-btp",
    level: "Niveau 7 (équivalent Bac+5)",
    rncp: "En cours d'enregistrement",
    rncpUrl: null,
    shortDescription: "Formation professionnalisante préparant des experts capables de gérer des projets de construction complexes et innovants, en intégrant les enjeux contemporains du BTP.",
    duration: "2 ans",
    rhythm: "1393 heures",
    mode: "Présentiel",
    price: "Prise en charge",
    image: "/images/formations/chef-projet-btp.jpg",
    isAlternance: true,
    isReconversion: false,
    objectives: [
      "Piloter des projets de construction complexes",
      "Manager des équipes pluridisciplinaires",
      "Intégrer les enjeux RSE et développement durable"
    ],
    opportunities: ["Chef de projets BTP", "Directeur de travaux", "Responsable d'agence"]
  },
  {
    id: 18,
    title: "Chef de Projets BTP - Cursus 1 an",
    slug: "chef-projets-btp-1an",
    level: "Niveau 7 (équivalent Bac+5)",
    rncp: "En cours d'enregistrement",
    rncpUrl: null,
    shortDescription: "Formation intensive préparant des experts capables de gérer des projets de construction complexes et innovants, en intégrant les enjeux contemporains du BTP.",
    duration: "1 an",
    rhythm: "697 heures (divisé par 2 par rapport au cursus 2 ans)",
    mode: "Présentiel",
    price: "Prise en charge",
    image: "/images/formations/chef-projet-btp.jpg",
    isAlternance: true,
    isReconversion: false,
    objectives: [
      "Piloter des projets de construction complexes",
      "Manager des équipes pluridisciplinaires",
      "Intégrer les enjeux RSE et développement durable"
    ],
    opportunities: ["Chef de projets BTP", "Directeur de travaux", "Responsable d'agence"]
  },
  {
    id: 6,
    title: "Conducteur de Travaux en VRD - Cursus 1 an",
    slug: "conducteur-travaux-vrd-1an",
    level: "BAC+3 - Niveau 6",
    rncp: "RNCP41369",
    rncpUrl: "https://www.francecompetences.fr/recherche/rncp/41369/",
    shortDescription: "Formation intensive pour former des professionnels capables de gérer l'ensemble des étapes d'un chantier VRD, de la préparation à la réception des ouvrages.",
    duration: "1 an",
    rhythm: "560 heures en centre",
    mode: "Présentiel",
    price: "Prise en charge",
    image: "/images/formations/conducteur-vrd-1an.jpg",
    isAlternance: true,
    isReconversion: false,
    objectives: [
      "Préparer et organiser un chantier VRD",
      "Gérer les ressources humaines et matérielles",
      "Assurer la qualité et la sécurité"
    ],
    opportunities: ["Conducteur de travaux VRD", "Chef de chantier", "Responsable d'exploitation"]
  },
  {
    id: 7,
    title: "Conducteur de Travaux Voirie et Réseaux Divers - Cursus 2 ans",
    slug: "conducteur-travaux-vrd-2ans",
    level: "BAC+3 - Niveau 6",
    rncp: "RNCP41369",
    rncpUrl: "https://www.francecompetences.fr/recherche/rncp/41369/",
    shortDescription: "Formation approfondie pour maîtriser tous les aspects du métier de conducteur de travaux VRD.",
    duration: "2 ans",
    rhythm: "1400 heures en centre + 2100 heures en entreprise",
    mode: "Présentiel",
    price: "Prise en charge",
    image: "/images/formations/conducteur-vrd-2ans-1.jpg",
    isAlternance: true,
    isReconversion: false,
    objectives: [
      "Maîtriser la gestion complète de chantiers VRD",
      "Développer des compétences managériales",
      "Gérer les aspects techniques et financiers"
    ],
    opportunities: ["Conducteur de travaux VRD", "Directeur de travaux", "Responsable d'agence TP"]
  }
]

export const formationsReconversion = [
  {
    id: 101,
    title: "Chargé d'affaires du bâtiment - Professionnels en reconversion",
    slug: "charge-affaires-reconversion",
    level: "Niveau 5 (équivalent Bac+2)",
    rncp: "RNCP35503",
    rncpUrl: "https://www.francecompetences.fr/recherche/rncp/35503/",
    shortDescription: "Une formation pensée pour les professionnels en reconversion.",
    duration: "7 mois",
    rhythm: "595 heures",
    mode: "Présentiel",
    price: "Prise en charge",
    image: "/images/formations/reconversion-charge-affaires.jpg",
    isAlternance: false,
    isReconversion: true,
    objectives: [
      "Acquérir les fondamentaux du BTP",
      "Développer des compétences commerciales",
      "Maîtriser la gestion de projets"
    ],
    opportunities: ["Chargé d'affaires", "Commercial BTP", "Responsable développement"]
  },
  {
    id: 102,
    title: "Conducteur de Travaux Bâtiment et Génie Civil - Professionnels en reconversion",
    slug: "conducteur-travaux-reconversion",
    level: "Bac+2 - Niveau 5",
    rncp: "RNCP40217",
    rncpUrl: "https://www.francecompetences.fr/recherche/rncp/40217/",
    shortDescription: "Une formation pensée pour les professionnels en reconversion.",
    duration: "7 mois",
    rhythm: "595 heures",
    mode: "Présentiel",
    price: "Prise en charge",
    image: "/images/formations/reconversion-conducteur-travaux.jpg",
    isAlternance: false,
    isReconversion: true,
    objectives: [
      "Maîtriser la conduite de chantier",
      "Gérer les équipes terrain",
      "Assurer le suivi technique et administratif"
    ],
    opportunities: ["Conducteur de travaux", "Chef de chantier", "Assistant travaux"]
  },
  {
    id: 103,
    title: "Conducteur de Travaux Publics - Professionnels en reconversion",
    slug: "conducteur-travaux-publics-reconversion",
    level: "BAC+2 - Niveau 5",
    rncp: "RNCP38549",
    rncpUrl: "https://www.francecompetences.fr/recherche/rncp/38549/",
    shortDescription: "Une formation pensée pour les professionnels en reconversion vers les métiers concrets et porteurs du secteur des travaux publics.",
    duration: "7 mois",
    rhythm: "595 heures (5 mois en centre + 2 mois de stage)",
    mode: "100% présentiel",
    price: "15 € HT/heure",
    image: "/images/formations/reconversion-conducteur-travaux.jpg",
    isAlternance: false,
    isReconversion: true,
    objectives: [
      "Planifier, organiser et suivre l'exécution de chantiers de travaux publics",
      "Gérer les budgets, contrats, achats et marges financières d'un projet",
      "Superviser les équipes sur le terrain et coordonner les différents corps de métier",
      "Veiller au respect des délais, des normes de sécurité, de qualité et des enjeux environnementaux",
      "Assurer la communication avec les riverains, les prestataires, les autorités locales et les donneurs d'ordre"
    ],
    opportunities: [
      "Conducteur(trice) de travaux TP",
      "Chef de chantier TP", 
      "Coordinateur de travaux",
      "Chargé(e) d'études techniques",
      "Assistant(e) maître d'œuvre TP"
    ],
    program: [
      {
        title: "Techniques des travaux publics",
        content: "terrassement, voirie, réseaux divers (VRD), fondations, ouvrages d'art, DAO/CAO, plans topographiques"
      },
      {
        title: "Gestion financière & réglementaire", 
        content: "étude de prix TP, marges, DGD, droit des marchés publics, qualité, sécurité, AIPR, environnement"
      },
      {
        title: "Préparation et conduite de chantier",
        content: "élaboration des budgets, gestion des plannings, suivi de l'exécution, gestion des imprévus"
      },
      {
        title: "Communication & coordination",
        content: "animation de réunions, communication écrite et orale, gestion des relations avec les acteurs du chantier"
      }
    ],
    prerequisites: "Aucun diplôme requis. L'envie d'apprendre et la motivation de construire un avenir professionnel concret.",
    evaluation: [
      "Contrôle continu en cours de formation",
      "Épreuve de synthèse (écrite + orale)",
      "Dossier professionnel (CRAMP)",
      "Entretien final avec jury à partir des productions du candidat",
      "4 projets tutorés concrets"
    ],
    financing: "CPF, Pôle emploi, Transition Pro, aides régionales, Plan de développement des compétences de votre entreprise",
    continuity: [
      "Responsable Travaux – Parcours Travaux Publics (CMA)",
      "Double parcours : Responsable Travaux (Bâtiment) / Coordinateur BIM du Bâtiment",
      "Passerelles vers d'autres écoles spécialisées en ingénierie ou management de projet BTP"
    ]
  }
]

export const vaeFormules = [
  {
    id: 1,
    titre: "VAE avec accompagnement",
    description: "Accompagnement complet pour valider vos acquis",
    modalites: "Présentiel, visio, téléphone et mail",
    services: [
      "Analyse de votre parcours",
      "Aide à la rédaction du dossier",
      "Préparation à l'entretien jury"
    ],
    prix: "4500 € TTC (3750 € HT)",
    heures: "Jusqu'à 20 heures d'accompagnement"
  },
  {
    id: 2,
    titre: "VAE sans accompagnement",
    description: "Suivi administratif uniquement",
    modalites: "Suivi administratif",
    services: [
      "Vérification de l'éligibilité",
      "Inscription et convocation jury",
      "Informations administratives"
    ],
    prix: "2760 € TTC (2300 € HT)",
    heures: null
  }
]

export const vaeCertifications = {
  niveau5: [
    { titre: "Conducteur de Travaux Bâtiment et Génie Civil", rncp: "RNCP40217", rncpUrl: "https://www.francecompetences.fr/recherche/rncp/40217/" },
    { titre: "Chef de Chantier en Voirie et Réseaux Divers", rncp: "RNCP41368", rncpUrl: "https://www.francecompetences.fr/recherche/rncp/41368/" },
    { titre: "Chargé d'Affaires du Bâtiment", rncp: "RNCP35503", rncpUrl: "https://www.francecompetences.fr/recherche/rncp/35503/" }
  ],
  niveau6: [
    { titre: "Coordinateur BIM du Bâtiment", rncp: "RNCP39408", rncpUrl: "https://www.francecompetences.fr/recherche/rncp/39408/" },
    { titre: "Conducteur de Travaux Voirie et Réseaux Divers", rncp: "RNCP39469", rncpUrl: "https://www.francecompetences.fr/recherche/rncp/39469/" }
  ]
}

export const entrepriseAvantages = [
  {
    id: 1,
    titre: "Amélioration des performances internes",
    description: "Collaborateurs mieux formés = productivité renforcée"
  },
  {
    id: 2,
    titre: "Adaptation aux évolutions du secteur",
    description: "Rester compétitif et à la pointe des nouvelles méthodes"
  },
  {
    id: 3,
    titre: "Fidélisation des talents",
    description: "Excellent levier de motivation et de fidélité"
  },
  {
    id: 4,
    titre: "Valorisation image employeur",
    description: "Entreprise perçue comme innovante et responsable"
  }
]

export const entrepriseThematiques = [
  "Lean Construction : optimiser les processus chantier",
  "Pilotage de projet de rénovation énergétique",
  "Management financier d'un projet de construction",
  "Gestion de chantier, coordination, sécurité",
  "BIM collaboratif – Revit / méthodologie BIM"
]

export const entrepriseModalites = [
  { type: "Inter-entreprise", description: "Dans nos locaux selon calendrier défini" },
  { type: "Intra-entreprise", description: "Sur site ou en distanciel" },
  { type: "100% sur mesure", description: "Programme adapté à vos besoins" }
]

export const entrepriseTarif = "À partir de 700 € HT / Stagiaires"
