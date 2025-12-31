#!/usr/bin/env node

/**
 * Script d'import d'exemples de formations avec images via Strapi
 * Inclut des formations pour chaque catégorie : Alternance, Reconversion, VAE, Entreprise
 */

const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

// Configuration Strapi
const STRAPI_URL = process.env.STRAPI_URL || 'https://cma-education-strapi-production.up.railway.app';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || 'your-strapi-token';

console.log('📚 Import d\'exemples de formations avec images via Strapi');
console.log('=' .repeat(60));

// Exemples de formations par catégorie
const formationsExamples = {
  alternance: [
    {
      title: "Chargé d'Affaires Bâtiment - Alternance",
      slug: "charge-affaires-batiment-alternance",
      level: "Niveau 5 (BAC+2)",
      rncp: "RNCP35503",
      rncpUrl: "https://www.francecompetences.fr/recherche/rncp/35503/",
      shortDescription: "Formation en alternance pour devenir chargé d'affaires dans le secteur du bâtiment. Alliant théorie et pratique en entreprise.",
      fullDescription: "Cette formation prépare aux métiers de chargé d'affaires dans le secteur du bâtiment. L'alternance permet d'acquérir une expérience professionnelle solide tout en suivant les cours théoriques.",
      duration: "1 an",
      rhythm: "3 semaines en entreprise / 1 semaine en formation",
      mode: "Alternance",
      price: "Prise en charge OPCO",
      objectives: [
        "Maîtriser la gestion commerciale et technique des projets",
        "Développer un portefeuille clients",
        "Piloter les phases d'un projet de construction"
      ],
      opportunities: [
        "Chargé d'affaires BTP",
        "Technico-commercial",
        "Responsable développement commercial"
      ],
      prerequisites: ["BAC ou équivalent", "Motivation pour le secteur BTP"],
      successRate: 95,
      insertionRate: 98,
      imageName: "charge-affaires-alternance.jpg"
    },
    {
      title: "Conducteur de Travaux Bâtiment - Alternance",
      slug: "conducteur-travaux-batiment-alternance",
      level: "Niveau 5 (BAC+2)",
      rncp: "RNCP40217",
      rncpUrl: "https://www.francecompetences.fr/recherche/rncp/40217/",
      shortDescription: "Formation alternance pour devenir conducteur de travaux, responsable de la coordination et du suivi des chantiers.",
      fullDescription: "Formation complète pour maîtriser la conduite de travaux dans le bâtiment. L'alternance offre une immersion totale dans le monde professionnel.",
      duration: "1 an",
      rhythm: "2 semaines en entreprise / 1 semaine en formation",
      mode: "Alternance",
      price: "Prise en charge OPCO",
      objectives: [
        "Organiser et planifier les chantiers",
        "Gérer les équipes et sous-traitants",
        "Assurer le suivi qualité et sécurité"
      ],
      opportunities: [
        "Conducteur de travaux",
        "Chef de chantier",
        "Responsable travaux"
      ],
      prerequisites: ["BAC STI2D ou équivalent", "Intérêt pour le management"],
      successRate: 92,
      insertionRate: 96,
      imageName: "conducteur-travaux-alternance.jpg"
    }
  ],
  
  reconversion: [
    {
      title: "Chargé d'Affaires Bâtiment - Reconversion Professionnelle",
      slug: "charge-affaires-batiment-reconversion",
      level: "Niveau 5 (BAC+2)",
      rncp: "RNCP35503",
      rncpUrl: "https://www.francecompetences.fr/recherche/rncp/35503/",
      shortDescription: "Formation intensive pour professionnels en reconversion vers les métiers du BTP. Valorise l'expérience acquise.",
      fullDescription: "Parcours adapté aux professionnels souhaitant se reconvertir dans le BTP. La formation valorise les compétences transférables et accélère l'insertion.",
      duration: "7 mois",
      rhythm: "Temps plein intensif",
      mode: "Présentiel + stage",
      price: "CPF / Pôle Emploi",
      objectives: [
        "Acquérir les fondamentaux du BTP",
        "Développer les compétences commerciales spécifiques",
        "Maîtriser la réglementation du secteur"
      ],
      opportunities: [
        "Chargé d'affaires junior",
        "Assistant commercial BTP",
        "Technico-commercial"
      ],
      prerequisites: ["Expérience professionnelle 3 ans minimum", "Projet de reconversion validé"],
      successRate: 88,
      insertionRate: 94,
      imageName: "charge-affaires-reconversion.jpg"
    },
    {
      title: "Conducteur de Travaux - Reconversion Professionnelle",
      slug: "conducteur-travaux-reconversion",
      level: "Niveau 5 (BAC+2)",
      rncp: "RNCP40217",
      rncpUrl: "https://www.francecompetences.fr/recherche/rncp/40217/",
      shortDescription: "Parcours intensif pour devenir conducteur de travaux. Idéal pour les professionnels en reconversion avec expérience managériale.",
      fullDescription: "Formation accélérée qui s'appuie sur l'expérience managériale des candidats pour les former aux spécificités de la conduite de travaux BTP.",
      duration: "7 mois",
      rhythm: "5 mois formation + 2 mois stage",
      mode: "Présentiel",
      price: "15€/heure (financement possible)",
      objectives: [
        "Maîtriser la planification de chantier",
        "Gérer les aspects techniques et humains",
        "Assurer la rentabilité des projets"
      ],
      opportunities: [
        "Conducteur de travaux",
        "Chef de chantier",
        "Coordinateur travaux"
      ],
      prerequisites: ["Expérience managériale", "Aptitudes techniques"],
      successRate: 85,
      insertionRate: 91,
      imageName: "conducteur-travaux-reconversion.jpg"
    }
  ],

  vae: [
    {
      title: "VAE Chargé d'Affaires Bâtiment",
      slug: "vae-charge-affaires-batiment",
      level: "Niveau 5 (BAC+2)",
      rncp: "RNCP35503",
      rncpUrl: "https://www.francecompetences.fr/recherche/rncp/35503/",
      shortDescription: "Validation des Acquis de l'Expérience pour obtenir le titre de Chargé d'Affaires Bâtiment. Reconnaissance officielle de votre expertise.",
      fullDescription: "La VAE permet de faire reconnaître officiellement vos compétences acquises par l'expérience professionnelle dans le domaine commercial BTP.",
      duration: "6 à 12 mois",
      rhythm: "Accompagnement personnalisé",
      mode: "Mixte (présentiel/distanciel)",
      price: "4500€ TTC avec accompagnement",
      objectives: [
        "Constituer un dossier de preuves",
        "Préparer la soutenance devant jury",
        "Obtenir la certification RNCP"
      ],
      opportunities: [
        "Évolution de poste",
        "Reconnaissance salariale",
        "Mobilité professionnelle"
      ],
      prerequisites: ["3 ans d'expérience minimum dans le domaine"],
      successRate: 78,
      insertionRate: 100,
      imageName: "vae-charge-affaires.jpg"
    },
    {
      title: "VAE Conducteur de Travaux",
      slug: "vae-conducteur-travaux",
      level: "Niveau 5 (BAC+2)",
      rncp: "RNCP40217",
      rncpUrl: "https://www.francecompetences.fr/recherche/rncp/40217/",
      shortDescription: "VAE pour conducteurs de travaux expérimentés souhaitant obtenir une reconnaissance officielle de leurs compétences.",
      fullDescription: "Parcours VAE adapté aux professionnels ayant une expérience significative en conduite de travaux et souhaitant obtenir le titre RNCP.",
      duration: "8 à 15 mois",
      rhythm: "Accompagnement sur mesure",
      mode: "Présentiel + visio",
      price: "4500€ TTC (financement CPF possible)",
      objectives: [
        "Analyser et formaliser l'expérience",
        "Rédiger le dossier de validation",
        "Réussir l'entretien avec le jury"
      ],
      opportunities: [
        "Certification officielle",
        "Évolution hiérarchique",
        "Augmentation salariale"
      ],
      prerequisites: ["5 ans d'expérience en conduite de travaux"],
      successRate: 82,
      insertionRate: 100,
      imageName: "vae-conducteur-travaux.jpg"
    }
  ],

  entreprise: [
    {
      title: "Formation Lean Construction pour Entreprises",
      slug: "lean-construction-entreprises",
      level: "Formation continue",
      rncp: null,
      rncpUrl: null,
      shortDescription: "Formation sur mesure pour optimiser les processus de construction et réduire les gaspillages dans vos projets.",
      fullDescription: "Formation pratique aux méthodes Lean Construction pour améliorer l'efficacité, réduire les coûts et optimiser la collaboration sur vos chantiers.",
      duration: "3 jours",
      rhythm: "Formation intensive",
      mode: "Intra-entreprise ou inter-entreprises",
      price: "700€ HT/participant",
      objectives: [
        "Comprendre les principes du Lean Construction",
        "Identifier et éliminer les gaspillages",
        "Mettre en place des outils d'amélioration continue"
      ],
      opportunities: [
        "Amélioration de la productivité",
        "Réduction des coûts",
        "Meilleure collaboration équipes"
      ],
      prerequisites: ["Encadrement ou gestion de projets BTP"],
      successRate: 95,
      insertionRate: null,
      imageName: "lean-construction-entreprise.jpg"
    },
    {
      title: "BIM Collaboratif - Formation Entreprise",
      slug: "bim-collaboratif-entreprises",
      level: "Formation continue",
      rncp: null,
      rncpUrl: null,
      shortDescription: "Maîtrisez les outils BIM et la collaboration numérique pour vos projets de construction. Formation adaptée à vos logiciels.",
      fullDescription: "Formation complète au BIM collaboratif, adaptée aux outils utilisés dans votre entreprise. Améliore la coordination et réduit les erreurs projet.",
      duration: "5 jours",
      rhythm: "1 semaine intensive ou étalée",
      mode: "Sur site ou dans nos locaux",
      price: "850€ HT/participant",
      objectives: [
        "Maîtriser les outils BIM (Revit, ArchiCAD...)",
        "Organiser la collaboration BIM",
        "Gérer les conflits et coordonner les corps d'état"
      ],
      opportunities: [
        "Amélioration qualité projets",
        "Réduction erreurs et reprises",
        "Conformité BIM obligatoire"
      ],
      prerequisites: ["Notions CAO/DAO", "Gestion de projets"],
      successRate: 92,
      insertionRate: null,
      imageName: "bim-collaboratif-entreprise.jpg"
    }
  ]
};

