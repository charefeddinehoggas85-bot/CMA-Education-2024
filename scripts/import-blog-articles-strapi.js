#!/usr/bin/env node

const fetch = require('node-fetch');

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || 'your-api-token';

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${STRAPI_API_TOKEN}`,
};

// Données d'exemple pour les catégories
const categoriesBlog = [
  {
    nom: 'Tendances BTP',
    slug: 'tendances-btp',
    description: 'Les dernières tendances du secteur du BTP',
    couleur: '#FF6B35',
    ordre: 1,
  },
  {
    nom: 'Conseils Carrière',
    slug: 'conseils-carriere',
    description: 'Conseils pour développer votre carrière dans le BTP',
    couleur: '#004E89',
    ordre: 2,
  },
  {
    nom: 'Formations',
    slug: 'formations',
    description: 'Informations sur nos formations',
    couleur: '#F77F00',
    ordre: 3,
  },
  {
    nom: 'Actualités',
    slug: 'actualites',
    description: 'Actualités de l\'école et du secteur',
    couleur: '#06A77D',
    ordre: 4,
  },
];

// Données d'exemple pour les articles
const articlesBlog = [
  {
    titre: 'Les tendances du BTP en 2024',
    slug: 'tendances-btp-2024',
    resume: 'Découvrez les principales tendances qui façonnent le secteur du BTP cette année, de la digitalisation à la durabilité.',
    contenu: `<h2>Introduction</h2>
<p>Le secteur du BTP connaît une transformation majeure en 2024. Les entreprises doivent s'adapter à de nouveaux défis et opportunités.</p>

<h2>1. La Digitalisation</h2>
<p>La digitalisation des chantiers est devenue incontournable. Les outils BIM, les drones et les logiciels de gestion de projet transforment la façon de travailler.</p>

<h2>2. La Durabilité</h2>
<p>Les normes environnementales deviennent plus strictes. Les entreprises investissent dans des matériaux durables et des techniques de construction écologiques.</p>

<h2>3. L'Automatisation</h2>
<p>Les robots et les systèmes automatisés gagnent du terrain sur les chantiers, améliorant la productivité et la sécurité.</p>

<h2>Conclusion</h2>
<p>Ces tendances offrent de nouvelles opportunités de carrière pour les professionnels du BTP formés aux technologies modernes.</p>`,
    datePublication: new Date().toISOString(),
    auteur: 'Équipe CMA',
    featured: true,
    ordre: 1,
    categorie: 'tendances-btp',
  },
  {
    titre: 'Comment réussir son alternance en BTP',
    slug: 'reussir-alternance-btp',
    resume: 'Conseils pratiques pour tirer le meilleur parti de votre alternance dans le secteur du BTP.',
    contenu: `<h2>Préparez-vous avant de commencer</h2>
<p>Une bonne préparation est essentielle pour réussir votre alternance. Familiarisez-vous avec l'entreprise et le secteur.</p>

<h2>Soyez proactif</h2>
<p>N'attendez pas qu'on vous donne des tâches. Proposez votre aide et montrez votre motivation.</p>

<h2>Apprenez de vos collègues</h2>
<p>Vos collègues expérimentés sont une ressource précieuse. Posez des questions et apprenez de leurs expériences.</p>

<h2>Respectez les règles de sécurité</h2>
<p>La sécurité est primordiale sur les chantiers. Respectez toujours les protocoles de sécurité.</p>

<h2>Conclusion</h2>
<p>Une alternance réussie est le tremplin vers une belle carrière dans le BTP.</p>`,
    datePublication: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    auteur: 'Équipe CMA',
    featured: true,
    ordre: 2,
    categorie: 'conseils-carriere',
  },
  {
    titre: 'Nouvelle formation: Conducteur de Travaux VRD',
    slug: 'formation-conducteur-travaux-vrd',
    resume: 'Découvrez notre nouvelle formation spécialisée en Voiries et Réseaux Divers.',
    contenu: `<h2>Présentation de la formation</h2>
<p>Notre nouvelle formation Conducteur de Travaux VRD prépare les professionnels aux défis spécifiques des travaux de voiries et réseaux divers.</p>

<h2>Objectifs pédagogiques</h2>
<ul>
<li>Maîtriser la gestion de projets VRD</li>
<li>Comprendre les normes et réglementations</li>
<li>Développer les compétences en leadership</li>
<li>Acquérir une expertise technique</li>
</ul>

