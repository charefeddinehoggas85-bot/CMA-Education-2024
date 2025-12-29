const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';

async function addFormationConducteurTravauxPublicsReconversion() {
  try {
    console.log('🚀 Ajout de la formation Conducteur de Travaux Publics - Reconversion...');

    // Données de la nouvelle formation
    const formationData = {
      data: {
        titre: 'Conducteur de Travaux Publics - Professionnels en reconversion',
        slug: 'conducteur-travaux-publics-reconversion',
        niveau: 'BAC+2 - Niveau 5',
        rncp: 'RNCP38549',
        description_courte: 'Une formation pensée pour les professionnels souhaitant évoluer vers les métiers concrets et porteurs du secteur des travaux publics.',
        duree: '7 mois',
        rythme: '595 heures (5 mois en centre + 2 mois de stage)',
        modalite: '100% présentiel',
        prix: '15 € HT/heure',
        objectifs: [
          'Planifier, organiser et suivre l\'exécution de chantiers de travaux publics',
          'Gérer les budgets, contrats, achats et marges financières d\'un projet',
          'Superviser les équipes sur le terrain et coordonner les différents corps de métier',
          'Veiller au respect des délais, des normes de sécurité, de qualité et des enjeux environnementaux',
          'Assurer la communication avec les riverains, les prestataires, les autorités locales et les donneurs d\'ordre'
        ],
        debouches: [
          'Conducteur(trice) de travaux TP',
          'Chef de chantier TP',
          'Coordinateur de travaux',
          'Chargé(e) d\'études techniques',
          'Assistant(e) maître d\'œuvre TP'
        ],
        programme: [
          {
            module: 'Techniques des travaux publics',
            contenu: 'terrassement, voirie, réseaux divers (VRD), fondations, ouvrages d\'art, DAO/CAO, plans topographiques'
          },
          {
            module: 'Gestion financière & réglementaire',
            contenu: 'étude de prix TP, marges, DGD, droit des marchés publics, qualité, sécurité, AIPR, environnement'
          },
          {
            module: 'Préparation et conduite de chantier',
            contenu: 'élaboration des budgets, gestion des plannings, suivi de l\'exécution, gestion des imprévus'
          },
          {
            module: 'Communication & coordination',
            contenu: 'animation de réunions, communication écrite et orale, gestion des relations avec les acteurs du chantier'
          }
        ],
        prerequis: 'Aucun diplôme requis. L\'envie d\'apprendre et la motivation de construire un avenir professionnel concret.',
        evaluation: [
          'Contrôle continu en cours de formation',
          'Épreuve de synthèse (écrite + orale)',
          'Dossier professionnel (CRAMP)',
          'Entretien final avec jury à partir des productions du candidat',
          '4 projets tutorés concrets'
        ],
        financement: 'CPF, Pôle emploi, Transition Pro, aides régionales, Plan de développement des compétences de votre entreprise',
        poursuites_etudes: [
          'Responsable Travaux – Parcours Travaux Publics (CMA)',
          'Double parcours : Responsable Travaux (Bâtiment) / Coordinateur BIM du Bâtiment',
          'Passerelles vers d\'autres écoles spécialisées en ingénierie ou management de projet BTP'
        ],
        alternance: false,
        reconversion: true,
        vae: false,
        publishedAt: new Date().toISOString()
      }
    };

    // 1. Récupérer la catégorie "reconversion"
    console.log('📋 Récupération de la catégorie reconversion...');
    const categoriesResponse = await axios.get(`${STRAPI_URL}/api/formation-categories`);
    const reconversionCategory = categoriesResponse.data.data.find(cat => 
      cat.attributes.nom === 'reconversion'
    );

    if (!reconversionCategory) {
      console.error('❌ Catégorie "reconversion" non trouvée');
      return;
    }

    console.log('✅ Catégorie reconversion trouvée:', reconversionCategory.id);

    // 2. Ajouter la catégorie à la formation
    formationData.data.formation_categories = [reconversionCategory.id];

    // 3. Créer la formation
    console.log('📝 Création de la formation...');
    const response = await axios.post(`${STRAPI_URL}/api/formations`, formationData);

    if (response.status === 200 || response.status === 201) {
      console.log('✅ Formation créée avec succès!');
      console.log('📊 ID:', response.data.data.id);
      console.log('🔗 Slug:', response.data.data.attributes.slug);
      
      // 4. Vérifier que la formation apparaît dans la catégorie reconversion
      console.log('\n🔍 Vérification de l\'assignation à la catégorie...');
      const formationsReconversionResponse = await axios.get(
        `${STRAPI_URL}/api/formations?filters[formation_categories][nom][$eq]=reconversion&populate=*`
      );
      
      const formationsReconversion = formationsReconversionResponse.data.data;
      console.log(`✅ Formations en reconversion: ${formationsReconversion.length}`);
      
      const nouvelleFormation = formationsReconversion.find(f => 
        f.attributes.slug === 'conducteur-travaux-publics-reconversion'
      );
      
      if (nouvelleFormation) {
        console.log('✅ La nouvelle formation est bien assignée à la catégorie reconversion');
        console.log('📋 Titre:', nouvelleFormation.attributes.titre);
      } else {
        console.log('⚠️ La formation n\'apparaît pas encore dans la catégorie reconversion');
      }

    } else {
      console.error('❌ Erreur lors de la création:', response.status);
    }

  } catch (error) {
    console.error('❌ Erreur:', error.response?.data || error.message);
  }
}

// Exécuter le script
addFormationConducteurTravauxPublicsReconversion();