// Fonction pour créer une catégorie si elle n'existe pas
async function createCategoryIfNotExists(categoryName, categorySlug) {
  try {
    console.log(`🏷️  Vérification de la catégorie: ${categoryName}`);
    
    // Vérifier si la catégorie existe
    const existingCategories = await axios.get(`${STRAPI_URL}/api/categories`, {
      headers: { Authorization: `Bearer ${STRAPI_TOKEN}` }
    });
    
    const existingCategory = existingCategories.data.data.find(cat => cat.attributes.slug === categorySlug);
    
    if (existingCategory) {
      console.log(`✅ Catégorie "${categoryName}" existe déjà (ID: ${existingCategory.id})`);
      return existingCategory.id;
    }
    
    // Créer la catégorie
    const newCategory = await axios.post(`${STRAPI_URL}/api/categories`, {
      data: {
        name: categoryName,
        slug: categorySlug,
        description: `Formations ${categoryName.toLowerCase()}`,
        publishedAt: new Date().toISOString()
      }
    }, {
      headers: { Authorization: `Bearer ${STRAPI_TOKEN}` }
    });
    
    console.log(`✅ Catégorie "${categoryName}" créée (ID: ${newCategory.data.data.id})`);
    return newCategory.data.data.id;
    
  } catch (error) {
    console.error(`❌ Erreur lors de la création de la catégorie ${categoryName}:`, error.response?.data || error.message);
    return null;
  }
}

