/**
 * Script d'import des données VAE et Entreprises dans Strapi
 * Exécuter après avoir redémarré Strapi pour que les nouveaux content-types soient disponibles
 */

const STRAPI_URL = 'http://localhost:1337'
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || ''

async function fetchAPI(endpoint, method = 'GET', body = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` })
    }
  }
  if (body) {
    options.body = JSON.stringify(body)
  }
  
  const response = await fetch(`${STRAPI_URL}${endpoint}`, options)
  if (!response.ok) {
    const text = await response.text()
    throw new Error(`API Error ${response.status}: ${text}`)
  }
  return response.json()
}

async function createEntry(contentType, data) {
  try {
    const result = await fetchAPI(`/api/${contentType}`, 'POST', { data })
    console.log(`✅ Créé ${contentType}: ${data.titre || data.texte || data.question || data.type || 'OK'}`)
    return result
  } catch (error) {
    console.error(`❌ Erreur création ${contentType}:`, error.message)
    return null
  }
}

async function updateSingleType(contentType, data) {
  try {
    const result = await fetchAPI(`/api/${contentType}`, 'PUT', { data })
    console.log(`✅ Mis à jour ${contentType}`)
    return result
  } catch (error) {
    console.error(`❌ Erreur mise à jour ${contentType}:`, error.message)
    return null
  }
}

// ============================================
// DONNÉES VAE
// ============================================

const vaeAvantages = [
  { texte: "Reconnaissance officielle de votre expérience", ordre: 1 },
  { texte: "Obtention d'un diplôme sans retourner en formation", ordre: 2 },
  { texte: "Évolution professionnelle et salariale", ordre: 3 },
  { texte: "Valorisation de vos compétences terrain", ordre: 4 },
  { texte: "Accessible dès 1 an d'expérience", ordre: 5 },
  { texte: "Financement possible (CPF, employeur)", ordre: 6 }
]

const vaeFaqs = [
  {
    question: "Quelle est la durée d'une formation BTP en VAE ?",
    reponse: "La VAE peut durer de 6 mois à 2 ans selon votre expérience et votre disponibilité. Avec accompagnement, comptez jusqu'à 20 heures de suivi personnalisé pour constituer votre dossier.",
    ordre: 1
  },
  {
    question: "Peut-on faire une VAE BTP sans diplôme ?",
    reponse: "Oui, la VAE BTP est accessible sans condition de diplôme initial. Il faut justifier d'au moins 1 an d'expérience en lien direct avec la certification visée.",
    ordre: 2
  },
  {
    question: "Comment financer sa VAE BTP ?",
    reponse: "Plusieurs options : CPF (Compte Personnel de Formation), financement employeur, Pôle Emploi, ou financement personnel. La VAE est éligible au CPF.",
    ordre: 3
  },
  {
    question: "Quels sont les débouchés après une VAE conducteur de travaux ?",
    reponse: "Mêmes débouchés qu'une formation classique : conducteur de travaux (35-50k€), évolution vers chef de projet, responsable de programmes, avec reconnaissance officielle de vos compétences.",
    ordre: 4
  }
]

const vaeCertifications = [
  { titre: "Conducteur de Travaux Bâtiment et Génie Civil", rncp: "RNCP40217", niveau: "niveau5", ordre: 1 },
  { titre: "Chef de Chantier en Voirie et Réseaux Divers", rncp: "RNCP41368", niveau: "niveau5", ordre: 2 },
  { titre: "Chargé d'Affaires du Bâtiment", rncp: "RNCP35503", niveau: "niveau5", ordre: 3 },
  { titre: "Coordinateur BIM du Bâtiment", rncp: "RNCP39408", niveau: "niveau6", ordre: 4 },
  { titre: "Conducteur de Travaux Voirie et Réseaux Divers", rncp: "RNCP39469", niveau: "niveau6", ordre: 5 }
]

const vaeFormules = [
  {
    titre: "VAE avec accompagnement",
    services: [
      "Analyse de votre parcours professionnel",
      "Aide à la rédaction du dossier VAE",
      "Préparation à l'entretien avec le jury",
      "Suivi personnalisé jusqu'à l'obtention"
    ],
    heures: "Jusqu'à 20 heures d'accompagnement",
    prix: "4500 € TTC (3750 € HT)",
    modalites: "Présentiel, visio, téléphone et mail",
    ordre: 1
  },
  {
    titre: "VAE sans accompagnement",
    services: [
      "Vérification de l'éligibilité VAE",
      "Inscription et convocation jury",
      "Informations administratives",
      "Suivi du dossier jusqu'au jury"
    ],
    prix: "2760 € TTC (2300 € HT)",
    modalites: "Suivi administratif uniquement",
    ordre: 2
  }
]

const pageVAE = {
  heroTitre: "VAE BTP - Validation Acquis Expérience",
  heroDescription: "Transformez votre expérience BTP en certification professionnelle reconnue. VAE conducteur de travaux, chargé d'affaires bâtiment et coordinateur BIM.",
  statExperience: "1 an",
  statCertifications: "5",
  statFinancement: "CPF",
  statDiplome: "0",
  sectionTitre: "Qu'est-ce que la VAE BTP ?",
  sectionDescription: "<p>La VAE (Validation des Acquis de l'Expérience) est un droit inscrit dans le Code du Travail qui permet d'obtenir tout ou partie d'un diplôme en justifiant d'au moins 1 an d'expérience professionnelle. Notre VAE BTP vous permet de faire reconnaître vos compétences terrain.</p><p>La VAE conducteur de travaux, VAE chargé d'affaires bâtiment ou VAE coordinateur BIM transforment votre expérience en certification officielle RNCP, reconnue par l'État et les entreprises.</p>",
  ctaTitre: "Prêt à valoriser votre expérience BTP ?",
  ctaDescription: "Transformez votre expérience terrain en diplôme reconnu. Contactez-nous pour étudier votre éligibilité à la VAE BTP."
}

// ============================================
// DONNÉES ENTREPRISES
// ============================================

const entrepriseServices = [
  {
    titre: "Amélioration des performances internes",
    description: "Des collaborateurs mieux formés, c'est une productivité renforcée et une meilleure efficacité dans les missions du quotidien.",
    icone: "TrendingUp",
    ordre: 1
  },
  {
    titre: "Adaptation aux évolutions du secteur",
    description: "Le monde du BTP évolue rapidement : se former, c'est rester compétitif et à la pointe des nouvelles méthodes et réglementations.",
    icone: "Building2",
    ordre: 2
  },
  {
    titre: "Fidélisation des talents",
    description: "Offrir des formations à vos équipes, c'est aussi leur montrer que vous investissez en eux — un excellent levier de motivation et de fidélité.",
    icone: "Users",
    ordre: 3
  },
  {
    titre: "Valorisez votre image employeur",
    description: "Une entreprise qui forme ses salariés est perçue comme innovante, responsable et tournée vers l'avenir.",
    icone: "Award",
    ordre: 4
  }
]

const formationThematiques = [
  {
    nom: "Lean Construction : optimiser les processus chantier",
    description: "Méthodes d'optimisation des processus de construction",
    duree: "2-3 jours",
    niveau: "Intermédiaire",
    prix: "À partir de 700€ HT/jour",
    ordre: 1
  },
  {
    nom: "Pilotage de projet de rénovation énergétique",
    description: "Gestion complète des projets de rénovation énergétique",
    duree: "3-4 jours",
    niveau: "Avancé",
    prix: "À partir de 700€ HT/jour",
    ordre: 2
  },
  {
    nom: "Management d'équipe sur chantier",
    description: "Techniques de management et leadership pour chefs de chantier",
    duree: "2 jours",
    niveau: "Intermédiaire",
    prix: "À partir de 700€ HT/jour",
    ordre: 3
  },
  {
    nom: "Lecture de plans et métrés",
    description: "Maîtrise de la lecture de plans techniques et calcul des métrés",
    duree: "3 jours",
    niveau: "Débutant",
    prix: "À partir de 700€ HT/jour",
    ordre: 4
  },
  {
    nom: "Sécurité et prévention des risques BTP",
    description: "Formation aux normes de sécurité et prévention sur chantier",
    duree: "1-2 jours",
    niveau: "Tous niveaux",
    prix: "À partir de 700€ HT/jour",
    ordre: 5
  }
]

const entrepriseModalites = [
  {
    type: "Inter-entreprise",
    description: "Dans nos locaux selon un calendrier défini",
    ordre: 1
  },
  {
    type: "Intra-entreprise",
    description: "Sur site ou en distanciel",
    ordre: 2
  },
  {
    type: "100% sur mesure",
    description: "Nous construisons avec vous un programme adapté à vos besoins spécifiques",
    ordre: 3
  }
]

const pageEntreprise = {
  heroTitre: "Formations BTP pour",
  heroDescription: "Accompagnons vos équipes pour qu'elles deviennent de véritables piliers dans leur secteur d'activité",
  sectionInvestirTitre: "Pourquoi investir dans la formation de vos salariés ?",
  sectionThematiquesTitre: "Nos thématiques de formation",
  sectionThematiquesDescription: "Nous couvrons de nombreux domaines, avec des modules courts ou des parcours complets. Parmi les formations les plus demandées :",
  tarifJour: "À partir de 700€ HT",
  tarifDescription: "Le coût varie selon le format (inter/intra), la durée, le contenu personnalisé.",
  financements: [
    "Plan de développement des compétences",
    "Financement via OPCO (Constructys, Atlas…)",
    "CPF pour les formations certifiantes"
  ],
  ctaTitre: "Prêt à former vos équipes ?",
  ctaDescription: "Contactez-nous pour discuter de vos besoins et obtenir un devis personnalisé",
  telephone: "01 89 70 60 52",
  email: "contact.academy@cma-education.com"
}

// ============================================
// IMPORT PRINCIPAL
// ============================================

async function importAll() {
  console.log('🚀 Début de l\'import des données VAE et Entreprises...\n')
  
  // ---- VAE ----
  console.log('📋 Import des avantages VAE...')
  for (const avantage of vaeAvantages) {
    await createEntry('vae-avantages', avantage)
  }
  
  console.log('\n📋 Import des FAQ VAE...')
  for (const faq of vaeFaqs) {
    await createEntry('vae-faqs', faq)
  }
  
  console.log('\n📋 Import des certifications VAE...')
  for (const cert of vaeCertifications) {
    await createEntry('vae-certifications', cert)
  }
  
  console.log('\n📋 Import des formules VAE...')
  for (const formule of vaeFormules) {
    await createEntry('vae-formules', formule)
  }
  
  console.log('\n📋 Configuration de la page VAE...')
  await updateSingleType('page-vae', pageVAE)
  
  // ---- ENTREPRISES ----
  console.log('\n📋 Import des services entreprise...')
  for (const service of entrepriseServices) {
    await createEntry('entreprise-services', service)
  }
  
  console.log('\n📋 Import des thématiques de formation...')
  for (const thematique of formationThematiques) {
    await createEntry('formation-thematiques', thematique)
  }
  
  console.log('\n📋 Import des modalités entreprise...')
  for (const modalite of entrepriseModalites) {
    await createEntry('entreprise-modalites', modalite)
  }
  
  console.log('\n📋 Configuration de la page Entreprises...')
  await updateSingleType('page-entreprise', pageEntreprise)
  
  console.log('\n✅ Import terminé!')
  console.log('\n📌 PROCHAINES ÉTAPES:')
  console.log('1. Redémarrer Strapi pour charger les nouveaux content-types')
  console.log('2. Configurer les permissions dans Strapi Admin:')
  console.log('   - Settings > Users & Permissions > Roles > Public')
  console.log('   - Activer "find" et "findOne" pour:')
  console.log('     • vae-avantage')
  console.log('     • vae-faq')
  console.log('     • page-vae')
  console.log('     • page-entreprise')
  console.log('     • entreprise-modalite')
  console.log('3. Publier les entrées dans Strapi Admin')
}

importAll().catch(console.error)
