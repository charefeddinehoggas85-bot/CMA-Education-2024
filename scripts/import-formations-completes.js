/**
 * Import complet de toutes les formations vers Strapi
 * Usage: node scripts/import-formations-completes.js
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
  {
    name: 'Alternance',
    slug: 'alternance',
    description: 'Formations en alternance pour acquérir une expérience professionnelle',
    color: '#3B82F6',
    icon: 'GraduationCap',
    ordre: 1,
    publishedAt: new Date().toISOString()
  },
  {
    name: 'Reconversion',
    slug: 'reconversion',
    description: 'Formations pour professionnels en reconversion',
    color: '#10B981',
    icon: 'RotateCcw',
    ordre: 2,
    publishedAt: new Date().toISOString()
  },
  {
    name: 'VAE',
    slug: 'vae',
    description: 'Validation des Acquis de l\'Expérience',
    color: '#F59E0B',
    icon: 'Award',
    ordre: 3,
    publishedAt: new Date().toISOString()
  },
  {
    name: 'VRD',
    slug: 'vrd',
    description: 'Formations Voirie et Réseaux Divers',
    color: '#8B5CF6',
    icon: 'Road',
    ordre: 4,
    publishedAt: new Date().toISOString()
  }
];

// Formations Alternance (depuis src/lib/data.ts)
const formationsAlternance = [
  {
    title: 'Chargé(e) d\'Affaires du Bâtiment',
    slug: 'alt-bac2-charge-affaires',
    level: 'Niveau 5 Européen (équivalent BAC+2)',
    rncp: 'RNCP35503',
    shortDesc: 'Formation conçue, validée et dispensée par des professionnels du BTP pour développer des compétences opérationnelles solides.',
    fullDesc: 'Cette formation permet aux futurs chargés d\'affaires de développer des compétences opérationnelles solides, mobilisables dès leur entrée en entreprise. En combinant maîtrise technique, gestion financière, coordination de projets et relation client, elle prépare des professionnels complets capables de piloter des chantiers tous corps d\'état.',
    objectifs: [
      'Maîtriser l\'analyse technique et financière des projets de construction',
      'Développer des compétences commerciales avancées (prospection, négociation, suivi client)',
      'Piloter efficacement les chantiers : planification, coordination, gestion des aléas',
      'Gérer la rentabilité : études de prix, optimisation des coûts, suivi budgétaire',
      'Manager les équipes et coordonner les différents corps de métier',
      'Maîtriser les outils numériques du BTP (logiciels de chiffrage, planning, BIM)',
      'Assurer la qualité, la sécurité et le respect des normes environnementales'
    ],
    programme: [
      'Techniques de construction & lecture de plans : Maîtrise des matériaux, procédés constructifs, lecture de plans d\'exécution, métré, pathologies du bâtiment',
      'Études de prix & pilotage financier : Chiffrage détaillé, analyse des coûts, négociation fournisseurs, suivi de rentabilité, tableaux de bord financiers',
      'Gestion de projet & coordination de chantier : Planification (MS Project, Primavera), coordination TCE, gestion des interfaces, suivi qualité-délais-coûts',
      'Relation client & communication professionnelle : Prospection commerciale, présentation d\'offres, gestion de la relation client, résolution de conflits, communication de crise',
      'Outils numériques BTP : Logiciels de chiffrage (Batiprix, Devisoc), maquette numérique BIM, outils collaboratifs, applications mobiles chantier',
      'Réglementation & sécurité : Code de la construction, normes environnementales, prévention des risques, responsabilités juridiques'
    ],
    debouches: [
      'Chargé(e) d\'affaires tous corps d\'état (salaire : 35-50k€)',
      'Conducteur(trice) de travaux (salaire : 32-45k€)',
      'Technico-commercial(e) BTP (salaire : 30-42k€ + primes)',
      'Coordinateur(trice) OPC (salaire : 35-48k€)',
      'Responsable de programmes immobiliers (salaire : 40-60k€)',
      'Chef de projet maîtrise d\'œuvre (salaire : 38-55k€)',
      'Consultant en ingénierie bâtiment (salaire : 35-50k€)'
    ],
    duree: '1 an en alternance (100%)',
    volumeHoraire: '595 heures en centre + 910 heures en entreprise',
    rythme: '5 semaines de cours / 12 semaines en entreprise',
    modalite: 'Formation 100% en présentiel',
    typeContrat: 'Contrat d\'apprentissage, de professionnalisation ou période de reconversion',
    effectif: '16 participants maximum (suivi personnalisé)',
    prerequis: [
      'Baccalauréat (tous les domaines)',
      'Ou niveau Bac avec expérience professionnelle managériale ou dans le BTP de plus de 3 ans'
    ],
    cout: '9300€ HT - Prise en charge par l\'OPCO et l\'entreprise - Aucun frais à la charge des alternants',
    certificateur: 'Ministère du Travail',
    dateEnregistrement: '14/04/2021 pour 5 ans',
    entreprisesPartenaires: ['Bouygues Construction', 'Vinci', 'Eiffage', 'Spie Batignolles', 'GTM Bâtiment'],
    tauxReussite: '94%',
    tauxInsertion: '89% à 6 mois',
    conception: 'Conçue, validée et dispensée par des professionnels du BTP',
    ordre: 1,
    isActive: true,
    publishedAt: new Date().toISOString()
  },
  {
    title: 'Conducteur de Travaux – Bâtiment & Génie Civil',
    slug: 'alt-bac2-conducteur-travaux',
    level: 'Niveau 5 (équivalent Bac+2)',
    rncp: 'RNCP40217',
    shortDesc: 'Formation professionnalisante pour devenir conducteur de travaux capable de préparer, gérer et coordonner un chantier de construction dans sa globalité.',
    fullDesc: 'Cette formation professionnalisante a pour but de vous former en tant que conducteur de travaux capables de préparer, gérer et coordonner un chantier de construction dans sa globalité. Elle vise à transmettre toutes les compétences techniques, juridiques, financières et organisationnelles nécessaires pour conduire un projet de construction ou de génie civil, de la phase d\'étude à la livraison finale.',
    objectifs: [
      'Préparer un chantier en maîtrisant les aspects techniques, administratifs et budgétaires',
      'Piloter les travaux sur le terrain, coordonner les équipes et gérer les aléas',
      'Assurer la gestion financière d\'un projet (études de prix, marges, achats…)',
      'Garantir la conformité réglementaire, la sécurité et la qualité des opérations',
      'Communiquer efficacement avec tous les intervenants du chantier'
    ],
    programme: [
      'Préparation & suivi de chantier : planification, achats, élaboration de budgets, organisation du chantier',
      'Coordination & réglementation : pilotage TCE, sécurité, droit de la construction, normes environnementales',
      'Gestion technique & financière : lecture de plans, AutoCAD, étude de prix, gestion des marges et des dépenses',
      'Communication & leadership : rédaction professionnelle, animation de réunions, compte-rendus, gestion d\'équipe'
    ],
    debouches: [
      'Conducteur(trice) de travaux',
      'Coordinateur(trice) ou responsable de chantier',
      'Chef de chantier',
      'Chargé(e) d\'études techniques',
      'Assistant(e) OPC',
      'Assistant(e) maître d\'œuvre'
    ],
    duree: '1 an',
    volumeHoraire: '595 heures',
    rythme: '17 semaines à l\'école - 35 semaines en entreprise',
    typeContrat: 'Apprentissage, Professionnalisation ou Période de Reconversion',
    modalite: 'Formation 100% en présentiel',
    effectif: '20 participants maximum par session',
    prerequis: [
      'Être titulaire du baccalauréat',
      'Ou avoir un niveau bac avec au moins 3 ans d\'expérience dans le BTP ou dans un poste managérial'
    ],
    cout: '8000€ HT - Prise en charge par l\'OPCO et l\'entreprise - Aucun frais à la charge des alternants',
    evaluation: [
      'Contrôle continu en cours de formation',
      'Épreuve de synthèse (écrite + orale)',
      'Dossier professionnel (CRAMP)',
      'Entretien final avec jury à partir des productions du candidat'
    ],
    poursuites: [
      'Conducteur de Travaux en Voirie et Réseaux Divers',
      'Double Parcours Responsable travaux Bâtiment / Coordinateur BIM du bâtiment',
      'Autres écoles proposant des formations en conduite de travaux, ingénierie ou management de projet'
    ],
    certificateur: 'Ministère du Travail',
    ordre: 2,
    isActive: true,
    publishedAt: new Date().toISOString()
  }
  // Ajouter les autres formations ici...
];

// Partenaires
const partners = [
  {
    name: 'Eiffage',
    sector: 'Construction & Concessions',
    type: 'Alternance & CDI',
    effectifs: '73000 collaborateurs',
    projets: 'Grand Paris Express, Rénovation urbaine',
    description: 'Groupe français de BTP et de concessions, leader européen dans la construction et les infrastructures.',
    website: 'https://www.eiffage.com',
    ordre: 1,
    featured: true,
    publishedAt: new Date().toISOString()
  },
  {
    name: 'Bouygues Construction',
    sector: 'Bâtiment & Travaux Publics',
    type: 'Stage & Alternance',
    effectifs: '50000 collaborateurs',
    projets: 'Tour Incity, Stade de France',
    description: 'Filiale construction du groupe Bouygues, spécialisée dans le bâtiment et les travaux publics.',
    website: 'https://www.bouygues-construction.com',
    ordre: 2,
    featured: true,
    publishedAt: new Date().toISOString()
  },
  {
    name: 'Vinci Construction',
    sector: 'Infrastructure & Bâtiment',
    type: 'Alternance & Emploi',
    effectifs: '185000 collaborateurs',
    projets: 'LGV, Aéroports de Paris',
    description: 'Leader mondial des métiers des concessions et de la construction.',
    website: 'https://www.vinci-construction.com',
    ordre: 3,
    featured: true,
    publishedAt: new Date().toISOString()
  },
  {
    name: 'Spie Batignolles',
    sector: 'Construction & Génie Civil',
    type: 'Alternance & Emploi',
    effectifs: '8500 collaborateurs',
    projets: 'Métro automatique, Logements sociaux',
    description: 'Entreprise française de BTP spécialisée dans la construction et le génie civil.',
    website: 'https://www.spiebatignolles.fr',
    ordre: 4,
    featured: false,
    publishedAt: new Date().toISOString()
  }
];

// Témoignages
const testimonials = [
  {
    name: 'Marie Dubois',
    position: 'Conductrice de Travaux',
    company: 'Bouygues Construction',
    content: 'La formation CMA m\'a donné toutes les clés pour réussir dans le BTP. L\'approche pratique et les technologies modernes comme le BIM m\'ont permis d\'être opérationnelle dès mon premier poste.',
    rating: 5,
    featured: true,
    ordre: 1,
    publishedAt: new Date().toISOString()
  },
  {
    name: 'Thomas Martin',
    position: 'Chef de Projet BIM',
    company: 'Vinci Construction',
    content: 'Grâce à CMA, j\'ai pu me spécialiser dans le digital et le BIM. Les formateurs sont des professionnels du secteur qui transmettent leur passion et leur expertise.',
    rating: 5,
    featured: true,
    ordre: 2,
    publishedAt: new Date().toISOString()
  },
  {
    name: 'Sarah Johnson',
    position: 'Responsable Développement Durable',
    company: 'Eiffage',
    content: 'La formation en construction durable de CMA est unique. Elle m\'a permis de devenir experte en bâtiments écologiques et de contribuer à un BTP plus responsable.',
    rating: 5,
    featured: true,
    ordre: 3,
    publishedAt: new Date().toISOString()
  }
];

// Site Settings
const siteSettings = {
  siteName: 'CMA Education',
  siteDescription: 'Formation BTP en alternance, reconversion et VAE. Conducteur de travaux, chargé d\'affaires bâtiment. 98% insertion, prise en charge OPCO.',
  contactPhone: '01 89 70 60 52',
  contactEmail: 'contact.academy@cma-education.com',
  emailInscription: 'inscription.academy@cma-education.com',
  contactAddress: '67-69 Avenue du Général de Gaulle, 77420 Champs sur Marne',
  socialMedia: {
    linkedin: 'https://linkedin.com/company/cma-education',
    instagram: 'https://instagram.com/cma_education',
    youtube: 'https://youtube.com/@cma-education'
  },
  seoTitle: 'Formation BTP Alternance, Reconversion et VAE | CMA Education',
  seoDescription: 'Formation conducteur de travaux, chargé d\'affaires bâtiment en alternance. Formation BTP reconversion et VAE. 98% insertion, prise en charge OPCO.',
  seoKeywords: [
    'formation btp alternance',
    'conducteur de travaux alternance',
    'formation chargé d\'affaires bâtiment',
    'formation btp reconversion',
    'formation btp vae',
    'centre formation btp ile de france'
  ],
  emailConfig: {
    serviceId: 'service_cma2026',
    templateId: 'template_n27932h',
    publicKey: 'votre_public_key_emailjs'
  }
};

async function importFormationsCompletes() {
  console.log('🚀 Import complet des formations vers Strapi...\n');

  try {
    // Test de connexion
    console.log('🔗 Test de connexion à Strapi...');
    await fetchAPI('/api/formations?pagination[limit]=1');
    console.log('✅ Connexion Strapi OK\n');

    // Import des catégories de formations
    console.log('📂 Import des catégories de formations...');
    for (const category of formationCategories) {
      try {
        await fetchAPI('/api/formation-categories', 'POST', category);
        console.log(`  ✅ Catégorie "${category.name}" importée`);
      } catch (error) {
        if (error.message.includes('400')) {
          console.log(`  ⚠️ Catégorie "${category.name}" existe déjà`);
        } else {
          console.log(`  ❌ Catégorie "${category.name}": ${error.message}`);
        }
      }
    }

    // Import des formations (échantillon)
    console.log('\n🎓 Import des formations...');
    for (const formation of formationsAlternance) {
      try {
        await fetchAPI('/api/formations', 'POST', formation);
        console.log(`  ✅ Formation "${formation.title}" importée`);
      } catch (error) {
        if (error.message.includes('400')) {
          console.log(`  ⚠️ Formation "${formation.title}" existe déjà`);
        } else {
          console.log(`  ❌ Formation "${formation.title}": ${error.message}`);
        }
      }
    }

    // Import des partenaires
    console.log('\n🤝 Import des partenaires...');
    for (const partner of partners) {
      try {
        await fetchAPI('/api/partners', 'POST', partner);
        console.log(`  ✅ Partenaire "${partner.name}" importé`);
      } catch (error) {
        if (error.message.includes('400')) {
          console.log(`  ⚠️ Partenaire "${partner.name}" existe déjà`);
        } else {
          console.log(`  ❌ Partenaire "${partner.name}": ${error.message}`);
        }
      }
    }

    // Import des témoignages
    console.log('\n💬 Import des témoignages...');
    for (const testimonial of testimonials) {
      try {
        await fetchAPI('/api/testimonials', 'POST', testimonial);
        console.log(`  ✅ Témoignage "${testimonial.name}" importé`);
      } catch (error) {
        if (error.message.includes('400')) {
          console.log(`  ⚠️ Témoignage "${testimonial.name}" existe déjà`);
        } else {
          console.log(`  ❌ Témoignage "${testimonial.name}": ${error.message}`);
        }
      }
    }

    // Import des paramètres du site
    console.log('\n⚙️ Import des paramètres du site...');
    try {
      await fetchAPI('/api/site-settings', 'PUT', siteSettings);
      console.log('  ✅ Paramètres du site importés');
    } catch (error) {
      console.log(`  ❌ Paramètres du site: ${error.message}`);
    }

    console.log('\n✨ Import complet terminé!');
    console.log('\n📊 Résumé des imports:');
    console.log(`  - ${formationCategories.length} catégories de formations`);
    console.log(`  - ${formationsAlternance.length} formations (échantillon)`);
    console.log(`  - ${partners.length} partenaires`);
    console.log(`  - ${testimonials.length} témoignages`);
    console.log('  - 1 configuration site');

    console.log('\n💡 Prochaines étapes:');
    console.log('  1. Vérifier les données importées dans l\'interface admin');
    console.log('  2. Importer les formations restantes (VRD, reconversion)');
    console.log('  3. Mettre à jour les fonctions API dans src/lib/strapi.ts');
    console.log('  4. Migrer les composants frontend');

  } catch (error) {
    console.error('\n❌ Erreur lors de l\'import:', error.message);
    console.log('\n💡 Vérifiez que:');
    console.log('  - Strapi est démarré (npm run develop dans cms-cma/)');
    console.log('  - Le token API est correct dans le script');
    console.log('  - Les nouveaux content types sont bien créés dans Strapi');
  }
}

importFormationsCompletes();