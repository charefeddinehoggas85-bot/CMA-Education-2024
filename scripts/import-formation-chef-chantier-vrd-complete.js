/**
 * Script pour enrichir la formation Chef de Chantier Voirie et Réseaux Divers dans Strapi
 * Basé sur le fichier: Formations/Chef de Chantier Voirie et Réseaux Divers.md
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${STRAPI_TOKEN}`
};

// Données complètes de la formation Chef de Chantier VRD
const formationChefChantierVRD = {
  slug: 'chef-chantier-vrd',
  title: "Chef de Chantier Voirie et Réseaux Divers",
  level: "Niveau 5 (équivalent BAC+2)",
  rncp: "RNCP41368",
  rncpUrl: "https://www.francecompetences.fr/recherche/rncp/41368/",
  
  shortDesc: "Formation chef de chantier VRD en alternance formant des professionnels capables de préparer, diriger et clôturer l'exécution d'un chantier de voirie, réseaux et assainissement.",
  
  fullDesc: `Cette formation professionnalisante, directement ancrée dans les réalités du terrain, vous forme en tant que chef de chantier en voirie et réseaux divers capables de préparer l'exécution d'un chantier, diriger l'exécution, et clôturer l'exécution (voirie, réseaux, assainissement, ouvrages d'art, etc.).

Elle permet d'acquérir des compétences techniques, organisationnelles et réglementaires immédiatement applicables en entreprise. Grâce à l'alternance, les apprenants deviennent rapidement opérationnels, répondant aux besoins concrets du secteur des travaux publics.`,

  metierDesc: `Le Chef de chantier VRD/TP est le pilier opérationnel du terrain : il prépare l'exécution des chantiers, dirige les équipes sur site, coordonne les ressources humaines et matérielles, suit la production en temps réel, maîtrise les métrés et études de prix, anticipe les aléas techniques.

Il garantit la sécurité AIPR/SPS, la qualité des ouvrages, la conformité réglementaire, orchestre la logistique multi-flux et assure une exécution fluide tout au long du cycle de vie du projet VRD.`,

  objectifs: [
    "Maîtriser les fondamentaux techniques VRD pour exécuter un chantier",
    "Appliquer les techniques topographiques pour implantations et contrôles",
    "Réaliser des métrés quantitatifs précis et analyser les études de prix",
    "Organiser et piloter un chantier VRD/TP",
    "Mobiliser et coordonner ressources humaines et matérielles",
    "Encadrer et motiver des équipes pluridisciplinaires"
  ],

  programme: [
    {
      titre: "Module 1 : Méthodologie & techniques VRD",
      contenu: [
        "Bases du métier et accueil",
        "Méthodes de travail VRD",
        "Techniques VRD spécifiques",
        "Topographie et implantations",
        "Métrés et études de prix"
      ]
    },
    {
      titre: "Module 2 : Préparation et coordination de chantier",
      contenu: [
        "Planification des travaux",
        "Organisation du chantier",
        "Coordination des acteurs",
        "Gestion administrative et juridique"
      ]
    },
    {
      titre: "Module 3 : Sécurité, qualité et conformité réglementaire",
      contenu: [
        "Prévention des risques",
        "Certification AIPR",
        "Contrôle qualité des ouvrages",
        "Réception et clôture des travaux"
      ]
    },
    {
      titre: "Module 4 : Management et outils numériques",
      contenu: [
        "Management d'équipe",
        "DAO/CAO pour VRD",
        "Outils informatiques",
        "Apports de l'IA pour le chantier"
      ]
    },
    {
      titre: "Module 5 : Mise en situation professionnelle & certification",
      contenu: [
        "Projets tutorés couvrant tout le cycle du chantier",
        "Préparation aux certifications",
        "Études de cas réels",
        "Simulation de situations professionnelles"
      ]
    }
  ],

  debouches: [
    "Chef(fe) de chantier VRD",
    "Chef de chantier TP (Travaux Publics)",
    "Chef de chantier voirie et réseaux divers",
    "Chef de chantier terrassement et canalisation",
    "Responsable de chantier VRD",
    "Conducteur de travaux junior VRD"
  ],

  duree: "1 an",
  volumeHoraire: "560 heures",
  repartition: "16 semaines à l'école / 36 semaines en entreprise",
  rythme: "Alternance : 16 semaines école + 36 semaines entreprise",
  modalite: "100% présentiel",
  typeContrat: "Apprentissage, Professionnalisation ou Période de Reconversion",
  effectif: "20 maximum par session",

  prerequis: [
    "Titulaire d'un Bac professionnel, général ou technique",
    "Ou niveau Bac avec 2 ans d'expérience dans le domaine de la VRD/TP"
  ],

  cout: "9520€ HT",
  financement: "100% prise en charge par OPCO et entreprise - Aucun frais pour l'alternant",

  certificateur: "Ministère du Travail, du Plein Emploi et de l'Insertion",
  dateEnregistrement: "Enregistré au RNCP sous le n°41368 en date du 21/10/2025",

  tauxReussite: "93%",
  tauxInsertion: "95%",

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
    "Conducteur de Travaux Voirie et Réseaux Divers (BAC+3)",
    "Double Parcours Responsable Travaux Bâtiment / Coordinateur BIM du Bâtiment (BAC+3)",
    "Passerelles vers d'autres écoles spécialisées en ingénierie ou management de projet"
  ],

  publicCible: "Titulaires du baccalauréat ou professionnels avec expérience dans le domaine VRD/TP souhaitant évoluer vers un poste de chef de chantier",

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
    "+200 entreprises VRD/TP partenaires"
  ],

  // SEO
  seoTitle: "Formation Chef de Chantier VRD BAC+2 en Alternance | CMA Education",
  seoDescription: "Formation chef de chantier VRD en alternance. RNCP41368, 95% d'insertion. Devenez pilier opérationnel des chantiers voirie et réseaux. Financement 100% OPCO.",
  seoKeywords: [
    "formation chef de chantier VRD",
    "alternance travaux publics",
    "formation VRD BAC+2",
    "RNCP41368",
    "formation voirie réseaux divers",
    "chef chantier alternance",
    "formation TP Île-de-France"
  ],

  isActive: true,
  ordre: 3
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
  console.log('🎓 Enrichissement Formation Chef de Chantier Voirie et Réseaux Divers');
  console.log('='.repeat(70));
  console.log('📡 URL Strapi:', STRAPI_URL);
  
  if (!STRAPI_TOKEN) {
    console.log('\n❌ STRAPI_API_TOKEN non défini');
    console.log('Usage: $env:STRAPI_API_TOKEN="votre-token"; node scripts/import-formation-chef-chantier-vrd-complete.js');
    return;
  }

  // Rechercher la formation existante
  console.log('\n🔍 Recherche de la formation existante...');
  const existing = await findFormationBySlug(formationChefChantierVRD.slug);

  if (existing) {
    console.log(`✅ Formation trouvée (ID: ${existing.id})`);
    console.log('📝 Mise à jour avec les données enrichies...');
    
    const success = await updateFormation(existing.id, formationChefChantierVRD);
    if (success) {
      console.log('✅ Formation mise à jour avec succès !');
    } else {
      console.log('❌ Erreur lors de la mise à jour');
    }
  } else {
    console.log('⚠️ Formation non trouvée, création...');
    const success = await createFormation(formationChefChantierVRD);
    if (success) {
      console.log('✅ Formation créée avec succès !');
    } else {
      console.log('❌ Erreur lors de la création');
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log('📋 Données importées:');
  console.log(`   • Titre: ${formationChefChantierVRD.title}`);
  console.log(`   • RNCP: ${formationChefChantierVRD.rncp}`);
  console.log(`   • Durée: ${formationChefChantierVRD.duree}`);
  console.log(`   • Volume horaire: ${formationChefChantierVRD.volumeHoraire}`);
  console.log(`   • Objectifs: ${formationChefChantierVRD.objectifs.length} objectifs`);
  console.log(`   • Programme: ${formationChefChantierVRD.programme.length} modules`);
  console.log(`   • Débouchés: ${formationChefChantierVRD.debouches.length} métiers`);
  console.log(`   • Prérequis: ${formationChefChantierVRD.prerequis.length} conditions`);
  console.log(`   • Évaluation: ${formationChefChantierVRD.evaluation.length} modalités`);
  console.log(`   • Poursuites: ${formationChefChantierVRD.poursuiteEtudes.length} formations`);
  console.log(`   • Taux insertion: ${formationChefChantierVRD.tauxInsertion}`);
}

main().catch(console.error);