<h2>Modalités</h2>
<p>Formation en alternance sur 2 ans, combinant théorie et pratique sur le terrain.</p>

<h2>Débouchés</h2>
<p>Conducteur de travaux, Chef de chantier, Responsable de projet VRD.</p>`,
    datePublication: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    auteur: 'Équipe CMA',
    featured: true,
    ordre: 3,
    categorie: 'formations',
  },
  {
    titre: 'CMA Academy reçoit le label de qualité',
    slug: 'cma-academy-label-qualite',
    resume: 'CMA Academy a reçu le label de qualité pour ses formations en BTP.',
    contenu: `<h2>Une reconnaissance importante</h2>
<p>Nous sommes fiers d'annoncer que CMA Academy a reçu le label de qualité pour ses formations en BTP.</p>

<h2>Ce que cela signifie</h2>
<p>Ce label reconnaît notre engagement envers l'excellence pédagogique et la satisfaction de nos apprenants.</p>

<h2>Nos engagements</h2>
<ul>
<li>Formations de qualité</li>
<li>Formateurs expérimentés</li>
<li>Suivi personnalisé</li>
<li>Insertion professionnelle</li>
</ul>

<h2>Merci</h2>
<p>Merci à tous nos apprenants, formateurs et partenaires qui ont contribué à cette reconnaissance.</p>`,
    datePublication: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    auteur: 'Direction CMA Academy',
    featured: false,
    ordre: 4,
    categorie: 'actualites',
  },
];

async function createCategorie(categorie) {
  try {
    console.log(`\n📝 Création de la catégorie: ${categorie.nom}`);
    
    const response = await fetch(`${STRAPI_URL}/api/categories-blog`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        data: categorie,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(`✅ Catégorie ${categorie.nom} créée`);
      return result.data.id;
    } else {
      const error = await response.json();
      console.log(`⚠️ Erreur création catégorie:`, error.error?.message || error);
      return null;
    }
  } catch (error) {
    console.error(`❌ Erreur:`, error.message);
    return null;
  }
}

async function getCategorieBySlug(slug) {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/categories-blog?filters[slug][$eq]=${slug}`,
      { headers }
    );

    if (response.ok) {
      const result = await response.json();
      return result.data?.[0]?.id || null;
    }
    return null;
  } catch (error) {
    console.error(`❌ Erreur recherche catégorie:`, error.message);
    return null;
  }
}

async function createArticle(article) {
  try {
    console.log(`\n📝 Création de l'article: ${article.titre}`);
    
    // Récupérer l'ID de la catégorie
    let categorieId = null;
    if (article.categorie) {
      categorieId = await getCategorieBySlug(article.categorie);
    }

    const articleData = {
      titre: article.titre,
      slug: article.slug,
      resume: article.resume,
      contenu: article.contenu,
      datePublication: article.datePublication,
      auteur: article.auteur,
      featured: article.featured,
      ordre: article.ordre,
    };

    if (categorieId) {
      articleData.categorie = categorieId;
    }

    const response = await fetch(`${STRAPI_URL}/api/articles-blog`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        data: articleData,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(`✅ Article ${article.titre} créé`);
      return result.data.id;
    } else {
      const error = await response.json();
      console.log(`⚠️ Erreur création article:`, error.error?.message || error);
      return null;
    }
  } catch (error) {
    console.error(`❌ Erreur:`, error.message);
    return null;
  }
}

async function importBlogData() {
  console.log('🚀 Import des données de blog...\n');

  // Créer les catégories
  console.log('📂 Création des catégories...');
  for (const categorie of categoriesBlog) {
    await createCategorie(categorie);
  }

  // Créer les articles
  console.log('\n📄 Création des articles...');
  for (const article of articlesBlog) {
    await createArticle(article);
  }

  console.log('\n✅ Import des données de blog terminé!');
  console.log('\n📋 Prochaines étapes:');
  console.log('1. Accédez à http://localhost:1337/admin');
  console.log('2. Allez dans Content Manager > Articles Blog');
  console.log('3. Téléchargez des images pour les articles');
  console.log('4. Configurez les permissions pour les rôles');
  console.log('5. Visitez http://localhost:3000/blog pour voir le résultat');
}

importBlogData().catch(console.error);
