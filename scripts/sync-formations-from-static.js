/**
 * Script pour synchroniser les formations Strapi avec les données statiques complètes
 * Met à jour les champs manquants (shortDesc, duree, niveau, rncp, objectifs, debouches, etc.)
 */

const STRAPI_URL = 'http://localhost:1337'

// Données complètes des formations
const formationsData = {
  'charge-affaires-batiment': {
    title: "Chargé(e) d'Affaires du Bâtiment",
    level: "Niveau 5 Européen (équivalent BAC+2)",
    rncp: "RNCP35503",
    shortDesc: "Formation conçue, validée et dispensée par des professionnels du BTP pour développer des compétences opérationnelles solides.",
    duree: "1 an en alternance (100%)",
    rythme: "595 heures en centre + 910 heures en entreprise",
    modalite: "Présentiel",
    cout: "Prise en charge",
    objectifs: ["Maîtriser la gestion commerciale et technique des affaires", "Développer et fidéliser un portefeuille clients", "Piloter les projets de construction"],
    debouches: ["Chargé d'affaires", "Technico-commercial BTP", "Responsable développement"],
    pageUrl: "http://localhost:3000/formations/charge-affaires-batiment"
  },
  'conducteur-travaux-batiment': {
    title: "Conducteur de Travaux – Bâtiment & Génie Civil",
    level: "Niveau 5 (équivalent Bac+2)",
    rncp: "RNCP40217",
    shortDesc: "Formation professionnalisante pour devenir conducteur de travaux capable de préparer, gérer et coordonner un chantier de construction dans sa globalité.",
    duree: "1 an",
    rythme: "595 heures",
    modalite: "Présentiel",
    cout: "Prise en charge",
    objectifs: ["Préparer et organiser un chantier", "Gérer les équipes et les sous-traitants", "Assurer le suivi technique et financier"],
    debouches: ["Conducteur de travaux", "Chef de chantier", "Responsable travaux"],
    pageUrl: "http://localhost:3000/formations/conducteur-travaux-batiment"
  },
  'conducteur-travaux-tp-alternance': {
    title: "Conducteur de Travaux, Travaux Publics",
    level: "Niveau 5 (Equivalent Bac +2)",
    rncp: "RNCP41466",
    shortDesc: "Formation professionnalisante pour devenir conducteur de travaux publics capable de préparer, coordonner et piloter des chantiers d'infrastructures.",
    duree: "1 an",
    rythme: "17 semaines à l'école, 35 semaines en entreprise",
    modalite: "Présentiel",
    cout: "9548€ HT (prise en charge OPCO)",
    objectifs: ["Planifier, organiser et suivre l'exécution de chantiers de travaux publics", "Gérer les budgets, contrats, achats et marges financières", "Superviser les équipes sur le terrain", "Veiller au respect des délais et normes de sécurité"],
    debouches: ["Conducteur de travaux TP", "Chef de chantier TP", "Coordinateur de travaux", "Chargé d'études techniques"],
    pageUrl: "http://localhost:3000/formations/conducteur-travaux-tp-alternance"
  },
  'chef-chantier-vrd': {
    title: "Chef de Chantier Voirie et Réseaux Divers",
    level: "Niveau 5 (équivalent BAC+2)",
    rncp: "RNCP41368",
    shortDesc: "Formation professionnalisante pour devenir chef de chantier VRD capable de préparer, diriger et clôturer l'exécution de chantiers de voirie et réseaux divers.",
    duree: "1 an",
    rythme: "560 heures",
    modalite: "Présentiel",
    cout: "Prise en charge",
    objectifs: ["Préparer l'exécution des travaux VRD", "Diriger les travaux de voirie", "Gérer les réseaux divers"],
    debouches: ["Chef de chantier VRD", "Conducteur de travaux VRD", "Responsable travaux publics"],
    pageUrl: "http://localhost:3000/formations/chef-chantier-vrd"
  },
  'responsable-travaux-bim': {
    title: "Double Parcours Responsable Travaux Bâtiment & Coordinateur BIM du Bâtiment",
    level: "Niveau 6 (équivalent Bac+3)",
    rncp: "RNCP39408",
    shortDesc: "Formation professionnalisante visant à former des professionnels du BTP capables de conduire des chantiers de construction tout en intégrant les outils numériques collaboratifs du BIM.",
    duree: "1 an",
    rythme: "700 heures",
    modalite: "Présentiel",
    cout: "Prise en charge",
    objectifs: ["Maîtriser la conduite de travaux bâtiment", "Coordonner les projets en BIM", "Intégrer les outils numériques collaboratifs"],
    debouches: ["Responsable travaux", "Coordinateur BIM", "Chef de projet construction"],
    pageUrl: "http://localhost:3000/formations/responsable-travaux-bim"
  },
  'chef-projets-btp': {
    title: "Chef de Projets BTP",
    level: "Niveau 7 (équivalent Bac+5)",
    rncp: "En cours d'enregistrement",
    shortDesc: "Formation professionnalisante préparant des experts capables de gérer des projets de construction complexes et innovants, en intégrant les enjeux contemporains du BTP.",
    duree: "2 ans",
    rythme: "1393 heures",
    modalite: "Présentiel",
    cout: "Prise en charge",
    objectifs: ["Piloter des projets de construction complexes", "Manager des équipes pluridisciplinaires", "Intégrer les enjeux RSE et développement durable"],
    debouches: ["Chef de projets BTP", "Directeur de travaux", "Responsable d'agence"],
    pageUrl: "http://localhost:3000/formations/chef-projets-btp"
  },
  'conducteur-travaux-vrd-1an': {
    title: "Conducteur de Travaux en VRD - Cursus 1 an",
    level: "BAC+3 - Niveau 6",
    rncp: "RNCP41369",
    shortDesc: "Formation intensive pour former des professionnels capables de gérer l'ensemble des étapes d'un chantier VRD, de la préparation à la réception des ouvrages.",
    duree: "1 an",
    rythme: "560 heures en centre",
    modalite: "Présentiel",
    cout: "Prise en charge",
    objectifs: ["Préparer et organiser un chantier VRD", "Gérer les ressources humaines et matérielles", "Assurer la qualité et la sécurité"],
    debouches: ["Conducteur de travaux VRD", "Chef de chantier", "Responsable d'exploitation"],
    pageUrl: "http://localhost:3000/formations/conducteur-travaux-vrd-1an"
  },
  'conducteur-travaux-vrd-2ans': {
    title: "Conducteur de Travaux Voirie et Réseaux Divers - Cursus 2 ans",
    level: "BAC+3 - Niveau 6",
    rncp: "RNCP41369",
    shortDesc: "Formation approfondie pour maîtriser tous les aspects du métier de conducteur de travaux VRD.",
    duree: "2 ans",
    rythme: "1400 heures en centre + 2100 heures en entreprise",
    modalite: "Présentiel",
    cout: "Prise en charge",
    objectifs: ["Maîtriser la gestion complète de chantiers VRD", "Développer des compétences managériales", "Gérer les aspects techniques et financiers"],
    debouches: ["Conducteur de travaux VRD", "Directeur de travaux", "Responsable d'agence TP"],
    pageUrl: "http://localhost:3000/formations/conducteur-travaux-vrd-2ans"
  },
  'charge-affaires-reconversion': {
    title: "Chargé d'affaires du bâtiment - Professionnels en reconversion",
    level: "Niveau 5 (équivalent Bac+2)",
    rncp: "RNCP35503",
    shortDesc: "Une formation pensée pour les professionnels en reconversion.",
    duree: "7 mois",
    rythme: "595 heures",
    modalite: "Présentiel",
    cout: "Prise en charge",
    objectifs: ["Acquérir les fondamentaux du BTP", "Développer des compétences commerciales", "Maîtriser la gestion de projets"],
    debouches: ["Chargé d'affaires", "Commercial BTP", "Responsable développement"],
    pageUrl: "http://localhost:3000/formations/charge-affaires-reconversion"
  },
  'conducteur-travaux-reconversion': {
    title: "Conducteur de Travaux Bâtiment et Génie Civil - Professionnels en reconversion",
    level: "Bac+2 - Niveau 5",
    rncp: "RNCP40217",
    shortDesc: "Une formation pensée pour les professionnels en reconversion.",
    duree: "7 mois",
    rythme: "595 heures",
    modalite: "Présentiel",
    cout: "Prise en charge",
    objectifs: ["Maîtriser la conduite de chantier", "Gérer les équipes terrain", "Assurer le suivi technique et administratif"],
    debouches: ["Conducteur de travaux", "Chef de chantier", "Assistant travaux"],
    pageUrl: "http://localhost:3000/formations/conducteur-travaux-reconversion"
  },
  'conducteur-travaux-publics-reconversion': {
    title: "Conducteur de Travaux Publics - Professionnels en reconversion",
    level: "BAC+2 - Niveau 5",
    rncp: "RNCP38549",
    shortDesc: "Une formation pensée pour les professionnels en reconversion vers les métiers concrets et porteurs du secteur des travaux publics.",
    duree: "7 mois",
    rythme: "595 heures (5 mois en centre + 2 mois de stage)",
    modalite: "100% présentiel",
    cout: "15 € HT/heure",
    objectifs: ["Planifier, organiser et suivre l'exécution de chantiers de travaux publics", "Gérer les budgets, contrats, achats et marges financières", "Superviser les équipes sur le terrain", "Veiller au respect des délais et normes de sécurité"],
    debouches: ["Conducteur de travaux TP", "Chef de chantier TP", "Coordinateur de travaux", "Chargé d'études techniques"],
    pageUrl: "http://localhost:3000/formations/conducteur-travaux-publics-reconversion"
  }
}

