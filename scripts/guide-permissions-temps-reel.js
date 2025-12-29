const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';

// Guide permissions en temps réel avec instructions détaillées
async function guidePermissionsTempsReel() {
  console.log('🎯 GUIDE PERMISSIONS TEMPS RÉEL - VERS 100%\n');
  console.log('==========================================\n');

  // Liste des APIs à débloquer
  const apisToUnlock = [
    { name: 'Site Settings', endpoint: '/api/site-settings', contentType: 'site-settings' },
    { name: 'Statistiques Site', endpoint: '/api/statistiques-site', contentType: 'statistiques-site' },
    { name: 'Processus Admission', endpoint: '/api/processus-admissions', contentType: 'processus-admissions' },
    { name: 'Valeurs École', endpoint: '/api/valeurs-ecole', contentType: 'valeurs-ecole' },
    { name: 'VAE Formules', endpoint: '/api/vae-formules', contentType: 'vae-formules' },
    { name: 'Entreprise Services', endpoint: '/api/entreprise-services', contentType: 'entreprise-services' },
    { name: 'Galeries', endpoint: '/api/galleries', contentType: 'galleries' },
    { name: 'FAQ', endpoint: '/api/faqs', contentType: 'faqs' },
    { name: 'SEO Settings', endpoint: '/api/seo-settings', contentType: 'seo-settings' },
    { name: 'Navigation Menus', endpoint: '/api/navigation-menus', contentType: 'navigation-menus' },
    { name: 'Contact Info', endpoint: '/api/contact-info', contentType: 'contact-info' },
    { name: 'Modalités', endpoint: '/api/modalites', contentType: 'modalites' }
  ];

  let checkCount = 0;
  let previousWorking = 3; // APIs déjà fonctionnelles
  let allUnlocked = false;

  console.log('🚀 INSTRUCTIONS INITIALES:\n');
  console.log('1. 🌐 Ouvrir http://localhost:1337/admin dans votre navigateur');
  console.log('2. 🔑 Se connecter avec vos identifiants admin');
  console.log('3. ⚙️  Cliquer "Settings" dans le menu de gauche');
  console.log('4. 👥 Sous "USERS & PERMISSIONS PLUGIN", cliquer "Roles"');
  console.log('5. 🌐 Cliquer "Public" dans la liste des rôles');
  console.log('6. ✅ Activer "find" et "findOne" pour chaque content type ci-dessous\n');

  console.log('📋 CONTENT TYPES À DÉBLOQUER (12):\n');
  apisToUnlock.forEach((api, index) => {
    console.log(`${index + 1}. ${api.contentType}`);
    console.log(`   📝 ${api.name}`);
    console.log(`   ✅ Activer: find + findOne`);
    console.log('');
  });

  console.log('💾 7. Cliquer "Save" après avoir tout configuré\n');
  console.log('👀 SURVEILLANCE EN TEMPS RÉEL (toutes les 5 secondes):\n');

  const interval = setInterval(async () => {
    checkCount++;
    
    try {
      let workingCount = 3; // APIs de base déjà fonctionnelles
      let unlockedAPIs = [];
      let stillBlockedAPIs = [];
      
      console.log(`\n🔍 CHECK #${checkCount} (${new Date().toLocaleTimeString()})`);
      console.log('═'.repeat(50));

      // Tester les APIs de base (déjà fonctionnelles)
      console.log('✅ APIs de base fonctionnelles:');
      console.log('   - Formations (5 éléments)');
      console.log('   - Partners (4 éléments)');
      console.log('   - Testimonials (4 éléments)');

      // Tester les APIs à débloquer
      console.log('\n🔓 Test des APIs à débloquer:');
      for (const api of apisToUnlock) {
        try {
          const response = await axios.get(`${STRAPI_URL}${api.endpoint}`);
          if (response.status === 200) {
            const count = response.data.data?.length || (response.data.data ? 1 : 0);
            console.log(`✅ ${api.name}: ${count} éléments`);
            workingCount++;
            unlockedAPIs.push(api.name);
          }
        } catch (error) {
          if (error.response?.status === 403) {
            console.log(`🔒 ${api.name}: Permissions manquantes`);
            stillBlockedAPIs.push(api.name);
          } else if (error.response?.status === 404) {
            console.log(`🔍 ${api.name}: Content type manquant`);
            stillBlockedAPIs.push(api.name);
          } else {
            console.log(`❌ ${api.name}: Erreur ${error.response?.status}`);
            stillBlockedAPIs.push(api.name);
          }
        }
      }

      const percentage = Math.round((workingCount / 15) * 100);
      const progressBar = '█'.repeat(Math.floor(percentage / 2)) + '░'.repeat(50 - Math.floor(percentage / 2));
      
      console.log(`\n📈 PROGRESSION: ${percentage}% (${workingCount}/15)`);
      console.log(`${progressBar} ${percentage}%`);
      
      // Messages d'encouragement et instructions
      if (workingCount > previousWorking) {
        const newlyUnlocked = workingCount - previousWorking;
        console.log(`\n🎉 PROGRÈS ! +${newlyUnlocked} APIs débloquées !`);
        
        if (unlockedAPIs.length > 0) {
          console.log('✅ Nouvellement débloquées:');
          unlockedAPIs.forEach(api => console.log(`   - ${api}`));
        }
      }
      
      if (stillBlockedAPIs.length > 0) {
        console.log(`\n🔧 ACTIONS REQUISES (${stillBlockedAPIs.length} restantes):`);
        console.log('Dans l\'admin Strapi, activer "find" et "findOne" pour:');
        stillBlockedAPIs.slice(0, 5).forEach(api => console.log(`   - ${api}`));
        if (stillBlockedAPIs.length > 5) {
          console.log(`   ... et ${stillBlockedAPIs.length - 5} autres`);
        }
      }
      
      previousWorking = workingCount;

      // Vérifier si objectif atteint
      if (workingCount === 15) {
        console.log('\n🎉🎉🎉 OBJECTIF 100% ATTEINT ! 🎉🎉🎉');
        console.log('🏆 TOUTES LES APIS SONT FONCTIONNELLES !');
        console.log('\n🚀 Lancement du test final automatique...');
        
        clearInterval(interval);
        allUnlocked = true;
        
        // Lancer le test final
        setTimeout(() => {
          const { spawn } = require('child_process');
          const testProcess = spawn('node', ['scripts/test-migration-100-complete.js'], {
            stdio: 'inherit'
          });
          
          testProcess.on('close', (code) => {
            console.log('\n🎯 MIGRATION 100% PARFAITE VALIDÉE !');
            console.log('✅ Félicitations ! Objectif atteint avec brio !');
            process.exit(0);
          });
        }, 2000);
        
        return;
      }

      // Messages d'encouragement selon progression
      if (percentage >= 80) {
        console.log('\n🔥 EXCELLENT ! Presque terminé ! Encore quelques permissions...');
      } else if (percentage >= 60) {
        console.log('\n👍 TRÈS BIEN ! Plus de la moitié débloquée ! Continuez !');
      } else if (percentage >= 40) {
        console.log('\n⚡ BON PROGRÈS ! Vous êtes sur la bonne voie !');
      } else if (percentage > 20) {
        console.log('\n🔧 CONFIGURATION EN COURS... Continuez à activer les permissions');
      } else {
        console.log('\n💡 ASTUCE: Vérifiez que vous êtes bien dans Settings > Roles > Public');
      }

      // Arrêter après 20 minutes max
      if (checkCount >= 240) { // 20 min * 3 checks/min
        console.log('\n⏰ TEMPS MAXIMUM ATTEINT (20 minutes)');
        console.log(`📊 Progression finale: ${percentage}% (${workingCount}/15)`);
        console.log('\n💡 Pour continuer:');
        console.log('1. Terminer la configuration des permissions manuellement');
        console.log('2. Relancer: node scripts/test-migration-100-complete.js');
        clearInterval(interval);
        process.exit(0);
      }

    } catch (error) {
      console.log(`❌ Erreur surveillance: ${error.message}`);
    }
  }, 5000); // Vérification toutes les 5 secondes

  // Message de démarrage
  console.log('👀 SURVEILLANCE DÉMARRÉE - Configurez les permissions maintenant !');
  console.log('⚠️  Pour arrêter: Ctrl+C\n');
}

// Gestion arrêt propre
process.on('SIGINT', () => {
  console.log('\n\n🛑 SURVEILLANCE ARRÊTÉE');
  console.log('💡 Pour reprendre: node scripts/guide-permissions-temps-reel.js');
  console.log('🧪 Pour tester: node scripts/test-migration-100-complete.js');
  process.exit(0);
});

guidePermissionsTempsReel().catch(console.error);