// Fonction pour uploader une image
async function uploadImage(imageName, imageBuffer) {
  try {
    const formData = new FormData();
    formData.append('files', imageBuffer, imageName);
    
    const response = await axios.post(`${STRAPI_URL}/api/upload`, formData, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
        ...formData.getHeaders()
      }
    });
    
    console.log(`📸 Image "${imageName}" uploadée (ID: ${response.data[0].id})`);
    return response.data[0].id;
    
  } catch (error) {
    console.error(`❌ Erreur upload image ${imageName}:`, error.response?.data || error.message);
    return null;
  }
}

// Fonction pour créer une image placeholder
function createPlaceholderImage(width = 800, height = 600, text = 'Formation BTP') {
  // Créer une image SVG simple comme placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#3B82F6"/>
      <rect x="50" y="50" width="${width-100}" height="${height-100}" fill="#1E40AF" opacity="0.8"/>
      <text x="50%" y="45%" text-anchor="middle" fill="white" font-size="32" font-family="Arial, sans-serif">
        ${text}
      </text>
      <text x="50%" y="55%" text-anchor="middle" fill="#E5E7EB" font-size="18" font-family="Arial, sans-serif">
        Construction Management Academy
      </text>
      <circle cx="100" cy="100" r="30" fill="#FBBF24" opacity="0.7"/>
      <circle cx="${width-100}" cy="${height-100}" r="40" fill="#10B981" opacity="0.5"/>
    </svg>
  `;
  
  return Buffer.from(svg);
}

// Fonction pour importer une formation
async function importFormation(formation, categoryId) {
  try {
    console.log(`📚 Import de la formation: ${formation.title}`);
    
    // Créer l'image placeholder
    const imageBuffer = createPlaceholderImage(800, 600, formation.title.split(' ')[0]);
    const imageId = await uploadImage(formation.imageName, imageBuffer);
    
    // Préparer les données de la formation
    const formationData = {
      title: formation.title,
      slug: formation.slug,
      level: formation.level,
      rncp: formation.rncp,
      rncpUrl: formation.rncpUrl,
      shortDescription: formation.shortDescription,
      fullDescription: formation.fullDescription,
      duration: formation.duration,
      rhythm: formation.rhythm,
      mode: formation.mode,
      price: formation.price,
      objectives: formation.objectives,
      opportunities: formation.opportunities,
      prerequisites: formation.prerequisites,
      successRate: formation.successRate,
      insertionRate: formation.insertionRate,
      category: categoryId,
      publishedAt: new Date().toISOString()
    };
    
    // Ajouter l'image si elle a été uploadée
    if (imageId) {
      formationData.image = imageId;
    }
    
    // Créer la formation
    const response = await axios.post(`${STRAPI_URL}/api/formations`, {
      data: formationData
    }, {
      headers: { Authorization: `Bearer ${STRAPI_TOKEN}` }
    });
    
    console.log(`✅ Formation "${formation.title}" importée (ID: ${response.data.data.id})`);
    return response.data.data.id;
    
  } catch (error) {
    console.error(`❌ Erreur import formation ${formation.title}:`, error.response?.data || error.message);
    return null;
  }
}

// Fonction principale d'import
async function importAllFormationsExamples() {
  console.log('\n🚀 Début de l\'import des exemples de formations...\n');
  
  const categories = {
    alternance: { name: 'Alternance', slug: 'alternance' },
    reconversion: { name: 'Reconversion Professionnelle', slug: 'reconversion' },
    vae: { name: 'VAE', slug: 'vae' },
    entreprise: { name: 'Formations Entreprises', slug: 'entreprise' }
  };
  
  const results = {
    categories: {},
    formations: {},
    errors: []
  };
  
  // Créer les catégories
  for (const [key, category] of Object.entries(categories)) {
    const categoryId = await createCategoryIfNotExists(category.name, category.slug);
    if (categoryId) {
      results.categories[key] = categoryId;
    } else {
      results.errors.push(`Échec création catégorie ${category.name}`);
    }
  }
  
  // Importer les formations par catégorie
  for (const [categoryKey, formations] of Object.entries(formationsExamples)) {
    const categoryId = results.categories[categoryKey];
    if (!categoryId) {
      console.log(`⚠️  Catégorie ${categoryKey} non disponible, formations ignorées`);
      continue;
    }
    
    console.log(`\n📂 Import des formations ${categoryKey.toUpperCase()}:`);
    results.formations[categoryKey] = [];
    
    for (const formation of formations) {
      const formationId = await importFormation(formation, categoryId);
      if (formationId) {
        results.formations[categoryKey].push(formationId);
      } else {
        results.errors.push(`Échec import ${formation.title}`);
      }
      
      // Pause entre les imports
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  return results;
}

// Fonction pour afficher le résumé
function displayResults(results) {
  console.log('\n' + '='.repeat(60));
  console.log('📊 RÉSUMÉ DE L\'IMPORT');
  console.log('='.repeat(60));
  
  // Catégories créées
  console.log('\n🏷️  Catégories:');
  Object.entries(results.categories).forEach(([key, id]) => {
    console.log(`   ✅ ${key}: ID ${id}`);
  });
  
  // Formations importées
  console.log('\n📚 Formations importées:');
  let totalFormations = 0;
  Object.entries(results.formations).forEach(([category, formations]) => {
    console.log(`   📂 ${category}: ${formations.length} formations`);
    totalFormations += formations.length;
  });
  
  console.log(`\n📈 Total: ${totalFormations} formations importées`);
  
  // Erreurs
  if (results.errors.length > 0) {
    console.log('\n❌ Erreurs rencontrées:');
    results.errors.forEach(error => console.log(`   • ${error}`));
  }
  
  console.log('\n🎉 Import terminé !');
  console.log('\n💡 Prochaines étapes:');
  console.log('   1. Vérifiez les formations dans l\'admin Strapi');
  console.log('   2. Testez l\'affichage sur le frontend');
  console.log('   3. Ajustez les images si nécessaire');
  console.log('   4. Configurez les permissions d\'accès');
}

// Exécution du script
async function main() {
  try {
    // Vérifier la connexion Strapi
    console.log('🔗 Vérification de la connexion Strapi...');
    await axios.get(`${STRAPI_URL}/api/formations`, {
      headers: { Authorization: `Bearer ${STRAPI_TOKEN}` }
    });
    console.log('✅ Connexion Strapi OK\n');
    
    // Lancer l'import
    const results = await importAllFormationsExamples();
    
    // Afficher les résultats
    displayResults(results);
    
  } catch (error) {
    console.error('❌ Erreur de connexion Strapi:', error.response?.data || error.message);
    console.log('\n💡 Vérifiez:');
    console.log('   • L\'URL Strapi dans STRAPI_URL');
    console.log('   • Le token d\'authentification dans STRAPI_TOKEN');
    console.log('   • Que Strapi est démarré et accessible');
  }
}

// Lancer le script si exécuté directement
if (require.main === module) {
  main();
}

module.exports = {
  importAllFormationsExamples,
  formationsExamples,
  createCategoryIfNotExists,
  uploadImage,
  importFormation
};
