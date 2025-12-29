/**
 * Script pour enrichir la formation Chargé d'Affaires du Bâtiment - Reconversion dans Strapi
 * Basé sur le fichier: Formations/Chargé d'affaires du bâtiment - Professionnels en reconversion.md
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${STRAPI_TOKEN}`
};

// Données complètes de la formation Chargé d'Affaires Reconversion
const formationChargeAffairesReconversion = {
  slug: 'charge-affaires-reconversion',
  title: "Chargé(e) d'Affaires du Bâtiment - Reconversion Professionnelle",
  level: "Niveau 5 (équivalent BAC+2)",
  rncp: "RNCP35503",
  rncpUrl: "https://www.francecompetences.fr/recherche/rncp/35503/",
  
  shortDesc: "Formation intensive de 7 mois pour professionnels en reconversion. Devenez Chargé d'Affaires du Bâtiment et accédez à un rôle stratégique en gestion de projet et relation client.",
  
  fullDesc: `Ce parcours est conçu pour les professionnels du bâtiment souhaitant accéder à un rôle stratégique en gestion de projet et relation client. Que vous ayez de l'expérience à valoriser (VAE) ou que vous envisagiez une reconversion, CMA vous forme à un métier clé du secteur : Chargé d'Affaires du Bâtiment.

Une formation pensée pour les professionnels en reconversion, combinant expertise technique et développement commercial pour une insertion rapide dans le secteur du BTP.`,

  metierDesc: `Le Chargé d'Affaires du Bâtiment est l'interface entre le client et les équipes techniques. Ce professionnel polyvalent assure la gestion complète des projets de construction, de la prospection commerciale à la livraison finale.

Ses missions principales incluent :
- L'analyse des besoins clients et la réalisation d'études de faisabilité
- L'élaboration d'offres commerciales compétitives
- Le pilotage technique et financier des chantiers
- La coordination des équipes et sous-traitants
- Le suivi de la satisfaction client et la fidélisation`,

  objectifs: [
    "Comprendre et analyser un projet de construction ou rénovation",
    "Réaliser une étude de faisabilité technique et financière",
    "Concevoir une offre commerciale adaptée",
    "Piloter les travaux sur le terrain, gérer les imprévus et optimiser les délais",
    "Communiquer efficacement avec les clients, fournisseurs, artisans et maîtres d'œuvre",
    "Suivre la rentabilité des opérations et veiller à la satisfaction client"
  ],

  programme: [
    {
      titre: "Module 1 : Techniques de construction & lecture de plans",
      contenu: [
        "Mise à jour des connaissances TCE (Tous Corps d'État)",
        "Lecture avancée de plans techniques",
        "Normes qualité et sécurité",
        "Utilisation d'AutoCAD et outils DAO"
      ]
    },
    {
      titre: "Module 2 : Études de prix & pilotage financier",
      contenu: [
        "Chiffrage précis des projets",
        "Optimisation des achats",
        "Gestion de la rentabilité",
        "Suivi budgétaire et financier"
      ]
    },
    {
      titre: "Module 3 : Gestion de projet & coordination de chantier",
      contenu: [
        "Planification avec MS Project",
        "Supervision de chantier",
        "Gestion d'équipe et coordination",
        "Suivi des travaux et respect des délais"
      ]
    },
    {
      titre: "Module 4 : Relation client & communication professionnelle",
      contenu: [
        "Prospection et développement commercial",
        "Négociation commerciale",
        "Rédaction de documents techniques",
        "Animation de réunions et gestion relation client"
      ]
    }
  ],

  debouches: [
    "Chargé(e) d'affaires tous corps d'état",
    "Conducteur(trice) de travaux",
    "Technico-commercial(e) en BTP",
    "Coordinateur(trice) OPC",
    "Assistant(e) chef de projet en bureau d'études",
    "Responsable d'opérations (avec expérience)",
    "Chargé(e) d'affaires en maîtrise d'œuvre (évolution)"
  ],

  duree: "7 mois",
  volumeHoraire: "595 heures",
  repartition: "5 mois en centre + 2 mois de stage pratique en entreprise",
  rythme: "Temps plein - 35h/semaine",
  modalite: "100% présentiel à Champs-sur-Marne",
  typeContrat: "Formation continue / Reconversion professionnelle",
  effectif: "20 maximum par session",

  prerequis: [
    "Aucun diplôme requis",
    "L'envie d'apprendre et la motivation de construire un avenir professionnel concret"
  ],

  cout: "15€ HT/heure",
  financement: "CPF, Pôle emploi, Transition Pro, aides régionales, Plan de développement des compétences",

  certificateur: "Ministère du Travail",
  dateEnregistrement: "Enregistré au RNCP sous le n°35503",

  tauxReussite: "94%",
  tauxInsertion: "96%",

  evaluation: [
    "Contrôle continu en cours de formation",
    "Épreuve de synthèse (écrite + orale)",
    "Dossier professionnel (CRAMP)",
    "Entretien final avec jury à partir des productions du candidat",
    "4 projets tutorés concrets"
  ],

  poursuiteEtudes: [
    "Conducteur de Travaux Voirie et Réseaux Divers (BAC+3)",
    "Double Parcours Responsable Travaux Bâtiment / Coordinateur BIM du bâtiment (BAC+3)",
    "Autres formations en conduite de travaux, ingénierie ou management de projet"
  ],

  publicCible: "Professionnels en reconversion souhaitant accéder à un rôle stratégique dans le BTP, avec ou sans expérience préalable dans le secteur",

  contact: {
    telephone: "01 85 09 71 06",
    email: "inscription@cma-education.com",
    adresse: "Champs-sur-Marne (77)"
  },

  entreprisesPartenaires: [
    "Vinci",
    "Bouygues Construction",
    "Eiffage",
    "Spie Batignolles",
    "Bureaux d'études BTP",
    "+250 entreprises BTP partenaires"
  ],

  // Spécificités reconversion
  specificiteReconversion: {
    accompagnement: "Accompagnement personnalisé pour la reconversion",
    vae: "Possibilité de valoriser l'expérience via VAE",
    stage: "Stage pratique de 2 mois en entreprise inclus",
    financements: ["CPF", "Pôle emploi", "Transition Pro", "Aides régionales", "Plan de développement des compétences"]
  },

  // SEO
  seoTitle: "Formation Chargé d'Affaires Bâtiment Reconversion | CMA Education",
  seoDescription: "Formation reconversion professionnelle Chargé d'Affaires Bâtiment en 7 mois. Aucun diplôme requis, 96% d'insertion. Financement CPF, Pôle emploi, Transition Pro.",
  seoKeywords: [
    "formation reconversion BTP",
    "chargé d'affaires bâtiment reconversion",
    "formation CPF BTP",
    "reconversion professionnelle construction",
    "formation adulte BTP",
    "RNCP35503",
    "formation Pôle emploi BTP"
  ],

  isActive: true,
  ordre: 8
};

async function findFormationBySlug(slug) {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/formations?filters[slug][$eq]=${slug}`,
      { headers }
    );
    if (!response.ok) return null;
    const data = await response.json();
    return data.data?.[0] || null;
  } catch (error) {
    console.log('Erreur recherche formation:', error.message);
    return null;
  }
}

async function updateFormation(id, data) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/formations/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ data })
    });
    return response.ok;
  } catch (error) {
    console.log('Erreur mise à jour:', error.message);
    return false;
  }
}

async function createFormation(data) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/formations`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ 
        data: {
          ...data,
          publishedAt: new Date().toISOString()
        }
      })
    });
    return response.ok;
  } catch (error) {
    console.log('Erreur création:', error.message);
    return false;
  }
}

async function main() {
  console.log('🎓 Enrichissement Formation Chargé d\'Affaires Bâtiment - Reconversion');
  console.log('='.repeat(70));
  console.log('📡 URL Strapi:', STRAPI_URL);
  
  if (!STRAPI_TOKEN) {
    console.log('\n❌ STRAPI_API_TOKEN non défini');
    console.log('Usage: $env:STRAPI_API_TOKEN="votre-token"; node scripts/import-formation-charge-affaires-reconversion-complete.js');
    return;
  }

  // Rechercher la formation existante
  console.log('\n🔍 Recherche de la formation existante...');
  const existing = await findFormationBySlug(formationChargeAffairesReconversion.slug);

  if (existing) {
    console.log(`✅ Formation trouvée (ID: ${existing.id})`);
    console.log('📝 Mise à jour avec les données enrichies...');
    
    const success = await updateFormation(existing.id, formationChargeAffairesReconversion);
    if (success) {
      console.log('✅ Formation mise à jour avec succès !');
    } else {
      console.log('❌ Erreur lors de la mise à jour');
    }
  } else {
    console.log('⚠️ Formation non trouvée, création...');
    const success = await createFormation(formationChargeAffairesReconversion);
    if (success) {
      console.log('✅ Formation créée avec succès !');
    } else {
      console.log('❌ Erreur lors de la création');
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log('📋 Données importées:');
  console.log(`   • Titre: ${formationChargeAffairesReconversion.title}`);
  console.log(`   • Niveau: ${formationChargeAffairesReconversion.level}`);
  console.log(`   • RNCP: ${formationChargeAffairesReconversion.rncp}`);
  console.log(`   • Durée: ${formationChargeAffairesReconversion.duree}`);
  console.log(`   • Volume horaire: ${formationChargeAffairesReconversion.volumeHoraire}`);
  console.log(`   • Rythme: ${formationChargeAffairesReconversion.rythme}`);
  console.log(`   • Objectifs: ${formationChargeAffairesReconversion.objectifs.length} objectifs`);
  console.log(`   • Programme: ${formationChargeAffairesReconversion.programme.length} modules`);
  console.log(`   • Débouchés: ${formationChargeAffairesReconversion.debouches.length} métiers`);
  console.log(`   • Prérequis: ${formationChargeAffairesReconversion.prerequis.length} conditions`);
  console.log(`   • Évaluation: ${formationChargeAffairesReconversion.evaluation.length} modalités`);
  console.log(`   • Poursuites: ${formationChargeAffairesReconversion.poursuiteEtudes.length} formations`);
  console.log(`   • Taux insertion: ${formationChargeAffairesReconversion.tauxInsertion}`);
  console.log(`   • Financement: ${formationChargeAffairesReconversion.financement}`);
}

main().catch(console.error);
