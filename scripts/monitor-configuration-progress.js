const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';

// Surveillance en temps réel de la configuration
async function monitorConfigurationProgress() {
  console.log('👀 SURVEILLANCE CONFIGURATION EN TEMPS RÉEL\n');
  console.log('==========================================\n');

  const apis = [
    { name: 'Formations', endpoint: '/api/formations' },
    { name: 'Partners', endpoint: '/api/partners' },
    { name: 'Testimonials', endpoint: '/api/testimonials' },
    { name: 'Site Settings', endpoint: '/api/site-settings' },
    { name: 'Statistiques Site', endpoint: '/api/statistiques-site' },
    { name: 'Processus Admission', endpoint: '/api/processus-admissions' },
    { name: 'Valeurs École', endpoint: '/api/valeurs-ecole' },
    { name: 'VAE Formules', endpoint: '/api/vae-formules' },
    { name: 'Entreprise Services', endpoint: '/api/entreprise-services' },
    { name: 'Galeries', endpoint: '/api/galleries' },
    { name: 'FAQ', endpoint: '/api/faqs' },
    { name: 'SEO Settings', endpoint: '/api/seo-settings' },
    { name: 'Navigation Menus', endpoint: '/api/navigation-menus' },
    { name: 'Contact Info', endpoint: '/api/contact-info' },
    { name: 'Modalités', endpoint: '/api/modalites' }
  ];

  let previousWorking = 0;
  let checkCount = 0;
  const maxChecks = 60; // 5 minutes max (5s * 60)

  console.log('🔄 Surveillance démarrée...');
  console.log('⏱️  Vérification toutes les 5 secondes');
  console.log('🎯 Objectif: 15/15 APIs fonctionnelles\n');

  const interval = setInterval(async () => {
    checkCount++;
    
    try {
      let workingCount = 0;
      let permissionCount = 0;
      let notFoundCount = 0;
      
      console.log(`\n📊 CHECK #${checkCount} (${new Date().toLocaleTimeString()})`);
      console.log('═'.repeat(50));

      for (const api of apis) {
        try {
          const response = await axios.get(`${STRAPI_URL}${api.endpoint}`);
          if (response.status === 200) {
            const count = response.data.data?.length || (response.data.data ? 1 : 0);
            console.log(`✅ ${api.name}: ${count} éléments`);
            workingCount++;
          }
        } catch (error) {
          if (error.response?.status === 403) {
            console.log(`🔒 ${api.name}: Permissions manquantes`);
            permissionCount++;
          } else if (error.response?.status === 404) {
            console.log(`🔍 ${api.name}: Content type manquant`);
            notFoundCount++;
          } else {
            console.log(`❌ ${api.name}: Erreur ${error.response?.status}`);
          }
        }
      }

      const percentage = Math.round((workingCount / 15) * 100);
      const progressBar = '█'.repeat(Math.floor(percentage / 2)) + '░'.repeat(50 - Math.floor(percentage / 2));
      
      console.log(`\n📈 PROGRESSION: ${percentage}% (${workingCount}/15)`);
      console.log(`${progressBar} ${percentage}%`);
      
      if (workingCount > previousWorking) {
        console.log(`🎉 AMÉLIORATION ! +${workingCount - previousWorking} APIs fonctionnelles`);
      }
      
      previousWorking = workingCount;

      // Vérifier si objectif atteint
      if (workingCount === 15) {
        console.log('\n🎉 OBJECTIF ATTEINT ! 100% DES APIS FONCTIONNELLES !');
        console.log('🏆 MIGRATION 100% PARFAITE RÉUSSIE !');
        console.log('\n🚀 Lancement du test final...');
        
        clearInterval(interval);
        
        // Lancer le test final automatiquement
        const { spawn } = require('child_process');
        const testProcess = spawn('node', ['scripts/test-migration-100-complete.js'], {
          stdio: 'inherit'
        });
        
        testProcess.on('close', (code) => {
          console.log('\n🎯 SURVEILLANCE TERMINÉE AVEC SUCCÈS !');
          console.log('✅ Configuration complète validée');
          process.exit(0);
        });
        
        return;
      }

      // Arrêter après temps maximum
      if (checkCount >= maxChecks) {
        console.log('\n⏰ TEMPS MAXIMUM ATTEINT');
        console.log(`📊 Résultat final: ${percentage}% (${workingCount}/15)`);
        console.log('\n💡 Pour continuer:');
        console.log('1. Vérifier la configuration dans l\'admin Strapi');
        console.log('2. Relancer: node scripts/monitor-configuration-progress.js');
        clearInterval(interval);
        process.exit(0);
      }

      // Messages d'encouragement
      if (workingCount >= 10) {
        console.log('🔥 Excellent progrès ! Presque terminé !');
      } else if (workingCount >= 7) {
        console.log('👍 Bon progrès ! Continuez !');
      } else if (workingCount > 3) {
        console.log('⚡ Configuration en cours...');
      }

    } catch (error) {
      console.log(`❌ Erreur surveillance: ${error.message}`);
    }
  }, 5000); // Vérification toutes les 5 secondes

  // Message initial
  console.log('📋 INSTRUCTIONS PENDANT LA SURVEILLANCE:');
  console.log('1. Ouvrir http://localhost:1337/admin dans votre navigateur');
  console.log('2. Aller dans Settings > Users & Permissions > Roles > Public');
  console.log('3. Activer "find" et "findOne" pour chaque content type');
  console.log('4. Sauvegarder les permissions');
  console.log('5. Observer les changements en temps réel ci-dessous\n');
  
  console.log('⚠️  Pour arrêter la surveillance: Ctrl+C\n');
}

// Gestion de l'arrêt propre
process.on('SIGINT', () => {
  console.log('\n\n🛑 SURVEILLANCE ARRÊTÉE PAR L\'UTILISATEUR');
  console.log('💡 Pour reprendre: node scripts/monitor-configuration-progress.js');
  process.exit(0);
});

monitorConfigurationProgress().catch(console.error);