/**
 * Script d'import COMPLET du contenu Formations Entreprises dans Strapi
 * 100% modifiable via le panel admin Strapi
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${STRAPI_TOKEN}`
};

// ============================================
// PAGE ENTREPRISES - CONTENU COMPLET
// ============================================

const pageEntrepriseContent = {
  heroTitre: "Formations BTP pour Entreprises",
  heroSousTitre: "Formations sur mesure",
  heroDescription: "Chez Construction Management Academy, nous accompagnons les entreprises souhaitant faire évoluer leurs salariés pour qu'ils deviennent de véritables piliers dans leur secteur d'activité. Nos formations sont conçues pour développer les compétences, booster la performance et permettre à vos équipes de s'adapter aux exigences actuelles du marché.",
  heroBoutonPrincipal: "Demander un devis",
  heroBoutonSecondaire: "Télécharger la brochure",
  
  sectionInvestirTitre: "Pourquoi investir dans la formation de vos salariés ?",
  sectionInvestirSousTitre: "Les avantages",
  
  sectionThematiquesTitre: "Nos thématiques de formation pour les entreprises",
  sectionThematiquesSousTitre: "Formations populaires",
  sectionThematiquesDescription: "Nous couvrons de nombreux domaines, avec des modules courts ou des parcours complets. Parmi les formations les plus demandées :",
  
  surMesureTitre: "Formations sur mesure et adaptables",
  surMesureDescription: "Toutes nos formations pour les entreprises sont proposées sur devis, afin de s'adapter parfaitement à vos besoins spécifiques et vos objectifs.",
  surMesureBouton: "Demander un programme personnalisé",
  
  modalitesTitre: "Modalités de formation",
  modalitesSousTitre: "Flexibilité totale",
  modalitesDescription: "Nos formations sont proposées dans toute la France selon vos préférences",
  
  tarifTitre: "Tarification",
  tarifJour: "À partir de 700€ HT",
  tarifJourLabel: "Par jour et par stagiaire",
  tarifDescription: "Le coût varie selon le format (inter/intra), la durée, le contenu personnalisé.",
  tarifIntra: "Tarif formation en intra : nous consulter",
  
  financementTitre: "Financement",
  financementDescription: "Nous vous accompagnons dans la mobilisation de vos droits à la formation",
  financements: [
    "Plan de développement des compétences",
    "Financement via OPCO (Constructys, Atlas…)",
    "CPF pour les formations certifiantes"
  ],
  
  ctaTitre: "Prêt à former vos équipes ?",
  ctaDescription: "Contactez-nous pour discuter de vos besoins et obtenir un devis personnalisé",
  ctaBoutonPrincipal: "Nous contacter",
  ctaBoutonSecondaire: "Télécharger la brochure",
  telephone: "01 89 70 60 52",
  email: "contact.academy@cma-education.com"
};

// Services/Avantages Entreprise
const entrepriseServices = [
  {
    titre: "Amélioration des performances internes",
    description: "Des collaborateurs mieux formés, c'est une productivité renforcée et une meilleure efficacité dans les missions du quotidien.",
    icone: "TrendingUp",
    ordre: 1
  },
  {
    titre: "Adaptation aux évolutions du secteur",
    description: "Le monde du BTP évolue rapidement : se former, c'est rester compétitif et à la pointe des nouvelles méthodes et réglementations.",
    icone: "Zap",
    ordre: 2
  },
  {
    titre: "Fidélisation des talents",
    description: "Offrir des formations à vos équipes, c'est aussi leur montrer que vous investissez en eux — un excellent levier de motivation et de fidélité.",
    icone: "Heart",
    ordre: 3
  },
  {
    titre: "Valorisez votre image employeur",
    description: "Une entreprise qui forme ses salariés est perçue comme innovante, responsable et tournée vers l'avenir.",
    icone: "Award",
    ordre: 4
  }
];

// Thématiques de formation
const formationThematiques = [
  {
    nom: "Lean Construction",
    description: "Optimiser les processus chantier pour gagner en efficacité",
    duree: "2-3 jours",
    niveau: "Intermédiaire",
    prix: "Sur devis",
    ordre: 1
  },
  {
    nom: "Pilotage de projet de rénovation énergétique",
    description: "Maîtriser les enjeux de la transition énergétique dans le BTP",
    duree: "3-5 jours",
    niveau: "Avancé",
    prix: "Sur devis",
    ordre: 2
  },
  {
    nom: "Management financier d'un projet de construction",
    description: "Gérer les budgets, la rentabilité et les coûts de vos projets",
    duree: "2-4 jours",
    niveau: "Intermédiaire",
    prix: "Sur devis",
    ordre: 3
  },
  {
    nom: "Gestion de chantier, coordination d'intervenants, sécurité",
    description: "Piloter efficacement vos équipes terrain et garantir la sécurité",
    duree: "3-5 jours",
    niveau: "Tous niveaux",
    prix: "Sur devis",
    ordre: 4
  },
  {
    nom: "BIM collaboratif – prise en main Revit / méthodologie BIM",
    description: "Maîtriser la maquette numérique et le travail collaboratif BIM",
    duree: "5-10 jours",
    niveau: "Débutant à Avancé",
    prix: "Sur devis",
    ordre: 5
  }
];

// Modalités de formation
const entrepriseModalites = [
  {
    type: "Inter-entreprise",
    description: "Dans nos locaux selon un calendrier défini, avec des participants de différentes entreprises",
    ordre: 1
  },
  {
    type: "Intra-entreprise",
    description: "Sur site ou en distanciel, formation dédiée à vos équipes uniquement",
    ordre: 2
  },
  {
    type: "100% sur mesure",
    description: "Nous construisons avec vous un programme adapté à vos besoins spécifiques et objectifs",
    ordre: 3
  }
];

// ============================================
// FONCTIONS D'IMPORT
// ============================================

async function importPageEntreprise() {
  console.log('\n📄 Import Page Entreprises (Single Type)...');
  
  try {
    const response = await fetch(`${STRAPI_URL}/api/page-entreprise`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ data: { ...pageEntrepriseContent, publishedAt: new Date().toISOString() } })
    });
    
    if (response.ok) {
      console.log('✅ Page Entreprises importée avec succès');
    } else {
      const error = await response.text();
      console.log('❌ Erreur Page Entreprises:', error.substring(0, 200));
    }
  } catch (error) {
    console.log('❌ Erreur:', error.message);
  }
}

async function clearAndImportCollection(endpoint, items, name) {
  console.log(`\n📦 Import ${name}...`);
  
  // Supprimer les anciens
  try {
    const existing = await fetch(`${STRAPI_URL}/api/${endpoint}`, { headers });
    if (existing.ok) {
      const data = await existing.json();
      for (const item of (data.data || [])) {
        await fetch(`${STRAPI_URL}/api/${endpoint}/${item.id}`, { method: 'DELETE', headers });
      }
    }
  } catch (e) {}
  
  // Importer les nouveaux
  let success = 0;
  for (const item of items) {
    try {
      const response = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ data: { ...item, publishedAt: new Date().toISOString() } })
      });
      if (response.ok) success++;
    } catch (e) {}
  }
  
  console.log(`✅ ${name}: ${success}/${items.length} importés`);
}

async function main() {
  console.log('🚀 Import COMPLET du contenu Formations Entreprises dans Strapi');
  console.log('================================================================');
  console.log('📡 URL:', STRAPI_URL);
  
  if (!STRAPI_TOKEN) {
    console.log('\n❌ STRAPI_API_TOKEN non défini');
    console.log('   Définissez: $env:STRAPI_API_TOKEN="votre_token"');
    return;
  }
  
  await importPageEntreprise();
  await clearAndImportCollection('entreprise-services', entrepriseServices, 'Services/Avantages Entreprise');
  await clearAndImportCollection('formation-thematiques', formationThematiques, 'Thématiques de formation');
  await clearAndImportCollection('entreprise-modalites', entrepriseModalites, 'Modalités de formation');
  
  console.log('\n================================================================');
  console.log('✅ Import terminé !');
  console.log('\n📋 Contenu 100% modifiable via Strapi Admin:');
  console.log('   • Page Entreprises: tous les textes, titres, boutons, tarifs');
  console.log('   • 4 avantages/services');
  console.log('   • 5 thématiques de formation');
  console.log('   • 3 modalités de formation');
  console.log('   • Financements (liste JSON)');
  console.log('\n🔗 Admin: http://localhost:1337/admin');
  console.log('🌐 Page: http://localhost:3000/formations/entreprises');
}

main().catch(console.error);
