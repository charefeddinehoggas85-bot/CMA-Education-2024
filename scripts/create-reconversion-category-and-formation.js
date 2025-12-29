const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';

async function createReconversionCategoryAndFormation() {
  try {
    console.log('🚀 Création de la catégorie reconversion et ajout de la formation...');

    // 1. Vérifier si la catégorie reconversion existe
    console.log('📋 Vérification des catégories existantes...');
    const categoriesResponse = await axios.get(`${STRAPI_URL}/api/formation-categories`);
    let reconversionCategory = categoriesResponse.data.data.find(cat => 
      cat.attributes.nom === 'reconversion'
    );

    // 2. Créer la catégorie reconversion si elle n'existe pas
    if (!reconversionCategory) {
      console.log('📝 Création de la catégorie reconversion...');
      const categoryData = {
        data: {
          nom: 'reconversion',
          description: 'Formations pour professionnels en reconversion',
          publishedAt: new Date().toISOString()
        }
      };

      const categoryResponse = await axios.post(`${STRAPI_URL}/api/formation-categories`, categoryData);
      reconversionCategory = categoryResponse.data.data;
      console.log('✅ Catégorie reconversion créée:', reconversionCategory.id);
    } else {
      console.log('✅ Catégorie reconversion trouvée:', reconversionCategory.id);
    }

    // 3. Vérifier si la formation existe déjà
    console.log('🔍 Vérification si la formation existe déjà...');
    const formationsResponse = await axios.get(`${STRAPI_URL}/api/formations?filters[slug][$eq]=conducteur-travaux-publics-reconversion`);
    
    if (formationsResponse.data.data.length > 0) {
      console.log('⚠️ La formation existe déjà!');
      console.log('📋 Formation existante:', formationsResponse.data.data[0].attributes.titre);
      return;
    }

    // 4. Données de la nouvelle formation
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
        formation_categories: [reconversionCategory.id],
        publishedAt: new Date().toISOString()
      }
    };

    // 5. Créer la formation
    console.log('📝 Création de la formation...');
    const response = await axios.post(`${STRAPI_URL}/api/formations`, formationData);

    if (response.status === 200 || response.status === 201) {
      console.log('✅ Formation créée avec succès!');
      console.log('📊 ID:', response.data.data.id);
      console.log('🔗 Slug:', response.data.data.attributes.slug);
      
      // 6. Vérifier que la formation apparaît dans la catégorie reconversion
      console.log('\n🔍 Vérification de l\'assignation à la catégorie...');
      const formationsReconversionResponse = await axios.get(
        `${STRAPI_URL}/api/formations?filters[formation_categories][nom][$eq]=reconversion&populate=*`
      );
      
      const formationsReconversion = formationsReconversionResponse.data.data;
      console.log(`✅ Formations en reconversion: ${formationsReconversion.length}`);
      
      formationsReconversion.forEach(formation => {
        console.log(`  - ${formation.attributes.titre} (${formation.attributes.slug})`);
      });
      
      const nouvelleFormation = formationsReconversion.find(f => 
        f.attributes.slug === 'conducteur-travaux-publics-reconversion'
      );
      
      if (nouvelleFormation) {
        console.log('✅ La nouvelle formation est bien assignée à la catégorie reconversion');
      } else {
        console.log('⚠️ La formation n\'apparaît pas encore dans la catégorie reconversion');
      }

      // 7. Test du dropdown
      console.log('\n🎯 Test du dropdown formations reconversion...');
      const dropdownResponse = await axios.get(
        `${STRAPI_URL}/api/formation-categories?populate[formations][populate]=*`
      );
      
      const reconversionCat = dropdownResponse.data.data.find(cat => 
        cat.attributes.nom === 'reconversion'
      );
      
      if (reconversionCat && reconversionCat.attributes.formations.data.length > 0) {
        console.log(`✅ Dropdown reconversion: ${reconversionCat.attributes.formations.data.length} formations`);
        reconversionCat.attributes.formations.data.forEach(formation => {
          console.log(`  - ${formation.attributes.titre}`);
        });
      }

    } else {
      console.error('❌ Erreur lors de la création:', response.status);
    }

  } catch (error) {
    console.error('❌ Erreur:', error.response?.data || error.message);
  }
}

// Exécuter le script
createReconversionCategoryAndFormation();