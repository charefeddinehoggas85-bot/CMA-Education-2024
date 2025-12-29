/**
 * Script pour enrichir la formation Chargé d'Affaires du Bâtiment dans Strapi
 * Basé sur le fichier: Formations/formation-charge-affaires-batiment-alternance.md
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${STRAPI_TOKEN}`
};

// Données complètes de la formation Chargé d'Affaires du Bâtiment
const formationChargeAffaires = {
  slug: 'charge-affaires-batiment',
  title: "Chargé(e) d'Affaires du Bâtiment",
  level: "Niveau 5 (équivalent BAC+2)",
  rncp: "RNCP35503",
  rncpUrl: "https://www.francecompetences.fr/recherche/rncp/35503/",
  
  shortDesc: "Formation chargé d'affaires bâtiment en alternance BTP formant des professionnels capables de gérer intégralement un projet de construction, de la prospection client à la livraison.",
  
  fullDesc: `Cette formation chargé d'affaires bâtiment en alternance BTP forme des professionnels capables de gérer intégralement un projet de construction, de la prospection client à la livraison. Notre formation bâtiment BAC+2 développe les compétences techniques, commerciales et organisationnelles essentielles pour devenir un véritable chef d'orchestre du projet BTP.

Le chargé d'affaires est l'interface entre le client et les équipes techniques. Il assure le suivi commercial, technique et financier des projets de construction ou rénovation. Ce métier polyvalent requiert des compétences en gestion de projet, négociation commerciale et coordination de chantier.`,

  metierDesc: `Le métier de Chargé d'Affaires du Bâtiment est au cœur de la relation client dans le secteur BTP. Ce professionnel polyvalent assure la gestion complète des projets de construction, de la prospection commerciale à la livraison finale.

Ses missions principales incluent :
- L'analyse des besoins clients et la réalisation d'études de faisabilité
- L'élaboration d'offres commerciales compétitives
- Le pilotage technique et financier des chantiers
- La coordination des équipes et sous-traitants
- Le suivi de la satisfaction client et la fidélisation`,

  objectifs: [
    "Comprendre et analyser un projet de construction ou rénovation",
    "Réaliser une étude de faisabilité technique et financière complète",
    "Concevoir une offre commerciale adaptée et compétitive",
    "Piloter les travaux sur le terrain et optimiser les délais",
    "Communiquer efficacement avec clients, fournisseurs et artisans",
    "Suivre la rentabilité des opérations et la satisfaction client",
    "Maîtriser les techniques de construction et lecture de plans",
    "Gérer les études de prix et le pilotage financier",
    "Coordonner les projets et les équipes de chantier",
    "Développer la relation client et la négociation commerciale"
  ],

  programme: [
    {
      titre: "Module 1 : Techniques de construction & lecture de plans",
      contenu: [
        "Maîtrise des méthodes tous corps d'état (TCE)",
        "Analyse et lecture de plans techniques",
        "Utilisation d'AutoCAD et outils DAO",
        "Connaissance des normes qualité et sécurité"
      ]
    },
    {
      titre: "Module 2 : Études de prix & pilotage financier",
      contenu: [
        "Réalisation de devis et métrés",
        "Calcul des marges et rentabilité",
        "Gestion des achats et négociation fournisseurs",
        "Suivi de trésorerie et pilotage budgétaire"
      ]
    },
    {
      titre: "Module 3 : Gestion de projet & coordination chantier",
      contenu: [
        "Organisation et planification (MS Project)",
        "Suivi des travaux et respect des délais",
        "Gestion des intervenants et sous-traitants",
        "Coordination technique et administrative"
      ]
    },
    {
      titre: "Module 4 : Relation client & communication professionnelle",
      contenu: [
        "Prospection et développement commercial",
        "Négociation commerciale et closing",
        "Rédaction de documents techniques",
        "Animation de réunions et gestion relation client"
      ]
    }
  ],

  debouches: [
    "Chargé(e) d'affaires tous corps d'état",
    "Conducteur(trice) de travaux avec dimension commerciale",
    "Technico-commercial(e) BTP spécialisé",
    "Coordinateur(trice) OPC (Ordonnancement Pilotage Coordination)",
    "Assistant(e) chef de projet en bureau d'études",
    "Responsable d'opérations (avec expérience)",
    "Responsable d'agence (évolution)",
    "Directeur commercial BTP (évolution)",
    "Chef d'entreprise (évolution)"
  ],

  duree: "1 an",
  volumeHoraire: "595 heures",
  repartition: "15 semaines à l'école / 37 semaines en entreprise",
  rythme: "Alternance : 15 semaines école + 37 semaines entreprise",
  modalite: "100% présentiel à Champs-sur-Marne (77)",
  typeContrat: "Apprentissage ou Professionnalisation",
  effectif: "20 maximum par session",

  prerequis: [
    "Être titulaire du baccalauréat",
    "Ou niveau bac avec 3 ans d'expérience en management ou BTP",
    "Appétence pour la relation client et le commercial",
    "Motivation et projet professionnel cohérent"
  ],

  cout: "9300€ HT",
  financement: "100% prise en charge par OPCO et entreprise - Aucun frais pour l'alternant",

  certificateur: "Ministère du Travail",
  dateEnregistrement: "Enregistré au RNCP sous le n°35503",

  tauxReussite: "95%",
  tauxInsertion: "97%",

  evaluation: [
    "Contrôle continu en cours de formation",
    "Épreuve de synthèse (écrite + orale)",
    "Dossier professionnel (CRAMP)",
    "Entretien final avec jury professionnel",
    "4 projets tutorés concrets"
  ],

  poursuiteEtudes: [
    "Conducteur de Travaux Voirie et Réseaux Divers (BAC+3)",
    "Double Parcours Responsable Travaux / Coordinateur BIM (BAC+3)",
    "Chef de Projets BTP (BAC+5)"
  ],

  publicCible: "Titulaires du baccalauréat ou professionnels avec expérience souhaitant évoluer vers un poste à responsabilité commerciale et technique dans le BTP",

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
  seoTitle: "Formation Chargé d'Affaires Bâtiment BAC+2 en Alternance | CMA Education",
  seoDescription: "Formation chargé d'affaires bâtiment en alternance BTP. RNCP35503, 97% d'insertion. Devenez chef d'orchestre de projets construction. Financement 100% OPCO.",
  seoKeywords: [
    "formation chargé d'affaires bâtiment",
    "alternance BTP",
    "formation bâtiment BAC+2",
    "RNCP35503",
    "formation construction",
    "chargé d'affaires alternance",
    "formation BTP Île-de-France"
  ],

  isActive: true,
  ordre: 1
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
  console.log('🎓 Enrichissement Formation Chargé d\'Affaires du Bâtiment');
  console.log('='.repeat(60));
  console.log('📡 URL Strapi:', STRAPI_URL);
  
  if (!STRAPI_TOKEN) {
    console.log('\n❌ STRAPI_API_TOKEN non défini');
    console.log('Usage: $env:STRAPI_API_TOKEN="votre-token"; node scripts/import-formation-charge-affaires-complete.js');
    return;
  }

  // Rechercher la formation existante
  console.log('\n🔍 Recherche de la formation existante...');
  const existing = await findFormationBySlug(formationChargeAffaires.slug);

  if (existing) {
    console.log(`✅ Formation trouvée (ID: ${existing.id})`);
    console.log('📝 Mise à jour avec les données enrichies...');
    
    const success = await updateFormation(existing.id, formationChargeAffaires);
    if (success) {
      console.log('✅ Formation mise à jour avec succès !');
    } else {
      console.log('❌ Erreur lors de la mise à jour');
    }
  } else {
    console.log('⚠️ Formation non trouvée, création...');
    const success = await createFormation(formationChargeAffaires);
    if (success) {
      console.log('✅ Formation créée avec succès !');
    } else {
      console.log('❌ Erreur lors de la création');
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📋 Données importées:');
  console.log(`   • Titre: ${formationChargeAffaires.title}`);
  console.log(`   • RNCP: ${formationChargeAffaires.rncp}`);
  console.log(`   • Durée: ${formationChargeAffaires.duree}`);
  console.log(`   • Objectifs: ${formationChargeAffaires.objectifs.length} objectifs`);
  console.log(`   • Programme: ${formationChargeAffaires.programme.length} modules`);
  console.log(`   • Débouchés: ${formationChargeAffaires.debouches.length} métiers`);
  console.log(`   • Prérequis: ${formationChargeAffaires.prerequis.length} conditions`);
  console.log(`   • Évaluation: ${formationChargeAffaires.evaluation.length} modalités`);
  console.log(`   • Poursuites: ${formationChargeAffaires.poursuiteEtudes.length} formations`);
  console.log(`   • Taux insertion: ${formationChargeAffaires.tauxInsertion}`);
}

main().catch(console.error);
