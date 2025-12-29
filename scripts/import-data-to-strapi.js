/**
 * Script d'import des données existantes vers Strapi
 * Usage: node scripts/import-data-to-strapi.js
 */

const STRAPI_URL = 'http://localhost:1337';
const STRAPI_API_TOKEN = '34ebc27d0aae530b71f7c236385a2013ba8db694ccbdf80a49a5cc3e0499ae408caa45dddb48f2a9ed35fd17a8a9eedb71fbf587e0806ccc282a4c62f8aa575457bc480b312f9740d1f3e1651e196a507075ed08a858b8dda30c5c1ffc88b61352c9436b7fddeb70f6668b194166d1a18133990d6da183edb6a0f4f4694f716d';

async function fetchAPI(endpoint, method = 'GET', data = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`
    }
  };
  
  if (data) {
    options.body = JSON.stringify({ data });
  }
  
  const response = await fetch(`${STRAPI_URL}${endpoint}`, options);
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API Error ${response.status}: ${error}`);
  }
  
  return response.json();
}

// Catégories de formations
const formationCategories = [
  { name: 'Alternance', slug: 'alternance', description: 'Formations en alternance pour étudiants et jeunes professionnels' },
  { name: 'Reconversion', slug: 'reconversion', description: 'Formations pour professionnels en reconversion' },
  { name: 'VAE', slug: 'vae', description: 'Validation des Acquis de l\'Expérience' },
  { name: 'Entreprises', slug: 'entreprises', description: 'Formations sur mesure pour entreprises' },
  { name: 'VRD', slug: 'vrd', description: 'Voirie et Réseaux Divers' }
];

