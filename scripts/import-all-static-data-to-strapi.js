/**
 * Script d'import de toutes les données statiques vers Strapi
 * Rend le contenu dynamique et éditable depuis le panel admin
 */

const STRAPI_URL = 'http://localhost:1337'
const STRAPI_TOKEN = '34ebc27d0aae530b71f7c236385a2013ba8db694ccbdf80a49a5cc3e0499ae408caa45dddb48f2a9ed35fd17a8a9eedb71fbf587e0806ccc282a4c62f8aa575457bc480b312f9740d1f3e1651e196a507075ed08a858b8dda30c5c1ffc88b61352c9436b7fddeb70f6668b194166d1a18133990d6da183edb6a0f4f4694f716d'

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${STRAPI_TOKEN}`
}

// ============================================
// DONNÉES À IMPORTER
// ============================================

const formations = [
  // Alternance
  {
    title: "Chargé(e) d'Affaires du Bâtiment",
    slug: "charge-affaires-batiment",
    level: "Niveau 5 Européen (équivalent BAC+2)",
    rncp: "RNCP35503",
    shortDescription: "Formation conçue, validée et dispensée par des professionnels du BTP pour développer des compétences opérationnelles solides.",
    duration: "1 an en alternance (100%)",
    rhythm: "595 heures en centre + 910 heures en entreprise",
    mode: "Présentiel",
    price: "Prise en charge",
    isAlternance: true,
    isReconversion: false,
    ordre: 1
  },
  {
    title: "Conducteur de Travaux – Bâtiment & Génie Civil",
    slug: "conducteur-travaux-batiment",
    level: "Niveau 5 (équivalent Bac+2)",
    rncp: "RNCP40217",
    shortDescription: "Formation professionnalisante pour devenir conducteur de travaux capable de préparer, gérer et coordonner un chantier de construction dans sa globalité.",
    duration: "1 an",
    rhythm: "595 heures",
    mode: "Présentiel",
    price: "Prise en charge",
    isAlternance: true,
    isReconversion: false,
    ordre: 2
  },
  {
    title: "Chef de Chantier Voirie et Réseaux Divers",
    slug: "chef-chantier-vrd",
    level: "Niveau 5 (équivalent BAC+2)",
    rncp: "RNCP41368",
    shortDescription: "Formation professionnalisante pour devenir chef de chantier VRD capable de préparer, diriger et clôturer l'exécution de chantiers de voirie et réseaux divers.",
    duration: "1 an",
    rhythm: "560 heures",
    mode: "Présentiel",
    price: "Prise en charge",
    isAlternance: true,
    isReconversion: false,
    ordre: 3
  },
  {
    title: "Double Parcours Responsable Travaux Bâtiment & Coordinateur BIM du Bâtiment",
    slug: "responsable-travaux-bim",
    level: "Niveau 6 (équivalent Bac+3)",
    rncp: "RNCP39408",
    shortDescription: "Formation professionnalisante visant à former des professionnels du BTP capables de conduire des chantiers de construction tout en intégrant les outils numériques collaboratifs du BIM.",
    duration: "1 an",
    rhythm: "700 heures",
    mode: "Présentiel",
    price: "Prise en charge",
    isAlternance: true,
    isReconversion: false,
    ordre: 4
  },
  {
    title: "Chef de Projets BTP",
    slug: "chef-projets-btp",
    level: "Niveau 7 (équivalent Bac+5)",
    rncp: "En cours d'enregistrement",
    shortDescription: "Formation professionnalisante préparant des experts capables de gérer des projets de construction complexes et innovants, en intégrant les enjeux contemporains du BTP.",
    duration: "2 ans",
    rhythm: "1393 heures",
    mode: "Présentiel",
    price: "Prise en charge",
    isAlternance: true,
    isReconversion: false,
    ordre: 5
  },
  {
    title: "Conducteur de Travaux en VRD - Cursus 1 an",
    slug: "conducteur-travaux-vrd-1an",
    level: "BAC+3 - Niveau 6",
    rncp: "RNCP 41369",
    shortDescription: "Formation intensive pour former des professionnels capables de gérer l'ensemble des étapes d'un chantier VRD, de la préparation à la réception des ouvrages.",
    duration: "1 an",
    rhythm: "560 heures en centre",
    mode: "Présentiel",
    price: "Prise en charge",
    isAlternance: true,
    isReconversion: false,
    ordre: 6
  },
  {
    title: "Conducteur de Travaux Voirie et Réseaux Divers - Cursus 2 ans",
    slug: "conducteur-travaux-vrd-2ans",
    level: "BAC+3 - Niveau 6",
    rncp: "RNCP39469",
    shortDescription: "Formation approfondie pour maîtriser tous les aspects du métier de conducteur de travaux VRD.",
    duration: "2 ans",
    rhythm: "1400 heures en centre + 2100 heures en entreprise",
    mode: "Présentiel",
    price: "Prise en charge",
    isAlternance: true,
    isReconversion: false,
    ordre: 7
  },
  // Reconversion
  {
    title: "Chargé d'affaires du bâtiment - Professionnels en reconversion",
    slug: "charge-affaires-reconversion",
    level: "Niveau 5 (équivalent Bac+2)",
    rncp: "RNCP35503",
    shortDescription: "Une formation pensée pour les professionnels en reconversion.",
    duration: "7 mois",
    rhythm: "595 heures",
    mode: "Présentiel",
    price: "Prise en charge",
    isAlternance: false,
    isReconversion: true,
    ordre: 8
  },
  {
    title: "Conducteur de Travaux Bâtiment et Génie Civil - Professionnels en reconversion",
    slug: "conducteur-travaux-reconversion",
    level: "Bac+2 - Niveau 5",
    rncp: "RNCP40217",
    shortDescription: "Une formation pensée pour les professionnels en reconversion.",
    duration: "7 mois",
    rhythm: "595 heures",
    mode: "Présentiel",
    price: "Prise en charge",
    isAlternance: false,
    isReconversion: true,
    ordre: 9
  }
]

const modalites = [
  {
    titre: "Alternance",
    description: "Formation en alternance du Bac+2 au Bac+5. Rémunération garantie et insertion professionnelle.",
    slug: "alternance",
    icon: "GraduationCap",
    couleur: "from-blue-500 to-blue-600",
    lien: "/formations#alternance",
    ordre: 1,
    featured: true
  },
  {
    titre: "Reconversion",
    description: "Formations courtes pour professionnels en reconversion. Financement possible par CPF.",
    slug: "reconversion",
    icon: "RefreshCw",
    couleur: "from-green-500 to-green-600",
    lien: "/formations#reconversion",
    ordre: 2,
    featured: true
  },
  {
    titre: "VAE",
    description: "Validation des Acquis de l'Expérience. Obtenez un diplôme grâce à votre expérience.",
    slug: "vae",
    icon: "Award",
    couleur: "from-orange-500 to-orange-600",
    lien: "/formations#vae",
    ordre: 3,
    featured: true
  }
]

const statistiques = [
  { cle: "experience", nombre: 15, label: "Années d'expertise BTP", suffixe: "+", ordre: 1 },
  { cle: "formations", nombre: 8, label: "Formations certifiées RNCP", suffixe: "", ordre: 2 },
  { cle: "partners", nombre: 45, label: "Entreprises partenaires actives", suffixe: "+", ordre: 3 }
]

const testimonials = [
  {
    nom: "Thomas Martin",
    poste: "Conducteur de travaux",
    entreprise: "Bouygues Construction",
    commentaire: "CMA m'a donné toutes les clés pour réussir. Formation terrain exceptionnelle !",
    note: 5,
    photo: "/images/testimonials/thomas-martin.svg",
    featured: true,
    ordre: 1
  },
  {
    nom: "Sarah Johnson",
    poste: "Chef de projet BIM",
    entreprise: "Vinci Construction",
    commentaire: "18 mois qui ont transformé ma carrière. Emploi trouvé avant même la fin !",
    note: 5,
    photo: "/images/testimonials/sarah-johnson.svg",
    featured: true,
    ordre: 2
  },
  {
    nom: "Marie Dubois",
    poste: "Responsable QSE",
    entreprise: "Eiffage",
    commentaire: "Pédagogie innovante et formateurs experts. Je recommande à 100% !",
    note: 5,
    photo: "/images/testimonials/marie-dubois.svg",
    featured: true,
    ordre: 3
  }
]

const partners = [
  { nom: "Eiffage", logo: "EIFFAGE.webp", featured: true, ordre: 1 },
  { nom: "NGE", logo: "NGE.webp", featured: true, ordre: 2 },
  { nom: "Leon Grosse", logo: "LEON GROSSE.webp", featured: true, ordre: 3 },
  { nom: "GS Construction", logo: "GS Construction.webp", featured: true, ordre: 4 },
  { nom: "Coredif", logo: "COREDIF.webp", featured: true, ordre: 5 },
  { nom: "GCC", logo: "GCC.webp", featured: true, ordre: 6 }
]

const valeursEcole = [
  { titre: "Certifié Qualiopi", description: "Certification qualité des organismes de formation", icon: "Award", ordre: 1, type: "certification" },
  { titre: "Titres RNCP", description: "Formations reconnues par l'État niveau 5, 6 et 7", icon: "Shield", ordre: 2, type: "certification" },
  { titre: "Partenaire OPCO", description: "Prise en charge des formations en alternance", icon: "Users", ordre: 3, type: "certification" },
  { titre: "Membre FFB", description: "Fédération Française du Bâtiment", icon: "BookOpen", ordre: 4, type: "certification" }
]

const processusAdmission = [
  { etape: 1, titre: "Soumission du dossier", description: "Complétez notre formulaire en ligne avec votre parcours et projet professionnel.", detail: "Notre équipe vous recontactera sous 24 heures pour fixer un rendez-vous.", icone: "FileText" },
  { etape: 2, titre: "Entretien d'admission", description: "Échange privilégié en présentiel ou à distance selon votre préférence.", detail: "Décision communiquée sous 48 heures après l'entretien.", icone: "MessageCircle" },
  { etape: 3, titre: "Recherche d'alternance", description: "Réception des documents pour démarrer votre recherche d'entreprise.", detail: "Inscription définitive dès la signature de la convention de formation.", icone: "Search" },
  { etape: 4, titre: "Accompagnement dédié", description: "Accompagnement personnalisé et atelier CV/lettre de motivation.", detail: "Maximisation de vos chances auprès des recruteurs.", icone: "UserCheck" }
]

const siteSettings = {
  siteName: "CMA Education",
  siteTagline: "Centre de Formation BTP d'Excellence",
  heroTitle: "L'Academy - Devenez l'acteur du BTP d'aujourd'hui et de demain",
  heroSubtitle: "Centre de Formation BTP d'Excellence",
  heroDescription: "Formations BTP en alternance, reconversion et VAE. Du Bac+2 au Bac+5 avec nos partenaires entreprises.",
  contactPhone: "01 89 70 60 52",
  contactEmail: "contact.academy@cma-education.com",
  emailInscription: "inscription.academy@cma-education.com",
  contactAddress: "67-69 Avenue du Général de Gaulle, 77420 Champs sur Marne",
  accessibilityMessage: "Nos formations sont ouvertes à tous, y compris aux personnes en situation de handicap. Nous mettons en place les aménagements nécessaires pour garantir les meilleures conditions d'apprentissage.",
  accessibilityPhone: "01 89 70 60 52",
  referentHandicap: "notre référent handicap"
}

// ============================================
// FONCTIONS D'IMPORT
// ============================================

async function createEntry(endpoint, data) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ data })
    })
    
    if (!response.ok) {
      const error = await response.text()
      console.error(`❌ Erreur ${endpoint}:`, error)
      return null
    }
    
    const result = await response.json()
    console.log(`✅ ${endpoint} créé:`, data.title || data.titre || data.nom || data.siteName || 'OK')
    return result
  } catch (error) {
    console.error(`❌ Erreur ${endpoint}:`, error.message)
    return null
  }
}

async function updateSingleType(endpoint, data) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ data })
    })
    
    if (!response.ok) {
      const error = await response.text()
      console.error(`❌ Erreur ${endpoint}:`, error)
      return null
    }
    
    const result = await response.json()
    console.log(`✅ ${endpoint} mis à jour`)
    return result
  } catch (error) {
    console.error(`❌ Erreur ${endpoint}:`, error.message)
    return null
  }
}

async function checkApiExists(endpoint) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/${endpoint}`, { headers })
    return response.ok
  } catch {
    return false
  }
}

