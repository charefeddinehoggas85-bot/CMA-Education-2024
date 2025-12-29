/**
 * Script pour CRÉER la formation Conducteur de Travaux Publics - Reconversion dans Strapi
 * Basé sur le fichier: Formations/Conducteur de Travaux Publics - Professionnels en reconversion.md
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${STRAPI_TOKEN}`
};

// Données complètes de la formation Conducteur de Travaux Publics Reconversion
const formationConducteurTravauxPublicsReconversion = {
  slug: 'conducteur-travaux-publics-reconversion',
  title: "Conducteur de Travaux Publics - Reconversion Professionnelle",
  level: "Niveau 5 (équivalent BAC+2)",
  rncp: "RNCP38549",
  rncpUrl: "https://www.francecompetences.fr/recherche/rncp/38549/",
  
  shortDesc: "Formation intensive de 7 mois pour professionnels en reconversion. Devenez Conducteur de Travaux Publics et accédez à des postes clés dans le secteur des infrastructures.",
  
  fullDesc: `Chez Construction Management Academy, nous accompagnons les personnes souhaitant évoluer et se reconvertir vers des métiers concrets et porteurs du secteur des travaux publics. Que vous soyez salarié(e), demandeur d'emploi, artisan ou professionnel en activité, cette formation vous permet de transformer votre expérience en compétence certifiée, grâce à un parcours professionnalisant.

Une formation pensée pour les professionnels en reconversion, permettant une insertion rapide dans un secteur dynamique en recherche constante de profils qualifiés.`,

  metierDesc: `Le Conducteur de Travaux Publics est le chef d'orchestre des chantiers d'infrastructures. Il assure la planification, l'organisation et le suivi d'exécution des projets de travaux publics (voirie, réseaux, terrassement, ouvrages d'art).

Ses missions principales incluent :
- La planification et l'organisation des chantiers de travaux publics
- La gestion des budgets, contrats, achats et marges financières
- La supervision des équipes et la coordination des corps de métier
- Le respect des délais, normes de sécurité, qualité et environnement
- La communication avec riverains, prestataires et autorités locales`,

  objectifs: [
    "Planifier, organiser et suivre l'exécution de chantiers de travaux publics",
    "Gérer les budgets, contrats, achats et marges financières d'un projet",
    "Superviser les équipes sur le terrain et coordonner les différents corps de métier",
    "Veiller au respect des délais, des normes de sécurité, de qualité et des enjeux environnementaux",
    "Assurer la communication avec les riverains, les prestataires, les autorités locales et les donneurs d'ordre"
  ],

  programme: [
    {
      titre: "Module 1 : Techniques des travaux publics",
      contenu: [
        "Terrassement et fondations",
        "Voirie et réseaux divers (VRD)",
        "Ouvrages d'art",
        "DAO/CAO et plans topographiques",
        "Techniques spécifiques TP"
      ]
    },
    {
      titre: "Module 2 : Gestion financière & réglementaire",
      contenu: [
        "Étude de prix TP",
        "Gestion des marges et DGD",
        "Droit des marchés publics",
        "Qualité et sécurité (AIPR)",
        "Enjeux environnementaux"
      ]
    },
    {
      titre: "Module 3 : Préparation et conduite de chantier",
      contenu: [
        "Élaboration des budgets",
        "Gestion des plannings",
        "Suivi de l'exécution",
        "Gestion des imprévus",
        "Coordination des intervenants"
      ]
    },
    {
      titre: "Module 4 : Communication & coordination",
      contenu: [
        "Animation de réunions de chantier",
        "Communication écrite et orale",
        "Gestion des relations avec les acteurs du chantier",
        "Relations avec les riverains et autorités",
        "Reporting et comptes-rendus"
      ]
    }
  ],

  debouches: [
    "Conducteur(trice) de travaux TP",
    "Chef de chantier TP",
    "Coordinateur de travaux",
    "Chargé(e) d'études techniques en bureau d'études",
    "Assistant(e) maître d'œuvre TP",
    "Responsable de chantier TP"
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
  dateEnregistrement: "Enregistré au RNCP sous le n°38549",

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
    "Responsable Travaux – Parcours Travaux Publics (CMA)",
    "Double Parcours Responsable Travaux Bâtiment / Coordinateur BIM du Bâtiment (BAC+3)",
    "Passerelles vers écoles spécialisées en ingénierie ou management de projet BTP"
  ],

  publicCible: "Salariés, demandeurs d'emploi, artisans ou professionnels en activité souhaitant se reconvertir vers le secteur des travaux publics",

  contact: {
    telephone: "01 89 70 60 52",
    email: "inscription.academy@cma-education.com",
    adresse: "Champs-sur-Marne (77)"
  },

  entreprisesPartenaires: [
    "Eurovia",
    "Colas",
    "Eiffage Route",
    "Bouygues TP",
    "NGE",
    "+200 entreprises TP partenaires"
  ],

  // Spécificités reconversion
  specificiteReconversion: {
    accompagnement: "Accompagnement personnalisé pour la reconversion",
    stage: "Stage pratique de 2 mois en entreprise inclus",
    financements: ["CPF", "Pôle emploi", "Transition Pro", "Aides régionales", "Plan de développement des compétences"]
  },

  // Catégorie reconversion
  category: "reconversion",

  // SEO
  seoTitle: "Formation Conducteur de Travaux Publics Reconversion | CMA Education",
  seoDescription: "Formation reconversion professionnelle Conducteur de Travaux Publics en 7 mois. Aucun diplôme requis, 96% d'insertion. Financement CPF, Pôle emploi, Transition Pro.",
  seoKeywords: [
    "formation reconversion travaux publics",
    "conducteur travaux TP reconversion",
    "formation CPF travaux publics",
    "reconversion professionnelle TP",
    "formation adulte conducteur travaux",
    "RNCP38549",
    "formation Pôle emploi TP"
  ],

  pageUrl: "http://localhost:3000/formations/conducteur-travaux-publics-reconversion",

  isActive: true,
  ordre: 10
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

async function findCategoryBySlug(slug) {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/formation-categories?filters[slug][$eq]=${slug}`,
      { headers }
    );
    if (!response.ok) return null;
    const data = await response.json();
    return data.data?.[0] || null;
  } catch (error) {
    console.log('Erreur recherche catégorie:', error.message);
    return null;
  }
}

async function createFormation(data) {
  try {
    // Retirer les champs qui ne sont pas dans le schema Strapi
    const { category, specificiteReconversion, ...cleanData } = data;
    
    const formationData = {
      ...cleanData,
      publishedAt: new Date().toISOString()
    };

    const response = await fetch(`${STRAPI_URL}/api/formations`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ data: formationData })
    });
    
    if (!response.ok) {
      const error = await response.json();
      console.log('Erreur API:', JSON.stringify(error, null, 2));
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.log('Erreur création:', error.message);
    return null;
  }
}

async function updateFormation(id, data) {
  try {
    // Retirer les champs qui ne sont pas dans le schema Strapi
    const { category, specificiteReconversion, ...cleanData } = data;

    const response = await fetch(`${STRAPI_URL}/api/formations/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ data: cleanData })
    });
    return response.ok;
  } catch (error) {
    console.log('Erreur mise à jour:', error.message);
    return false;
  }
}

async function main() {
  console.log('🎓 Création Formation Conducteur de Travaux Publics - Reconversion');
  console.log('='.repeat(70));
  console.log('📡 URL Strapi:', STRAPI_URL);
  
  if (!STRAPI_TOKEN) {
    console.log('\n❌ STRAPI_API_TOKEN non défini');
    console.log('Usage: $env:STRAPI_API_TOKEN="votre-token"; node scripts/create-formation-conducteur-travaux-publics-reconversion.js');
    return;
  }

  // Rechercher la catégorie reconversion
  console.log('\n🔍 Recherche de la catégorie "reconversion"...');
  const category = await findCategoryBySlug('reconversion');
  let categoryId = null;
  
  if (category) {
    categoryId = category.id;
    console.log(`✅ Catégorie trouvée (ID: ${categoryId})`);
  } else {
    console.log('⚠️ Catégorie "reconversion" non trouvée, la formation sera créée sans catégorie');
  }

  // Vérifier si la formation existe déjà
  console.log('\n🔍 Vérification si la formation existe déjà...');
  const existing = await findFormationBySlug(formationConducteurTravauxPublicsReconversion.slug);

  if (existing) {
    console.log(`✅ Formation existante trouvée (ID: ${existing.id})`);
    console.log('📝 Mise à jour avec les données enrichies...');
    
    const success = await updateFormation(existing.id, formationConducteurTravauxPublicsReconversion);
    if (success) {
      console.log('✅ Formation mise à jour avec succès !');
    } else {
      console.log('❌ Erreur lors de la mise à jour');
    }
  } else {
    console.log('📝 Création de la nouvelle formation...');
    const result = await createFormation(formationConducteurTravauxPublicsReconversion);
    if (result) {
      console.log(`✅ Formation créée avec succès ! (ID: ${result.data?.id})`);
    } else {
      console.log('❌ Erreur lors de la création');
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log('📋 Données de la formation:');
  console.log(`   • Titre: ${formationConducteurTravauxPublicsReconversion.title}`);
  console.log(`   • Slug: ${formationConducteurTravauxPublicsReconversion.slug}`);
  console.log(`   • Niveau: ${formationConducteurTravauxPublicsReconversion.level}`);
  console.log(`   • RNCP: ${formationConducteurTravauxPublicsReconversion.rncp}`);
  console.log(`   • Durée: ${formationConducteurTravauxPublicsReconversion.duree}`);
  console.log(`   • Volume horaire: ${formationConducteurTravauxPublicsReconversion.volumeHoraire}`);
  console.log(`   • Rythme: ${formationConducteurTravauxPublicsReconversion.rythme}`);
  console.log(`   • Objectifs: ${formationConducteurTravauxPublicsReconversion.objectifs.length} objectifs`);
  console.log(`   • Programme: ${formationConducteurTravauxPublicsReconversion.programme.length} modules`);
  console.log(`   • Débouchés: ${formationConducteurTravauxPublicsReconversion.debouches.length} métiers`);
  console.log(`   • Prérequis: ${formationConducteurTravauxPublicsReconversion.prerequis.length} conditions`);
  console.log(`   • Évaluation: ${formationConducteurTravauxPublicsReconversion.evaluation.length} modalités`);
  console.log(`   • Poursuites: ${formationConducteurTravauxPublicsReconversion.poursuiteEtudes.length} formations`);
  console.log(`   • Taux insertion: ${formationConducteurTravauxPublicsReconversion.tauxInsertion}`);
  console.log(`   • Financement: ${formationConducteurTravauxPublicsReconversion.financement}`);
  console.log(`   • Catégorie: reconversion`);
  console.log(`   • URL: ${formationConducteurTravauxPublicsReconversion.pageUrl}`);
}

main().catch(console.error);