// Formations
const formations = [
  {
    title: "Chargé(e) d'Affaires du Bâtiment",
    slug: "charge-affaires-batiment-alternance",
    level: "Niveau 5 Européen (équivalent BAC+2)",
    rncp: "RNCP35503",
    shortDescription: "Formation conçue, validée et dispensée par des professionnels du BTP pour développer des compétences opérationnelles solides.",
    fullDescription: "Cette formation permet aux futurs chargés d'affaires de développer des compétences opérationnelles solides, mobilisables dès leur entrée en entreprise. En combinant maîtrise technique, gestion financière, coordination de projets et relation client, elle prépare des professionnels complets capables de piloter des chantiers tous corps d'état.",
    duration: "1 an en alternance (100%)",
    rhythm: "5 semaines de cours / 12 semaines en entreprise",
    price: "9300€ HT - Prise en charge par l'OPCO",
    objectives: ["Maîtriser l'analyse technique et financière des projets", "Développer des compétences commerciales avancées", "Piloter efficacement les chantiers", "Gérer la rentabilité"],
    prerequisites: ["Baccalauréat (tous les domaines)", "Ou niveau Bac avec expérience professionnelle de plus de 3 ans"],
    opportunities: ["Chargé(e) d'affaires TCE (35-50k€)", "Conducteur(trice) de travaux (32-45k€)", "Technico-commercial(e) BTP (30-42k€)"],
    successRate: 94,
    insertionRate: 89,
    isAlternance: true,
    isReconversion: false,
    publishedAt: new Date().toISOString()
  },
  {
    title: "Conducteur de Travaux – Bâtiment & Génie Civil",
    slug: "conducteur-travaux-batiment-alternance",
    level: "Niveau 5 (équivalent Bac+2)",
    rncp: "RNCP40217",
    shortDescription: "Formation professionnalisante pour devenir conducteur de travaux capable de préparer, gérer et coordonner un chantier de construction.",
    fullDescription: "Cette formation professionnalisante a pour but de vous former en tant que conducteur de travaux capables de préparer, gérer et coordonner un chantier de construction dans sa globalité.",
    duration: "1 an",
    rhythm: "17 semaines à l'école - 35 semaines en entreprise",
    price: "8000€ HT - Prise en charge par l'OPCO",
    objectives: ["Préparer un chantier", "Piloter les travaux sur le terrain", "Assurer la gestion financière", "Garantir la conformité réglementaire"],
    prerequisites: ["Être titulaire du baccalauréat", "Ou niveau bac avec 3 ans d'expérience BTP"],
    opportunities: ["Conducteur(trice) de travaux", "Chef de chantier", "Chargé(e) d'études techniques"],
    successRate: 92,
    insertionRate: 87,
    isAlternance: true,
    isReconversion: false,
    publishedAt: new Date().toISOString()
  },
  {
    title: "Chef de Chantier Voirie et Réseaux Divers",
    slug: "chef-chantier-vrd-alternance",
    level: "Niveau 5 (équivalent BAC+2)",
    rncp: "RNCP41368",
    shortDescription: "Formation professionnalisante pour devenir chef de chantier VRD capable de préparer, diriger et clôturer l'exécution de chantiers.",
    fullDescription: "Cette formation professionnalisante vous forme en tant que chef de chantier en voirie et réseaux divers capables de préparer l'exécution d'un chantier, diriger l'exécution, et clôturer l'exécution.",
    duration: "1 an",
    rhythm: "16 semaines à l'école - 36 semaines en entreprise",
    price: "9520€ HT - Prise en charge par l'OPCO",
    objectives: ["Maîtriser les fondamentaux techniques VRD", "Appliquer les techniques topographiques", "Organiser et piloter un chantier VRD/TP"],
    prerequisites: ["Titulaire d'un Bac professionnel, général ou technique", "Ou niveau Bac avec 2 ans d'expérience VRD/TP"],
    opportunities: ["Chef(fe) de chantier VRD", "Chef de chantier TP", "Chef de chantier terrassement"],
    successRate: 91,
    insertionRate: 88,
    isAlternance: true,
    isReconversion: false,
    publishedAt: new Date().toISOString()
  },
  {
    title: "Double Parcours Responsable Travaux & Coordinateur BIM",
    slug: "double-parcours-bim-alternance",
    level: "Niveau 6 (équivalent Bac+3)",
    rncp: "RNCP39408",
    shortDescription: "Formation pour devenir professionnel du BTP capable de conduire des chantiers tout en intégrant les outils numériques BIM.",
    fullDescription: "Cette formation vise à former des professionnels du BTP capables de conduire des chantiers de construction tout en intégrant les outils numériques collaboratifs du BIM.",
    duration: "1 an",
    rhythm: "20 semaines à l'école - 32 semaines en entreprise",
    price: "9000€ HT - Prise en charge par l'OPCO",
    objectives: ["Gérer un chantier de A à Z", "Mettre en œuvre les protocoles BIM", "Intégrer le Lean Construction"],
    prerequisites: ["BAC+2 professionnel ou technique dans le BTP", "Ou niveau 5 avec expérience significative"],
    opportunities: ["Coordinateur BIM", "Responsable de chantier", "Chargé de projet BIM"],
    successRate: 93,
    insertionRate: 91,
    isAlternance: true,
    isReconversion: false,
    publishedAt: new Date().toISOString()
  },
  {
    title: "Chef de Projets BTP",
    slug: "chef-projets-btp-alternance",
    level: "Niveau 7 (équivalent Bac+5)",
    rncp: "En cours d'enregistrement",
    shortDescription: "Formation préparant des experts capables de gérer des projets de construction complexes et innovants.",
    fullDescription: "Cette formation prépare des experts capables de gérer des projets de construction complexes et innovants, en intégrant les enjeux contemporains du BTP.",
    duration: "2 ans",
    rhythm: "40 semaines à l'école - 64 semaines en entreprise",
    price: "13€ HT/h de formation",
    objectives: ["Piloter des projets complexes", "Intégrer BIM et IA", "Manager des équipes pluridisciplinaires"],
    prerequisites: ["BAC+3 professionnel ou technique dans le BTP", "Ou niveau 6 avec expérience"],
    opportunities: ["Chef de projets BTP", "Ingénieur travaux", "Manager de la construction"],
    successRate: 95,
    insertionRate: 92,
    isAlternance: true,
    isReconversion: false,
    publishedAt: new Date().toISOString()
  }
];

// Partenaires
const partners = [
  { name: 'Eiffage', sector: 'Construction & Concessions', description: '73000 collaborateurs - Grand Paris Express, Rénovation urbaine', website: 'https://www.eiffage.com', publishedAt: new Date().toISOString() },
  { name: 'Bouygues Construction', sector: 'Bâtiment & Travaux Publics', description: '50000 collaborateurs - Tour Incity, Stade de France', website: 'https://www.bouygues-construction.com', publishedAt: new Date().toISOString() },
  { name: 'Vinci Construction', sector: 'Infrastructure & Bâtiment', description: '185000 collaborateurs - LGV, Aéroports de Paris', website: 'https://www.vinci-construction.com', publishedAt: new Date().toISOString() },
  { name: 'Spie Batignolles', sector: 'Construction & Génie Civil', description: '8500 collaborateurs - Métro automatique, Logements sociaux', website: 'https://www.spiebatignolles.fr', publishedAt: new Date().toISOString() }
];

