const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';
const API_TOKEN = 'your-api-token-here'; // À remplacer par le vrai token

const headers = {
  'Authorization': `Bearer ${API_TOKEN}`,
  'Content-Type': 'application/json'
};

// Données pour les galeries
const galleries = [
  {
    titre: "Campus et Installations",
    description: "Découvrez nos installations modernes et notre campus",
    slug: "campus-installations",
    page: "about",
    ordre: 1,
    featured: true
  },
  {
    titre: "Formations en Action",
    description: "Nos étudiants en formation pratique",
    slug: "formations-action",
    page: "formations",
    ordre: 2,
    featured: true
  },
  {
    titre: "Partenaires Entreprises",
    description: "Nos partenaires et leurs projets",
    slug: "partenaires-entreprises",
    page: "partenaires",
    ordre: 3,
    featured: false
  }
];

// Données pour les FAQ
const faqs = [
  {
    question: "Quelles sont les conditions d'admission ?",
    reponse: "Les conditions d'admission varient selon la formation. Pour les formations en alternance, il faut avoir un niveau Bac minimum et trouver une entreprise d'accueil. Pour la VAE, une expérience professionnelle de 3 ans minimum est requise.",
    categorie: "admissions",
    ordre: 1,
    featured: true,
    page: "formations"
  },
  {
    question: "Comment se déroule l'alternance ?",
    reponse: "L'alternance se déroule en rythme alterné entre l'école et l'entreprise. Généralement 2 semaines en entreprise et 1 semaine à l'école, selon les formations. Vous êtes salarié de l'entreprise avec un contrat d'apprentissage ou de professionnalisation.",
    categorie: "alternance",
    ordre: 2,
    featured: true,
    page: "formations"
  },
  {
    question: "Quels sont les débouchés après la formation ?",
    reponse: "Nos formations mènent à des postes de responsabilité dans le BTP : Chargé d'Affaires, Conducteur de Travaux, Chef de Chantier, Chef de Projets. Le taux d'insertion professionnelle est de 95% à 6 mois.",
    categorie: "formations",
    ordre: 3,
    featured: true,
    page: "formations"
  },
  {
    question: "La formation est-elle payante ?",
    reponse: "Les formations en alternance sont gratuites et rémunérées. Pour les formations en reconversion, des financements sont possibles via CPF, Pôle Emploi, ou autres organismes. Nous vous accompagnons dans les démarches.",
    categorie: "formations",
    ordre: 4,
    featured: true,
    page: "formations"
  },
  {
    question: "Qu'est-ce que la VAE ?",
    reponse: "La Validation des Acquis de l'Expérience permet d'obtenir un diplôme grâce à votre expérience professionnelle. Nous proposons un accompagnement personnalisé pour constituer votre dossier et préparer la soutenance.",
    categorie: "vae",
    ordre: 5,
    featured: true,
    page: "formations"
  },
  {
    question: "Proposez-vous des formations pour les entreprises ?",
    reponse: "Oui, nous proposons des formations sur mesure pour les entreprises : Lean Construction, BIM collaboratif, management d'équipe, sécurité chantier. Formations intra ou inter-entreprises selon vos besoins.",
    categorie: "entreprises",
    ordre: 6,
    featured: false,
    page: "formations"
  }
];

