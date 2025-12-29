/**
 * Import des données VAE vers Strapi
 * Usage: node scripts/import-vae-data.js
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

// Données VAE depuis src/lib/data.ts
const vaeFormules = [
  {
    type: 'VAE avec accompagnement',
    services: [
      'Analyse de votre parcours',
      'Aide à la rédaction du dossier',
      'Préparation à l\'entretien jury'
    ],
    duree: 'Jusqu\'à 20 heures d\'accompagnement',
    tarif: '4500 € TTC (3750 € HT)',
    modalites: 'Présentiel, visio, téléphone et mail',
    ordre: 1,
    publishedAt: new Date().toISOString()
  },
  {
    type: 'VAE sans accompagnement',
    services: [
      'Vérification de l\'éligibilité',
      'Inscription et convocation jury',
      'Informations administratives'
    ],
    tarif: '2760 € TTC (2300 € HT)',
    modalites: 'Suivi administratif uniquement',
    ordre: 2,
    publishedAt: new Date().toISOString()
  }
];

// Données Entreprises depuis src/lib/data.ts
const entrepriseServices = [
  {
    titre: 'Amélioration des performances internes',
    description: 'Collaborateurs mieux formés = productivité renforcée',
    icone: 'TrendingUp',
    ordre: 1,
    publishedAt: new Date().toISOString()
  },
  {
    titre: 'Adaptation aux évolutions du secteur',
    description: 'Rester compétitif et à la pointe des nouvelles méthodes',
    icone: 'RefreshCw',
    ordre: 2,
    publishedAt: new Date().toISOString()
  },
  {
    titre: 'Fidélisation des talents',
    description: 'Excellent levier de motivation et de fidélité',
    icone: 'Users',
    ordre: 3,
    publishedAt: new Date().toISOString()
  },
  {
    titre: 'Valorisation image employeur',
    description: 'Entreprise perçue comme innovante et responsable',
    icone: 'Award',
    ordre: 4,
    publishedAt: new Date().toISOString()
  }
];

const formationThematiques = [
  {
    nom: 'Lean Construction : optimiser les processus chantier',
    description: 'Méthodes d\'optimisation des processus de construction',
    duree: '2-3 jours',
    niveau: 'Intermédiaire',
    prix: 'À partir de 700€ HT/jour',
    ordre: 1,
    publishedAt: new Date().toISOString()
  },
  {
    nom: 'Pilotage de projet de rénovation énergétique',
    description: 'Gestion complète des projets de rénovation énergétique',
    duree: '3-4 jours',
    niveau: 'Avancé',
    prix: 'À partir de 700€ HT/jour',
    ordre: 2,
    publishedAt: new Date().toISOString()
  },
  {
    nom: 'Management financier d\'un projet de construction',
    description: 'Gestion financière et budgétaire des projets BTP',
    duree: '2 jours',
    niveau: 'Intermédiaire',
    prix: 'À partir de 700€ HT/jour',
    ordre: 3,
    publishedAt: new Date().toISOString()
  },
  {
    nom: 'Gestion de chantier, coordination, sécurité',
    description: 'Coordination et sécurité sur les chantiers',
    duree: '3 jours',
    niveau: 'Tous niveaux',
    prix: 'À partir de 700€ HT/jour',
    ordre: 4,
    publishedAt: new Date().toISOString()
  },
  {
    nom: 'BIM collaboratif – Revit / méthodologie BIM',
    description: 'Formation aux outils BIM et méthodologies collaboratives',
    duree: '4-5 jours',
    niveau: 'Débutant à avancé',
    prix: 'À partir de 700€ HT/jour',
    ordre: 5,
    publishedAt: new Date().toISOString()
  }
];

// Valeurs de l'école depuis src/lib/data.ts
const valeursEcole = [
  {
    titre: 'Professionnalisme',
    points: [
      'Des formateurs issus du terrain, experts dans leur domaine',
      'Un accompagnement rigoureux tout au long du parcours',
      'Une exigence de qualité dans chaque formation',
      'Une préparation concrète aux réalités du métier'
    ],
    icone: 'Award',
    ordre: 1,
    publishedAt: new Date().toISOString()
  },
  {
    titre: 'Proximité',
    points: [
      'Une écoute attentive des besoins de chaque apprenant',
      'Une relation humaine, bienveillante et accessible',
      'Un lien fort avec les entreprises partenaires du secteur'
    ],
    icone: 'Heart',
    ordre: 2,
    publishedAt: new Date().toISOString()
  },
  {
    titre: 'Pédagogie',
    points: [
      'Une approche pratique, centrée sur l\'apprentissage par l\'action',
      'Des outils et supports adaptés au secteur du BTP',
      'Un suivi personnalisé pour s\'adapter au rythme de chaque apprenant',
      'L\'objectif : faire monter en compétence de manière durable'
    ],
    icone: 'BookOpen',
    ordre: 3,
    publishedAt: new Date().toISOString()
  }
];

// Statistiques du site depuis src/lib/data.ts
const statistiquesSite = [
  {
    cle: 'experience',
    nombre: 15,
    label: 'années d\'expertise BTP',
    suffixe: '+',
    ordre: 1,
    publishedAt: new Date().toISOString()
  },
  {
    cle: 'formations',
    nombre: 8,
    label: 'formations certifiantes RNCP',
    suffixe: '',
    ordre: 2,
    publishedAt: new Date().toISOString()
  },
  {
    cle: 'partners',
    nombre: 45,
    label: 'Entreprises partenaires actives',
    suffixe: '+',
    ordre: 3,
    publishedAt: new Date().toISOString()
  },
  {
    cle: 'insertion',
    nombre: 89,
    label: 'de nos diplômés en poste en moins de 4 mois',
    suffixe: '%',
    ordre: 4,
    publishedAt: new Date().toISOString()
  }
];

// Processus d'admission depuis src/lib/data.ts
const processusAdmission = [
  {
    etape: 1,
    titre: 'Soumission du dossier',
    description: 'Complétez notre formulaire en ligne avec votre parcours et projet professionnel.',
    detail: 'Notre équipe vous recontactera sous 24 heures pour fixer un rendez-vous.',
    icone: 'FileText',
    publishedAt: new Date().toISOString()
  },
  {
    etape: 2,
    titre: 'Entretien d\'admission',
    description: 'Échange privilégié en présentiel ou à distance selon votre préférence.',
    detail: 'Décision communiquée sous 48 heures après l\'entretien.',
    icone: 'MessageCircle',
    publishedAt: new Date().toISOString()
  },
  {
    etape: 3,
    titre: 'Recherche d\'alternance',
    description: 'Réception des documents pour démarrer votre recherche d\'entreprise.',
    detail: 'Inscription définitive dès la signature de la convention de formation.',
    icone: 'Search',
    publishedAt: new Date().toISOString()
  },
  {
    etape: 4,
    titre: 'Accompagnement dédié',
    description: 'Accompagnement personnalisé et atelier CV/lettre de motivation.',
    detail: 'Maximisation de vos chances auprès des recruteurs.',
    icone: 'UserCheck',
    publishedAt: new Date().toISOString()
  }
];

async function importAllData() {
  console.log('🚀 Import complet des données statiques vers Strapi...\n');

  try {
    // Test de connexion
    console.log('🔗 Test de connexion à Strapi...');
    await fetchAPI('/api/formations?pagination[limit]=1');
    console.log('✅ Connexion Strapi OK\n');

    // Import des formules VAE
    console.log('📋 Import des formules VAE...');
    for (const formule of vaeFormules) {
      try {
        await fetchAPI('/api/vae-formules', 'POST', formule);
        console.log(`  ✅ Formule "${formule.type}" importée`);
      } catch (error) {
        if (error.message.includes('400')) {
          console.log(`  ⚠️ Formule "${formule.type}" existe déjà ou erreur de validation`);
        } else {
          console.log(`  ❌ Formule "${formule.type}": ${error.message}`);
        }
      }
    }

    // Import des services entreprises
    console.log('\n🏢 Import des services entreprises...');
    for (const service of entrepriseServices) {
      try {
        await fetchAPI('/api/entreprise-services', 'POST', service);
        console.log(`  ✅ Service "${service.titre}" importé`);
      } catch (error) {
        if (error.message.includes('400')) {
          console.log(`  ⚠️ Service "${service.titre}" existe déjà ou erreur de validation`);
        } else {
          console.log(`  ❌ Service "${service.titre}": ${error.message}`);
        }
      }
    }

    // Import des thématiques de formation
    console.log('\n📚 Import des thématiques de formation...');
    for (const thematique of formationThematiques) {
      try {
        await fetchAPI('/api/formation-thematiques', 'POST', thematique);
        console.log(`  ✅ Thématique "${thematique.nom}" importée`);
      } catch (error) {
        if (error.message.includes('400')) {
          console.log(`  ⚠️ Thématique "${thematique.nom}" existe déjà ou erreur de validation`);
        } else {
          console.log(`  ❌ Thématique "${thematique.nom}": ${error.message}`);
        }
      }
    }

    // Import des valeurs de l'école
    console.log('\n🎯 Import des valeurs de l\'école...');
    for (const valeur of valeursEcole) {
      try {
        await fetchAPI('/api/valeurs-ecole', 'POST', valeur);
        console.log(`  ✅ Valeur "${valeur.titre}" importée`);
      } catch (error) {
        if (error.message.includes('400')) {
          console.log(`  ⚠️ Valeur "${valeur.titre}" existe déjà ou erreur de validation`);
        } else {
          console.log(`  ❌ Valeur "${valeur.titre}": ${error.message}`);
        }
      }
    }

    // Import des statistiques du site
    console.log('\n📊 Import des statistiques du site...');
    for (const stat of statistiquesSite) {
      try {
        await fetchAPI('/api/statistiques-site', 'POST', stat);
        console.log(`  ✅ Statistique "${stat.cle}" importée`);
      } catch (error) {
        if (error.message.includes('400')) {
          console.log(`  ⚠️ Statistique "${stat.cle}" existe déjà ou erreur de validation`);
        } else {
          console.log(`  ❌ Statistique "${stat.cle}": ${error.message}`);
        }
      }
    }

    // Import du processus d'admission
    console.log('\n📝 Import du processus d\'admission...');
    for (const etape of processusAdmission) {
      try {
        await fetchAPI('/api/processus-admissions', 'POST', etape);
        console.log(`  ✅ Étape ${etape.etape} "${etape.titre}" importée`);
      } catch (error) {
        if (error.message.includes('400')) {
          console.log(`  ⚠️ Étape ${etape.etape} "${etape.titre}" existe déjà ou erreur de validation`);
        } else {
          console.log(`  ❌ Étape ${etape.etape} "${etape.titre}": ${error.message}`);
        }
      }
    }

    console.log('\n✨ Import terminé!');
    console.log('\n📊 Résumé des imports:');
    console.log(`  - ${vaeFormules.length} formules VAE`);
    console.log(`  - ${entrepriseServices.length} services entreprises`);
    console.log(`  - ${formationThematiques.length} thématiques de formation`);
    console.log(`  - ${valeursEcole.length} valeurs de l'école`);
    console.log(`  - ${statistiquesSite.length} statistiques du site`);
    console.log(`  - ${processusAdmission.length} étapes du processus d'admission`);

    console.log('\n💡 Prochaines étapes:');
    console.log('  1. Créer les content types manquants dans Strapi Admin si nécessaire');
    console.log('  2. Vérifier les données importées dans l\'interface admin');
    console.log('  3. Mettre à jour les fonctions API dans src/lib/strapi.ts');
    console.log('  4. Migrer les composants frontend pour utiliser ces données');

  } catch (error) {
    console.error('\n❌ Erreur lors de l\'import:', error.message);
    console.log('\n💡 Vérifiez que:');
    console.log('  - Strapi est démarré (npm run develop dans cms-cma/)');
    console.log('  - Le token API est correct dans le script');
    console.log('  - Les content types sont bien créés dans Strapi');
  }
}

importAllData();