// Témoignages
const testimonials = [
  { author: 'Marie D.', role: 'Chargée d\'affaires', company: 'Eiffage', content: 'La formation m\'a permis d\'acquérir toutes les compétences nécessaires pour mon poste actuel. L\'alternance a été un vrai plus.', rating: 5, publishedAt: new Date().toISOString() },
  { author: 'Thomas L.', role: 'Conducteur de travaux', company: 'Bouygues', content: 'Excellente formation, très professionnalisante. Les formateurs sont des experts du terrain.', rating: 5, publishedAt: new Date().toISOString() },
  { author: 'Sophie M.', role: 'Coordinatrice BIM', company: 'Vinci', content: 'Le double parcours BIM m\'a ouvert de nombreuses portes. Je recommande vivement cette formation.', rating: 5, publishedAt: new Date().toISOString() }
];

// Site Settings
const siteSettings = {
  siteName: 'CMA Education',
  siteDescription: 'Centre de formation BTP - Formations en alternance, reconversion et VAE',
  contactEmail: 'contact@cma-education.com',
  contactPhone: '01 23 45 67 89',
  address: 'Paris, France',
  socialFacebook: 'https://facebook.com/cma-education',
  socialLinkedin: 'https://linkedin.com/company/cma-education',
  publishedAt: new Date().toISOString()
};

async function importData() {
  console.log('🚀 Début de l\'import des données vers Strapi...\n');

  try {
    // 1. Import des catégories de formations
    console.log('📁 Import des catégories de formations...');
    const categoryIds = {};
    for (const category of formationCategories) {
      try {
        const result = await fetchAPI('/api/formation-categories', 'POST', category);
        categoryIds[category.slug] = result.data.id;
        console.log(`  ✅ Catégorie "${category.name}" créée`);
      } catch (error) {
        console.log(`  ⚠️ Catégorie "${category.name}": ${error.message}`);
      }
    }

    // 2. Import des formations
    console.log('\n📚 Import des formations...');
    for (const formation of formations) {
      try {
        const formationData = {
          ...formation,
          category: categoryIds['alternance'] // Lier à la catégorie alternance
        };
        await fetchAPI('/api/formations', 'POST', formationData);
        console.log(`  ✅ Formation "${formation.title}" créée`);
      } catch (error) {
        console.log(`  ⚠️ Formation "${formation.title}": ${error.message}`);
      }
    }

    // 3. Import des partenaires
    console.log('\n🤝 Import des partenaires...');
    for (const partner of partners) {
      try {
        await fetchAPI('/api/partners', 'POST', partner);
        console.log(`  ✅ Partenaire "${partner.name}" créé`);
      } catch (error) {
        console.log(`  ⚠️ Partenaire "${partner.name}": ${error.message}`);
      }
    }

    // 4. Import des témoignages
    console.log('\n💬 Import des témoignages...');
    for (const testimonial of testimonials) {
      try {
        await fetchAPI('/api/testimonials', 'POST', testimonial);
        console.log(`  ✅ Témoignage de "${testimonial.author}" créé`);
      } catch (error) {
        console.log(`  ⚠️ Témoignage de "${testimonial.author}": ${error.message}`);
      }
    }

    // 5. Import des paramètres du site
    console.log('\n⚙️ Import des paramètres du site...');
    try {
      await fetchAPI('/api/site-setting', 'PUT', siteSettings);
      console.log('  ✅ Paramètres du site configurés');
    } catch (error) {
      console.log(`  ⚠️ Paramètres du site: ${error.message}`);
    }

    console.log('\n✨ Import terminé avec succès!');
    console.log('\n📊 Résumé:');
    console.log(`  - ${formationCategories.length} catégories`);
    console.log(`  - ${formations.length} formations`);
    console.log(`  - ${partners.length} partenaires`);
    console.log(`  - ${testimonials.length} témoignages`);

  } catch (error) {
    console.error('\n❌ Erreur lors de l\'import:', error.message);
  }
}

importData();