// Données pour les paramètres SEO
const seoSettings = [
  {
    page: "home",
    title: "CMA Education - Formation BTP Alternance, Reconversion, VAE | École Supérieure",
    description: "École de formation BTP d'excellence. Formations en alternance, reconversion professionnelle et VAE du Bac+2 au Bac+5. Chargé d'Affaires, Conducteur de Travaux, Chef de Projets BTP.",
    keywords: "formation btp, alternance btp, reconversion btp, vae btp, école btp, chargé affaires, conducteur travaux",
    ogTitle: "CMA Education - L'Excellence en Formation BTP",
    ogDescription: "Devenez l'acteur du BTP d'aujourd'hui et de demain avec nos formations d'excellence en alternance, reconversion et VAE.",
    canonicalUrl: "https://cma-education.com",
    noIndex: false
  },
  {
    page: "formations",
    title: "Formations BTP - Alternance, Reconversion, VAE | CMA Education",
    description: "Découvrez nos formations BTP du Bac+2 au Bac+5 : Chargé d'Affaires, Conducteur de Travaux, Chef de Projets. Alternance, reconversion professionnelle et VAE disponibles.",
    keywords: "formations btp, alternance, reconversion, vae, chargé affaires, conducteur travaux, chef projets",
    ogTitle: "Formations BTP d'Excellence - CMA Education",
    ogDescription: "Formations BTP reconnues par les professionnels. Alternance rémunérée, reconversion accompagnée, VAE personnalisée.",
    canonicalUrl: "https://cma-education.com/formations",
    noIndex: false
  },
  {
    page: "about",
    title: "À Propos - CMA Education | École BTP d'Excellence",
    description: "Découvrez CMA Education, école de formation BTP d'excellence. Notre mission, nos valeurs, notre pédagogie innovante et nos partenaires entreprises.",
    keywords: "cma education, école btp, formation excellence, pédagogie, partenaires",
    ogTitle: "À Propos de CMA Education - École BTP d'Excellence",
    ogDescription: "École de formation BTP reconnue pour son excellence pédagogique et ses partenariats entreprises.",
    canonicalUrl: "https://cma-education.com/about",
    noIndex: false
  },
  {
    page: "contact",
    title: "Contact - CMA Education | Candidater à nos Formations BTP",
    description: "Contactez CMA Education pour candidater à nos formations BTP. Informations, conseils personnalisés et accompagnement dans votre projet professionnel.",
    keywords: "contact cma education, candidater formation btp, information, conseil",
    ogTitle: "Contactez CMA Education - Candidature Formations BTP",
    ogDescription: "Contactez-nous pour candidater à nos formations BTP d'excellence. Accompagnement personnalisé garanti.",
    canonicalUrl: "https://cma-education.com/contact",
    noIndex: false
  },
  {
    page: "partenaires",
    title: "Partenaires Entreprises - CMA Education | Réseau BTP d'Excellence",
    description: "Découvrez nos partenaires entreprises du BTP : Bouygues, Vinci, Eiffage, Spie. Un réseau d'excellence pour votre formation et votre carrière.",
    keywords: "partenaires btp, bouygues, vinci, eiffage, spie, réseau entreprises",
    ogTitle: "Partenaires Entreprises BTP - CMA Education",
    ogDescription: "Un réseau de partenaires entreprises d'exception pour des formations BTP d'excellence.",
    canonicalUrl: "https://cma-education.com/partenaires",
    noIndex: false
  }
];

// Données pour les menus de navigation
const navigationMenus = [
  {
    label: "Accueil",
    url: "/",
    ordre: 1,
    icon: "home",
    featured: true,
    external: false
  },
  {
    label: "À propos",
    url: "/about",
    ordre: 2,
    icon: "info",
    featured: true,
    external: false
  },
  {
    label: "Formations",
    url: "/formations",
    ordre: 3,
    icon: "graduation-cap",
    description: "Découvrez nos formations BTP d'excellence",
    featured: true,
    external: false
  },
  {
    label: "Pédagogie",
    url: "/pedagogie",
    ordre: 4,
    icon: "book",
    featured: true,
    external: false
  },
  {
    label: "Partenaires",
    url: "/partenaires",
    ordre: 5,
    icon: "handshake",
    featured: true,
    external: false
  },
  {
    label: "Contact",
    url: "/contact",
    ordre: 6,
    icon: "mail",
    featured: true,
    external: false
  }
];

