/**
 * Script pour enrichir la formation Conducteur de Travaux VRD - Cursus 2 ans dans Strapi
 * Basé sur le fichier: Formations/Conducteur de Travaux Voirie et Réseaux Divers - Cursus 2 ans.md
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${STRAPI_TOKEN}`
};

// Données complètes de la formation Conducteur de Travaux VRD 2 ans
const formationConducteurTravauxVRD2ans = {
  slug: 'conducteur-travaux-vrd-2ans',
  title: "Conducteur de Travaux Voirie et Réseaux Divers - Cursus 2 ans",
  level: "Niveau 6 (équivalent BAC+3)",
  rncp: "RNCP41369",
  rncpUrl: "https://www.francecompetences.fr/recherche/rncp/41369/",
  
  shortDesc: "Formation complète en 2 ans pour devenir conducteur de travaux VRD. Parcours progressif alliant fondamentaux terrain et pilotage stratégique de projets d'infrastructures.",
  
  fullDesc: `Cette formation a pour objectif de former des professionnels capables de gérer l'ensemble des étapes d'un chantier, de la préparation à la réception des ouvrages, et d'en piloter toutes les dimensions techniques, administratives, financières et managériales.

D'une durée de 2 ans, la formation alterne enseignements théoriques et périodes en entreprise pour totaliser 1120 heures en centre : ce format en alternance favorise une forte immersion professionnelle. Le parcours consolide les compétences indispensables au métier, tout en intégrant les outils modernes tels que le BIM et l'IA, permettant ainsi de maîtriser l'optimisation de la productivité et de répondre aux enjeux réglementaires et environnementaux propres au secteur.`,

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
      titre: "Module 1 : Techniques VRD & Travaux Publics",
      contenu: [
        "Fondamentaux et techniques avancées VRD",
        "Matériaux de construction",
        "Terrassements et ouvrages",
        "Techniques TP complexes"
      ]
    },
    {
      titre: "Module 2 : Études, Topographie & Économie",
      contenu: [
        "Lecture de plans et documents techniques",
        "Implantations et nivellement",
        "Métrés et estimation financière",
        "Optimisation des coûts et DGD"
      ]
    },
    {
      titre: "Module 3 : Méthodes, Planification & Organisation",
      contenu: [
        "Phasage VRD et plannings (Gantt)",
        "Méthodes de chantier",
        "Logistique et coordination",
        "Organisation PIC multi-flux"
      ]
    },
    {
      titre: "Module 4 : Gestion, Qualité & Sécurité (QSE)",
      contenu: [
        "Gestion administrative et marchés publics",
        "Prévention des risques (PPSPS, SPS)",
        "Qualité et conformité des travaux",
        "Traitement des non-conformités"
      ]
    },
    {
      titre: "Module 5 : Management & Outils du Conducteur de Travaux",
      contenu: [
        "Pilotage des équipes",
        "Communication de chantier",
        "Outils numériques (BIM, IA, logiciels métiers)",
        "Conduite de réunions"
      ]
    },
    {
      titre: "Module 6 : Projets tutorés et mises en situation professionnelles",
      contenu: [
        "Préparation et exécution VRD",
        "Contre-études technico-financières",
        "Organisation complète de chantier",
        "Projet final sur cas réel"
      ]
    }
  ],

  // Compétences Année 1 - Opérationnel terrain
  competences1ereAnnee: [
    "Maîtrise des techniques VRD et TP (terrassements, matériaux, exécution)",
    "Fondamentaux de la topographie (implantation, nivellement, récolements)",
    "Bases du métré et de l'estimation financière (BPU, situations mensuelles)",
    "Planification simple de chantier (Gantt, phasage VRD)",
    "Gestion des documents administratifs et réglementaires (DT/DICT, PAQ)",
    "Application des règles de sécurité et de qualité sur chantier",
    "Organisation opérationnelle de chantier (PIC, coordination des équipes)",
    "Premier niveau de management de proximité",
    "Utilisation des outils numériques courants (AutoCAD simple, Excel, Word)"
  ],

  // Compétences Année 2 - Pilotage & gestion
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

  duree: "2 ans",
  volumeHoraire: "1120 heures",
  repartition: "32 semaines à l'école / 72 semaines en entreprise",
  rythme: "Alternance : 32 semaines école + 72 semaines entreprise sur 2 ans",
  modalite: "100% présentiel",
  typeContrat: "Apprentissage, Professionnalisation ou Période de Reconversion",
  effectif: "20 maximum par session",

  prerequis: [
    "Titulaire d'un Bac professionnel, général ou technique",
    "Ou niveau Bac avec 2 ans d'expérience dans le domaine de la VRD/TP"
  ],

  cout: "19040€ HT (9520€ HT/an)",
  financement: "100% prise en charge par OPCO et entreprise - Aucun frais pour l'alternant",

  certificateur: "Ministère du Travail, du Plein Emploi et de l'Insertion",
  dateEnregistrement: "Enregistré au RNCP sous le n°41369 en date du 21/10/2025",

  tauxReussite: "95%",
  tauxInsertion: "98%",

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

  publicCible: "Titulaires du baccalauréat ou professionnels avec expérience dans le domaine VRD/TP souhaitant une formation complète en 2 ans pour devenir conducteur de travaux",

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
  seoTitle: "Formation Conducteur de Travaux VRD BAC+3 en 2 ans | CMA Education",
  seoDescription: "Formation conducteur de travaux VRD en alternance, cursus complet 2 ans. RNCP41369, 98% d'insertion. Du terrain au pilotage stratégique avec BIM et IA. Financement 100% OPCO.",
  seoKeywords: [
    "formation conducteur de travaux VRD",
    "alternance travaux publics BAC+3",
    "RNCP41369",
    "formation VRD 2 ans",
    "conducteur travaux infrastructures",
    "formation BIM VRD",
    "formation TP Île-de-France"
  ],

  isActive: true,
  ordre: 6
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
  console.log('🎓 Enrichissement Formation Conducteur de Travaux VRD - Cursus 2 ans');
  console.log('='.repeat(70));
  console.log('📡 URL Strapi:', STRAPI_URL);
  
  if (!STRAPI_TOKEN) {
    console.log('\n❌ STRAPI_API_TOKEN non défini');
    console.log('Usage: $env:STRAPI_API_TOKEN="votre-token"; node scripts/import-formation-conducteur-travaux-vrd-2ans-complete.js');
    return;
  }

  // Rechercher la formation existante
  console.log('\n🔍 Recherche de la formation existante...');
  const existing = await findFormationBySlug(formationConducteurTravauxVRD2ans.slug);

  if (existing) {
    console.log(`✅ Formation trouvée (ID: ${existing.id})`);
    console.log('📝 Mise à jour avec les données enrichies...');
    
    const success = await updateFormation(existing.id, formationConducteurTravauxVRD2ans);
    if (success) {
      console.log('✅ Formation mise à jour avec succès !');
    } else {
      console.log('❌ Erreur lors de la mise à jour');
    }
  } else {
    console.log('⚠️ Formation non trouvée, création...');
    const success = await createFormation(formationConducteurTravauxVRD2ans);
    if (success) {
      console.log('✅ Formation créée avec succès !');
    } else {
      console.log('❌ Erreur lors de la création');
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log('📋 Données importées:');
  console.log(`   • Titre: ${formationConducteurTravauxVRD2ans.title}`);
  console.log(`   • Niveau: ${formationConducteurTravauxVRD2ans.level}`);
  console.log(`   • RNCP: ${formationConducteurTravauxVRD2ans.rncp}`);
  console.log(`   • Durée: ${formationConducteurTravauxVRD2ans.duree}`);
  console.log(`   • Volume horaire: ${formationConducteurTravauxVRD2ans.volumeHoraire}`);
  console.log(`   • Objectifs: ${formationConducteurTravauxVRD2ans.objectifs.length} objectifs`);
  console.log(`   • Programme: ${formationConducteurTravauxVRD2ans.programme.length} modules`);
  console.log(`   • Débouchés: ${formationConducteurTravauxVRD2ans.debouches.length} métiers`);
  console.log(`   • Prérequis: ${formationConducteurTravauxVRD2ans.prerequis.length} conditions`);
  console.log(`   • Évaluation: ${formationConducteurTravauxVRD2ans.evaluation.length} modalités`);
  console.log(`   • Poursuites: ${formationConducteurTravauxVRD2ans.poursuiteEtudes.length} formations`);
  console.log(`   • Compétences 1ère année: ${formationConducteurTravauxVRD2ans.competences1ereAnnee.length} compétences`);
  console.log(`   • Compétences 2ème année: ${formationConducteurTravauxVRD2ans.competences2eAnnee.length} compétences`);
  console.log(`   • Taux insertion: ${formationConducteurTravauxVRD2ans.tauxInsertion}`);
}

main().catch(console.error);
