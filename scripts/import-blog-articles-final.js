#!/usr/bin/env node

const fetch = require('node-fetch');
require('dotenv').config();

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

if (!STRAPI_API_TOKEN) {
  console.error('❌ STRAPI_API_TOKEN non configuré dans .env.local');
  process.exit(1);
}

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${STRAPI_API_TOKEN}`,
};

// Données des anciens articles du blog
const oldBlogArticles = [
  {
    titre: 'Les Métiers du BTP en 2025: Tendances et Opportunités',
    slug: 'metiers-btp-2025',
    resume: 'Découvrez les métiers du BTP qui recrutent le plus en 2025 et les opportunités de carrière',
    contenu: `<h2>Introduction</h2>
<p>Le secteur du BTP connaît une transformation majeure en 2025. Les entreprises recherchent activement des professionnels qualifiés pour répondre à la demande croissante.</p>

<h2>Les Métiers qui Recrutent</h2>
<h3>Conducteur de Travaux</h3>
<p>Le conducteur de travaux est un élément clé de tout chantier. Il assure la coordination entre les différents corps de métier et garantit le respect des délais et des budgets.</p>

<h3>Chef de Chantier</h3>
<p>Le chef de chantier supervise l'exécution des travaux et veille au respect des normes de sécurité. C'est un poste très demandé en 2025.</p>

<h3>Responsable Travaux</h3>
<p>Le responsable travaux gère plusieurs chantiers et assure la qualité des réalisations. C'est un poste de management très recherché.</p>

<h2>Les Compétences Requises</h2>
<ul>
<li>Maîtrise des outils numériques (BIM, logiciels de gestion)</li>
<li>Connaissance des normes de sécurité</li>
<li>Capacités de management et de communication</li>
<li>Expertise technique dans le domaine</li>
</ul>

<h2>Les Salaires</h2>
<p>Les salaires dans le BTP sont compétitifs et augmentent avec l'expérience. Un conducteur de travaux débutant gagne entre 28 000 et 35 000 euros par an, tandis qu'un responsable travaux expérimenté peut gagner plus de 50 000 euros.</p>

