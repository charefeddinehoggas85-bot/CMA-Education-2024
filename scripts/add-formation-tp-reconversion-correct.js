const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';

async function addFormationTPReconversionCorrect() {
  try {
    console.log('🚀 Ajout de la formation Conducteur de Travaux Publics - Reconversion (version corrigée)...');

    // 1. Vérifier si la catégorie reconversion existe
    console.log('📋 Vérification des catégories existantes...');
    const categoriesResponse = await axios.get(`${STRAPI_URL}/api/formation-categories`);
    let reconversionCategory = categoriesResponse.data.data.find(cat => 
      cat.attributes.name === 'reconversion'
    );

    // 2. Créer la catégorie reconversion si elle n'existe pas
    if (!reconversionCategory) {
      console.log('📝 Création de la catégorie reconversion...');
      const categoryData = {
        data: {
          name: 'reconversion',
          slug: 'reconversion',
          description: 'Formations pour professionnels en reconversion',
          color: '#10B981',
          icon: 'RefreshCw',
          ordre: 2,
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
      console.log('📋 Formation existante:', formationsResponse.data.data[0].attributes.title);
      return;
    }

    // 4. Données de la nouvelle formation avec les bons champs
    const formationData = {
      data: {
        title: 'Conducteur de Travaux Publics - Professionnels en reconversion',
        slug: 'conducteur-travaux-publics-reconversion',
        level: 'BAC+2 - Niveau 5',
        rncp: 'RNCP38549',
        shortDesc: 'Une formation pensée pour les professionnels souhaitant évoluer vers les métiers concrets et porteurs du secteur des travaux publics.',
        fullDesc: `<h2>Une formation pensée pour les professionnels en reconversion</h2>
<p>Chez Construction Management Academy, nous accompagnons les personnes souhaitant évoluer et se reconvertir vers des métiers concrets et porteurs du secteur des travaux publics. Que vous soyez salarié(e), demandeur d'emploi, artisan ou professionnel en activité, cette formation vous permet de transformer votre expérience en compétence certifiée, grâce à un parcours professionnalisant.</p>`,
        
        objectifs: [
          'Planifier, organiser et suivre l\'exécution de chantiers de travaux publics',
          'Gérer les budgets, contrats, achats et marges financières d\'un projet',
          'Superviser les équipes sur le terrain et coordonner les différents corps de métier',
          'Veiller au respect des délais, des normes de sécurité, de qualité et des enjeux environnementaux',
          'Assurer la communication avec les riverains, les prestataires, les autorités locales et les donneurs d\'ordre'
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
        
        debouches: [
          'Conducteur(trice) de travaux TP',
          'Chef de chantier TP',
          'Coordinateur de travaux',
          'Chargé(e) d\'études techniques',
          'Assistant(e) maître d\'œuvre TP'
        ],
        
        duree: '7 mois',
        volumeHoraire: '595 heures',
        rythme: '5 mois en centre à Champs-sur-Marne + 2 mois de stage pratique en entreprise',
        modalite: '100% présentiel',
        typeContrat: 'Formation continue',
        effectif: '20 maximum par session',
        
        prerequis: ['Aucun diplôme requis', 'L\'envie d\'apprendre et la motivation de construire un avenir professionnel concret'],
        
        cout: '15 € HT/heure',
        financement: 'CPF, Pôle emploi, Transition Pro, aides régionales, Plan de développement des compétences de votre entreprise',
        
        evaluation: [
          'Contrôle continu en cours de formation',
          'Épreuve de synthèse (écrite + orale)',
          'Dossier professionnel (CRAMP)',
          'Entretien final avec jury à partir des productions du candidat',
          '4 projets tutorés concrets'
        ],
        
        poursuiteEtudes: [
          'Responsable Travaux – Parcours Travaux Publics (CMA)',
          'Double parcours : Responsable Travaux (Bâtiment) / Coordinateur BIM du Bâtiment',
          'Passerelles vers d\'autres écoles spécialisées en ingénierie ou management de projet BTP'
        ],
        
        publicCible: 'Professionnels en reconversion, salariés, demandeurs d\'emploi, artisans',
        
        category: reconversionCategory.id,
        ordre: 3,
        isActive: true,
        
        seoTitle: 'Formation Conducteur de Travaux Publics - Reconversion Professionnelle | CMA',
        seoDescription: 'Reconversion vers les travaux publics en 7 mois. Formation conducteur de travaux TP sans diplôme requis. Financement CPF, Pôle emploi.',
        seoKeywords: ['reconversion travaux publics', 'conducteur travaux TP', 'formation reconversion BTP', 'travaux publics formation'],
        
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
      console.log('📋 Titre:', response.data.data.attributes.title);
      
      // 6. Vérifier que la formation apparaît dans la catégorie reconversion
      console.log('\n🔍 Vérification de l\'assignation à la catégorie...');
      const formationsReconversionResponse = await axios.get(
        `${STRAPI_URL}/api/formations?populate=category&filters[category][name][$eq]=reconversion`
      );
      
      const formationsReconversion = formationsReconversionResponse.data.data;
      console.log(`✅ Formations en reconversion: ${formationsReconversion.length}`);
      
      formationsReconversion.forEach(formation => {
        console.log(`  - ${formation.attributes.title} (${formation.attributes.slug})`);
      });
      
      // 7. Test du dropdown
      console.log('\n🎯 Test du dropdown formations reconversion...');
      const dropdownResponse = await axios.get(
        `${STRAPI_URL}/api/formation-categories?populate=formations`
      );
      
      const reconversionCat = dropdownResponse.data.data.find(cat => 
        cat.attributes.name === 'reconversion'
      );
      
      if (reconversionCat && reconversionCat.attributes.formations.data.length > 0) {
        console.log(`✅ Dropdown reconversion: ${reconversionCat.attributes.formations.data.length} formations`);
        reconversionCat.attributes.formations.data.forEach(formation => {
          console.log(`  - ${formation.attributes.title}`);
        });
      }

      console.log('\n🌐 URLs disponibles:');
      console.log(`   - API: ${STRAPI_URL}/api/formations/${response.data.data.id}`);
      console.log(`   - Frontend dynamique: http://localhost:3000/formations/${response.data.data.attributes.slug}`);
      console.log(`   - Page statique: http://localhost:3000/formations/reconversion-btp/conducteur-travaux-publics`);

    } else {
      console.error('❌ Erreur lors de la création:', response.status);
    }

  } catch (error) {
    console.error('❌ Erreur:', error.response?.data || error.message);
  }
}

// Exécuter le script
addFormationTPReconversionCorrect();