async function main() {
  console.log('🔄 Synchronisation des formations avec les données statiques...\n')

  // Récupérer toutes les formations Strapi
  const response = await fetch(`${STRAPI_URL}/api/formations?pagination[pageSize]=100`)
  const data = await response.json()
  const formations = data.data || []

  console.log(`📋 ${formations.length} formations dans Strapi\n`)

  let updated = 0
  let notFound = []

  for (const [slug, formationData] of Object.entries(formationsData)) {
    const strapiFormation = formations.find(f => f.attributes.slug === slug)
    
    if (!strapiFormation) {
      notFound.push(slug)
      continue
    }

    // Mettre à jour la formation
    const updateResponse = await fetch(`${STRAPI_URL}/api/formations/${strapiFormation.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: formationData })
    })

    if (updateResponse.ok) {
      console.log(`✅ ${slug}`)
      updated++
    } else {
      const error = await updateResponse.text()
      console.log(`❌ ${slug}: ${error.substring(0, 100)}`)
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log('📊 RÉSUMÉ')
  console.log('='.repeat(50))
  console.log(`Formations mises à jour: ${updated}/${Object.keys(formationsData).length}`)
  
  if (notFound.length > 0) {
    console.log(`\n⚠️ Formations non trouvées dans Strapi:`)
    notFound.forEach(s => console.log(`   - ${s}`))
  }

  console.log('\n✅ Synchronisation terminée!')
}

main().catch(console.error)
