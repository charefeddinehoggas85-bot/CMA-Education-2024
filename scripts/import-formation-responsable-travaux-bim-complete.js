/**
 * Script pour enrichir la formation Double Parcours Responsable Travaux Bâtiment & Coordinateur BIM dans Strapi
 * Basé sur le fichier: Formations/Double Parcours Responsable Travaux Bâtiment & Coordinateur BIM du Bâtiment.md
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${STRAPI_TOKEN}`
};

// Données complètes de la formation Double Parcours Responsable Travaux BIM
const formationResponsableTravauxBIM = {
  slug: 'responsable-travaux-bim',
  title: "Double Parcours Responsable Travaux Bâtiment & Coordinateur BIM",
  level: "Niveau 6 (équivalent BAC+3)",
  rncp: "RNCP39408",
  rncpUrl: "https://www.francecompetences.fr/recherche/rncp/39408/",
  
  shortDesc: "Formation double compétence alliant gestion de chantier et expertise BIM. Devenez un professionnel capable de conduire des travaux tout en maîtrisant les outils numériques collaboratifs du bâtiment.",
  
  fullDesc: `Cette formation professionnalisante vise à former des professionnels du BTP capables de conduire des chantiers de construction tout en intégrant les outils numériques collaboratifs du BIM. Elle allie les compétences techniques, organisationnelles et réglementaires du Responsable Travaux à une expertise pointue en coordination BIM, répondant aux nouveaux enjeux du bâtiment intelligent et connecté.

Grâce à l'alternance, les apprenants deviennent immédiatement opérationnels sur le terrain, tout en développant une véritable expertise en gestion de la maquette numérique et en pilotage de projets collaboratifs.`,

  metierDesc: `Le Responsable Travaux / Coordinateur BIM est un professionnel polyvalent qui combine expertise terrain et maîtrise des outils numériques. Il assure la conduite de chantiers tout en pilotant la transition digitale des projets de construction.

Ses missions principales incluent :
- La gestion complète de chantiers de construction (délais, budgets, normes)
- L'organisation et la coordination des équipes et sous-traitants
- La mise en œuvre des protocoles BIM et l'animation de la collaboration numérique
- Le suivi des indicateurs de performance et les contre-études technico-financières
- L'intégration du Lean Construction et de l'innovation digitale`,

  objectifs: [
    "Gérer un chantier de construction de A à Z, en respectant les délais, les budgets et les normes",
    "Organiser, coordonner et superviser les équipes et les sous-traitants",
    "Suivre les indicateurs de performance et réaliser des contre-études technico-financières",
    "Mettre en œuvre les protocoles BIM et animer la collaboration autour de la maquette numérique",
    "Intégrer les principes du Lean Construction et de l'innovation digitale dans vos projets"
  ],

  programme: [
    {
      titre: "Module 1 : Responsable Travaux Bâtiment",
      contenu: [
        "Gestion de chantier complète",
        "Planification TCE (Tous Corps d'État)",
        "Contre-étude technico-économique",
        "Encadrement d'équipe et management",
        "Suivi réglementaire et environnemental"
      ]
    },
    {
      titre: "Module 2 : Innovation & Lean Construction",
      contenu: [
        "Intégration du Lean au BIM",
        "Outils de performance et optimisation",
        "Introduction de l'IA dans le suivi de chantier",
        "Méthodes d'amélioration continue",
        "Innovation digitale dans le BTP"
      ]
    },
    {
      titre: "Module 3 : Coordination BIM",
      contenu: [
        "Conventions BIM et protocoles",
        "Modélisation et maquette numérique",
        "Standards IFC et interopérabilité",
        "Animation de la collaboration BIM",
        "Gestion des livrables numériques"
      ]
    },
    {
      titre: "Module 4 : Communication & pilotage de projet",
      contenu: [
        "Animation de réunions de chantier",
        "Gestion de la relation client",
        "Rédaction de rapports professionnels",
        "Pilotage de projets collaboratifs",
        "Communication avec les parties prenantes"
      ]
    }
  ],

  debouches: [
    "Coordinateur(trice) de chantier",
    "Responsable de chantier",
    "Chargé(e) d'études techniques",
    "Assistant(e) au maître d'ouvrage",
    "Coordinateur BIM",
    "BIM modeleur confirmé",
    "Référent BIM",
    "Responsable BIM",
    "Chargé(e) de projet BIM"
  ],

  duree: "1 an",
  volumeHoraire: "700 heures",
  repartition: "20 semaines à l'école / 32 semaines en entreprise",
  rythme: "Alternance : 20 semaines école + 32 semaines entreprise",
  modalite: "100% présentiel",
  typeContrat: "Apprentissage, Professionnalisation ou Période de Reconversion",
  effectif: "20 maximum par session",

  prerequis: [
    "Être titulaire d'un BAC+2 professionnel ou technique dans le BTP",
    "Ou justifier d'un niveau 5 équivalent avec une expérience significative dans le secteur"
  ],

  cout: "9000€ HT",
  financement: "100% prise en charge par OPCO et entreprise - Aucun frais pour l'alternant",

  certificateur: "Ministère du Travail",
  dateEnregistrement: "Enregistré au RNCP sous le n°39408 en date du 30/09/2024",

  tauxReussite: "92%",
  tauxInsertion: "98%",

  evaluation: [
    "Contrôle continu : Projets & mises en situation",
    "Présentation de projet BIM (1h20) : présentation orale, support visuel, livrables BIM (maquette IFC), questions du jury",
    "Entretien final (20 min) : analyse du dossier professionnel",
    "3 projets tutorés concrets"
  ],

  poursuiteEtudes: [
    "Chef de Projet BTP – CMA (BAC+5)",
    "Spécialisation en Lean Construction",
    "Spécialisation en développement durable",
    "Ingénierie du bâtiment numérique",
    "Passerelles vers écoles d'ingénierie ou management de projet"
  ],

  publicCible: "Titulaires d'un BAC+2 dans le BTP ou professionnels expérimentés souhaitant acquérir une double compétence en gestion de travaux et coordination BIM",

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
    "Bureaux d'études BIM",
    "+200 entreprises BTP partenaires"
  ],

  // SEO
  seoTitle: "Formation Responsable Travaux & Coordinateur BIM BAC+3 en Alternance | CMA Education",
  seoDescription: "Formation double parcours Responsable Travaux et Coordinateur BIM en alternance. RNCP39408, 98% d'insertion. Maîtrisez la gestion de chantier et le BIM. Financement 100% OPCO.",
  seoKeywords: [
    "formation responsable travaux",
    "formation coordinateur BIM",
    "alternance BTP BAC+3",
    "RNCP39408",
    "formation BIM bâtiment",
    "double parcours BTP",
    "formation BTP Île-de-France"
  ],

  isActive: true,
  ordre: 4
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
  console.log('🎓 Enrichissement Formation Double Parcours Responsable Travaux & Coordinateur BIM');
  console.log('='.repeat(80));
  console.log('📡 URL Strapi:', STRAPI_URL);
  
  if (!STRAPI_TOKEN) {
    console.log('\n❌ STRAPI_API_TOKEN non défini');
    console.log('Usage: $env:STRAPI_API_TOKEN="votre-token"; node scripts/import-formation-responsable-travaux-bim-complete.js');
    return;
  }

  // Rechercher la formation existante
  console.log('\n🔍 Recherche de la formation existante...');
  const existing = await findFormationBySlug(formationResponsableTravauxBIM.slug);

  if (existing) {
    console.log(`✅ Formation trouvée (ID: ${existing.id})`);
    console.log('📝 Mise à jour avec les données enrichies...');
    
    const success = await updateFormation(existing.id, formationResponsableTravauxBIM);
    if (success) {
      console.log('✅ Formation mise à jour avec succès !');
    } else {
      console.log('❌ Erreur lors de la mise à jour');
    }
  } else {
    console.log('⚠️ Formation non trouvée, création...');
    const success = await createFormation(formationResponsableTravauxBIM);
    if (success) {
      console.log('✅ Formation créée avec succès !');
    } else {
      console.log('❌ Erreur lors de la création');
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log('📋 Données importées:');
  console.log(`   • Titre: ${formationResponsableTravauxBIM.title}`);
  console.log(`   • Niveau: ${formationResponsableTravauxBIM.level}`);
  console.log(`   • RNCP: ${formationResponsableTravauxBIM.rncp}`);
  console.log(`   • Durée: ${formationResponsableTravauxBIM.duree}`);
  console.log(`   • Volume horaire: ${formationResponsableTravauxBIM.volumeHoraire}`);
  console.log(`   • Objectifs: ${formationResponsableTravauxBIM.objectifs.length} objectifs`);
  console.log(`   • Programme: ${formationResponsableTravauxBIM.programme.length} modules`);
  console.log(`   • Débouchés: ${formationResponsableTravauxBIM.debouches.length} métiers`);
  console.log(`   • Prérequis: ${formationResponsableTravauxBIM.prerequis.length} conditions`);
  console.log(`   • Évaluation: ${formationResponsableTravauxBIM.evaluation.length} modalités`);
  console.log(`   • Poursuites: ${formationResponsableTravauxBIM.poursuiteEtudes.length} formations`);
  console.log(`   • Taux insertion: ${formationResponsableTravauxBIM.tauxInsertion}`);
}

main().catch(console.error);
