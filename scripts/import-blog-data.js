/**
 * Import des données Blog vers Strapi
 * Usage: node scripts/import-blog-data.js
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

// Catégories Blog
const categoriesBlog = [
  {
    nom: 'Formations BTP',
    slug: 'formations-btp',
    description: 'Articles sur les formations dans le secteur du BTP',
    couleur: '#3B82F6',
    publishedAt: new Date().toISOString()
  },
  {
    nom: 'Alternance',
    slug: 'alternance',
    description: 'Conseils et informations sur l\'alternance',
    couleur: '#10B981',
    publishedAt: new Date().toISOString()
  },
  {
    nom: 'Reconversion',
    slug: 'reconversion',
    description: 'Guide pour la reconversion professionnelle',
    couleur: '#F59E0B',
    publishedAt: new Date().toISOString()
  },
  {
    nom: 'VAE',
    slug: 'vae',
    description: 'Validation des Acquis de l\'Expérience',
    couleur: '#EF4444',
    publishedAt: new Date().toISOString()
  },
  {
    nom: 'Secteur BTP',
    slug: 'secteur-btp',
    description: 'Actualités et tendances du secteur BTP',
    couleur: '#8B5CF6',
    publishedAt: new Date().toISOString()
  }
];

// Articles Blog
const articlesBlog = [
  {
    titre: 'Comment devenir conducteur de travaux en alternance ?',
    slug: 'devenir-conducteur-travaux-alternance',
    extrait: 'Découvrez le parcours pour devenir conducteur de travaux grâce à l\'alternance. Formation, compétences requises et débouchés.',
    contenu: `# Comment devenir conducteur de travaux en alternance ?

Le métier de conducteur de travaux est l'un des plus recherchés dans le secteur du BTP. Grâce à l'alternance, vous pouvez acquérir une expérience professionnelle tout en suivant une formation de qualité.

## Les avantages de l'alternance

- **Expérience pratique** : Travaillez sur de vrais chantiers
- **Rémunération** : Percevez un salaire pendant votre formation
- **Insertion professionnelle** : 89% de nos diplômés trouvent un emploi en moins de 4 mois

## Le programme de formation

Notre formation de conducteur de travaux en alternance couvre :
- Gestion de projet BTP
- Coordination d'équipes
- Sécurité sur chantier
- Technologies BIM
- Management et leadership

## Débouchés professionnels

Après votre formation, vous pourrez occuper des postes de :
- Conducteur de travaux (35-50k€)
- Chef de projet BTP
- Responsable de programmes
- Manager d'équipes techniques`,
    auteur: 'Marie Dubois',
    datePublication: '2024-12-20',
    tempsLecture: '8 min',
    featured: true,
    tags: ['alternance', 'conducteur de travaux', 'BTP', 'formation'],
    seoTitle: 'Devenir Conducteur de Travaux en Alternance - Guide Complet 2024',
    seoDescription: 'Guide complet pour devenir conducteur de travaux en alternance. Formation, compétences, salaire et débouchés dans le BTP.',
    seoKeywords: ['conducteur de travaux alternance', 'formation BTP', 'alternance construction'],
    publishedAt: new Date().toISOString()
  },
  {
    titre: 'VAE BTP : Valorisez votre expérience professionnelle',
    slug: 'vae-btp-valoriser-experience',
    extrait: 'La VAE permet d\'obtenir un diplôme grâce à votre expérience. Découvrez comment procéder dans le secteur BTP.',
    contenu: `# VAE BTP : Valorisez votre expérience professionnelle

La Validation des Acquis de l'Expérience (VAE) est un excellent moyen de faire reconnaître officiellement vos compétences acquises sur le terrain.

## Qu'est-ce que la VAE ?

La VAE permet d'obtenir tout ou partie d'un diplôme en justifiant d'au moins 1 an d'expérience professionnelle en lien avec la certification visée.

## Les étapes de la VAE

1. **Vérification de l'éligibilité**
2. **Constitution du dossier**
3. **Entretien avec le jury**
4. **Obtention du diplôme**

## Nos formules VAE

- **VAE avec accompagnement** : 4500€ TTC
- **VAE sans accompagnement** : 2760€ TTC

## Financement

La VAE est éligible au CPF et peut être financée par votre employeur ou Pôle Emploi.`,
    auteur: 'Thomas Martin',
    datePublication: '2024-12-18',
    tempsLecture: '6 min',
    featured: true,
    tags: ['VAE', 'validation acquis', 'BTP', 'diplôme'],
    seoTitle: 'VAE BTP - Validation des Acquis de l\'Expérience dans le Bâtiment',
    seoDescription: 'Obtenez un diplôme BTP grâce à votre expérience avec la VAE. Processus, financement et accompagnement personnalisé.',
    seoKeywords: ['VAE BTP', 'validation acquis expérience', 'diplôme BTP'],
    publishedAt: new Date().toISOString()
  },
  {
    titre: 'Reconversion professionnelle dans le BTP : Guide complet',
    slug: 'reconversion-professionnelle-btp-guide',
    extrait: 'Vous souhaitez vous reconvertir dans le BTP ? Découvrez nos conseils et formations pour réussir votre transition.',
    contenu: `# Reconversion professionnelle dans le BTP : Guide complet

Le secteur du BTP offre de nombreuses opportunités pour une reconversion professionnelle réussie.

## Pourquoi choisir le BTP ?

- **Secteur porteur** : Croissance constante
- **Diversité des métiers** : De la conception à la réalisation
- **Évolution technologique** : BIM, construction durable
- **Perspectives d'emploi** : Forte demande de professionnels qualifiés

## Nos formations reconversion

- **Conducteur de travaux** (18 mois)
- **Chargé d'affaires** (12 mois)
- **Coordinateur BIM** (10 mois)

## Financement de votre reconversion

- CPF (Compte Personnel de Formation)
- Pôle Emploi
- Région Île-de-France
- Financement personnel

## Témoignages

"Après 15 ans dans la finance, j'ai trouvé ma voie dans le BTP grâce à CMA. Aujourd'hui conducteur de travaux, je ne regrette rien !" - Sarah L.`,
    auteur: 'Pierre Durand',
    datePublication: '2024-12-15',
    tempsLecture: '10 min',
    featured: false,
    tags: ['reconversion', 'BTP', 'formation professionnelle', 'carrière'],
    seoTitle: 'Reconversion Professionnelle BTP - Formations et Conseils 2024',
    seoDescription: 'Guide complet pour réussir sa reconversion dans le BTP. Formations, financement et témoignages de professionnels.',
    seoKeywords: ['reconversion BTP', 'formation reconversion', 'changer de métier BTP'],
    publishedAt: new Date().toISOString()
  },
  {
    titre: 'Les métiers d\'avenir dans le BTP en 2024',
    slug: 'metiers-avenir-btp-2024',
    extrait: 'Découvrez les métiers du BTP qui recrutent et les compétences recherchées par les entreprises en 2024.',
    contenu: `# Les métiers d'avenir dans le BTP en 2024

Le secteur du BTP évolue rapidement avec l'arrivée de nouvelles technologies et la transition écologique.

## Top 5 des métiers qui recrutent

1. **Coordinateur BIM** - 45-60k€
2. **Expert en construction durable** - 40-55k€
3. **Conducteur de travaux VRD** - 38-52k€
4. **Chargé d'affaires bâtiment** - 42-58k€
5. **Responsable QSE** - 40-50k€

## Compétences recherchées

- **Maîtrise du BIM** (Building Information Modeling)
- **Connaissance des normes environnementales**
- **Gestion de projet agile**
- **Leadership et management d'équipe**
- **Veille technologique**

## Se former aux métiers d'avenir

Nos formations intègrent ces nouvelles compétences pour vous préparer aux défis de demain.`,
    auteur: 'Julie Moreau',
    datePublication: '2024-12-12',
    tempsLecture: '7 min',
    featured: false,
    tags: ['métiers BTP', 'avenir', 'recrutement', 'compétences'],
    seoTitle: 'Métiers d\'Avenir BTP 2024 - Formations et Opportunités',
    seoDescription: 'Découvrez les métiers du BTP qui recrutent en 2024. Salaires, compétences et formations pour votre carrière.',
    seoKeywords: ['métiers BTP 2024', 'emploi BTP', 'carrière construction'],
    publishedAt: new Date().toISOString()
  }
];

// Formateurs
const formateurs = [
  {
    nom: 'Dubois',
    prenom: 'Marie',
    poste: 'Formatrice Conducteur de Travaux',
    specialites: ['Gestion de chantier', 'Coordination d\'équipes', 'Sécurité BTP'],
    experience: '15 ans d\'expérience en tant que conductrice de travaux chez Bouygues Construction. Spécialisée dans les projets de grande envergure et la gestion d\'équipes multiculturelles.',
    biographie: `Marie Dubois est une professionnelle reconnue dans le secteur du BTP avec plus de 15 ans d'expérience. 

Diplômée d'une école d'ingénieurs, elle a débuté sa carrière comme ingénieure travaux avant d'évoluer vers des postes de conductrice de travaux sur des projets d'envergure nationale.

**Expertise :**
- Gestion de chantiers complexes (budgets > 10M€)
- Coordination d'équipes de 50+ personnes
- Mise en place de protocoles sécurité
- Formation et encadrement de jeunes professionnels

Passionnée par la transmission de savoir, Marie a rejoint CMA pour partager son expertise avec la nouvelle génération de professionnels du BTP.`,
    linkedin: 'https://linkedin.com/in/marie-dubois-btp',
    ordre: 1,
    publishedAt: new Date().toISOString()
  },
  {
    nom: 'Martin',
    prenom: 'Thomas',
    poste: 'Formateur BIM et Technologies',
    specialites: ['BIM', 'Revit', 'Technologies numériques', 'Innovation BTP'],
    experience: '12 ans dans le digital BTP, expert certifié Autodesk. Ancien responsable BIM chez Vinci Construction.',
    biographie: `Thomas Martin est un expert reconnu des technologies numériques appliquées au BTP.

Ingénieur de formation, il s'est spécialisé très tôt dans les outils numériques et la modélisation 3D. Il a accompagné la transformation digitale de plusieurs grandes entreprises du secteur.

**Certifications :**
- Autodesk Certified Professional
- Expert BIM Level 3
- Formateur agréé Revit

**Réalisations :**
- Mise en place de la méthodologie BIM chez Vinci
- Formation de 200+ professionnels aux outils numériques
- Développement de workflows BIM innovants

Thomas apporte à CMA son expertise technique et sa passion pour l'innovation dans la construction.`,
    linkedin: 'https://linkedin.com/in/thomas-martin-bim',
    ordre: 2,
    publishedAt: new Date().toISOString()
  },
  {
    nom: 'Moreau',
    prenom: 'Julie',
    poste: 'Formatrice Construction Durable',
    specialites: ['Construction durable', 'Normes environnementales', 'Efficacité énergétique'],
    experience: '10 ans en bureau d\'études environnement, spécialiste HQE et BREEAM. Consultante en construction durable.',
    biographie: `Julie Moreau est une experte en construction durable et performance environnementale.

Ingénieure environnement de formation, elle a consacré sa carrière à promouvoir les pratiques durables dans le secteur de la construction.

**Domaines d'expertise :**
- Certifications HQE, BREEAM, LEED
- Analyse du cycle de vie des bâtiments
- Efficacité énergétique et RE2020
- Matériaux biosourcés et recyclés

**Missions :**
- Conseil en stratégie environnementale
- Accompagnement certification bâtiments
- Formation aux nouvelles réglementations
- Recherche et développement durable

Julie transmet chez CMA sa passion pour une construction respectueuse de l'environnement.`,
    linkedin: 'https://linkedin.com/in/julie-moreau-durable',
    ordre: 3,
    publishedAt: new Date().toISOString()
  }
];

async function importBlogData() {
  console.log('🚀 Import des données Blog vers Strapi...\n');

  try {
    // Test de connexion
    console.log('🔗 Test de connexion à Strapi...');
    await fetchAPI('/api/formations?pagination[limit]=1');
    console.log('✅ Connexion Strapi OK\n');

    // Import des catégories blog
    console.log('📂 Import des catégories blog...');
    for (const categorie of categoriesBlog) {
      try {
        await fetchAPI('/api/categories-blog', 'POST', categorie);
        console.log(`  ✅ Catégorie "${categorie.nom}" importée`);
      } catch (error) {
        if (error.message.includes('400')) {
          console.log(`  ⚠️ Catégorie "${categorie.nom}" existe déjà ou erreur de validation`);
        } else {
          console.log(`  ❌ Catégorie "${categorie.nom}": ${error.message}`);
        }
      }
    }

    // Import des articles blog
    console.log('\n📝 Import des articles blog...');
    for (const article of articlesBlog) {
      try {
        await fetchAPI('/api/articles-blog', 'POST', article);
        console.log(`  ✅ Article "${article.titre}" importé`);
      } catch (error) {
        if (error.message.includes('400')) {
          console.log(`  ⚠️ Article "${article.titre}" existe déjà ou erreur de validation`);
        } else {
          console.log(`  ❌ Article "${article.titre}": ${error.message}`);
        }
      }
    }

    // Import des formateurs
    console.log('\n👨‍🏫 Import des formateurs...');
    for (const formateur of formateurs) {
      try {
        await fetchAPI('/api/formateurs', 'POST', formateur);
        console.log(`  ✅ Formateur "${formateur.prenom} ${formateur.nom}" importé`);
      } catch (error) {
        if (error.message.includes('400')) {
          console.log(`  ⚠️ Formateur "${formateur.prenom} ${formateur.nom}" existe déjà ou erreur de validation`);
        } else {
          console.log(`  ❌ Formateur "${formateur.prenom} ${formateur.nom}": ${error.message}`);
        }
      }
    }

    console.log('\n✨ Import Blog terminé!');
    console.log('\n📊 Résumé des imports:');
    console.log(`  - ${categoriesBlog.length} catégories blog`);
    console.log(`  - ${articlesBlog.length} articles blog`);
    console.log(`  - ${formateurs.length} formateurs`);

    console.log('\n💡 Prochaines étapes:');
    console.log('  1. Vérifier les données importées dans l\'interface admin');
    console.log('  2. Configurer les relations entre articles et catégories');
    console.log('  3. Mettre à jour les fonctions API dans src/lib/strapi.ts');
    console.log('  4. Migrer les composants blog du frontend');

  } catch (error) {
    console.error('\n❌ Erreur lors de l\'import:', error.message);
    console.log('\n💡 Vérifiez que:');
    console.log('  - Strapi est démarré (npm run develop dans cms-cma/)');
    console.log('  - Le token API est correct dans le script');
    console.log('  - Les content types blog sont bien créés dans Strapi');
  }
}

importBlogData();