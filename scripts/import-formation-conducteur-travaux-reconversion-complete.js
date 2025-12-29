/**
 * Script pour enrichir la formation Conducteur de Travaux Bâtiment & Génie Civil - Reconversion dans Strapi
 * Basé sur le fichier: Formations/Conducteur de Travaux Bâtiment et Génie Civil - Professionnels en reconversion.md
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${STRAPI_TOKEN}`
};

// Données complètes de la formation Conducteur de Travaux Reconversion
const formationConducteurTravauxReconversion = {
  slug: 'conducteur-travaux-reconversion',
  title: "Conducteur de Travaux Bâtiment & Génie Civil - Reconversion Professionnelle",
  level: "Niveau 5 (équivalent BAC+2)",
  rncp: "RNCP40217",
  rncpUrl: "https://www.francecompetences.fr/recherche/rncp/40217/",
  
  shortDesc: "Formation intensive de 7 mois pour professionnels en reconversion. Devenez Conducteur de Travaux capable de préparer, gérer et coordonner un chantier de construction dans sa globalité.",
  
  fullDesc: `Cette formation professionnalisante a pour but de former des conducteurs de travaux capables de préparer, gérer et coordonner un chantier de construction dans sa globalité. Elle vise à transmettre toutes les compétences techniques, juridiques, financières et organisationnelles nécessaires pour conduire un projet de construction ou de génie civil, de la phase d'étude à la livraison finale.

Une formation pensée pour les professionnels en reconversion, permettant une insertion rapide dans un secteur dynamique en recherche constante de profils qualifiés.`,

  metierDesc: `Le Conducteur de Travaux est le chef d'orchestre du chantier. Il assure la préparation, la coordination et le suivi d'exécution des projets de construction, aussi bien en bâtiment qu'en génie civil.

Ses missions principales incluent :
- La préparation technique, administrative et budgétaire des chantiers
- Le pilotage des travaux sur le terrain et la coordination des équipes
- La gestion financière des projets (études de prix, marges, achats)
- Le respect de la conformité réglementaire, sécurité et qualité
- La communication avec tous les intervenants du chantier`,

  objectifs: [
    "Préparer un chantier en maîtrisant les aspects techniques, administratifs et budgétaires",
    "Piloter les travaux sur le terrain, coordonner les équipes et gérer les aléas",
    "Assurer la gestion financière d'un projet (études de prix, marges, achats)",
    "Garantir la conformité réglementaire, la sécurité et la qualité des opérations",
    "Communiquer efficacement avec tous les intervenants du chantier"
  ],

  programme: [
    {
      titre: "Module 1 : Préparation & suivi de chantier",
      contenu: [
        "Planification des travaux",
        "Gestion des achats et approvisionnements",
        "Élaboration et suivi des budgets",
        "Organisation logistique du chantier"
      ]
    },
    {
      titre: "Module 2 : Coordination & réglementation",
      contenu: [
        "Pilotage TCE (Tous Corps d'État)",
        "Sécurité sur chantier et prévention des risques",
        "Droit de la construction et réglementation",
        "Normes environnementales et développement durable"
      ]
    },
    {
      titre: "Module 3 : Gestion technique & financière",
      contenu: [
        "Lecture de plans et documents techniques",
        "Utilisation d'AutoCAD et outils DAO",
        "Études de prix et métrés",
        "Gestion des marges et suivi des dépenses"
      ]
    },
    {
      titre: "Module 4 : Communication & leadership",
      contenu: [
        "Rédaction professionnelle et rapports de chantier",
        "Animation de réunions de chantier",
        "Rédaction de comptes-rendus",
        "Gestion d'équipe et management opérationnel"
      ]
    }
  ],

  debouches: [
    "Conducteur(trice) de travaux bâtiment",
    "Conducteur(trice) de travaux génie civil",
    "Coordinateur(trice) de chantier",
    "Responsable de chantier",
    "Chef de chantier",
    "Chargé(e) d'études techniques",
    "Assistant(e) OPC (Ordonnancement Pilotage Coordination)",
    "Assistant(e) maître d'œuvre"
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
  dateEnregistrement: "Enregistré au RNCP sous le n°40217",

  tauxReussite: "93%",
  tauxInsertion: "95%",

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

  publicCible: "Professionnels en reconversion souhaitant devenir conducteur de travaux dans le secteur du BTP, avec ou sans expérience préalable dans le secteur",

  contact: {
    telephone: "01 85 09 71 06",
    email: "inscription@cma-education.com",
    adresse: "Champs-sur-Marne (77)"
  },

  entreprisesPartenaires: [
    "Vinci Construction",
    "Bouygues Bâtiment",
    "Eiffage Construction",
    "Spie Batignolles",
    "+250 entreprises BTP partenaires"
  ],

  // Spécificités reconversion
  specificiteReconversion: {
    accompagnement: "Accompagnement personnalisé pour la reconversion",
    stage: "Stage pratique de 2 mois en entreprise inclus",
    financements: ["CPF", "Pôle emploi", "Transition Pro", "Aides régionales", "Plan de développement des compétences"]
  },

  // SEO
  seoTitle: "Formation Conducteur de Travaux Reconversion | CMA Education",
  seoDescription: "Formation reconversion professionnelle Conducteur de Travaux Bâtiment en 7 mois. Aucun diplôme requis, 95% d'insertion. Financement CPF, Pôle emploi, Transition Pro.",
  seoKeywords: [
    "formation reconversion conducteur travaux",
    "conducteur travaux bâtiment reconversion",
    "formation CPF BTP",
    "reconversion professionnelle construction",
    "formation adulte conducteur travaux",
    "RNCP40217",
    "formation Pôle emploi BTP"
  ],

  isActive: true,
  ordre: 9
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
  console.log('🎓 Enrichissement Formation Conducteur de Travaux - Reconversion');
  console.log('='.repeat(70));
  console.log('📡 URL Strapi:', STRAPI_URL);
  
  if (!STRAPI_TOKEN) {
    console.log('\n❌ STRAPI_API_TOKEN non défini');
    console.log('Usage: $env:STRAPI_API_TOKEN="votre-token"; node scripts/import-formation-conducteur-travaux-reconversion-complete.js');
    return;
  }

  // Rechercher la formation existante
  console.log('\n🔍 Recherche de la formation existante...');
  const existing = await findFormationBySlug(formationConducteurTravauxReconversion.slug);

  if (existing) {
    console.log(`✅ Formation trouvée (ID: ${existing.id})`);
    console.log('📝 Mise à jour avec les données enrichies...');
    
    const success = await updateFormation(existing.id, formationConducteurTravauxReconversion);
    if (success) {
      console.log('✅ Formation mise à jour avec succès !');
    } else {
      console.log('❌ Erreur lors de la mise à jour');
    }
  } else {
    console.log('⚠️ Formation non trouvée, création...');
    const success = await createFormation(formationConducteurTravauxReconversion);
    if (success) {
      console.log('✅ Formation créée avec succès !');
    } else {
      console.log('❌ Erreur lors de la création');
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log('📋 Données importées:');
  console.log(`   • Titre: ${formationConducteurTravauxReconversion.title}`);
  console.log(`   • Niveau: ${formationConducteurTravauxReconversion.level}`);
  console.log(`   • RNCP: ${formationConducteurTravauxReconversion.rncp}`);
  console.log(`   • Durée: ${formationConducteurTravauxReconversion.duree}`);
  console.log(`   • Volume horaire: ${formationConducteurTravauxReconversion.volumeHoraire}`);
  console.log(`   • Rythme: ${formationConducteurTravauxReconversion.rythme}`);
  console.log(`   • Objectifs: ${formationConducteurTravauxReconversion.objectifs.length} objectifs`);
  console.log(`   • Programme: ${formationConducteurTravauxReconversion.programme.length} modules`);
  console.log(`   • Débouchés: ${formationConducteurTravauxReconversion.debouches.length} métiers`);
  console.log(`   • Prérequis: ${formationConducteurTravauxReconversion.prerequis.length} conditions`);
  console.log(`   • Évaluation: ${formationConducteurTravauxReconversion.evaluation.length} modalités`);
  console.log(`   • Poursuites: ${formationConducteurTravauxReconversion.poursuiteEtudes.length} formations`);
  console.log(`   • Taux insertion: ${formationConducteurTravauxReconversion.tauxInsertion}`);
  console.log(`   • Financement: ${formationConducteurTravauxReconversion.financement}`);
}

main().catch(console.error);
