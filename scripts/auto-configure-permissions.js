const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';

// Tentative de configuration automatique des permissions
async function autoConfigurePermissions() {
  console.log('🤖 CONFIGURATION AUTOMATIQUE DES PERMISSIONS\n');
  console.log('===========================================\n');

  // Note: La configuration automatique des permissions via API nécessite
  // un token admin ou une authentification spéciale
  console.log('⚠️  IMPORTANT: Configuration automatique limitée');
  console.log('Les permissions Strapi nécessitent une configuration manuelle via l\'admin panel.\n');

  // Test des APIs actuelles
  console.log('📡 Test des APIs actuelles...\n');
  
  const apis = [
    { name: 'Formations', endpoint: '/api/formations', working: false },
    { name: 'Partners', endpoint: '/api/partners', working: false },
    { name: 'Testimonials', endpoint: '/api/testimonials', working: false },
    { name: 'Site Settings', endpoint: '/api/site-settings', working: false },
    { name: 'Statistiques Site', endpoint: '/api/statistiques-site', working: false },
    { name: 'Processus Admission', endpoint: '/api/processus-admissions', working: false },
    { name: 'Valeurs École', endpoint: '/api/valeurs-ecole', working: false },
    { name: 'VAE Formules', endpoint: '/api/vae-formules', working: false },
    { name: 'Entreprise Services', endpoint: '/api/entreprise-services', working: false },
    { name: 'Galeries', endpoint: '/api/galleries', working: false },
    { name: 'FAQ', endpoint: '/api/faqs', working: false },
    { name: 'SEO Settings', endpoint: '/api/seo-settings', working: false },
    { name: 'Navigation Menus', endpoint: '/api/navigation-menus', working: false },
    { name: 'Contact Info', endpoint: '/api/contact-info', working: false },
    { name: 'Modalités', endpoint: '/api/modalites', working: false }
  ];

  let workingCount = 0;
  let permissionCount = 0;
  let notFoundCount = 0;

  for (const api of apis) {
    try {
      const response = await axios.get(`${STRAPI_URL}${api.endpoint}`);
      if (response.status === 200) {
        const count = response.data.data?.length || (response.data.data ? 1 : 0);
        console.log(`✅ ${api.name}: ${count} éléments`);
        api.working = true;
        workingCount++;
      }
    } catch (error) {
      if (error.response?.status === 403) {
        console.log(`🔒 ${api.name}: Permissions requises`);
        permissionCount++;
      } else if (error.response?.status === 404) {
        console.log(`🔍 ${api.name}: Content type manquant`);
        notFoundCount++;
      } else {
        console.log(`❌ ${api.name}: Erreur ${error.response?.status}`);
      }
    }
  }

  // Résumé
  console.log(`\n📊 RÉSUMÉ:`);
  console.log(`✅ APIs fonctionnelles: ${workingCount}/15`);
  console.log(`🔒 Permissions requises: ${permissionCount}/15`);
  console.log(`🔍 Content types manquants: ${notFoundCount}/15`);

  const currentPercentage = Math.round((workingCount / 15) * 100);
  console.log(`📈 Pourcentage actuel: ${currentPercentage}%`);

  // Instructions détaillées
  console.log('\n🎯 INSTRUCTIONS DÉTAILLÉES POUR 100%\n');
  console.log('===================================\n');

  console.log('🔧 ÉTAPE 1: Ouvrir l\'admin Strapi');
  console.log('URL: http://localhost:1337/admin');
  console.log('Action: Se connecter avec vos identifiants\n');

  console.log('🔧 ÉTAPE 2: Naviguer vers les permissions');
  console.log('1. Cliquer sur "Settings" (⚙️) dans le menu de gauche');
  console.log('2. Sous "USERS & PERMISSIONS PLUGIN", cliquer sur "Roles"');
  console.log('3. Cliquer sur "Public" dans la liste des rôles\n');

  console.log('🔧 ÉTAPE 3: Configurer les permissions');
  console.log('Pour chaque content type listé ci-dessous, activer:');
  console.log('✅ find (permet la lecture de liste)');
  console.log('✅ findOne (permet la lecture d\'un élément)\n');

  if (permissionCount > 0) {
    console.log('🔒 Content types avec erreur 403 (permissions):');
    apis.forEach(api => {
      if (!api.working && permissionCount > 0) {
        console.log(`   - ${api.name.replace(' ', '-').toLowerCase()}`);
      }
    });
    console.log('');
  }

  if (notFoundCount > 0) {
    console.log('🔍 Content types avec erreur 404 (à créer/vérifier):');
    console.log('Ces content types peuvent nécessiter une recréation:');
    apis.forEach(api => {
      if (!api.working && notFoundCount > 0) {
        console.log(`   - ${api.name.replace(' ', '-').toLowerCase()}`);
      }
    });
    console.log('');
  }

  console.log('🔧 ÉTAPE 4: Sauvegarder');
  console.log('1. Cliquer sur "Save" en haut à droite');
  console.log('2. Attendre la confirmation de sauvegarde\n');

  console.log('🔧 ÉTAPE 5: Validation');
  console.log('Lancer le test de validation:');
  console.log('node scripts/test-migration-100-complete.js\n');

  console.log('📈 RÉSULTAT ATTENDU:');
  console.log('✅ APIs: 100% (15/15)');
  console.log('✅ Score global: 100%');
  console.log('🎉 MIGRATION 100% PARFAITE ATTEINTE !\n');

  // Créer un checklist
  const checklist = `# ✅ CHECKLIST CONFIGURATION FINALE

## 🎯 Objectif: Passer de ${currentPercentage}% à 100%

### 📋 Actions à effectuer:

#### 1. Ouvrir Admin Strapi
- [ ] Aller sur http://localhost:1337/admin
- [ ] Se connecter avec identifiants admin

#### 2. Accéder aux Permissions  
- [ ] Cliquer "Settings" dans menu gauche
- [ ] Cliquer "Roles" sous "USERS & PERMISSIONS PLUGIN"
- [ ] Cliquer "Public"

#### 3. Activer Permissions (${permissionCount + notFoundCount} content types)
${apis.filter(api => !api.working).map(api => 
  `- [ ] **${api.name}**: Activer "find" et "findOne"`
).join('\n')}

#### 4. Sauvegarder
- [ ] Cliquer "Save" 
- [ ] Attendre confirmation

#### 5. Valider
- [ ] Lancer: \`node scripts/test-migration-100-complete.js\`
- [ ] Vérifier score 100%

## 🎉 Résultat Final Attendu
- APIs: ${currentPercentage}% → 100%
- Score Global: 81% → 100%
- Migration: PARFAITE !
`;

  require('fs').writeFileSync('CHECKLIST_CONFIGURATION_FINALE.md', checklist);
  console.log('📄 Checklist créée: CHECKLIST_CONFIGURATION_FINALE.md');

  console.log('\n🎯 PRÊT POUR LA CONFIGURATION FINALE !');
  console.log('Suivez les instructions ci-dessus pour atteindre 100%.');

  return {
    working: workingCount,
    permissions: permissionCount,
    notFound: notFoundCount,
    total: 15,
    percentage: currentPercentage
  };
}

autoConfigurePermissions().catch(console.error);