<h2>Conclusion</h2>
<p>Le BTP offre de belles opportunités de carrière pour les professionnels qualifiés. Les formations en alternance sont un excellent moyen d'accéder à ces métiers.</p>`,
    datePublication: new Date('2025-01-15').toISOString(),
    auteur: 'Équipe CMA',
    featured: true,
    ordre: 1,
    categorie: 'tendances-btp'
  },
  {
    titre: 'Guide Complet de la Formation BTP: Niveaux et Parcours',
    slug: 'guide-formation-btp',
    resume: 'Tout ce que vous devez savoir sur les niveaux de formation en BTP et les parcours disponibles',
    contenu: `<h2>Les Niveaux de Formation</h2>
<h3>CAP (Certificat d'Aptitude Professionnelle)</h3>
<p>Le CAP est le premier niveau de qualification professionnelle. Il prépare à un métier spécifique en 2 ans après la 3ème.</p>

<h3>Bac Pro (Baccalauréat Professionnel)</h3>
<p>Le Bac Pro offre une formation plus complète en 3 ans. Il permet d'accéder à des postes de technicien ou de chef d'équipe.</p>

<h3>BTS (Brevet de Technicien Supérieur)</h3>
<p>Le BTS est un diplôme de niveau bac+2. Il prépare à des postes de responsabilité comme conducteur de travaux ou chef de projet.</p>

<h2>Les Parcours en Alternance</h2>
<p>L'alternance combine la théorie en école et la pratique en entreprise. C'est le meilleur moyen d'acquérir une expérience professionnelle tout en étudiant.</p>

<h2>Les Débouchés</h2>
<ul>
<li>Ouvrier qualifié</li>
<li>Technicien</li>
<li>Chef d'équipe</li>
<li>Conducteur de travaux</li>
<li>Chef de projet</li>
</ul>

<h2>Conclusion</h2>
<p>Quel que soit votre niveau initial, il existe un parcours de formation adapté à vos objectifs dans le BTP.</p>`,
    datePublication: new Date('2025-01-10').toISOString(),
    auteur: 'Équipe CMA',
    featured: true,
    ordre: 2,
    categorie: 'formations'
  },
  {
    titre: 'Reconversion Professionnelle à 40 ans: C\'est Possible!',
    slug: 'reconversion-40ans',
    resume: 'Pourquoi et comment se reconvertir dans le BTP à 40 ans? Découvrez les témoignages et les conseils',
    contenu: `<h2>Pourquoi se Reconvertir dans le BTP?</h2>
<p>Le BTP offre des opportunités de reconversion pour les professionnels en quête de changement. Les entreprises recherchent des personnes motivées et expérimentées.</p>

<h2>Les Avantages de la Reconversion</h2>
<ul>
<li>Métiers en demande</li>
<li>Salaires compétitifs</li>
<li>Possibilités d'évolution</li>
<li>Formations adaptées</li>
<li>Accompagnement personnalisé</li>
</ul>

<h2>Les Formations Disponibles</h2>
<p>CMA Academy propose des formations spécifiques pour les reconversions professionnelles. Ces formations combinent théorie et pratique pour une intégration rapide.</p>

<h2>Témoignages</h2>
<p>De nombreux professionnels ont réussi leur reconversion dans le BTP. Leurs témoignages montrent que c'est possible à tout âge avec la bonne formation et la motivation.</p>

<h2>Conclusion</h2>
<p>La reconversion dans le BTP à 40 ans est tout à fait possible. C'est une excellente opportunité pour ceux qui cherchent un nouveau départ professionnel.</p>`,
    datePublication: new Date('2025-01-05').toISOString(),
    auteur: 'Équipe CMA',
    featured: true,
    ordre: 3,
    categorie: 'conseils-carriere'
  },
  {
    titre: 'L\'Alternance en BTP: Comment Ça Marche?',
    slug: 'alternance-btp',
    resume: 'Tout ce que vous devez savoir sur l\'alternance en BTP: contrat, salaire, avantages',
    contenu: `<h2>Qu'est-ce que l'Alternance?</h2>
<p>L'alternance est un système de formation qui combine l'enseignement théorique en école et la pratique en entreprise. C'est le meilleur moyen d'acquérir une expérience professionnelle.</p>

<h2>Les Types de Contrats</h2>
<h3>Contrat d'Apprentissage</h3>
<p>Le contrat d'apprentissage s'adresse aux jeunes de 16 à 29 ans. Il dure généralement 2 à 3 ans.</p>

<h3>Contrat de Professionnalisation</h3>
<p>Le contrat de professionnalisation s'adresse aux demandeurs d'emploi et aux jeunes. Il dure entre 6 mois et 2 ans.</p>

<h2>Le Salaire en Alternance</h2>
<p>Le salaire en alternance varie selon l'âge et l'année de formation. Il est généralement entre 50% et 80% du SMIC.</p>

<h2>Les Avantages</h2>
<ul>
<li>Expérience professionnelle</li>
<li>Salaire</li>
<li>Diplôme reconnu</li>
<li>Possibilité d'embauche</li>
<li>Couverture sociale</li>
</ul>

<h2>Conclusion</h2>
<p>L'alternance est le meilleur moyen de débuter une carrière dans le BTP. C'est une formation pratique et rémunérée.</p>`,
    datePublication: new Date('2024-12-28').toISOString(),
    auteur: 'Équipe CMA',
    featured: false,
    ordre: 4,
    categorie: 'formations'
  },
  {
    titre: 'Formation BIM: L\'Avenir du BTP',
    slug: 'formation-bim',
    resume: 'Découvrez pourquoi la formation BIM est essentielle pour les professionnels du BTP',
    contenu: `<h2>Qu'est-ce que le BIM?</h2>
<p>Le BIM (Building Information Modeling) est une méthode de travail collaborative qui utilise un modèle numérique du bâtiment. C'est l'avenir du BTP.</p>

<h2>Pourquoi Apprendre le BIM?</h2>
<ul>
<li>Améliore la productivité</li>
<li>Réduit les erreurs</li>
<li>Facilite la collaboration</li>
<li>Augmente les salaires</li>
<li>Ouvre de nouvelles opportunités</li>
</ul>

<h2>Les Compétences BIM</h2>
<p>Les compétences BIM incluent la modélisation 3D, la gestion de projet, la coordination et la collaboration. Ces compétences sont très demandées.</p>

<h2>Les Formations BIM</h2>
<p>CMA Academy propose des formations BIM adaptées à tous les niveaux. Ces formations combinent théorie et pratique avec les outils les plus modernes.</p>

<h2>Conclusion</h2>
<p>La formation BIM est essentielle pour rester compétitif dans le BTP. C'est un investissement pour votre carrière.</p>`,
    datePublication: new Date('2024-12-20').toISOString(),
    auteur: 'Équipe CMA',
    featured: false,
    ordre: 5,
    categorie: 'formations'
  },
  {
    titre: 'Conducteur de Travaux: Le Métier Clé du BTP',
    slug: 'conducteur-travaux',
    resume: 'Découvrez le métier de conducteur de travaux: missions, compétences, salaire',
    contenu: `<h2>Qui est le Conducteur de Travaux?</h2>
<p>Le conducteur de travaux est le responsable de l'exécution d'un chantier. Il assure la coordination, la qualité et le respect des délais.</p>

<h2>Les Missions</h2>
<ul>
<li>Planifier les travaux</li>
<li>Coordonner les équipes</li>
<li>Contrôler la qualité</li>
<li>Gérer le budget</li>
<li>Assurer la sécurité</li>
<li>Communiquer avec les clients</li>
</ul>

<h2>Les Compétences Requises</h2>
<ul>
<li>Connaissance technique</li>
<li>Capacités de management</li>
<li>Rigueur et organisation</li>
<li>Communication</li>
<li>Résolution de problèmes</li>
</ul>

<h2>Le Salaire</h2>
<p>Un conducteur de travaux débutant gagne entre 28 000 et 35 000 euros par an. Avec l'expérience, le salaire peut dépasser 50 000 euros.</p>

<h2>Conclusion</h2>
<p>Le conducteur de travaux est un métier passionnant et bien rémunéré. C'est une excellente carrière pour ceux qui aiment le management et la technique.</p>`,
    datePublication: new Date('2024-12-15').toISOString(),
    auteur: 'Équipe CMA',
    featured: false,
    ordre: 6,
    categorie: 'conseils-carriere'
  },
  {
    titre: 'Financement de Votre Formation BTP: Les Aides Disponibles',
    slug: 'financement-formation',
    resume: 'Découvrez toutes les aides et financements disponibles pour votre formation BTP',
    contenu: `<h2>Les Aides au Financement</h2>
<h3>Le Compte Personnel de Formation (CPF)</h3>
<p>Le CPF permet à chaque personne d'accumuler des crédits de formation. Ces crédits peuvent être utilisés pour financer une formation.</p>

<h3>L'Aide Individuelle à la Formation (AIF)</h3>
<p>L'AIF est une aide versée par Pôle Emploi pour les demandeurs d'emploi. Elle complète les autres financements.</p>

<h3>Les Bourses</h3>
<p>Certaines formations donnent droit à des bourses selon les critères de ressources.</p>

<h2>L'Alternance: Un Financement Naturel</h2>
<p>L'alternance est un excellent moyen de financer votre formation. Vous êtes rémunéré pendant votre formation.</p>

<h2>Les Aides Régionales</h2>
<p>Certaines régions proposent des aides spécifiques pour les formations en BTP. Renseignez-vous auprès de votre région.</p>

<h2>Conclusion</h2>
<p>Il existe de nombreuses aides pour financer votre formation BTP. N'hésitez pas à vous renseigner auprès de nos conseillers.</p>`,
    datePublication: new Date('2024-12-10').toISOString(),
    auteur: 'Équipe CMA',
    featured: false,
    ordre: 7,
    categorie: 'formations'
  },
  {
    titre: 'Choisir le Bon Centre de Formation BTP',
    slug: 'centre-formation',
    resume: 'Les critères pour choisir le bon centre de formation BTP pour votre carrière',
    contenu: `<h2>Les Critères de Choix</h2>
<h3>L'Accréditation</h3>
<p>Vérifiez que le centre est accrédité et reconnu par les professionnels du BTP.</p>

<h3>Les Formateurs</h3>
<p>Les formateurs doivent avoir une expérience professionnelle solide dans le BTP.</p>

<h3>Les Équipements</h3>
<p>Le centre doit disposer d'équipements modernes et à jour.</p>

<h3>Les Partenaires Entreprises</h3>
<p>Un bon centre a des partenaires entreprises pour les stages et l'alternance.</p>

<h2>La Réputation</h2>
<p>Consultez les avis des anciens étudiants et les taux d'insertion professionnelle.</p>

<h2>L'Accompagnement</h2>
<p>Un bon centre offre un accompagnement personnalisé et un suivi après la formation.</p>

<h2>Conclusion</h2>
<p>Choisir le bon centre de formation est crucial pour votre réussite. Prenez le temps de bien comparer les options.</p>`,
    datePublication: new Date('2024-12-05').toISOString(),
    auteur: 'Équipe CMA',
    featured: false,
    ordre: 8,
    categorie: 'formations'
  },
  {
    titre: 'Économiste de la Construction: Un Métier Méconnu',
    slug: 'economiste-construction',
    resume: 'Découvrez le métier d\'économiste de la construction et ses opportunités',
    contenu: `<h2>Qui est l'Économiste de la Construction?</h2>
<p>L'économiste de la construction est un expert en coûts et en budgets. Il assure la rentabilité des projets.</p>

<h2>Les Missions</h2>
<ul>
<li>Estimer les coûts</li>
<li>Gérer le budget</li>
<li>Analyser les devis</li>
<li>Optimiser les coûts</li>
<li>Conseiller les clients</li>
</ul>

<h2>Les Compétences Requises</h2>
<ul>
<li>Connaissance technique du BTP</li>
<li>Compétences en gestion financière</li>
<li>Maîtrise des outils informatiques</li>
<li>Rigueur et précision</li>
</ul>

<h2>Le Salaire</h2>
<p>Un économiste de la construction gagne entre 30 000 et 45 000 euros par an selon l'expérience.</p>

<h2>Conclusion</h2>
<p>L'économiste de la construction est un métier passionnant pour ceux qui aiment les chiffres et la technique.</p>`,
    datePublication: new Date('2024-11-30').toISOString(),
    auteur: 'Équipe CMA',
    featured: false,
    ordre: 9,
    categorie: 'conseils-carriere'
  }
];

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

async function importBlogArticles() {
  console.log('🚀 Import des anciens articles du blog...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const article of oldBlogArticles) {
    const result = await createArticle(article);
    if (result) {
      successCount++;
    } else {
      errorCount++;
    }
  }

  console.log('\n═══════════════════════════════════════════════════════════');
  console.log(`\n✅ Import terminé!`);
  console.log(`   ${successCount} article(s) créé(s)`);
  console.log(`   ${errorCount} erreur(s)`);
  console.log('\n📋 Prochaines étapes:');
  console.log('1. Accédez à http://localhost:1337/admin');
  console.log('2. Allez dans Content Manager > Articles Blog');
  console.log('3. Téléchargez les images pour chaque article');
  console.log('4. Visitez http://localhost:3000/blog pour voir les articles');
  console.log('\n═══════════════════════════════════════════════════════════\n');
}

importBlogArticles().catch(console.error);
