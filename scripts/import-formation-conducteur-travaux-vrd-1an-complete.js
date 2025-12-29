/**
 * Script pour enrichir la formation Conducteur de Travaux en VRD - Cursus 1 an dans Strapi
 * Basé sur le fichier: Formations/Conducteur de Travaux en VRD - Cursus 1 an.MD
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${STRAPI_TOKEN}`
};

// Données complètes de la formation Conducteur de Travaux VRD 1 an
const formationConducteurTravauxVRD1an = {
  slug: 'conducteur-travaux-vrd-1an',
  title: "Conducteur de Travaux en VRD - Cursus 1 an",
  level: "Niveau 6 (équivalent BAC+3)",
  rncp: "RNCP41369",
  rncpUrl: "https://www.francecompetences.fr/recherche/rncp/41369/",
  
  shortDesc: "Formation conducteur de travaux VRD en 1 an formant des professionnels capables de gérer l'ensemble des étapes d'un chantier d'infrastructures, de la préparation à la réception des ouvrages.",
  
  fullDesc: `Cette formation a pour objectif de former des professionnels capables de gérer l'ensemble des étapes d'un chantier, de la préparation à la réception des ouvrages, et d'en piloter toutes les dimensions techniques, administratives, financières et managériales.

D'une durée de 1 an, la formation alterne enseignements théoriques et périodes en entreprise pour totaliser 560 heures en centre : ce format en alternance favorise une forte immersion professionnelle. Le parcours consolide les compétences indispensables au métier, tout en intégrant les outils modernes tels que le BIM et l'IA, permettant ainsi de maîtriser l'optimisation de la productivité et de répondre aux enjeux réglementaires et environnementaux propres au secteur.`,

  metierDesc: `Le Conducteur de Travaux en VRD est le chef d'orchestre des chantiers d'infrastructures : il pilote l'ensemble des étapes d'un projet VRD/TP, de la préparation à la réception des ouvrages, en gérant les dimensions techniques, administratives, financières et managériales.

Il définit les méthodes d'exécution, élabore plannings et budgets, optimise les coûts via contre-études et DGD, coordonne équipes et intervenants multi-acteurs, assure la conformité QSE, maîtrise les outils numériques avancés comme le BIM et l'IA, et garantit la rentabilité tout en respectant délais, qualité et engagements contractuels.`,

  objectifs: [
    "Préparer un chantier VRD en définissant les méthodes d'exécution, le planning, le budget et les démarches administratives, dans le respect des exigences réglementaires, de sécurité et environnementales",
    "Piloter l'exécution des travaux VRD en assurant le suivi technique, organisationnel et financier du chantier, et en mettant en œuvre les actions correctives nécessaires",
    "Manager et coordonner les équipes et intervenants de chantier, en animant les réunions et en faisant converger les intérêts de l'entreprise et du client",
    "Garantir la conformité du chantier en veillant au respect des délais, de la qualité, de la sécurité, des normes réglementaires et des engagements contractuels",
    "Réceptionner et clôturer le chantier VRD en assurant la traçabilité, la levée des réserves, l'établissement du décompte général et définitif et la facturation finale"
  ],

  programme: [
    {
      titre: "Module 1 : Techniques avancées, Méthodes et organisation",
      contenu: [
        "Techniques TP complexes",
        "Organisation des travaux",
        "Interfaces avec les bureaux d'études",
        "Phasage TP",
        "Plannings et méthodes de chantier"
      ]
    },
    {
      titre: "Module 2 : Analyse financière et planification",
      contenu: [
        "Contre-étude technico-financière",
        "Optimisation des coûts",
        "Décompte Général et Définitif (DGD)",
        "Plannings multi-acteurs",
        "Pilotage des délais"
      ]
    },
    {
      titre: "Module 3 : Gestion administrative, contractuelle et qualité",
      contenu: [
        "Marchés publics",
        "CCAG et cadre contractuel",
        "Gestion des avenants et litiges",
        "Plans qualité ISO",
        "Traitement des non-conformités"
      ]
    },
    {
      titre: "Module 4 : Sécurité, logistique et management transversal",
      contenu: [
        "Pilotage SPS/PPSPS",
        "Logistique PIC multi-flux",
        "Management de la prévention",
        "Conduite d'équipe",
        "Relation client"
      ]
    },
    {
      titre: "Module 5 : Outils numériques, animation et projet tutoré",
      contenu: [
        "BIM appliqué aux VRD",
        "Intelligence Artificielle et outils avancés",
        "Animation des réunions (ODJ/compte-rendu)",
        "Reporting et tableaux de bord",
        "Projet tutoré complet VRD/TP réel"
      ]
    },
    {
      titre: "Module 6 : Projet tutoré de niveau conducteur de travaux",
      contenu: [
        "Contre-étude complète",
        "Organisation globale du projet",
        "Pilotage d'un projet VRD/TP sur cas réel",
        "Présentation et soutenance"
      ]
    }
  ],

  // Compétences spécifiques 2ème année
  competences2eAnnee: [
    "Techniques TP avancées et relation avec les bureaux d'études",
    "Lecture et validation des documents BE et topographique",
    "Contre-étude technico-financière, optimisation et DGD",
    "Planification complexe (phasage multi-acteurs, cadences, méthodes)",
    "Gestion administrative et contractuelle (marchés publics, CCAG, avenants, litiges)",
    "Pilotage QSE (PPSPS, coordination SPS, qualité, non-conformités)",
    "Organisation logistique stratégique de chantier (PIC complexe, interfaces)",
    "Management transversal et conduite de réunions de chantier",
    "Utilisation des outils numériques avancés (BIM, IA, logiciels métiers)",
    "Réalisation d'un projet tutoré complet basé sur un cas réel de chantier VRD/TP"
  ],

  debouches: [
    "Responsable Travaux BTP",
    "Chef de chantier",
    "Conducteur de travaux TP",
    "Chef de projet TP",
    "Responsable innovation numérique en TP",
    "Consultant en développement durable appliqué aux TP",
    "Spécialiste BIM ou IA appliquée aux TP",
    "Chargé d'affaires technico-financières TP"
  ],

  duree: "1 an",
  volumeHoraire: "560 heures",
  repartition: "16 semaines à l'école / 36 semaines en entreprise",
  rythme: "Alternance : 16 semaines école + 36 semaines entreprise",
  modalite: "100% présentiel",
  typeContrat: "Apprentissage, Professionnalisation ou Période de Reconversion",
  effectif: "20 maximum par session",

  prerequis: [
    "Titulaire d'un Bac+2 (ou équivalent) professionnel ou technique en BTP",
    "Ou niveau Bac+2 avec 2 ans d'expérience dans le domaine de la VRD/TP"
  ],

  cout: "9520€ HT",
  financement: "100% prise en charge par OPCO et entreprise - Aucun frais pour l'alternant",

  certificateur: "Ministère du Travail, du Plein Emploi et de l'Insertion",
  dateEnregistrement: "Enregistré au RNCP sous le n°41369 en date du 21/10/2025",

  tauxReussite: "94%",
  tauxInsertion: "97%",

  evaluation: [
    "Évaluations orales",
    "Présentations orales pour évaluer les compétences",
    "Projets individuels ou de groupe : Conception et réalisation d'un projet",
    "Évaluation par simulation : Test des compétences dans des situations spécifiques",
    "Devoir sur table pour évaluer les compétences",
    "QCM : Sélection de réponses parmi plusieurs propositions",
    "Études de cas : Analyse approfondie de situations concrètes",
    "Mise en pratique : Application des connaissances à travers des exercices pratiques"
  ],

  poursuiteEtudes: [
    "Chef de Projet BTP Niveau 7 (équivalent BAC+5) – Construction Management Academy",
    "Passerelles vers écoles spécialisées en ingénierie ou management de projet BTP (Niveau 7)"
  ],

  publicCible: "Titulaires d'un BAC+2 en BTP ou professionnels expérimentés dans le domaine VRD/TP souhaitant évoluer vers un poste de conducteur de travaux",

  contact: {
    telephone: "01 85 09 71 06",
    email: "inscription@cma-education.com",
    adresse: "Champs-sur-Marne (77)"
  },

  entreprisesPartenaires: [
    "Eurovia",
    "Colas",
    "Eiffage Route",
    "Bouygues TP",
    "NGE",
    "+200 entreprises VRD/TP partenaires"
  ],

  // SEO
  seoTitle: "Formation Conducteur de Travaux VRD BAC+3 en 1 an | CMA Education",
  seoDescription: "Formation conducteur de travaux VRD en alternance, cursus 1 an. RNCP41369, 97% d'insertion. Maîtrisez le pilotage de chantiers d'infrastructures avec BIM et IA. Financement 100% OPCO.",
  seoKeywords: [
    "formation conducteur de travaux VRD",
    "alternance travaux publics BAC+3",
    "RNCP41369",
    "formation VRD 1 an",
    "conducteur travaux infrastructures",
    "formation BIM VRD",
    "formation TP Île-de-France"
  ],

  isActive: true,
  ordre: 5
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
  console.log('🎓 Enrichissement Formation Conducteur de Travaux VRD - Cursus 1 an');
  console.log('='.repeat(70));
  console.log('📡 URL Strapi:', STRAPI_URL);
  
  if (!STRAPI_TOKEN) {
    console.log('\n❌ STRAPI_API_TOKEN non défini');
    console.log('Usage: $env:STRAPI_API_TOKEN="votre-token"; node scripts/import-formation-conducteur-travaux-vrd-1an-complete.js');
    return;
  }

  // Rechercher la formation existante
  console.log('\n🔍 Recherche de la formation existante...');
  const existing = await findFormationBySlug(formationConducteurTravauxVRD1an.slug);

  if (existing) {
    console.log(`✅ Formation trouvée (ID: ${existing.id})`);
    console.log('📝 Mise à jour avec les données enrichies...');
    
    const success = await updateFormation(existing.id, formationConducteurTravauxVRD1an);
    if (success) {
      console.log('✅ Formation mise à jour avec succès !');
    } else {
      console.log('❌ Erreur lors de la mise à jour');
    }
  } else {
    console.log('⚠️ Formation non trouvée, création...');
    const success = await createFormation(formationConducteurTravauxVRD1an);
    if (success) {
      console.log('✅ Formation créée avec succès !');
    } else {
      console.log('❌ Erreur lors de la création');
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log('📋 Données importées:');
  console.log(`   • Titre: ${formationConducteurTravauxVRD1an.title}`);
  console.log(`   • Niveau: ${formationConducteurTravauxVRD1an.level}`);
  console.log(`   • RNCP: ${formationConducteurTravauxVRD1an.rncp}`);
  console.log(`   • Durée: ${formationConducteurTravauxVRD1an.duree}`);
  console.log(`   • Volume horaire: ${formationConducteurTravauxVRD1an.volumeHoraire}`);
  console.log(`   • Objectifs: ${formationConducteurTravauxVRD1an.objectifs.length} objectifs`);
  console.log(`   • Programme: ${formationConducteurTravauxVRD1an.programme.length} modules`);
  console.log(`   • Débouchés: ${formationConducteurTravauxVRD1an.debouches.length} métiers`);
  console.log(`   • Prérequis: ${formationConducteurTravauxVRD1an.prerequis.length} conditions`);
  console.log(`   • Évaluation: ${formationConducteurTravauxVRD1an.evaluation.length} modalités`);
  console.log(`   • Poursuites: ${formationConducteurTravauxVRD1an.poursuiteEtudes.length} formations`);
  console.log(`   • Compétences 2e année: ${formationConducteurTravauxVRD1an.competences2eAnnee.length} compétences`);
  console.log(`   • Taux insertion: ${formationConducteurTravauxVRD1an.tauxInsertion}`);
}

main().catch(console.error);