async function importAll() {
  console.log('🚀 Début de l\'import des données statiques vers Strapi\n')
  console.log('=' .repeat(60))
  
  // 1. Site Settings (Single Type)
  console.log('\n📋 Import Site Settings...')
  if (await checkApiExists('site-setting')) {
    await updateSingleType('site-setting', siteSettings)
  } else {
    console.log('⚠️  API site-setting non disponible')
  }
  
  // 2. Formations
  console.log('\n📚 Import Formations...')
  if (await checkApiExists('formations')) {
    for (const formation of formations) {
      await createEntry('formations', formation)
    }
  } else {
    console.log('⚠️  API formations non disponible')
  }
  
  // 3. Modalités
  console.log('\n🎯 Import Modalités...')
  if (await checkApiExists('modalites')) {
    for (const modalite of modalites) {
      await createEntry('modalites', modalite)
    }
  } else {
    console.log('⚠️  API modalites non disponible')
  }
  
  // 4. Statistiques
  console.log('\n📊 Import Statistiques...')
  if (await checkApiExists('statistiques-site')) {
    for (const stat of statistiques) {
      await createEntry('statistiques-site', stat)
    }
  } else {
    console.log('⚠️  API statistiques-site non disponible')
  }
  
  // 5. Témoignages
  console.log('\n💬 Import Témoignages...')
  if (await checkApiExists('testimonials')) {
    for (const testimonial of testimonials) {
      await createEntry('testimonials', testimonial)
    }
  } else {
    console.log('⚠️  API testimonials non disponible')
  }
  
  // 6. Partenaires
  console.log('\n🤝 Import Partenaires...')
  if (await checkApiExists('partners')) {
    for (const partner of partners) {
      await createEntry('partners', partner)
    }
  } else {
    console.log('⚠️  API partners non disponible')
  }
  
  // 7. Valeurs École (Certifications)
  console.log('\n🏆 Import Valeurs/Certifications...')
  if (await checkApiExists('valeurs-ecole')) {
    for (const valeur of valeursEcole) {
      await createEntry('valeurs-ecole', valeur)
    }
  } else {
    console.log('⚠️  API valeurs-ecole non disponible')
  }
  
  // 8. Processus Admission
  console.log('\n📝 Import Processus Admission...')
  if (await checkApiExists('processus-admissions')) {
    for (const etape of processusAdmission) {
      await createEntry('processus-admissions', etape)
    }
  } else {
    console.log('⚠️  API processus-admissions non disponible')
  }
  
  console.log('\n' + '=' .repeat(60))
  console.log('✅ Import terminé!')
  console.log('\n📌 Prochaines étapes:')
  console.log('1. Vérifiez les données dans Strapi Admin: http://localhost:1337/admin')
  console.log('2. Configurez les permissions Public pour chaque API')
  console.log('3. Testez le frontend: http://localhost:3000')
}

// Exécution
importAll().catch(console.error)
