/**
 * Script d'import du contenu VAE BTP enrichi dans Strapi
 * Design moderne pour formation BTP
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || 'votre_token_ici';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${STRAPI_TOKEN}`
};

// ============================================
// CONTENU VAE ENRICHI - DESIGN MODERNE BTP
// ============================================

const pageVAEContent = {
  heroTitre: "VAE BTP - Transformez votre Expérience en Diplôme",
  heroDescription: "Vous avez acquis des compétences au fil des années dans le BTP sans diplôme officiel ? La Validation des Acquis de l'Expérience (VAE) vous permet de transformer cette expérience terrain en certification professionnelle reconnue par l'État. À la Construction Management Academy, nous vous accompagnons dans toutes les étapes de votre démarche VAE.",
  statExperience: "1 an",
  statCertifications: "5",
  statFinancement: "CPF",
  statDiplome: "0",
  sectionTitre: "Qu'est-ce que la VAE et à qui s'adresse-t-elle ?",
  sectionDescription: `<p>La <strong>Validation des Acquis de l'Expérience</strong> est un droit individuel inscrit dans le Code du Travail (articles L6313-1 et L6353-3). Elle permet d'obtenir tout ou partie d'un diplôme, d'un titre professionnel ou d'un certificat de qualification, en justifiant d'au moins <strong>1 an d'expérience</strong> en lien avec la certification visée.</p>
<p>Nos formations BTP en VAE sont accessibles <strong>sans condition d'âge, de nationalité ou de statut</strong> (salarié, indépendant, demandeur d'emploi, bénévole…). Vous devez justifier d'au moins 1 an d'expérience continue ou non, à temps plein ou partiel, en lien direct avec la certification visée.</p>
<h3>🎯 Accès élargi</h3>
<p>Accessible à tous, sans condition de diplôme initial, dès lors que l'expérience est en lien direct avec la certification visée.</p>
<h3>🏆 Reconnaissance officielle</h3>
<p>La VAE permet d'obtenir tout ou partie d'un diplôme, titre ou certificat inscrit au RNCP, en valorisant l'expérience professionnelle acquise.</p>
<h3>⚡ Flexible et personnalisée</h3>
<p>Elle s'adapte à votre rythme, avec un accompagnement pour constituer un dossier solide et réussir l'oral devant un jury.</p>`,
  ctaTitre: "Prêt à valoriser votre expérience BTP ?",
  ctaDescription: "Transformez votre expérience terrain en diplôme reconnu. Contactez-nous pour étudier votre éligibilité à la VAE BTP et démarrer votre parcours de certification."
};

// Certifications VAE accessibles à la CMA
const vaeCertifications = [
  {
    titre: "Conducteur de Travaux Bâtiment et Génie Civil",
    rncp: "RNCP n°40217",
    niveau: "niveau5",
    description: "Titre professionnel niveau 5 (BAC+2) - Pilotez vos chantiers de construction avec une certification reconnue.",
    ordre: 1
  },
  {
    titre: "Chef de Chantier en Voirie et Réseaux Divers",
    rncp: "RNCP n°41368",
    niveau: "niveau5",
    description: "Titre professionnel niveau 5 (BAC+2) - Gérez les travaux VRD avec expertise et certification officielle.",
    ordre: 2
  },
  {
    titre: "Chargé d'Affaires du Bâtiment",
    rncp: "RNCP n°35503",
    niveau: "niveau5",
    description: "Titre professionnel niveau 5 (BAC+2) - Développez votre activité commerciale dans le BTP.",
    ordre: 3
  },
  {
    titre: "Coordinateur BIM du Bâtiment",
    rncp: "RNCP n°39408",
    niveau: "niveau6",
    description: "Titre professionnel niveau 6 (BAC+3) - Maîtrisez la maquette numérique et la coordination BIM.",
    ordre: 4
  },
  {
    titre: "Conducteur de Travaux Voirie et Réseaux Divers",
    rncp: "RNCP n°39469",
    niveau: "niveau6",
    description: "Titre professionnel niveau 6 (BAC+3) - Dirigez les projets VRD avec une expertise certifiée.",
    ordre: 5
  }
];

// Avantages de la VAE BTP
const vaeAvantages = [
  { texte: "Accessible à tous, sans condition de diplôme initial, dès lors que l'expérience est en lien direct avec la certification visée", ordre: 1 },
  { texte: "Reconnaissance officielle par un titre RNCP inscrit au Répertoire National des Certifications Professionnelles", ordre: 2 },
  { texte: "Accompagnement personnalisé et flexible adapté à votre rythme et vos contraintes professionnelles", ordre: 3 },
  { texte: "Financement possible via CPF, OPCO, employeur ou autofinancement - nous vous aidons à constituer votre dossier", ordre: 4 },
  { texte: "Valorisation de votre expérience terrain acquise au fil des années dans le secteur BTP", ordre: 5 },
  { texte: "Validation partielle possible : obtenez un ou plusieurs CCP et complétez dans l'année suivante", ordre: 6 }
];

// Formules VAE
const vaeFormules = [
  {
    titre: "VAE avec Accompagnement (Formule Complète)",
    description: "Un accompagnement individualisé tout au long de votre démarche VAE pour maximiser vos chances de réussite.",
    modalites: "Présentiel, visio, téléphone et mail",
    services: [
      "Analyse approfondie de votre parcours professionnel",
      "Identification des activités pertinentes pour la certification",
      "Aide à la rédaction du dossier de validation",
      "Préparation intensive à l'entretien devant le jury",
      "Suivi personnalisé jusqu'à l'obtention du titre"
    ],
    prix: "4 500 € TTC (3 750 € HT)",
    heures: "Jusqu'à 20 heures d'accompagnement",
    ordre: 1
  },
  {
    titre: "VAE sans Accompagnement (Formule Libre)",
    description: "Vous gérez votre démarche en autonomie, mais bénéficiez de notre expertise pour organiser votre passage devant le jury.",
    modalites: "Suivi administratif uniquement",
    services: [
      "Vérification de votre éligibilité à la VAE",
      "Inscription et convocation au jury",
      "Informations administratives et techniques",
      "Support pour les démarches de financement"
    ],
    prix: "2 760 € TTC (2 300 € HT)",
    heures: "Suivi administratif",
    ordre: 2
  }
];

// FAQ VAE
const vaeFaqs = [
  {
    question: "Quelle expérience est requise pour accéder à la VAE BTP ?",
    reponse: "Vous devez justifier d'au moins 1 an d'expérience (continue ou non, à temps plein ou partiel) en lien direct avec la certification visée. Cette expérience peut être acquise en tant que salarié, indépendant, bénévole ou demandeur d'emploi.",
    ordre: 1
  },
  {
    question: "Puis-je valider partiellement un titre professionnel ?",
    reponse: "Oui, vous pouvez valider un titre complet ou un ou plusieurs CCP (Certificats de Compétences Professionnelles). En cas de validation partielle, vous disposez d'1 an pour compléter les blocs de compétences manquants.",
    ordre: 2
  },
  {
    question: "Comment financer ma VAE BTP ?",
    reponse: "Plusieurs options de financement sont possibles : CPF (Compte Personnel de Formation), financement employeur, OPCO (Opérateur de Compétences) ou autofinancement. Notre équipe vous accompagne dans la constitution de votre dossier de financement.",
    ordre: 3
  },
  {
    question: "Quelle est la différence entre les deux formules VAE ?",
    reponse: "La formule avec accompagnement (4 500 € TTC) inclut jusqu'à 20h d'accompagnement personnalisé : analyse de parcours, aide à la rédaction, préparation au jury. La formule libre (2 760 € TTC) vous laisse autonome sur la préparation, avec un suivi administratif pour l'inscription et la convocation.",
    ordre: 4
  },
  {
    question: "Combien de temps dure une démarche VAE ?",
    reponse: "La durée varie selon votre disponibilité et la complexité de votre dossier. En moyenne, comptez 6 à 12 mois entre le début de la démarche et le passage devant le jury. L'accompagnement personnalisé peut accélérer ce processus.",
    ordre: 5
  },
  {
    question: "Quelles certifications sont accessibles via la VAE à la CMA ?",
    reponse: "Nous proposons 5 certifications RNCP : Conducteur de Travaux Bâtiment (niveau 5), Chef de Chantier VRD (niveau 5), Chargé d'Affaires Bâtiment (niveau 5), Coordinateur BIM (niveau 6) et Conducteur de Travaux VRD (niveau 6).",
    ordre: 6
  }
];

// ============================================
// FONCTIONS D'IMPORT
// ============================================

async function clearCollection(endpoint) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/${endpoint}`, { headers });
    if (!response.ok) return;
    
    const data = await response.json();
    const items = data.data || [];
    
    for (const item of items) {
      await fetch(`${STRAPI_URL}/api/${endpoint}/${item.id}`, {
        method: 'DELETE',
        headers
      });
    }
    console.log(`✓ Collection ${endpoint} vidée`);
  } catch (error) {
    console.log(`⚠ Impossible de vider ${endpoint}:`, error.message);
  }
}

async function importPageVAE() {
  console.log('\n📄 Import Page VAE...');
  
  try {
    // Vérifier si existe déjà
    const checkResponse = await fetch(`${STRAPI_URL}/api/page-vae`, { headers });
    
    let method = 'POST';
    let url = `${STRAPI_URL}/api/page-vae`;
    
    if (checkResponse.ok) {
      const existing = await checkResponse.json();
      if (existing.data) {
        method = 'PUT';
        url = `${STRAPI_URL}/api/page-vae`;
      }
    }
    
    const response = await fetch(url, {
      method,
      headers,
      body: JSON.stringify({ data: pageVAEContent })
    });
    
    if (response.ok) {
      console.log('✅ Page VAE importée avec succès');
      
      // Publier
      await fetch(`${STRAPI_URL}/api/page-vae`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ data: { publishedAt: new Date().toISOString() } })
      });
    } else {
      const error = await response.text();
      console.log('❌ Erreur Page VAE:', error);
    }
  } catch (error) {
    console.log('❌ Erreur:', error.message);
  }
}

async function importCollection(endpoint, items, name) {
  console.log(`\n📦 Import ${name}...`);
  
  await clearCollection(endpoint);
  
  let success = 0;
  for (const item of items) {
    try {
      const response = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ data: { ...item, publishedAt: new Date().toISOString() } })
      });
      
      if (response.ok) {
        success++;
      } else {
        const error = await response.text();
        console.log(`  ⚠ Erreur item:`, error.substring(0, 100));
      }
    } catch (error) {
      console.log(`  ⚠ Erreur:`, error.message);
    }
  }
  
  console.log(`✅ ${name}: ${success}/${items.length} importés`);
}

async function main() {
  console.log('🚀 Import du contenu VAE BTP enrichi dans Strapi');
  console.log('================================================\n');
  console.log(`📡 Strapi URL: ${STRAPI_URL}`);
  
  // Test connexion
  try {
    const test = await fetch(`${STRAPI_URL}/api/page-vae`, { headers });
    if (!test.ok && test.status === 401) {
      console.log('\n❌ Token API invalide. Vérifiez STRAPI_API_TOKEN');
      return;
    }
  } catch (error) {
    console.log('\n❌ Impossible de se connecter à Strapi:', error.message);
    return;
  }
  
  // Import des données
  await importPageVAE();
  await importCollection('vae-certifications', vaeCertifications, 'Certifications VAE');
  await importCollection('vae-avantages', vaeAvantages, 'Avantages VAE');
  await importCollection('vae-formules', vaeFormules, 'Formules VAE');
  await importCollection('vae-faqs', vaeFaqs, 'FAQ VAE');
  
  console.log('\n================================================');
  console.log('✅ Import VAE BTP terminé !');
  console.log('\n📋 Contenu importé:');
  console.log('   • Page VAE avec hero et sections');
  console.log('   • 5 certifications RNCP (niveau 5 et 6)');
  console.log('   • 6 avantages de la VAE');
  console.log('   • 2 formules (avec/sans accompagnement)');
  console.log('   • 6 questions FAQ');
  console.log('\n🌐 Voir la page: http://localhost:3000/formations/vae-btp');
}

main().catch(console.error);