// Données pour les informations de contact
const contactInfo = {
  adressePrincipale: {
    nom: "Campus Principal CMA Education",
    rue: "123 Avenue de la Construction",
    ville: "Paris",
    codePostal: "75001",
    pays: "France",
    complement: "Bâtiment A - 3ème étage"
  },
  adressesSecondaires: [
    {
      nom: "Antenne Lyon",
      rue: "45 Rue du BTP",
      ville: "Lyon",
      codePostal: "69000",
      pays: "France"
    }
  ],
  telephones: [
    {
      numero: "01 89 70 60 52",
      type: "fixe",
      label: "Accueil général",
      principal: true
    },
    {
      numero: "01 89 70 60 53",
      type: "fixe",
      label: "Service pédagogique",
      principal: false
    }
  ],
  emails: [
    {
      email: "contact.academy@cma-education.com",
      type: "contact",
      label: "Contact général",
      principal: true
    },
    {
      email: "inscription@cma-education.com",
      type: "inscription",
      label: "Inscriptions",
      principal: false
    }
  ],
  reseauxSociaux: [
    {
      nom: "LinkedIn",
      url: "https://linkedin.com/company/cma-education",
      icon: "linkedin",
      actif: true
    },
    {
      nom: "Instagram",
      url: "https://instagram.com/cma_education",
      icon: "instagram",
      actif: true
    }
  ],
  horairesOuverture: [
    {
      jour: "lundi",
      ouverture: "08:30:00",
      fermeture: "18:00:00",
      ferme: false
    },
    {
      jour: "mardi",
      ouverture: "08:30:00",
      fermeture: "18:00:00",
      ferme: false
    },
    {
      jour: "mercredi",
      ouverture: "08:30:00",
      fermeture: "18:00:00",
      ferme: false
    },
    {
      jour: "jeudi",
      ouverture: "08:30:00",
      fermeture: "18:00:00",
      ferme: false
    },
    {
      jour: "vendredi",
      ouverture: "08:30:00",
      fermeture: "17:00:00",
      ferme: false
    },
    {
      jour: "samedi",
      ferme: true,
      note: "Fermé - Rendez-vous sur demande"
    },
    {
      jour: "dimanche",
      ferme: true
    }
  ],
  coordonneesGPS: {
    latitude: 48.8566,
    longitude: 2.3522,
    zoom: 15
  }
};

async function importData() {
  console.log('🚀 Import des données manquantes...\n');

  try {
    // Import des galeries
    console.log('📸 Import des galeries...');
    for (const gallery of galleries) {
      try {
        const response = await axios.post(`${STRAPI_URL}/api/galleries`, {
          data: gallery
        }, { headers });
        console.log(`✅ Galerie créée: ${gallery.titre}`);
      } catch (error) {
        console.log(`⚠️  Galerie existe déjà: ${gallery.titre}`);
      }
    }

    // Import des FAQ
    console.log('\n❓ Import des FAQ...');
    for (const faq of faqs) {
      try {
        const response = await axios.post(`${STRAPI_URL}/api/faqs`, {
          data: faq
        }, { headers });
        console.log(`✅ FAQ créée: ${faq.question.substring(0, 50)}...`);
      } catch (error) {
        console.log(`⚠️  FAQ existe déjà: ${faq.question.substring(0, 50)}...`);
      }
    }

    // Import des paramètres SEO
    console.log('\n🔍 Import des paramètres SEO...');
    for (const seo of seoSettings) {
      try {
        const response = await axios.post(`${STRAPI_URL}/api/seo-settings`, {
          data: seo
        }, { headers });
        console.log(`✅ SEO créé: ${seo.page}`);
      } catch (error) {
        console.log(`⚠️  SEO existe déjà: ${seo.page}`);
      }
    }

    // Import des menus de navigation
    console.log('\n🧭 Import des menus de navigation...');
    for (const menu of navigationMenus) {
      try {
        const response = await axios.post(`${STRAPI_URL}/api/navigation-menus`, {
          data: menu
        }, { headers });
        console.log(`✅ Menu créé: ${menu.label}`);
      } catch (error) {
        console.log(`⚠️  Menu existe déjà: ${menu.label}`);
      }
    }

    // Import des informations de contact
    console.log('\n📞 Import des informations de contact...');
    try {
      const response = await axios.post(`${STRAPI_URL}/api/contact-info`, {
        data: contactInfo
      }, { headers });
      console.log('✅ Informations de contact créées');
    } catch (error) {
      console.log('⚠️  Informations de contact existent déjà');
    }

    console.log('\n🎉 Import terminé avec succès !');
    console.log('\n📊 Résumé:');
    console.log(`   - ${galleries.length} galeries`);
    console.log(`   - ${faqs.length} FAQ`);
    console.log(`   - ${seoSettings.length} paramètres SEO`);
    console.log(`   - ${navigationMenus.length} menus de navigation`);
    console.log('   - 1 configuration de contact complète');

  } catch (error) {
    console.error('❌ Erreur lors de l\'import:', error.message);
    console.log('\n⚠️  Vérifiez que:');
    console.log('   - Strapi est démarré (npm run cms:dev)');
    console.log('   - Le token API est correct');
    console.log('   - Les content types sont créés');
  }
}

importData();