/**
 * Script pour enrichir la formation Conducteur de Travaux Bâtiment & Génie Civil dans Strapi
 * Basé sur le fichier: Formations/Conducteur de Travaux – Bâtiment & Génie Civil .md
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${STRAPI_TOKEN}`
};

// Données complètes de la formation Conducteur de Travaux Bâtiment & Génie Civil
const formationConducteurTravaux = {
  slug: 'conducteur-travaux-batiment',
  title: "Conducteur de Travaux Bâtiment & Génie Civil",
  level: "Niveau 5 (équivalent BAC+2)",
  rncp: "RNCP40217",
  rncpUrl: "https://www.francecompetences.fr/recherche/rncp/40217/",
  
  shortDesc: "Formation conducteur de travaux en alternance BTP formant des professionnels capables de préparer, gérer et coordonner un chantier de construction dans sa globalité.",
  
  fullDesc: `Cette formation professionnalisante a pour but de vous former en tant que conducteur de travaux capables de préparer, gérer et coordonner un chantier de construction dans sa globalité. Elle vise à transmettre toutes les compétences techniques, juridiques, financières et organisationnelles nécessaires pour conduire un projet de construction ou de génie civil, de la phase d'étude à la livraison finale.

Le conducteur de travaux est le chef d'orchestre du chantier. Il assure la préparation, la coordination et le suivi d'exécution des projets de construction, aussi bien en bâtiment qu'en génie civil. Ce métier polyvalent requiert des compétences en gestion de projet, coordination d'équipes et maîtrise technique.`,

  metierDesc: `Le métier de Conducteur de Travaux est au cœur de l'exécution des projets de construction. Ce professionnel polyvalent assure la gestion complète des chantiers, de la préparation à la livraison finale.

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
        "Planification et organisation du chantier",
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

  duree: "1 an",
  volumeHoraire: "595 heures",
  repartition: "17 semaines à l'école / 35 semaines en entreprise",
  rythme: "Alternance : 17 semaines école + 35 semaines entreprise",
  modalite: "100% présentiel",
  typeContrat: "Apprentissage, Professionnalisation ou Période de Reconversion",
  effectif: "20 maximum par session",

  prerequis: [
    "Être titulaire du baccalauréat",
    "Ou avoir un niveau bac avec au moins 3 ans d'expérience dans le BTP ou dans un poste managérial"
  ],

  cout: "8000€ HT",
  financement: "100% prise en charge par OPCO et entreprise - Aucun frais pour l'alternant",

  certificateur: "Ministère du Travail",
  dateEnregistrement: "Enregistré au RNCP sous le n°40217 en date du 21/10/2025",

  tauxReussite: "94%",
  tauxInsertion: "96%",

  evaluation: [
    "Contrôle continu en cours de formation",
    "Épreuve de synthèse (écrite + orale)",
    "Dossier professionnel (CRAMP)",
    "Entretien final avec jury à partir des productions du candidat"
  ],

  poursuiteEtudes: [
    "Conducteur de Travaux en Voirie et Réseaux Divers (BAC+3)",
    "Double Parcours Responsable Travaux Bâtiment / Coordinateur BIM du bâtiment (BAC+3)",
    "Autres formations en conduite de travaux, ingénierie ou management de projet"
  ],

  publicCible: "Titulaires du baccalauréat ou professionnels avec expérience souhaitant évoluer vers un poste de conducteur de travaux dans le secteur du BTP",

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
    "+250 entreprises BTP partenaires"
  ],

  // SEO
  seoTitle: "Formation Conducteur de Travaux Bâtiment & Génie Civil BAC+2 en Alternance | CMA Education",
  seoDescription: "Formation conducteur de travaux bâtiment en alternance BTP. RNCP40217, 96% d'insertion. Devenez chef d'orchestre de chantier. Financement 100% OPCO.",
  seoKeywords: [
    "formation conducteur de travaux",
    "alternance BTP",
    "formation bâtiment BAC+2",
    "RNCP40217",
    "formation génie civil",
    "conducteur travaux alternance",
    "formation BTP Île-de-France"
  ],

  isActive: true,
  ordre: 2
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
  console.log('🎓 Enrichissement Formation Conducteur de Travaux Bâtiment & Génie Civil');
  console.log('='.repeat(70));
  console.log('📡 URL Strapi:', STRAPI_URL);
  
  if (!STRAPI_TOKEN) {
    console.log('\n❌ STRAPI_API_TOKEN non défini');
    console.log('Usage: $env:STRAPI_API_TOKEN="votre-token"; node scripts/import-formation-conducteur-travaux-complete.js');
    return;
  }

  // Rechercher la formation existante
  console.log('\n🔍 Recherche de la formation existante...');
  const existing = await findFormationBySlug(formationConducteurTravaux.slug);

  if (existing) {
    console.log(`✅ Formation trouvée (ID: ${existing.id})`);
    console.log('📝 Mise à jour avec les données enrichies...');
    
    const success = await updateFormation(existing.id, formationConducteurTravaux);
    if (success) {
      console.log('✅ Formation mise à jour avec succès !');
    } else {
      console.log('❌ Erreur lors de la mise à jour');
    }
  } else {
    console.log('⚠️ Formation non trouvée, création...');
    const success = await createFormation(formationConducteurTravaux);
    if (success) {
      console.log('✅ Formation créée avec succès !');
    } else {
      console.log('❌ Erreur lors de la création');
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log('📋 Données importées:');
  console.log(`   • Titre: ${formationConducteurTravaux.title}`);
  console.log(`   • RNCP: ${formationConducteurTravaux.rncp}`);
  console.log(`   • Durée: ${formationConducteurTravaux.duree}`);
  console.log(`   • Volume horaire: ${formationConducteurTravaux.volumeHoraire}`);
  console.log(`   • Objectifs: ${formationConducteurTravaux.objectifs.length} objectifs`);
  console.log(`   • Programme: ${formationConducteurTravaux.programme.length} modules`);
  console.log(`   • Débouchés: ${formationConducteurTravaux.debouches.length} métiers`);
  console.log(`   • Prérequis: ${formationConducteurTravaux.prerequis.length} conditions`);
  console.log(`   • Évaluation: ${formationConducteurTravaux.evaluation.length} modalités`);
  console.log(`   • Poursuites: ${formationConducteurTravaux.poursuiteEtudes.length} formations`);
  console.log(`   • Taux insertion: ${formationConducteurTravaux.tauxInsertion}`);
}

main().catch(console.error);
