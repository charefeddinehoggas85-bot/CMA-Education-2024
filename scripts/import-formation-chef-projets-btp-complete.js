/**
 * Script pour enrichir la formation Chef de Projets BTP dans Strapi
 * Basé sur le fichier: Formations/chef de projet.md
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${STRAPI_TOKEN}`
};

// Données complètes de la formation Chef de Projets BTP
const formationChefProjetsBTP = {
  slug: 'chef-projets-btp',
  title: "Chef de Projets BTP",
  level: "Niveau 7 (équivalent BAC+5)",
  rncp: "RNCP37890",
  rncpUrl: "https://www.francecompetences.fr/recherche/rncp/37890/",
  
  shortDesc: "Formation BAC+5 Chef de Projets BTP formant des experts capables de gérer des projets de construction complexes et innovants, intégrant transition énergétique, digitalisation et Smart Cities.",
  
  fullDesc: `Cette formation chef de projets BTP professionnalisante prépare des experts capables de gérer des projets de construction complexes et innovants, en intégrant les enjeux contemporains du BTP : transition énergétique, digitalisation, durabilité, performance économique et innovation managériale.

Elle forme des chefs de projets agiles, stratèges et responsables, capables de répondre aux exigences des Smart Buildings, des Smart Cities, et de la construction durable, tout en maîtrisant les outils les plus avancés du secteur : BIM, IA, Lean Construction, automatisation, gestion financière, etc.`,

  metierDesc: `Le Chef de Projets BTP est un expert polyvalent qui pilote des projets de construction complexes de A à Z. Il combine vision stratégique, expertise technique et compétences managériales pour mener à bien des opérations d'envergure.

Ses missions principales incluent :
- Le pilotage intégral de projets de construction complexes
- L'intégration des outils numériques (BIM, IA, Lean Construction)
- La gestion financière, juridique et contractuelle des opérations
- Le management d'équipes pluridisciplinaires et multiculturelles
- La réponse aux enjeux Smart Building et Smart Cities`,

  objectifs: [
    "Piloter intégralement des projets de construction complexes, de la conception à la livraison",
    "Intégrer les outils numériques comme le BIM, l'intelligence artificielle et le Lean Construction dans la stratégie de projet",
    "Gérer les dimensions financières, juridiques, contractuelles et environnementales d'une opération",
    "Manager des équipes pluridisciplinaires et multiculturelles avec leadership et méthode",
    "Répondre aux enjeux des territoires intelligents grâce à une vision Smart Building et Smart Cities"
  ],

  programme: [
    {
      titre: "Module 1 : Conduite et Management stratégique de projets BTP",
      contenu: [
        "Pilotage multi-sites (planification, coordination, méthodologie, suivi)",
        "Management financier et gestion des risques",
        "Stratégie d'entreprise BTP",
        "Gestion contractuelle et juridique",
        "Leadership et management d'équipes"
      ]
    },
    {
      titre: "Module 2 : Technologies numériques et innovation",
      contenu: [
        "BIM avancé et maquette numérique",
        "Intelligence Artificielle appliquée au BTP",
        "Automatisation des processus",
        "Lean Construction et optimisation",
        "Logistique optimisée et outils digitaux"
      ]
    },
    {
      titre: "Module 3 : Transition énergétique et construction durable",
      contenu: [
        "Conception BEPOS (Bâtiment à Énergie Positive)",
        "Analyse du Cycle de Vie (ACV)",
        "Économie circulaire dans le BTP",
        "Certifications environnementales (HQE, BREEAM, LEED)",
        "RSE et développement durable"
      ]
    },
    {
      titre: "Module 4 : Smart Building & Smart Cities",
      contenu: [
        "Infrastructures connectées",
        "Performance énergétique des bâtiments",
        "Internet des Objets (IoT) dans le BTP",
        "Urbanisme intelligent",
        "Gestion intelligente des territoires"
      ]
    }
  ],

  debouches: [
    "Chef de projets BTP",
    "Conducteur de travaux senior",
    "Ingénieur travaux",
    "Manager de la construction",
    "Directeur de travaux",
    "Responsable BIM & innovation numérique",
    "Consultant en stratégie BTP/RSE",
    "Entrepreneur dans le BTP",
    "Directeur de programmes immobiliers",
    "Chef de projets Smart Cities"
  ],

  duree: "2 ans",
  volumeHoraire: "1393 heures",
  repartition: "40 semaines à l'école / 64 semaines en entreprise",
  rythme: "Alternance : 40 semaines école + 64 semaines entreprise sur 2 ans",
  modalite: "100% présentiel",
  typeContrat: "Contrat de professionnalisation",
  effectif: "20 maximum par session",

  prerequis: [
    "Être titulaire d'un BAC+3 professionnel ou technique dans le BTP",
    "Ou justifier d'un niveau 6 équivalent avec expérience dans le domaine"
  ],

  cout: "13€ HT/h de formation",
  financement: "100% prise en charge par OPCO et entreprise",

  certificateur: "Ministère du Travail",
  dateEnregistrement: "Enregistré au RNCP",

  tauxReussite: "96%",
  tauxInsertion: "99%",

  evaluation: [
    "Contrôle continu en cours de formation",
    "Projets concrets réalisés en entreprise (dossiers + présentations orales)",
    "Soutenance finale d'un mémoire professionnel, évalué par un jury d'experts du secteur"
  ],

  poursuiteEtudes: [
    "Mastère Spécialisé (MS) en management de l'innovation dans la construction",
    "Mastère Spécialisé en gestion de projets d'infrastructures durables",
    "Mastère Spécialisé en maîtrise d'ouvrage et urbanisme intelligent (Smart Cities)",
    "Mastère Spécialisé en transition énergétique et systèmes durables",
    "MBA ou Master en école d'ingénieurs ou de commerce",
    "Doctorat (PhD) en ingénierie du bâtiment, urbanisme ou environnement"
  ],

  publicCible: "Titulaires d'un BAC+3 dans le BTP ou professionnels expérimentés souhaitant accéder à des postes de direction et de pilotage stratégique de projets de construction",

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
    "Grands groupes BTP",
    "Bureaux d'ingénierie",
    "Collectivités publiques"
  ],

  // SEO
  seoTitle: "Formation Chef de Projets BTP BAC+5 en Alternance | CMA Education",
  seoDescription: "Formation BAC+5 Chef de Projets BTP en alternance. 99% d'insertion. Maîtrisez BIM, IA, Smart Cities et construction durable. Devenez expert en pilotage de projets complexes.",
  seoKeywords: [
    "formation chef de projets BTP",
    "alternance BTP BAC+5",
    "formation BIM avancé",
    "Smart Building formation",
    "Smart Cities BTP",
    "construction durable",
    "formation management BTP"
  ],

  isActive: true,
  ordre: 7
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
  console.log('🎓 Enrichissement Formation Chef de Projets BTP');
  console.log('='.repeat(60));
  console.log('📡 URL Strapi:', STRAPI_URL);
  
  if (!STRAPI_TOKEN) {
    console.log('\n❌ STRAPI_API_TOKEN non défini');
    console.log('Usage: $env:STRAPI_API_TOKEN="votre-token"; node scripts/import-formation-chef-projets-btp-complete.js');
    return;
  }

  // Rechercher la formation existante
  console.log('\n🔍 Recherche de la formation existante...');
  const existing = await findFormationBySlug(formationChefProjetsBTP.slug);

  if (existing) {
    console.log(`✅ Formation trouvée (ID: ${existing.id})`);
    console.log('📝 Mise à jour avec les données enrichies...');
    
    const success = await updateFormation(existing.id, formationChefProjetsBTP);
    if (success) {
      console.log('✅ Formation mise à jour avec succès !');
    } else {
      console.log('❌ Erreur lors de la mise à jour');
    }
  } else {
    console.log('⚠️ Formation non trouvée, création...');
    const success = await createFormation(formationChefProjetsBTP);
    if (success) {
      console.log('✅ Formation créée avec succès !');
    } else {
      console.log('❌ Erreur lors de la création');
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📋 Données importées:');
  console.log(`   • Titre: ${formationChefProjetsBTP.title}`);
  console.log(`   • Niveau: ${formationChefProjetsBTP.level}`);
  console.log(`   • RNCP: ${formationChefProjetsBTP.rncp}`);
  console.log(`   • Durée: ${formationChefProjetsBTP.duree}`);
  console.log(`   • Volume horaire: ${formationChefProjetsBTP.volumeHoraire}`);
  console.log(`   • Objectifs: ${formationChefProjetsBTP.objectifs.length} objectifs`);
  console.log(`   • Programme: ${formationChefProjetsBTP.programme.length} modules`);
  console.log(`   • Débouchés: ${formationChefProjetsBTP.debouches.length} métiers`);
  console.log(`   • Prérequis: ${formationChefProjetsBTP.prerequis.length} conditions`);
  console.log(`   • Évaluation: ${formationChefProjetsBTP.evaluation.length} modalités`);
  console.log(`   • Poursuites: ${formationChefProjetsBTP.poursuiteEtudes.length} formations`);
  console.log(`   • Taux insertion: ${formationChefProjetsBTP.tauxInsertion}`);
}

main().catch(console.error);
