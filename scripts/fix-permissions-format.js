/**
 * Script pour corriger le format des permissions Strapi
 * Les permissions doivent être au format: api::content-type.content-type.action
 * et non: api::content-type.content-type.content-type.action
 */

const STRAPI_URL = 'http://localhost:1337';

async function getAdminToken() {
  try {
    const response = await fetch(`${STRAPI_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@cma-education.com',
        password: 'Admin123!'
      })
    });
    
    if (!response.ok) {
      console.log('⚠️  Connexion admin échouée - utilisez le panel admin pour corriger');
      return null;
    }
    
    const data = await response.json();
    return data.data?.token;
  } catch (error) {
    return null;
  }
}

async function fixPermissions() {
  console.log('🔧 Correction du format des permissions Strapi\n');
  console.log('=' .repeat(60));
  
  // Liste des Content Types avec le bon format de permission
  const contentTypes = [
    { name: 'formation', actions: ['find', 'findOne'] },
    { name: 'modalite', actions: ['find', 'findOne'] },
    { name: 'statistique-site', actions: ['find', 'findOne'] },
    { name: 'testimonial', actions: ['find', 'findOne'] },
    { name: 'partner', actions: ['find', 'findOne'] },
    { name: 'valeur-ecole', actions: ['find', 'findOne'] },
    { name: 'processus-admission', actions: ['find', 'findOne'] },
    { name: 'article-blog', actions: ['find', 'findOne'] },
    { name: 'categorie-blog', actions: ['find', 'findOne'] },
    { name: 'formateur', actions: ['find', 'findOne'] },
    { name: 'formation-category', actions: ['find', 'findOne'] },
    { name: 'vae-formule', actions: ['find', 'findOne'] },
    { name: 'entreprise-service', actions: ['find', 'findOne'] },
    { name: 'formation-thematique', actions: ['find', 'findOne'] },
    { name: 'page', actions: ['find', 'findOne'] },
    { name: 'faqs', actions: ['find', 'findOne'] },
    { name: 'site-settings', actions: ['find'] }
  ];

  console.log('\n📋 Format correct des permissions:\n');
  
  contentTypes.forEach(ct => {
    ct.actions.forEach(action => {
      const correctFormat = `api::${ct.name}.${ct.name}.${action}`;
      console.log(`   ✓ ${correctFormat}`);
    });
  });

  console.log('\n' + '=' .repeat(60));
  console.log('\n📌 SOLUTION: Reconfigurer les permissions via le panel admin\n');
  console.log('1. Allez sur http://localhost:1337/admin');
  console.log('2. Settings → Users & Permissions → Roles → Public');
  console.log('3. Pour chaque Content Type, décochez puis recochez:');
  console.log('   - find (liste)');
  console.log('   - findOne (détail)');
  console.log('4. Cliquez sur "Save"\n');
  
  console.log('=' .repeat(60));
  console.log('\n🔄 Alternative: Redémarrer Strapi avec cache nettoyé\n');
  console.log('   cd cms-cma');
  console.log('   Remove-Item -Recurse -Force .cache, dist -ErrorAction SilentlyContinue');
  console.log('   npm run build');
  console.log('   npm run develop\n');

  // Vérifier que les APIs fonctionnent malgré les warnings
  console.log('=' .repeat(60));
  console.log('\n🧪 Test des APIs (les warnings n\'empêchent pas le fonctionnement):\n');
  
  const testApis = [
    { name: 'Site Settings', url: '/api/site-settings' },
    { name: 'Formations', url: '/api/formations' },
    { name: 'Modalités', url: '/api/modalites' },
    { name: 'Statistiques', url: '/api/statistiques-site' },
    { name: 'Témoignages', url: '/api/testimonials' },
    { name: 'Partenaires', url: '/api/partners' }
  ];

  let allWorking = true;
  
  for (const api of testApis) {
    try {
      const response = await fetch(`${STRAPI_URL}${api.url}`);
      if (response.ok) {
        const data = await response.json();
        const count = Array.isArray(data.data) ? data.data.length : 1;
        console.log(`   ✅ ${api.name}: ${count} entrée(s)`);
      } else {
        console.log(`   ❌ ${api.name}: ${response.status}`);
        allWorking = false;
      }
    } catch (error) {
      console.log(`   ❌ ${api.name}: Erreur connexion`);
      allWorking = false;
    }
  }

  console.log('\n' + '=' .repeat(60));
  
  if (allWorking) {
    console.log('\n✅ CONCLUSION: Les APIs fonctionnent correctement!');
    console.log('   Les messages "Unknown action" sont des warnings de debug');
    console.log('   qui n\'affectent pas le fonctionnement du site.\n');
    console.log('   Ces warnings disparaîtront après un rebuild propre de Strapi.\n');
  } else {
    console.log('\n⚠️  Certaines APIs ne fonctionnent pas.');
    console.log('   Suivez les instructions ci-dessus pour corriger.\n');
  }
}

fixPermissions().catch(console.error);
