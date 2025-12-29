/**
 * Script complet pour configurer et importer les formations dans Strapi
 * 1. Vérifie la connexion à Strapi
 * 2. Configure les permissions publiques (lecture)
 * 3. Importe toutes les formations
 * 4. Publie les formations
 * 
 * Exécuter avec: node scripts/setup-formations-strapi-complete.js
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337'
const STRAPI_ADMIN_EMAIL = process.env.STRAPI_ADMIN_EMAIL || 'admin@cma.fr'
const STRAPI_ADMIN_PASSWORD = process.env.STRAPI_ADMIN_PASSWORD || 'Admin123!'

let adminToken = null

// Toutes les formations
const formations = [
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
    objectifs: ["Maîtriser la gestion commerciale et technique des affaires", "Développer et fidéliser un portefeuille clients", "Piloter les projets de construction", "Négocier et conclure des contrats", "Assurer le suivi financier des affaires"],
    debouches: ["Chargé d'affaires BTP", "Technico-commercial BTP", "Responsable développement commercial", "Ingénieur commercial construction"],
    prerequis: ["Bac ou équivalent", "Motivation pour le secteur BTP", "Sens commercial et relationnel"],
    programme: ["Gestion commerciale et développement", "Techniques du bâtiment", "Gestion de projet", "Communication professionnelle", "Droit de la construction"],
    evaluation: ["Contrôle continu", "Études de cas", "Soutenance devant jury"],
    poursuites: ["Responsable travaux Bâtiment", "Chef de projets BTP"],
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
    shortDesc: "Formation professionnalisante pour devenir conducteur de travaux capable de préparer, gérer et coordonner un chantier de construction.",
    fullDesc: "Devenez le chef d'orchestre des chantiers de construction. Cette formation vous apprend à organiser, planifier et superviser l'ensemble des opérations d'un chantier.",
    metierDesc: "Le conducteur de travaux est responsable de l'exécution des travaux sur un ou plusieurs chantiers.",
    duree: "1 an en alternance",
    volumeHoraire: "595 heures en centre",
    rythme: "Alternance 1 semaine école / 3 semaines entreprise",
    modalite: "Présentiel",
    cout: "Prise en charge par l'OPCO",
    financement: "100% pris en charge en alternance",
    tauxReussite: "90%",
    tauxInsertion: "93%",
    objectifs: ["Préparer et organiser un chantier", "Gérer les équipes et les sous-traitants", "Assurer le suivi technique et financier", "Garantir la sécurité sur le chantier"],
    debouches: ["Conducteur de travaux", "Chef de chantier", "Responsable travaux", "Directeur de travaux"],
    prerequis: ["Bac technique ou expérience BTP", "Capacité de management", "Rigueur et organisation"],
    ordre: 2,
    isActive: true
  },
  {
    title: "Chef de Chantier Voirie et Réseaux Divers",
    slug: "chef-chantier-vrd",
    level: "Niveau 5 (équivalent BAC+2)",
    rncp: "RNCP41368",
    shortDesc: "Formation professionnalisante pour devenir chef de chantier VRD capable de préparer, diriger et clôturer l'exécution de chantiers.",
    fullDesc: "Spécialisez-vous dans les travaux publics et les infrastructures.",
    duree: "1 an en alternance",
    volumeHoraire: "560 heures en centre",
    rythme: "Alternance 1 semaine école / 3 semaines entreprise",
    modalite: "Présentiel",
    cout: "Prise en charge par l'OPCO",
    tauxReussite: "88%",
    tauxInsertion: "91%",
    objectifs: ["Préparer l'exécution des travaux VRD", "Diriger les travaux de voirie", "Gérer les réseaux divers", "Manager les équipes terrain"],
    debouches: ["Chef de chantier VRD", "Conducteur de travaux VRD", "Responsable travaux publics"],
    prerequis: ["Bac ou expérience en travaux publics", "Intérêt pour les infrastructures"],
    ordre: 3,
    isActive: true
  },
  {
    title: "Double Parcours Responsable Travaux Bâtiment & Coordinateur BIM",
    slug: "responsable-travaux-bim",
    level: "Niveau 6 (équivalent Bac+3)",
    rncp: "RNCP39408",
    shortDesc: "Formation professionnalisante visant à former des professionnels du BTP capables de conduire des chantiers tout en intégrant les outils BIM.",
    fullDesc: "Une double compétence unique : maîtrisez la conduite de travaux traditionnelle ET les outils numériques BIM.",
    duree: "1 an en alternance",
    volumeHoraire: "700 heures en centre",
    rythme: "Alternance 1 semaine école / 3 semaines entreprise",
    modalite: "Présentiel",
    cout: "Prise en charge par l'OPCO",
    tauxReussite: "94%",
    tauxInsertion: "97%",
    objectifs: ["Maîtriser la conduite de travaux bâtiment", "Coordonner les projets en BIM", "Intégrer les outils numériques collaboratifs"],
    debouches: ["Responsable travaux", "Coordinateur BIM", "Chef de projet construction", "BIM Manager junior"],
    prerequis: ["Bac+2 technique ou expérience significative", "Intérêt pour le numérique"],
    ordre: 4,
    isActive: true
  },
  {
    title: "Chef de Projets BTP",
    slug: "chef-projets-btp",
    level: "Niveau 7 (équivalent Bac+5)",
    rncp: "En cours d'enregistrement",
    shortDesc: "Formation professionnalisante préparant des experts capables de gérer des projets de construction complexes et innovants.",
    fullDesc: "Accédez aux plus hautes responsabilités du BTP. Cette formation de niveau Master vous prépare à diriger des projets d'envergure.",
    duree: "2 ans en alternance",
    volumeHoraire: "1393 heures en centre",
    rythme: "Alternance 1 semaine école / 3 semaines entreprise",
    modalite: "Présentiel",
    cout: "Prise en charge par l'OPCO",
    tauxReussite: "96%",
    tauxInsertion: "98%",
    objectifs: ["Piloter des projets de construction complexes", "Manager des équipes pluridisciplinaires", "Intégrer les enjeux RSE"],
    debouches: ["Chef de projets BTP", "Directeur de travaux", "Responsable d'agence", "Directeur technique"],
    prerequis: ["Bac+3 ou expérience significative en BTP", "Capacités managériales"],
    ordre: 5,
    isActive: true
  },

  {
    title: "Conducteur de Travaux en VRD - Cursus 1 an",
    slug: "conducteur-travaux-vrd-1an",
    level: "BAC+3 - Niveau 6",
    rncp: "RNCP41369",
    shortDesc: "Formation intensive pour former des professionnels capables de gérer l'ensemble des étapes d'un chantier VRD.",
    fullDesc: "Un cursus intensif d'un an pour devenir conducteur de travaux VRD.",
    duree: "1 an en alternance",
    volumeHoraire: "560 heures en centre",
    rythme: "Alternance 1 semaine école / 3 semaines entreprise",
    modalite: "Présentiel",
    cout: "Prise en charge par l'OPCO",
    tauxReussite: "89%",
    tauxInsertion: "92%",
    objectifs: ["Préparer et organiser un chantier VRD", "Gérer les ressources humaines et matérielles", "Assurer la qualité et la sécurité"],
    debouches: ["Conducteur de travaux VRD", "Chef de chantier TP", "Responsable d'exploitation"],
    prerequis: ["Bac+2 technique ou expérience TP", "Connaissance du terrain"],
    ordre: 6,
    isActive: true
  },
  {
    title: "Conducteur de Travaux Voirie et Réseaux Divers - Cursus 2 ans",
    slug: "conducteur-travaux-vrd-2ans",
    level: "BAC+3 - Niveau 6",
    rncp: "RNCP39469",
    shortDesc: "Formation approfondie pour maîtriser tous les aspects du métier de conducteur de travaux VRD sur 2 années.",
    fullDesc: "Le cursus complet de 2 ans pour une maîtrise approfondie du métier.",
    duree: "2 ans en alternance",
    volumeHoraire: "1400 heures en centre",
    repartition: "1400h centre + 2100h entreprise",
    rythme: "Alternance 1 semaine école / 3 semaines entreprise",
    modalite: "Présentiel",
    cout: "Prise en charge par l'OPCO",
    tauxReussite: "91%",
    tauxInsertion: "94%",
    objectifs: ["Maîtriser la gestion complète de chantiers VRD", "Développer des compétences managériales avancées", "Gérer les aspects techniques et financiers"],
    debouches: ["Conducteur de travaux VRD senior", "Directeur de travaux TP", "Responsable d'agence TP"],
    prerequis: ["Bac technique minimum", "Motivation pour les travaux publics"],
    ordre: 7,
    isActive: true
  },
  {
    title: "Chargé d'affaires du bâtiment - Professionnels en reconversion",
    slug: "charge-affaires-reconversion",
    level: "Niveau 5 (équivalent Bac+2)",
    rncp: "RNCP35503",
    shortDesc: "Une formation pensée pour les professionnels en reconversion souhaitant intégrer le secteur du BTP.",
    fullDesc: "Vous souhaitez changer de carrière et rejoindre le secteur dynamique du BTP ? Cette formation intensive de 7 mois vous donne toutes les clés.",
    duree: "7 mois",
    volumeHoraire: "595 heures",
    rythme: "Formation continue intensive",
    modalite: "Présentiel",
    cout: "Sur devis",
    financement: "CPF, Pôle Emploi, Transition Pro",
    tauxReussite: "87%",
    tauxInsertion: "89%",
    publicCible: "Professionnels en reconversion, demandeurs d'emploi",
    objectifs: ["Acquérir les fondamentaux du BTP", "Développer des compétences commerciales", "Maîtriser la gestion de projets"],
    debouches: ["Chargé d'affaires BTP", "Commercial BTP", "Responsable développement"],
    prerequis: ["Bac ou équivalent", "Projet de reconversion validé", "Motivation et dynamisme"],
    ordre: 101,
    isActive: true
  },
  {
    title: "Conducteur de Travaux Bâtiment et Génie Civil - Professionnels en reconversion",
    slug: "conducteur-travaux-reconversion",
    level: "Bac+2 - Niveau 5",
    rncp: "RNCP40217",
    shortDesc: "Une formation pensée pour les professionnels en reconversion vers le métier de conducteur de travaux.",
    fullDesc: "Reconvertissez-vous vers un métier d'avenir ! En 7 mois intensifs, acquérez toutes les compétences pour piloter des chantiers.",
    duree: "7 mois",
    volumeHoraire: "595 heures",
    rythme: "Formation continue intensive",
    modalite: "Présentiel",
    cout: "Sur devis",
    financement: "CPF, Pôle Emploi, Transition Pro",
    tauxReussite: "85%",
    tauxInsertion: "88%",
    publicCible: "Professionnels en reconversion, demandeurs d'emploi",
    objectifs: ["Maîtriser la conduite de chantier", "Gérer les équipes terrain", "Assurer le suivi technique et administratif"],
    debouches: ["Conducteur de travaux", "Chef de chantier", "Assistant travaux"],
    prerequis: ["Bac ou équivalent", "Expérience professionnelle (tout secteur)"],
    ordre: 102,
    isActive: true
  }
]

// Connexion admin Strapi
async function loginAdmin() {
  console.log('🔐 Connexion admin Strapi...')
  try {
    const response = await fetch(`${STRAPI_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: STRAPI_ADMIN_EMAIL,
        password: STRAPI_ADMIN_PASSWORD
      })
    })
    
    if (response.ok) {
      const data = await response.json()
      adminToken = data.data.token
      console.log('   ✅ Connecté en tant qu\'admin')
      return true
    } else {
      console.log('   ⚠️  Connexion admin échouée - utilisation de l\'API publique')
      return false
    }
  } catch (error) {
    console.log('   ⚠️  Erreur connexion admin:', error.message)
    return false
  }
}

// Configurer les permissions publiques
async function configurePublicPermissions() {
  if (!adminToken) {
    console.log('⚠️  Pas de token admin - configurez les permissions manuellement:')
    console.log('   1. Allez sur http://localhost:1337/admin')
    console.log('   2. Settings > Roles > Public')
    console.log('   3. Cochez "find" et "findOne" pour Formation')
    return
  }

  console.log('\n🔧 Configuration des permissions publiques...')
  
  try {
    // Récupérer le rôle Public
    const rolesResponse = await fetch(`${STRAPI_URL}/admin/roles`, {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    })
    const rolesData = await rolesResponse.json()
    const publicRole = rolesData.data.find(r => r.code === 'strapi-public')
    
    if (publicRole) {
      // Mettre à jour les permissions
      await fetch(`${STRAPI_URL}/admin/roles/${publicRole.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify({
          permissions: {
            'api::formation.formation': {
              controllers: {
                formation: {
                  find: { enabled: true },
                  findOne: { enabled: true }
                }
              }
            }
          }
        })
      })
      console.log('   ✅ Permissions publiques configurées')
    }
  } catch (error) {
    console.log('   ⚠️  Erreur configuration permissions:', error.message)
  }
}

// Créer ou mettre à jour une formation
async function upsertFormation(formation) {
  const headers = { 'Content-Type': 'application/json' }
  if (adminToken) {
    headers['Authorization'] = `Bearer ${adminToken}`
  }

  try {
    // Vérifier si existe
    const checkResponse = await fetch(
      `${STRAPI_URL}/api/formations?filters[slug][$eq]=${formation.slug}`,
      { headers }
    )
    const checkData = await checkResponse.json()
    
    if (checkData.data && checkData.data.length > 0) {
      // Mettre à jour
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
        console.log(`   🔄 Mise à jour: ${formation.slug}`)
        return { success: true, action: 'updated', id: existingId }
      }
    } else {
      // Créer
      const createResponse = await fetch(`${STRAPI_URL}/api/formations`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ data: formation })
      })
      
      if (createResponse.ok) {
        const data = await createResponse.json()
        console.log(`   ✅ Créée: ${formation.slug}`)
        return { success: true, action: 'created', id: data.data.id }
      }
    }
    
    return { success: false }
  } catch (error) {
    console.log(`   ❌ Erreur ${formation.slug}: ${error.message}`)
    return { success: false, error: error.message }
  }
}

// Publier une formation
async function publishFormation(id) {
  if (!adminToken) return
  
  try {
    await fetch(`${STRAPI_URL}/api/formations/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify({ data: { publishedAt: new Date().toISOString() } })
    })
  } catch (error) {
    // Ignorer les erreurs de publication
  }
}

// Fonction principale
async function main() {
  console.log('═══════════════════════════════════════════════════════════')
  console.log('   CONFIGURATION COMPLÈTE DES FORMATIONS STRAPI')
  console.log('═══════════════════════════════════════════════════════════')
  console.log(`\n📡 URL Strapi: ${STRAPI_URL}`)

  // Vérifier connexion
  try {
    const health = await fetch(`${STRAPI_URL}/api/formations`)
    if (!health.ok) throw new Error('API non accessible')
    console.log('✅ Strapi accessible\n')
  } catch (error) {
    console.log('❌ Strapi non accessible')
    console.log('   Démarrez Strapi: cd cms-cma && npm run develop')
    return
  }

  // Connexion admin (optionnel)
  await loginAdmin()
  
  // Configurer permissions
  await configurePublicPermissions()

  // Importer les formations
  console.log('\n📚 Import des formations...')
  let created = 0, updated = 0, errors = 0
  const ids = []

  for (const formation of formations) {
    const result = await upsertFormation(formation)
    if (result.success) {
      if (result.action === 'created') created++
      else updated++
      if (result.id) ids.push(result.id)
    } else {
      errors++
    }
  }

  // Publier les formations
  if (adminToken && ids.length > 0) {
    console.log('\n📤 Publication des formations...')
    for (const id of ids) {
      await publishFormation(id)
    }
    console.log('   ✅ Formations publiées')
  }

  // Résumé
  console.log('\n═══════════════════════════════════════════════════════════')
  console.log('📊 RÉSUMÉ')
  console.log('═══════════════════════════════════════════════════════════')
  console.log(`   ✅ Créées:       ${created}`)
  console.log(`   🔄 Mises à jour: ${updated}`)
  console.log(`   ❌ Erreurs:      ${errors}`)
  console.log('═══════════════════════════════════════════════════════════')

  console.log('\n🎯 PROCHAINES ÉTAPES:')
  console.log('   1. Ouvrez http://localhost:1337/admin')
  console.log('   2. Allez dans Content Manager > Formation')
  console.log('   3. Vous pouvez maintenant modifier toutes les formations!')
  console.log('\n📋 URLs des pages de formations:')
  formations.forEach(f => console.log(`   → http://localhost:3000/formations/${f.slug}`))
}

main()
